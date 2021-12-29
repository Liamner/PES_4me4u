const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./config/config.js');
require('dotenv').config();
const io = require('socket.io')(3000);
 
const app = express()
const path = require('path');

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


const apiRoutes =  require('./routes/api.js')(app);
app.use("/api", apiRoutes);

app.use(cors());


// Sockets

io.on('connection', (socket) => {
  // Connect User
  console.log('user connected')
  // take userId and socketId from user
  // necesitamos id del User
  socket.on('newUser', userId => {
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

// Connect to MongoDB

mongoose.connect(process.env.URLDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => 
  app.listen(process.env.PORT, () => 
  console.log("Connection is established on port:" + process.env.PORT)
  )
).catch((err) => console.log(err.message)); 