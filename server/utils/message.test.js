var expect = require('expect');
var {generateMessage ,generateLocationMessage} = require('./message');

describe('generateMessage' , ()=>{
    it('should generate correct message object', ()=>{
        var from  = 'Nadav' ;
        var text  = 'Hi there';
        var message =   generateMessage(from,text);

        expect(message).toHaveProperty('from' ,from);
        expect(message).toHaveProperty('text' ,text);
        expect(message).toHaveProperty('createdAt');
        expect(typeof message.createdAt).toBe('number');
    });
});

describe('generateLocationMessage' , ()=>{
    it('should generate correct location', ()=>{
        var from  = 'Nadav' ;
        var lat  = 31.255907299999993;
        var lon =   34.7895685;

        var message = generateLocationMessage(from , lat , lon) ; 

        expect(message).toHaveProperty('from' ,from);
        expect(message).toHaveProperty('url' ,`https://www.google.com/maps/?q=${lat},${lon}`);
        expect(message).toHaveProperty('createdAt');
        expect(typeof message.createdAt).toBe('number');
    });
});