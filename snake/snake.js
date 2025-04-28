function backButtonClicked() {
  window.location.href = "../index.html";
}

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreInfo = document.getElementById("scoreInfo");
const menu = document.getElementById("gameMenu");
const speedSlider = document.getElementById("speedSlider");
const speedSliderLabel = document.getElementById("speedSliderLabel");
const foodImage = new Image();

const gridSize = 20;
const tileCount = canvas.width / gridSize;

const planetImages = [
  "mercury.png",
  "venus.png",
  "earth.png",
  "mars.png",
  "jupiter.png",
  "saturn.png",
  "uranus.png",
  "neptune.png",
];
let currentPlanet = planetImages[Math.floor(Math.random() * planetImages.length)];

let snake = [];
let direction;
let food;
let score;

function draw() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
    currentPlanet = planetImages[Math.floor(Math.random() * planetImages.length)];

    score++;
    if (score >= gridSize * gridSize) {
      scoreInfo.innerText = "You win!";
      scoreInfo.style.color = "green";
      scoreInfo.style.display = "inline";
      menu.style.visibility = "visible";
      clearInterval(interval);
    }
  } else {
    snake.pop();
  }

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  foodImage.src = "../media/img/" + currentPlanet;
  ctx.drawImage(foodImage, food.x * gridSize, food.y * gridSize, gridSize, gridSize);

  let c = 50;
  for (let segment of snake) {
    ctx.fillStyle = `hsl(${c}, 100%, 50%)`;
    c += 3;
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
  }

  if (
    head.x < 0 ||
    head.x >= tileCount ||
    head.y < 0 ||
    head.y >= tileCount ||
    snake.slice(1).some((seg) => seg.x === head.x && seg.y === head.y)
  ) {
    scoreInfo.innerText = "Game Over!\nYour score: " + score;
    scoreInfo.style.color = "red";
    scoreInfo.style.display = "inline";
    menu.style.visibility = "visible";
    clearInterval(interval);
    directionChangeQueue = [];
  }
}

function generateFood() {
  let newFood;
  do {
    newFood = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount),
    };
  } while (snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y));
  return newFood;
}

let directionChangeQueue = [];
function changeDirection(event) {
  switch (event.key) {
    case "ArrowUp":
      if (
        (directionChangeQueue.length === 0 && direction.y === 0) ||
        (directionChangeQueue.length > 0 &&
          directionChangeQueue[directionChangeQueue.length - 1].y === 0)
      )
        directionChangeQueue.push({ x: 0, y: -1 });
      break;
    case "ArrowDown":
      if (
        (directionChangeQueue.length === 0 && direction.y === 0) ||
        (directionChangeQueue.length > 0 &&
          directionChangeQueue[directionChangeQueue.length - 1].y === 0)
      )
        directionChangeQueue.push({ x: 0, y: 1 });
      break;
    case "ArrowLeft":
      if (
        (directionChangeQueue.length === 0 && direction.x === 0) ||
        (directionChangeQueue.length > 0 &&
          directionChangeQueue[directionChangeQueue.length - 1].x === 0)
      )
        directionChangeQueue.push({ x: -1, y: 0 });
      break;
    case "ArrowRight":
      if (
        (directionChangeQueue.length === 0 && direction.x === 0) ||
        (directionChangeQueue.length > 0 &&
          directionChangeQueue[directionChangeQueue.length - 1].x === 0)
      )
        directionChangeQueue.push({ x: 1, y: 0 });
      break;
  }
}
document.addEventListener("keydown", changeDirection);

let interval;
let intervalSpeed = 100;
function startDrawing() {
  interval = setInterval(() => {
    if (directionChangeQueue.length > 0) {
      direction = directionChangeQueue.shift();
    }
    draw();
  }, intervalSpeed);
}

function updateSpeed() {
  intervalSpeed = parseInt(speedSlider.value) * 50;
  speedSliderLabel.innerText = "Tickrate: " + intervalSpeed + "ms";
}

function startGame() {
  menu.style.visibility = "hidden";

  snake = [{ x: Math.floor(tileCount / 2), y: Math.floor(tileCount / 2) }];
  direction = { x: 0, y: 0 };
  food = { x: Math.floor(tileCount / 2) + 4, y: Math.floor(tileCount / 2) };
  score = 0;

  startDrawing();
}
