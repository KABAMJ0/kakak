// *** Start new game
function resetGame(difficulty)
{
	play = true;	
	score = 0;
	game_status = "";

	showLevelTextType = "";
	showLevelText = 0;
	
	if(typeof difficulty === "undefined") {difficulty = 0;}
	
	console.log("resetGame(" + difficulty + ")");
	
	
	if(difficulty != 0)
	{
		for(key in letter) delete letter[key];
		for(key in snakeBodypart) delete snakeBodypart[key];
		
		snake_speed = 4;
		
		if(difficulty == 2)
		{
			snake_speed = 8;	
		}
		if(difficulty == 3)
		{
			snake_speed = 12;	
		}
		
		snake_x = 25;
		snake_y = 425;
		snake_x_speed = snake_speed;
		snake_y_speed = 0;	
		snake_r = 0;
		snakePrevR[snake_r] = 31;
		snake_try_u_turn = -1;
		snake_body_density_count = snake_body_density;	
	
		snake_body_size_reduction = 1; //0.15;
		
		level = 1;
		
		gameStarted = true;
		Collides = true;
		//snakeCollides();
		
		newSpelWord();
		
	}
}

// *** End game
function endGame()
{
	console.log("endGame");
	
	if(highscore_email != "")
	{
		highscoreSubmit();	
	}
	else
	{
		highscoreView();
	}
}




// *** SPELWORDS
function newSpelWord()
{
	//alert(manifest_count + " / " + manifest_total);
	playSound("bloep");
	
	oldSpelWord = spelWord;
	
	for(key in letter) delete letter[key];
	
	temp = spelPool.split(",");
		
	spelWord = temp[Math.floor(Math.random() * (temp.length - 1))];
	
	//spelWord = "bla";
	
	spelWord = spelWord.trim();
	
	if(spelWord==oldSpelWord){newSpelWord(); return;}
	
	//spelWord = "LANGEWOORDJES";
	
	console.log("newSpelWord: " + spelWord);

	temp = spelWord.split("");
	
	for(i = 0; i < temp.length; i++)
	{
		addLetter(temp[i]);
	}
	
	for(a = 0; a < ((11 - (8-wordsGroep))-temp.length); a++)
	{
		
	WillekeurigGetal = 97 + Math.ceil(Math.random() * 25);
	RandomLetter = String.fromCharCode(WillekeurigGetal);
	addLetter(RandomLetter);
	}
	
	


		
			
	
	spelWordPhase = "SHOW";
	spelWordY = -150;
	
	spelledWord = "";

}

function addLetter(thisLetter)
{
	locationFound = false;
	
	while(!locationFound)
	{
		locationFound = true;

		tempX = Math.random() * 900 + 50;
		tempY = Math.random() * 600 + 75;
		
		for(keyTemp in letter)
		{
			if(tempX > letter[keyTemp].x - 40 && tempX < letter[keyTemp].x + 40 && tempY > letter[keyTemp].y - 60 && tempY < letter[keyTemp].y + 20) locationFound = false;
		}
	}
	
	
	letterCount++;
	key = "LETTER" + letterCount;
	
	letter[key] = new Object;

	letter[key].x = tempX;
	letter[key].y = tempY;	
	letter[key].z = 15 + Math.ceil(Math.random() * 100);
	letter[key].letter = thisLetter;
	letter[key].phase = "WAIT";

}

// *** SNAKE
function snakeChangeDir(thisDir)
{
	//console.log("snakeChangeDir: " + thisDir + " Lives: " + lives);


	if(Collides==false || thisDir == snake_r || (snake_r == 0 && thisDir == 180) || (snake_r == 90 && thisDir == 270) || (snake_r == 180 && thisDir == 0) || (snake_r == 270 && thisDir == 90))
	{
		// *** can't go back as you collide with yourself and continue in same direction has no implication
	}
	else
	{
		if(thisDir == 0) thisCheckDir = 180;
		if(thisDir == 90) thisCheckDir = 270;
		if(thisDir == 180) thisCheckDir = 0;
		if(thisDir == 270) thisCheckDir = 90;
		
		if(snakePrevR[thisCheckDir] <= 0)
		{
			//console.log("snakeChangeDir: " + thisDir);
			
			snake_r = thisDir;
			snake_try_u_turn = -1;
			
			snakePrevR[thisDir] = 31; //Math.ceil((30 + 26) / snake_speed);
			
			if(snake_r == 0)
			{
				snake_x_speed = snake_speed;
				snake_y_speed = 0;
			}
	
			if(snake_r == 90)
			{
				snake_x_speed = 0;
				snake_y_speed = -snake_speed;		
			}
	
			if(snake_r == 180)
			{
				snake_x_speed = -snake_speed;
				snake_y_speed = 0;		
			}
			
			if(snake_r == 270)
			{
				snake_x_speed = 0;
				snake_y_speed = snake_speed;		
			}
		}
		else
		{
			console.log("Too sharp U-turn prevention enabled (" + thisCheckDir + ": " + snakePrevR[thisCheckDir] + ")");
			snake_try_u_turn = thisDir;
		}
		
		snake_min_distance = 30;
	}

}

function addSnakeBodypart(thisX, thisY)
{

	snakeBodypartCount++;
	key = "SNAKE_BODYPART" + snakeBodypartCount;
	
	snakeBodypart[key] = new Object;
	snakeBodypart[key].x = thisX + Math.random() * 4 - 2;
	snakeBodypart[key].y = thisY + Math.random() * 4 - 2;
	snakeBodypart[key].y_speed = 0;
	snakeBodypart[key].r = snake_r;
	snakeBodypart[key].size = 30 - 8;
	snakeBodypart[key].age = 0;
	snakeBodypart[key].fillColor = snake_fill_color[Math.ceil(Math.random() * 4)];
	snakeBodypart[key].borderColor = snake_border_color[Math.ceil(Math.random() * 4)];
	snakeBodypart[key].borderWidth = Math.random() * 3;

		
}

function snakeCollides()
{	
	if(Collides==true)
	{
		playSound("ouk");
		playSound("groan_high");
		
		lives--;
	
		//for(keyTemp in snakeBodypart) snakeBodypart[keyTemp].size = 0;
		
		
		addStar(snake_x, snake_y, snake_x_speed, snake_y_speed);		
	
		
		console.log("Collide");
		
		snake_x_speed = 0;
		snake_y_speed = 0;
	
		
		countDownToRestart = 60;
		Collides = false;
		
		if(lives <= 0){
			showLevelText = 100;
		 	showLevelTextType = "GAME_OVER";
			gameStarted = false;
			difficulty = 0;
			countDownToRestart = 0;
			
		}
	}
	
}

// *** INTERACTION

// *** Click in game
function click(thisX, thisY, scale)
{
	userInteractionOccured = true;
	
	//if(!dragging)
	//{
		if(typeof scale === "undefined") scale = true;
		
		if(scale)
		{
			thisX = scaleX(thisX);
			thisY = scaleY(thisY);
		}
			
		//console.log("click: " + Math.ceil(thisX) + ", " + Math.ceil(thisY));
		
		if(hitTest(thisX, thisY, "SOUND_ICON", "sound_on")) switchSound();
		else if(thisX >= spot["BUTTON_X"].x && thisX <= spot["BUTTON_X"].x + 60 && thisY >= spot["BUTTON_X"].y && thisY <= spot["BUTTON_X"].y + 60)
		{
			// *** X-button
			if(confirm('Wil je het spel verlaten?') == true) { history.go(-1); }
			
			console.log("X-button");
			//showLevelText = 0;
			//lives = 1;
			//looseLive();
		}	
		else if(thisX >= spot["FULLSCREEN_ICON"].x && thisX <= spot["FULLSCREEN_ICON"].x + 60 && thisY >= spot["FULLSCREEN_ICON"].y && thisY <= spot["FULLSCREEN_ICON"].y + 60)
		{
			// *** Fullscreen-button
			 toggleFullScreen();
		}		
		else if(hitTest(thisX, thisY, "BUTTON_X", "button_x"))
		{
			showLevelText = 100;
			 	showLevelTextType = "END";
				gameStarted = false;
				difficulty = 0;
				countDownToRestart = 0; 
		}
		else if(game_status == "HIGHSCORES")
		{
			if(hitTest(thisX, thisY, "HIGHSCORE_SUBMIT", "button") && submitted == false) highscoreOpen();
			else if(hitTest(thisX, thisY, "HIGHSCORE_SHARE", "button")) showMe("popup_share");
			else if(hitTest(thisX, thisY, "HIGHSCORE_PLAY", "button")) {resetGame(); spelledWordsCorrect = 0;}
			else if(hitTest(thisX, thisY, "HIGHSCORE_WL", "button")) {showWL(); spelledWordsCorrect = 0;}
		}		
		else
		{
		
			
			if(!gameStarted && hitTest(thisX, thisY, "BUTTON_MAKKELIJK", "button_makkelijk")&&showLevelText == 0) 	{ resetGame(1); }
			else if(!gameStarted && hitTest(thisX, thisY, "BUTTON_MOEILIJK", "button_moeilijk")&&showLevelText == 0) 	{ resetGame(2); }
			else if(!gameStarted && hitTest(thisX, thisY, "BUTTON_PROF", "button_prof")&&showLevelText == 0) 	{ resetGame(3); }
			else if(hitTest(thisX, thisY, "BUTTON_LEFT", "button_left")) 	{ console.log("click 180"); snakeChangeDir(180); }
			else if(hitTest(thisX, thisY, "BUTTON_DOWN", "button_down")) 	{ console.log("click 270"); snakeChangeDir(270); }
			else if(hitTest(thisX, thisY, "BUTTON_RIGHT", "button_right")) 	{ console.log("click 0"); snakeChangeDir(0); }
			else if(hitTest(thisX, thisY, "BUTTON_UP", "button_up")) 	{ console.log("click 90"); snakeChangeDir(90); }									
			else
			{
				// *** Game actions here
				//addCoins(1, "MOUSE", "STAR_SOURCE", "BOUNCE LEFT EYES");
			}
		}
		
		
	//}
				
	endDrag();			
}

// *** Dragging starts
function drag(thisX, thisY)
{
	//console.log("drag: " + Math.ceil(thisX) + ", " + Math.ceil(thisY));
	click(thisX, thisY, true);
}

// *** Dragging ends
function endDrag()
{
	userInteractionOccured = true;
	
	thisX = mouse_x;
	thisY = mouse_y;
	
	//if(dragging) console.log("endDrag: " + Math.ceil(thisX) + ", " + Math.ceil(thisY));
	
	dragging_x = 0;
	dragging_y = 0;
	dragging = false;
	dragging_check = false;

	
}

function keyPress(e)
{
	e = e || window.event;
		
	if 	(e.keyCode == '38' || e.keyCode == '87') 	{ snakeChangeDir(90); }
	else if (e.keyCode == '40' || e.keyCode == '83') 	{ snakeChangeDir(270); }
	else if (e.keyCode == '37' || e.keyCode == '65') 	{ snakeChangeDir(180); }
	else if (e.keyCode == '39' || e.keyCode == '68') 	{ snakeChangeDir(0); }
	else if (e.keyCode == '13' && !gameStarted) 		{ resetGame(1); }
}


// *** FUNCTIONS

// *** Coins
function addCoins(totalVal, origin, destination, animation, delay)
{
	playSound("sword");
	
	if(typeof delay === "undefined") delay = 0;

	setTimeout(function(){
		
		totalVal *= 100;
		
		while(totalVal >= 5000) { totalVal -= 5000; addCoin(5000, origin, destination, animation); }			
		while(totalVal >= 1000) { totalVal -= 1000; addCoin(1000, origin, destination, animation); }			
		while(totalVal >= 100)  { totalVal -= 100; addCoin(100, origin, destination, animation); }	
		while(totalVal >= 50)   { totalVal -= 50; addCoin(50, origin, destination, animation); }	
		while(totalVal >= 10)   { totalVal -= 10; addCoin(10, origin, destination, animation); }	
		while(totalVal >= 5)    { totalVal -= 5; addCoin(5, origin, destination, animation); }	
		while(totalVal >= 1)    { totalVal -= 1; addCoin(1, origin, destination, animation); }
		
	 }, delay); 
}

function addCoin(val, origin, destination, animation)
{
	coin_status = animation;
	x_speed = 0;
	y_speed = 0;
	floor_extra_y = 0;
	
	if(animation == "BOUNCE RIGHT" || animation == "BOUNCE LEFT")
	{
		coin_status = "BOUNCE";
		x_speed = (Math.random() * 3 - 1) + 3/Math.sqrt(val);
		y_speed = -Math.random() * 3;
	}
	
	if(animation == "BOUNCE LEFT") x_speed = -x_speed;

	if(animation == "BOUNCE RIGHT EYES" || animation == "BOUNCE LEFT EYES")
	{
		coin_status = "BOUNCE";
		x_speed = (Math.random() * 5 + 13) + 3/Math.sqrt(val);
		y_speed = -(Math.random() * 3 + 6);
		
		floor_extra_y = -100;
	}
	
	if(animation == "BOUNCE LEFT EYES")
	{
		x_speed = (Math.random() * 5 - 9) - 3/Math.sqrt(val);
	}
		
	if(animation == "BOUNCE STAKE")
	{
		coin_status = "BOUNCE";
		x_speed = -(Math.random() * 3 + 3) - 2/Math.sqrt(val);
		y_speed = -(Math.random() * 7 + 10);
		floor_extra_y = -25;
	}
	
	// *** Add object
	coinCount++;
	key = "COIN" + coinCount;

	coin[key] = new Object;
	coin[key].coin_status = coin_status;
	coin[key].val = val;
	coin[key].x = spot[origin].x;
	coin[key].y = spot[origin].y;
	coin[key].x_speed = x_speed;
	coin[key].y_speed = y_speed;
	coin[key].floor = spot[origin].y + 100 + floor_extra_y;
	coin[key].x_dest = spot[destination].x;
	coin[key].y_dest = spot[destination].y;
	coin[key].origin = origin;
	coin[key].destination = destination;
	coin[key].opacity = 1;
	coin[key].show = true;
}

// *** Stars
function addStar(thisX, thisY, thisX_speed, thisY_speed)
{

	thisX_speed *= 1;
	thisY_speed *= 1;

	for(i = 1; i <= 20; i++)
	{	
		starCount++;
		keyStar = "STAR" + starCount;
		
		star[keyStar] = new Object;
		star[keyStar].x = thisX + Math.random() * 30 - 15;
		star[keyStar].y = thisY + Math.random() * 20 - 10;
		star[keyStar].x_speed = (thisX_speed / 10) * (Math.random() * 10);
		star[keyStar].y_speed = (thisY_speed / 10) * (Math.random() * 10);

		star[keyStar].opacity = Math.random() * 0.25 + 0.75;
	
		star[keyStar].size = 20 + Math.random() * 10;
		star[keyStar].size_speed = Math.random() * 10;
		
		star[keyStar].show = true;
	}
	
}