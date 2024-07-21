const { pool } = require('../db');


/**
 * Retrieves a character from the database based on the provided characterId.
 *
 * @param {number} characterId - The unique identifier of the character to retrieve.
 * @return {Promise<Object>} A promise that resolves to the character object.
 */
const getCharacter = async (characterId) => {
    // Use the 'pool' object from the db module to query the database for a character.
    // The characterId parameter is used as a query parameter to retrieve the character with the corresponding id.
    // The 'rows' property of the result is an array containing the retrieved character object.
    // The function returns the first character object from the array.
    const character = await pool.query('SELECT * FROM characters_information WHERE id = $1', [characterId]);
    return character.rows[0];
}
/**
 * Retrieves all characters from the database.
 *
 * @return {Promise<Array>} A promise that resolves to an array of character objects.
 */
const getAllCharacters = async () => {
    // Use the 'pool' object from the db module to query the database for all characters.
    // The 'rows' property of the result is an array containing all the retrieved character objects.
    // The function returns the array of character objects.
    const characters = await pool.query('SELECT * FROM characters_information'); // Select all columns from the characters_information table
    return characters.rows; // Return the array of character objects
}
/**
 * Creates a new character in the database.
 *
 * @param {Object} character - The character object to be created.
 * @param {string} character.name - The name of the character.
 * @param {string} character.description - The description of the character.
 * @return {Promise<Object>} A promise that resolves to the created character object.
 */
const createCharacter = async (character) => {
    // Use the 'pool' object from the db module to insert a new character into the database.
    // The character object contains the name and description of the character.
    // The 'rows' property of the result is an array containing the newly created character object.
    // The function returns the first character object from the array.
    const result = await pool.query('INSERT INTO characters_information (name, description) VALUES ($1, $2) RETURNING *', [character.name, character.description]);
    return result.rows[0];
}

/**
 * Updates an existing character in the database.
 *
 * @param {Object} character - The character object with updated information.
 * @param {string} character.name - The updated name of the character.
 * @param {string} character.description - The updated description of the character.
 * @param {number} character.id - The unique identifier of the character to update.
 * @return {Promise<Object>} A promise that resolves to the updated character object.
 */
const updateCharacter = async (character) => {
    // Use the 'pool' object from the db module to update a character in the database.
    // The character object contains the updated name and description of the character.
    // The 'rows' property of the result is an array containing the updated character object.
    // The function returns the first character object from the array.
    const result = await pool.query(
        'UPDATE characters_information SET name = $1, description = $2 WHERE id = $3 RETURNING *',
        [character.name, character.description, character.id]
    );
    return result.rows[0];
}

/**
 * Deletes a character from the database based on the provided characterId.
 *
 * @param {number} characterId - The unique identifier of the character to delete.
 * @return {Promise<Object>} A promise that resolves to the deleted character object.
 */
const deleteCharacter = async (characterId) => {
    // Use the 'pool' object from the db module to delete a character from the database.
    // The characterId parameter is used as a query parameter to delete the character with the corresponding id.
    // The 'rows' property of the result is an array containing the deleted character object.
    // The function returns the first character object from the array.
    const result = await pool.query('DELETE FROM characters_information WHERE id = $1 RETURNING *', [characterId]);
    return result.rows[0];
}
module.exports = {
    getCharacter,
    getAllCharacters,
    createCharacter,
    updateCharacter,
    deleteCharacter
}