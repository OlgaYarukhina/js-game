// Listen for keyboard input

let isRightPressed = false;
let isLeftPressed = false;

document.addEventListener('keydown', event => {
    // Move the player left when the left arrow key is pressed
    if (event.code === "ArrowLeft") {
      if (!isLeftPressed){
        playerSpeed += -1;
        isLeftPressed = true;
      }
      // isLeftPressed = true;
      // isMovement = true;
      // isRightMovement = false;
    }
    // Move the player right when the right arrow key is pressed
    if (event.code === "ArrowRight") {
      if(!isRightPressed){
        playerSpeed += 1;
        isRightPressed = true;
      }
      // isRightPressed = true;
      // isMovement = true;
      // isRightMovement = true;
    }
  });
  document.addEventListener('keyup', function(event) {
    if (event.code === "ArrowLeft") {
      playerSpeed += 1;
      isLeftPressed = false;
      // isMovement = false;
    }
    if (event.code === "ArrowRight") {
      playerSpeed -= 1;
      isRightPressed = false;
      // isMovement = false;
    }
  });
  // shooting !!! add reload (timeout for key pressing)
  let spaceKeyPressed = false;
  document.addEventListener('keydown', function(event) {
    if (event.key === 'w' || event.key === 'W' && !spaceKeyPressed) {
      spaceKeyPressed = true;
      shootBullet()
    }
  });
  document.addEventListener('keyup', function(event) {
    if (event.key === 'w' || event.key === 'W' ) {
      spaceKeyPressed = false;
    }
  });