const path = require('path');  //this is a build in node module.  doesn't need installing
const http = require('http');
const express = require('express')
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);      //reson to use this instead of express build in http service is cos we want to use socket.io
var io = socketIO(server);                //giving us 2 way comms between client and server.
var users = new Users();

app.use(express.static(publicPath));


io.on('connection', (socket) => {
  console.log('new user connected');

  //socket.emit from the Admin message welcome to the chat app

/////

socket.on('join', (params, callback) => {
  if (!isRealString(params.name) || !isRealString(params.room)) {
    return callback('Name and room name are required');
  }



  socket.join(params.room); //join a room and only wsee messages for that room.
  users.removeUser(socket.id);
  users.addUser(socket.id, params.name, params.room);
  //socket.leave('room name') will exit you from room so you no longer get messages for that room

  //io.emit -> io.to('the office fans').emit    sends to everyone in that room
  //socket.broadcast.emit -> socket.broadcast.to('the office fans').emit     sends to everyone in that room except for the current user
  //socket.emit stays the same.
  io.to(params.room).emit('updateUserList', users.getUserList(params.room));
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
  socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
callback();
});

  socket.on('createMessage', (newMessage,callback) => {
    console.log('createMessage', newMessage)

    io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));     //io emiits to all listerns.  socket only to a single listener.
    callback();
    // socket.broadcast.emit('newMessage', {     //isocket.broadcast.emiit to all listerns except the sender.
    //     from: newMessage.from,
    //     text: newMessage.text,
    //     createdAt: new Date().getTime()
    // });
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', (socket) => {
    var user = users.removeUser(socket.id);

    if (user) {

      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
  });
});

server.listen(port, () =>{
  console.log(`Listening on port: ${3000}`);
});
/////abiove. simple node servder serving up the static html file in /public
