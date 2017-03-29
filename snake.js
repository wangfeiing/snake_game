//进入游戏
var speed = 200;

if (confirm("进入游戏")==1) {
	var snakeCanvas = document.getElementById("snake_canvas");
	background_music = document.getElementById("background_music");
	background_music.play();
	var canvasContext = snakeCanvas.getContext("2d");
	var snake = new Snake();
	snake.initGame();
	snake.gameStatus = 1;
	interval = window.setInterval("timer()",200);

}
else{
	alert("滚！！！");
};

//计时器

timeInterval = setInterval(function(){

	snake.Time++;
	var t =	document.getElementById("gameTime");
	t.innerHTML = snake.Time;
},1000);
scoreInterval = window.setInterval(function(){
		var s = document.getElementById("scoreNum");
		// console.log(snake.eatCount);
		s.innerHTML = snake.eatCount;
	},200);

function timer(){ 
	var symbol = 0;
	var headPit = new Point(snake.bodyArr[0].x,snake.bodyArr[0].y);

	// console.log("---"+snake.direct);
	switch(snake.direct)	//left:2 right:1 up:4 down:3 蛇的方向
	{
		case 1:{headPit.x+=5;if (headPit.x>295)	{symbol = 1;}}break;
		case 2:headPit.x-=5;if (headPit.x<0) 	{symbol = 1;}break;
		case 3:headPit.y+=5;if (headPit.y>145)	{symbol = 1;}break;
		case 4:headPit.y-=5;if (headPit.y<0) 	{symbol = 1;}break;
		
	} 

	if (symbol == 0) {
		var j = 0;
		for (j in snake.bodyArr ) {
			if ((snake.bodyArr[j].x == headPit.x)&&(snake.bodyArr[j].y == headPit.y)){
				symbol = 1;
				break;
			}
		}
	}

	if (symbol == 0){
		//吃了东西
		if (((snake.bodyArr[0].x - snake.eatAim.x<=2)&&(snake.bodyArr[0].x - snake.eatAim.x>=0))
			&&((snake.bodyArr[0].y - snake.eatAim.y>=0)&&(snake.bodyArr[0].y - snake.eatAim.y<=2)))
		{

			snake.eatCount++;
			snake.bodyArr[snake.eatCount+2] = new Point();
			snake.reDisplay(snake.eatAim.x,snake.eatAim.y);//清除

			var score_music =document.getElementById("score_music");
			score_music.play();
			
			snake.initAim();


		}
		var middle = new Point(snake.bodyArr[snake.eatCount + 2].x ,
			snake.bodyArr[snake.eatCount + 2].y);
		for (var i = snake.eatCount + 2; i > 0; i--) {
			snake.bodyArr[i].x = snake.bodyArr[i-1].x;
			snake.bodyArr[i].y = snake.bodyArr[i-1].y;
		}
		snake.bodyArr[0].x = headPit.x;
		snake.bodyArr[0].y = headPit.y;

		snake.reDisplay(middle.x,middle.y); 
	}

		canvasContext.fillRect(snake.eatAim.x,snake.eatAim.y,5,5);
		canvasContext.fillStyle="black";

		for (var i = 0; i <= snake.eatCount+2; i++) {
			canvasContext.fillRect(snake.bodyArr[i].x,snake.bodyArr[i].y,5,5);
		};

		if (symbol == 1) {
			background_music.pause();
			var  gameover_music = document.getElementById("gameover_music");
			gameover_music.play();


			if (confirm("游戏结束！想继续吗？？")==1) {
				background_music.play();
				var gameover_music = document.getElementById("gameover_music");
				gameover_music.pause();
				canvasContext.clearRect(0,0,600,300);
				snake.initGame();
				snake.gameStatus = 1;
			}
			else{
				clearInterval(interval);
				clearInterval(timeInterval);
			}
		}


}


function Snake () {
	this.numSize = 20;
	this.eatCount = 0;
	this.Time = 0;
	this.direct = 1;
	this.gameStatus = 0;
	this.bodyArr = null;
	this.eatAim = null;

	this.reDisplay = function(x,y){
		canvasContext.clearRect(x-1,y-1,7,7);
	}
	this.initAim = function(){
		var X ,Y;
		while(1){
			X = Math.round(Math.random()*200);

			if(X%5 > 0) {
				X = X - X%5;
			}
			Y = Math.round(Math.random()*100);
			if(Y%5 > 0) {
				Y = Y - Y%5;
			}
			var bool = 0;
			for (var i = 0; i <= this.eatCount+2; i++) {
			
				if ((this.bodyArr[i].x != X)&&(this.bodyArr[i].y!=Y)) {
					bool = 1;
					break;
				}
			}
			if (bool==1) {
				break;
			}
		}		
		this.eatAim.x = X;
		this.eatAim.y = Y;
		// console.log(X+","+Y);
	}

	this.initGame = function(){
		this.bodyArr = null;
		this.bodyArr  = new Array();
		this.eatCount = 0;
		this.Time = 0;
		this.direct = 1;
		this.gameStatus = 0;
		this.eatAim = new Point(200,300);

		this.bodyArr[0] = new Point(20, 10);
		this.bodyArr[1] = new Point(15, 10);
		this.bodyArr[2] = new Point(10, 10);

		this.initAim();
	}
}
function Point(x,y){
	this.x = x;
	this.y = y;
}

function keyDown(event){

	switch(event.keyCode){
		case 38:{if(snake.direct != 3){snake.direct = 4}}break;	//上
		case 40:{if(snake.direct != 4){snake.direct = 3}}break;	//下
		case 37:{if(snake.direct != 1){snake.direct = 2}}break;	//左
		case 39:{if(snake.direct != 2){snake.direct = 1}}break;	//右
	}
}
function keyPress(){
	alert(3333);
}
// document.onkeypress = keyPress;
document.onkeydown=keyDown;
//速度控制
var change;
function speedUp(){
	clearInterval(change);
	clearInterval(interval);
	if (speed>=50) {speed-=50;};
	
	change = setInterval("timer()",speed);
}
function speedDown(){
	clearInterval(change);
	clearInterval(interval);
	interval = setInterval("timer()",200);

}
//控制音乐的播放
function stopBackMusic(){
	background_music.pause();
}
function turnOnBackMusic(){
	background_music.play();
}
function playAgain(){
	window.location.reload();
}
function stop(){
	clearInterval(interval);
	clearInterval(timeInterval);
	background_music.pause();
}
function goOn(){
	background_music.play();
	clearInterval(interval);
	interval = setInterval("timer()",200);
	timeInterval = setInterval(function(){
	snake.Time++;
	var t =	document.getElementById("gameTime");
	t.innerHTML = snake.Time;
},1000);
}
