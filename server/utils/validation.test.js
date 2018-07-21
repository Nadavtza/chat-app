var expect = require('expect');

var {isValidString} = require('./validation');

describe('validate string' , ()=>{
    it('should reject invalid string', ()=>{
        var text  = '        ' ;
        var isValid = isValidString(text); 
        expect(typeof isValid).toBe('boolean');
        expect(isValid).toBe(false);
    });

    it('should reject non string', ()=>{
        var text  =34 ;
        var isValid = isValidString(text); 
        expect(typeof isValid).toBe('boolean');
        expect(isValid).toBe(false);
    });

    it('should accept valid string', ()=>{
        var text  = '     ff   ' ;
        var isValid = isValidString(text); 
        expect(typeof isValid).toBe('boolean');
        expect(isValid).toBe(true);
    });
});
