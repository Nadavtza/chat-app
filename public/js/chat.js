var socket = io();
var image = undefined;

function scrollToBottom(){
    //Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child'); // the last li in ol
    //Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight +lastMessageHeight >= scrollHeight)
       messages.scrollTop(scrollHeight);
}


socket.on('connect' , function () {
    var params = jQuery.deparam(window.location.search);

    socket.emit('join' , params, function(err){
        if(err){
            alert(err);
            window.location.href = '/'; //return back to home page
        }
        else{
            console.log('No error');
        }
    });
});

socket.on('disconnect' , function () {
    console.log('Disconnected from server')
});

socket.on('updateUserList' , function(users){
    var ol = jQuery('<ol></ol>');
    users.forEach(function (user){
        ol.append(jQuery('<li></li>').text(user));
    });

    jQuery('#users').html(ol);
});

socket.on('updateRoomList' , function(rooms){
    var ol = jQuery('<ul></ul>');
    rooms.forEach(function (room){
        ol.append(jQuery('<li></li>').text(`${room.room_name} | ${room.users} Person(s)`));
    });

   jQuery('#rooms').html(ol);
});

socket.on('newMessage' , function (newMessage) {
    var formattedTime = moment(newMessage.createdAt).format('H:mm a');    
    var template = jQuery('#message_template').html();
    var html = Mustache.render(template , {
        from: newMessage.from ,
        text: newMessage.text,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage' , function (message) {

    var formattedTime = moment(message.createdAt).format('H:mm a');
    var template = jQuery('#location_message_template').html();

    var html = Mustache.render(template , {
        from: message.from ,
        url: message.url,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
});


socket.on('newPictureMessage' , function (message) {

    var formattedTime = moment(message.createdAt).format('H:mm a');
    var template = jQuery('#picture_message_template').html();

    var html = Mustache.render(template , {
        from: message.from ,
        image: message.image,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
});



jQuery('#messageForm').on('submit' , function (e) {
    e.preventDefault();//prevent page refresh

    var message =  jQuery('[name = message ]') ;

    socket.emit('createMessage' , {
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

$('#imagefile').bind('change', function(e){
    var data = e.originalEvent.target.files[0];
    var reader = new FileReader();
    reader.onload = function(evt){
      image = evt.target.result ;
    };
    reader.readAsDataURL(data);
  });

  
var imageButton = jQuery('#imageButton');

imageButton.on('click' , function () {
    if(image === undefined){
        return alert('Please upload image');
    }   
    jQuery('#imagefile').val('');
    socket.emit('createPictureMessage' , image);
    image = undefined ; 

});

