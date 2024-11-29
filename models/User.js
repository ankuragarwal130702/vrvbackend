const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Role = require('./Role');

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: String, default: "Active" },
    // roles is a reference to the Role model which is a collection of roles
    roles: { type: Schema.Types.ObjectId, ref: 'Role' }
});

module.exports = mongoose.model('User', userSchema);
