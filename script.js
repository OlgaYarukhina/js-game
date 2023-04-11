const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".highScore");

//let setIntervalId;
let gameOver = false;
let win = false;
let timer = 60;
let minutes, seconds;
minutes = Math.floor(timer / 60);
seconds = timer % 60;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;

let arr = [];
let cloud = [][arr];
let cloudNew = [[2, 1], [3, 1], [1, 2], [2, 2], [3, 2], [4, 2]]
let clouds = [[[2, 1], [3, 1], [1, 2], [2, 2], [3, 2], [4, 2]]]
let cloudsNumber = 10;

let crazyBoy = [29, 53];
let bulletNumber = 50;
let bulletStart = crazyBoy.slice();
let bullets = [bulletStart];
let bulletMove = [0, 0];
let lighting = [-1, -1]
let lightingMove = [0, 0];
let storm;

let isPlaying = false;
let rAFId;


const draw = () => {
    console.log(clouds.length);
    if (gameOver || timer === -1) return handleGameOver();
    if (win)  return handleWin();
    

    let htmlMarkup = `<div class ="platform">STOP!<br>Bullets: ${bulletNumber}</div>`;
    htmlMarkup += `<div class ="crazyBoy" style="grid-area: ${crazyBoy[1]} / ${crazyBoy[0]}"></div>`;

    for (let i = 0; i < clouds.length; i++) {
        
            for (let j = 0; j < clouds[i].length; j++) {
                if (clouds[i][j][1] < 10) {
                    htmlMarkup += `<div class ="cloudLight" style="grid-area: ${clouds[i][j][1]} / ${clouds[i][j][0]}"></div>`;
                } else if ((clouds[i][j][1] < 15)) {
                    htmlMarkup += `<div class ="cloudGrey" style="grid-area: ${clouds[i][j][1]} / ${clouds[i][j][0]}"></div>`;
                } else {
                    if (i === storm) {
                        htmlMarkup += `<div class ="storm" style="grid-area: ${clouds[i][j][1]} / ${clouds[i][j][0]}"></div>`;
                    } else {
                        htmlMarkup += `<div class ="cloudDark" style="grid-area: ${clouds[i][j][1]} / ${clouds[i][j][0]}"></div>`;
                    }
                }
            }
        
    }

  

    if (bullets.length > 1) {
        for (let k = 1; k < bullets.length; k++) {
            htmlMarkup += `<div class ="bullet" style="grid-area: ${bullets[k][1]} / ${bullets[k][0]}"></div>`;
            bullets[k][1] += bulletMove[1];
            if (bullets[k][1] === 15) {
                bullets.splice(k, 1)
                break
            }

            for (let i = 0; i < clouds.length; i++) {
                    for (let j = 0; j < clouds[i].length; j++) {
                        if (bullets[k][1] === clouds[i][j][1] && bullets[k][0] === clouds[i][j][0]) {
                            for (let k = 0; k < clouds[i].length; k++) {
                                htmlMarkup += `<div class ="cloudPurpul" style="grid-area: ${clouds[i][k][1]} / ${clouds[i][k][0]}"></div>`;
                                bullets.slice(k, 1)
                            }
                            clouds.splice(i, 1)
                            break;
                        }

                        if (bullets[k][1] === clouds[i][j][1] && bullets[k][0] === clouds[i][j][0] && i === storm) {
                            return handleGameOver();
                        }
                    }
            }
    }
    }

    htmlMarkup += `<div class ="timer">${minutes}:${seconds}</div>`;

    playBoard.innerHTML = htmlMarkup;
    rAFId = requestAnimationFrame(draw)
}


//draw();


const moveClouds = () => {
    for (let i = 0; i < clouds.length; i++) {
        
            for (let j = 0; j < clouds[i].length; j++) {
                clouds[i][j][0] += 1
                if (clouds[i][j][0] > 55) {
                    for (let k = 0; k < clouds[i].length; k++) {
                        clouds[i][k][1] += 4
                        clouds[i][k][0] -= 50
                    }
                }
            }
            if (clouds[i][0][0] > 48 && clouds[i][0][1] > 40) { //if cloud too low it start rain
                gameOver = true;
                break;
        }
          }
          if (clouds.length === 0) { //if cloud too low it start rain
            win = true;
    }
}

const createNewCloud = () => {
    if (cloudsNumber > 0) {
        clouds.push(cloudNew);
        cloudNew = [[2, 1], [3, 1], [1, 2], [2, 2], [3, 2], [4, 2]];
        cloudsNumber--;
    }
}

const thunderstormCloud = () => {
    storm = Math.floor(Math.random() * 10) + 1;
}

const timerCountDown = () => {
    timer--;
    minutes = Math.floor(timer / 60);
    seconds = timer % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
}

let timerId = setInterval(timerCountDown, 1000);
let newCloudId = setInterval(createNewCloud, 300);
setInterval(moveClouds, 50);  
let thunderstormId  = setInterval(thunderstormCloud, 600);

//setIntervalId = setInterval(draw, 10);



const moveCrazyBoy = (e) => {
    if (e.key === "ArrowLeft" && crazyBoy[0] > 5) {
        crazyBoy[0] -= 1;
        bulletStart[0] -= 1;
    } else if (e.key === "ArrowRight" && crazyBoy[0] < 50) {
        crazyBoy[0] += 1;
        bulletStart[0] += 1;
    }
}

const shoot = (e) => {
    if (e.key === 'ArrowUp' && bulletNumber > 0) {
        bulletMove[1] = -1;
        bulletNumber--;
        let shot = bulletStart.slice();
        bullets.push(shot);
    }
}


document.addEventListener('keydown', moveCrazyBoy);
document.addEventListener('keydown', shoot);





const onTapGo = () => {
    isPlaying = true;
    let startGame = document.getElementById("start")
    let game = document.querySelector(".game");
    startGame.style.display = "none";
    game.style.display = "block"
     rAFId = requestAnimationFrame(draw)
    
}

const onTapPause = () => {
    if (isPlaying) {
        isPlaying = false;
        clearInterval(timerId);
        clearInterval(newCloudId);
        rAFId = cancelAnimationFrame(rAFId);
        
    } else if (!isPlaying) {
        isPlaying = true;
        cancelAnimationFrame(rAFId);
        timerId = setInterval(timerCountDown, 1000);
        newCloudId = setInterval(createNewCloud, 300);
        rAFId = requestAnimationFrame(draw)
    }
}

const onTapRestart = () => {
        location.reload();
        isPlaying = true;
        rAFId = requestAnimationFrame(draw)
}


const handleGameOver = () => {
    // clearInterval(setIntervalId)
    let game = document.querySelector(".game");
    let gameOver = document.getElementById("gameOver")
    game.style.display = "none";
    gameOver.style.display = "block";
    //location.reload();
 }
 
 const handleWin = () => {
     //clearInterval(setIntervalId)
    let game = document.querySelector(".game");
    let win = document.getElementById("win")
    game.style.display = "none";
    win.style.display = "block";
    checkScore();
    
   
 }

 const checkScore = () => {
     score = timer;
     highScore = score >= highScore ? score : highScore;
     localStorage.setItem("highScore", highScore)
     scoreElement.innerText = `Score: ${score}`;
     highScoreElement.innerText = `High Score: ${highScore}`;
 }



// const crazyMan = document.getElementById("crazyMan");
// let dirMoveBoy;

// document.addEventListener("keydown", moveMan);

// function moveMan(event){
//      if(event.keyCode == 37) dirMoveBoy = "left";
//      else if (event.keyCode == 39) dirMoveBoy = "right";
// }


// var i=0;

// function dayLightChange(){
//     var light = document.getElementById("game");
//     var bgStyle = ["gameStart", "gameNight"]
//     light.style = bgStyle[i];
//     i=(i+1)%bgStyle.length;
// }

  //    htmlMarkup += `<div class ="cloud" style="grid-area: ${20} / ${20}; grid-column-start: span 4;
    //    grid-row-start: span 2;"></div>`;


    // const moveCloud = () => {
    //     for (let i = 0; i < cloudLight.length; i++) {
    //         cloudLight[i][0] += 1
    //     }
    
    //     if (cloudLight[0][0] > 55) {
    //         for (let i = 0; i < cloudLight.length; i++) {
    //             cloudLight[i][1] += 4
    //             cloudLight[i][0] -= 50
    //         }
    //     }
    
    //     if (cloudLight[0][1] > 40 && cloudLight[0][0] === 20) { //if cloud too low it start rain
    //         gameOver = true;
    //     }
    // }
// htmlMarkup += `<div class ="gameOver">Game over!</div>`;
// return handleGameOver();
  // for (let i = 0; i < cloudLight.length; i++) {
    //     htmlMarkup += `<div class ="cloudLight" style="grid-area: ${cloudLight[i][1]} / ${cloudLight[i][0]}"></div>`;
    // }

