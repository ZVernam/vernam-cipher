import vernam from '../../lib/src/cipher/vernam';
import zxcvbn from 'zxcvbn';
import updateSummary from './summary';
import {shortHash, updateIcon} from './util';

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
    updateSummary(stats);
  }
};

text.addEventListener(`input`, update);
secret.addEventListener(`input`, update);

const hashUnhashButton = document.getElementById(`hash-unhash-button`);
const showHidePasswordButton = document.getElementById(`show-hide-button`);
const copyToClipboardButton = document.getElementById(`copy-to-clipboard-button`);


hashUnhashButton.onclick = () => {
  hashText = !hashText;
  updateIcon(hashUnhashButton, `lock-${hashText ? `` : `un`}locked`);
  update();
  return false;
};

showHidePasswordButton.onclick = () => {
  const type = secret.type.toLowerCase();
  secret.type = type === `password` ? `text` : `password`;
  return false;
};

copyToClipboardButton.onclick = () => {
  cipherText.select();
  const success = document.execCommand(`copy`);
  if (success) {
    console.log(`'${cipherText.value}' copied to clipboard!`);
  } else {
    console.error(`Failed to copy to clipboard!`);
  }
  return false;
};
