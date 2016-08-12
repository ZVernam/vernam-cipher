"use strict";
var alphabet = require('./cryptic');

let xor = function (left, right) {
    return left ^ right;
};

let toChar = function (result) {
    return alphabet[result % alphabet.length];
};

module.exports = {
    encrypt: function (text, secret) {
        let cipher = [];
        for (var i = 0; i < text.length; i++) {
            var result = xor(text.charCodeAt(i), secret.charCodeAt(i % secret.length));
            cipher.push(toChar(result));
        }
        return cipher.join('');
    }
};