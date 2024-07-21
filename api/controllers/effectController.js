const effectService = require('../services/effectService');



const getEffect = async (req, res) => {
    const effectId = req.params.id;
    const effect = await effectService.getEffect(effectId);
    res.send(effect);
};

const getAllEffects = async (req, res) => {
    const effects = await effectService.getAllEffects();
    res.send(effects);
}
const createEffect = async (req, res) => {
    const effect = req.body;
    const result = await effectService.createEffect(effect);
    res.send(result);
}
const updateEffect = async (req, res) => {
    const effect = req.body;
    const result = await effectService.updateEffect(effect);
    res.send(result);
}
const deleteEffect = async (req, res) => {
    const effectId = req.params.id;
    const result = await effectService.deleteEffect(effectId);
    res.send(result);
}
module.exports = {
    getEffect,
    getAllEffects,
    createEffect,
    updateEffect,
    deleteEffect
}