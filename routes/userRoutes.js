const express = require('express');
const router = express.Router();
const { getAllUsers, assignRole } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { updateUser } = require('../controllers/userController');
const { deleteUser } = require('../controllers/userController');
const { createUser } = require('../controllers/userController');

router.get('/', authMiddleware, getAllUsers);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);
router.post('/', authMiddleware, roleMiddleware('admin'), createUser);

router.post('/assign-role', authMiddleware, assignRole);

module.exports = router;
