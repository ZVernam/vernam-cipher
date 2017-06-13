const passwordLengthNode = document.getElementById(`password-length`);
const guessesNode = document.getElementById(`guesses`);
const guessesLogNode = document.getElementById(`guesses-log`);
const calcTimeNode = document.getElementById(`calctime`);
const scoreNode = document.getElementById(`score`);

export default {
  update(newSummary) {
    passwordLengthNode.innerHTML = newSummary.password.length;
    guessesNode.innerHTML = newSummary.guesses;
    guessesLogNode.innerHTML = newSummary.guesses_log10;
    calcTimeNode.innerHTML = newSummary.calc_time;
    scoreNode.innerHTML = newSummary.score;
  }
};
