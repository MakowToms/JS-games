const gameContainer = document.getElementById("game-container");
const player = document.getElementById("player");
const startButton = document.getElementById("start-button");
const obstacles = [];
const playerSpeed = 7; 
let obstacleSpeed = 4;
let score = 0;
let time = 0;



startButton.addEventListener("click", () => {
  gameInProgress = true;
  document.getElementById("start-screen").style.display = "none";
  pitboard.style.display = "block";
  gameContainer.style.display = "block";
});

const keysPressed = {
  ArrowLeft: false,
  ArrowRight: false,
  ArrowUp: false,
  ArrowDown: false,
};

window.addEventListener("keydown", (event) => {
    keysPressed[event.key] = true;
  });
  
  window.addEventListener("keyup", (event) => {
    keysPressed[event.key] = false;
  });

function movePlayer() {
  if (keysPressed["ArrowLeft"] && player.offsetLeft - playerSpeed >= 0) {
    player.style.left = player.offsetLeft - playerSpeed + "px";
  }
  if (keysPressed["ArrowRight"] && player.offsetLeft + player.offsetWidth + playerSpeed <= gameContainer.offsetWidth) {
    player.style.left = player.offsetLeft + playerSpeed + "px";
  }
  if (keysPressed["ArrowUp"] && player.offsetTop - playerSpeed >= 0) {
    player.style.top = player.offsetTop - playerSpeed + "px";
  }
  if (keysPressed["ArrowDown"] && player.offsetTop + player.offsetHeight + playerSpeed <= gameContainer.offsetHeight) {
    player.style.top = player.offsetTop + playerSpeed + "px";
  }
}

function obstaclePostition(){
    const positions = [-230,-80,80,230]
    return positions[Math.floor(Math.random() * positions.length)];
}

function treePosition(){
    const positions = [-170,-150,-120,620,650,670]
    return positions[Math.floor(Math.random() * positions.length)];
}

function randomObstacle(){
  var number = Math.random()
  if (number <= 0.4) {
    index = 0;
  } else if (number < 0.8) {
    index = 1;
  } else if (number <= 1) {
    index = 2;
  } 
  return index
}

function createTree(){

  const obstacle = document.createElement("img");
  obstacle.src = `images/tree.png`;
  obstacle.className = "tree";
  obstacle.style.left = gameContainer.offsetWidth + "px"; 
  obstacle.style.top = treePosition() + "px";
  gameContainer.appendChild(obstacle);
  obstacles.push(obstacle);

}

function createObstacle() {

  const obstacleTypes = ["tire", "car", "truck"];
  const randomType = obstacleTypes[randomObstacle()];
  const obstacle = document.createElement("img");
  obstacle.src = `images/${randomType}.png`;
  obstacle.className = randomType;
  obstacle.style.left = gameContainer.offsetWidth + "px"; 
  if(randomType == "tire"){
      obstacle.style.top = (gameContainer.offsetHeight-20)/2 + obstaclePostition() + "px";
  } else if(randomType == "car"){
      obstacle.style.top = (gameContainer.offsetHeight- 80)/2 + obstaclePostition() + "px";
  } else if(randomType == "truck"){
      obstacle.style.top = (gameContainer.offsetHeight- 100)/2 + obstaclePostition() + "px";
  } 
  gameContainer.appendChild(obstacle);
  obstacles.push(obstacle);
}


function moveObstacles() {
  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i];
    if (obstacle.className == "car"){
      speed = obstacleSpeed*1.1;
    } else{
      speed = obstacleSpeed;
    }
    obstacle.style.left = (parseFloat(obstacle.style.left) - speed) + "px";

    if (
      player.offsetLeft < obstacle.offsetLeft + obstacle.offsetWidth &&
      player.offsetLeft + player.offsetWidth > obstacle.offsetLeft &&
      player.offsetTop < obstacle.offsetTop + obstacle.offsetHeight &&
      player.offsetTop + player.offsetHeight > obstacle.offsetTop
    ) {
      if (obstacle.className == "tire"){
        gameContainer.removeChild(obstacle);
        obstacles.splice(i, 1);
        score++;
        document.getElementById("score").innerText = `${score}`;
      } else{
      gameOver();
      return;
      }
    }

    if (parseFloat(obstacle.style.left) + obstacle.offsetWidth < 0) {
      gameContainer.removeChild(obstacle);
      obstacles.splice(i, 1);
    }
  }
}

let gameInProgress = false; 

function updateTime() {
  if (gameInProgress) { 
    time++;
    const timeCounter = document.getElementById("time");
    timeCounter.textContent = time + " s";
    if (time % 5 === 0) {
      obstacleSpeed += 0.1;
    }
    if (time % 20 === 0) {
      const intervalId = setInterval(createObstacle, 1800); 
    }
  }
}


function gameOver() {
  gameInProgress = false;
  showEndScreen();
}

function showEndScreen() {

  gameContainer.style.display = "none";
  document.getElementById("pitboard").style.display = "none";
  document.body.style.background = "black";
  endScreen.style.display = "block";
  const retryButton = document.getElementById("retry-button");
  document.getElementById("score-end").innerText = `${score}`;
  document.getElementById("time-end").innerText = `${time}` + "s";

  retryButton.addEventListener("click", () => {
    endScreen.style.display = "none";

    document.getElementById("start-screen").style.display = "none";
    score = 0;
    time = 0;
    player.style.left = 0 + "px";
    player.style.top = 260 + "px";
    document.body.style.background = "url('images/grass.png')";
    obstacleSpeed = 4
    for (let i = 0; i < obstacles.length; i++) {
      const obstacle = obstacles[i];
      gameContainer.removeChild(obstacle);
      obstacles.splice(i, 1);
  }
  pitboard.style.display = "block";
  gameContainer.style.display = "block";
  document.getElementById("score").innerText = `0`;

  location.reload();
  gameInProgress = true;
  score = 0;
  time = 0;

  });
  
}






setInterval(updateTime, 1000);
setInterval(createObstacle, 1200); 
setInterval(createTree, 1800); 
setInterval(movePlayer, 10); 
setInterval(moveObstacles, 10); 







