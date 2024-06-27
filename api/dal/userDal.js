const { pool } = require('../db');

// Get all users
const getAllUsers = async () => {
    try {
        const result = await pool.query('SELECT * FROM users');
        return result.rows; // Access rows property for results
    } catch (err) {
        throw new Error(err.message);
    }
};

// Get user by username and password
const getUserById = async (username, password) => {
    try {
        const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';
        const values = [username, password];
        const result = await pool.query(query, values);
        return result.rows[0]; // Access rows property for results
    } catch (err) {
        throw new Error(err.message);
    }
};

// Create a new user
const createUser = async (username, email, password) => {
    try {
        const userId = (Math.floor(Math.random() * 10000) + 1).toString();
        const query = 'INSERT INTO users (user_id, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [userId, username, email, password];
        const result = await pool.query(query, values);
        return result.rows[0]; // Access rows property for results
    } catch (err) {
        throw new Error(err.message);
    }
};

// Update a user
const updateUser = async (userId, user) => {
    try {
        const query = 'UPDATE users SET username = $1, email = $2, password = $3 WHERE user_id = $4 RETURNING *';
        const values = [user.username, user.email, user.password, userId];
        const result = await pool.query(query, values);
        return result.rows[0]; // Access rows property for results
    } catch (err) {
        throw new Error(err.message);
    }
};

// Delete a user
const deleteUser = async (userId) => {
    try {
        const query = 'DELETE FROM users WHERE user_id = $1 RETURNING *';
        const values = [userId];
        const result = await pool.query(query, values);
        return result.rows[0]; // Access rows property for results
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
