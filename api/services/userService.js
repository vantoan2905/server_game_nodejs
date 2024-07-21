// services/userService.js
const userDal = require('../dal/userDal');

/**
 * Retrieves all users from the user data access layer.
 *
 * @returns {Promise<Array>} An array of user objects.
 * @throws {Error} If there's an error executing the query.
 */
const getAllUsers = async () => {
    try {
        // Retrieve all users from the user data access layer
        const users = await userDal.getAllUsers();
        return users;
    } catch (err) {
        // If an error occurs, throw a new error with the error message
        throw new Error(err.message);
    }
};


/**
 * Retrieves user details from the user service based on the provided username and password.
 *
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<Object>} The user object if found, null otherwise.
 * @throws {Error} If there was an error retrieving the user.
 */
const getUserDetails = async (username, password) => {
    try {
        // Log the username and password for debugging purposes
        console.log(username, password);

        // Retrieve user details from the user data access layer
        const user = await userDal.getUserById(username, password);

        // If user is not found, throw an error
        if (!user) {
            throw new Error('User not found');
        }

        // Return the user object
        return user;
    } catch (err) {
        // If there was an error retrieving the user, throw an error
        throw new Error(err.message);
    }
};
/**
 * Retrieves a user by their email.
 *
 * @param {string} name - The username of the user.
 * @param {string} email - The email of the user.
 * @returns {Promise<Object|null>} The user object if found, null otherwise.
 * @throws {Error} If there was an error retrieving the user.
 */
const getUserbyEmail = async (name ,email) => {
    try {
        // Retrieve the user from the user data access layer
        const user = await userDal.getUserbyEmail(name ,email);

        // If the user is not found, log a message and return null
        if (user== null) {
            console.log('User not found, can', 't get user');
            return null;
        }

        // Return the user object
        return user;
    } catch (err) {
        // If there was an error retrieving the user, throw an error
        throw new Error(err.message);
    }
}

/**
 * Create a new user with the given username, email, and password.
 *
 * @param {string} username - The username of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<Object>} The newly created user object.
 * @throws {Error} If there was an error creating the user.
 */
const createUser = async (username, email, password) => {
    try {
        // Create a new user using the user data access layer
        const result = await userDal.createUser(username, email, password);
        return result;
    } catch (err) {
        // If there was an error creating the user, throw an error
        throw new Error(err.message);
    }
};

/**
 * Update a user by their user ID with the given user object.
 *
 * @param {string} userId - The user ID of the user to update.
 * @param {Object} user - The updated user object.
 * @returns {Promise<Object>} The updated user object.
 * @throws {Error} If there was an error updating the user.
 */
const updateUser = async (users, newPassword) => {
    try {
        // Update the user using the user data access layer
        const result = await userDal.updateUser(users, newPassword);
        return result;
    } catch (err) {
        // If there was an error updating the user, throw an error
        throw new Error(err.message);
    }
};

/**
 * Delete a user by their user ID.
 *
 * @param {string} userId - The user ID of the user to delete.
 * @returns {Promise<Object>} The deleted user object.
 * @throws {Error} If there was an error deleting the user.
 */
const deleteUser = async (userId) => {
    try {
        // Delete the user using the user data access layer
        const result = await userDal.deleteUser(userId);
        return result;
    } catch (err) {
        // If there was an error deleting the user, throw an error
        throw new Error(err.message);
    }
};

/**
 * Forgot password functionality for a user.
 * Retrieves the user with the given username and email.
 *
 * @param {string} username - The username of the user.
 * @param {string} email - The email of the user.
 * @returns {Promise<Object>} The user object if found, null otherwise.
 * @throws {Error} If there was an error retrieving the user.
 */
const forgotPassword = async (username, email) => {
    try {
        // Retrieve the user with the given username and email
        const result = await userDal.forgotPassword(username, email);
        return result;
    } catch (err) {
        // If there was an error retrieving the user, throw an error
        throw new Error(err.message);
    }
};

const getFriendList = async (userId) => {
    try {
        // Retrieve the user with the given username and email
        const result = await userDal.getFriendList(userId);
        return result;
    } catch (err) {
        // If there was an error retrieving the user, throw an error
        throw new Error(err.message);
    }
};

module.exports = {
    getAllUsers,
    getUserDetails,
    createUser,
    updateUser,
    deleteUser,
    forgotPassword,
    getUserbyEmail, 
    getFriendList

};
