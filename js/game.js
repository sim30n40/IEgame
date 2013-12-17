// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;
document.body.appendChild(canvas);
//create User 
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var ieHealth = 100;
var userHealth = 100;
var isShotFiredUs = false;
var isShotFiredie = false;
var userReady = false;
var userImage = new Image ();
userImage.onload = function () {
	userReady = true;
};
userImage.src = "images/user.png";
var altF4Ready  = false;
var altF4Image = new Image();
altF4Image.onload = function () {
	altF4Ready = true;
};
altF4Image.src = "images/altf4.png"
var altF4Us = {
	speed: 750
};
var altF4ie = {
	speed: 1000
};
var user = {
	speed : 256
};
//create IE6
var IE6Ready = false;
var IE6Image = new Image ();
IE6Image.onload = function (){
	IE6Ready = true;
};
IE6Image.src = "images/ie6.png";
var ie6 ={
	speed : 75
};
// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function () {
	user.x = 30;
	user.y = canvas.height-100;

	// Throw the monster somewhere on the screen randomly
	ie6.x = canvas.width - 130;
	ie6.y = canvas.height-100;
	 altF4Us.x = user.x;
	 altF4Us.y = user.y;
	 altF4ie.x = ie6.x;
	 altF4ie.y = ie6.y;
};
var jump = true;
// Update game objects
var update = function (modifier) {
	if (38 in keysDown && user.y>canvas.height - 250 && jump===true) { // Player holding up
			
			user.y -= user.speed * modifier;
			if(user.y <canvas.height - 220){
				jump = false;
			}
		
		
	}
	
	if ((!(38  in keysDown) && user.y < canvas.height-100)||jump === false) { // Player holding up

			jump = false;
			if (user.y >=canvas.height-100){
				jump = true;
			}
			user.y += user.speed * modifier;
			
		
	}
	if (37 in keysDown && user.x>0) { // Player holding left
		user.x -= user.speed * modifier;
	}
	if (39 in keysDown&&user.x < ie6.x - 100) { // Player holding right
		user.x += user.speed * modifier;
	}
	if (32 in keysDown) { // Player holding right

			isShotFiredUs = true;

	}
	var botBrain = getRandomInt(0,360);
	
	if (botBrain%2 === 0 && ie6.x>0) { // Player holding left
		ie6.x -= ie6.speed * modifier;
	}
	if (botBrain % 3 === 0 &&ie6.x > ie6.x - 100) { // Player holding right
		ie6.x += ie6.speed * modifier;
	}
	if (botBrain % 5 === 0) { // Player holding right

			isShotFiredie = true;

	}

	if (isShotFiredUs){
		altF4Us.x += altF4Us.speed * modifier;
	}
	if (altF4Us.x >ie6.x){
		isShotFiredUs = false;
		altF4Us.x = user.x;
		altF4Us.y = user.y
		if (ieHealth < 16){
			ieHealth =0 ;
		}
		else{
			ieHealth -= getRandomInt(10,15);
		}
	}
	if (isShotFiredie){
		altF4ie.x -= altF4ie.speed * modifier;
	}
	if (altF4ie.x <user.x){
		isShotFiredie = false;
		altF4ie.x = ie6.x;
		altF4ie.y = ie6.y
		if (userHealth < 9){
			userHealth = 0 ;
		}
		else{
			userHealth -= getRandomInt(5,8);
		}	}
};

// Draw everything
var render = function () {
	canvas.width = canvas.width
	if (userReady) {
		ctx.drawImage(userImage, user.x, user.y,100,100);
	}

	if (IE6Ready) {
		ctx.drawImage(IE6Image, ie6.x, ie6.y,100,100);
	}
	if(isShotFiredUs){
			
			ctx.drawImage(altF4Image,altF4Us.x,altF4Us.y);
	}if(isShotFiredie){
			
			
	ctx.drawImage(altF4Image,altF4ie.x,altF4ie.y);
	}
	ctx.fillStyle = "black";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.strokeRect(canvas.width - 110,35,102,12);
	ctx.strokeRect(10,35,102,12);
	
		if( ieHealth >66){
			ctx.fillStyle = "#38C728";
			ctx.fillRect(canvas.width - 109,36,ieHealth,10);
			}
		else if( ieHealth<67 &&  ieHealth > 33){
			ctx.fillStyle = "#FF8A00";
			ctx.fillRect(canvas.width - 109,36,ieHealth,10);
			}
		else{
			ctx.fillStyle = "#FF1100";
			ctx.fillRect(9,36,ieHealth,10);
			}
		if( userHealth >66){
			ctx.fillStyle = "#38C728";
			ctx.fillRect(9,36,userHealth,10);
			}
		else if( userHealth<67 &&  userHealth > 33){
			ctx.fillStyle = "#FF8A00";
			ctx.fillRect(9,36,userHealth,10);
			}
		else{
			ctx.fillStyle = "#FF1100";
			ctx.fillRect(9,36,userHealth,10);
			}

	
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();
	if (ieHealth === 0){

		isShotFiredie = false;
		isShotFiredUs   = false;
		canvas.width = canvas.width;
		ctx.fillStyle = "black";
		ctx.font = "24px Helvetica";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillText("Congratulations!" , canvas.width/3, 32);

		ctx.fillText("you killed Ie " , canvas.width/3, 64);
		ctx.fillText("Click to play another" , canvas.width/3, 96);
		$(document).ready(function(){
			$('canvas').click(function(){
				userHealth = 100;
				ieHealth = 100;
				reset();
			});
		});
	}
	if (userHealth === 0){
		isShotFiredie = false;
		isShotFiredUs   = false;
		canvas.width = canvas.width;
		ctx.fillStyle = "black";
		ctx.font = "24px Helvetica";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillText("GAME OVER! " , canvas.width/3, 32);

		ctx.fillText("IE killed you! ...slowly " , canvas.width/3, 64);
		ctx.fillText("Click to play another!" , canvas.width/3, 96);
		$(document).ready(function(){
			$('canvas').click(function(){
				userHealth = 100;
				ieHealth = 100;
				reset();
			});
		});
	}
	then = now;
	
};

// Let's play this game!
reset();
var then = Date.now();
setInterval(main, 1); // Execute as fast as possible
