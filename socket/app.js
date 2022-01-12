const express = require('express')
const app = express();

const http = require('http')
const server = http.createServer(app)

const socket = require('socket.io')
const io = socket(server)

io.on('connection', (socket) => {
    // Connect User
    console.log('user connected')
    // take userId and socketId from user
    // necesitamos id del User
    socket.on('newUser', userId => {
            console.log('New user: ' + userId)
            //addUser(userId, socket.id);
            //io.emit('getUsers', users)
    });

    // Send message
    socket.on('sendMessage',(text) => {
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

app.get('/', (req,res) => {
    res.sendFile(`${__dirname}/index.html`)
})
const port = process.env.PORT || 3000
server.listen(port, () => {
    console.log(`Server running on port: ${port}`)
    })