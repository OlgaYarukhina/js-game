const timeLabel = document.getElementById("timer");
const player = document.getElementById('player');
const playerSpeed = 1;

let playerX = 50;
let currentScore = 0;
let live = 3;
let hightScore = 0;

let isMovement = false;
let isRightMovement = false;

const bulletDistance = 15;
const bulletSpeed = 2;
let bullets = []
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

const cloudSpeed = 1;
const cloudDownShift = 5;
let numberOfBrokenClouds = 0;
const min = 5000;
const max = 10000;
let clouds = []
const ColorState = {
  NORMAL: 'gray',
  DARK: 'green',
  STORM: 'blue'
};
class Cloud {
  constructor(html, x, y) {
    this.html = html;
    this.x = x;
    this.y = y;
    this.interval = Math.floor(Math.random() * (max - min + 1)) + min;
    this.isRightDirection = true;
    this.state = ColorState.NORMAL; 
  }

  update(cloud, index){
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
    if (cloud.y > 60){
      this.state = ColorState.STORM
      this.html.style.backgroundColor = this.state;
      //logic
    } else if (cloud.y > 30){
      this.state = ColorState.DARK
      this.html.style.backgroundColor = this.state;
    } 
    if (cloud.y > 100-cloudDownShift*5){
      live--;
      console.log(live);
      if (live === 0){
        handleGameOver()
      }
      clouds.splice(index, 1); // remove cloud from the array
      cloud.html.remove(); // remove cloud's HTML element from the game board  
    
    }
  }
}

function shootBullet(){
  if(isPlaying){
    const bullet = document.createElement('div');
    bullet.style.position = 'absolute';
    bullet.style.top = '100%';
    bullet.style.left = `${playerX}%`;
    bullet.style.backgroundColor = 'aqua';
    bullet.innerText = "OO";
    let bulletObj = new Bullet(bullet, 100)
    bullets.push(bulletObj);
    console.log(bullets)
    gameBoard.appendChild(bullet);
  }
}


// Define the game loop
function gameLoop() {
  timerValue = Date.now() - gameStartTime - timeOnPause;
  timeLabel.innerHTML = `${60000-timerValue}`
  console.log(timerValue)

  if (60000-timerValue === 0){
    handleWin() 
  }
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
  if(isPlaying){
    requestAnimationFrame(gameLoop);
  }
}

let spawnSpeed = 3000;
let gameStartTime = 0;
let timeOnPause = 0;
let timerValue = 0;

function updateSpawnSpeed() {
  console.log(timerValue)
  if (timerValue > 30000) { // increase spawn speed after 30 seconds
    spawnSpeed = 1000;
  } else if (timerValue > 60000) { // increase spawn speed after 1 minute
    spawnSpeed = 500;
  } else if (timerValue > 120000) { // increase spawn speed after 2 minute
    spawnSpeed = 50;
  } 
}

function spawnCloud() {
  if(isPlaying){
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
  }
  const nextSpawnTime = Date.now() + spawnSpeed;
  if(!isGameEnded){
    setTimeout(spawnCloud, nextSpawnTime - Date.now());
  }
}
  
function activateSpawner() {
  gameStartTime = Date.now();
  spawnCloud();
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


  


    // set up timerValue to change cloud state
    // this.timerValue = setInterval(() => {
    //   if (this.state === ColorState.NORMAL && isPlaying) {
    //     this.state = ColorState.DARK;
    //   } else if (this.state === ColorState.DARK && isPlaying) {
    //     this.state = ColorState.STORM;
    //   } else if (isPlaying) {
    //     // do some action for storm state
    //     console.log("Storm state - do some action");
        
    //     // change back to normal state after action is done
    //     this.state = ColorState.NORMAL;
    //   }
      
    //   // update cloud color based on state
    //   this.html.style.backgroundColor = this.state;
    // }, this.interval);