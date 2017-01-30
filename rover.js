
var myRover = {
  position: [5,5],
  direction: 'N',
  rotation: 0
};

//Geting elements from html
var fButton = document.getElementById("forward");
var bButton = document.getElementById("backward");
var lButton = document.getElementById("left");
var rButton = document.getElementById("right");
var positionText = document.getElementById("position");
var directionText = document.getElementById("direction");
var warningText = document.getElementById("warning");

//Events
fButton.addEventListener("click",moveRover);
bButton.addEventListener("click",moveRover);
lButton.addEventListener("click",moveRover);
rButton.addEventListener("click",moveRover);
document.addEventListener("keyup",moveRover);
function updateText(rover){
  positionText.innerHTML = "Position : [" + rover.position + "]";
  directionText.innerHTML = "Direction : " + rover.direction;

}
function warning(str){
  warningText.innerHTML = str;
}

//Rover Controls
function moveRover(e){
  warningText.innerHTML = "";
  var keyCode = e.keyCode;
  if(keyCode){ //KEYBOARD CONTROL
    switch (keyCode) {
      case 37: turnLeft(myRover); break; //LEFT
      case 38: goForward(myRover); break; //UP
      case 39: turnRight(myRover); break; //RIGHT
      case 40: goBackward(myRover); break; //DOWN
    }
  }else{ //BUTTONS CONTROL
    switch (this.attributes.id.value) {
      case "forward": goForward(myRover); break;
      case "backward": goBackward(myRover); break;
      case "left": turnLeft(myRover); break;
      case "right": turnRight(myRover); break;
    }
  }
  updateText(myRover);
}

function goForward(rover) {
  switch(rover.direction) {
    case 'N':
      rover.position[0]++
      if(checkForObstacles(rover.position))rover.position[0]--
      break;
    case 'E':
      rover.position[1]++
      if(checkForObstacles(rover.position))rover.position[1]--
      break;
    case 'S':
      rover.position[0]--
      if(checkForObstacles(rover.position))rover.position[0]++
      break;
    case 'W':
      rover.position[1]--
      if(checkForObstacles(rover.position))rover.position[1]++
      break;
  };
  rover = borderControl(rover);//Check if rover is out of border
  var x,y;//Target position for rover image
  x = (10-myRover.position[0]) *50; y = myRover.position[1]*50;
  document.getElementById("rover").style.top=x;//Move image
  document.getElementById("rover").style.left=y;//Move image
  console.log("(Forward)New Position: [" + rover.position[0] + ", " + rover.position[1] + "]");
}
function goBackward(rover) {
  switch(rover.direction) {
    case 'N':
      rover.position[0]--
      if(checkForObstacles(rover.position))rover.position[0]++
      break;
    case 'E':
      rover.position[1]--
      if(checkForObstacles(rover.position))rover.position[1]++
      break;
    case 'S':
      rover.position[0]++
      if(checkForObstacles(rover.position))rover.position[0]--
      break;
    case 'W':
      rover.position[1]++
      if(checkForObstacles(rover.position))rover.position[1]--
      break;
  };//Move
  rover = borderControl(rover);//Check if rover is out of border
  var x,y;//Target position for rover image
  x = (10-myRover.position[0]) *50; y = myRover.position[1]*50;
  document.getElementById("rover").style.top=x;//Move image
  document.getElementById("rover").style.left=y;//Move image
  console.log("(Backward)New Position: [" + rover.position[0] + ", " + rover.position[1] + "]")
}
function turnLeft(rover){
  switch(rover.direction) {
    case 'N':
      rover.direction = "W"
      break;
    case 'E':
      rover.direction = "N"
      break;
    case 'S':
      rover.direction = "E"
      break;
    case 'W':
      rover.direction = "S"
      break;

  };
  rover.rotation-=90;
  document.getElementById("rover").style.transform="rotate("+rover.rotation+"deg)";//rotate image
  console.log("(Left Turn)New Position: [" + rover.position[0] + ", " + rover.position[1] + "]")
}
function turnRight(rover){
  switch(rover.direction) {
    case 'N':
      rover.direction = "E"
      break;
    case 'E':
      rover.direction = "S"
      break;
    case 'S':
      rover.direction = "W"
      break;
    case 'W':
      rover.direction = "N"
      break;
  };
  rover.rotation+=90;
  document.getElementById("rover").style.transform="rotate("+rover.rotation+"deg)";//rotate image
  console.log("(Right Turn)New Position: [" + rover.position[0] + ", " + rover.position[1] + "]")
}
function borderControl(rover){
  if(rover.position[0]>10){rover.position[0] = 0;warning("Out of border");}
  if(rover.position[1]>10){rover.position[1] = 0;warning("Out of border");}
  if(rover.position[0]<0){rover.position[0] = 10;warning("Out of border");}
  if(rover.position[1]<0){rover.position[1] = 10;warning("Out of border");}
  return rover;
}

//Obstacles
var obstacles = [];
createObstacles(6);// Iniatiale obstacles

function createObstacles(numberOfObstacles){
  var x,y//position of new obstacle
  for(var i = 0 ; i < numberOfObstacles; i++){
      x = Math.floor((Math.random() * 10) + 1);
      y = Math.floor((Math.random() * 10) + 1);
    obstacles[i] = {
      position: [x,y]
    }
    var obs = document.createElement('div');
    document.getElementById("playable-area").appendChild(obs);//Put obstacle into playable area
    obs.style.left = y *50;
    obs.style.top = (10 - x)*50;
    obs.className+= "obstacle";
  }
}
function checkForObstacles([x,y]){
  for(var i = 0 ; i < obstacles.length; i ++){
    if(obstacles[i].position[0] == x && obstacles[i].position[1] == y){
      warning("Obstacle!");
      return true;
    }
  }
  return false;
}
