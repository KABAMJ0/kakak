// *** GAME FLOW

// *** Show playbutton and afterwards the preload bar
function showPlaybutton()
{	
	game["status"] = "PLAYBUTTON";
	addSunbeam(700, 350, 1, "BETWEEN");
}

// *** Show preload bar
function showPreloader()
{
	console.log("showPreloader (" + gameEngine["isTopWindow"] + ")");
	
	if(versionHTML != gameEngine["version"])
	{
		alert("Je hebt een verouderde versie (" + gameEngine["version"] + ") in je cache staan terwijl het spel aangeeft dat er een nieuwere is (" + versionHTML + "). Verwijder je cache of druk SHIFT+F5.");
	}
	else
	{
		// *** Android must be in fullscreen as navigation bars are too big
		if(gameEngine["isAndroid"] && gameEngine["isTopWindow"])
		{
			gameEngine["globalFullscreen"] = checkFullscreen(); // does not work in all browsers
			console.log("globalFullscreen: " + gameEngine["globalFullscreen"]);
			
			if(!gameEngine["globalFullscreen"]) toggleFullScreen();
			
			//if(!gameEngine["globalFullscreen"]) ge("fullscreen_phone").style.display = "table";
		}
			
		showPreloaderProceed();
	}
}

function showPreloaderProceed()
{
	game["status"] = "PRELOAD";
	console.log("Game status: " + game["status"]);

	loadManifest();

}

// *** Show intro screen
function showIntro()
{
	deleteAllO();
	
	game["status"] = "INTRO";
	
	if(!gameEngine["iOS"]) showIntroProceed();
}

function showIntroProceed()
{
	stopSound(game["music"]);
	game["music"] = playSound("music", true);
	//playSound("uitleg");
	
	gameEngine["playButtonIntroMessage"] = false;
}

// *** Start game (start playing)
function startGame()
{
	stopSound(game["music"]);
	game["music"] = "";

	game["score"] = 0;
	game["Time"] =0;
	
	for(key in o) delete o[key];
	for(key in particle) delete particle[key];

	game["status"] = "";
	
	newSpelWord();
	
	//mySlice = addO("ORANGE_SLICE", 700, 350);
	//myGlitterbox = addGlitterbox(350, 250, 250, 150)
	//myGlittercircle = addGlittercircle(475, 325, 75);
	
	//if(!gameEngine["isTabletSmartphone"]) mySunbeam = addSunbeam(1200, 500, 0.5, "BEHIND");

}


function TickTime(){

var vlag = 0;

for (key in penguin){if (penguin[key].phase == "walk"){vlag = 1}}	
	
	if(vlag == 0 && game["Time"] < game["TimePerWord"] && game["showLevelText"]<1){

	game["Time"] += 1;

	}
	
}

function LevelUp(){
	
game["WordsCount"]=0;
game["level"]+=1;
game["showLevelText"]=60;
if (game["level"]<10){game["TimePerWord"] -= 100;}
if (game["level"]<14){game["TimePerWord"] -= 250;}
if (game["level"]>13){game["TimePerWord"] -= 50;}

	
game["helps"] += 1;
playSound("levelup");
	
}





function newSpelWord()
{
	OneTime = 0;
	game["WordsCount"]+=1;
	if (game["WordsCount"]>0){game["score"]+=spelWord.length};
	
	for(key in penguin){delete penguin[key];}
	game["penguinCount"] = 0;
	game["SpelledWord"] = "";
	game["Time"] = 0;
	
	temp = spelPool.split(",");
		
	spelWord = temp[Math.floor(Math.random() * (temp.length - 1))];
	
	//spelWord = "bla";
	
	spelWord = spelWord.trim();
	
	console.log("newSpelWord: " + spelWord);
	
	game["PenguinStartX"] = 1400 - 700 - ((spelWord.length/2)*85)-90;
	
	spelWordY = -150;

	spelledWord = "";
	
	for (key in spelWord){
	NeededLetter = spelWord.substr(key,1)
	addPenguin(NeededLetter);
	}
	

}



function CheckPenguinClick(thisX,thisY){
	
	for (key in penguin){

	 if(thisX > (penguin[key].x + 90) && thisX < (penguin[key].x + 170) && thisY > (penguin[key].y + 30) && thisY < (penguin[key].y + 180) && penguin[key].visible == "true" && penguin[key].letter !== spelWord.substr(penguin[key].position-1,1)||thisX > (penguin[key].x + 90) && thisX < (penguin[key].x + 170) && thisY > (penguin[key].y + 30) && thisY < (penguin[key].y + 180) && penguin[key].visible == "true" && penguin[key].position-1 == game["SpelledWord"].length){
		
		
		
		penguin[key].ani=2;
		penguin[key].aniteller=2;
		penguin[key].visible="false" 
		penguin[key].phase = "jump"
		game["SpelledWord"] += penguin[key].letter;
	 
	 
	 	}


	}
	
	
	if(thisX > spot["SPELLEDWORD"].x + spelWord.length * 45 + 100 && thisX < spot["SPELLEDWORD"].x + spelWord.length * 45 + 100 + 60 && thisY > spot["buttonbackspace"].y && thisY < spot["buttonbackspace"].y + 60){
		
	keyboardKeyPressed("<<");
		
	}
	
	
	
	
}



// *** End game
function endGame()
{
	console.log("endGame");
	
	if(game["highscoreEmail"] != "")
	{
		highscoreSubmit();	
	}
	else
	{
		highscoreView();
	}
}


// *** INTERACTION

// *** Click in game
function click(thisX, thisY, scale)
{
	gameEngine["userInteractionOccured"] = true;

	
	if(!game["dragging"])
	{
		if(typeof scale === "undefined") scale = true;
		
		if(scale)
		{
			thisX = scaleX(thisX);
			thisY = scaleY(thisY);
		}
			
		console.log("click: " + Math.ceil(thisX) + ", " + Math.ceil(thisY));
		logGamePlay("click: " + Math.ceil(thisX) + ", " + Math.ceil(thisY));

		if(hitSpot(thisX, thisY, "CLOSE_ICON")) { if(confirm("Wil je het spel verlaten en terugkeren naar Spellingoefenen.nl?")) history.go(-1); }
		else if(!gameEngine["globalFullscreenDisabled"] && hitSpot(thisX, thisY, "FULLSCREEN_ICON")) toggleFullScreen();
		else if(!gameEngine["globalAudioDisabled"] && hitSpot(thisX, thisY, "SOUND_ICON")) switchSound();
		//else if(hitSpot(thisX, thisY, "KEYBOARD_ICON")) { if(keyboard["status"] == "hidden") showKeyboard("", true); else hideKeyboard(true); }		
		else if(keyboard["status"] == "show" && thisY > keyboard["yDest"]) clickKeyboard(thisX, thisY);		
		else if(game["status"] == "PLAYBUTTON")
		{
			if(hitSpot(thisX, thisY, "INTRO_PLAYBUTTON") && gameEngine["playButtonStatus"] == "PLAY") showPreloader();
		}
		else if(game["status"] == "INTRO")
		{
			if(hitTest(thisX, thisY, "INTRO_IOS_BUTTON", "button") && gameEngine["playButtonIntroMessage"]) showIntroProceed();
			else if(hitTest(thisX, thisY, "INTRO_PLAY_BUTTON", "button")) startGame();
			else if(hitTest(thisX, thisY, "INTRO_HIGHSCORE_BUTTON", "button")) endGame();
			
		}			
		else if(game["status"] == "")
		{
			//if(hitSpot(thisX, thisY, "DEMO_TITLE")) document.location = "https://www.gamedesign.nl";
			if(hitTest(thisX, thisY, "icebutton", "button")) HelpingPenguins();
			//else if(hitTest(thisX, thisY, "DEMO_BUTTON_2", "button")) startGame();
			//else if(hitTest(thisX, thisY, "DEMO_BUTTON_3", "button")) endGame();
			//else if(hitTest(thisX, thisY, "DEMO_BUTTON_4", "button")) highscoreOpen();
			//else if(hitTest(thisX, thisY, "DEMO_BUTTON_5", "button")) showMe("popup_share");
			//else if(hitTest(thisX, thisY, "DEMO_BUTTON_6", "button")) showKeyboard();
			//else if(hitTest(thisX, thisY, "DEMO_BUTTON_7", "button"))
			//{
				// *** Demo: change particle type
			//	game["demoParticleSelected"]++;
			//	if(typeof particlePrototype[game["demoParticleSelected"]] === "undefined") game["demoParticleSelected"] = 1;
				
			//	console.log("Change to particlePrototype: " + game["demoParticleSelected"]);
			//}
			else
			{
				
		
		
			CheckPenguinClick(thisX,thisY)
				
				
		
				
					
			}
		}
		else if(game["status"] == "HIGHSCORES")
		{
			if(hitTest(thisX, thisY, "HIGHSCORE_SUBMIT", "button")) { if(game["score"] > 0 && game["submitted"] == false) highscoreOpen(); }
			else if(hitTest(thisX, thisY, "HIGHSCORE_PLAY", "button")) { document.location = document.location; /* startGame(); */ }
			else if(hitSpot(thisX, thisY, "HIGHSCORE_SCROLL_TOP")) highscoreScroll("TOP");
			else if(hitSpot(thisX, thisY, "HIGHSCORE_SCROLL_UP")) highscoreScroll("UP");
			else if(hitSpot(thisX, thisY, "HIGHSCORE_SCROLL_USER")) highscoreScroll("USER");
			else if(hitSpot(thisX, thisY, "HIGHSCORE_SCROLL_DOWN")) highscoreScroll("DOWN");
			else if(hitSpot(thisX, thisY, "HIGHSCORE_SCROLL_BOTTOM")) highscoreScroll("BOTTOM");
		}		
	}
				
	endDrag();			
}

// *** Dragging starts
function drag(thisX, thisY)
{
	console.log("drag: " + Math.ceil(thisX) + ", " + Math.ceil(thisY));
}

// *** Dragging ends
function endDrag()
{
	gameEngine["userInteractionOccured"] = true;
	
	thisX = game["mouseX"];
	thisY = game["mouseY"];
		
	if(game["dragging"])
	{
		// *** At the end of a drag invoce a click (when playing an intended click can accidentally easily become a short drag)
		console.log("endDrag results in click: " + Math.ceil(thisX) + ", " + Math.ceil(thisY));
		game["dragging"] = false;
		click(thisX, thisY, false);
	}

	game["draggingX"] = 0;
	game["draggingY"] = 0;
	game["dragging"] = false;
	game["draggingCheck"] = false;

	
}


// *** (custom) Keyboard key pressed
function keyboardKeyPressed(thisKey)
{
	
	JustOnePenguin = 0;
	for(key in penguin){if (penguin[key].letter == thisKey && penguin[key].position-1 == game["SpelledWord"].length && penguin[key].visible == "true")					         {penguin[key].ani=2;
							  penguin[key].aniteller=2;
							  if(penguin[key].phase=="idle"){penguin[key].phase="jump";}
							  penguin[key].visible="false";
							  JustOnePenguin = 1;}}
	
	for(key in penguin){if (penguin[key].letter == thisKey && JustOnePenguin == 0 && penguin[key].visible == "true" && penguin[key].letter !== spelWord.substr(penguin[key].position-1,1)){penguin[key].ani=2;penguin[key].aniteller=2;
							if(penguin[key].phase=="idle"){penguin[key].phase="jump";}
							penguin[key].visible="false";
							JustOnePenguin = 1;}}
	
	console.log("keyboardKeyPressed: \"" + thisKey + "\"");
	
	
	
	if(thisKey == " ")
	{
	if(JustOnePenguin==1){game["SpelledWord"] += " ";}
	}
	else if(thisKey == "<<")
	{
			JustOnePenguin == 0
			
			//Eerst de groenen die dezelfde positie hebben als de weg te halen letter
			for(key in penguin){if (penguin[key].letter == game["SpelledWord"].substr(game["SpelledWord"].length-1,1) && penguin[key].position == game["SpelledWord"].length && penguin[key].visible == "false"){penguin[key].visible="true";JustOnePenguin = 1;}}
			
			
			for(key in penguin){
				 if(penguin[key].letter == game["SpelledWord"].substr(game["SpelledWord"].length-1,1) && JustOnePenguin == 0 && penguin[key].visible == "false" && penguin[key].letter !== spelWord.substr(penguin[key].position-1,1))
				 {
					penguin[key].visible="true";JustOnePenguin = 1;
				 }
			}

		game["SpelledWord"] = game["SpelledWord"].slice(0, -1)
	
	}
	else if(thisKey == "SHIFT")
	{
		if(keyboard.shift) keyboard.shift = false; else keyboard.shift = true;
	}	
	else if(thisKey == "OK")
	{
		hideKeyboard();
	}		
	else
	{
	if(JustOnePenguin==1){game["SpelledWord"] += thisKey} else{playSound("click");};
	}
}

function keyPress(e)
{
	e = e || window.event;

	pressKeyboard(e.key);
	
	/*
	if(keyboard["status"] != "hidden")
	{
		pressKeyboard(e.key);
	}
	else
	{		
		if 	(e.keyCode == '38' || e.keyCode == '87') 	{ console.log("keyPress UP"); }
		else if (e.keyCode == '40' || e.keyCode == '83') 	{ console.log("keyPress DOWN"); }
		else if (e.keyCode == '37' || e.keyCode == '65') 	{ console.log("keyPress LEFT"); }
		else if (e.keyCode == '39' || e.keyCode == '68') 	{ console.log("keyPress RIGHT"); }
		else if (e.keyCode == '13') 				{ console.log("keyPress ENTER"); }
	}
	*/
}

// *** Answer returns from AJAX request
function ajaxReturn(data)
{
	var answer = $.parseJSON(data);
	
	console.log("ajaxReturn: " + answer["a"]);
	console.log(answer);
	
	if(answer["a"] == "highscoreView" && answer["status"] == "OK")
	{
		game["highscoreList"] = answer;
		game["highscoreListScroll"] = parseInt(answer["highscore_list_scroll"]);
		game["highscoreListBusy"] = false;
		
		console.log("highscoreListScroll: " + game["highscoreListScroll"]);
		
	}
	else if(answer["status"] == "OK")
	{
		console.log("ajaxReturn: " + answer["status"]);	
	}
	else
	{
		console.error("highscoreView ERROR: " + answer["status"]);
		game["highscoreListBusy"] = false;
	}
	
	if(answer["a"] == "highscoreSubmit" && answer["status"] == "OK")
	{
		highscoreView();
	}

	if(answer["a"] == "getTaak" && answer["status"] == "OK")
	{
		console.log("ajaxReturn>getTaak");
		startWLTaakReturn(answer);
	}	
}



// *** FUNCTIONS

// *** Objects in game
function addO(thisPrototype, thisX, thisY, thisWidth, thisHeight, thisSpecial, thisZ)
{	
	if(typeof thisZ === "undefined") thisZ = "";

	game["keyCount"]++;
	thisKey = game["keyCount"];

	//console.log("addO " + thisKey + ": prototype " + thisPrototype + " at (" + thisX + ", " + thisY + ")");
	
	o[thisKey] = new Object;

	for(keyTempO in oPrototype[thisPrototype]) o[thisKey][keyTempO] = oPrototype[thisPrototype][keyTempO];
	
	o[thisKey].prototype = thisPrototype;
	o[thisKey].x = thisX;
	o[thisKey].y = thisY;
	o[thisKey].z = thisZ;

	if(typeof thisWidth !== "undefined") o[thisKey].width = thisWidth;
	if(typeof thisHeight !== "undefined") o[thisKey].height = thisHeight;
	if(typeof thisSpecial !== "undefined") o[thisKey].special = thisSpecial;
	
	if(typeof o[thisKey].width === "undefined") o[thisKey].width = false;
	if(typeof o[thisKey].height === "undefined") o[thisKey].height = false;
	if(typeof o[thisKey].special === "undefined") o[thisKey].special = false;
	
	//if(o[thisKey].category == "particles" && thisSpecial == "OPPOSITE") o[thisKey].position = "bottom"; 
		
	/*
	o[thisKey].xSpeed = oPrototype[thisPrototype].xSpeed;
	o[thisKey].ySpeed = oPrototype[thisPrototype].ySpeed;

	o[thisKey].r = oPrototype[thisPrototype].r;
	o[thisKey].rSpeed = oPrototype[thisPrototype].rSpeed;
		
	o[thisKey].manifest = oPrototype[thisPrototype].manifest;
	*/
	
	return(thisKey);
}

function addPenguin(Letter){
	
	game["penguinCount"]++;
	key = "PENGUIN" + game["penguinCount"];

	console.log("addPenguin: " + key);
	
	penguin[key] = new Object;
	
	penguin[key].width = 280;
	penguin[key].length = 185 + Math.ceil(Math.random() * 30);
	
	penguin[key].variant = Math.ceil(Math.random() * 3);
	
	penguin[key].ani = Math.ceil(Math.random() * 18);
	penguin[key].aniteller = penguin[key].ani;
	penguin[key].letter = Letter;
	penguin[key].position = game["penguinCount"];
	penguin[key].destination = game["penguinCount"];
	penguin[key].phase = "idle";
	penguin[key].visible = "true";
	penguin[key].age = 0;
	
	
	if(penguin[key].variant==3){penguin[key].y = 545;}
	if(penguin[key].variant==2){penguin[key].y = 535;}
	if(penguin[key].variant==1){penguin[key].y = 538;}
	
	penguin[key].y -= penguin[key].length; 
	
	penguin[key].x = game["PenguinStartX"]+ ((penguin[key].position-1) * 85);
	
		if(spelWord.length==game["penguinCount"]){MixPenguins()};
	
}


function MixPenguins(){


for(i = 1; i <= 50; i++){
	
 	
	RandomPenguin1 = Math.ceil(Math.random() * (game["penguinCount"]-1));
	RandomPenguin2 = Math.ceil(Math.random() * (game["penguinCount"]-1));

	StorePenguin1Position = penguin["PENGUIN"+RandomPenguin1].position;
	penguin["PENGUIN"+RandomPenguin1].position = penguin["PENGUIN"+RandomPenguin2].position;
	penguin["PENGUIN"+RandomPenguin2].position = StorePenguin1Position;
	

	}	
	
var AantalJuisteLetters = 0;	
	
for (key in penguin){
	if(penguin[key].letter==spelWord.substr(penguin[key].position-1,1)){
		AantalJuisteLetters += 1;
	}
}
	
var PercentageGoed = (AantalJuisteLetters/spelWord.length)*100;
	
console.log("Percentage goede letters: " + PercentageGoed)
	

	
if (spelWord.length>3){
	
	
	
	if(game["level"]<5 && PercentageGoed > 70||game["level"]<5 && PercentageGoed < 49){MixPenguins();}

	if(game["level"]>4 && game["level"]<10 && PercentageGoed > 55||game["level"]>4 && game["level"]<10 && PercentageGoed < 40){MixPenguins();}

	if(game["level"]>9 && game["level"]<15 && PercentageGoed > 40||game["level"]>9 && game["level"]<15 && PercentageGoed < 20){MixPenguins();}														
	if(game["level"]>14 && game["level"]<20 && PercentageGoed > 30||game["level"]>14 && game["level"]<20 && PercentageGoed < 10){MixPenguins();}

	if (game["level"]>19 && PercentageGoed > 10){MixPenguins();}	
																						
}

		
}



function HelpingPenguins(){
	

	
game["SpelledWord"] = ""
for (key in penguin){penguin[key].visible="true"}
	
OnlyOnePenguin = 0;
PositionCheck = new Array();
	
	
	for(key in penguin){
					
			
				if (penguin[key].letter == spelWord.substr(penguin[key].position-1,1)){ 
																					   
				
				PositionCheck[penguin[key].position] = 1;

				}

				else {PositionCheck[penguin[key].position] = 0;}
							
	}
	
	for(key in PositionCheck){console.log("Positie" + key + ": " +PositionCheck[key])}
			
			
	
	for(key in penguin){
		
			if (penguin[key].letter != spelWord.substr(penguin[key].position-1,1) && OnlyOnePenguin == 0 && game["helps"]>0){// Als er nog geen pinguin is vertrokken, zoek een pinguin die nog niet goed staat.
				
				for (keys in spelWord){ // Zoek de juiste positie waar deze pinguin naartoe moet.
					if(spelWord.substr(keys-1,1)==penguin[key].letter && PositionCheck[keys]==0){// Als positie in Spelword de juiste letter heeft en die positie heeft een 'vrije' pinguin
						OnlyOnePenguin = 1; 
						penguin[key].phase = "walk"; 
						penguin[key].destination = keys;
						
						StorePositionPenguin1 = penguin[key].position;
						StoreDestinationPenguin1 = penguin[key].destination;
						game["helps"] -= 1;
						playSound("askingpenguin");
						
					
					}
				
				}
		
			}	
		}
		
	for(key in penguin){
	
		if (OnlyOnePenguin == 1 && penguin[key].position == StoreDestinationPenguin1){// Als inmiddels een puinguin is vertrokken en deze pinguin staat op zijn aankomstplek
			
			penguin[key].phase = "walk";
			
			
			penguin[key].destination = StorePositionPenguin1		
			
			console.log("TerugDoel = " + penguin[key].destination)
		}
		
	}
	

}


// *** Particles
function addParticle(thisPrototype, thisX, thisY, thisZ)
{
	if(typeof thisZ === "undefined") thisZ = "";
	
	if(gameEngine["isTabletSmartphone"] && Math.random() > 0.5)
	{
		// *** Save CPU
	}
	else
	{
		
		game["keyCount"]++;
		thisKey = game["keyCount"];
		
		particle[thisKey] = new Object;
		
		particle[thisKey].prototype = thisPrototype;
		particle[thisKey].x = thisX;
		particle[thisKey].y = thisY;
		particle[thisKey].z = thisZ;
			
		particle[thisKey].xSpeed = particlePrototype[thisPrototype].xSpeed + particlePrototype[thisPrototype].xSpeedVariation * Math.random();
		particle[thisKey].xSpeedChange = particlePrototype[thisPrototype].xSpeedChange + particlePrototype[thisPrototype].xSpeedChangeVariation * Math.random();
		
		particle[thisKey].ySpeed = particlePrototype[thisPrototype].ySpeed + particlePrototype[thisPrototype].ySpeedVariation * Math.random();
		particle[thisKey].ySpeedChange = particlePrototype[thisPrototype].ySpeedChange + particlePrototype[thisPrototype].ySpeedChangeVariation * Math.random();
		
		particle[thisKey].size = particlePrototype[thisPrototype].size + particlePrototype[thisPrototype].sizeVariation * Math.random();
		particle[thisKey].sizeChange = particlePrototype[thisPrototype].sizeChange + particlePrototype[thisPrototype].sizeChangeVariation * Math.random();
		
		particle[thisKey].alpha = particlePrototype[thisPrototype].alpha + particlePrototype[thisPrototype].alphaVariation * Math.random();
		particle[thisKey].alphaChange = particlePrototype[thisPrototype].alphaChange + particlePrototype[thisPrototype].alphaChangeVariation * Math.random();
		
		tempParticleManifest = particlePrototype[thisPrototype].manifest;
		if(particlePrototype[thisPrototype].manifestVariation > 0 && Math.random() < particlePrototype[thisPrototype].manifestVariation) tempParticleManifest = particlePrototype[thisPrototype].manifestVariationManifest;
		particle[thisKey].manifest = tempParticleManifest;
	}
}

function renderParticles(thisZ)
{
	for(key in particle)
	{
		if(particle[key].z == thisZ)
		{
			context.globalAlpha = particle[key].alpha;
			tempSize = particle[key].size;
			
			// *** Flash
			if(particlePrototype[particle[key].prototype].flashChance > 0 && Math.random() < particlePrototype[particle[key].prototype].flashChance)
			{
				context.globalAlpha = 1; 
				tempSize *= particlePrototype[particle[key].prototype].flashSizeMultiplier;
			}
			
			drawImage(manifest[particle[key].manifest], particle[key].x, particle[key].y, tempSize, tempSize, false, false, false, true);
		}			      		
	}
	
	context.globalAlpha = 1; 
}	

function renderObjects(thisZ)
{
	// *** Objects
	for(key in o)
	{
		if(o[key].z == thisZ)
		{
			if(o[key].category == "sunbeam")
			{					
				for(i = 1; i <= 10; i++)
				{	
					if(!o[key].initialize)
					{
						
						context.globalAlpha = Math.sin(o[key][i].alpha)/10;
						drawImage(manifest["sunbeam"], o[key].x, o[key].y, manifest["sunbeam"].width * o[key].radius, manifest["sunbeam"].height * o[key].radius, o[key][i].r, false, false, true);
						
						
						/*
						context.globalAlpha = Math.sin(o[key][i].alpha)/10;
		
						var grd = context.createRadialGradient(o[key].x, o[key].y, 0, o[key].x, o[key].y, o[key].radius);
						grd.addColorStop(0,"white");
						grd.addColorStop(1, "rgba(255, 255, 255, 0)");
		
								
						context.beginPath();
						context.moveTo(o[key].x, o[key].y);
						context.arc(o[key].x, o[key].y, o[key].radius, o[key][i].r, o[key][i].r + o[key][i].width * Math.PI, false);
						context.fillStyle = grd;
						context.fill();
													
						context.beginPath();
						context.moveTo(o[key].x, o[key].y);
						context.arc(o[key].x, o[key].y, o[key].radius, o[key][i].r + toRadians(180), o[key][i].r + toRadians(180) + o[key][i].width * Math.PI, false);
						context.fillStyle = grd;
						context.fill();
						*/
					}
				}				
			}
			else
			{	
				proto = oPrototype[o[key].prototype];
				
				if(typeof o[key].manifest !== "undefined" && o[key].manifest != "")
				{			
					if(proto.hasShadow) drawImage(manifest[o[key].manifest + "_shadow"], o[key].x + 5, o[key].y + 5, true, true, false, false, false, true);
					drawImage(manifest[o[key].manifest], o[key].x, o[key].y, true, true, o[key].r, false, false, true);
				}
			}
		}
	}
	
	context.globalAlpha = 1; 
}
	
		
function applyShadow()
{
	context.shadowColor = "rgba(0, 0, 0, 1)";
	context.shadowOffsetX = 0;
	context.shadowOffsetY = 1;
	context.shadowBlur = 4;
}


function addGlitterbox(thisX, thisY, thisWidth, thisHeight)
{
	thisKey = addO("GLITTERBOX", thisX, thisY, thisWidth, thisHeight);
	return(thisKey);
}

function addGlittercircle(thisX, thisY, thisR)
{
	thisKey = addO("GLITTERCIRCLE", thisX, thisY); 
	o[thisKey].r = thisR;
	return(thisKey);
}

function addSunbeam(thisX, thisY, thisRadius, thisZ)
{
	thisKey = addO("SUNBEAM", thisX, thisY); 
	
	if(typeof thisRadius === "undefined") thisRadius = 1;
	if(typeof thisZ === "undefined") thisZ = "";
	
	o[thisKey].radius = thisRadius;
	o[thisKey].z = thisZ;
	
	return(thisKey);
}
