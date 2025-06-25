const menu = document.getElementById("gameMenu");
const scoreInfo = document.getElementById("scoreInfo");
const words = document.getElementsByClassName("word");

Array.from(words[0].children).forEach((child) => {
  child.disabled = false;
});
let activeRow = 0;

let validWords = [];
async function loadWords() {
  try {
    const response = await fetch("valid-words.txt");
    const text = await response.text();
    validWords = text
      .split("\n")
      .map((word) => word.trim().toUpperCase())
      .filter(Boolean);
  } catch (error) {
    console.error("Error fetching valid words:", error);
  }
}
loadWords();

let validSolutions = [];
let solution = "";
async function loadSolutions() {
  try {
    const response = await fetch("valid-solutions.txt");
    const text = await response.text();
    validSolutions = text
      .split("\n")
      .map((word) => word.trim().toUpperCase())
      .filter(Boolean);

    solution = validSolutions[Math.floor(Math.random() * validSolutions.length)];
    console.log("Solution selected:", solution);
  } catch (error) {
    console.error("Error fetching valid solutions:", error);
  }
}
loadSolutions();

let row = 1;
Array.from(words).forEach((element) => {
  let col = 1;
  Array.from(element.children).forEach((child) => {
    child.id = "letter" + `${row}` + `${col}`;
    col++;
    child.addEventListener("keydown", (event) => {
      event.preventDefault();
      let index = parseInt(child.id.slice(-1));
      if (event.key === "Backspace") {
        if (index === 1 || child.value !== "") {
          child.value = "";
          child.focus();
        } else {
          let prev = document.getElementById(child.id.slice(0, -1) + `${index - 1}`);
          prev.value = "";
          prev.focus();
        }
      } else if (/^[a-zA-Z]$/.test(event.key)) {
        let letter = event.key.toUpperCase();
        child.value = letter;
        let inputAnimation = "popIn 0.4s ease-in-out";
        child.style.animation = inputAnimation;
        if (index < 5) {
          let next = document.getElementById(child.id.slice(0, -1) + `${index + 1}`);
          next.focus();
        }
      } else if (event.key === "Enter") {
        let word = "";
        for (let i = 1; i <= 5; i++) {
          word += document.getElementById(child.id.slice(0, 7) + `${i}`).value;
        }
        if (validWords.includes(word)) {
          if (word === solution) {
            menu.style.visibility = "visible";
            Array.from(words[activeRow].children).forEach((c) => {
              c.disabled = true;
            });
            scoreInfo.innerText = "You won! The correct word was: " + solution;
            scoreInfo.style.color = "green";
            scoreInfo.style.display = "inline";
          } else {
            for (let i = 1; i <= 5; i++) {
              if (word[i - 1] === solution[i - 1]) {
                document.getElementById(child.id.slice(0, -1) + `${i}`).style.borderColor = "green";
              } else if (solution.includes(word[i - 1])) {
                document.getElementById(child.id.slice(0, -1) + `${i}`).style.borderColor =
                  "yellow";
              } else {
                document.getElementById(child.id.slice(0, -1) + `${i}`).style.borderColor = "gray";
              }
            }
            Array.from(words[activeRow].children).forEach((c) => {
              c.disabled = true;
            });
            if (activeRow < 5) {
              let nextRow = activeRow + 1;
              Array.from(words[nextRow].children).forEach((c) => {
                c.disabled = false;
              });
              document.getElementById(child.id.slice(0, -2) + `${nextRow + 1}` + "1").focus();
              activeRow++;
            } else {
              menu.style.visibility = "visible";
              scoreInfo.innerText = "You lost! The correct word was: " + solution;
              scoreInfo.style.color = "red";
              scoreInfo.style.display = "inline";
            }
          }
        } else {
          for (let i = 1; i <= 5; i++) {
            word += document.getElementById(child.id.slice(0, 7) + `${i}`).style.animation =
              "wrongWord 0.4s ease-in-out";
          }
        }
      }
    });
    child.addEventListener("animationend", (event) => {
      child.style.animation = "none";
    });
  });
  row++;
});

function startGame() {
  Array.from(words).forEach((element) => {
    Array.from(element.children).forEach((child) => {
      child.value = "";
      child.disabled = true;
      child.style.borderColor = "var(--primary-accent-color)";
    });
  });
  solution = validSolutions[Math.floor(Math.random() * validSolutions.length)];
  console.log("Solution selected:", solution);
  Array.from(words[0].children).forEach((child) => {
    child.disabled = false;
  });
  activeRow = 0;
  document.getElementById("letter11").focus();
  menu.style.visibility = "hidden";
}
