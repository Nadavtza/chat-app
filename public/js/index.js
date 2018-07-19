
var socket = io();
socket.on('connect' , function () {
    console.log('Connected to server');
});

socket.on('disconnect' , function () {
    console.log('Disconnected from server')
});

socket.on('newMessage' , function (newMessage) {
    console.log('New message' , newMessage);
    var li =jQuery('<li></li>');
    li.text(`${newMessage.from}: ${newMessage.text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage' , function (message) {
    var li =jQuery('<li></li>');
    var a = jQuery('<a target ="_blank">My current location</a>');
    li.text(`${message.from}: ` );
    a.attr('href' , message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#messageForm').on('submit' , function (e) {
    e.preventDefault();//prevent page refresh

    socket.emit('createMessage' , {
        from: 'user',
        text: jQuery('[name = message ]').val()
    } , function (data) {
        console.log('Got it!' , data);
    });
});

var locationButton = jQuery('#send_location');

locationButton.on('click' , function () {
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser');
    }
    //first func for success , second for fail
    navigator.geolocation.getCurrentPosition(function (position){
        socket.emit('createLocationMessage' , {
            latitude: position.coords.latitude , 
            longitude: position.coords.longitude
        });
    }
     ,function(){
        alert('Unable to fetch location');
    } );   
});
