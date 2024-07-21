const { pool } = require('../db');

const getEffect = async (effectId) => {
    const effect = await pool.query('SELECT * FROM effect_list WHERE id = $1', [effectId]);
    return effect.rows[0];
}
const getAllEffects = async () => {
    const effects = await pool.query('SELECT * FROM effect_list');
    return effects.rows;
}
const createEffect = async (effect) => {
    const result = await pool.query('INSERT INTO effect_list (name, description) VALUES ($1, $2) RETURNING *', [effect.name, effect.description]);
    return result.rows[0];
}

const updateEffect = async (effect) => {
    const result = await pool.query('UPDATE effect_list SET name = $1, description = $2 WHERE id = $3 RETURNING *', [effect.name, effect.description, effect.id]);
    return result.rows[0];
}
const deleteEffect = async (effectId) => {
    const result = await pool.query('DELETE FROM effect_list WHERE id = $1 RETURNING *', [effectId]);
    return result.rows[0];
}
module.exports = {
    getEffect,
    getAllEffects,
    createEffect,
    updateEffect,
    deleteEffect
}