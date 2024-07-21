const characterDal = require('../dal/characterDal');


/**
 * Retrieves a character from the database based on the provided characterId.
 *
 * @param {number} characterId - The unique identifier of the character to retrieve.
 * @return {Promise<Object>} A promise that resolves to the character object.
 */
const getCharacter = async (characterId) => {
    // Use the characterDal to retrieve the character from the database.
    const character = await characterDal.getCharacter(characterId);
    
    // Return the character object.
    return character;
}

/**
 * Retrieves all characters from the database.
 *
 * @return {Promise<Array>} A promise that resolves to an array of character objects.
 */
const getAllCharactersService = async () => {
    // Use the characterDal to retrieve all characters from the database.
    const characters = await characterDal.getAllCharacters();
    
    // Return the array of character objects.
    return characters;
}


/**
 * Creates a new character in the database.
 *
 * @param {Object} character - The character object to be created.
 * @return {Promise<Object>} A promise that resolves to the created character object.
 */
const createCharacter = async (character) => {
    // Call the DAL function to create the character and await its result.
    const result = await characterDal.createCharacter(character);
    
    // Return the newly created character object.
    return result;
}

/**
 * Updates an existing character in the database.
 *
 * @param {Object} character - The character object with updated information.
 * @return {Promise<Object>} A promise that resolves to the updated character object.
 */
const updateCharacter = async (character) => {
    // Call the DAL function to update the character and await its result.
    // The updated character object is returned.
    const result = await characterDal.updateCharacter(character);
    
    // Return the updated character object.
    return result;
}

/**
 * Deletes an existing character from the database.
 *
 * @param {number} characterId - The unique identifier of the character to delete.
 * @return {Promise<Object>} A promise that resolves to the deleted character object.
 */
const deleteCharacter = async (characterId) => {
    // Call the DAL function to delete the character and await its result.
    // The deleted character object is returned.
    const result = await characterDal.deleteCharacter(characterId);
    
    // Return the deleted character object.
    return result;
}


module.exports = {
    getCharacter,
    getAllCharactersService,
    createCharacter,
    updateCharacter,
    deleteCharacter
}