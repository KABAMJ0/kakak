// *** START
function resetGame()
{
	score = 0;
	game_status = "";
	
	level = 1;
	spelWord = "";
	levelCorrectSpelwords = 0;
	spelledWordsCorrect = 0;
	lives = 8;
	newSpelWord();
	play = true;
	FlappyPhase="START";
	FlappyRestart();
	
	for(key in bubble) delete bubble[key];
	//for(key in obstacle) delete obstacle[key];
	
	setLevel(level);
	StartBubbles();
	
	
	
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
	 
function StartBubbles(){
	
		
	setTimeout(function(){ 
	
		addBubble();
	
	 }, 100);
	 
	 setTimeout(function(){ 
	
		addBubble();
	
	 }, 2000);
	 
	 setTimeout(function(){ 
	
		addBubble();
	
	 }, 4000);
	
	setTimeout(function(){ 
	
		addBubble();
	
	 }, 6000);
	 
	setTimeout(function(){ 
	
		addBubble();
	
	 }, 8000);

setTimeout(function(){ 
	
		addBubble();
	
	 }, 10000);	
	
setTimeout(function(){ 
	
		addBubble();
	
	 }, 12000);	
	 
	 
}

function FlappyRestart(){
	
	FlappyPhase = "START";
	for(key in bubble) delete bubble[key];
	for(key in obstacle) delete obstacle[key];
	
	}

function setLevel(thisLevel)
{
	
	NieuwePijlen();
	playSound("levelup");
	
	level = thisLevel;
	
	if(level == 3){addBubble();addBubble();}
	
	if(level>1){
	showLevelText = 60;
	showLevelTextType = "LEVEL";
	}
	
		
	console.log("setLevel: " + level);
	
	if(level == 1)
	{
		manifestImage("bg1_level", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/balloonshoot/images/background1.png");			
	}
	
	if(level == 2||level==7)
	{
		setTimeout(function(){ 
	
		manifestImage("bg1_level", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/balloonshoot/images/background3.jpg");
	
	 }, 1000);
			
	}

	if(level == 3||level==8||level==12)
	
	{
		setTimeout(function(){ 
	
		manifestImage("bg1_level", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/balloonshoot/images/background2.jpg");
	
	 }, 1000);
		
	}
	
	if(level == 4||level==9||level==13)
	{
	
		setTimeout(function(){ 
	
		manifestImage("bg1_level", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/balloonshoot/images/background4.jpg");
	
	 }, 1000);
	}
	
	if(level == 5||level==10||level==14)
	{
	
		setTimeout(function(){ 
	
		manifestImage("bg1_level", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/balloonshoot/images/background5.jpg");
	
	 }, 1000);
	}
	
	if(level == 6||level == 11||level==15)
	{
	
		setTimeout(function(){ 
	
		manifestImage("bg1_level", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/balloonshoot/images/background1.png");
	
	 }, 1000);
	}
	

}

// *** SPELWORDS
function newSpelWord()
{
	
	NieuwePijlen()
	
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
	
	
	if (spelWord.length==1||spelWord=="au"||spelWord=="ou"||spelWord=="ui"||spelWord=="eu"||spelWord=="oe"||spelWord=="ee"||spelWord=="ei"||spelWord=="ij"||spelWord=="ie"||spelWord=="uu"||spelWord=="oo"||spelWord=="aa"){AudioWoord=true} else{AudioWoord=false}
	
	if (oldSpelWord!=spelWord){
		if (AudioWoord==true){setTimeout(function(){ voice(); }, 600);}
	}
}




function voice()
{
	console.log("voice (speak word again)");
	
	
	MySound = "../oefenen/sound/words/"+spelWord[0]+"/"+spelWord+".mp3"
	if (spelWord[0]=="'"){MySound = "sound/words/s/"+spelWord+".mp3"}
	
	var WordAudio = new Audio(replaceSpecialChars(MySound));
	
	
	WordAudio.play();
	
	

}



function replaceSpecialChars(t)
{
	t = t.split("ä").join("a");
	t = t.split("á").join("a");
	t = t.split("à").join("a");

	t = t.split("ë").join("e");
	t = t.split("é").join("e");
	t = t.split("è").join("e");

	t = t.split("ï").join("i");
	t = t.split("í").join("i");
	t = t.split("î").join("i");

	t = t.split("ö").join("o");
	t = t.split("ó").join("o");
	t = t.split("ò").join("o");

	t = t.split("ü").join("u");
	t = t.split("ú").join("u");
	t = t.split("ù").join("u");

	t = t.split("-").join("");
	t = t.split("'").join("");
	t = t.split("`").join("");
	t = t.split("?").join("");
	t = t.split("!").join("");
	t = t.toLowerCase();


	return(t);
}

function NieuwePijlen(){
	
	
if (level == 1){AantalPijlen = 12}	
if (level == 2){AantalPijlen = 12}
if (level == 3){AantalPijlen = 11}
if (level == 4){AantalPijlen = 11}
if (level == 5){AantalPijlen = 10}
if (level == 6){AantalPijlen = 9}
if (level == 7){AantalPijlen = 9}
if (level == 8){AantalPijlen = 8}
if (level == 9){AantalPijlen = 7}
if (level == 10){AantalPijlen = 7}
if (level == 11){AantalPijlen = 6}
if (level == 12){AantalPijlen = 6}
if (level == 13){AantalPijlen = 5}
if (level == 14){AantalPijlen = 5}
if (level == 15){AantalPijlen = 4}
	
	
	
	
}

// *** HELICOPTERS / FALLING LETTERS
function addBubble()
{
	
		
		bubbleCount++;
		keyBubble = "BUBBLE" + bubbleCount;
	
		//console.log("Added bubble " + keyBubble);
	
		bubble[keyBubble] = new Object;

		bubble[keyBubble].size = (80-(level*2)) + Math.random() * (30-(level*2));
		bubble[keyBubble].Ani = 1
		bubble[keyBubble].x = 700 + Math.random() * 650;
		bubble[keyBubble].y = 720 + Math.random() * 300;
		bubble[keyBubble].y_start = bubble[keyBubble].y;
		bubble[keyBubble].y_speed = ((level+5)/3) + Math.random() * 2;
		bubble[keyBubble].r = 0;
		bubble[keyBubble].x_speed = 0;
		bubble[keyBubble].r_speed = 1 + Math.random() * 5;
	
		bubble[keyBubble].aantalletters = Math.ceil(spelWord.length/4)

	
		bubble[keyBubble].model = Math.ceil(Math.random() * 5);

	
		bubble[keyBubble].phase = "FLY";
	
		if(Math.random() < 0.05)
		{
			randomLetter = 97 + Math.ceil(Math.random() * 25);
			bubble[keyBubble].letter = String.fromCharCode(randomLetter);
		}
		else
		{
			if(Math.random() < 0.6)
			{				
				// *** Juiste letter
				neededLetter = spelWord.substr(spelledWord.length, bubble[keyBubble].aantalletters);
				bubble[keyBubble].letter = neededLetter;
			}
			else
			{
			
				if(Math.random() < 0.9)
				{		
				
					neededLetter = spelWord.substr(spelledWord.length + 1, bubble[keyBubble].aantalletters);
					bubble[keyBubble].letter = neededLetter;
				}
				else if(Math.random() < 1)
				{		
				
					neededLetter = spelWord.substr(spelledWord.length + 2, bubble[keyBubble].aantalletters);
					bubble[keyBubble].letter = neededLetter;
				}			
			
				if(bubble[keyBubble].letter == "") {randomLetter = 97 + Math.ceil(Math.random() * 25); bubble[keyBubble].letter = String.fromCharCode(randomLetter);}
						
			}
			
			if(bubble[keyBubble].letter == "") {randomLetter = 97 + Math.ceil(Math.random() * 25); bubble[keyBubble].letter = String.fromCharCode(randomLetter);}
		}
	
	if(bubble[keyBubble].letter == "") {randomLetter = 97 + Math.ceil(Math.random() * 25); bubble[keyBubble].letter = String.fromCharCode(randomLetter);}
	
}

function addObstacle()
{
	obstacleCount++;
	key = "OBSTACLE" + obstacleCount;

	console.log("addObstacle: " + key);
	
	obstacle[key] = new Object;
	
	obstacle[key].x = 1450;
	obstacle[key].y = -530 + Math.random() * 300;
	ObstacleHeight = obstacle[key].y
	
	obstacle[key].x_speed = 6.3;
	
}

function addArrow()
{
	playSound("arrowswoosh");
	arrowCount++;
	key = "ARROW" + arrowCount;

	//console.log("addObstacle: " + key);
	
	arrow[key] = new Object;
	
	arrow[key].x = 110;
	arrow[key].y = 350;
	
	//arrow[key].x_speed = 140-((Math.abs(DraaiRichtingPijlenBoog/9*14)))
	//arrow[key].y_speed = (DraaiRichtingPijlenBoog/9)*-14
	
	arrow[key].x_speed = Math.abs(Math.cos(DraaiRichtingPijlenBoog  * Math.PI / 180)) *110
	arrow[key].y_speed = (Math.sin(DraaiRichtingPijlenBoog * Math.PI / 180)*-1) *110
	arrow[key].r = DraaiRichtingPijlenBoog;
	
}

function addFallingLetter(thisBubble)
{
	fallingLetterCount++;
	keyFL = "FALLINGLETTER" + fallingLetterCount;

	console.log("AddFallingLetter: " + keyBubble + " -> " + keyFL);
	
	fallingLetter[keyFL] = new Object;

	fallingLetter[keyFL].size = bubble[thisBubble].size;
	fallingLetter[keyFL].x = bubble[thisBubble].x;
	fallingLetter[keyFL].y = bubble[thisBubble].y;
	fallingLetter[keyFL].x_speed = bubble[thisBubble].x_speed;
	fallingLetter[keyFL].y_speed = bubble[thisBubble].y_speed - 5;
	fallingLetter[keyFL].letter = bubble[thisBubble].letter;

	/*
	bubble[keyBubble].x = 0 - bubble[keyBubble].size - Math.random() * 100;
	bubble[keyBubble].y = 150 + Math.random() * 400;
	bubble[keyBubble].y_start = bubble[keyBubble].y;
	bubble[keyBubble].y_speed = (Math.random() + 1) * bubbleWobble;
	bubble[keyBubble].r = 0;
	bubble[keyBubble].x_speed = ((bubble[keyBubble].size * 10) / (20 * 10)) * bubbleSpeed;
	bubble[keyBubble].r_speed = 1 + Math.random() * 5;
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

function GameOver()
{
	
			// *** Game over!
			spelWordPhase = "HIDE";
			showLevelText = 60;
			showLevelTextType = "GAME_OVER";					
	
}



function keyPress(e)
{
	
	
	
	e = e || window.event;
	
	
	if 	(e.keyCode == '16'){click()}
	else if (e.keyCode == '32') 	{click()}
	else if (e.keyCode == '13') 	{click()}
		


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
		
	else if(thisX >= spot["VOICE"].x && thisX <= spot["VOICE"].x + 60 && thisY >= spot["VOICE"].y && thisY <= spot["VOICE"].y + 60)
		{
			//*** Voice Button
			voice();
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
				
				klik(); 
			
			}
		}
	}
	endDrag();						
}

function klik(){
	
	
	
	
	}


function drag(thisX, thisY)
{
	
	DragStartPointX = thisX
	DragStartPointY = thisY
	
}

// *** Dragging ends
function endDrag()
{
	    if(dragged == true){
		addArrow();
		userInteractionOccured = true;
	
		
		}
		thisX = mouse_x;
		thisY = mouse_y;

	
	//if(dragging) console.log("endDrag: " + Math.ceil(thisX) + ", " + Math.ceil(thisY));
	
		dragging_x = 0;
		dragging_y = 0;
		dragging = false;
		dragging_check = false;
		dragged = false;
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
function addStar(X, Y, colornumber)
{
	starCount++;
	starkey = "STAR" + starCount;
	
	star[starkey] = new Object;
	star[starkey].x = X + Math.random() * 30 - 15;
	star[starkey].y = Y + Math.random() * 30 + 20;
	star[starkey].x_speed = Math.random() * 30 - 15;
	star[starkey].y_speed = -(Math.random() * 20);

	star[starkey].size = 60 + Math.random() * 20;
	star[starkey].color = colornumber;
	star[starkey].show = true;
}
