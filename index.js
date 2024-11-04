let btn = document.getElementById("btn");
let gameContainer = document.getElementById("gameContainer");
// let snake = [1, 2];
let snakeObj = {
  row: [9],
  col: [0],
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

  // while (arrowDownBool) {
  //   await timeout(1000);
  //   moveSnake("ArrowDown");
  //   console.log(i);
  //   i++;
  //   if (i > 10) {
  //     break;
  //   }
  // }
  console.log(e.key);
}
document.addEventListener("keydown", logKey);

let snakeAlive = true;
const timeout = (ms) => new Promise((res) => setTimeout(res, ms));
(async () => {
  let i = 0;
  while (snakeAlive == true) {
    // iteration logic
    drawSnake();
    await timeout(1000);
    // console.log(snakeObj);
    // while (arrowDownBool) {
    //   moveSnake("ArrowDown");
    //   console.log(i);
    //   i++;
    //   if (i > 10) {
    //     break;
    //   }
    // }
    // while (arrowRightBool) {
    //   moveSnake("ArrowRight");
    //   console.log(i);
    //   i++;
    //   if (i > 10) {
    //     break;
    //   }
    while (arrowLeftBool) {
      moveSnake("ArrowLeft");
      console.log(i);
      i++;
      if (i > 10) {
        break;
      }
    }
    resetField();
    drawSnake();
    // termination logic
    if (snakeAlive == false) {
      break;
    }
  }
  console.log("done");
})();

function moveSnakeObjectHorizontally() {
  if (snakeObj.row[snakeObj.row.length - 1] < 11) {
    snakeObj.row.push(snakeObj.row[snakeObj.row.length - 1] + 1);
  }
  let shiftedElement = snakeObj.row.shift();
  console.log("shiftie", shiftedElement);
  if (shiftedElement == 9) {
    snakeObj.row.shift();
    console.log("do we enter");
    snakeObj.row.push(0);
  }
}
function moveSnakeObjectLeft() {
  console.log(snakeObj.row);
  if (snakeObj.row[snakeObj.row.length - 1] < 10) {
    snakeObj.row.push(snakeObj.row[snakeObj.row.length - 1] - 1);
  }
  let shiftedElement = snakeObj.row.shift();
  console.log("shiftie", shiftedElement);
  if (shiftedElement == 0) {
    console.log("do we enter");
    snakeObj.row.shift();
    snakeObj.row.push(9);
  }
}

function moveSnakeObjectVertically() {
  if (snakeObj.col[snakeObj.col.length - 1] < 11) {
    snakeObj.col.push(snakeObj.col[snakeObj.col.length - 1] + 1);
  }
  let shiftedElement = snakeObj.col.shift();
  if (shiftedElement == 11) {
    snakeObj.col.push(0);
  }
}

function moveSnake(direction) {
  if (direction == "ArrowRight") {
    moveSnakeObjectHorizontally();
  }
  if (direction == "ArrowDown") {
    moveSnakeObjectVertically();
  }
  if (direction == "ArrowLeft") {
    moveSnakeObjectLeft();
  }
}

function drawSnake() {
  snakeObj.row.forEach((cell) => {
    snakeObj.col.forEach((col) => {
      colorSnake(cell, col);
    });
  });
}

function moveSnakeHorizontally() {
  // if (snake[snake.length - 1] < 9) {
  //   snake.push(snake[snake.length - 1] + 1);
  // }
  // let shiftedElement = snake.shift();
  // if (shiftedElement == 9) {
  //   snake.push(0);
  // }
  // drawSnakeHorizontally(snake, 0);
}

function moveSnakeVertically() {
  if (snake[snake.length - 1] < 11) {
    snake.push(snake[snake.length - 1] + 1);
  }
  let shiftedElement = snake.shift();
  console.log(snake);
  if (shiftedElement == 8) {
    snake.push(0);
  }
  drawSnakeVertically(snake, 0);
}

let children = gameContainer.children;

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
