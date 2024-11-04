let btn = document.getElementById("btn");
let gameContainer = document.getElementById("gameContainer");
console.log("gameContainer", gameContainer.children);
let snake = [3, 4, 5];
let snakeObj = {
  row: [1],
  col: [0],
};
const rows = 12;
const cols = 10;

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
let snakeAlive = true;
const timeout = (ms) => new Promise((res) => setTimeout(res, ms));
(async () => {
  while (snakeAlive == true) {
    // iteration logic
    await timeout(1000);
    resetField();
    moveSnake("horizontally");
    drawSnake();
    // termination logic
    if (snakeAlive == false) {
      break;
    }
  }
  console.log("done");
})();

function moveSnakeObjectHorizontally() {
  if (snakeObj.row[snakeObj.row.length - 1] < 9) {
    snakeObj.row.push(snakeObj.row[snakeObj.row.length - 1] + 1);
  }
  let shiftedElement = snakeObj.row.shift();
  if (shiftedElement == 7) {
    snakeObj.row.push(0);
  }
}

function moveSnakeObjectVertically() {
  if (snakeObj.col[snakeObj.col.length - 1] < 11) {
    snakeObj.col.push(snakeObj.col[snakeObj.col.length - 1] + 1);
  }
  let shiftedElement = snakeObj.col.shift();
  if (shiftedElement == 7) {
    snakeObj.col.push(0);
  }
}

function moveSnake(direction) {
  if (direction == "horizontally") {
    moveSnakeHorizontally();
  }
  if (direction == "vertically") {
    moveSnakeObjectVertically();
  }
}

function drawSnake() {
  snakeObj.row.forEach((cell) => {
    colorSnake(cell, 0);
  });
  snakeObj.col.forEach((col) => {
    colorSnake(0, col);
  });
}

function moveSnakeHorizontally() {
  if (snake[snake.length - 1] < 9) {
    snake.push(snake[snake.length - 1] + 1);
  }
  let shiftedElement = snake.shift();
  if (shiftedElement == 9) {
    snake.push(0);
  }
  drawSnakeHorizontally(snake, 0);
}

function moveSnakeVertically() {
  if (snake[snake.length - 1] < 11) {
    snake.push(snake[snake.length - 1] + 1);
  }
  let shiftedElement = snake.shift();
  console.log(snake);
  if (shiftedElement == 9) {
    snake.push(0);
  }
  drawSnakeVertically(snake, 0);
}

let children = gameContainer.children;

function drawSnakeHorizontally(snake, row) {
  snake.forEach((element) => {
    colorSnake(element, row);
  });
}

function drawSnakeVertically(snake, column) {
  snake.forEach((element) => {
    colorSnake(column, element);
  });
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
