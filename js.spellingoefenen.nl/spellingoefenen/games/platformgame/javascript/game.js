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
	//stopSound(game["music"]);
	//game["music"] = playSound("music", true);
	//playSound("uitleg");
	
	gameEngine["playButtonIntroMessage"] = false;
}

// *** Start game (start playing)
function startGame()
{
	
	
	
	pressedKeys = [];
	
	AddCharacter(game["CharacterX"],game["CharacterX"]);
	//stopSound(game["music"]);
	game["music"] = playSound("music", true);

	game["score"] = 0;
	game["gameover"] = false;
	
	for(key in o) delete o[key];
	for(key in particle) delete particle[key];

	game["status"] = "";

	newSpelWord();
	
	//mySlice = addO("ORANGE_SLICE", 700, 350);
	//myGlitterbox = addGlitterbox(350, 250, 250, 150)
	//myGlittercircle = addGlittercircle(475, 325, 75);
	
	//if(!gameEngine["isTabletSmartphone"]) mySunbeam = addSunbeam(1200, 500, 0.5, "BEHIND");

}

function newSpelWord()
{


	SpelWordOld = game["spelword"];

	game["spelledword"] = "";
	
	
	temp = spelPool.split(",");
		
	game["spelword"] = temp[Math.floor(Math.random() * (temp.length - 1))];
	
	
	game["spelword"] = game["spelword"].trim();
	
	if(game["spelword"] == SpelWordOld){newSpelWord()}
	
	console.log("newSpelWord: " + game["spelword"]);
	
	
	
	

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
		else if(!gameEngine["globalAudioDisabled"] && hitSpot(thisX, thisY, "SOUND_ICON")) 
		{
			switchSound();
			if (game["music"]!=""){stopSound(game["music"]);game["music"]=false;}
			else {game["music"] = playSound("music", true);}
		}
		
		
		else if(hitSpot(thisX, thisY, "MUSIC_ICON"))
		{
		if (game["music"]!=""){stopSound(game["music"]);game["music"]=false;}
		else {game["music"] = playSound("music", true);}
				
				
		}
		
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
			if(hitSpot(thisX, thisY, "DEMO_TITLE")) document.location = "https://www.gamedesign.nl";
			//else if(hitTest(thisX, thisY, "DEMO_BUTTON_1", "button")) showIntro();
			//else if(hitTest(thisX, thisY, "DEMO_BUTTON_2", "button")) startGame();
			//else if(hitTest(thisX, thisY, "DEMO_BUTTON_3", "button")) endGame();
			//else if(hitTest(thisX, thisY, "DEMO_BUTTON_4", "button")) highscoreOpen();
			//else if(hitTest(thisX, thisY, "DEMO_BUTTON_5", "button")) showMe("popup_share");
			//else if(hitTest(thisX, thisY, "DEMO_BUTTON_6", "button")) showKeyboard();
			//else if(hitTest(thisX, thisY, "DEMO_BUTTON_7", "button"))
			//{
				// *** Demo: change particle type
				//game["demoParticleSelected"]++;
				//if(typeof particlePrototype[game["demoParticleSelected"]] === "undefined") game["demoParticleSelected"] = 1;
				
				//console.log("Change to particlePrototype: " + game["demoParticleSelected"]);
			//}
			else
			{
				//if(thisX<20){StartLevel(1);game["level"] = 1;}
				//else if(thisX>20 && thisX<40){StartLevel(2);game["level"] = 2;}
				//else if(thisX>40 && thisX<60){StartLevel(3);game["level"] = 3;}
				//else if(thisX>60 && thisX<80){StartLevel(4);game["level"] = 4;}
				//else if(thisX>80 && thisX<100){StartLevel(5);game["level"] = 5;}
				//else if(thisX>100 && thisX<120){StartLevel(6);game["level"] = 6;}
				//else if(thisX>120 && thisX<140){StartLevel(7);game["level"] = 7;}
				//else if(thisX>140 && thisX<160){StartLevel(8);game["level"] = 8;}
				//else if(thisX>160 && thisX<180){StartLevel(9);game["level"] = 9;}
				//else if(thisX>180 && thisX<200){StartLevel(10);game["level"] = 10;}
				//else if(thisX>200 && thisX<220){StartLevel(11);game["level"] = 11;}
				//else if(thisX>220 && thisX<240){StartLevel(12);game["level"] = 12;}
				//else if(thisX>240 && thisX<260){StartLevel(13);game["level"] = 13;}
				//else if(thisX>260 && thisX<280){StartLevel(14);game["level"] = 14;}
				
				//for(i = 1; i <= 10; i++) addParticle(game["demoParticleSelected"], thisX, thisY);
				//playSound("gunshot");
				
				// *** Objects
				for(key in o)
				{
					if(oPrototype[o[key].prototype].category == "fruit")			
					{
						// *** Demo: make all fruity objects clickable
						if(hitO(thisX, thisY, key)) demoHitFruit(key);
					}
				}				
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
	console.log("keyboardKeyPressed: \"" + thisKey + "\"");
	
	if(thisKey == " ")
	{
	
	}
	else if(thisKey == "<<")
	{

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

	}
}

function keyPress(e)
{
	e = e || window.event;

	pressKeyboard(e.key);
	
	
	if(keyboard["status"] != "hidden")
	{
		pressKeyboard(e.key);
	}
	else
	{		
		if 	(e.keyCode == '38' || e.keyCode == '87'){ 
		console.log("keyPress UP");
		//GameCharacter.Phase = "jump";

														
														
														
														
													}
		else if (e.keyCode == '40' || e.keyCode == '83') 	{ console.log("keyPress DOWN"); }
		else if (e.keyCode == '37' || e.keyCode == '65') 	{ console.log("keyPress LEFT"); }
		else if (e.keyCode == '39' || e.keyCode == '68') 	{ console.log("keyPress RIGHT"); }
		else if (e.keyCode == '13') 				{ console.log("keyPress ENTER"); }
	}
	
}

function keyPressed(keyCode)
{
	r = false;
	
	if(keyCode == "RIGHT")		{ if(pressedKeys[39] || pressedKeys[68] || pressedKeys[102]) r = true; }
	else if(keyCode == "LEFT")	{ if(pressedKeys[37] || pressedKeys[65] || pressedKeys[100]) r = true; }
	else if(keyCode == "UP")	{ if(pressedKeys[32] ||pressedKeys[38] || pressedKeys[87] || pressedKeys[104]) r = true; }
	else if(keyCode == "DOWN")	{ if(pressedKeys[40] || pressedKeys[83] || pressedKeys[98]) r = true; }
	else if(keyCode == "SPACE")	{ if(pressedKeys[32]) r = true; }
	else r = pressedKeys[keyCode];
	
	return(r);

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
		if(o[key].z == thisZ && o[key].x<1100 && o[key].x>-40)
		{
			
			
			if(o[key].category == "leveldoor"){
				
				drawImage(manifest["door"+o[key].ani],o[key].x, o[key].y,84,122)
				
			}
			
			else if(o[key].category == "moving_platform"){
				
				drawImage(manifest["moving_platform"],o[key].x, o[key].y,60,25)
				
			}
			
			else if(o[key].category == "plants"){
				
			if(o[key].kind == 1||o[key].kind == 2){drawImage(manifest["plant"+o[key].kind],o[key].x-5, o[key].y-23,60,60)}
			else if(o[key].kind > 2 && o[key].kind < 8){drawImage(manifest["plant"+o[key].kind],o[key].x-5, o[key].y-32,50,70)}
			else if(o[key].kind > 7 && o[key].kind < 10){drawImage(manifest["plant"+o[key].kind],o[key].x-5, o[key].y-2,50,40)}
			else if(o[key].kind == 10){drawImage(manifest["plant"+o[key].kind],o[key].x-5, o[key].y+18,30,20)}
				
			
				
			}
			
			
			else if(o[key].category == "items"){
				
			    if(o[key].kind < 9){//rocks
				drawImage(manifest["item"+o[key].kind],o[key].x-20, o[key].y+20,34,18)
				}
				if(o[key].kind == 9){//signpost
				drawImage(manifest["item"+o[key].kind],o[key].x-20, o[key].y-10,44,48)
				}
					if(o[key].kind == 10 && o[key].visual==true){//key
				drawImage(manifest["key"],o[key].x-20, o[key].y-10,80,38)
				
				context.globalAlpha = 0.6;
				drawImage(manifest["key_outline"],o[key].x-20, o[key].y-10,80,38)
				context.globalAlpha = 1;
				}
			
			}
			
		
						
			
			else if(o[key].category == "fruits"){
					
					if(o[key].kind=="orange"){
						
					drawImage(manifest["orange"],o[key].x, o[key].y,44,44)
					
					context.save();
					context.font = "24px Verdana";
					context.fillStyle = "white"
					context.textAlign = "center";
					context.font;
					context.fillText(o[key].letter,o[key].x + 22,o[key].y + 37);
					//context.fillRect(o[key].x+22, o[key].y+28,5,5);
					context.restore();
					
					}
				
					if(o[key].kind=="fraise"){
						
					drawImage(manifest["fraise"],o[key].x, o[key].y,40,40)
					
					context.save();
					context.font = "24px Verdana";
					context.fillStyle = "white"
					context.textAlign = "center";
					context.font;
					context.fillText(o[key].letter,o[key].x + 18,o[key].y + 30);
					//context.fillRect(o[key].x+22, o[key].y+28,5,5);
					context.restore();
					
					}
					
					if(o[key].kind=="pear"){
						
					drawImage(manifest["pear"],o[key].x, o[key].y,44,44)
					
					context.save();
					context.font = "24px Verdana";
					context.fillStyle = "white";
				    context.shadowColor = "#000000";
					context.shadowOffsetX = 1;
					context.shadowOffsetY = 1;
					context.textAlign = "center";
					context.font;
					context.fillText(o[key].letter,o[key].x + 20,o[key].y + 34);
					//context.fillRect(o[key].x+22, o[key].y+28,5,5);
					context.restore();
					
					}
				
				

							
			}
			
			
		
			else if(o[key].category == "sunbeam")
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

function renderEnemie()
{
	
	for (key in o){
		
		if(o[key].category == "enemie")
		{
					
			if(o[key].kind=="enemie1")
			{
			drawImage(manifest["enemie1walk1"],o[key].x, o[key].y)		
			}
		
		}
						
	}
		
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
