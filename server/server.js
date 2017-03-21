const path = require('path');  //this is a build in node module.  doesn't need installing
const http = require('http');
const express = require('express')
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '/../public');

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);      //reson to use this instead of express build in http service is cos we want to use socket.io
var io = socketIO(server);                //giving us 2 way comms between client and server.

app.use(express.static(publicPath));


io.on('connection', (socket) => {
  console.log('new user connected');

  socket.on('disconnect', (socket) => {
    console.log('User disconnected');
  });
});

server.listen(port, () =>{
  console.log(`Listening on port: ${3000}`);
});
/////abiove. simple node servder serving up the static html file in /public
