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
    console.log('New user connected');

    socket.on('disconnect' , (socket)=>{
        console.log('User was disconnected');
    }); 
}); // listen to event




server.listen(port , ()=>{
    console.log(`Server is up on port ${port}`);
});
