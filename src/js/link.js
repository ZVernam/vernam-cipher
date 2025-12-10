const textPanel = document.getElementById(`encrypt-text-panel`);
const text = document.getElementById(`encrypt-text`);
const secret = document.getElementById(`encrypt-secret`);

const link = document.createElement(`a`);
link.classList.add(`panel__link`);
link.textContent = `link`;

text.addEventListener(`input`, () => {
  const value = text.value;
  if (value) {
    link.href = `#${value}`;
    textPanel.appendChild(link);
  } else {
    textPanel.removeChild(link);
  }
});

if (!(window.Telegram && window.Telegram.WebApp)) {
  // Режим браузера
  document.body.innerHTML += `<div>Opened outside Telegram</div>`;

  const hash = window.location.hash.replace(`#`, ``);
  if (hash) {
    text.value = hash;
    secret.focus();
  }
} else {
  // Режим Telegram WebApp
  const tg = window.Telegram.WebApp;
  tg.MainButton.show();
}


