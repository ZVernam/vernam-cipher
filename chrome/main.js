import '../src/js/main';
import stripper from '../src/js/url/stripper';

window.onload = () => {
  const text = document.getElementById(`encrypt-text`);
  const secret = document.getElementById(`encrypt-secret`);

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = tabs[0].url;
    text.value = stripper(url);
    secret.focus();
  });
};
