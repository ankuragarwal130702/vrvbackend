const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcrypt');

// Get All Users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate('roles');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Assign Roles to Users
exports.assignRole = async (req, res) => {
    try {
        const { userId, roleId } = req.body;

        const user = await User.findOne({ id: userId });
        if (!user) return res.status(404).json({ message: "User not found" });

        const role = await Role.findOne({ id: roleId });
        if (!role) return res.status(404).json({ message: "Role not found" });

        user.roles.push(roleId);
        await user.save();

        res.status(200).json({ message: "Role assigned successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Update User by ID
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        const user = await User.findByIdAndUpdate(id, { name, email }, { new: true });
        if (!user) return res.status(404).json({ message: "User not found" });
    
        user.password = undefined;

        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}



// Delete User by ID
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }

}


// Create User
exports.createUser = async (req, res) => {
    try {
        const { name, email, password, roles } = req.body;
        
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const key = roles || 1;
        const role = await Role.findOne({ "key": key });

        // Create a new user
        const user = new User({
            id: Date.now(), // Use a timestamp for a unique ID
            name,
            email,
            password: hashedPassword,
            roles: role._id 
        });
        
        await user.save();
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};