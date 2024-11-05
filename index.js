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
  let x = 6;
  let y = 1;
  let score = 3;
  while (snakeAlive == true) {
    await timeout(500);
    console.log(x);

    if (arrowUpBool) {
      if (y > 0) {
        y--;
      } else if (y == 0) {
        y = 11;
      }
      // moveSnake("ArrowUp");
      // console.log(i);
      // i++;
      // if (i > 10) {
      //   break;
      // }
    }
    if (arrowRightBool) {
      if (x < 9) {
        x++;
      } else if (x == 9) {
        x = 0;
      }
      // moveSnake("ArrowRight");
      // console.log(i);
      // i++;
      // if (i > 10) {
      //   break;
      // }
    }
    if (arrowLeftBool) {
      if (x > 0) {
        x--;
      } else if (x == 0) {
        x = 9;
      }
    }
    resetField();
    if (arrowDownBool) {
      if (y < 11) {
        y++;
        for (let i = 1; i < score; i++) {
          colorSnake(x, y - i);
        }
      } else if (y == 11) {
        for (let i = 1; i < score; i++) {
          colorSnake(x, y - 1);
        }
        y = 0;
      }
      // moveSnake("ArrowDown");
      // console.log(i);
      // i++;
      // if (i > 10) {
      //   break;
      // }
    }
    colorSnake(x, y);

    console.log("snake:", x, y);
    // termination logic
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
