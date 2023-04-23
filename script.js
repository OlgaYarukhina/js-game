const gm = document.getElementById('game');

const ball = document.createElement('div');

const ball1 = document.createElement('div');
ball.style.border = '1px solid white'
ball1.style.border = '1px solid white'


const position = {
    x: 0,
    y: -100,
    dx: 1,
    dy: 1,
    speed: 5,
    move: true,
    score: 0
}

const position1 = {
    x1: 0,
    y1: 0,
    dx1: 1,
    dy1: 1,
    speed: 5,
    move: true,
    score: 0
}



gm.append(ball);
ball.style.backgroundColor = 'red';
ball.style.width = '50px';
ball.style.height = '50px';
ball.style.borderRadius = '50%';
ball.style.position = 'relative';
ball.style.display = 'flex'


gm.append(ball1);
ball1.style.backgroundColor = 'green';
ball1.style.width = '30px';
ball1.style.height = '30px';
ball1.style.borderRadius = '50%';
ball1.style.position = 'relative';
ball1.style.display = 'flex'



let mover = requestAnimationFrame(animation);




function gameHit(){
position.score++;
ball.style.backgroundColor = `#${Math.random().toString(16).slice(2,8)}`
ball1.style.backgroundColor = `#${Math.random().toString(16).slice(2,8)}`
adderScore();
position.x = Math.floor(Math.random()*150);
position.y = Math.floor(Math.random()*350);
position.x1 = Math.floor(Math.random()*450);
position.y1 = Math.floor(Math.random()*250);
ball.style.left = `${position.x}px`;
    ball.style.top = `${position.y}px`;
    ball1.style.left = `${position.x1}px`;
    ball1.style.top = `${position.y1}px`;
}


function animation() {
    if (position.move) {
        if (position.x > 720 || position.x < 0) {
            position.dx *= -1;
        }
        if (position.y > 280 || position.y < -200) {
            position.dy *= -1;
        }
        if (position1.x1 > 720 || position1.x1 < 0) {
            position1.dx1 *= -1;
        }
        if (position1.y1 > 290 || position1.y1 < 0) {
            position1.dy1 *= -1;
        }
    
    
    position.x += position.speed * position.dx;
    position.y += position.speed * position.dy;
    position1.x1 += position1.speed * position1.dx1;
    position1.y1 += position1.speed * position1.dy1;
    ball.style.left = `${position.x}px`;
    ball.style.top = `${position.y}px`;
    ball1.style.left = `${position1.x1}px`;
    ball1.style.top = `${position1.y1}px`;
}
    mover = requestAnimationFrame(animation);
}
