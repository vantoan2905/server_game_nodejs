// services/userService.js
const userDal = require('../dal/userDal');

const getAllUsers = async () => {
    try {
        const users = await userDal.getAllUsers();
        return users;
    } catch (err) {
        throw new Error(err.message);
    }
};

const getUserDetails = async (username, password) => {
    try {
        const user = await userDal.getUserById(username, password);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (err) {
        throw new Error(err.message);
    }
};

const createUser = async (username, email, password) => {
    try {
        const result = await userDal.createUser(username, email, password);
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const updateUser = async (userId, user) => {
    try {
        const result = await userDal.updateUser(userId, user);
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const deleteUser = async (userId) => {
    try {
        const result = await userDal.deleteUser(userId);
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = {
    getAllUsers,
    getUserDetails,
    createUser,
    updateUser,
    deleteUser
};
