function backButtonClicked() {
  window.location.href = "../index.html";
}

const words = document.getElementsByClassName("word");

Array.from(words[0].children).forEach((child) => {
  child.disabled = false;
});

let row = 1;
Array.from(words).forEach((element) => {
  let col = 1;
  Array.from(element.children).forEach((child) => {
    child.id = "letter" + `${row}` + `${col}`;
    col++;
    child.addEventListener("keydown", (event) => {
      event.preventDefault();
      if (event.key === "Backspace") {
        let index = parseInt(child.id.slice(-1));
        if (index > 1) {
          let prev = document.getElementById(child.id.slice(0, -1) + `${index - 1}`);
          if ((index === 5 && child.value == "") || index !== 5) {
            prev.value = "";
          }
          prev.focus();
          child.value = "";
        }
      }
      if (/^[a-zA-Z]$/.test(event.key)) {
        let letter = event.key.toUpperCase();
        let index = parseInt(child.id.slice(-1));
        child.value = letter;
        child.style.animation = "spin 0.6s ease normal";
        if (index < 5) {
          let next = document.getElementById(child.id.slice(0, -1) + `${index + 1}`);
          next.focus();
        }
      }
    });
    child.addEventListener("animationend", (event) => {
      child.style.animation = "none";
    });
  });
  row++;
});
