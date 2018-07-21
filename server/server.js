//modules
const path  = require('path');
const http =require('http');

//library exports
const express = require('express');
const socetIO = require('socket.io');

//local exports
const {generateMessage ,generateLocationMessage} = require('./utils/message');
const {isValidString} = require('./utils/validation');

//consts
const publicPath = path.join(__dirname , '../public' );
const port = process.env.PORT ||  3000 ;  

//server
var app = express();
var server = http.createServer(app);
var io = socetIO(server);

app.use(express.static(publicPath));

io.on('connection' , (socket)=>{
    //send
    socket.on('join' ,(params , callback)=>{
        if(!isValidString(params.name) || !isValidString(params.room) )
            callback('Name and room name are required');

        socket.join(params.room);

        console.log('New user connected'); //for server
        socket.emit('newMessage' ,generateMessage('Admin' ,`Welcome to the chat app, you are now in room ${params.room}` )); //user connection
        socket.broadcast.to(params.room).emit('newMessage' ,generateMessage('Admin' ,`User ${params.name} has joined` ));  //to other users
    
        callback();
    })
    //listen to
    socket.on('createMessage' , (message ,callback)=>{
        console.log('createMessage' , message);
        io.emit('newMessage' ,generateMessage(message.from ,message.text));  // io.emit - to all connection 
        callback();
    });

    socket.on('createLocationMessage' , (coords)=>{
        io.emit('newLocationMessage' ,generateLocationMessage('Admin' ,coords.latitude , coords.longitude));  
    });

    socket.on('disconnect' , (socket)=>{
        console.log('User was disconnected');
        io.emit('newMessage' ,generateMessage('Admin' ,`User left chat app`));
    }); 
}); 


server.listen(port , ()=>{
    console.log(`Server is up on port ${port}`);
});
