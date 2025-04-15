function backButtonClicked() {
    window.location.href = "../index.html";
}

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 15, y: 15 };
let score = 0;

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount),
        };
        score++;
        // TODO: check win condition
    } else {
        snake.pop();
    }

    ctx.fillStyle = "green";
    for (let segment of snake) {
        ctx.fillRect(
            segment.x * gridSize,
            segment.y * gridSize,
            gridSize,
            gridSize
        );
    }

    if (
        head.x < 0 ||
        head.x >= tileCount ||
        head.y < 0 ||
        head.y >= tileCount ||
        snake.slice(1).some((seg) => seg.x === head.x && seg.y === head.y)
    ) {
        // TODO: Show game over message and reload the game (maybe a menu?)
        alert("Game Over! Your score: " + score);
        snake = [{ x: 10, y: 10 }];
        direction = { x: 0, y: 0 };
        food = { x: 15, y: 15 };
        score = 0;
    }
}

function changeDirection(event) {
    // TODO: queue up to 2 direction changes and only update direction once per interval
    switch (event.key) {
        case "ArrowUp":
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
}

document.addEventListener("keydown", changeDirection);
setInterval(() => {
    draw();
    // TODO: probably check direction here
}, 100);
