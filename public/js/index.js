
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

jQuery('#messageForm').on('submit' , function (e) {
    e.preventDefault();//prevent page refresh

    socket.emit('createMessage' , {
        from: 'user',
        text: jQuery('[name = message ]').val()
    } , function (data) {
        console.log('Got it!' , data);
    });
});

