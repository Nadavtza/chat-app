//modules
const path  = require('path');
const http =require('http');

//library exports
const express = require('express');
const socetIO = require('socket.io');

//local exports
const {generateMessage ,generateLocationMessage} = require('./utils/message');

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
    console.log('New user connected'); //for server

    socket.emit('newMessage' ,generateMessage('Admin' ,'Welcome to the chat app' )); //user connection

    socket.broadcast.emit('newMessage' ,generateMessage('Admin' ,`New user joined to chat app` ));  //to other users

    //listen to
    socket.on('createMessage' , (message ,callback)=>{
        console.log('createMessage' , message);
        io.emit('newMessage' ,generateMessage(message.from ,message.text));  // io.emit - to all connection 
        callback({
            text: 'this is from the server'
        });
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
