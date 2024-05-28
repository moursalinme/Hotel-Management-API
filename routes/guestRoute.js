const express = require('express');
const router = express.Router();

const { getAllGuest, getTopGuests, getGuestById } = require('../controllers/guestController');
const { protect, restrictTo } = require('../controllers/userController');

router.use(protect);
router.get('/', getAllGuest);
router.get('/:_id', getGuestById);
router.get('/topGuests', getTopGuests);
router.get('/topGuests/:limit', getTopGuests);

module.exports = router;