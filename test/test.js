var assert = require('assert');
var vernam = require('../src/js/cipher/vernam');
describe('Vernam cipher', function() {
    describe('#encrypt()', function() {
        it('should encrypt text with given key', function() {
            assert.equal('@@@@', vernam({}).encrypt('text', 'text'));
        });
        it('should accept empty params', function() {
            assert.equal('', vernam({}).encrypt('', ''));
            assert.equal('', vernam({}).encrypt('text', ''));
            assert.equal('', vernam({}).encrypt('', 'secret'));
            assert.equal('', vernam({}).encrypt(null, undefined));
            assert.equal('', vernam({}).encrypt(null));
        });
    });
    describe('#decrypt()', function() {
        it('should decrypt text with given key', function() {
            assert.equal('pC$p', vernam({}).encrypt('@@@@', 'text'));
        });
        it('should accept empty params', function() {
            assert.equal('', vernam({}).decrypt('', ''));
            assert.equal('', vernam({}).decrypt('text', ''));
            assert.equal('', vernam({}).decrypt('', 'secret'));
            assert.equal('', vernam({}).decrypt(null, undefined));
            assert.equal('', vernam({}).decrypt(null));
        });
    });
});