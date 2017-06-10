export default {
  update(newSummary) {
    document.getElementById(`password-length`).innerHTML = newSummary.password.length;
    document.getElementById(`guesses`).innerHTML = newSummary.guesses;
    document.getElementById(`guesses-log`).innerHTML = newSummary.guesses_log10;
    document.getElementById(`calctime`).innerHTML = newSummary.calc_time;
    document.getElementById(`score`).innerHTML = newSummary.score;
  }
};
