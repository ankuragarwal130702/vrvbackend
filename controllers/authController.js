const User = require('../models/User');
const Role = require('../models/Role');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// User Sign-Up
exports.signup = async (req, res) => {
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


// User Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).populate('roles');
        if (!user) return res.status(404).json({ message: "User not found" });

        // Check if the password is correct
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) return res.status(400).json({ message: "Invalid credentials" });


        // Generate JWT Token
        const token = jwt.sign(
            { id: user.id, roles: user.roles },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
