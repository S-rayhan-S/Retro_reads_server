const express = require("express");
const userController = require("../controller/user");
const router = new express.Router();
const auth = require('../middlewares/auth');
const role = require("../middlewares/roles");
const {ROLES} = require('../constant/constant')

// Register a user
router.post("/signup", userController.signup);

// Login a user
router.post("/login", userController.login);

// Get all users
router.get("/", auth,role.check(ROLES.ADMIN),userController.getUsers);

// Get a user
router.get("/:id", auth,role.check(ROLES.ADMIN), userController.getUser);

// Update a user
router.patch("/:id", auth,role.check(ROLES.ADMIN), userController.updateUser);

// Delete a user
router.delete("/:id", auth,role.check(ROLES.ADMIN), userController.deleteUser);


module.exports = router;
