var vernam = require('./../cipher/vernam')({});
var controller = require('./../controller');

controller(vernam.encrypt,
    document.getElementById("encrypt-text"),
    document.getElementById("encrypt-secret"),
    document.getElementById("encrypt-cipher"));