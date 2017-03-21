var socket = io();

socket.on('connect', function (message) {          <!--using funct as opopoised to arrow syntax as es6 wont work anywhere but chrome-->
  console.log('connected to server', message);
});

socket.on('disconnect', function ()  {
  console.log('disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('New Message', message);
});
