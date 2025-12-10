import './controller';
import {updateText} from "./link";

import {isTg} from "./telegram";

const onReady = () => isTg() ? true : updateText();

if (document.readyState === `complete` || document.readyState === `interactive`) {
  onReady();
} else {
  document.addEventListener(`DOMContentLoaded`, onReady, false);
}

