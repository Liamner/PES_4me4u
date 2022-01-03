const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const colors = require('colors');

const app = express();
const server = http.createServer(app);

var PORT = 3000;

const clientPath = `${__dirname}/../client`;
console.log(`Serving static from ${clientPath}`);
app.use(express.static(clientPath));

app.get('/', function(req, res){
    res.sendFile(clientPath+'/index.html');
});
const io = socketio(server);

io.on('connection', (sock) => {
	console.log("We have a new client: " + sock.id);
    sock.on('newmessage', (data) => {
        io.emit('newmessage', data)
    })
});
server.on('error', (err) => {
    console.error('Server error:', err);
  });
  
  
server.listen(PORT, () => {
    console.log('Server started on ', PORT);
});