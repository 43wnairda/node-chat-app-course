var socket = io();

socket.on('connect', function () {          <!--using funct as opopoised to arrow syntax as es6 wont work anywhere but chrome-->
  console.log('connected to server');

  socket.emit('createMessage', {
    from: 'someone@somewhere.com',
    text: 'Hello someone, how are you?'
  });
});

socket.on('disconnect', function ()  {
  console.log('disconnected from server');
});

socket.on('newMessage', function(email) {
    console.log('New Message', email);
});
