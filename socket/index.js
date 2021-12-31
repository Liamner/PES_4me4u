const io = require('socket.io')(3000);

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