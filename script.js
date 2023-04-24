const gm = document.getElementById('game-board');

const ball = document.createElement('div');

const ball1 = document.createElement('div');
ball.style.border = '1px solid white'
ball1.style.border = '1px solid white'


const position = {
    x: 50,
    y: 0,
    dx: 1,
    dy: 1,
    speed: 5,
    move: true,
    score: 0
}

const position1 = {
    x1: 0,
    y1: 0,
    dx1: 1,
    dy1: 1,
    speed: 5,
    move: true,
    score: 0
}



gm.append(ball);
ball.style.backgroundColor = 'red';
ball.style.width = '50px';
ball.style.height = '50px';
ball.style.borderRadius = '50%';
ball.style.position = 'absolute';


gm.append(ball1);
ball1.style.backgroundColor = 'green';
ball1.style.width = '30px';
ball1.style.height = '30px';
ball1.style.borderRadius = '50%';
ball1.style.position = 'absolute';

let mover = requestAnimationFrame(animation);

function gameHit(){
position.score++;
ball.style.backgroundColor = `#${Math.random().toString(16).slice(2,8)}`
ball1.style.backgroundColor = `#${Math.random().toString(16).slice(2,8)}`
adderScore();
position.x = Math.floor(Math.random()*150);
position.y = Math.floor(Math.random()*350);
position.x1 = Math.floor(Math.random()*450);
position.y1 = Math.floor(Math.random()*250);
ball.style.left = `${position.x}px`;
    ball.style.top = `${position.y}px`;
    ball1.style.left = `${position.x1}px`;
    ball1.style.top = `${position.y1}px`;
}


function animation() {
    if (position.move) {
        if (position.x > 720 || position.x < 0) {
            position.dx *= -1;
        }
        if (position.y > 500 || position.y < 0) {
            position.dy *= -1;
        }
        if (position1.x1 > 720 || position1.x1 < 0) {
            position1.dx1 *= -1;
        }
        if (position1.y1 > 500 || position1.y1 < 0) {
            position1.dy1 *= -1;
        }
    
    
    position.x += position.speed * position.dx;
    position.y += position.speed * position.dy;
    position1.x1 += position1.speed * position1.dx1;
    position1.y1 += position1.speed * position1.dy1;
    ball.style.left = `${position.x}px`;
    ball.style.top = `${position.y}px`;
    ball1.style.left = `${position1.x1}px`;
    ball1.style.top = `${position1.y1}px`;
}
    mover = requestAnimationFrame(animation);
}

//-----

//"pages"  html elements
const initMenu = document.getElementById("init-menu");
const gameBoard = document.getElementById("game-board");
const game = document.getElementById("game");
const pauseMenu = document.getElementById("pause-menu");
const gameOverMenu = document.getElementById("game-over-menu");

//game settings
let isGameEnded = false;
let isGamePaused = false;

//screen size
const screenHeight = window.innerHeight;
const screenWidth = window.innerWidth;

//player
const player = document.getElementById('player');
const playerSpeed = 1;

let playerX = 50;
let currentScore = 0;
let live = 3;
let maxScore = 0;

let isMovement = false;
let isRightMovement = false;

//bullets
const bulletDistance = 15;
const bulletSpeed = 2;
let bullets = []
class Bullet {
  constructor(html, y) {
    this.html = html;
    this.y = y;
  }
}

//clouds
const cloudSpeed = 1;
const cloudDownShift = 5;
const min = 5000;
const max = 10000;
let clouds = []
class Cloud {
  constructor(html, x, y) {
    this.html = html;
    this.x = x;
    this.y = y;
    this.interval = Math.floor(Math.random() * (max - min + 1)) + min;
    this.isRightDirection = true;
    this.state = ColorState.NORMAL;

    // set up timer to change cloud state
    this.timer = setInterval(() => {
      if (this.state === ColorState.NORMAL) {
        this.state = ColorState.DARK;
      } else if (this.state === ColorState.DARK) {
        this.state = ColorState.STORM;
      } else {
        // do some action for storm state
        console.log("Storm state - do some action");
        
        // change back to normal state after action is done
        this.state = ColorState.NORMAL;
      }
      
      // update cloud color based on state
      this.html.style.backgroundColor = this.state;
    }, this.interval); 
  }
}
const ColorState = {
  NORMAL: 'gray',
  DARK: 'green',
  STORM: 'blue'
};

// Listen for keyboard input
//movement
document.addEventListener('keydown', event => {
  // Move the player left when the left arrow key is pressed
  if (event.keyCode === 37) {
    isMovement = true;
    isRightMovement = false;
  }
  // Move the player right when the right arrow key is pressed
  if (event.keyCode === 39) {
    isMovement = true;
    isRightMovement = true;
  }
});
document.addEventListener('keyup', function(event) {
  if (event.keyCode === 37) {
    isMovement = false;
  }
  if (event.keyCode === 39) {
    isMovement = false;
  }
});
// shooting !!! add reload (timeout for key pressing)
let spaceKeyPressed = false;
document.addEventListener('keydown', function(event) {
  if (event.code === 'Space' && !spaceKeyPressed) {
    spaceKeyPressed = true;
    console.log("shoot")
    shootBullet()
  }
});
document.addEventListener('keyup', function(event) {
  if (event.code === 'Space') {
    spaceKeyPressed = false;
  }
});

function shootBullet(){
  const bullet = document.createElement('div');
  bullet.style.position = 'absolute';
  bullet.style.top = '100%';
  bullet.style.left = `${playerX}%`;
  bullet.style.backgroundColor = 'aqua';
  bullet.innerText = "OO";
  bulletObj = new Bullet(bullet, 100)
  bullets.push(bulletObj);
  console.log(bullets)
  gameBoard.appendChild(bullet);
}

// Define the game loop
function gameLoop() {
  // Update the player's position
  if (isMovement){
    if (isRightMovement){
      if (playerX + playerSpeed < 95){
        playerX += playerSpeed;
      }
    } else {
      if ( playerX - playerSpeed > 0){
        playerX -= playerSpeed;
      }
    }
  }
  player.style.left = `${playerX}%`;

  // Update clouds
  clouds.forEach((cloud, index) => {
    if (cloud.isRightDirection){
      if (cloud.x + cloudSpeed < 95){
        cloud.x += cloudSpeed;
        cloud.html.style.left = `${cloud.x}%`;
      } else {
        cloud.isRightDirection = false;
        cloud.x -= cloudSpeed;
        cloud.html.style.left = `${cloud.x}%`;
        cloud.y += cloudDownShift;
        cloud.html.style.top = `${cloud.y}%`;
      }    
    } else {
      if (cloud.x - cloudSpeed > 0){
        cloud.x -= cloudSpeed;
        cloud.html.style.left = `${cloud.x}%`;
      } else {
        cloud.isRightDirection = true;
        cloud.x += cloudSpeed;
        cloud.html.style.left = `${cloud.x}%`;
        cloud.y += cloudDownShift;
        cloud.html.style.top = `${cloud.y}%`;
      }
    }
    if (cloud.y > 100-cloudDownShift*3){
      live--;
      console.log(live);
      if (live <= 0){
        //game over
      }
      clouds.splice(index, 1); // remove bullet from the array
      cloud.html.remove(); // remove bullet's HTML element from the game board  
   
    }
  })

  // Update bullets
  bullets.forEach((bullet, index) => {
    bullet.y -= bulletSpeed
    if (bullet.y < bulletDistance) {
      bullets.splice(index, 1); // remove bullet from the array
      bullet.html.remove(); // remove bullet's HTML element from the game board  
    }
    bullet.html.style.top = `${bullet.y}%`;
  });

  // React on collisions 
  
  // Request the next frame of the game loop
  requestAnimationFrame(gameLoop);
}

let spawnSpeed = 3000;
let gameStartTime = 0;

function updateSpawnSpeed() {
  const gameDuration = Date.now() - gameStartTime;
  console.log(gameDuration)
  if (gameDuration > 30000) { // increase spawn speed after 30 seconds
    spawnSpeed = 1000;
  } else if (gameDuration > 60000) { // increase spawn speed after 1 minute
    spawnSpeed = 500;
  } else if (gameDuration > 120000) { // increase spawn speed after 2 minute
    spawnSpeed = 50;
  } 
}

function spawnCloud() {
  const cloud = document.createElement('div');
  let x = Math.floor(Math.random() * 90)
  cloud.style.position = 'absolute';
  cloud.style.top = '0%';
  cloud.style.left = `${x}%`;
  cloud.style.backgroundColor = 'aqua';
  cloud.innerText = "OO";
  cloudObj = new Cloud(cloud, x, 0)
  clouds.push(cloudObj);
  console.log(clouds)
  gameBoard.appendChild(cloud);
  
  // Schedule the next cloud spawn
  updateSpawnSpeed()
  const nextSpawnTime = Date.now() + spawnSpeed;
  if(!isGameEnded){
    setTimeout(spawnCloud, nextSpawnTime - Date.now());
  }
}

function activateSpawner() {
  gameStartTime = Date.now();
  spawnCloud();
}


function activateGameUI(){
  initMenu.style.display = "none";
  game.style.display = "block";
  //body.classList = '';
  //
  console.log("bullet init height - fixed")
  console.log(screenHeight-screenHeight*0.07-30)
}

function play(){
  activateGameUI();
  activateSpawner();
  requestAnimationFrame(gameLoop);
}

