// Listen for keyboard input
//movement
document.addEventListener('keydown', event => {
    // Move the player left when the left arrow key is pressed
    if (event.code === "ArrowLeft") {
      isMovement = true;
      isRightMovement = false;
    }
    // Move the player right when the right arrow key is pressed
    if (event.code === "ArrowRight") {
      isMovement = true;
      isRightMovement = true;
    }
  });
  document.addEventListener('keyup', function(event) {
    if (event.code === "ArrowLeft") {
      isMovement = false;
    }
    if (event.code === "ArrowRight") {
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