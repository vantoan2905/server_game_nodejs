const userService = require('../services/userService');
const emailController = require('../controllers/emailController');

// Define user controller functions
// Resetoken 
let resetToken_;
/**
 * Retrieves all users from the user service and sends them as a JSON response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} Resolves when the response is sent.
 */
const getAllUsers = async (req, res) => {
    try {
        // Retrieve all users from the user service
        const users = await userService.getAllUsers();
        // Send the retrieved users as a JSON response
        res.json(users);
    } catch (err) {
        // If an error occurs, send a 500 status code with the error message
        res.status(500).send(err.message);
    }
};

/**
 * Retrieves user details from the user service based on the provided nickname and password.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} Resolves when the response is sent.
 */
const getUser = async (req, res) => {
    try {
        // Retrieve nickname and password from request query parameters
        const nickname = req.query.nickname;
        const password = req.query.password;

        // Log the nickname and password for debugging purposes
        console.log(nickname, password);

        // Retrieve user details from the user service
        const user = await userService.getUserDetails(nickname, password);

        // If user is found, send the user details as a JSON response
        if (user) {
            res.json(user);
        } else {
            // If user is not found, send a 404 status code with an error message
            res.status(404).send('User not found');
        }
    } catch (err) {
        // If an error occurs, send a 500 status code with the error message
        res.status(500).send(err.message);
    }
};

/**
 * Handles the creation of a new user.
 * Retrieves the nickname, email, and password from the request body
 * and creates a new user using the user service.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} Resolves when the response is sent.
 */
const createUser = async (req, res) => {
    try {
        // Get the nickname, email, and password from the request body
        const nickname = req.body.nickname;
        const password = req.body.password;
        const email = req.body.email;

        // Log the input for debugging purposes
        console.log(nickname, password, email);

        // Create a new user using the user service
        await userService.createUser(nickname, email, password);

        // Send a success response if the user is created successfully
        res.status(201).send('User created successfully');
    } catch (err) {
        // Send an error response if an error occurs
        res.status(500).send(err.message);

        // Log the error and the request body for debugging purposes
        console.log(err);
        console.log(req.body);
    }
};

/**
 * Handles the update of an existing user.
 * Retrieves the user's ID and updated user details from the request body
 * and updates the user using the user service.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} Resolves when the response is sent.
 */
const updateUser = async (req, res) => {
    try {
        // Get the user ID and updated user details from the request body
        
        const user = req.body.nickname;
        const resetToken = req.body.resetToken;
        const newPassword = req.body.newPassword;
        console.log(user, resetToken, newPassword);
        console.log(resetToken_);
        // Update the user using the user service
        if (resetToken == resetToken_){
            const result = await userService.updateUser(user, newPassword);
            res.send(result);
        }

        // Send the updated user as a JSON response
    } catch (err) {
        // Send an error response if an error occurs
        res.status(500).send(err.message);
    }
};

/**
 * Handles the deletion of an existing user.
 * Retrieves the user's ID from the request parameters
 * and deletes the user using the user service.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} Resolves when the response is sent.
 */
const deleteUser = async (req, res) => {
    try {
        // Get the user ID from the request parameters
        const userId = req.params.id;

        // Delete the user using the user service
        const result = await userService.deleteUser(userId);

        // Send a success response if the user is deleted successfully
        res.send(result);
    } catch (err) {
        // Send an error response if an error occurs
        res.status(500).send(err.message);
    }
};

/**
 * Handles the forgot password functionality.
 * Retrieves the user with the given nickname and email
 * and sends a verification email if the user exists.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} Resolves when the response is sent.
 */
const forgotPassword = async (req, res) => {
    try {
        // Get the nickname and email from the request query
        const nickname = req.body.nickname;
        const email = req.body.email;
        console.log(nickname, email);
        // Retrieve the user with the given nickname and email
        const user = await userService.getUserbyEmail(nickname, email);
        
        if (user) {
            // Send a verification email if the user exists
            const [text,token] = await emailController.sendMail( email);
        
            if (text) {
                // Send a success response if the email is sent successfully
                res.status(200).send('Verification email sent');
                console.log("Send email success");
                resetToken_ = token;
                
            } else {
                // Send an error response if the email fails to send
                res.status(500).send('Failed to send verification email');
                console.log("Send email failed");
            }
        } else {
            // Send an error response if the user is not found
            res.status(404).send('User not found');
        }
    } catch (err) {
        // Send an error response if an error occurs
        res.status(500).send(err.message);
        console.log(err);
    }
};
/**
 * Retrieves the friend list of a user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} Resolves when the response is sent.
 */
const getFriendList = async (req, res) => {
    try {
        // Retrieve the friend list of the user with the given ID
        const user = await userService.getFriendList(req.params.id);

        // Send the friend list as a response
        res.send(user);
    } catch (err) {
        // Send an error response if an error occurs
        res.status(500).send(err.message);
    }
}



module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    forgotPassword, 
    getFriendList
};
