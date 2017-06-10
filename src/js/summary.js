let passwordLengthNode = document.getElementById(`password-length`);
let guessesNode = document.getElementById(`guesses`);
let guessesLogNode = document.getElementById(`guesses-log`);
let calcTimeNode = document.getElementById(`calctime`);
let scoreNode = document.getElementById(`score`);

export default {
  update(newSummary) {
    passwordLengthNode.innerHTML = newSummary.password.length;
    guessesNode.innerHTML = newSummary.guesses;
    guessesLogNode.innerHTML = newSummary.guesses_log10;
    calcTimeNode.innerHTML = newSummary.calc_time;
    scoreNode.innerHTML = newSummary.score;
  }
};
