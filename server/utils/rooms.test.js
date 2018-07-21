var expect = require('expect');

var {Rooms} = require('./rooms');

describe('Rooms' , ()=>{
    var rooms;
    beforeEach(()=>{
        rooms = new Rooms();
        rooms.rooms = [
            {
                room_name: 'psp room',
                users: 3
            },{
                room_name: 'qa room',
                users: 1
            }];
        rooms.allUsers = 4;
    });

    it('Should create new room', ()=>{
        var room_name = 'nadav_room';
        rooms.createRoom(room_name);
        expect(rooms.rooms.length).toBe(3);
        expect(rooms.rooms[2].users).toBe(0);
        expect(rooms.rooms[2].room_name).toBe(room_name);
    });

    it('Should not create new room', ()=>{
        var room_name = 'psp room';
        rooms.createRoom(room_name);
        expect(rooms.rooms.length).toBe(2);
    });

    it('Should remove room', ()=>{
        var room_name = 'psp room';
        rooms.removeRoom(room_name);
        expect(rooms.rooms.length).toBe(1);
        expect(rooms.rooms[0].room_name).toBe('qa room');
    });

    it('Should join room', ()=>{
        var room_name = 'psp room';
        rooms.joinRoom(room_name);
        expect(rooms.rooms.length).toBe(2);
        expect(rooms.rooms[0].room_name).toBe('psp room');
        expect(rooms.rooms[0].users).toBe(4);
    });

    it('Should leave room', ()=>{
        var room_name = 'psp room';
        rooms.leaveRoom(room_name);
        expect(rooms.rooms.length).toBe(2);
        expect(rooms.rooms[0].room_name).toBe('psp room');
        expect(rooms.rooms[0].users).toBe(2);
    });

    it('Should leave room and close room', ()=>{
        var room_name = 'qa room';
        rooms.leaveRoom(room_name);
        expect(rooms.rooms.length).toBe(1);
        expect(rooms.rooms[0].room_name).toBe('psp room');
    });

    it('Should update all users counter', ()=>{
        rooms.joinRoom('qa room');
        rooms.joinRoom('psp room');
        rooms.leaveRoom('psp room');
        expect(rooms.allUsers).toBe(5);
    });



    
});
