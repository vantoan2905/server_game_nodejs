const rewardDal = require('../dal/rewardDal');


/**
 * Retrieves a specific reward from the data access layer
 * @param {string} rewardId - The ID of the reward to retrieve
 * @returns {Promise<Object>} The reward object with the specified ID, or null if no reward is found
 */
const getReward = async (rewardId) => {
    // Retrieve the reward from the data access layer
    const reward = await rewardDal.getReward(rewardId);
    // Return the retrieved reward
    return reward;
}

/**
 * Retrieves all rewards from the data access layer
 * @returns {Promise<Array>} An array of reward objects
 */
const getAllRewards = async () => {
    // Retrieve all rewards from the data access layer
    const rewards = await rewardDal.getAllRewards(); 
    // Return the retrieved rewards
    return rewards;
}


/**
 * Creates a new reward in the data access layer
 * @param {Object} reward - The reward object to be created
 * @returns {Promise<Object>} The created reward object
 */
const createReward = async (reward) => {
    // Create the reward in the data access layer
    const result = await rewardDal.createReward(reward);
    // Return the created reward
    return result;
}

/**
 * Updates a reward in the data access layer
 * @param {Object} reward - The reward object to be updated
 * @returns {Promise<Object>} The updated reward object
 */
const updateReward = async (reward) => {
    // Update the reward in the data access layer
    const result = await rewardDal.updateReward(reward);
    // Return the updated reward
    return result;
}

/**
 * Deletes a reward from the data access layer
 * @param {string} rewardId - The ID of the reward to be deleted
 * @returns {Promise<Object>} The deleted reward object
 */
const deleteReward = async (rewardId) => {
    // Delete the reward from the data access layer
    const result = await rewardDal.deleteReward(rewardId);
    // Return the deleted reward
    return result;
}

module.exports = {
    getReward,
    getAllRewards,
    createReward,
    updateReward,
    deleteReward
}