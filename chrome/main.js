import '../src/js/controller';
import stripper from '../lib/src/url/parser';
import buildPattern from '../lib/src/pattern/pattern';

window.onload = () => {
  const text = document.getElementById(`encrypt-text`);
  const secret = document.getElementById(`encrypt-secret`);

  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    const url = stripper(tabs[0].url);
    chrome.storage.sync.get(null, (data) => {
      if (data) {
        text.value = buildPattern(data.pattern)({site: {url}, user: data.user});
      } else {
        text.value = url;
      }
      secret.focus();
    });
  });
};
