const playBoard = document.querySelector(".play-board");

let gameOver = false;

let arr = [];
let cloud = [][arr];
let cloudNew = [[2, 1], [3, 1], [1, 2], [2, 2], [3, 2], [4, 2]]
let cloudLight = [[10, 10], [11, 10], [9, 11], [10, 11], [11, 11], [12, 11]];
let cloudDark = [[10, 20], [11, 20], [9, 21], [10, 21], [11, 21], [12, 21]];

let clouds = [[[7, 1], [8, 1], [6, 2], [7, 2], [8, 2], [9, 2]], [[12, 1], [13, 1], [11, 2], [12, 2], [13, 2], [14, 2]]]
let cloudsNumber = 10;

let crazyBoy = [29, 55];
let bulletNumber = 10;
let bulletStart = crazyBoy.slice();
let bullets = [bulletStart];
let bulletMove = [0, 0];



const draw = () => {
    if (gameOver) return handleGameOver();

    let htmlMarkup = `<div class ="platform" >STOP!</div>`;


    if (bullets.length > 1) {
        for (let i = 1; i < bullets.length; i++) {
            console.log[i]
            htmlMarkup += `<div class ="bullet" style="grid-area: ${bullets[i][1]} / ${bullets[i][0]}"></div>`;
            bullets[i][1] += bulletMove[1];
            if (bullets[i][1] === 0) {
                bullets.length--;
                delete bullets[i];
                break
            }
        }
    }



    htmlMarkup += `<div class ="crazyBoy" style="grid-area: ${crazyBoy[1]} / ${crazyBoy[0]}"></div>`;

    for (let i = 0; i < clouds.length; i++) {
        for (let j = 0; j < clouds[i].length; j++) {
            htmlMarkup += `<div class ="cloudLight" style="grid-area: ${clouds[i][j][1]} / ${clouds[i][j][0]}"></div>`;
        }
    }

    for (let i = 0; i < cloudLight.length; i++) {
        htmlMarkup += `<div class ="cloudLight" style="grid-area: ${cloudLight[i][1]} / ${cloudLight[i][0]}"></div>`;
    }
    for (let i = 0; i < cloudDark.length; i++) {
        htmlMarkup += `<div class ="cloudDark" style="grid-area: ${cloudDark[i][1]} / ${cloudDark[i][0]}"></div>`;
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

    if (cloudLight[0][1] > 15 && cloudLight[0][0] === 20) { //if cloud too low it start rain
        gameOver = true;
    }
}


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
    }
}

const createNewCloud = () => {
    if (cloudsNumber > 0) {
    clouds.push(cloudNew);
    cloudNew = [[2, 1], [3, 1], [1, 2], [2, 2], [3, 2], [4, 2]];
    cloudsNumber--;
    }
}


setInterval(moveCloud, 100);
setInterval(moveClouds, 100);
setInterval(createNewCloud, 500);



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


document.addEventListener('keydown', moveCrazyBoy)
document.addEventListener('keydown', shoot)

//setInterval(moveCloud, 100);

setIntervalId = setInterval(draw, 15);

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