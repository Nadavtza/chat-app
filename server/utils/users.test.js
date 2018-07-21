var expect = require('expect');

var {Users} = require('./users');

describe('Users' , ()=>{
    var users;
    beforeEach(()=>{
        users = new Users();
        users.users = [
            {
                id: '1',
                name: 'ani',
                room: 'nadav room'
            },{
                id: '2',
                name: 'elad',
                room: 'elad room'
            },{
                id: '3',
                name: 'meir',
                room: 'nadav room'
            }];
    });

    it('Should add new user', ()=>{
        var users = new Users() ;  
        var user = {
            id: '33',
            name: 'ani' ,
            room: 'romm 12'
        } ;
      
        var resUser = users.addUser(user.id , user.name , user.room);
        expect(users.users).toEqual([user]);
    });

    it('Should return names for nadav room', ()=>{  
        var userList  = users.getUserList('nadav room');
        expect(userList).toEqual(['ani' , 'meir']);
    });

    it('Should remove user', ()=>{  
        var removedUser  = users.removeUser('1');
        expect(users.users.length).toBe(2);
        expect(removedUser.name).toEqual('ani');
    });

    it('Should not remove user', ()=>{  
        var removedUser  = users.removeUser('4');
        expect(users.users.length).toBe(3);
        expect(removedUser).toEqual(undefined);
    });

    it('Should find user', ()=>{  
        var findUser  = users.getUser('1');
        expect(users.users.length).toBe(3);
        expect(findUser.name).toEqual('ani');
    });

    it('Should not find user', ()=>{  
        var findUser  = users.getUser('4');
        expect(users.users.length).toBe(3);
        expect(findUser).toEqual(undefined);
    });

    it('Should find user by name', ()=>{  
        var findUser  = users.getUserByName('ani');
        expect(users.users.length).toBe(3);
        expect(findUser.name).toEqual('ani');
    });
});
