const crazyMan = document.getElementById("crazyMan");
let dirMoveBoy;

document.addEventListener("keydown", moveMan);

function moveMan(event){
     if(event.keyCode == 37) dirMoveBoy = "left";
     else if (event.keyCode == 39) dirMoveBoy = "right";
}


// var i=0;

// function dayLightChange(){
//     var light = document.getElementById("game");
//     var bgStyle = ["gameStart", "gameNight"]
//     light.style = bgStyle[i];
//     i=(i+1)%bgStyle.length;
// }

// setInterval(dayLightChange, 2000);
