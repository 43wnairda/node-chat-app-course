const path = require('path');  //this is a build in node module.  doesn't need installing
const http = require('http');
const express = require('express')
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '/../public');

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);      //reson to use this instead of express build in http service is cos we want to use socket.io
var io = socketIO(server);                //giving us 2 way comms between client and server.

app.use(express.static(publicPath));


io.on('connection', (socket) => {
  console.log('new user connected');

  //socket.emit from the Admin message welcome to the chat app
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
  
///////
//socket.broadcast.emit from Admin text New user joined

socket.broadcast.emit('newMessage', generateMessage('Admin', 'new user joined'));
/////


  socket.on('createMessage', (newMessage) => {
    console.log('createMessage', newMessage)

    io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));     //io emiits to all listerns.  socket only to a single listener.

    // socket.broadcast.emit('newMessage', {     //isocket.broadcast.emiit to all listerns except the sender.
    //     from: newMessage.from,
    //     text: newMessage.text,
    //     createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', (socket) => {
    console.log('User disconnected');
  });
});

server.listen(port, () =>{
  console.log(`Listening on port: ${3000}`);
});
/////abiove. simple node servder serving up the static html file in /public
