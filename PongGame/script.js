
const ymin = 0;
const ymax = 470;
const xmin = 0;
const xmax = 470;

const intervalTime = 30;

var position = { x: 0, y: 0 };
var velocity = { x: 5, y: 5 };
var leftBar = document.getElementById('player-one-bar');
var rightBar = document.getElementById('player-two-bar');

var BarPosition = { left: 300, right: 300}
const barSpeed = 20;

var playerOneScore = 0;
var playerTwoScore = 0; 
document.getElementById("player-one-score").innerHTML = playerOneScore;
document.getElementById("player-two-score").innerHTML = playerTwoScore;
var ballReset = false; 

function process() {

  const pongball = document.querySelector(".ball");
  //change the + 1 to depending on the moving velocity direction.
  // this takes care of the top edge
  if (position.y + velocity.y >= ymax) {
    //before the hitting the edge
    const tempYVelocity = ymax - position.y;
    const tempXVelocity = (velocity.x * Math.abs(tempYVelocity/velocity.y)) ;

    moveBall(tempXVelocity,tempYVelocity ); 
    setPosition();
    velocity.y = -velocity.y;

  }
  // this take care of the bottom edge
  else if (position.y + velocity.y <= ymin) {

    const tempYVelocity = position.y - ymin;
    const tempXVelocity = (velocity.x * Math.abs(tempYVelocity/velocity.y)) ;

    moveBall(tempXVelocity, tempYVelocity); 
    setPosition();
    velocity.y = -velocity.y;

  }
  // if x position and 
  else if (position.x + velocity.x >= xmax) {

    // this is the right bar 
    // if it's between the position of the barposition.right + 200px
    // if x position is between 
    const projectedPosition = position.y + velocity.y;

    if ( projectedPosition >= BarPosition.right && projectedPosition <= BarPosition.right + 200){
        //bounce back else phasethrough
        const tempXVelocity = xmax - position.x;
        const tempYVelocity = (velocity.y * Math.abs(tempXVelocity/velocity.x));
    
        moveBall(tempXVelocity,tempYVelocity ); 
        setPosition();
        velocity.x = -velocity.x;
    }
    else {

        // update score 
        clearInterval(timer);
        // change ball position 
        playerOneScore += 1;
        document.getElementById("player-one-score").innerHTML = playerOneScore;
        // set ball position to the middle 
        position.y = 228;
        position.x = 228;
        setPosition();
        ballReset = true;
    }

  }
  else if (position.x + velocity.x <= xmin) {

    // fix the below to account for left side instead of right. 
    const projectedPosition = position.y + velocity.y;

    if ( projectedPosition >= BarPosition.left && projectedPosition <= BarPosition.left + 200){
        //bounce back else phasethrough
        const tempXVelocity = position.x - xmin;
        const tempYVelocity = (velocity.y * Math.abs(tempXVelocity/velocity.x));
    
        moveBall(tempXVelocity,tempYVelocity ); 
        setPosition();
        velocity.x = -velocity.x;
    }
    else {
        clearInterval(timer);
        // change ball position 
        playerTwoScore += 1;
        document.getElementById("player-two-score").innerHTML = playerTwoScore;
        //reset the ball 
        position.y = 228;
        position.x = 228;
        setPosition();
        ballReset = true;

    }
  }
  else {
    moveBall(velocity.x,velocity.y); 
    setPosition();
  }
}

function moveBall(tempXVelocity, tempYVelocity){

    // had to add the random angle or else it's gonna be constant velocity and trajectory 
    // The randomness creates the necessity of human input, to spice things up. 
    const randomAngle = (Math.random() - 10) * 0.2;
    position.y += tempYVelocity + randomAngle;
    position.x += tempXVelocity;
    
}

function setPosition() {
  const pongball = document.querySelector(".ball");
  pongball.style.bottom = position.y.toString() + "px";
  pongball.style.left = position.x.toString() + "px";
}


// barposition plus 200 because it's 200 long
function handleInput(e) {

    if (e.keyCode === 83) {
        BarPosition.left = BarPosition.left - barSpeed < 0 ? 0 : BarPosition.left - barSpeed;
        leftBar.style.bottom = BarPosition.left.toString() + 'px';
    }
    if (e.keyCode === 87) {
        BarPosition.left = BarPosition.left + barSpeed > 300 ? 300 : BarPosition.left + barSpeed;
        leftBar.style.bottom = BarPosition.left.toString() + 'px';
    }
    if (e.keyCode === 40) {
        BarPosition.right = BarPosition.right - barSpeed < 0 ? 0 : BarPosition.right - barSpeed;
        rightBar.style.bottom = BarPosition.right.toString() + 'px';
    }
    if (e.keyCode === 38) {
        BarPosition.right = BarPosition.right + barSpeed > 300 ? 300 : BarPosition.right + barSpeed;
        rightBar.style.bottom = BarPosition.right.toString() + 'px';
    }
    if (e.keyCode === 32 && ballReset ) {
        ballReset = false;
        timer = setInterval(process, intervalTime);
    }

}

// listen for space is pressed
// if ball is reset then start the ball
// if not do nothing 

document.addEventListener('keydown', handleInput);

var timer = setInterval(process, intervalTime);