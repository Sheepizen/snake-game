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

//BUGS:
//collision detection sometimes fucked up. Maybe head / next logic?

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
function checkInput(){
document.addEventListener("keydown", logKey);
}
checkInput()
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

// if(getNextTile(x,y)){
//   getNextTile(x,y).classList.add("next")
// document.getElementById(`x${x}y${y}`).classList.add("head")
//       if(checkCollison(document.getElementById(`x${x}y${y}`))){
//         console.log("HEAD SNAKE HAHA")
//         break
//       }
//           if(checkCollison(getNextTile(x,y))){
//             console.log("NEXT TILE HAHA")
//             snakeAlive == false
//             break
//           }
//         }


snake.unshift([x, y]);

    
if(getNextTile(x,y)){
      if(checkCollison(document.getElementById(`x${x}y${y}`))){
        break
      }
  }

resetField();


    for (const snail of snake) {
      colorSnake(snail[0], snail[1]);
    }



    let element = document.getElementById(`x${snake[0][0]}y${snake[0][1]}`);

    if (onEat(element)) {
      addFood(snake);
      snake.push([x, y]);
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
    gameContainer.children[i].classList.remove("head");
    gameContainer.children[i].classList.remove("next");
  }
}

function addFood(snake) {
  let x = Math.floor(Math.random() * 9) + 1;
  let y = Math.floor(Math.random() * 11) + 1;
  console.log(x, y);
  let element = document.getElementById(`x${x}y${y}`);

  if (element.classList.contains("snake")) {
    addFood(snake);
  } else {
    element.classList.add("food");
  }
  return;
}

function onEat(element) {
  if (element.classList.contains("food")) {
    element.classList.remove("food");
    return true;
  }
}


function checkCollison(element) {
  if (element.classList.contains("snake")) {
    return true;
  }
}

function getNextTile(x,y){
if(arrowRightBool){
      if(x == 9) {
    return document.getElementById( `x${0}y${y}`) 
      } else {
    return document.getElementById( `x${x+1}y${y}`) 
      }
    }
if(arrowLeftBool){
      if(x == 0) {
    return document.getElementById( `x${9}y${y}`) 
      } else {
    return document.getElementById( `x${x-1}y${y}`) 
      }
    }
    if(arrowDownBool){
      if(y==11){
    return document.getElementById( `x${x}y${0}`)
      }
      else {
    return document.getElementById( `x${x}y${y+1}`)
       }
    }
    if(arrowUpBool){
      if(y>0){
    return document.getElementById( `x${x}y${y-1}`) 
      }
      else {
 return document.getElementById( `x${x}y${11}`)
         }
    }
}