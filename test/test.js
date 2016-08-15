var assert = require('assert');
var vernam = require('../src/js/vernam');
describe('Vernam cipher', function() {
    describe('#encrypt()', function() {
        it('should encrypt text with given key', function() {
            assert.equal('@@@@', vernam.encrypt('text', 'text'));
        });
    });
});