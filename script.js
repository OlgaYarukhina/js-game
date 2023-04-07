const playBoard = document.querySelector(".play-board");
let setIntervalId;
let gameOver = false;

let arr = [];
let cloud = [][arr];
let cloudNew = [[2, 1], [3, 1], [1, 2], [2, 2], [3, 2], [4, 2]]
let cloudLight = [[10, 10], [11, 10], [9, 11], [10, 11], [11, 11], [12, 11]];

let clouds = [[2, 1], [3, 1], [1, 2], [2, 2], [3, 2], [4, 2]]
let cloudsNumber = 10;

let crazyBoy = [29, 55];
let bulletNumber = 10;
let bulletStart = crazyBoy.slice();
let bullets = [bulletStart];
let bulletMove = [0, 0];
let storm;



const draw = () => {
    if (gameOver) return handleGameOver();

    let htmlMarkup = `<div class ="platform" >STOP!</div>`;

    htmlMarkup += `<div class ="crazyBoy" style="grid-area: ${crazyBoy[1]} / ${crazyBoy[0]}"></div>`;

    for (let i = 0; i < clouds.length; i++) {
        if (clouds[i] !== undefined){
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
    }

    for (let i = 0; i < cloudLight.length; i++) {
        htmlMarkup += `<div class ="cloudLight" style="grid-area: ${cloudLight[i][1]} / ${cloudLight[i][0]}"></div>`;
    }
  

    if (bullets.length > 1) {
        for (let k = 1; k < bullets.length; k++) {
            htmlMarkup += `<div class ="bullet" style="grid-area: ${bullets[k][1]} / ${bullets[k][0]}"></div>`;
            bullets[k][1] += bulletMove[1];
            if (bullets[k][1] === 15) {
                bullets.length--;
                bullets.slice(k, 1)
                break
            }

            for (let i = 0; i < clouds.length; i++) {
                if (clouds[i] !== undefined){
                for (let j = 0; j < clouds[i].length; j++) {
                    
                    if (bullets[k][1] === clouds[i][j][1] && bullets[k][0] === clouds[i][j][0]) {
                        for (let k = 0; k < clouds[i].length; k++) {
                            htmlMarkup += `<div class ="cloudPurpul" style="grid-area: ${clouds[i][k][1]} / ${clouds[i][k][0]}"></div>`;
                        }
                        //clouds.slice(i, 1)
                        // clouds.length--;
                        delete clouds[i]
                        break;
                    }
                }
            }
        }
        }
    }

    playBoard.innerHTML = htmlMarkup;
}


draw();


const moveCloud = () => {
    for (let i = 0; i < cloudLight.length; i++) {
        cloudLight[i][0] += 1
    }

    if (cloudLight[0][0] > 55) {
        for (let i = 0; i < cloudLight.length; i++) {
            cloudLight[i][1] += 4
            cloudLight[i][0] -= 50
        }
    }

    if (cloudLight[0][1] > 40 && cloudLight[0][0] === 20) { //if cloud too low it start rain
        gameOver = true;
    }
}


const moveClouds = () => {
    for (let i = 0; i < clouds.length; i++) {
        if (clouds[i] !== undefined){
        for (let j = 0; j < clouds[i].length; j++) {
            clouds[i][j][0] += 1
            if (clouds[i][j][0] > 55) {
                for (let k = 0; k < clouds[i].length; k++) {
                    clouds[i][k][1] += 4
                    clouds[i][k][0] -= 50
                }
            }
        }
    }
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
storm = Math.floor(Math.random()*10)+1;
}


setInterval(moveCloud, 80);
setInterval(moveClouds, 80);
setInterval(thunderstormCloud, 400);
setInterval(createNewCloud, 400);
setIntervalId = setInterval(draw, 10);



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



const handleGameOver = () => {
    clearInterval(setIntervalId)
    alert("Game over!")
    location.reload();
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

// setInterval(dayLightChange, 2000);
//<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/js/bootstrap.bundle.min.js" defer></script>

  //    htmlMarkup += `<div class ="cloud" style="grid-area: ${20} / ${20}; grid-column-start: span 4;
    //    grid-row-start: span 2;"></div>`;