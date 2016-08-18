var vernam = require('./../cipher/vernam')({});
var controller = require('./../controller');

var cipherTextInput = document.getElementById("encrypt-cipher");
controller(vernam.encrypt,
    document.getElementById("encrypt-text"),
    document.getElementById("encrypt-secret"),
    cipherTextInput);

document.getElementById('copy-to-clipboard').onclick = function (e) {
    cipherTextInput.select();
    var successful = document.execCommand('copy');
    e.preventDefault();
    return false;
};