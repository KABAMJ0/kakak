// *** START
function resetGame()
{
	score = 0;
	game_status = "";
	
	level = 1;
	spelWord = "";
	levelCorrectSpelwords = 0;
	spelledWordsCorrect = 0;
	lives = 5;
	newSpelWord();
	play = true;
	
	for(key in heli) delete heli[key];
	for(key in bomb) delete heli[key];
	
	setLevel(level);
	
	//newSpelWord();
	
	addHeli();
	addHeli();
	
	setTimeout(function(){ 
	
		addHeli();
		addHeli();
	
	 }, 3000);
	
	setTimeout(function(){ 
	
		addHeli();
		addHeli();
	
	 }, 6000);
	 
	setTimeout(function(){ 
	
		addHeli();
		addHeli();
	
	 }, 9000);
	 
	 setTimeout(function(){ 
	
		addHeli();
		addHeli();
	
	 }, 12000);
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

function setLevel(thisLevel)
{
	playSound("cymbals");
	
	level = thisLevel;
	showLevelText = 100;
	showLevelTextType = "LEVEL";
	bombTimer = 0;
	
	console.log("setLevel: " + level);
	
	if(level == 1)
	{
		manifestImage("bg1_level", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/images/bg1_level_1.jpg");
		manifestImage("bg2_level", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/images/bg2_level_1.png");
		manifestImage("bg3_level", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/images/bg3_level_1.png");		
	}
	
	if(level >= 3 && level <= 5)
	{
		manifestImage("bg1_level", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/images/bg1_level_2.jpg");
		manifestImage("bg2_level", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/images/bg2_level_2.png");
		manifestImage("bg3_level", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/images/bg3_level_2.png");		
	}
	
	if(level >= 6 && level <= 9)
	{
		manifestImage("bg1_level", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/images/bg1_level_3.jpg");
		manifestImage("bg2_level", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/images/bg2_level_3.png");
		manifestImage("bg3_level", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/images/bg3_level_3.png");		
	}
	
	if(level >= 10)
	{
		manifestImage("bg1_level", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/images/bg1_level_4.jpg");
		manifestImage("bg2_level", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/images/bg2_level_4.png");
		manifestImage("bg3_level", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/images/bg3_level_4.png");		
	}
	
	heliWobble = (thisLevel - 1) / 1.2;
	heliWobbleSpeed = (thisLevel) / 17;	
	heliSpeed = 1.2 + (thisLevel - 1) / 10;
}

// *** SPELWORDS
function newSpelWord()
{
	//alert(manifest_count + " / " + manifest_total);
	playSound("bloep");
	
	oldSpelWord = spelWord
	
	temp = spelPool.split(",");
		
	spelWord = temp[Math.floor(Math.random() * (temp.length - 1))];
	
	//spelWord = "bla";
	
	spelWord = spelWord.trim();
	
	if(spelWord==oldSpelWord){newSpelWord();}
	
	console.log("newSpelWord: " + spelWord);
	
	spelWordPhase = "SHOW";
	spelWordY = -150;
	
	spelledWord = "";

}

// *** HELICOPTERS / FALLING LETTERS
function addHeli()
{
	heliCount++;
	keyHeli = "HELI" + heliCount;
	
	//console.log("Added heli " + keyHeli);
	
	heli[keyHeli] = new Object;

	heli[keyHeli].size = 120 + Math.ceil(Math.random() * 70);

	heli[keyHeli].x = 0 - heli[keyHeli].size - Math.random() * 200;
	heli[keyHeli].y = 50 + Math.random() * 400;
	heli[keyHeli].y_start = heli[keyHeli].y;
	heli[keyHeli].y_speed = (Math.random() + 1) * heliWobble;
	heli[keyHeli].r = 0;
	heli[keyHeli].x_speed = ((heli[keyHeli].size * 7) / (20 * 10)) * heliSpeed;
	heli[keyHeli].r_speed = 1 + Math.random() * 5;
	
	if(level <= 5)
	{
		heli[keyHeli].model = Math.ceil(Math.random() * 3) + 1;
	}
	else
	{
		heli[keyHeli].model = Math.ceil(Math.random() * 4);
	}
	
	heli[keyHeli].phase = "FLY";
	
	if(Math.random() < 0.2 && showLevelText <= 0)
	{
		randomLetter = 97 + Math.ceil(Math.random() * 25);
		heli[keyHeli].letter = String.fromCharCode(randomLetter);
	}
	else
	{
		if(Math.random() < 0.5)
		{				
			// *** Juiste letter
			neededLetter = spelWord.substr(spelledWord.length, 1);
			heli[keyHeli].letter = neededLetter;
		}
		else
		{
			
			if(Math.random() < 0.2)
			{		
				//console.log("Twee vooruit: " + spelledWord.length + " / " + spelWord.length);
				neededLetter = spelWord.substr(spelledWord.length + 3, 1);
				heli[keyHeli].letter = neededLetter;
			}
			else if(Math.random() < 0.2)
			{		
				//console.log("Twee vooruit: " + spelledWord.length + " / " + spelWord.length);
				neededLetter = spelWord.substr(spelledWord.length + 2, 1);
				heli[keyHeli].letter = neededLetter;
			}			
			else
			{		
				neededLetter = spelWord.substr(spelledWord.length + 1, 1);
				heli[keyHeli].letter = neededLetter;
			}
			
			if(heli[keyHeli].letter == "") heli[keyHeli].letter = spelWord.substr(spelledWord.length, 1);
						
		}
	}
}

function addBomb()
{
	playSound("phaser");
	bombCount++;
	key = "BOMB" + bombCount;

	console.log("addBomb: " + key);
	
	bomb[key] = new Object;
	
	bomb[key].x = -1000 + Math.random() * 100;
	bomb[key].y = 650;
	
	bomb[key].x_speed = 22 + Math.random() * 2;
	bomb[key].y_speed = -25 + Math.random() * 2;
	
	
}

function addFallingLetter(thisHeli)
{
	fallingLetterCount++;
	keyFL = "FALLINGLETTER" + fallingLetterCount;

	console.log("AddFallingLetter: " + keyHeli + " -> " + keyFL);
	
	fallingLetter[keyFL] = new Object;

	fallingLetter[keyFL].size = heli[thisHeli].size;
	fallingLetter[keyFL].x = heli[thisHeli].x;
	fallingLetter[keyFL].y = heli[thisHeli].y;
	fallingLetter[keyFL].x_speed = heli[thisHeli].x_speed;
	fallingLetter[keyFL].y_speed = heli[thisHeli].y_speed - 5;
	fallingLetter[keyFL].letter = heli[thisHeli].letter;

	/*
	heli[keyHeli].x = 0 - heli[keyHeli].size - Math.random() * 100;
	heli[keyHeli].y = 150 + Math.random() * 400;
	heli[keyHeli].y_start = heli[keyHeli].y;
	heli[keyHeli].y_speed = (Math.random() + 1) * heliWobble;
	heli[keyHeli].r = 0;
	heli[keyHeli].x_speed = ((heli[keyHeli].size * 10) / (20 * 10)) * heliSpeed;
	heli[keyHeli].r_speed = 1 + Math.random() * 5;
	*/
	
	
}

function addExplosion(thisXExplosion, thisYExplosion, thisSize)
{
	explosionCount++;
	keyExplosion = "EXPLOSION" + explosionCount;
	
	//console.log("Added explosion " + keyExplosion);
	
	explosion[keyExplosion] = new Object;

	explosion[keyExplosion].x = thisXExplosion;
	explosion[keyExplosion].y = thisYExplosion;
	explosion[keyExplosion].x_speed = -3;
	explosion[keyExplosion].y_speed = 0;
	explosion[keyExplosion].ani = 1;
	explosion[keyExplosion].size = thisSize;
	
	playSound("explosion_sound");
	
}

function looseLive()
{
	if(showLevelText <= 0)
	{
		playSound("error");
		
		lives--;
		
		if(lives <= 0)
		{
			// *** Game over!
			playSound("cymbals");
			spelWordPhase = "HIDE";
			showLevelText = 100;
			showLevelTextType = "GAME_OVER";					
		}
	}
}

// *** INTERACTION
function shoot(thisX, thisY)
{
	if(showLevelText <= 0)
	{
		playSound("gunshot");
		
		for(i = 1; i <= 10; i++) addStar(thisX, thisY);

		bombShot = false;
		
		for(key in bomb)
		{
			if(thisX > bomb[key].x && thisX < bomb[key].x + 100 && thisY > bomb[key].y && thisY < bomb[key].y + 100)
			{
				console.log("Bomb shot");
				addExplosion(bomb[key].x, bomb[key].y, 600);
				delete bomb[key];
				
				bombShot = true;
			}			
		}
		
		if(!bombShot)
		{		
			tempShotDownSize = 0;
			tempShotDown = "";		
			
			for(key in heli)
			{
				if(thisX > heli[key].x - (heli[key].size / 2) && thisX < heli[key].x + (heli[key].size / 2) && thisY > heli[key].y - (heli[key].size / 6) && thisY < heli[key].y + (heli[key].size / 6))
				{
					if(heli[key].size > tempShotDownSize)
					{
						tempShotDownSize = heli[key].size;
						tempShotDown = key;
					}
				}
			
			}
			
			if(tempShotDown != "")
			{
				if(heli[tempShotDown].phase == "FLY")
				{
					//console.log("Shot " + tempShotDown);
					
					playSound("falling");
					
					heli[tempShotDown].phase = "FALL";
					
					neededLetter = spelWord.substr(spelledWord.length, 1);
					
					if(heli[tempShotDown].letter == neededLetter)
					{
						// *** Right letter
						spelError = 0;
						spelledWord += neededLetter;
						
						//addFallingLetter(tempShotDown);
						
						if(spelledWord == spelWord)
						{
							// *** Word complete
							spelWordPhase = "HIDE";
							
							levelCorrectSpelwords++;
							spelledWordsCorrect++;
							
							if(levelCorrectSpelwords >= levelCorrectSpelwordsRequired)
							{
								levelCorrectSpelwords = 0;
								setLevel(level + 1);
							}
							
							//heliWobble++;
						}
					}
					else
					{
						
						spelError = 50;
						looseLive();
					
					}
					
				}
				
				if(heli[tempShotDown].phase == "FALL")
				{			
					heli[tempShotDown].r_speed *= 2;
					if(heli[tempShotDown].r_speed < 5) heli[tempShotDown].r_speed = 5;
					if(heli[tempShotDown].r_speed > 25) heli[tempShotDown].r_speed = 25;
				}
			}
		}
	}
}

// *** Click in game
function click(thisX, thisY, scale)
{
	userInteractionOccured = true;
	
	if(!dragging)
	{
		if(typeof scale === "undefined") scale = true;
		
		if(scale)
		{
			thisX = scaleX(thisX);
			thisY = scaleY(thisY);
		}
			
		//console.log("click: " + Math.ceil(thisX) + ", " + Math.ceil(thisY));
	
		// *** Game actions here
		//addCoins(1, "MOUSE", "STAR_SOURCE", "BOUNCE LEFT EYES");

		if(thisX >= spot["SOUND_ICON"].x && thisX <= spot["SOUND_ICON"].x + 60 && thisY >= spot["SOUND_ICON"].y && thisY <= spot["SOUND_ICON"].y + 60)
		{
			// *** Sound on/off
			switchSound();
		}
		else if(thisX >= spot["BUTTON_X"].x && thisX <= spot["BUTTON_X"].x + 60 && thisY >= spot["BUTTON_X"].y && thisY <= spot["BUTTON_X"].y + 60)
		{
			// *** X-button
			if(confirm('Wil je het spel verlaten?') == true) { history.go(-1); }
			
			/*			
			showLevelText = 0;
			lives = 1;
			looseLive();
			*/
		}		
		else if(thisX >= spot["FULLSCREEN_ICON"].x && thisX <= spot["FULLSCREEN_ICON"].x + 60 && thisY >= spot["FULLSCREEN_ICON"].y && thisY <= spot["FULLSCREEN_ICON"].y + 60)
		{
			// *** Fullscreen-button
			 toggleFullScreen();
		}							
		else
		{		
			if(game_status == "HIGHSCORES")
			{
				if(hitTest(thisX, thisY, "HIGHSCORE_SUBMIT", "button")) highscoreOpen();
				else if(hitTest(thisX, thisY, "HIGHSCORE_SHARE", "button")) showMe("popup_share");
				else if(hitTest(thisX, thisY, "HIGHSCORE_PLAY", "button")) resetGame();
				else if(hitTest(thisX, thisY, "HIGHSCORE_WL", "button")) showWL();
			}		
			else
			{
		
				shoot(thisX, thisY); 
				
			}
		}
	}
				
	endDrag();			
}

// *** Dragging starts
function drag(thisX, thisY)
{
	//console.log("drag: " + Math.ceil(thisX) + ", " + Math.ceil(thisY));
	shoot(thisX, thisY); 
	
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


// *** FUNCTIONS

// *** Coins
function addCoins(totalVal, origin, destination, animation, delay)
{
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
function addStar(thisX, thisY)
{
	starCount++;
	key = "STAR" + starCount;
	
	star[key] = new Object;
	star[key].x = thisX + Math.random() * 30 - 15;
	star[key].y = thisY + Math.random() * 20 - 10;
	star[key].x_speed = Math.random() * 10 - 5;
	star[key].y_speed = -(Math.random() * 10);

	star[key].size = 60 + Math.random() * 30;
	
	if(Math.random() < 0.002) star[key].size *= 3;
	star[key].show = true;
}
