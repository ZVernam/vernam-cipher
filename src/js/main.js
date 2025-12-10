import './controller';
import './link';

import onReady from "./telegram";

if (document.readyState === `complete` || document.readyState === `interactive`) {
  onReady();
} else {
  document.addEventListener(`DOMContentLoaded`, onReady, false);
}

