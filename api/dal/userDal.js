const { pool } = require('../db');
const bcrypt = require('bcrypt');
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


// Function to create a new user with a formatted userId like U000001
const createUser = async (username, email, password) => {
    try {
        // Generate a formatted userId
        const userId = generateUserId();

        // Hash the password before storing
        const saltRounds = 10; // You can adjust the number of rounds based on your security requirements
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // SQL query to insert a new user
        const query = 'INSERT INTO users (user_id, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [userId, username, email, hashedPassword];

        // Execute the query
        const result = await pool.query(query, values);

        return result.rows[0]; // Return the newly created user
    } catch (err) {
        throw new Error(err.message);
    }
};

// Function to generate userId formatted as U000001
const generateUserId = () => {
    const randomNumber = Math.floor(Math.random() * 999999) + 1;
    const userId = 'U' + randomNumber.toString().padStart(6, '0');
    return userId;
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
