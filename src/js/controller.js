let Hashes = require('jshashes');
let md5 = new Hashes.MD5();

module.exports = function (action, input, secret, output) {
    let update = function () {
        var text = input.value;
        var key = secret.value;
        if (text && key) {
            output.value = action(text, md5.hex(key));
        } else {
            output.value = '';
        }
    };

    input.oninput = update;
    secret.oninput = update;
};
