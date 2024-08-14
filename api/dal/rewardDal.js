const { pool } = require('../db');


/**
 * Retrieves a specific reward from the database based on the reward ID
 * @param {string} rewardId - The ID of the reward to retrieve
 * @returns {Promise<Object>} The reward object with the specified ID, or null if no reward is found
 */
const getReward = async (rewardId) => {
    // Query the database to retrieve the reward based on the provided ID
    const reward = await pool.query('SELECT * FROM rewards WHERE id = $1', [rewardId]);
    // Return the first row of the result, which should be the reward object
    return reward.rows[0];
}

/**
 * Retrieves all rewards from the database.
 *
 * @return {Promise<Array>} A promise that resolves to an array of reward objects.
 */
const getAllRewards = async () => {
    // Query the database to retrieve all rewards.
    // The 'rows' property of the result is an array containing all the retrieved reward objects.
    // The function returns the array of reward objects.
    const rewards = await pool.query('SELECT * FROM rewards'); // Select all columns from the rewards table
    return rewards.rows; // Return the array of reward objects
}

/**
 * Creates a new reward in the database.
 *
 * @param {Object} reward - The reward object to be created.
 * @param {string} reward.name - The name of the reward.
 * @param {string} reward.description - The description of the reward.
 * @return {Promise<Object>} A promise that resolves to the created reward object.
 */
const createReward = async (reward) => {
    // Use the 'pool' object from the db module to insert a new reward into the database.
    // The reward object contains the name and description of the reward.
    // The 'rows' property of the result is an array containing the newly created reward object.
    // The function returns the first reward object from the array.
    const result = await pool.query('INSERT INTO rewards (name, description) VALUES ($1, $2) RETURNING *', [reward.name, reward.description]);
    return result.rows[0];
}

/**
 * Updates an existing reward in the database.
 *
 * @param {Object} reward - The reward object with updated information.
 * @param {string} reward.name - The updated name of the reward.
 * @param {string} reward.description - The updated description of the reward.
 * @param {number} reward.id - The unique identifier of the reward to update.
 * @return {Promise<Object>} A promise that resolves to the updated reward object.
 */
const updateReward = async (reward) => {
    // Use the 'pool' object from the db module to update a reward in the database.
    // The reward object contains the updated name and description of the reward.
    // The 'rows' property of the result is an array containing the updated reward object.
    // The function returns the first reward object from the array.
    const result = await pool.query(
        'UPDATE rewards SET name = $1, description = $2 WHERE id = $3 RETURNING *',
        [reward.name, reward.description, reward.id]
    );
    return result.rows[0];
}

/**
 * Deletes a reward from the database.
 *
 * @param {number} rewardId - The unique identifier of the reward to be deleted.
 * @returns {Promise<Object>} The deleted reward object.
 */
const deleteReward = async (rewardId) => {
    // Delete the reward from the database
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