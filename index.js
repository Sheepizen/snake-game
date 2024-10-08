let btn = document.getElementById("btn");
let gameContainer = document.getElementById("gameContainer");
let snakeAlive = true;
for (let i = 0; i < 120; i++) {
  let element = document.createElement("div");
  element.textContent = i;
  element.classList.add("gridItem");
  gameContainer.appendChild(element);
}

function colorSnake(i) {
  gameContainer.children[i].classList.add("snake");
}

function removeSnake(i) {
  gameContainer.children[i].classList.remove("snake");
}

const timeout = (ms) => new Promise((res) => setTimeout(res, ms));
(async () => {
  let i = 0;
  while (snakeAlive == true) {
    await timeout(1000);
    // iteration logic
    colorSnake(i);
    if (i >= 4) {
      removeSnake(i - 4);
    }
    i++;
    if (i > 9) {
      i = 0;
    }
    // termination logic
    if (snakeAlive == false) {
      break;
    }
  }
  console.log("done");
})();
