const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcrypt');


// Get All roles
exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new role
exports.createRole = async (req, res) => {
    try {
        const { name } = req.body;
        const { key } = req.body;
        const { permissions } = req.body;

        
        // Check if role already exists
        const existingRole = await Role.findOne({ name });
        if (existingRole) return res.status(400).json({ message: "Role already exists" });

        // Create new role
        const role = new Role({ name, key, permissions });
        await role.save();

        res.status(201).json({ message: "Role created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Update role by ID

exports.updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const { key } = req.body;
        const { permissions } = req.body;


        // res.send({ id, name, key, permissions });

        // update name key and permission
        const role = await Role.findByIdAndUpdate
            (id, { name, key, permissions }, { new: true });


        if (!role) return res.status(404).json({ message: "Role not found" });

        res.status(200).json({ message: "Role updated successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}


// Delete role by ID

exports.deleteRole = async (req, res) => {
    try {
        const { id } = req.params;

        const role = await Role.findByIdAndDelete(id);
        if (!role) return res.status(404).json({ message: "Role not found" });

        res.status(200).json({ message: "Role deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

