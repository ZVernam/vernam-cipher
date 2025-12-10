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

function append(text) {
  let div = document.createElement(`div`);
  div.innerHTML = text;
  document.body.appendChild(div);
}

function onReady() {
  // eslint-disable-next-line no-debugger
  debugger;
  if (isTelegram()) {
    append(`Opened INSIDE Telegram`);
    if (typeof window.Telegram.WebApp.ready === `function`) {
      window.Telegram.WebApp.ready();
    }
  } else {
    append(`Opened OUTSIDE Telegram`);
  }
}

if (document.readyState === `complete` || document.readyState === `interactive`) {
  onReady();
} else {
  document.addEventListener(`DOMContentLoaded`, onReady, false);
}

