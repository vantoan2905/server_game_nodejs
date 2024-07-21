const rewardService = require('../services/rewardService');



const getReward = async (req, res) => {
    const rewardId = req.params.id;
    const reward = await rewardService.getReward(rewardId);
    res.send(reward);
};
const getAllRewards = async (req, res) => {
    const rewards = await rewardService.getAllRewards();
    res.send(rewards);
}
const createReward = async (req, res) => {
    const reward = req.body;
    const result = await rewardService.createReward(reward);
    res.send(result);
}
const updateReward = async (req, res) => {
    const reward = req.body;
    const result = await rewardService.updateReward(reward);
    res.send(result);
}
const deleteReward = async (req, res) => {
    const rewardId = req.params.id;
    const result = await rewardService.deleteReward(rewardId);
    res.send(result);
}
module.exports = {
    getReward,
    getAllRewards,
    createReward,
    updateReward,
    deleteReward
}