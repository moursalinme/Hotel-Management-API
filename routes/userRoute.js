const express = require('express');
const router = express.Router();
const {login, register, protect, restrictTo, getAllUsers, getUserById, updateUser, deleteUser} = require('../controllers/userController');

// router.post('/register', userController.register);

router.post('/register', register);
router.post('/login', login);

// router.use(protect, restrictTo('admin'));
router.get('/',  getAllUsers); 
router.get('/:userId', getUserById);
router.delete('/:userId', deleteUser); 

module.exports = router;