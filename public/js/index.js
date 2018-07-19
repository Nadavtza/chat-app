
var socket = io();
socket.on('connect' , function () {
    console.log('Connected to server');

    socket.emit('createMessage' ,{
        from: 'mali',
        text: 'hey how are you'
    });
});

socket.on('disconnect' , function () {
    console.log('Disconnected from server')
});

socket.on('newMessage' , function (newMessage) {
    console.log('New message)' , newMessage);
});
