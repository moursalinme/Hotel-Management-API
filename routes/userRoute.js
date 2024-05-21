const express = require('express');
const router = express.Router();
const {login, register, getAllUsers, getUserById, updateUser, deleteUser} = require('../controllers/userController');

// router.post('/register', userController.register);

router.post('/register', register);
// router.post('/login', userController.login);
// router.get('/', userController.getAllUsers); // For admin to get all users
// router.get('/:userId', userController.getUserById); // For admin to get a specific user
// router.put('/:userId', userController.updateUser); // For admin to update a user
// router.delete('/:userId', userController.deleteUser); // For admin to delete a user

module.exports = router;