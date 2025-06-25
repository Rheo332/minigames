function startGame(game) {
  window.location.href = `${game}/${game}.html`;
}

let settings = false;
function settingsButtonClicked() {
  if (settings) {
    document.getElementById("settings").style.visibility = "hidden";
    settings = false;
  } else {
    document.getElementById("settings").style.visibility = "visible";
    settings = true;
  }
}
