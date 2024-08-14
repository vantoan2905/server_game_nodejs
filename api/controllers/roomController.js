const roomService = require('../services/roomService');
const io = require('socket.io')(server); // Assuming 'server' is your http server instance

// Get rooms by id
const getRoom = async (req, res) => {
    const roomId = req.params.id;
    const room = await roomService.getRoom(roomId);
    res.send(room);
};

// Get all rooms
const getAllRooms = async (req, res) => {
    const rooms = await roomService.getAllRooms();
    res.send(rooms);
};

// Create room
const createRoom = async (req, res) => {
    console.log("createRoom");
    const room = req.body;
    const result = await roomService.createRoom(room.user_id);
    res.send(result);
};

// Get user in room
const getUserInRoom = async (req, res) => {
    const roomId = req.params.id;
    const result = await roomService.getAllUsersInRoom(roomId);
    res.send(result);
};

const addUserToRoom = async (req, res) => {
    try {
        // Destructure the room_id and user_id from the request body
        const { room_id, user_id } = req.body;

        // Retrieve all users in the room
        const usersInRoom = await roomService.getAllUsersInRoom(room_id);

        // Extract the user IDs into an array
        const userIDs = [
            usersInRoom[0].user_id_1,
            usersInRoom[0].user_id_2,
            usersInRoom[0].user_id_3,
            usersInRoom[0].user_id_4
        ];

        let index = null;

        // Find the first empty slot
        for (let i = 0; i < userIDs.length; i++) {
            if (userIDs[i] === null) {
                index = i + 1;
                break;
            }
        }

        // If there's no empty slot, return an error
        if (index === null) {
            return res.status(400).send({ message: 'Room is full' });
        }

        // Add the user to the room at the determined index
        const result = await roomService.addUserToRoom(room_id, index, user_id);

        // If the user was added successfully, emit an event to the room
        if (result) {
            io.to(room_id).emit('userJoined', { user_id, room_id });
        }

        // Send the result as the response
        res.send(result);
    } catch (error) {
        // Handle any errors that occur
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

const deleteRoom = async (req, res) => {
    const roomId = req.params.id;
    const result = await roomService.deleteRoom(roomId);
    res.send(result);
};

module.exports = {
    getRoom,
    getAllRooms,
    createRoom,
    addUserToRoom,
    deleteRoom,
    getUserInRoom
};
