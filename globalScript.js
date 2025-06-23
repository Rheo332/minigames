const audio = document.getElementById("bgMusic");
audio.volume = 0.05;
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

function backButtonClicked() {
  window.location.href = "../index.html";
}

function creditsButtonClicked() {
  window.location.href = "credits/credits.html";
}

function togglePopup() {
  const popup = document.getElementById("infoPopup");
  popup.style.display = popup.style.display === "block" ? "none" : "block";
}

document.addEventListener("click", function (event) {
  const popup = document.getElementById("infoPopup");
  const button = document.querySelector(".info-button");
  if (!popup.contains(event.target) && !button.contains(event.target)) {
    popup.style.display = "none";
  }
});
