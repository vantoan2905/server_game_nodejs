const { pool } = require('../db');


const getEnemy = async (enemyId) => {
    const enemy = await pool.query('SELECT * FROM enemy WHERE id = $1', [enemyId]);
    return enemy.rows[0];
}
const getAllEnemies = async () => {
    const enemies = await pool.query('SELECT * FROM enemy');
    return enemies.rows;
}
const createEnemy = async (enemy) => {
    const result = await pool.query('INSERT INTO enemy (name, description) VALUES ($1, $2) RETURNING *', [enemy.name, enemy.description]);
    return result.rows[0];
}
const updateEnemy = async (enemy) => {
    const result = await pool.query('UPDATE enemy SET name = $1, description = $2 WHERE id = $3 RETURNING *', [enemy.name, enemy.description, enemy.id]);
    return result.rows[0];
}
const deleteEnemy = async (enemyId) => {
    const result = await pool.query('DELETE FROM enemy WHERE id = $1 RETURNING *', [enemyId]);
    return result.rows[0];
}
module.exports = {
    getEnemy,
    getAllEnemies,
    createEnemy,
    updateEnemy,
    deleteEnemy
}