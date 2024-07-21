const characterService = require('../services/characterService');


const getCharacter = async (req, res) => {
    const characterId = req.params.id;
    const character = await characterService.getCharacter(characterId);
    res.send(character);
};

const getAllCharacters = async (req, res) => {
    const characters = await characterService.getAllCharacters();
    res.send(characters);
}
const createCharacter = async (req, res) => {
    const character = req.body;
    const result = await characterService.createCharacter(character);
    res.send(result);
}
const updateCharacter = async (req, res) => {
    const character = req.body;
    const result = await characterService.updateCharacter(character);
    res.send(result);
}
const deleteCharacter = async (req, res) => {
    const characterId = req.params.id;
    const result = await characterService.deleteCharacter(characterId);
    res.send(result);
}
module.exports = {
    getCharacter,
    getAllCharacters,
    createCharacter,
    updateCharacter,
    deleteCharacter
}