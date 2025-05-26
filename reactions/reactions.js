function backButtonClicked() {
  window.location.href = "../index.html";
}

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreInfo = document.getElementById("scoreInfo");
const menu = document.getElementById("gameMenu");
const score = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const output = document.getElementById("output");
output.innerHTML = '<span style="color: #5000ff">Output:</span>\n';

const gridSize = 50;
const tileCount = canvas.width / gridSize;

let playing = false;
let hits;
let misses;
let startTime;
let timerInterval;
let lastHitTime;

let box = {
  x: Math.floor(Math.random() * tileCount),
  y: Math.floor(Math.random() * tileCount),
};

canvas.addEventListener("click", (event) => {
  if (playing) {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / gridSize);
    const y = Math.floor((event.clientY - rect.top) / gridSize);
    if (x == box.x && y == box.y) {
      output.innerHTML += `<span style="color: #00ff00">Hit ${formatTime(
        Date.now() - lastHitTime
      )}</span>\n`;
      output.scrollTop = output.scrollHeight;

      hits++;
      score.innerText = hits;
      lastHitTime = Date.now();

      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      box = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount),
      };
      ctx.fillStyle = "red";
      ctx.fillRect(box.x * gridSize, box.y * gridSize, gridSize, gridSize);
    } else {
      output.innerHTML += '<span style="color: #ff0000">Missed</span>\n';
      output.scrollTop = output.scrollHeight;
      misses++;
    }

    if (hits === 10) {
      clearInterval(timerInterval);
      playing = false;

      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      scoreInfo.innerText = `Stats:

                          Hits: ${hits}
                          Misses: ${misses}
                          Accuracy: ${((hits / (hits + misses)) * 100).toFixed(2)}%

                          Time: ${timerDisplay.textContent}
                          Average Hit: ${Math.floor((Date.now() - startTime) / hits)}ms`;
      scoreInfo.style.display = "inline";
      menu.style.visibility = "visible";
    }
  }
});

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const seconds = totalSeconds % 60;
  const ms = Math.floor((milliseconds % 1000) / 10);

  return String(seconds).padStart(2, "0") + ":" + String(ms).padStart(2, "0");
}

function updateTimer() {
  const elapsedTime = Date.now() - startTime;
  timerDisplay.textContent = formatTime(elapsedTime);
}

function startGame() {
  output.innerHTML = '<span style="color: #5000ff">Output:</span>\n';
  startTime = Date.now();
  lastHitTime = startTime;
  timerInterval = setInterval(updateTimer, 33);
  playing = true;
  timerDisplay.textContent = "00:00";

  hits = 0;
  misses = 0;
  score.innerText = 0;

  menu.style.visibility = "hidden";
  ctx.fillStyle = "red";
  ctx.fillRect(box.x * gridSize + 1, box.y * gridSize + 1, gridSize - 2, gridSize - 2);
}
