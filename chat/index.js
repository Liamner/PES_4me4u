const express = require('express')
const http = require('http')
const socket = require('socket.io');

const app = express()
const server = http.createServer(app)
const io = socket().listen(server);
const port = process.env.PORT || 3000


// just to test the server
app.get('/', (req, res) => {
    const path = require('path')
      res.sendFile(path.join(__dirname +'/index.html'));
})

// Sockets

io.on('connection', (socket) => {
    // Connect User
    console.log('user connected')
    // take userId and socketId from user
    // necesitamos id del User
    socket.on('newUser', userId => {
            console.log('New user: ' + userId)
            addUser(userId, socket.id);
            io.emit('getUsers', users)
    });

    // Send message
    socket.on('sendMessage',({senderId, reciverId, text}) => {
        console.log('New Message: ' + text)
        /*const user = getUser(reciverId);
        io.to(user.socket).emit('getMessage', {
            senderId, 
            text
        })*/
    })

    // Disconnect user
    socket.on('disconnect', ()=> {
        console.log('User disconnected')
        //removeUser(socket.id)
        //io.emit('getUsers', users)
    })
})

let users = [];

const addUser = (userId, socketId) => {
    console.group('adding users: ' + userId)
    users.push({userId, socketId})
    console.log(users)
    //!user.some((user)=> user.userId === userId) && user.push({userId, socketId})
}
const getUser = (userId) => {
    return users.find(user=>user.userId === userId)
}
/*
const removeUser = (socketId) => {
    users= user.filter(user=>user.socketId !== socketId)
}

const getUser = (userId) => {
    return getUserRewards.find(user=>user.userId === userId)
}
  
*/
server.listen(port, () => {
console.log(`Server running on port: ${port}`)
})