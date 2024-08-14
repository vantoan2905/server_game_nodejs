const { pool } = require('../db');
const bcrypt = require('bcrypt');


const getRoom = async (roomId) => {
    const room = await pool.query('SELECT * FROM rooms WHERE id = $1', [roomId]);
    return room.rows[0];
}

const getAllRooms = async () => {
    const rooms = await pool.query('SELECT * FROM rooms');
    return rooms.rows;
}
const getAllUsersInRoom = async (room_id) => {
    const users = await pool.query('SELECT user_id_1, user_id_2, user_id_3, user_id_4 FROM room_id WHERE room_id = $1', room_id);
    return users.rows;
}
const createRoom = async (user_id) => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    let code = '';

    // Generate 4 random letters
    for (let i = 0; i < 4; i++) {
        code += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    // Generate 6 random digits
    for (let i = 0; i < 6; i++) {
        code += digits.charAt(Math.floor(Math.random() * digits.length));
    }

    // Shuffle the code to mix letters and digits
    const room_id = code.split('').sort(() => 0.5 - Math.random()).join('');

    // Define the query string
    const query = 'INSERT INTO rooms (room_id, user_id_1) VALUES ($1, $2) RETURNING *';
    const values = [room_id, user_id];

    // Execute the query and return the result
    const result = await pool.query(query, values);
    return result.rows[0];
};

const addUserToRoom = async (room_id, index, user_id) => {

    if (index = 1) {
        const result = await pool.query(
            'UPDATE rooms SET user_id_1 = $1 WHERE room_id = $2 RETURNING *',
            user_id, room_id
        );
        return result.rows[0];
    }else if (index = 2) {
        const result = await pool.query(
            'UPDATE rooms SET user_id_2 = $1 WHERE room_id = $2 RETURNING *',
            user_id, room_id
        );
        return result.rows[0];
    }else if (index = 3) {
        const result = await pool.query(
            'UPDATE rooms SET user_id_3 = $1 WHERE room_id = $2 RETURNING *',
            user_id, room_id
        );
        return result.rows[0];
    }else if (index = 4) {
        const result = await pool.query(
            'UPDATE rooms SET user_id_4 = $1 WHERE room_id = $2 RETURNING *',
            user_id, room_id
        );
        return result.rows[0];
    }
    
}

const deleteRoom = async (roomId) => {
    const result = await pool.query('DELETE FROM rooms WHERE id = $1', roomId);
    return result.rows[0];
}

module.exports = {
    getRoom,
    getAllRooms,
    getAllUsersInRoom,
    createRoom,
    addUserToRoom,
    deleteRoom
}