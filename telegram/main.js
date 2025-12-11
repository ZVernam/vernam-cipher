import '../common/src/css/style.css';

import '../common/src/js/controller';
import {updateText} from "../common/src/js/link";

import {isTg} from "../common/src/js/telegram";

const onReady = () => isTg() ? true : updateText();

if (document.readyState === `complete` || document.readyState === `interactive`) {
  onReady();
} else {
  document.addEventListener(`DOMContentLoaded`, onReady, false);
}
