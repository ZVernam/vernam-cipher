var vernam = require('./../cipher/vernam')({});
let Hashes = require('jshashes');

var text = document.getElementById("encrypt-text");
var secret = document.getElementById("encrypt-secret");
var secretHash = document.getElementById("encrypt-secret-hash");
var cipherText = document.getElementById("encrypt-cipher");
var hashAlgorithm = document.getElementById("encrypt-hash-algo");

var hash = function () {
    var secretValue = secret.value;
    var textValue = text.value;
    var result = '';
    if (secretValue && textValue) {
        var algorithmName = hashAlgorithm.value;
        console.log(`Using hash-algorithm: ${algorithmName}`);
        var hashFunction = new Hashes[algorithmName]();
        var base64 = hashFunction.b64(secretValue);
        console.log(`Hash Output raw: ${hashFunction.raw(secretValue)}`);
        console.log(`Hash Output b64: ${base64}`);
        console.log(`Hash Output HEX: ${hashFunction.hex(secretValue)}`);
        result = base64;
        secretHash.value = result.substr(0, textValue.length);
    }
    return result;
};

var update = function () {
    cipherText.value = vernam.encrypt(text.value, hash());
};

text.oninput = update;
secret.oninput = update;


document.getElementById('show-hide-button').onclick = function () {
    var type = secret.type.toLowerCase();
    console.log(`Secret type: ${type}`);
    secret.type = type === 'password' ? 'text' : 'password';
    return false;
};

document.getElementById('copy-to-clipboard-button').onclick = function (e) {
    cipherText.select();
    var success = document.execCommand('copy');
    if (success) {
        console.log(`\'${cipherText.value}\' copied to clipboard!`);
    } else {
        console.error('Failed to copy to clipboard!')
    }
    e.preventDefault();
    return false;
};