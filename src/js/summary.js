const COLLAPSED_CLASS_NAME = `collapsed`;

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
  update(newSummary) {
    passwordLengthNode.textContent = newSummary.password.length;
    guessesNode.textContent = newSummary.guesses;
    guessesLogNode.textContent = newSummary.guesses_log10;
    calcTimeNode.textContent = newSummary.calc_time;
    scoreNode.textContent = newSummary.score;
  }
};
