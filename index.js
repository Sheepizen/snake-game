let btn = document.getElementById("btn");
let gameContainer = document.getElementById("gameContainer");
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
  if (e.key == "ArrowUp" && arrowDownBool == false) {
    arrowUpBool = true;
    arrowDownBool = false;
    arrowLeftBool = false;
    arrowRightBool = false;
  }

  if (e.key == "ArrowDown" && arrowUpBool == false) {
    arrowUpBool = false;
    arrowDownBool = true;
    arrowLeftBool = false;
    arrowRightBool = false;
  }
  if (e.key == "ArrowLeft" && arrowRightBool == false) {
    arrowUpBool = false;
    arrowDownBool = false;
    arrowLeftBool = true;
    arrowRightBool = false;
  }
  if (e.key == "ArrowRight" && arrowLeftBool == false) {
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
  let snake = [
    [1, 0],
    [2, 0],
    [3, 0],
  ];
  let score = snake.length;
  let x = snake[0][0];
  let y = snake[0][1];

  addFood(snake);
  while (snakeAlive == true) {
    await timeout(100);
    snake.pop();
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
    snake.unshift([x, y]);
    console.log("HELLO", snake);
    let element = document.getElementById(`x${snake[0][0]}y${snake[0][1]}`);
    if (checkCollision(element)) {
      console.log("hallodasdsa");
      addFood(snake);
      snake.push([x, y]);
    }
    console.log("ELEMENT", element);
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

function colorSnake(x, y) {
  let element = document.getElementById(`x${x}y${y}`);
  element.classList.add("snake");
}

function resetField() {
  for (let i = 0; i < gameContainer.children.length; i++) {
    gameContainer.children[i].classList.remove("snake");
  }
}

function addFood(snake) {
  console.log("moin", snake);
  let x = Math.floor(Math.random() * 9) + 1;
  let y = Math.floor(Math.random() * 11) + 1;
  // let x = snake[0][0];
  // let y = snake[0][1];
  console.log(x, y);
  let element = document.getElementById(`x${x}y${y}`);
  console.log("classList addfood element", element, element.className);
  snake.forEach((limb) => {
    let element = document.getElementById(`x${limb[0]}y${limb[1]}`);
    console.log("element class list", element.classList);
    console.log(
      "CHECK",
      "classlist",
      element.classList,
      element.classList.length
    );
    console.log("each element ", element.classList.contains("food"));
    const div = document.createElement("div");
    div.className = "foo";
    console.log("ELEMETN", div.classList);
    if (element.classList.contains("snake")) {
      console.log("is here double");
      // addFood(snake);
    }
  });
  element.classList.add("food");
  return;
}

function checkCollision(element) {
  if (element.classList.contains("food")) {
    element.classList.remove("food");
    return true;
  }
}

function addLimb(x, y) {
  console.log("coordinates", x, y);
  if (arrowUpBool) {
    if (y > 0) {
      y--;
    } else {
      y = 11;
    }
    console.log("newest entry", x, y);
    snake.unshift([x, y]);
  }

  if (arrowRightBool) {
    if (x < 9) {
      x++;
    } else {
      x = 0;
    }

    console.log("newest entry", x, y);
    snake.unshift([x, y]);
  }
  if (arrowLeftBool) {
    if (x > 0) {
      x--;
    } else {
      x = 9;
    }
    console.log("newest entry", x, y);
    snake.unshift([x, y]);
  }
}
