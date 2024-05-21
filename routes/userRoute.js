const express = require('express');
const router = express.Router();
const {login, register, protect, restrictTo, getAllUsers, getUserById, updateUser, deleteUser} = require('../controllers/userController');

// router.post('/register', userController.register);

router.post('/register', register);
router.post('/login', login);
router.get('/',  getAllUsers); 
router.get('/:userId', getUserById);
// router.put('/:userId', userController.updateUser); // For admin to update a user
// router.delete('/:userId', userController.deleteUser); // For admin to delete a user

module.exports = router;