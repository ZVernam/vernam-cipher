module.exports = function (action, input, secret, output) {
    let update = function () {
        var text = input.value;
        var key = secret.value;
        output.value = action(text, key);
    };

    input.oninput = update;
    secret.onchange = update;
};
