const words = document.getElementsByClassName("word");

Array.from(words[0].children).forEach((child) => {
  child.disabled = false;
});
let activeRow = 0;

let wordlist = ["APPLE", "GRAPE", "LEMON", "MANGO", "PEACH"];
let solution = "APPLE";

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
        if (wordlist.includes(word)) {
          if (word === solution) {
            console.log("Correct word!");
            // TODO: implement win
          } else {
            for (let i = 1; i <= 5; i++) {
              // TODO: check every letter and color it accordingly
              // idea: color only the border
              // word[i - 1] === solution[i - 1]
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
              console.log("Game Over");
            }
          }
        } else {
          console.log("Invalid word!");
          // TODO: wrong word animation
        }
      }
    });
    child.addEventListener("animationend", (event) => {
      child.style.animation = "none";
    });
  });
  row++;
});
