const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./api/controllers/userController');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// userController routes
app.get('/users', userController.getAllUsers);
app.get('/users/getUser', userController.getUser);
app.post('/users/addUser', userController.createUser);
app.post('/users/forgotPassword', userController.forgotPassword);
app.post('/users/resetPassword', userController.updateUser);

module.exports = app;
