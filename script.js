var skyColor = document.getElementById("game");
dayLightChange()

var i=0;

function dayLightChange(){
    
    var bgStyle = ["gameStart", "gameNight"]
    skyColor.style = bgStyle[i];
    i=(i+1)%bgStyle.length;
}

setInterval(dayLightChange, 2000);
