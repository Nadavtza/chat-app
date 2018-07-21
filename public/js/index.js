var socket = io();

socket.on('connect' , function () {
    socket.emit('createRoomList', function(){});
});


socket.on('updateRoomList' , function(rooms){
    if( rooms.length <= 0){
        jQuery('#roomList').html('');
        return;
    }
        
    var label =jQuery('<label class="form-field">Open rooms</label>');
    var select = jQuery('<select class="form-field" ></select>');
    label.append(select);
    rooms.forEach(function (room){
        select.append(jQuery('<option name="room_option"></option>').text(room.room_name));
    });

   jQuery('#roomList').html(label);
   console.log(rooms);
});

