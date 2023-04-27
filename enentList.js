// Listen for keyboard input

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