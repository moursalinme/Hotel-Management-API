const express = require('express');
const router = express.Router();

const { getAllGuest } = require('../controllers/guestController');

router.get('/', getAllGuest);

module.exports = router;