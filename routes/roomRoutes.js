const express = require('express');
const router = express.Router();
const RoomController = require('../controllers/roomController');

router.get('/', RoomController.index);
router.get('/add', RoomController.create);
router.post('/add', RoomController.store);
router.get('/edit/:id', RoomController.edit);
router.post('/edit/:id', RoomController.update);
router.get('/delete/:id', RoomController.delete);
router.get('/detail/:id', RoomController.show); // Arahkan ke GuestBook

module.exports = router;