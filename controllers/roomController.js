const RoomModel = require('../models/roomModel.js');
const QRCode = require('qrcode');


const RoomController = {
    async index(req, res) {
        const rooms = await RoomModel.getAllRooms();
        // Menambahkan QR code URL ke setiap room
        const roomsWithQr = await Promise.all(rooms.map(async (room) => {
            room.qrCodeUrl = await QRCode.toDataURL(`${req.protocol}://${req.get('host')}/rooms/detail/${room.RoomID}`);
            return room;
        }));
        res.render('room/index', { rooms: roomsWithQr });
    },

    async show(req, res) {
        const { id } = req.params;
        const room = await RoomModel.getRoomById(id);
        res.render('room/detail', { room });
    },

    async create(req, res) {
        res.render('room/add');
    },

    async store(req, res) {
        const { RoomNumber, Type, Description } = req.body;
        await RoomModel.addRoom({ RoomNumber, Type, Description });
        res.redirect('/rooms');
    },

    async edit(req, res) {
        const { id } = req.params;
        const room = await RoomModel.getRoomById(id);
        res.render('room/edit', { room });
    },

    async update(req, res) {
        const { id } = req.params;
        const { RoomNumber, Type, Description } = req.body;
        await RoomModel.updateRoom(id, { RoomNumber, Type, Description });
        res.redirect('/rooms');
    },

    async delete(req, res) {
        const { id } = req.params;
        await RoomModel.deleteRoom(id);
        res.redirect('/rooms');
    },

    async show(req, res) {
        const { id } = req.params;
        const room = await RoomModel.getRoomById(id);
        res.redirect(`/guests/${id}`); // Arahkan ke halaman GuestBook
    }
};

module.exports = RoomController;