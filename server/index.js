const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
require('./config/config.js');
require('dotenv').config()

const app = express()
var server = require('http').createServer(app);
var io = require("socket.io").listen(server);
var nicknames = {};
 
//const app = express()
const path = require('path');

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


const apiRoutes =  require('./routes/api.js')(app);
app.use("/api", apiRoutes);

//app.use(cors());


const CONNECTION_URL =
  "mongodb+srv://admin:1234@4me4u.4lr2m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


/*
app.get('/', function(req, res) {
  res.sendFile(renderHTML);
})
*/

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});

// Connect to MongoDB

mongoose.connect(process.env.URLDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => 
  app.listen(process.env.PORT, () => 
  console.log("Connection is established on port:" + process.env.PORT)
  )
).catch((err) => console.log(err.message)); 

server.listen(process.env.PORT, process.env.IP);

io.sockets.on('connection', function(socket) {
  socket.on('send message', function(data) {
      io.sockets.emit('new message', {msg: data, nick: socket.nickname});
  });
  
  socket.on('new user', function(data, callback) {
      if (data in nicknames) {
          callback(false);
      } else {
          callback(true);
          socket.nickname = data;
          nicknames[socket.nickname] = 1;
          updateNickNames();
      }
  });
  
  socket.on('disconnect', function(data) {
      if(!socket.nickname) return;
      delete nicknames[socket.nickname];
      updateNickNames();
  });
  
  function updateNickNames() {
      io.sockets.emit('usernames', nicknames);
  }
});