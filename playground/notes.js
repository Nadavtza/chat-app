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

// socket.on('newMessage' , function (newMessage) {
   
//   var formattedTime = moment(newMessage.createdAt).format('H:mm a');    
//   var li =jQuery('<li></li>');
//   li.text(`${newMessage.from} ${formattedTime}: ${newMessage.text}`);
//   jQuery('#messages').append(li);
// });
