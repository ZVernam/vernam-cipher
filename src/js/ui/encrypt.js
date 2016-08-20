var vernam = require('./../cipher/vernam')({});
var controller = require('./../controller');
let Hashes = require('jshashes');
let md5 = new Hashes.MD5();

var text = document.getElementById("encrypt-text");
var secret = document.getElementById("encrypt-secret");
var secretHash = document.getElementById("encrypt-secret-hash");
var cipherText = document.getElementById("encrypt-cipher");

var update = function () {
    var secretValue = secret.value;
    var hash;
    if (secretValue) {
        hash = md5.hex(secretValue);
        secretHash.value = hash.substr(0, text.value.length);
    }
    cipherText.value = vernam.encrypt(text.value, hash);
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