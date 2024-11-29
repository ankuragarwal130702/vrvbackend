const roleMiddleware = (requiredPermissions) => (req, res, next) => {
    const user = req.user;
    let userRole = user.roles.name;
    // make it lowercase
    userRole = userRole.toLowerCase();

    if(requiredPermissions !== userRole) {
        return res.status(403).json({ message: "You do not have the required permissions" });
    }
    next();
};

module.exports = roleMiddleware;
