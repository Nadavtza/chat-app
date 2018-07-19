
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

    var message =  jQuery('[name = message ]') ;

    socket.emit('createMessage' , {
        from: 'User',
        text: message.val()
    } , function () {
        message.val('');
    });
});

var locationButton = jQuery('#send_location');

locationButton.on('click' , function () {
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser');
    }

    locationButton.attr('disabled' , 'disabled').text('Sending location..');
    
    //first func for success , second for fail
    navigator.geolocation.getCurrentPosition(function (position){
        locationButton.removeAttr('disabled').text('Send location');

        socket.emit('createLocationMessage' , {
            latitude: position.coords.latitude , 
            longitude: position.coords.longitude
        });
    }
     ,function(){
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    } );   
});
