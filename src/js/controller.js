import vernam from '../../lib/src/cipher/vernam';
import zxcvbn from 'zxcvbn';
import summary from './summary';
import {shortHash} from './util';

const HASH_ALGORITHM = `SHA256`;

const text = document.getElementById(`encrypt-text`);
const secret = document.getElementById(`encrypt-secret`);
const cipherText = document.getElementById(`encrypt-cipher`);

let hashText = false;
const update = () => {
  const textHash = hashText ? shortHash(text.value, HASH_ALGORITHM) : text.value;
  const secretHash = vernam.hash(secret.value, HASH_ALGORITHM);
  const encrypted = vernam.encrypt(textHash, secretHash);
  cipherText.value = encrypted;
  if (encrypted) {
    const stats = zxcvbn(encrypted);
    stats.text_hash = textHash;
    stats.secret_hash = secretHash;
    summary.update(stats);
  }
};

text.addEventListener(`input`, update);
secret.addEventListener(`input`, update);

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
