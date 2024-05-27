const express = require('express');
const router = express.Router();
const {getAvailableRooms, addNewRoom, addDummyRoomData, updateRoom} = require('../controllers/roomController');



// router.get('/', )
router.get('/avRooms', getAvailableRooms);
router.get('/addDummy', addDummyRoomData);

router.post('/', addNewRoom) ;

router.patch('/:_id', updateRoom);
// router.get('/:roomNo', getRoomById);


module.exports = router;