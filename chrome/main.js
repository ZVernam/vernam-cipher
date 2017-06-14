import '../src/js/main';
import stripper from '../lib/src/url/parser';

window.onload = () => {
  const text = document.getElementById(`encrypt-text`);
  const secret = document.getElementById(`encrypt-secret`);

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = tabs[0].url;
    text.value = stripper(url);
    secret.focus();
  });
};
