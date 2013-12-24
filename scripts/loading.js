(function() {
var canvas1 = document.getElementById("canvas1");
var ctx1 = canvas1.getContext("2d");
var loader = new Image()
loader.src = "images/LoadingCircle.png"
var frame = 0.0;
function animationFrame(){
	$("#canvas1").css("background-image","none");
	$("#canvas1").css("background-color","#8F00FF");

	canvas1.width = canvas1.width;
	ctx1.drawImage(loader,Math.floor(frame)*102,0,102,102, canvas1.width/2 - 51,canvas1.height/2 - 51,102,102);
	frame+=1/4;

	console.log(frame);
	if(frame >= 9){
		frame = 0;
	}
	requestAnimationFrame(animationFrame);
}
animationFrame();
}())
