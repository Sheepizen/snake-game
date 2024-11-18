let btn = document.getElementById("btn");
let gameContainer = document.getElementById("gameContainer");
let snake = [1, 2];
let snakeObj = {
  row: [0],
  col: [9],
};
const rows = 12;
const cols = 10;
let arrowUpBool = false;
let arrowDownBool = false;
let arrowLeftBool = false;
let arrowRightBool = false;
function fillArr(num) {
  for (let i = 0; i < num; i++) {
    let arr = [];
    arr.push(i);
    return arr;
  }
}

const array2D = new Array(rows)
  .fill()
  .map((row, index) => new Array(cols).fill(index));

array2D.forEach((row, y) => {
  row.forEach((cell, x) => {
    let item = document.createElement("div");
    item.textContent = cell;
    item.classList.add("gridItem");
    item.id = `x${x}y${y}`;
    gameContainer.appendChild(item);
  });
});
async function logKey(e) {
  if (e.key == "ArrowUp") {
    arrowUpBool = true;
    arrowDownBool = false;
    arrowLeftBool = false;
    arrowRightBool = false;
  }

  if (e.key == "ArrowDown") {
    arrowUpBool = false;
    arrowDownBool = true;
    arrowLeftBool = false;
    arrowRightBool = false;
  }
  if (e.key == "ArrowLeft") {
    arrowUpBool = false;
    arrowDownBool = false;
    arrowLeftBool = true;
    arrowRightBool = false;
  }
  if (e.key == "ArrowRight") {
    arrowUpBool = false;
    arrowDownBool = false;
    arrowLeftBool = false;
    arrowRightBool = true;
  }

  if (e.key == "Escape") {
    snakeAlive = false;
    arrowUpBool = false;
    arrowDownBool = false;
    arrowLeftBool = false;
    arrowRightBool = false;
  }
  console.log(e.key);
}
document.addEventListener("keydown", logKey);

let snakeAlive = true;
const timeout = (ms) => new Promise((res) => setTimeout(res, ms));
(async () => {
  let score = 3;
  snake = [
    [6, 1],
    [6, 0],
  ];
  while (snakeAlive == true) {
    await timeout(3000);
    snake.forEach((snail) => {
      let x = snail[0];
      let y = snail[1];
      let popped = snake.shift();
      console.log("popped", popped);
      if (arrowUpBool) {
        if (y > 0) {
          y--;
        } else if (y == 0) {
          y = 11;
        }
      }
      if (arrowRightBool) {
        if (x < 9) {
          x++;
        } else if (x == 9) {
          x = 0;
        }
      }
      if (arrowLeftBool) {
        if (x > 0) {
          x--;
        } else if (x == 0) {
          x = 9;
        }
      }
      if (arrowDownBool) {
        if (y < 11) {
          y++;
        } else if (y == 11) {
          y = 0;
        }
      }
      resetField();
      let pop = snake.pop();

      snake.unshift(pop);
      snake.push([x, y]);
    });
    console.log("test", snake);
    for (const snail of snake) {
      colorSnake(snail[0], snail[1]);
    }
    if (snakeAlive == false) {
      break;
    }
  }
  console.log("done");
})();

let children = gameContainer.children;

function addLimb(score, x, y) {
  for (let i = 1; i < score; i++) {
    colorSnake(x, y - i);
  }
}

function colorSnake(x, y) {
  let element = document.getElementById(`x${x}y${y}`);
  element.classList.add("snake");
}

function resetField() {
  for (let i = 0; i < gameContainer.children.length; i++) {
    gameContainer.children[i].classList.remove("snake");
  }
}
function removeSnake(x, y) {
  gameContainer.children[i].classList.remove("snake");
}
