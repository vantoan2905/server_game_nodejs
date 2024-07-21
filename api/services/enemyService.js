const enemyDal = require('../dal/enemyDal');

/**
 * Retrieves an enemy from the database based on the provided enemyId.
 *
 * @param {number} enemyId - The unique identifier of the enemy to retrieve.
 * @return {Promise<Object>} A promise that resolves to the enemy object.
 */
const getEnemy = async (enemyId) => {
    // Use the enemyDal to retrieve the enemy from the database.
    const enemy = await enemyDal.getEnemy(enemyId);
    
    // Return the enemy object.
    return enemy;
}


/**
 * Retrieves all enemies from the database.
 *
 * @return {Promise<Array>} A promise that resolves to an array of enemy objects.
 */
const getAllEnemies = async () => {
    // Use the enemyDal to retrieve all enemies from the database.
    const enemies = await enemyDal.getAllEnemies();
    
    // Return the array of enemy objects.
    return enemies;
}


/**
 * Creates a new enemy in the database.
 *
 * @param {Object} enemy - The enemy object to be created.
 * @param {string} enemy.name - The name of the enemy.
 * @param {string} enemy.description - The description of the enemy.
 * @return {Promise<Object>} A promise that resolves to the created enemy object.
 */
const createEnemy = async (enemy) => {
    // Use the enemyDal to create a new enemy in the database.
    // The enemy object contains the name and description of the enemy.
    const result = await enemyDal.createEnemy(enemy);
    
    // Return the created enemy object.
    return result;
}


/**
 * Updates an existing enemy in the database.
 *
 * @param {Object} enemy - The enemy object to be updated.
 * @param {number} enemy.id - The unique identifier of the enemy to update.
 * @param {string} enemy.name - The new name of the enemy.
 * @param {string} enemy.description - The new description of the enemy.
 * @return {Promise<Object>} A promise that resolves to the updated enemy object.
 */
const updateEnemy = async (enemy) => {
    // Use the enemyDal to update the enemy in the database.
    // The enemy object contains the id, name, and description of the enemy to update.
    const result = await enemyDal.updateEnemy(enemy);
    
    // Return the updated enemy object.
    return result;
}


/**
 * Deletes an existing enemy from the database.
 *
 * @param {number} enemyId - The unique identifier of the enemy to delete.
 * @return {Promise<Object>} A promise that resolves to the deleted enemy object.
 */
const deleteEnemy = async (enemyId) => {
    // Use the enemyDal to delete the enemy from the database.
    // The enemyId parameter is the unique identifier of the enemy to delete.
    const result = await enemyDal.deleteEnemy(enemyId);
    
    // Return the deleted enemy object.
    return result;
}

module.exports = {
    getEnemy,
    getAllEnemies,
    createEnemy,
    updateEnemy,
    deleteEnemy
}