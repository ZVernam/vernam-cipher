const assert = require('assert');
const vernam = require('../src/js/cipher/vernam')({});

const encode = vernam.encrypt;
const decode = vernam.decrypt;

describe('Vernam cipher', function () {
  describe('#encrypt()', function () {
    it('should encrypt text with given key', function () {
      assert.equal('@@@@', encode('text', 'text'));
    });
    it('should accept empty params', function () {
      assert.equal('', encode('', ''));
      assert.equal('', encode('text', ''));
      assert.equal('', encode('', 'secret'));
      assert.equal('', encode(null, undefined));
      assert.equal('', encode(null));
    });
  });
  describe('#decrypt()', function () {
    it('should decrypt text with given key', function () {
      assert.equal('pC$p', encode('@@@@', 'text'));
    });
    it('should accept empty params', function () {
      assert.equal('', decode('', ''));
      assert.equal('', decode('text', ''));
      assert.equal('', decode('', 'secret'));
      assert.equal('', decode(null, undefined));
      assert.equal('', decode(null));
    });
  });
  describe('regression validation', function () {
    it('default hash algorithm', function () {
      const algoName = undefined;
      assert.equal('C1n25Cu52$',
          encode('abcdefghij', vernam.hash('abcdefghij', algoName)));
      assert.equal('86Kl1W1dql4vN29vm056',
          encode('lzFT95rQGbfba5GAedoX', vernam.hash('lzFT95rQGbfba5GAedoX', algoName)));
      assert.equal('h00rzbb15Zwr42WmN92t',
          encode('OYb2Xlnc1FG5TgWZWPWi', vernam.hash('EVDM62G85RrOlJppDTpF', algoName)));
      assert.equal('tt@lWfjW7h662K1Wnuzn',
          encode('mlHINlaW5uv7xCiszlCV', vernam.hash('vFniW7aivKX8sydozDmB', algoName)));
    });
    it('SHA256 hash algorithm', function () {
      const algoName = 'SHA256';
      assert.equal('tt@lWfjW7h662K1Wnuzn',
          encode('mlHINlaW5uv7xCiszlCV', vernam.hash('vFniW7aivKX8sydozDmB', algoName)));
    });
    it('MD5 hash algorithm', function () {
      const algoName = 'MD5';
      assert.equal('N2Z34xnWlWlfCmwrnttN',
          encode('mlHINlaW5uv7xCiszlCV', vernam.hash('vFniW7aivKX8sydozDmB', algoName)));
    });
    it('SHA1 hash algorithm', function () {
      const algoName = 'SHA1';
      assert.equal('f3@w$80tfppj4h35K7bC',
          encode('mlHINlaW5uv7xCiszlCV', vernam.hash('vFniW7aivKX8sydozDmB', algoName)));
    });
  })
});