function getWebApp() {
  // проверяем наличие сигнатур, которых НЕТ вне Telegram
  if (typeof window.Telegram === `undefined`) {
    return false;
  }
  if (typeof window.Telegram.WebApp === `undefined`) {
    return false;
  }

  const wa = window.Telegram.WebApp;

  // настоящий WebApp всегда содержит initDataUnsafe.hash
  return wa.initDataUnsafe && wa.initDataUnsafe.hash ? wa : void 0;
}

function debug(text) {
  const div = document.createElement(`div`);
  div.innerHTML = text;
  document.body.appendChild(div);
}

const setupTelegram = () => {
  debug(`Search params: ${JSON.stringify(window.location.search)}`);
  debug(`Server API: ${JSON.stringify(window.SERVER_API)}`)
};


export const isTg = () => {
  debugger;
  let webApp = getWebApp();
  if (!webApp) {
    debug(`Opened OUTSIDE Telegram`);
    return false;
  }
  debug(`Opened INSIDE Telegram`);
  webApp.ready();
  setupTelegram()
  return true;
};
