const loaded = require(`./output.js`);

console.dir(loaded);
let base64 = loaded.org.jetbrains.base64;
console.dir(Object.getOwnPropertyNames(base64));
const Base64Factory = base64.Base64Factory;
const encoder = Base64Factory.createEncoder();
const buffer = encoder.encode(Buffer.from(`Hello World`));
console.log(Buffer.from(buffer).toString(`utf-8`));
