function startGame(game) {
  window.location.href = `${game}/${game}.html`;
}

const audio = document.getElementById("bgMusic");
audio.volume = 0.1;
audio.loop = true;
audio.pause();
let soundOn = false;

function toggleSound() {
  const soundButton = document.getElementsByClassName("soundButton")[0];

  if (soundOn) {
    audio.pause();
    soundButton.classList.toggle("active");
    soundOn = false;
  } else {
    audio.play();
    soundButton.classList.toggle("active");
    soundOn = true;
  }
}
