"use strict";

(function () {
    let xor = function (left, right) {
        return left ^ right;
    };

    let toChar = function (result) {
        const SHIFT = 50;
        return String.fromCharCode(SHIFT + result);
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
    }

})();