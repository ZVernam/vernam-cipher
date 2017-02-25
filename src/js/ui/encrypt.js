const vernam = require(`./../cipher/vernam`)({});
let Hashes = require(`jshashes`);
let zxcvbn = require(`zxcvbn`);

const text = document.getElementById(`encrypt-text`);
const secret = document.getElementById(`encrypt-secret`);
const secretHash = document.getElementById(`encrypt-secret-hash`);
const cipherText = document.getElementById(`encrypt-cipher`);
const hashAlgorithm = document.getElementById(`encrypt-hash-algo`);

const hash = function () {
  const secretValue = secret.value;
  const textValue = text.value;
  let result = ``;
  if (secretValue && textValue) {
    const algorithmName = hashAlgorithm.value;
    console.log(`Using hash-algorithm: ${algorithmName}`);
    const hashFunction = new Hashes[algorithmName]();
    const base64 = hashFunction.b64(secretValue);
    console.log(`Hash Output raw: ${hashFunction.raw(secretValue)}`);
    console.log(`Hash Output b64: ${base64}`);
    console.log(`Hash Output HEX: ${hashFunction.hex(secretValue)}`);
    result = base64;
    secretHash.value = result.substr(0, textValue.length);
  }
  return result;
};

const update = function () {
  const encrypted = vernam.encrypt(text.value, hash());
  cipherText.value = encrypted;
  if (encrypted) {
    console.dir(zxcvbn(encrypted));
  }
};

text.oninput = update;
secret.oninput = update;
hashAlgorithm.onchange = update;


document.getElementById(`show-hide-button`).onclick = function () {
  const type = secret.type.toLowerCase();
  console.log(`Secret type: ${type}`);
  secret.type = type === `password` ? `text` : `password`;
  return false;
};

document.getElementById(`copy-to-clipboard-button`).onclick = function (e) {
  cipherText.select();
  const success = document.execCommand(`copy`);
  if (success) {
    console.log(`\'${cipherText.value}\' copied to clipboard!`);
  } else {
    console.error(`Failed to copy to clipboard!`);
  }
  e.preventDefault();
  return false;
};
