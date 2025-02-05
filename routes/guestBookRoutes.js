const express = require('express');
const router = express.Router();
const GuestBookController = require('../controllers/GuestBookController');

router.get('/:roomId', GuestBookController.index); // Tampilkan daftar tamu
router.get('/:roomId/add', GuestBookController.create); // Form tambah tamu
router.post('/:roomId/add', GuestBookController.store); // Proses tambah tamu
router.get('/:roomId/edit/:id', GuestBookController.edit); // Form edit tamu
router.post('/:roomId/edit/:id', GuestBookController.update); // Proses edit tamu
router.get('/:roomId/delete/:id', GuestBookController.delete); // Proses hapus tamu

module.exports = router;