const { z } = require('zod');

// Sign-Up Schema
const signupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    roles: z.number().optional(), // Optional array of role IDs
});

// Login Schema
const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

module.exports = { signupSchema, loginSchema };
