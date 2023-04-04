const playBoard = document.querySelector(".play-board");

let gameOver = false;

let arr = [];
let cloud = [][arr];
cloudLight = [[10, 10], [11, 10], [9, 11], [10, 11], [11, 11], [12, 11]];
cloudDark = [[10, 20], [11, 20], [9, 21], [10, 21], [11, 21], [12, 21]];

let crazyBoy = [27, 70];
let boyMove = [0, 0];
let bullet = [27, 71];
let bulletMove = [0, 0];



const draw = () => {
    if(gameOver) return handleGameOver();

    let htmlMarkup = `<div class ="crazyBoy" style="grid-area: ${crazyBoy[1]} / ${crazyBoy[0]}"></div>`
    crazyBoy[0] += boyMove[0];

    htmlMarkup += `<div class ="bullet" style="grid-area: ${bullet[1]} / ${bullet[0]}"></div>`
    bullet[1] += bulletMove[1];
    
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
    for (let i = 0; i < cloudLight.length; i++){
        cloudLight[i][0] +=1
    }

    if (cloudLight[0][0] > 55) {
        for (let i = 0; i < cloudLight.length; i++){
            cloudLight[i][1] +=4
            cloudLight[i][0] -=50
        }
    }

    if (cloudLight[0][1] > 15 && cloudLight[0][0] === 20) { //if cloud too low it start rain
        gameOver = true;
    }
    

    draw()
}


setInterval(moveCloud, 100);

const moveCrazyBoy = (e) => {
   if (e.key === "ArrowLeft" && crazyBoy[0] > 5){
    boyMove[0] = -1;
   } else if (e.key === "ArrowRight" && crazyBoy[0] < 30){
    boyMove[0] = 1;
   } 
   draw();
}

function shoot (e) {
    let sodiumBombsId
    if (e.key === 'ArrowUp') { 
        bulletMove[1] = -3;
    }
}


document.addEventListener('keydown', moveCrazyBoy)
document.addEventListener('keydown', shoot)

setIntervalId = setInterval(draw,125);

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