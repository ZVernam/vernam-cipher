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
document.getElementById(`expand-collapse-button`).onclick = function () {
  collapsed = !collapsed;

  const useElement = this.querySelector(`use`);
  const icon = `open-iconic.svg#caret-${collapsed ? `right` : `bottom`}`;
  useElement.setAttribute(`xlink:href`, icon);
  expandCollapseContentNode.classList.toggle(COLLAPSED_CLASS_NAME);
};

export default {
  update(summary) {
    textHashNode.textContent = summary.text_hash;
    secretHashNode.textContent = summary.secret_hash.substring(0, summary.text_hash.length);
    passwordLengthNode.textContent = summary.password.length;
    guessesNode.textContent = summary.guesses;
    guessesLogNode.textContent = summary.guesses_log10;
    calcTimeNode.textContent = summary.calc_time;
    scoreNode.textContent = summary.score;
  }
};
