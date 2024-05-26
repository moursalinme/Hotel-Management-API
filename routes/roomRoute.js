const express = require('express');
const router = express.Router();
const {getAvailableRooms, addNewRoom, addDummyRoomData} = require('../controllers/roomController');



// router.get('/', )
router.get('/avRooms', getAvailableRooms);
router.post('/', addNewRoom) ;
router.get('/addDummy', addDummyRoomData);

// router.get('/:roomNo', getRoomById);


module.exports = router;