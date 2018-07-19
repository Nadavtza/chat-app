//modules
const path  = require('path');
const http =require('http');

//library exports
const express = require('express');
const socetIO = require('socket.io');

//local exports

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

    socket.emit('newMessage' ,{ //user connection
        from:'Admin',
        text:'Welcome to chat app',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage'  ,{ //to other users
        from:'Admin',
        text:`New user joined to chat app`,
        createdAt: new Date().getTime()
    }); 

    //listen to
    socket.on('createMessage' , (message)=>{
        console.log('createMessage' , message);
        io.emit('newMessage' ,{ // io.emit - to all connection
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });  
    });

    socket.on('disconnect' , (socket)=>{
        console.log('User was disconnected');
    }); 
}); // listen to event


server.listen(port , ()=>{
    console.log(`Server is up on port ${port}`);
});
