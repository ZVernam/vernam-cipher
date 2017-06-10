import vernam from './cipher/vernam';
import zxcvbn from 'zxcvbn';
import summary from './summary';

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
    result = vernam.hash(secretValue, hashAlgorithm.value);
    secretHash.value = result.substr(0, textValue.length);
  }
  return result;
};

const textHash = function () {
  const fullHash = vernam.hash(text.value, hashAlgorithm.value);
  return fullHash.slice(0, text.value.length);
};

const update = function () {
  const encrypted = vernam.encrypt(textHash(), hash());
  cipherText.value = encrypted;
  if (encrypted) {
    summary.update(zxcvbn(encrypted));
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
    console.log(`'${cipherText.value}' copied to clipboard!`);
  } else {
    console.error(`Failed to copy to clipboard!`);
  }
  e.preventDefault();
  return false;
};
