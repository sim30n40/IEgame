(function() {
//select the canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//some function that we will probably need :D
function getRandomInt (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
//user width and height saved in vars (it isn't obvious :D)
var userWidth = 70;
var userHeight = 70;
var ieWidth = 70;
var ieHeight = 70;
var kills = 0;
//create object for the user
function User(x,y,speed,hitPower,hitPoints){
	//set object properties for x,y coordinate and speed\
	this.maxHeight = 70;
	this.maxWidth = 70;
	this.height = 70;
	this.width = 70;
	this.x = x;
	this.y = y;
	this.speed = speed;
	//set health
	this.health = hitPoints;
	this.maxHealth = hitPoints;
	//creating image for the user
	this.img = new Image();
	this.img.src = "images/user.png";
	this.amIGoingUp = false;
	//controll brains
	this.moveRight = function(){
		this.x+= this.speed;
	}
	this.moveLeft = function(){
		this.x-= this.speed;
	}
	//activate jump by default
	this.canIJump = true;
   this.shootTipe = 1;


   
   this.canIshoot = true;

   this.isShotFired = false;
   
   		this.shot= new Shot(this.x,this.y,this.speed*2.2,25,54,18);
   this.shoot = function(){

		this.shot.x=this.x
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
	this.userImg = new Image();
	this.userImg.src = "images/ie6.png";
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
		this.shot.x=this.x
   		this.shot.y=this.y
   		
   		this.canIshoot  = false;
   		this.isShotFired =  true;
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

var user1 = new User(0,ctx.canvas.height - 70,5,10,100);
//create ie
var ie  = new InternetExporer(ctx.canvas.width -70,ctx.canvas.height -70	,5,10,100)
var ieMaxHealth = ie.health


function animationFrame(){
			canvas.width = canvas.width;
		//console.log("User1 --> X: " + user1.x + " Y: " + user1.y);
		//console.log("Ie --> X: " + ie.x + " Y: " + ie.y);
		ctx.fillStyle = "black";
		ctx.font = "24px Helvetica";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillText("Kills: "+kills+"          Health: "+user1.health , canvas.width/3, 32);
		if(user1.health>0)
			ctx.drawImage(user1.img, user1.x, user1.y, user1.width ,user1.height);
		if(ie.health>0){
			ctx.drawImage(ie.userImg,ie.x,ie.y,ie.width,ie.height);	
		}
		else{
			kills++
			ie.health = 10000000000000000000;
			ie.height = 0;
			ie.width = 0;
			ie.speed =   15;
			ie.maxHeight = getRandomInt(55,230);
			ie.maxWidth = ie.maxHeight;

			ie.y = canvas.height/2 - ie.maxHeight/2 ;
			ie.x  = getRandomInt(canvas.width/10,canvas.width/5)*5 - ie.maxWidth;
			
			
		
		}		
		if(ie.y<=canvas.height - ie.maxHeight)
			{
				ie.y++;
			
			}
				if(ie.height<ie.maxHeight){
				ie.height++;
				ie.width++;
			}
		var baseLine = 0;
		if( user1.x + user1.width  <= ie.x - user1.speed || user1.x>=ie.x+ie.width){						
					baseLine = canvas.height - userHeight
			}
		else{
			baseLine = canvas.height - 2*userHeight
		}
		if(ie.y>=canvas.height - ie.maxHeight && ie.health>10000000){
			ie.speed =   5;
			ie.health = ie.maxHeight;
			ie.maxHealth = ie.health;
			

		}
		if( ie.health<10000&&ie.health>0){
			if(ie.canIshoot&&user1.health>0&&user1.x <ie.x){
			ie.shoot()
			}
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
		//user health bar
			if(user1.health>0){
			ctx.fillStyle = "black";
			ctx.strokeRect(user1.x+3,user1.y  - 25,user1.width-6,12);
			var percUser = user1.health / user1.maxHealth
			if( percUser > 2/3){	
				ctx.fillStyle= "#36FF00"
			}
			else if(percUser<=2/3&& percUser>1/3){
				ctx.fillStyle= "#FF8F00"
			}
			else{
				ctx.fillStyle= "#FF1100"
			}
			ctx.fillRect(user1.x+4,user1.y  - 24,(user1.width-8)*percUser,10);
		}

		//Player hoding Up  -- Jump
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
		if (37 in keysDown && user1.x>0&&user1.health>0&&(!(amIinYou(user1,ie))||user1.x+user1.width === ie.x)) { 
				user1.moveLeft();	
		}
		//player holding right
		if (39 in keysDown&& user1.x < canvas.width - user1.width&&user1.health>0&&(!(amIinYou(user1,ie)) || user1.x === ie.x + ie.width)) { 
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

		//ie firing
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
		
		//Loop it baby
		requestAnimationFrame(animationFrame);	 	
}
//start animation
animationFrame();

}())
