class Rooms {
    constructor(){
        this.rooms = [] ; 
        this.allUsers = 0 ;
    }

    createRoom(room_name) {
        if(!this.getRoom(room_name)){
            var room = {room_name ,users: 0};
            this.rooms.push(room);
        }
    }

    leaveRoom(room_name){
        var room = this.rooms.filter((room)=> room.room_name === room_name)[0];
        if(room){
            this.allUsers --;
            room.users--;
            if(room.users <= 0){
                this.removeRoom(room_name);
            }
        }
        return room;
    }

    removeRoom(room_name){
        this.rooms = this.rooms.filter((room)=> room.room_name !== room_name);
    }

    getRoom(room_name){
        var room = this.rooms.filter((room)=> room.room_name === room_name)[0];
        return room;
    }

 

    joinRoom(room_name){
        var room = this.rooms.filter((room)=> room.room_name === room_name)[0];
        this.allUsers ++;
        room.users++;
    }

};

module.exports = {Rooms} ; 