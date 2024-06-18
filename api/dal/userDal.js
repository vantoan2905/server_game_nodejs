// dal/userDal.js
const { poolPromise } = require('../db');

const getAllUsers = async () => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM users');
        return result.recordset;
    } catch (err) {
        throw new Error(err.message);
    }
};

const getUserById = async (username, password) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('username', username)
            .input('password', password)
            .query('SELECT * FROM users WHERE username = @username AND password = @password');
        return result.recordset[0];
    } catch (err) {
        throw new Error(err.message);
    }
};

const createUser = async (username, email , password) => {
    try {
        const user_id = (Math.floor(Math.random() * 10000) + 1).toString();
        const pool = await poolPromise;
        const result = await pool.request()
            .input('user_id', user_id)
            .input('username', username)
            .input('email', email)
            .input('password', password)
            .query('INSERT INTO users (user_id, username, email, password) VALUES (@user_id, @username, @email, @password)');
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const updateUser = async (userId, user) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('userId', userId)
            .input('username', user.username)
            .input('email', user.email)
            .input('password', user.password)
            .query('UPDATE users SET username = @username, email = @email, password = @password WHERE user_id = @userId');
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const deleteUser = async (userId) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('userId', userId)
            .query('DELETE FROM users WHERE user_id = @userId');
        return result;
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
