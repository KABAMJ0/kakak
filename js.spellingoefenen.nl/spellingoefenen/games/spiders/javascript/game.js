// *** START
function resetGame()
{
	score = 0;
	game_status = "";
	

	console.log("resetGame: " + gameResetted);
	
	for(key in spider) delete spider[key];
	
	gameResetted = true;
	
	level = 1;
	spelWord = "";
	levelCorrectSpelwords = 0;
	spelledWordsCorrect = 0;
	lives = 5;

	//newSpelWord();

	play = true;
		
	setLevel(level);
	showLevelText = 80;
	/*	
	addSpider(1, "spin");
	addSpider(2, "spinnetje");
	addSpider(3, "pizzabezorger");
	*/
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

	spelledWord = "";

	setTimeout(function(){ manifestImage("bg", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/bg_" + thisLevel + ".jpg"); }, 1000);

	if(thisLevel != 1) for(key in spider) retreatSpider(key);
	
	
	level = thisLevel;
	showLevelText = 100;
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
	//temp[10] = "PIZZABEZORGER"; // ************************* TEST
		
	spelWord = temp[Math.floor(Math.random() * (temp.length - 1))];
	
	//spelWord = "PIZZABEZORGER";
	
	spelWord = spelWord.trim();
	
	//spelWord = "ruïne";
	//if(spelWord==oldSpelWord){newSpelWord();}
	
	//spelWord += "toevoeging";
	
	console.log("newSpelWord: " + spelWord + " (length: " + spelWord.length + ")");
	
	//temp = spelWord.split("");

	//spelWordPhase = "SHOW";
	//spelWordY = -150;
	
	//spelledWord = "";
	
	if(spelWord.length <= 5) addSpider(1, spelWord);
	else if(spelWord.length >= 6 && spelWord.length <= 10) addSpider(2, spelWord);
	else addSpider(3, spelWord);

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
	
	addFlower(); 
	addFlower(); 
	growFlowers();
	
}

// *** INTERACTION
function removeWord()
{
	spelledWord = "";
}

function removeKey()
{
	spelledWord = spelledWord.substring(0, spelledWord.length - 1);
}
		
function addKey(thisKey)
{
	
	spelledWordFound = false;
	if(showLevelText <= 0)
	{
		//console.log("keyPress " + thisKey);
		//if(showKeyboard) 
		
		playSound("klak");
		
		ButtonEffect(thisKey);
		
		spelledWord += thisKey;
		spelledWordFound = false;
		
		for(key in spider)
		{
			if(replaceSpecialChars(spelledWord).indexOf(replaceSpecialChars(spider[key].word)) >= 0  && spelWord!="")
			{
				// *** Woord goed getypt!
				playSound("gunshot");
				addFloatWord(key);
				retreatSpider(key);
				spelledWordFound = true;			
			}
	
			
		}
	
		if(spelledWordFound)
		{
			spelledWord = "";
			spelledWordsCorrect++;
			
			if(level == 1 && spelledWordsCorrect >= 20) setLevel(2);
			if(level == 2 && spelledWordsCorrect >= 40) setLevel(3);				
			if(level == 3 && spelledWordsCorrect >= 60) setLevel(4);
			if(level == 4 && spelledWordsCorrect >= 80) setLevel(5);
			if(level == 5 && spelledWordsCorrect >= 100) setLevel(6);
			if(level == 6 && spelledWordsCorrect >= 130) setLevel(7);				
			if(level == 7 && spelledWordsCorrect >= 160) setLevel(8);
			if(level == 8 && spelledWordsCorrect >= 190) setLevel(9);
			if(level == 9 && spelledWordsCorrect >= 220) setLevel(10);
			
		}
		
		
	}
}

function replaceSpecialChars(t)
{
	t = t.split("Ä").join("A");
	t = t.split("Á").join("A");
	t = t.split("À").join("A");

	t = t.split("Ë").join("E");
	t = t.split("É").join("E");
	t = t.split("È").join("E");

	t = t.split("Ï").join("I");
	t = t.split("Í").join("I");
	t = t.split("Ì").join("I");

	t = t.split("Ö").join("O");
	t = t.split("Ó").join("O");
	t = t.split("Ò").join("O");

	t = t.split("Ü").join("U");
	t = t.split("Ú").join("U");
	t = t.split("Ù").join("U");

	t = t.split("-").join("");
	t = t.split("'").join("");
	t = t.split("`").join("");


	return(t);
}


function type(thisX, thisY){
	
	
	
		// *** Keyboard	
				if(showKeyboard)
				{		
					if(hitTest(thisX, thisY, "Q", "q")) 		{ addKey("Q"); }
					else if(hitTest(thisX, thisY, "W", "w")) 	{ addKey("W"); }
					else if(hitTest(thisX, thisY, "E", "e")) 	{ addKey("E"); }
					else if(hitTest(thisX, thisY, "R", "r")) 	{ addKey("R"); }
					else if(hitTest(thisX, thisY, "T", "t")) 	{ addKey("T"); }
					else if(hitTest(thisX, thisY, "Y", "y")) 	{ addKey("Y"); }
					else if(hitTest(thisX, thisY, "U", "u")) 	{ addKey("U"); }
					else if(hitTest(thisX, thisY, "I", "i")) 	{ addKey("I"); }
					else if(hitTest(thisX, thisY, "O", "o")) 	{ addKey("O"); }
					else if(hitTest(thisX, thisY, "P", "p")) 	{ addKey("P"); }
					else if(hitTest(thisX, thisY, "A", "a")) 	{ addKey("A"); }
					else if(hitTest(thisX, thisY, "S", "s")) 	{ addKey("S"); }
					else if(hitTest(thisX, thisY, "D", "d")) 	{ addKey("D"); }
					else if(hitTest(thisX, thisY, "F", "f")) 	{ addKey("F"); }
					else if(hitTest(thisX, thisY, "G", "g")) 	{ addKey("G"); }
					else if(hitTest(thisX, thisY, "H", "h")) 	{ addKey("H"); }
					else if(hitTest(thisX, thisY, "J", "j")) 	{ addKey("J"); }
					else if(hitTest(thisX, thisY, "K", "k")) 	{ addKey("K"); }
					else if(hitTest(thisX, thisY, "L", "l")) 	{ addKey("L"); }
					else if(hitTest(thisX, thisY, "Z", "z")) 	{ addKey("Z"); }
					else if(hitTest(thisX, thisY, "X", "x")) 	{ addKey("X"); }
					else if(hitTest(thisX, thisY, "C", "c")) 	{ addKey("C"); }
					else if(hitTest(thisX, thisY, "V", "v")) 	{ addKey("V"); }
					else if(hitTest(thisX, thisY, "B", "b")) 	{ addKey("B"); }
					else if(hitTest(thisX, thisY, "N", "n")) 	{ addKey("N"); }
					else if(hitTest(thisX, thisY, "M", "m")) 	{ addKey("M"); }
					
					else if(hitTest(thisX, thisY, "HoofdletterLeeg", "HoofdletterLeeg")) 			{ if(Shift==1){Shift=0;} else {Shift = 1; }}
					else if(hitTest(thisX, thisY, "Delete", "delete")) 					{ removeKey(); }
					else if(hitTest(thisX, thisY, "ok", "ok")) 						{ CheckSpelword(); ButtonEffect("ok")}
					else if(hitTest(thisX, thisY, "specialselected", "specialselected")) 			{ ShowExtraButtons();ButtonEffect("specialselected");}
					else if(hitTest(thisX, thisY, "etrema", "etrema") && ExtraButtons==1) 			{ addKey("Ë"); ShowExtraButtons();}
					else if(hitTest(thisX, thisY, "itrema", "itrema") && ExtraButtons==1) 			{ addKey("Ï"); ShowExtraButtons();}
					else if(hitTest(thisX, thisY, "eeen", "eeen") && ExtraButtons==1) 			{ addKey("É"); ShowExtraButtons();}
					else if(hitTest(thisX, thisY, "eelf", "eelf") && ExtraButtons==1) 			{ addKey("È"); ShowExtraButtons();}
					else if(hitTest(thisX, thisY, "buttonleeg", "buttonleeg") && ExtraButtons==1) 		{ addKey(" "); ShowExtraButtons();}
					else if(hitTest(thisX, thisY, "apostrof", "apostrof") && ExtraButtons==1) 		{ addKey("'"); ShowExtraButtons();}
					else if(hitTest(thisX, thisY, "tussenstreepje", "tussenstreepje") && ExtraButtons==1) 	{ addKey("-"); ShowExtraButtons();}
					else if(hitTest(thisX, thisY, "atrema", "atrema") && ExtraButtons==1) 			{ addKey("Ä"); ShowExtraButtons();}
				}
	
	
	
}




function keyPress(e)
{
	e = e || window.event;
		
	if(e.keyCode >= '32' && e.keyCode <= '165')
	{
		thisKey = String.fromCharCode(e.keyCode).toUpperCase();
		addKey(thisKey);				
	}
	if(e.keyCode == '13') removeWord();
	if(e.keyCode == '8') removeKey();
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
		else if(thisX >= spot["KEYBOARD_ICON"].x && thisX <= spot["KEYBOARD_ICON"].x + 60 && thisY >= spot["KEYBOARD_ICON"].y && thisY <= spot["KEYBOARD_ICON"].y + 60)
		{
			// *** Keyboard-button
			switchKeyboard();
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
				type(thisX, thisY)
			}
		}
	}
				
	endDrag();			
}

// *** Keyboard
function ButtonEffect(ButtonName)
{	
	if(typeof spot[ButtonName] === "undefined")
	{
		// Keyboard button bestaat niet
	}
	else
	{
		spot[ButtonName].y +=4; 
		setTimeout(function(){ spot[ButtonName].y -=4; }, 140);	
	}
}

function ShowExtraButtons(){if(ExtraButtons==1){ExtraButtons = 0;} else{ExtraButtons = 1;} }

function switchKeyboard()
{
	playSound("sword");
	if(showKeyboard) showKeyboard = false; else showKeyboard = true;
}


// *** Dragging starts
function drag(thisX, thisY)
{
	type(thisX, thisY)
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

function addSpider(spiderType, spiderWord)
{
	spiderCount++;
	key_spider = "SPIDER" + spiderCount;
	
	console.log("addSpider: " + key_spider);
	
	spider[key_spider] = new Object;
	spider[key_spider].x = 200 + Math.random() * 1000;
	spider[key_spider].y = -spider_info[spiderType].height - 10;
	spider[key_spider].x_speed = 0;
	spider[key_spider].speed = spider_info[spiderType].speed;
	spider[key_spider].y_fall_speed = spider_info[spiderType].speed - (4-(level/3)) + Math.random() * 5;
	spider[key_spider].y_speed = spider[key_spider].y_fall_speed;
	spider[key_spider].y_speed_redemption = spider_info[spiderType].speed_redemption;

	spider[key_spider].wobble = 0;
	spider[key_spider].wobble_speed = spider_info[spiderType].wobble; // + Math.random() * 2;

	spider[key_spider].wobble1 = 0;
	spider[key_spider].wobble2 = 0;
	spider[key_spider].wobble3 = 0;
	spider[key_spider].wobble4 = 0;
	spider[key_spider].wobble5 = 0;

	spider[key_spider].blink = 0;
	spider[key_spider].word = spiderWord.toUpperCase();;
	spider[key_spider].status = "DROP";

	spider[key_spider].spidertype = spiderType;
	
}

function retreatSpider(key)
{
	spider[key].status = "RETREAT";

	spider[key].plate_x = spider[key].x + spider_info[spider[key].spidertype].plate_x;
	spider[key].plate_y = spider[key].y + spider_info[spider[key].spidertype].plate_y;

	spider[key].plate_x_speed = spider[key].wobble3;
	spider[key].plate_y_speed = 0;
}

function addFloatWord(key_spider)
{
	// *** key_spider: key of spider to create floatword from
	floatWordCount++;
	key_word = "WORD" + floatWordCount;
	
	console.log("addFloatWord: " + key_word + " from spider " + key_spider);

	info = spider_info[spider[key_spider].spidertype];

	wobble_plate = spider[key_spider].wobble3;
	if(!info.wobble_plate) wobble_plate = spider[key_spider].wobble;
	
		
	floatWord[key_word] = new Object;
	floatWord[key_word].x = spider[key_spider].x + wobble_plate + info.text_x;
	floatWord[key_word].x_speed = 0;
	floatWord[key_word].y = spider[key_spider].y + info.text_y;
	floatWord[key_word].y_speed = 0;
	floatWord[key_word].alpha = 1;
	
	floatWord[key_word].word = spider[key_spider].word;
	floatWord[key_word].wordSize = 20;
	
	
}