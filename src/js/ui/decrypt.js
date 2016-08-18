var vernam = require('./../cipher/vernam')({});
var controller = require('./../controller');

controller(vernam.encrypt,
    document.getElementById("decrypt-cipher"),
    document.getElementById("decrypt-secret"),
    document.getElementById("decrypt-text"));
