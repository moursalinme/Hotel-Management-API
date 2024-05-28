const express = require('express');
const router = express.Router();
const { addReservation } = require('../controllers/reservationController');
const { checkGuest } = require('../controllers/guestController');
const { updateRoom, checkRoom } = require('../controllers/roomController');
const { protect, restrictTo } = require('../controllers/userController');

router.use(protect);
router.post('/', checkGuest, checkRoom, addReservation);

module.exports = router;