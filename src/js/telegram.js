function isTelegram() {
  return (typeof window !== `undefined` && typeof window.Telegram !== `undefined` && typeof window.Telegram.WebApp !== `undefined`);
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

