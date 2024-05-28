const express = require('express');
const router = express.Router();
const {getAvailableRooms, addNewRoom, addDummyRoomData, updateRoom, filterByStars, getAllRooms } = require('../controllers/roomController');
const { protect, restrictTo } = require('../controllers/userController');

router.use(protect);

router.get('/avRooms', getAvailableRooms);
router.get('/addDummy', addDummyRoomData);
router.get('/', getAllRooms);

router.post('/filterByStars', filterByStars);

router.use(restrictTo('admin'));
router.post('/', addNewRoom) ;
router.patch('/', updateRoom);

// router.get('/:roomNo', getRoomById);


module.exports = router;