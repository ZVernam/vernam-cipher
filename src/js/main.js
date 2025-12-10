import './controller';
import './link';

if (!window.Telegram?.WebApp) {
  // Режим браузера
  document.body.innerHTML += "<div>Opened outside Telegram</div>";
} else {
  // Режим Telegram WebApp
  const tg = window.Telegram.WebApp;
  tg.MainButton.show();
}

