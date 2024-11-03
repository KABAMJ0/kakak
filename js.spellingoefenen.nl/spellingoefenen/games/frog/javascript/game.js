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
	
	for(key in flower)
	{
	
	delete flower[key];
		
	}		
		
	setLevel(level);
	
	//newSpelWord();
	
	addFlower();
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
	//playSound("cymbals");
	
	level = thisLevel;
	//showLevelText = 100;
	showLevelTextType = "LEVEL";

	console.log("setLevel: " + level);

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
	
	//spelWord += "toevoeging";
	
	console.log("newSpelWord: " + spelWord);
	
	temp = spelWord.split("");

	for(i = 0; i < 8; i++)
	{
		stone_letter[(i + 1)] = "";
		stone_letter_color[(i + 1)] = 0;
		
		for(jj = 1; jj <= 10; jj++) addStar(spot["STONE_" + (i + 1)].x + spot["STONE_" + (i + 1)].w/2, spot["STONE_" + (i + 1)].y + spot["STONE_" + (i + 1)].h/2 - 30);
	}
		
	for(i = 0; i < 8; i++)
	{
		position = 0;
	
		while(position == 0)
		{
			temp_position = Math.ceil(Math.random() * 8);
			if(stone_letter[temp_position] == "") position = temp_position;
		}

		if(typeof temp[i] === "undefined")
		{
			stone_letter[position] = String.fromCharCode(Math.ceil(Math.random() * 25) + 96); // A = 65
		}
		else
		{
			//console.log("position " + position + " gets " + temp[i]);
			stone_letter[position] = temp[i];
			
		}

	}
	
	spelWordPhase = "SHOW";
	spelWordY = -150;
	
	spelledWord = "";

}

/*
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

}
*/

function looseLive()
{
	if(showLevelText <= 0)
	{
		playSound("error");
		
		lives--;
		
		if(lives <= 0)
		{
			// *** Game over!
			frog.jump_queue	= "";
			playSound("bloep");
			spelWordPhase = "HIDE";
			showLevelText = 100;
			showLevelTextType = "GAME_OVER";					
		}
	}
}

function spelledWordCorrect()
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
	
	addFlower(); 
	addFlower(); 
	growFlowers();
	
}

// *** INTERACTION

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
				if(lives > 0)
				{
					for(ii = 1; ii <= 8; ii++)		
					{
						if(thisX >= spot["STONE_" + ii].x && thisX <= spot["STONE_" + ii].x + spot["STONE_" + ii].w && thisY >= spot["STONE_" + ii].y && thisY <= spot["STONE_" + ii].y + spot["STONE_" + ii].h)
						{
							frog.jump_queue += ii;				
						}
					}
				}
			}
		}
	}
				
	endDrag();			
}

// *** Dragging starts
function drag(thisX, thisY)
{
	//console.log("drag: " + Math.ceil(thisX) + ", " + Math.ceil(thisY));
	//shoot(thisX, thisY); 
	
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

// *** Stars
function addStar(thisX, thisY)
{
	starCount++;
	key_star = "STAR" + starCount;
	
	star[key_star] = new Object;
	star[key_star].x = thisX + Math.random() * 30 - 15;
	star[key_star].y = thisY + Math.random() * 20 - 10;
	star[key_star].x_speed = Math.random() * 6 - 4;
	star[key_star].y_speed = (Math.random() * 6) - 4;

	star[key_star].size = 60 + Math.random() * 30;
	
	if(Math.random() < 0.002) star[key_star].size *= 3;
	star[key_star].show = true;
}

function addFlower()
{
	if(flowerSpot < 50)
	{
		console.log("addFlower");
	
		flowerCount++;
		key = "STAR" + flowerCount;
	
		flowerSpot++;
		if(flowerSpot > 50) flowerSpot = 1;
		
		flower[key] = new Object;
		flower[key].x = spot["FLOWERSPOT_" + flowerSpot].x;
		flower[key].y = spot["FLOWERSPOT_" + flowerSpot].y;

		//for(i = 1; i <= 5; i++) addStar(spot["FLOWERSPOT_" + flowerSpot].x, spot["FLOWERSPOT_" + flowerSpot].y);
	
		flower[key].size = 1;
		flower[key].distance = spot["FLOWERSPOT_" + flowerSpot].d;
	}	
}

function growFlowers()
{
	for(key in flower)
	{
		flower[key].size += 1;
		//if(flower[key].size > 34) delete flower[key];
		
	}			
}