const enemyService = require('../services/enemyService');



const getEnemy = async (req, res) => {
    const enemyId = req.params.id;
    const enemy = await enemyService.getEnemy(enemyId);
    res.send(enemy);
};
const getAllEnemies = async (req, res) => {
    const enemies = await enemyService.getAllEnemies();
    res.send(enemies);
}
const createEnemy = async (req, res) => {
    const enemy = req.body;
    const result = await enemyService.createEnemy(enemy);
    res.send(result);
}
const updateEnemy = async (req, res) => {
    const enemy = req.body;
    const result = await enemyService.updateEnemy(enemy);
    res.send(result);
}
const deleteEnemy = async (req, res) => {
    const enemyId = req.params.id;
    const result = await enemyService.deleteEnemy(enemyId);
    res.send(result);
}
module.exports = {
    getEnemy,
    getAllEnemies,
    createEnemy,
    updateEnemy,
    deleteEnemy
}