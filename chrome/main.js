import '../src/js/controller';
import stripper from '../lib/src/url/parser';
import buildPattern from '../lib/src/pattern/pattern';

function getCurrentTab(callback) {
  const queryOptions = {active: true, lastFocusedWindow: true};
  chrome.tabs.query(queryOptions, ([tab]) => {
    if(chrome.runtime.lastError)
      console.error(chrome.runtime.lastError);
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    callback(tab);
  });
}

window.onload = () => {
  const text = document.getElementById(`encrypt-text`);
  const secret = document.getElementById(`encrypt-secret`);
  const hashUnhashButton = document.getElementById(`hash-unhash-button`);

  getCurrentTab((tab) => {
    const url = stripper(tab.url);
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
