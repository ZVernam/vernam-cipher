var assert = require('assert');
var vernam = require('../src/js/vernam');
describe('Vernam cipher', function() {
    describe('#encrypt()', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal('@@@@', vernam.encrypt('text', 'text'));
        });
    });
});