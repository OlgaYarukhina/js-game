//"pages"  html elements
const initMenu = document.getElementById("init-menu");
const gameBoard = document.getElementById("game-board");
const game = document.getElementById("game");
const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("highScore");

let isPlaying = false;
let isGameEnded = false;
let pauseStart = 0;

let highScore = localStorage.getItem("highScore") || 0;


const pause = () => {
  if (isPlaying) {
    pauseStart = Date.now()
    isPlaying = false;
  } else if (!isPlaying) {
    timeOnPause += Date.now() - pauseStart
    isPlaying = true;
    requestAnimationFrame(gameLoop);
  }
}

const restart = () => {
      isPlaying = false;
      location.reload();
}


const play = () => {
  isPlaying = true;
  initMenu.style.display = "none";
  game.style.display = "block";
  activateSpawner();
  requestAnimationFrame(gameLoop);
}


const handleGameOver = () => {
  isPlaying = false;
  let gameOver = document.getElementById("gameOver")
  game.style.display = "none";
  gameOver.style.display = "block";
}


const handleWin = () => {
  isPlaying = false;
  let win = document.getElementById("win")
  game.style.display = "none";
  win.style.display = "block";
  scoreElement.innerText = `Score: ${numberOfBrokenClouds} clouds`;
  checkScore();
}

const checkScore = () => {
     highScore = numberOfBrokenClouds >= highScore ? numberOfBrokenClouds : highScore;
     localStorage.setItem("highScore", highScore)
}

  //clearInterval(timerId);
    //rAFId = cancelAnimationFrame(rAFId);
// const gm = document.getElementById('game-board');

// const ball = document.createElement('div');

// const ball1 = document.createElement('div');
// ball.style.border = '1px solid white'
// ball1.style.border = '1px solid white'


// const position = {
//     x: 50,
//     y: 0,
//     dx: 1,
//     dy: 1,
//     speed: 5,
//     move: true,
//     score: 0
// }

// const position1 = {
//     x1: 0,
//     y1: 0,
//     dx1: 1,
//     dy1: 1,
//     speed: 5,
//     move: true,
//     score: 0
// }



// gm.append(ball);
// ball.style.backgroundColor = 'red';
// ball.style.width = '50px';
// ball.style.height = '50px';
// ball.style.borderRadius = '50%';
// ball.style.position = 'absolute';


// gm.append(ball1);
// ball1.style.backgroundColor = 'green';
// ball1.style.width = '30px';
// ball1.style.height = '30px';
// ball1.style.borderRadius = '50%';
// ball1.style.position = 'absolute';

// let mover = requestAnimationFrame(animation);

// function gameHit(){
// position.score++;
// ball.style.backgroundColor = `#${Math.random().toString(16).slice(2,8)}`
// ball1.style.backgroundColor = `#${Math.random().toString(16).slice(2,8)}`
// adderScore();
// position.x = Math.floor(Math.random()*150);
// position.y = Math.floor(Math.random()*350);
// position.x1 = Math.floor(Math.random()*450);
// position.y1 = Math.floor(Math.random()*250);
// ball.style.left = `${position.x}px`;
//     ball.style.top = `${position.y}px`;
//     ball1.style.left = `${position.x1}px`;
//     ball1.style.top = `${position.y1}px`;
// }


// function animation() {
//     if (position.move) {
//         if (position.x > 720 || position.x < 0) {
//             position.dx *= -1;
//         }
//         if (position.y > 500 || position.y < 0) {
//             position.dy *= -1;
//         }
//         if (position1.x1 > 720 || position1.x1 < 0) {
//             position1.dx1 *= -1;
//         }
//         if (position1.y1 > 500 || position1.y1 < 0) {
//             position1.dy1 *= -1;
//         }
    
    
//     position.x += position.speed * position.dx;
//     position.y += position.speed * position.dy;
//     position1.x1 += position1.speed * position1.dx1;
//     position1.y1 += position1.speed * position1.dy1;
//     ball.style.left = `${position.x}px`;
//     ball.style.top = `${position.y}px`;
//     ball1.style.left = `${position1.x1}px`;
//     ball1.style.top = `${position1.y1}px`;
// }
//     mover = requestAnimationFrame(animation);
// }

//-----

//screen size
//const screenHeight = window.innerHeight;
//const screenWidth = window.innerWidth;