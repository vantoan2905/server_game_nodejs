// server.js
const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./api/controllers/userController');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/users', userController.getAllUsers);
app.get('/users/getUser', userController.getUser);
app.post('/users/addUser', userController.createUser);
app.put('/users/:id', userController.updateUser);
app.delete('/users/:id', userController.deleteUser);


module.exports = app;