const effectDal = require('../dal/effectDal');


/**
 * Retrieves an effect based on the effectId.
 * @param {string} effectId - The unique identifier of the effect.
 * @returns {Object} - The effect object.
 */
const getEffect = async (effectId) => {
    // Call effectDal to get the effect based on effectId
    const effect = await effectDal.getEffect(effectId);
    return effect;
}

/**
 * Retrieves all effects from the database.
 * @returns {Array} - An array of effect objects.
 */
const getAllEffectsService = async () => {
    // Call effectDal to get all effects
    const effects = await effectDal.getAllEffects();
    return effects;
}

/**
 * Creates an effect in the database.
 * @param {Object} effect - The effect object to be created.
 * @returns {Object} - The created effect object.
 */
const createEffect = async (effect) => {
    // Call effectDal to create the effect in the database
    const result = await effectDal.createEffect(effect);
    
    // Return the created effect object
    return result;
}


/**
 * Updates an effect in the database.
 * @param {Object} effect - The effect object to be updated.
 * @returns {Object} - The updated effect object.
 */
const updateEffect = async (effect) => {
    // Call effectDal to update the effect in the database
    const result = await effectDal.updateEffect(effect);
    
    // Return the updated effect object
    return result;
}

/**
 * Deletes an effect from the database.
 * @param {string} effectId - The unique identifier of the effect to be deleted.
 * @returns {Object} - The deleted effect object.
 */
const deleteEffect = async (effectId) => {
    // Call effectDal to delete the effect in the database
    const result = await effectDal.deleteEffect(effectId);
    
    // Return the deleted effect object
    return result;
}


module.exports = {
    getEffect,
    getAllEffectsService,
    createEffect,
    updateEffect,
    deleteEffect
}