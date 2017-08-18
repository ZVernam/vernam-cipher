import vernam from '../../lib/src/cipher/vernam';
import zxcvbn from 'zxcvbn';
import summary from './summary';
import {shortHash} from './util';

let hashText = false;

const HASH_ALGORITHM = `SHA256`;

const text = document.getElementById(`encrypt-text`);
const secret = document.getElementById(`encrypt-secret`);
const cipherText = document.getElementById(`encrypt-cipher`);

const hashOfSecret = function () {
  const secretValue = secret.value;
  const textValue = text.value;
  let result = ``;
  if (secretValue && textValue) {
    result = vernam.hash(secretValue, HASH_ALGORITHM);
  }
  return result;
};


const update = function () {
  const textHash = hashText ? shortHash(text.value, HASH_ALGORITHM) : text.value;
  const secretHash = hashOfSecret();
  const encrypted = vernam.encrypt(textHash, secretHash);
  cipherText.value = encrypted;
  if (encrypted) {
    const stats = zxcvbn(encrypted);
    stats.text_hash = textHash;
    stats.secret_hash = secretHash;
    summary.update(stats);
  }
};

text.oninput = update;
secret.oninput = update;

document.getElementById(`hash-unhash-button`).onclick = function () {
  hashText = !hashText;
  const useElement = this.querySelector(`use`);
  const icon = `open-iconic.svg#lock-${hashText ? `locked` : `unlocked`}`;
  useElement.setAttribute(`xlink:href`, icon);
  update();
  return false;
};

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
