// controllers/userController.js
const userService = require('../services/userService');

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getUser = async (req, res) => {
    try {
       
        const username = req.query.username;
        const password = req.query.password;
        console.log(username, password);
        const user = await userService.getUserDetails(username, password);
     
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
        
        
    } catch (err) {
        res.status(500).send(err.message);
    }
};




const createUser = async (req, res) => {
    try {

        username = req.body.username;
        password = req.body.password;
        email = req.body.email;
        console.log(username,password,email)
        await userService.createUser(username, email, password);
    } catch (err) {
        res.status(500).send(err.message);
        console.log(err)
        console.log(req.body)
        
    }
    
};

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = req.body;
        const result = await userService.updateUser(userId, user);
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const result = await userService.deleteUser(userId);
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
};
