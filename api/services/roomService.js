

const roomDal = require('../dal/roomDal');

const getRoom = async (roomId) => {
    return await roomDal.getRoom(roomId);
}

const getAllRooms = async () => {
    return await roomDal.getAllRooms();
}
const getAllUsersInRoom = async (room_id) => {
    return await roomDal.getAllUsersInRoom(room_id);
}
const createRoom = async (user_id) => {
    return await roomDal.createRoom(user_id);
}

const addUserToRoom = async (room_id, index, user_id) => {
    return await roomDal.addUserToRoom(room_id, index, user_id);
}

const deleteRoom = async (room_id) => {
    return await roomDal.deleteRoom(room_id);
}

module.exports = {
    getRoom,
    getAllRooms,
    getAllUsersInRoom,
    createRoom,
    addUserToRoom,
    deleteRoom
}