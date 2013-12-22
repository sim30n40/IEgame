(function() {
//select the canvas

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//some function that we will probably need :D
function getRandomInt (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
//user width and height saved in vars (it isn't obvious :D)
var bg = new Image();
bg.src = "images/wf.gif";
var kills = 0;
var portal = new Image();
portal.src = 'images/portal.gif';
//create object for the user
function User(x,y,speed,hitPower,hitPoints){
	//set object properties for x,y coordinate and speed\
	this.maxHeight = 70;
	this.maxWidth = 70;
	this.height = 70;
	this.width = 70;
	this.x = x;
	this.y = y;
	this.healthBar = new Image();
	this.healthBar.src = 'images/neuron.png'
	this.speed = speed;
	//set health
	this.health = hitPoints;
	this.maxHealth = hitPoints;
	//creating image for the user
	this.img = new Image();
	this.img.src = "images/userRight.png";
	this.amIGoingUp = false;

		this.moveLeft = false;
		this.movingRight = true;
	//controll brains
	this.moveRight = function(){
		this.x+= this.speed;
		
		this.movingLeft = false;
		this.movingRight = true;
	}
	this.moveLeft = function(){
		this.x-= this.speed;
		this.movingLeft  = true;
		this.movingRight = false;
	}
	//activate jump by default
	this.canIJump = true;
   this.shootTipe = 1;


   
   this.canIshoot = true;

   this.isShotFired = false;
   
   this.shot= new Shot(this.x,this.y,this.speed*2.2,25,54,18);
   this.shoot = function(){

		this.shot.x=this.x + this.width
   			this.shot.y=this.y
   		   		this.canIshoot  = false;
   		this.isShotFired =  true;
   		
   }
}
function Shot(x,y,speed,firepower,width,height) {
		this.x = x
		this.firepower = firepower;
		this.y = y
		this.speed = speed;
		this.img = new Image();
		this.img.src = "images/altf4.png";
		this.moveRight = function(){
		this.x+= this.speed;
		}
		this.moveLeft = function(){
			this.x-= this.speed;
		}
		this.width = width;
		this.height = height;
}
function InternetExporer(x,y,speed,hitPower,hitPoints){
	//set object properties for x,y coordinate and speed
	this.x = x;
	this.y = y;
	this.maxHeight = 70;
	this.maxWidth = 70;
	this.height = 70;
	this.width = 70;
	this.canIJump = true;

	//set health
	this.health = hitPoints;
	this.maxHealth = hitPoints;
	this.speed = speed;
	this.img = new Image();
	this.img.src = "images/ie6.png";
	this.moveRight = function(){
		this.x+= this.speed;
	}
	this.moveLeft = function(){
		this.x-= this.speed;
	}
	this.moveDown = function(){
		this.y += this.speed;
	}

   this.canIshoot = true;

   this.shot= new Shot(this.x,this.y,this.speed*1.2,getRandomInt(3,7),54,18)
   this.isShotFired = false;
	this.shoot = function(){
   		
   		this.canIshoot  = false;
   		this.isShotFired =  true;
   }
   }
function lock(shooter,target){
	if(target.y >= shooter.y){
		shooter.shot.y = target.y +10;
	}
	else{
		shooter.shoot.y = canvas.height - Math.floor(shooter.y/2);
	}
}
var amIinYou = function(me,you){
	if(me.y+me.height <= you.y || me.y >=you.y+you.height){
		return false;
	}
	if(me.x+me.width<you.x    || me.x > you.width + you.x  ){
		return false;
	}
	return true;

}
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}   
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);



function baseLiner(user1,ie){
	
		if( user1.x + user1.width  <= ie.x - user1.speed || user1.x>=ie.x+ie.width){						
					return canvas.height - user1.height
			}
		else{
			return canvas.height - user1.height -ie.height;
		}
}
function userBrains(baseLine,user1,ie){

	if (38 in keysDown&& user1.canIJump&&user1.health>0) { 
			user1.amIGoingUp = true;
			if(user1.y < canvas.height - user1.height){
				user1.canIJump = false; 
			}	
		}
		
		if(user1.amIGoingUp){
			user1.y-=user1.speed;
		}
		else{
			if(user1.y >= baseLine){
				user1.canIJump = true;
			}
			else{
				user1.y+=user1.speed;
			}
		}
		if(user1.y <baseLine - 120){
			user1.amIGoingUp = false;
		}


		//Player holding left
		if (37 in keysDown && user1.x>=0&&user1.health>0&&(!(amIinYou(user1,ie))||user1.x+user1.width === ie.x)) {
				//1user1.img.src = "images/userLeft.png"; 
				user1.moveLeft();	
		}
		//player holding right
		if (39 in keysDown&& user1.x < canvas.width - user1.width&&user1.health>0&&(!(amIinYou(user1,ie)) || user1.x === ie.x + ie.width)) { 
				//
				user1.moveRight();
		}

		//player pressing space -- fire
		if (32 in keysDown&&user1.health>0) { 
				if(user1.canIshoot){
						user1.shoot();
					}

		}
		if(user1.isShotFired){
			if(!amIinYou(user1.shot,ie)){

				ctx.drawImage(user1.shot.img,user1.shot.x,user1.shot.y,54,18);
				user1.shot.moveRight();
			}
			else if(!(user1.x+user1.width>ie.x    && user1.shot.x < ie.width + ie.x  )){
					ie.health -= user1.shot.firepower;
					user1.canIshoot =true;
					user1.isShotFired = false;
					user1.shot.x = user1.x;
					user1.shot.y = user1.y+20;
				}
			if(user1.shot.x <0 || user1.shot.x > canvas.width|| user1.shot.y <0 || user1.shot.y> canvas.height){
					user1.canIshoot =true;
					user1.isShotFired = false;
					user1.shot.x = user1.x;
					user1.shot.y = user1.y+50;
			}
		}
		if(49 in keysDown ){
			user1.shootTipe = 1;
			
		}
		if(50 in keysDown ){
			user1.shootTipe = 2;
			
		}
		if(72 in keysDown&&85 in keysDown&&74 in keysDown){
			user1.health = 100;
		}
		if(user1.shootTipe === 1&& user1.canIshoot){
   			user1.shot.img.src =" images/altf4.png";
   			user1.shot.speed = 2.2*user1.speed;
			user1.shot.firepower = 40;	
   		}
   		if(user1.shootTipe === 2&& user1.canIshoot){
   			user1.shot.img.src ="images/ctrlaltdel.png";
   			user1.shot.speed = 4.5 * user1.speed;
			user1.shot.firepower = 25;
   		}
   		if(user1.health>0){
			var percUser = user1.health / user1.maxHealth
			ctx.drawImage(bg,0,0,276,119);
			ctx.drawImage(user1.healthBar,0,0,276*percUser,119,0,0,276*percUser,119);
			}
}
function ieHealthBar(ie){
	if( ie.health<10000&&ie.health>0){
			
			//ie health bar
			ctx.fillStyle = "black";
			ctx.strokeRect(ie.x+3,ie.y  - 25,ie.width-6,12);
			var percIe = ie.health / ie.maxHealth;
			if( percIe > 2/3){
				
				ctx.fillStyle= "#36FF00"
			}
			else if(percIe<=2/3&& percIe>1/3){
				ctx.fillStyle= "#FF8F00"
			}
			else{
				ctx.fillStyle= "#FF1100"
			}
			ctx.fillRect(ie.x+4,ie.y  - 24,(ie.width-8)*percIe,10);
		}
}
function ieBrains(user1,ie){
	if(ie.isShotFired){	
			if(!amIinYou(ie.shot,user1)){
				ctx.drawImage(ie.shot.img,ie.shot.x,ie.shot.y,54,18);
				ie.shot.moveLeft();
			}
			else if(!(user1.x+user1.width>ie.x    && user1.shot.x < ie.width + ie.x  )){
					user1.health -= ie.shot.firepower;
					if(user1.health<5)
						user1.health = 0
					var useless = getRandomInt(500,1500);
					setTimeout(function(){
					ie.canIshoot =true;
				},useless);
					ie.isShotFired = false;
					ie.shot.x = ie.x;
					ie.shot.y = ie.y+20;
				}
				
			
			if(ie.shot.x <0 || ie.shot.x > canvas.width|| ie.shot.y <0 || ie.shot.y> canvas.height){
					var useless = getRandomInt(500,1500);
					setTimeout(function(){
					ie.canIshoot =true;
				},useless);
					ie.isShotFired = false;
					ie.shot.x = ie.x;
					ie.shot.y = ie.y+50;
			}
		}
		if(ie.canIshoot&&user1.health>0&&user1.x <ie.x&&ie.health>0){
			lock(ie,user1);
			ie.shoot();
			
		}
}
function backgroundChanger(){
	if(currentLevel == 0 && !(levels.zero) ){
		$("#canvas").css("background-image","url('images/backgroundLevel0.png')");
		;
		levels.zero = true;
	}
	if(currentLevel == 1 &&!(levels.one) ){
		console.log("shit");
		levels.one = true;
	}
	$("#canvas").css("background-size",canvas.width + "px " + canvas.height + "px")
}

var userLevel0 = new User(0,ctx.canvas.height - 70,5,10,100);
	//create ie
var ieLevel0  = new InternetExporer(ctx.canvas.width -150,ctx.canvas.height -150	,5,10,1000)
ieLevel0.img.src = "images/ie11.png"
ieLevel0.width = 50;
ieLevel0.height = 50;
ieLevel0.maxWidth = 150;
ieLevel0.maxHeight = 150; 
var currentLevel = 0;
var levels = {
	zero:false,
	one:false,
	two:false,
	three:false,
	four:false,
	five:false
}
	/*
	var X=0;
	var Y=0;
	console.log("X: "+X+" Y: " + Y);
	if(37 in keysDown){
		X--;
	}
	if(39 in keysDown){
		X++;
	}
	if(40 in keysDown){
		Y++;
	}
	if(38 in keysDown){
		Y--;
	}*/
	ieLevel0.x = 635;
	ieLevel0.y = 207;
function animationFrameIntroLevel0(){
	backgroundChanger();
	var now  = new Date ; 
	canvas.width = canvas.width;
	var delta =now - than
	ctx.drawImage(userLevel0.img, userLevel0.x, userLevel0.y, userLevel0.width ,userLevel0.height);
	ctx.fillStyle = "white";
	ctx.fillRect(624,196,70,75);
	
	ctx.drawImage(ieLevel0.img,ieLevel0.x,ieLevel0.y,ieLevel0.width,ieLevel0.height);
	if( delta< 250){
		ieLevel0.x++;
		ieLevel0.height++;
	}
	if(delta < 750&&delta >250){
		ieLevel0.x--;

		ieLevel0.height--;
	}

	if(delta < 1000&&delta >750){
		ieLevel0.x++;

		ieLevel0.height++;
	}
	if(delta < 1250&&delta >1000){
		ieLevel0.y--;

		ieLevel0.width--;
	}
	if(delta < 1750&&delta >1250){
		ieLevel0.y++;
		ieLevel0.width++;
	}
	if(delta < 2000&&delta >1750){
		ieLevel0.y--

		ieLevel0.width--;
	}

	if(ieLevel0.width<=ieLevel0.maxWidth){
		ieLevel0.width++
	}
	if(ieLevel0.height<=ieLevel0.maxHeight){
		ieLevel0.height++
	}
	if(ieLevel0.x <= canvas.width -150 ){
		ieLevel0.x++;
	}

	if(ieLevel0.y <= canvas.height -150){
		ieLevel0.y++;
	}
	if(ieLevel0.y >= canvas.height -150&&ieLevel0.x >=canvas.width -150){
		ieLevel0.x =ctx.canvas.width -150;
		ieLevel0.y= ctx.canvas.height -150;
		requestAnimationFrame(animationFrameLevel0);
	}
	else{
	requestAnimationFrame(animationFrameIntroLevel0);
	}

}
function animationFrameLevel0(){

	
	canvas.width = canvas.width;
	var baseLine = baseLiner(userLevel0,ieLevel0);
	userBrains(baseLine,userLevel0,ieLevel0);
	ieBrains(userLevel0,ieLevel0);
	ieHealthBar(ieLevel0);		
	if(userLevel0.health>0)
		ctx.drawImage(userLevel0.img, userLevel0.x, userLevel0.y, userLevel0.width ,userLevel0.height);
	if(ieLevel0.health>0){
		ctx.drawImage(ieLevel0.img,ieLevel0.x,ieLevel0.y,ieLevel0.width,ieLevel0.height);
		
	}
	else{
		ieLevel0.x = -1000;
		ieLevel0.y = -1000;
		ctx.drawImage(portal,canvas.width -150,canvas.height -150,150,150);
		
	}
	if(userLevel0.movingRight){
		userLevel0.img.src = "images/userRight.png";
	}

	if(userLevel0.movingLeft){
		userLevel0.img.src = "images/userLeft.png";
	}
	if(userLevel0.x>canvas.width  - 150  &&ieLevel0.health<=0){
			alert("shit")
			requestAnimationFrame(animationFrameLevel1)
		}
	else{
		requestAnimationFrame(animationFrameLevel0);
	 }
}
function animationFrameLevel1(){
	canvas.width = canvas.width
	$("#canvas").css("background-image","none");
	ctx.fillStyle = "blue";
  ctx.font = "bold 16px Arial";
  ctx.fillText("Level 1", 100, 100);
}
var than = new Date();
animationFrameIntroLevel0();

}())
