import '../src/js/main';
import stripper from '../src/js/url/stripper';

window.onload = () => {
  const selectedUrl = chrome.extension.getBackgroundPage().selectedUrl;

  if (selectedUrl) {
    const text = document.getElementById(`encrypt-text`);
    text.value = stripper(selectedUrl);
  }

  document.getElementById(`encrypt-secret`).focus();
};
