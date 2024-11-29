const validateRequest = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body); // Validate request body
        next();
    } catch (error) {
        res.status(400).json({ message: "Validation error", details: error.errors });
    }
};

module.exports = validateRequest;
