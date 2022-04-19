// Mini kotlin.js
const Kotlin = {};

Kotlin.Kind = {CLASS: `class`, INTERFACE: `interface`, OBJECT: `object`};

Kotlin.kotlin = {};
Kotlin.defineModule = (id, map) => {
    map[id] = map
}; // WTF?
Kotlin.kotlin.text = {
    // eslint-disable-next-line camelcase
    decodeToString_964n91$: (source) => source
}

global.kotlin = Kotlin;

const loaded = require(`./output.js`);

console.dir(loaded);
let base64 = loaded.org.jetbrains.base64;
console.dir(Object.getOwnPropertyNames(base64));
const Base64Factory = base64.Base64Factory;
const encoder = Base64Factory.createEncoder();
console.log(encoder)
