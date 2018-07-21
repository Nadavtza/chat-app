//modules
const path  = require('path');
const http =require('http');

//library exports
const express = require('express');
const socetIO = require('socket.io');

//local exports
const {generateMessage ,generateLocationMessage} = require('./utils/message');
const {isValidString} = require('./utils/validation');
const {Users} = require('./utils/users');

//consts
const publicPath = path.join(__dirname , '../public' );
const port = process.env.PORT ||  3000 ;  

//server
var app = express();
var server = http.createServer(app);
var io = socetIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection' , (socket)=>{
    //send
    socket.on('join' ,(params , callback)=>{
        if(!isValidString(params.name) || !isValidString(params.room) )
            return callback('Name and room name are required');

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id ,params.name , params.room);

        console.log(`New user = ${params.name} connected`); //for server
        io.to(params.room).emit('updateUserList' , users.getUserList(params.room));
        socket.emit('newMessage' ,generateMessage('Admin' ,`Welcome to the chat app, you are now in room ${params.room}.` )); //user connection
        socket.broadcast.to(params.room).emit('newMessage' ,generateMessage('Admin' ,`${params.name} has joined.` ));  //to other users
    
        callback();
    });

    //listen to
    socket.on('createMessage' , (message ,callback)=>{
        console.log('createMessage' , message);
        io.emit('newMessage' ,generateMessage(message.from ,message.text));  // io.emit - to all connection 
        callback();
    });

    socket.on('createLocationMessage' , (coords)=>{
        io.emit('newLocationMessage' ,generateLocationMessage('Admin' ,coords.latitude , coords.longitude));  
    });

    socket.on('disconnect' , ()=>{
        console.log(`User ${socket.id} was disconnected`);
        var user = users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUserList' , users.getUserList(user.room));
            io.to(user.room).emit('newMessage' ,generateMessage('Admin' ,`${user.name} has left the room.`));
        }
       
    }); 
}); 


server.listen(port , ()=>{
    console.log(`Server is up on port ${port}`);
});
