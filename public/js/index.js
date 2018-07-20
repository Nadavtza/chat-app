var socket = io();

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
    console.log('Connected to server');
});

socket.on('disconnect' , function () {
    console.log('Disconnected from server')
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

jQuery('#messageForm').on('submit' , function (e) {
    e.preventDefault();//prevent page refresh

    var message =  jQuery('[name = message ]') ;

    if(message.val() == ''){
        alert('Please write a message');
        return ;
    }

    socket.emit('createMessage' , {
        from: 'User',
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
