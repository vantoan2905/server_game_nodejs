const { pool } = require('../db');
const bcrypt = require('bcrypt');

/**
 * Retrieves all users from the database.
 *
 * @return {Promise<Array>} An array of user objects.
 * @throws {Error} If there's an error executing the query.
 */
const getAllUsers = async () => {
    try {
        // Execute the SELECT query to retrieve all users
        const result = await pool.query('SELECT * FROM users_information');

        // Return the rows property of the result object, which contains the user records
        return result.rows; 
    } catch (err) {
        // If an error occurs, throw a new error with the error message
        throw new Error(err.message);
    }
};

// Get user by username and password
/**
 * Function to retrieve a user from the database based on username and password.
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {Object} - The user object if found, otherwise null.
 */
const getUserById = async (username, password) => {
    try {
        // Fetch the user record from the database based on username
        const query = 'SELECT * FROM users_information WHERE username = $1';
        const values = [username];
        const result = await pool.query(query, values);
        
        if (result.rows.length === 0) {
            // User not found
            return null;
        }

        const user = result.rows[0];
        const hashedPassword = user.password;

        // Compare the provided password with the hashed password from the database
        const passwordMatch = await bcrypt.compare(password + username, hashedPassword);
        if (!passwordMatch) {
            // Passwords do not match
            return null;
        }

        // Passwords match, return the user object
        return user;
    } catch (err) {
        throw new Error(err.message);
    }
};

/**
 * Retrieves a user from the database based on their username and email.
 * @param {string} name - The username of the user.
 * @param {string} email - The email of the user.
 * @returns {Promise<Object|null>} - The user object if found, otherwise null.
 * @throws {Error} - If there's an error executing the query.
 */
const getUserbyEmail = async (name ,email) => {
    try {
        // Construct the SQL query to retrieve the user
        const query = 'SELECT * FROM users_information WHERE username = $1 AND email = $2';
        
        // Log the username and email for debugging purposes
        console.log(name,email)
        
        // Execute the query with the provided username and email
        const values = [name ,email];
        const result = await pool.query(query, values);
        
        // If no user is found, return null
        if (result.rows.length === 0) {
            return null;
        }
        
        // Return the first user in the result set
        return result.rows[0]; // Access rows property for results
    } catch (err) {
        // If an error occurs, throw a new error with the error message
        throw new Error(err.message);
    }
}

// Create a new user


/**
 * Creates a new user with a formatted user ID like U000001.
 * @param {string} username - The username of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<Object>} - The newly created user object.
 * @throws {Error} - If there's an error executing the query.
 */
const createUser = async (username, email, password) => {
    try {
        // Generate a formatted user ID
        const userId = generateUserId();

        // Hash the password before storing

        // Hash the password + username using bcrypt
        const hashedPassword = await bcrypt.hash(password + username, 10);

        // SQL query to insert a new user
        const query = 'INSERT INTO users_information (user_id, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [userId, username, email, hashedPassword];

        // Execute the query
        const result = await pool.query(query, values);

        return result.rows[0]; // Return the newly created user
    } catch (err) {
        throw new Error(err.message);
    }
};

/**
 * Function to generate a user ID formatted as U000001.
 * @returns {string} The generated user ID.
 */
const generateUserId = () => {
    // Generate a random number between 1 and 999999
    const randomNumber = Math.floor(Math.random() * 999999) + 1;

    // Pad the random number with leading zeros to make it 6 digits long
    const userId = 'U' + randomNumber.toString().padStart(6, '0');

    // Return the generated user ID
    return userId;
};


/**
 * Updates a user in the database.
 * @param {string} user - The username of the user to update.
 * @param {string} resetToken - The reset token for the user.
 * @param {string} newPassword - The new password for the user.
 * @returns {Promise<Object>} - The updated user object.
 * @throws {Error} - If there's an error executing the query.
 */
const updateUser = async (user, newPassword) => {
    try {
        // Hash the new password and concatenate it with the user
        const hashedPassword = await bcrypt.hash(newPassword + user, 10);

        // Construct the SQL query to update the user
        // The query sets the username and password fields to the provided values
        // and returns the updated row
        const query = 'UPDATE users_information SET username = $1, password = $2 WHERE username = $3 RETURNING *';

        // Construct the values to be used in the query
        // The values are [newUsername, hashedPassword, newUsername]
        const values = [user, hashedPassword, user];

        // Execute the query
        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            throw new Error('User not found');
        }else{
            console.log("User updated successfully");
        }
        // Return the updated user object
        return result.rows[0]; // Access rows property for results
    } catch (err) {
        // If an error occurs, throw a new error with the error message
        throw new Error(err.message);
    }
};

/**
 * Delete a user from the database.
 * @param {string} userId - The ID of the user to delete.
 * @returns {Promise<Object>} - The deleted user object.
 * @throws {Error} - If there's an error executing the query.
 */
const deleteUser = async (userId) => {
    try {
        // Construct the SQL query to delete the user
        const query = 'DELETE FROM users_information WHERE user_id = $1 RETURNING *';

        // Construct the values to be used in the query
        const values = [userId];

        // Execute the query
        const result = await pool.query(query, values);

        // Return the deleted user object
        return result.rows[0]; // Access rows property for results
    } catch (err) {
        // If an error occurs, throw a new error with the error message
        throw new Error(err.message);
    }
};
/**
 * Retrieves a user from the database based on their username and email.
 * @param {string} username - The username of the user.
 * @param {string} email - The email of the user.
 * @returns {Promise<Object|null>} - The user object if found, otherwise null.
 * @throws {Error} - If there's an error executing the query.
 */
const forgotPassword = async (username, email) => {
    try {
        // Construct the SQL query to retrieve the user
        const query = 'SELECT * FROM users_information WHERE username = $1 AND email = $2';
        
        // Construct the values to be used in the query
        const values = [username, email];
        
        // Execute the query
        const result = await pool.query(query, values);
        
        // If no user is found, return null
        if (result.rows.length === 0) {
            return null;
        }
        
        // Return the first user in the result set
        return result.rows[0]; // Access rows property for results
    } catch (err) {
        // If an error occurs, log the error message and return null
        console.log(err.message);
        return null;
    }
};
const getFriendList = async (userId) => {
    try {
        // Construct the SQL query to retrieve the user
        const query = 'SELECT friend_list FROM relationship WHERE user_req = $1';
        
        // Construct the values to be used in the query
        const values = [userId];
        
        // Execute the query
        const result = await pool.query(query, values);
        
        // If no user is found, return null
        if (result.rows.length === 0) {
            return null;
        }
        
        // Return the first user in the result set
        return result.rows[0].friend_list; // Access rows property for results
    } catch (err) {
        // If an error occurs, log the error message and return null
        console.log(err.message);
        return null;
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    forgotPassword,
    getUserbyEmail, 
    getFriendList
};
