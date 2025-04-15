function backButtonClicked() {
    window.location.href = "../index.html";
}

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const score = document.getElementById("score");
const output = document.getElementById("output");
output.innerHTML = "Output:\n";

const gridSize = 50;
const tileCount = canvas.width / gridSize;

let hits = 0;
let misses = 0;

let box = {
    x: Math.floor(tileCount / 2),
    y: Math.floor(tileCount / 2),
};
ctx.fillStyle = "red";
ctx.fillRect(
    box.x * gridSize + 1,
    box.y * gridSize + 1,
    gridSize - 2,
    gridSize - 2
);

canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / gridSize);
    const y = Math.floor((event.clientY - rect.top) / gridSize);
    if (x == box.x && y == box.y) {
        output.innerHTML += '<span style="color: #00ff00">Hit</span>\n';
        output.scrollTop = output.scrollHeight;

        hits++;
        score.innerText = hits;

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
});

// TODO: implement a "gameloop" up to a certain score (selectable hit number?)
// TODO: timer + average time calc
// TODO: accuracy calc
