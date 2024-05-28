const express = require('express');
const router = express.Router();
const {getAvailableRooms, addNewRoom, addDummyRoomData, updateRoom, filterByStars, getAllRooms } = require('../controllers/roomController');



// router.get('/', )
router.get('/avRooms', getAvailableRooms);
router.get('/addDummy', addDummyRoomData);
router.get('/', getAllRooms);

router.post('/filterByStars', filterByStars);
router.post('/', addNewRoom) ;
router.patch('/', updateRoom);

// router.get('/:roomNo', getRoomById);


module.exports = router;