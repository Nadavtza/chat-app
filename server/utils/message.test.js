var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage' , ()=>{
    it('should generate correct message object', ()=>{
        var from  = 'Nadav' ;
        var text  = 'Hi there';
        var message =   generateMessage(from,text);

        expect(message).toHaveProperty('from' ,from);
        expect(message).toHaveProperty('text' ,text);
        expect(message).toHaveProperty('createdAt');
        expect(typeof message.createdAt).toBe('number');
    })
});