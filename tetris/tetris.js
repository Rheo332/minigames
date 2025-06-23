const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
context.scale(20, 20);

const arena = createMatrix(12, 20);

const colors = [
  null,
  "#00f0f0", // I
  "#0000f0", // J
  "#f0a000", // L
  "#f0f000", // O
  "#00f000", // S
  "#a000f0", // T
  "#f00000", // Z
];

const player = {
  pos: { x: 0, y: 0 },
  shape: null,
  score: 0,
};

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;
let gameRunning = false;

function createMatrix(w, h) {
  const matrix = [];
  while (h--) {
    matrix.push(new Array(w).fill(0));
  }
  return matrix;
}

function createPiece(type) {
  switch (type) {
    case "T":
      return [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ];
    case "O":
      return [
        [2, 2],
        [2, 2],
      ];
    case "L":
      return [
        [0, 0, 3],
        [3, 3, 3],
        [0, 0, 0],
      ];
    case "J":
      return [
        [4, 0, 0],
        [4, 4, 4],
        [0, 0, 0],
      ];
    case "I":
      return [
        [0, 0, 0, 0],
        [5, 5, 5, 5],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
    case "S":
      return [
        [0, 6, 6],
        [6, 6, 0],
        [0, 0, 0],
      ];
    case "Z":
      return [
        [7, 7, 0],
        [0, 7, 7],
        [0, 0, 0],
      ];
  }
}

function drawMatrix(matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        context.fillStyle = colors[value];
        context.fillRect(x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
}

function draw() {
  context.fillStyle = "#000";
  context.fillRect(0, 0, canvas.width, canvas.height);

  drawMatrix(arena, { x: 0, y: 0 });
  drawMatrix(player.shape, player.pos);
}

function merge(arena, player) {
  player.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        arena[y + player.pos.y][x + player.pos.x] = value;
      }
    });
  });
}

function collide(arena, player) {
  const [m, o] = [player.shape, player.pos];
  for (let y = 0; y < m.length; ++y) {
    for (let x = 0; x < m[y].length; ++x) {
      if (m[y][x] !== 0 && (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {
        return true;
      }
    }
  }
  return false;
}

function playerDrop() {
  player.pos.y++;
  if (collide(arena, player)) {
    player.pos.y--;
    merge(arena, player);
    playerReset();
    arenaSweep();
  }
  dropCounter = 0;
}

function playerMove(dir) {
  player.pos.x += dir;
  if (collide(arena, player)) {
    player.pos.x -= dir;
  }
}

function rotate(matrix) {
  const N = matrix.length;
  const result = [];
  for (let y = 0; y < N; ++y) {
    result[y] = [];
    for (let x = 0; x < matrix[y].length; ++x) {
      result[y][x] = matrix[N - x - 1][y];
    }
  }
  return result;
}

function playerRotate() {
  const oldShape = player.shape;
  const rotated = rotate(player.shape);
  player.shape = rotated;

  const pos = player.pos.x;
  let offset = 1;
  while (collide(arena, player)) {
    player.pos.x += offset;
    offset = -(offset + (offset > 0 ? 1 : -1));
    if (offset > player.shape[0].length) {
      player.shape = oldShape;
      player.pos.x = pos;
      return;
    }
  }
}

function playerReset() {
  const pieces = "TJLOSZI";
  player.shape = createPiece(pieces[Math.floor(Math.random() * pieces.length)]);
  player.pos.y = 0;
  player.pos.x = ((arena[0].length / 2) | 0) - ((player.shape[0].length / 2) | 0);
  if (collide(arena, player)) {
    arena.forEach((row) => row.fill(0));
    gameRunning = false;
    document.getElementById("gameMenu").style.visibility = "visible";
    document.getElementById("scoreInfo").style.display = "inline";
    document.getElementById("scoreInfo").innerText = `Your score: ${player.score}`;
  }
}

function arenaSweep() {
  let rowCount = 1;
  outer: for (let y = arena.length - 1; y >= 0; --y) {
    for (let x = 0; x < arena[y].length; ++x) {
      if (arena[y][x] === 0) continue outer;
    }
    const row = arena.splice(y, 1)[0].fill(0);
    arena.unshift(row);
    y++;
    player.score += rowCount * 10;
    rowCount *= 2;
  }
}

function updateSpeed() {
  const slider = document.getElementById("speedSlider");
  const label = document.getElementById("speedSliderLabel");
  const speeds = { 1: 400, 2: 600, 3: 800 };
  dropInterval = speeds[slider.value];
  label.innerText = `Tickrate: ${dropInterval}ms`;
}

function update(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;

  if (gameRunning) {
    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
      playerDrop();
    }
    draw();
    requestAnimationFrame(update);
  }
}

function startGame() {
  document.getElementById("gameMenu").style.visibility = "hidden";
  gameRunning = true;
  arena.forEach((row) => row.fill(0));
  playerReset();
  lastTime = 0;
  dropCounter = 0;
  player.score = 0;
  update();
}

document.addEventListener("keydown", (e) => {
  if (!gameRunning) return;
  if (e.key === "ArrowLeft" || e.key === "a") playerMove(-1);
  else if (e.key === "ArrowRight" || e.key === "d") playerMove(1);
  else if (e.key === "ArrowDown" || e.key === "s") playerDrop();
  else if (e.key === "ArrowUp" || e.key === "w") playerRotate();
});
