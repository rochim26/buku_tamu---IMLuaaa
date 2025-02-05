const GuestBookModel = require('../models/GuestBookModel');

const GuestBookController = {
    async index(req, res) {
        const { roomId } = req.params;
        const guests = await GuestBookModel.getGuestsByRoomId(roomId);
        res.render('guest/index', { guests, roomId });
    },

    async create(req, res) {
        const { roomId } = req.params;
        res.render('guest/add', { roomId });
    },

    async store(req, res) {
        const { roomId } = req.params;
        const { NamaTamu, EmailTamu, PhoneTamu, CheckInTime } = req.body;
        await GuestBookModel.addGuest({ NamaTamu, EmailTamu, PhoneTamu, RoomID: roomId, CheckInTime });
        res.redirect(`/guests/${roomId}`);
    },

    async edit(req, res) {
        const { id, roomId } = req.params;
        const guest = await GuestBookModel.getGuestById(id);
        res.render('guest/edit', { guest, roomId });
    },

    async update(req, res) {
        const { id, roomId } = req.params;
        const { NamaTamu, EmailTamu, PhoneTamu, CheckInTime } = req.body;
        await GuestBookModel.updateGuest(id, { NamaTamu, EmailTamu, PhoneTamu, CheckInTime });
        res.redirect(`/guests/${roomId}`);
    },

    async delete(req, res) {
        const { id, roomId } = req.params;
        await GuestBookModel.deleteGuest(id);
        res.redirect(`/guests/${roomId}`);
    }
};

module.exports = GuestBookController;