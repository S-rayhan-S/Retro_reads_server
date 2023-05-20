const check = (...roles) => (req, res, next) => {
    if(!req.user){
        return res.status(401).json({msg: "Unauthorized"});
    }

    const hasRole = roles.find(role => req.user.role === role);

    if(!hasRole){
        return res.status(403).json({msg: "You are not allowed to do this"});
    }

    return next();
}
    
const role={
    check
}

module.exports = role;