import '../src/js/main';

window.onload = () => {
  const selectedUrl = chrome.extension.getBackgroundPage().selectedUrl;

  if (selectedUrl) {
    const text = document.getElementById(`encrypt-text`);
    text.value = selectedUrl;
  }
};
