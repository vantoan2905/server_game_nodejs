// app.js

const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./api/controllers/userController');
const characterController = require('./api/controllers/characterController');
const effectController = require('./api/controllers/effectController');
const enemyController = require('./api/controllers/enemyController');
const rewardController = require('./api/controllers/rewardController');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// userController routes
app.get('/users', userController.getAllUsers);
app.get('/users/getUser', userController.getUser);
app.post('/users/addUser', userController.createUser);
app.post('/users/forgotPassword', userController.forgotPassword);
app.post('/users/resetPassword', userController.updateUser);
app.get('/users/friendList', userController.getFriendList);

// characterController routes
app.get('/characters', characterController.getAllCharacters);
app.get('/characters/getCharacter', characterController.getCharacter);
app.post('/characters/addCharacter', characterController.createCharacter);
app.post('/characters/updateCharacter', characterController.updateCharacter);
app.delete('/characters/deleteCharacter', characterController.deleteCharacter);

// effectController routes
app.get('/effects', effectController.getAllEffects);
app.get('/effects/getEffect', effectController.getEffect);
app.post('/effects/addEffect', effectController.createEffect);
app.post('/effects/updateEffect', effectController.updateEffect);
app.delete('/effects/deleteEffect', effectController.deleteEffect);

// enemyController routes
app.get('/enemies', enemyController.getAllEnemies);
app.get('/enemies/getEnemy', enemyController.getEnemy);
app.post('/enemies/addEnemy', enemyController.createEnemy);
app.post('/enemies/updateEnemy', enemyController.updateEnemy);
app.delete('/enemies/deleteEnemy', enemyController.deleteEnemy);

// rewardController routes
app.get('/rewards', rewardController.getAllRewards);
app.get('/rewards/getReward', rewardController.getReward);
app.post('/rewards/addReward', rewardController.createReward);
app.post('/rewards/updateReward', rewardController.updateReward);
app.delete('/rewards/deleteReward', rewardController.deleteReward);


module.exports = app;
