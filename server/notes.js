  // socket.emit('newMessage' ,{ // socket.emit - to single connection
    //     from: 'Nadav',
    //     text: 'hey how are you',
    //     createdAt: new Date().getTime()
    // });

  //socket.broadcast.emit  - all connections but me

 // socket.broadcast.emit('newMessage' ,{ 
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });

        
  // io.emit - all connections
  

//   socket.on('newLocationMessage' , function (message) {
//     var li =jQuery('<li></li>');
//     var a = jQuery('<a target ="_blank">My current location</a>');
//     li.text(`${message.from}:` );
//     a.attr('href' , message.url);
//     li.append(a);
//     jQuery('#messages').append(li);
// });