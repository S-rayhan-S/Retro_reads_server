const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const variables = require("../config/variables");

exports.signup = async (req, res) => {
  const user = new User(req.body);
  try {
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hasedPassword = await bcrypt.hash(user.password, 10);
    const result = await User.create({
      name: user.name,
      email: user.email,
      password: hasedPassword,
      phone: user.phone,
    });

    const token = jwt.sign({ _id: user._id.toString() }, variables.authKey);
    return res.status(201).json({ user: result, token });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("No user found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Password does not match");
    }
    const token = jwt.sign({ _id: user._id.toString() }, variables.authKey, {
      expiresIn: 3600*24*7,
    });
    res.status(201).json({ user, token });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};


exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      throw new Error("No user found");
    }
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new Error("No user found");
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try{
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if(!user){
      throw new Error('No user found');
    }
    return res.status(200).json({user});
  }catch(error){
    return res.status(500).json({msg: error.message});

  }
};

exports.deleteUser = async (req, res) => {
  try{
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user){
      throw new Error('No user found');
    }
    return res.status(200).json({user});
  }catch(error){
    return res.status(500).json({msg: error.message});

  }
};
