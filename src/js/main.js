"use strict";

var vernam = require('./vernam.js');

let textInput = document.getElementById("text");
let secretInput = document.getElementById("secret");
let cipherOutput = document.getElementById("cipher");

let update = function () {
    var text = textInput.value;
    var secret = secretInput.value;
    if (text && secret) {
        cipherOutput.value = vernam.encrypt(text, secret);
    } else {
        cipherOutput.value = '';
    }
};

textInput.oninput = update;
secretInput.oninput = update;