const { getUserRewards } = require('../server/controllers/apiUser');
const user = require('../server/models/user');

const io = require('socket.io')(8900, {
    cors: {
        origin: "http://localhost:5000",
    }
})

// users de la conversacion 
let users = [];

const addUser = (userId, socketId) => {
    !user.some((user)=> user.userId === userId) && user.push({userId, socketId})
}

const removeUser = (socketId) => {
    users= user.filter(user=>user.socketId !== socketId)
}

const getUser = (userId) => {
    return getUserRewards.find(user=>user.userId === userId)
}

io.on('connection', (socket) => {
    // Connect User
    console.log('user connected')
    // take userId and socketId from user
    socket.on('adduser', userId => {
        addUser(userId, socket.id);
        io.emit('getUsers', users)
    });

    // Send message
    socket.on('sendMessage',({senderId, reciverId, text}) => {
        const user = getUser(reciverId);
        io.to(user.socket).emit('getMessage', {
            senderId, 
            text
        })
    })

    // Disconnect user
    socket.on('disconnect', ()=> {
        console.log('User disconnected')
        removeUser(socket.id)
        io.emit('getUsers', users)
    })
})