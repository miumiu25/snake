var content = document.getElementById('content');
var startPage = document.getElementById('startPage');
var scoreBox = document.getElementById('score');
var over = document.getElementById('over');
var loserScore = document.getElementById('loserScore');
var close = document.getElementById('close');
var startBtn = document.getElementById('startBtn');
var moving;
//初始化
function init(){
	//地图	
	this.mapW = parseInt(getComputedStyle(content).width);
	this.mapH = parseInt(getComputedStyle(content).height);
	this.mapDiv = content;
	//食物
	this.foodW = 20;
	this.foodH = 20;
	this.foodX = 0;
	this.foodY = 0;
	//蛇
	this.snakeW = 20;
	this.snakeH = 20;
	this.snakeBody = [[2,0,'head'],[1,0,'body'],[0,0,'body']];
	this.direct = 'right';
	this.left = false;
	this.right = false;
	this.up = true;
	this.down = true;
	this.score = 0;
}
init();
//点击开始游戏按钮
startBtn.onclick = function(){
	//按钮消失
	startBtn.style.display = 'none';
	//开始游戏
	start();
}
//游戏开始，食物出现，蛇出现，蛇移动，开启键盘操作
function start(){
	food();
	snake();
	moving = setInterval(function(){
		move();
	},200)
	bindEvent();
}
//食物
function food(){
	//创建food元素
	var food = document.createElement('div');
	food.style.width = this.foodW + 'px';
	food.style.height = this.foodH + 'px';
	food.style.position = 'absolute';
	//食物随机出现坐标
	this.foodX = Math.floor(Math.random() * (this.mapW/20));
	this.foodY = Math.floor(Math.random() * (this.mapH/20));
	food.style.left = this.foodX * 20 + 'px';
	food.style.top = this.foodY * 20 + 'px';
	this.mapDiv.appendChild(food).setAttribute('class','food');
}
//蛇
function snake(){
	for(var i = 0;i < this.snakeBody.length; i ++){
		var snake = document.createElement('div');
		snake.style.width = this.snakeW + 'px';
		snake.style.height = this.snakeH + 'px';
		snake.style.position = 'absolute';
		snake.style.left = this.snakeBody[i][0] * 20 + 'px';
		snake.style.top = this.snakeBody[i][1] * 20 + 'px';
		snake.classList.add(this.snakeBody[i][2]);
		this.mapDiv.appendChild(snake).classList.add('snake');
		//调整蛇头朝向
		switch(this.direct){
		case 'right':
			break;
		case 'up':
			snake.style.transform = 'rotate(270deg)';
			break;
		case 'left':
			snake.style.transform = 'rotate(180deg)';
			break;
		case 'down':
			snake.style.transform = 'rotate(90deg)';
			break;
			default:
			break;
	}
	}
}
//移动-->控制蛇头移动，身体跟随
function move(){
	for(var i = this.snakeBody.length - 1;i > 0; i --){
		this.snakeBody[i][0] = this.snakeBody[i - 1][0];
		this.snakeBody[i][1] = this.snakeBody[i - 1][1];
	}
	switch(this.direct){
		case 'right':
			this.snakeBody[0][0] += 1;
			break;
		case 'up':
			this.snakeBody[0][1] -= 1;
			break;
		case 'left':
			this.snakeBody[0][0] -= 1;
			break;
		case 'down':
			this.snakeBody[0][1] += 1;
			break;
			default:
			break;
	}
	removeClass('snake');
	snake();
	//吃到食物
	if(this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY){
		var snakeEndX = this.snakeBody[this.snakeBody.length - 1][0];
		var snakeEndY = this.snakeBody[this.snakeBody.length - 1][1];
		switch(this.direct){
		case 'right':
			this.snakeBody.push([snakeEndX + 1,snakeEndY,'body']);
			break;
		case 'up':
			this.snakeBody.push([snakeEndX,snakeEndY - 1,'body']);
			break;
		case 'left':
			this.snakeBody.push([snakeEndX - 1,snakeEndY,'body']);
			break;
		case 'down':
			this.snakeBody.push([snakeEndX,snakeEndY + 1,'body']);
			break;
			default:
			break;
	}
		this.score += 1;
		scoreBox.innerHTML = this.score;
		removeClass('food');
		food();
	}
	//蛇头撞到墙
	if(this.snakeBody[0][0] < 0 || this.snakeBody[0][0] >= this.mapW/20){
		gameOver();
	}
	if(this.snakeBody[0][1] < 0 || this.snakeBody[0][1] >= this.mapH/20){
		gameOver();
	}
	//蛇头撞到自身
	for(var i = 1;i < this.snakeBody.length; i ++){
		if(this.snakeBody[0][0] == snakeBody[i][0] && this.snakeBody[0][1] == snakeBody[i][1]){
			gameOver();
		}
	}
}
//游戏结束，清除移动，出现结束画面
function gameOver(){
	removeClass('snake');
	removeClass('food');
	clearInterval(moving);
	over.style.display = 'block';
	loserScore.innerHTML = this.score;
}
function removeClass(className){
	var ele = document.getElementsByClassName(className);
	while(ele.length > 0){
		ele[0].parentNode.removeChild(ele[0]);
	}
}
//方向键盘
function setDerict(code){
	switch(code){
		case 37:
			if(this.left){
				this.direct = 'left';
				this.left = false;
				this.right = false;
				this.up = true;
				this.down = true;
			}
			break;
		case 38:
			if(this.up){
				this.direct = 'up';
				this.left = true;
				this.right = true;
				this.up = false;
				this.down = false;
			}
			break;
		case 39:
			if(this.right){
				this.direct = 'right';
				this.left = false;
				this.right = false;
				this.up = true;
				this.down = true;
			}
			break;
		case 40:
			if(this.down){
				this.direct = 'down';
				this.left = true;
				this.right = true;
				this.up = false;
				this.down = false;
			}
			break;
		default:
			break;
	}
}
function bindEvent(){
	document.onkeydown = function(e){
		var code = e.keyCode;
		setDerict(code);
	}
}
//关闭结束弹窗，重新初始化
close.onclick = function(){
	over.style.display = 'none';
	startBtn.style.display = 'block';
	this.score = 0;
	scoreBox.innerHTML = this.score;
	init();
}