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


//
// const tg = window.Telegram && window.Telegram.WebApp;
//
// if (tg) {
//   tg.ready();
//
//   tg.expand(); // развернуть на весь экран
//
//   // изменить цвет кнопки подтверждения
//   tg.MainButton.setText(`Продолжить`);
//   tg.MainButton.show();
//
//   tg.MainButton.onClick(() => {
//     tg.sendData(JSON.stringify({ok: true}));
//   });
// } else {
//   document.body.innerHTML += `<div>Opened outside Telegram</div>`;
//   console.log(`Opened outside Telegram — debug mode`);
//   window.debugMode = true;

// }
//
