const pool = require('../config/db');

const RoomModel = {
    async getAllRooms() {
        const [rows] = await pool.query('SELECT * FROM Room');
        return rows;
    },

    async getRoomById(id) {
        const [rows] = await pool.query('SELECT * FROM Room WHERE RoomID = ?', [id]);
        return rows[0];
    },

    async addRoom(room) {
        const { RoomNumber, Type, Description } = room;
        const [result] = await pool.query(
            'INSERT INTO Room (RoomNumber, Type, Description) VALUES (?, ?, ?)',
            [RoomNumber, Type, Description]
        );
        return result.insertId;
    },

    async updateRoom(id, room) {
        const { RoomNumber, Type, Description } = room;
        await pool.query(
            'UPDATE Room SET RoomNumber = ?, Type = ?, Description = ? WHERE RoomID = ?',
            [RoomNumber, Type, Description, id]
        );
    },

    async deleteRoom(id) {
        await pool.query('DELETE FROM Room WHERE RoomID = ?', [id]);
    }
};

module.exports = RoomModel;