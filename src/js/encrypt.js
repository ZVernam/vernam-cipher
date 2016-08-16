var vernam = require('./vernam')({});
var controller = require('./controller');

controller(vernam.encrypt,
    document.getElementById("encrypt-text"),
    document.getElementById("encrypt-secret"),
    document.getElementById("encrypt-cipher"));