const game = document.getElementById("game");
const scoreValue = document.getElementById("score").firstChild;
const gridOrder = 40;
let tiles = [];
let snake = [];
let food;
let direction = "right";
let dt = 500;
let dtStep = 25;
let dtMin = 50;
let gameLoop;


function gameOver(){
  clearInterval(gameLoop);
  if(confirm("Game Over :(\nIniziare una nuova partita?"))
    location.reload();
}


function createWalls(){
  for (let i = 0; i < gridOrder; i++)
    tiles[i].className = "wall";
  for (let i = 0; i < gridOrder*gridOrder; i+=gridOrder)
    tiles[i].className = "wall";
  for (let i = gridOrder-1; i < gridOrder*gridOrder; i+= gridOrder)
    tiles[i].className = "wall";
  for (let i = gridOrder*gridOrder-gridOrder; i < gridOrder*gridOrder; i++)
    tiles[i].className = "wall";
}


function spawnFood(){
  let pos = Math.floor(Math.random() * gridOrder*gridOrder);
  let checked = [];
  while(true){
    if(checked.length > 0){
      while(checked.includes(pos))
        pos = Math.floor(Math.random() * gridOrder*gridOrder);
    }
    checked.push(pos);
    let tile = document.getElementById(pos);
    if (tile.className == "grid"){
      tile.className = "food";
      food = pos;
      break;
    }
  }
}


function increaseScore(){
  scoreValue.textContent = parseInt(scoreValue.textContent) + 1;
}


function eat(){
  increaseScore();
  if(dt > dtMin){
    dt-=dtStep;
    clearInterval(gameLoop);
    gameLoop = setInterval(moveSnake, dt);
  }
  let newSnakeTile = tiles[food];
  newSnakeTile.className = "snake";
  spawnFood();
  setTimeout(function(){
    snake.unshift(newSnakeTile);
  }, (snake.length+1)*dt);
}


function changeDirection(dir){
  if(direction == "up" || direction == "down"){
    if(dir == "left" || dir == "right")
      direction = dir;
  }
  if(direction == "right" || direction == "left"){
    if(dir == "up" || dir == "down")
      direction = dir;
  }
}


function moveSnake(){
  snake[0].className = "grid";
  snake.shift();
  let head = snake[snake.length-1];
  let newHead;
  if(direction == "right")
    newHead = tiles[parseInt(head.id)+1];
  else if(direction == "up")
    newHead = tiles[parseInt(head.id)-gridOrder];
  else if(direction == "left")
    newHead = tiles[parseInt(head.id)-1];
  else if(direction == "down")
    newHead = tiles[parseInt(head.id)+gridOrder];
  if(newHead.className == "food"){
    eat();
  }
  else if (newHead.className != "grid"){
    gameOver();
  }
  newHead.className = "snake";
  snake.push(newHead);
}





document.addEventListener('DOMContentLoaded', function(){
  // Init score
  scoreValue.textContent = 5;

  // Create game grid
  for (let i = 0; i < gridOrder*gridOrder; i++) {
    let tile = document.createElement('div');
    tile.className = "grid";
    tile.id = i;
    tiles.push(tile);
    game.appendChild(tile);
  }

  // Create Walls
  createWalls();

  // Create the snake
  // last element is the head
  for (let i = 561; i<=565; i++){
    tiles[i].className = "snake";
    snake.push(tiles[i]);
  }

  spawnFood();

  gameLoop = setInterval(moveSnake, dt);

  document.onkeydown = function(event) {
    switch (event.key) {
      case "ArrowLeft":
        changeDirection("left");
        break;
      case "ArrowRight":
        changeDirection("right");
        break;
      case "ArrowUp":
        changeDirection("up");
        break;
      case "ArrowDown":
        changeDirection("down");
        break;
    }
  }
})
