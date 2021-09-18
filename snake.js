


	// this Function will run only once
function init(){
	canvas = document.getElementById('mycanvas');
	W = H = canvas.width = canvas.height = 1000;
	pen = canvas.getContext('2d');
	cs = 66;
	game_over = false;
	score = 5;


	//Create a Image Object for food
	food_img = new Image();
	food_img.src = "Assets/apple.png";

	trophy = new Image();
	trophy.src = "Assets/trophy.png";

	food = getRandomFood(); // getting random cordinates for food

	snake = {
		init_len:5,
		color:"blue",
		cells:[],
		direction:"right",


		createSnake:function(){
			for(var i=this.init_len;i>0;i--){
				this.cells.push({x:i,y:0});
			}
		},
		drawSnake:function(){

			for(var i=0;i<this.cells.length;i++){
				pen.fillStyle = this.color;
				pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-3,cs-3);
			}
		},

		updateSnake:function(){
							//console.log("updating snake according to the direction property");
							//check if the snake has eaten food, increase the length of the snake and 
							//generate new food object
			var headX = this.cells[0].x;
			var headY = this.cells[0].y;

			if(headX==food.x && headY==food.y){
				console.log("Food eaten");
				food = getRandomFood();
				score++;

			}
			else
			{
				this.cells.pop();
			}

			
			var nextX,nextY;

			if(this.direction=="right"){
				nextX = headX + 1;
				nextY = headY;
			}
			else if(this.direction=="left"){
				nextX = headX - 1;
				nextY = headY;
			}
			else if(this.direction=="down"){
				nextX = headX;
				nextY = headY + 1;
			}
			else{
				nextX = headX;
				nextY = headY - 1;
			}

			this.cells.unshift({x: nextX,y:nextY});

						/*Logic that prevents snake from going out*/
			var last_x = Math.round(W/cs);
			var last_y = Math.round(H/cs);

			if(this.cells[0].y<0 || this.cells[0].x < 0 || this.cells[0].x > last_x || this.cells[0].y > last_y){
				game_over = true;
			}

		}

	};

	snake.createSnake();
					//Add a Event Listener on the Document Object
	function keyPressed(e){			// This will be returning some extra things but we only need key to access which key is pressed by a user
					//Conditional Statments
		if(e.key=="ArrowRight"){
			snake.direction = "right";		//for right key
		}
		else if(e.key=="ArrowLeft"){
			snake.direction = "left";		// for left key
		}
		else if(e.key=="ArrowDown"){		
			snake.direction = "down";		// for down key
		}
		else{
			snake.direction = "up";			// for up key
		}
		console.log(snake.direction);
	}


	document.addEventListener('keydown',keyPressed) ;
	
}


function draw(){
						//console.log("In Draw");

						//erasing the old frame
	pen.clearRect(0,0,W,H);
	snake.drawSnake();

	pen.fillStyle = food.color;
	pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);

	pen.drawImage(trophy,18,20,cs,cs);
	pen.fillStyle = "blue";
	pen.font = "20px Roboto"
	pen.fillText(score,50,50);

	
}

function update(){
				//console.log("In Update");
	snake.updateSnake(); 
}

function getRandomFood(){

	var foodX = Math.round(Math.random()*(W-cs)/cs); 		//getting random food value's X cordinate 
	var foodY = Math.round(Math.random()*(H-cs)/cs);		// now I'm getting random value of Y cordinate 

	var food = {
		x:foodX,
		y:foodY,
		color:"red",			
	}	
	return food;				// returning food with random food values(i.e, cordinates)

}

function gameloop(){					// will run until game is not over
	if(game_over==true){
		clearInterval(f);	
		alert("Game Over");			// popup for game over when it touches the boundary
		return;
	}
	draw();
	update();
}
		
init();					// that top init function is called at first once

var f = setInterval(gameloop,100); 		// setting interval of 100 milisecond











