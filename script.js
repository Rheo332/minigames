function startGame(game) {
  window.location.href = `${game}/${game}.html`;
}

const audio = document.getElementById("bgMusic");
audio.volume = 0.1;
audio.pause();

function toggleSound() {
  const soundButton = document.getElementsByClassName("soundButton")[0];

  if (!audio.paused) {
    audio.pause();
    soundButton.classList.toggle("active");
  } else {
    audio.play();
    soundButton.classList.toggle("active");
  }
}
