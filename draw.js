const timeLabel = document.getElementById("timer");
const lifesLabel = document.getElementById("lifes");
const highScoreLabel = document.getElementById("highScore");
const player = document.getElementById('player');

let spawnSpeed = 1000;
let gameStartTime = 0;
let timeOnPause = 0;
let timerValue = 0;

let bulletSetAmount = 10;
let bulletSetAmountCurrent = 10;

const playerSpeed = 1;
let playerX = 50;
let currentScore = 0;
let live = 3;
let bulletsAmount = 100;

let isMovement = false;
let isRightMovement = false;

const lightningSpeed = 1;
let lightnings = [];
class Lightning{
  constructor(html, x, y) {
    this.html = html;
    this.x = x;
    this.y = y;
    this.isRightDiagonal = Math.random() > 0.5;
  }

  update(lightning, index){
    lightning.y += lightningSpeed
    if (this.isRightDiagonal){
      lightning.x += lightningSpeed
    } else {
      lightning.x -= lightningSpeed
    }
    if (lightning.y > 95 || lightning.x < 5 || lightning.x > 95) {
      lightnings.splice(index, 1); // remove bullet from the array
      lightning.html.remove(); // remove bullet's HTML element from the game board  
    }
    lightning.html.style.top = `${lightning.y}%`;
    lightning.html.style.left = `${lightning.x}%`;
  }
}

const bulletDistance = 15;
const bulletSpeed = 2;
let bullets = [];
class Bullet {
  constructor(html, y) {
    this.html = html;
    this.y = y;
  }

  update(bullet, index){
    bullet.y -= bulletSpeed
    if (bullet.y < bulletDistance) {
      bullets.splice(index, 1); // remove bullet from the array
      bullet.html.remove(); // remove bullet's HTML element from the game board  
    }
    bullet.html.style.top = `${bullet.y}%`;
  }
}

const cloudSpeed = 0.75;
const cloudDownShift = 5;
let numberOfBrokenClouds = 0;
const min = 5000;
const max = 10000;
let clouds = [];

class Cloud {
  constructor(html, x, y) {
    this.html = html;
    this.x = x;
    this.y = y;
    this.interval = Math.floor(Math.random() * (max - min + 1)) + min;
    this.isRightDirection = true;
    this.className = 'cloudLight';
    this.isLightened = false;
  }

  update(cloud, index){
    if (cloud.isRightDirection){
      if (cloud.x + cloudSpeed < 95){
        cloud.x += cloudSpeed;
        cloud.html.style.left = `${cloud.x}%`;
      } else {
        cloud.x = 0;
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
    if (cloud.y > 30){
      this.html.classList.remove('cloudDark');
      this.html.classList.add('cloudStorm');

      if(!this.isLightened){
        this.isLightened = true
        setTimeout(
          function() {
            shootLightning(cloud)
          }, Math.random()*4000);
      }
    } else if (cloud.y > 15){
      this.html.classList.remove('cloudLight');
      this.html.classList.add('cloudDark');
    } 
    if (cloud.y > 100-cloudDownShift*7){
      live--;
      if (live === 0) handleGameOver();
      clouds.splice(index, 1); // remove cloud from the array
      cloud.html.remove(); // remove cloud's HTML element from the game board  
     life.style.display = "block";
      setTimeout(() => {
        life.style.display = "none";
      }, 600)
    }
  }
}

function shootLightning(cloud){
  const lightning = document.createElement('div');
  lightning.className = 'lightning';
  lightning.style.top = `${cloud.y}%`;
  lightning.style.left = `${cloud.x}%`;
  var lightningObj = new Lightning(lightning, cloud.x, cloud.y)
  lightnings.push(lightningObj);
  gameBoard.appendChild(lightning);
}

function shootBullet(){
  if(isPlaying){
    if (bulletsAmount > 0){
      bulletsAmount--;
      const bullet = document.createElement('div');
      let bulletObj = new Bullet(bullet, 100);
      bullet.className = 'bullet'
      bullet.style.top = '95%';
      bullet.style.left = `${playerX}%`;
      bullets.push(bulletObj);
      gameBoard.appendChild(bullet);
      if(Math.ceil(bulletsAmount/bulletSetAmount)===bulletSetAmountCurrent-1){
        document.getElementById(`bulletSet${bulletSetAmountCurrent}`).style.display = "none";
        bulletSetAmountCurrent--;
      }
    }
  }
}

// Define the game loop
function gameLoop() {
  highScoreLabel.innerHTML = `High score: ${highScore}`;
  lifesLabel.innerHTML = `Lifes: ${live}`;
  timerValue = Date.now() - gameStartTime - timeOnPause;
  let time = 90000-timerValue;
  let minutes = Math.floor(time / 60000);
  let seconds = (Math.floor(time/1000)) % 60;
  minutes = 0 ? "00" : minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  timeLabel.innerHTML = `${minutes} : ${seconds}`;

  if (time < 0) handleWin(); 
  
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
    cloud.update(cloud, index)
  })

  // Update bullets
  bullets.forEach((bullet, index) => {
    bullet.update(bullet, index)
  });

  // Update lightnings
  lightnings.forEach((lightning, index) => {
    lightning.update(lightning, index)
    if(isColliding(player, lightning.html)){
      lightnings.splice(index, 1);
      lightning.html.remove(); 
      live--;
      if (live <= 0) handleGameOver();
      life.style.display = "block";
      setTimeout(() => {
        life.style.display = "none";
      }, 600)
    }
  });

  // React on collisions 
  bullets.forEach((bullet, bi) =>{
    clouds.forEach((cloud, ci) =>{
      if (isColliding(bullet.html, cloud.html)) {
        clouds.splice(ci, 1); // remove cloud from the array
        cloud.html.remove(); // remove cloud's HTML element from the game board
        bullets.splice(bi, 1); // remove bullet from the array
        bullet.html.remove(); // remove bullet's HTML element from the game board   
        numberOfBrokenClouds++;
      }
    });
  });
  
  // Request the next frame of the game loop
  if (isPlaying) requestAnimationFrame(gameLoop);
}

function updateSpawnSpeed() {
  console.log(timerValue)
  if (timerValue > 30000) { // increase spawn speed after 30 seconds
    spawnSpeed = 500;
  } else if (timerValue > 60000) { // increase spawn speed after 1 minute
    spawnSpeed = 200;
  } else if (timerValue > 120000) { // increase spawn speed after 2 minute
    spawnSpeed = 50;
  } 
}

function spawnCloud() {
  if(isPlaying){
    const cloud = document.createElement('div');
    let x = Math.floor(Math.random() * 90)
    cloud.className = 'cloudLight';
    cloudObj = new Cloud(cloud, x, 0)
    clouds.push(cloudObj);
    gameBoard.appendChild(cloud);
    // Schedule the next cloud spawn
    updateSpawnSpeed()
  }

  const nextSpawnTime = Date.now() + spawnSpeed;
  if (!isGameEnded) setTimeout(spawnCloud, nextSpawnTime - Date.now());
}
  
function activateSpawner() {
  gameStartTime = Date.now();
  spawnCloud();
}

function setupBullets(){
  const bulletSets = document.createElement('div');
  bulletSets.className = 'bulletSets';
  for(i=1; i<bulletSetAmount+1; i++){
    const bulletSet = document.createElement('div');
    bulletSet.className = 'bulletSet';
    bulletSet.id = `bulletSet${i}`;
    bulletSets.appendChild(bulletSet)
  }
  gameBoard.appendChild(bulletSets)
}

// Define a function to check for collision between two div elements
function isColliding(el1, el2) {
  // Get the bounding boxes of the elements
  const rect1 = el1.getBoundingClientRect();
  const rect2 = el2.getBoundingClientRect();

  // Check for overlap between the bounding boxes
  return !(rect1.right < rect2.left || 
           rect1.left > rect2.right || 
           rect1.bottom < rect2.top || 
           rect1.top > rect2.bottom);
}