const express = require('express');
const router = express.Router();
const { addReservation } = require('../controllers/reservationController');
const { checkGuest } = require('../controllers/guestController');
const { updateRoom, checkRoom } = require('../controllers/roomController');

router.post('/', checkGuest, checkRoom, addReservation);

module.exports = router;