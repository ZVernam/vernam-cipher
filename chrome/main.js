import '../src/js/controller';
import stripper from '../lib/src/url/parser';
import buildPattern from '../lib/src/pattern/pattern';

window.onload = () => {
  const text = document.getElementById(`encrypt-text`);
  const secret = document.getElementById(`encrypt-secret`);
  const hashUnhashButton = document.getElementById(`hash-unhash-button`);

  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    const url = stripper(tabs[0].url);
    chrome.storage.sync.get(null, ({pattern, token, hashed}) => {
      if (pattern && token) {
        text.value = buildPattern(pattern)({site: {url}, user: {token}});
      } else {
        text.value = url;
      }
      if (hashed) {
        hashUnhashButton.click();
      }
      secret.focus();
    });
  });
};
