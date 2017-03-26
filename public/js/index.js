var socket = io();


socket.on('connect', function () {          <!--using funct as opopoised to arrow syntax as es6 wont work anywhere but chrome-->
  console.log('connected to server');
});

socket.on('disconnect', function ()  {
  console.log('disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('New Message', message);

    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">my current location</a>');

    li.text(`S{message.from}: `);     //the 2 statements are better than using tempolate strings as they prevent html injection attacks
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});


jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  navigator.geolocation.getCurrentPosition(function(position) {
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
  }, function() {
    alert('unable to fetch location');
  });
});
