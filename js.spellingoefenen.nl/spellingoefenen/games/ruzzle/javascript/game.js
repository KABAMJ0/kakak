// *** START
function resetGame()
{
	game["wordsearchTimePerWord"] = 500;
	game["wordsearchTimeExtra"] = 300;
	
	score = 0;
	game_status = "";
	
	level = 1;
	spelWord = "";
	levelCorrectSpelwords = 0;
	spelledWordsCorrect = 0;
	lives = 5;
	
	play = true;
	
	setLevel(level);
	
	//newSpelWord();
		
	// *** Create word array
	//completeWL = "abc";
	
	if(completeWL.substr(completeWL.length-1) == ",") completeWL = completeWL.substr(0, completeWL.length-1);
	//console.log(completeWL);


	gameWoordenlijst = completeWL.split(",");
	getNewWords();
		
	wordsearchInitLevel();
	
	
}

function getNewWords()
{
	console.log("getNewWords for groep " + wordsGroep);
	console.log(gameWoordenlijst);
	
	wordsearchWords = new Array();
	tempWordcount = 0;
	tempWordAmount = Math.round(wordsGroep*0.1 + 2); // *** Aantal woorden per matrix
	//tempWordAmount = 2;
	
	for(i = 0; i < tempWordAmount; i++)
	{
		if(gameWoordenlijst.length > 0)
		{
			thisWordIndex = Math.floor((gameWoordenlijst.length-1)*Math.random());
			thisWord = gameWoordenlijst[thisWordIndex].trim();
			gameWoordenlijst.splice(thisWordIndex,1);
			
			console.log("- " + thisWord);
			
			if(thisWord.length > 2)
			{
				wordsearchWords[tempWordcount] = thisWord;
				tempWordcount++;
			}
		}
	}
	

	
	return(tempWordcount);
	
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
	//playSound("bloep");
	
	oldSpelWord = spelWord
	
	temp = spelPool.split(",");
		
	spelWord = temp[Math.floor(Math.random() * (temp.length - 1))];
	
	//spelWord = "bla";
	
	spelWord = spelWord.trim();
	
	if(spelWord==oldSpelWord){newSpelWord();}
	
	//spelWord += "toevoeging";
	
	console.log("newSpelWord: " + spelWord);
	
	spelWordPhase = "SHOW";
	spelWordY = -150;
	
	spelledWord = "";

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
				if(hitTest(thisX, thisY, "HIGHSCORE_SUBMIT", "button") && submitted == false) highscoreOpen();
				else if(hitTest(thisX, thisY, "HIGHSCORE_SHARE", "button")) showMe("popup_share");
				else if(hitTest(thisX, thisY, "HIGHSCORE_PLAY", "button")) resetGame();
				else if(hitTest(thisX, thisY, "HIGHSCORE_WL", "button")) showWL();
			}
			else if(game_status == "")
			{
				//wordsearchSelectCheck(thisX, thisY);
				
			}
			else
			{

			}
		}
	}
				
	endDrag();			
}

// *** Dragging starts
function drag(thisX, thisY)
{
	console.log("start drag: " + Math.ceil(thisX) + ", " + Math.ceil(thisY));
	//click(thisX, thisY, false); 
	
	wordsearchSelectCheck(thisX, thisY);
	
}

// *** Dragging ends
function endDrag()
{
	
	userInteractionOccured = true;
	
	thisX = mouse_x;
	thisY = mouse_y;

	console.log("end drag: " + Math.ceil(thisX) + ", " + Math.ceil(thisY));

	
	//if(dragging) console.log("endDrag: " + Math.ceil(thisX) + ", " + Math.ceil(thisY));
	
	dragging_x = 0;
	dragging_y = 0;
	dragging = false;
	dragging_check = false;
	
	wordsearchCheckSelectedWord();
	wordsearchUnselectBlocks();

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

	star[key_star].size = Math.random() * 30;
	
	if(Math.random() < 0.002) star[key_star].size *= 3;
	star[key_star].show = true;
}

	
function applyShadow()
{
	context.shadowColor = "rgba(0, 0, 0, 1)";
	context.shadowOffsetX = 0;
	context.shadowOffsetY = 4;
	context.shadowBlur = 4;

}