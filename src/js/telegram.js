function isTelegram() {
  // проверяем наличие сигнатур, которых НЕТ вне Telegram
  if (typeof window.Telegram === `undefined`) {
    return false;
  }
  if (typeof window.Telegram.WebApp === `undefined`) {
    return false;
  }

  const wa = window.Telegram.WebApp;

  // настоящий WebApp всегда содержит initDataUnsafe.hash
  return !!(wa.initDataUnsafe && wa.initDataUnsafe.hash);
}

function debugMessage(text) {
  const div = document.createElement(`div`);
  div.innerHTML = text;
  document.body.appendChild(div);
}

export const isTg = () => {
  // eslint-disable-next-line no-debugger
  debugger;
  if (!isTelegram()) {
    debugMessage(`Opened OUTSIDE Telegram`);
    return false;
  }
  debugMessage(`Opened INSIDE Telegram`);
  window.Telegram.WebApp.ready();
  return true;
};
