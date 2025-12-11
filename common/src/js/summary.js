import {updateIcon} from './util';

const COLLAPSED_CLASS_NAME = `collapsed`;

const textHashNode = document.getElementById(`text-hash`);
const secretHashNode = document.getElementById(`secret-hash`);
const passwordLengthNode = document.getElementById(`password-length`);
const guessesNode = document.getElementById(`guesses`);
const guessesLogNode = document.getElementById(`guesses-log`);
const calcTimeNode = document.getElementById(`calctime`);
const scoreNode = document.getElementById(`score`);
const expandCollapseContentNode = document.getElementById(`expand-collapse-content`);

let collapsed = expandCollapseContentNode.classList.contains(COLLAPSED_CLASS_NAME);
const expandCollapseButton = document.getElementById(`expand-collapse-button`);
expandCollapseButton.onclick = function () {
  collapsed = !collapsed;
  updateIcon(expandCollapseButton, `caret-${collapsed ? `right` : `bottom`}`);
  expandCollapseContentNode.classList.toggle(COLLAPSED_CLASS_NAME);
};

export default (summary) => {
  textHashNode.textContent = summary.text_hash;
  secretHashNode.textContent = summary.secret_hash.substring(0, summary.text_hash.length);
  passwordLengthNode.textContent = summary.password.length;
  guessesNode.textContent = summary.guesses;
  guessesLogNode.textContent = summary.guesses_log10;
  calcTimeNode.textContent = summary.calc_time;
  scoreNode.textContent = summary.score;
};
