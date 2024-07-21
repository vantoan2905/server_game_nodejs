const { pool } = require('../db');


const getReward = async (rewardId) => {
    const reward = await pool.query('SELECT * FROM rewards WHERE id = $1', [rewardId]);
    return reward.rows[0];
}

const getAllRewards = async () => {
    const rewards = await pool.query('SELECT * FROM rewards');
    return rewards.rows;
}

const createReward = async (reward) => {
    const result = await pool.query('INSERT INTO rewards (name, description) VALUES ($1, $2) RETURNING *', [reward.name, reward.description]);
    return result.rows[0];
}

const updateReward = async (reward) => {
    const result = await pool.query('UPDATE rewards SET name = $1, description = $2 WHERE id = $3 RETURNING *', [reward.name, reward.description, reward.id]);
    return result.rows[0];
}

const deleteReward = async (rewardId) => {
    const result = await pool.query('DELETE FROM rewards WHERE id = $1 RETURNING *', [rewardId]);
    return result.rows[0];
}

module.exports = {
    getReward,
    getAllRewards,
    createReward,
    updateReward,
    deleteReward
}