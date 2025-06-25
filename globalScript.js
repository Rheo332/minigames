const audio = document.getElementById("bgMusic");
audio.volume = 0.05;
audio.pause();

function toggleSound() {
  const soundIconUse = document.getElementById("sound-icon-use");

  if (!audio.paused) {
    audio.pause();
    soundIconUse.setAttribute("href", "#sound-off-icon");
  } else {
    audio.play();
    soundIconUse.setAttribute("href", "#sound-on-icon");
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

const select = document.getElementById("theme-select");
const savedTheme = localStorage.getItem("theme") || "gold";
document.documentElement.setAttribute("data-theme", savedTheme);
select.value = savedTheme;

select.addEventListener("change", (e) => {
  const theme = e.target.value;
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
});
