const pool = require('../config/db');

const GuestBookModel = {
    async getGuestsByRoomId(roomId) {
        const [rows] = await pool.query('SELECT * FROM GuestBook WHERE RoomID = ?', [roomId]);
        return rows;
    },

    async addGuest(guest) {
        const { NamaTamu, EmailTamu, PhoneTamu, RoomID, CheckInTime } = guest;
        const [result] = await pool.query(
            'INSERT INTO GuestBook (NamaTamu, EmailTamu, PhoneTamu, RoomID, CheckInTime) VALUES (?, ?, ?, ?, ?)',
            [NamaTamu, EmailTamu, PhoneTamu, RoomID, CheckInTime]
        );
        return result.insertId;
    },

    async updateGuest(id, guest) {
        const { NamaTamu, EmailTamu, PhoneTamu, CheckInTime } = guest;
        await pool.query(
            'UPDATE GuestBook SET NamaTamu = ?, EmailTamu = ?, PhoneTamu = ?, CheckInTime = ? WHERE GuestBookID = ?',
            [NamaTamu, EmailTamu, PhoneTamu, CheckInTime, id]
        );
    },

    async deleteGuest(id) {
        await pool.query('DELETE FROM GuestBook WHERE GuestBookID = ?', [id]);
    },

    async getGuestById(id) {
        const [rows] = await pool.query('SELECT * FROM GuestBook WHERE GuestBookID = ?', [id]);
        return rows[0];
    }
};

module.exports = GuestBookModel;