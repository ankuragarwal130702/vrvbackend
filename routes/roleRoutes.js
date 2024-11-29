const express = require('express');
const router = express.Router();
const roleMiddleware = require('../middleware/roleMiddleware');

const { getAllRoles, createRole, updateRole, deleteRole } = require('../controllers/roleController.js');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/', authMiddleware,roleMiddleware('admin'), getAllRoles);
router.post('/', authMiddleware,roleMiddleware('admin'), createRole);
router.put('/:id', authMiddleware,roleMiddleware('admin'), updateRole);
router.delete('/:id', authMiddleware,roleMiddleware('admin'), deleteRole);


module.exports = router;


