//"pages"  html elements
const initMenu = document.getElementById("init-menu");
const gameBoard = document.getElementById("game-board");
const game = document.getElementById("game");
const scoreElement = document.getElementById("scoreWin");
const paus = document.getElementById("pause");
const highScoreElement = document.getElementById("highScore");

const gamesound = document.getElementById("game-sound");


let isPlaying = false;
let isGameEnded = false;
let pauseStart = 0;

let highScore = localStorage.getItem("highScore") || 0;


const pause = () => {
  if (isPlaying) {
    pauseStart = Date.now()
    isPlaying = false;
    paus.style.background = "#cf10bb";
  } else if (!isPlaying) {
    timeOnPause += Date.now() - pauseStart;
    paus.style.background = "#232c3c";
    isPlaying = true;
    requestAnimationFrame(gameLoop);
  }
}

const restart = () => {
      isPlaying = false;
      location.reload();
}



const play = () => {
  document.getElementById('game-sound').play();
  isPlaying = true;
  initMenu.style.display = "none";
  game.style.display = "block";
  setupBullets();
  activateSpawner();
  requestAnimationFrame(gameLoop);
}


const handleGameOver = () => {
  document.getElementById('lose-sound').play();
  isPlaying = false;
  let gameOver = document.getElementById("gameOver")
  game.style.display = "none";
  gameOver.style.display = "block";
  checkScore();
}


const handleWin = () => {
  isPlaying = false;
  let win = document.getElementById("win")
  game.style.display = "none";
  win.style.display = "block";
  scoreElement.innerText = `Score: ${numberOfBrokenClouds} + 100 clouds`;
  numberOfBrokenClouds = numberOfBrokenClouds + 100;
  checkScore();
}

const checkScore = () => {
     highScore = numberOfBrokenClouds >= highScore ? numberOfBrokenClouds : highScore;
     localStorage.setItem("highScore", highScore)
}
