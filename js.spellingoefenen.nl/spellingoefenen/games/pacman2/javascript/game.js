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
	game["pacmanCherry"] = false;
	game["pacmanLevel"] = 1;
	
	for(key in o) delete o[key];
	for(key in particle) delete particle[key];

	game["status"] = "";
	

	pacmanInit();
	
	//mySlice = addO("ORANGE_SLICE", 700, 350);
	//myGlitterbox = addGlitterbox(350, 250, 250, 150)
	//myGlittercircle = addGlittercircle(475, 325, 75);
	
	//if(!gameEngine["isTabletSmartphone"]) mySunbeam = addSunbeam(1200, 500, 0.5, "BEHIND");

}

function wlPick()
{
	//console.log("wlPick:" + wl.length);
	
	thisPossible = false;
		
	for(key in wl)
	{
		if(wl[key] != "-") thisPossible = true;
	}

	if(thisPossible)
	{
		thisFound = false;
		
		while(!thisFound)
		{
			thisArray = Math.floor(wl.length*Math.random());
			
			if(wl[thisArray] != "-")
			{
				thisWord = wl[thisArray];
				wl[thisArray] = "-";
				thisFound = true;
			}
		}
	}
	else thisWord = "-";

	//console.log(wl);
	
	return(thisWord);	
}


function syllabify(word)
{
	/*
	syllableRegex = /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi;
	thisSyl = word.match(syllableRegex);
	if(!thisSyl) thisSyl = word;
	return(thisSyl);
	*/
	
	if (word.length<8){thisSyl = word.match(/.{1,2}/g);}
		else{thisSyl = word.match(/.{1,3}/g);}
	return(thisSyl);
}


// *** End game
function endGame()
{
	console.log("endGame");
	deleteAllO();
	
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

function determineWheelDir(thisX, thisY)
{
	wheelX = Math.round(thisX - spot["PACMAN_WHEEL"].x);
	wheelY = Math.round(thisY - spot["PACMAN_WHEEL"].y);
	wheelWidth = 226;
	
	if(wheelX < wheelWidth/2)
	{
		// left,up,down
		if(wheelY < wheelWidth/2)
		{
			// left,up
			if(wheelY > wheelX) return(180); else return(90);
		}
		else
		{
			// left,down
			if((wheelY-wheelWidth/2) < (wheelWidth/2-wheelX)) return(180); else return(270);
		}						
	}
	else
	{
		// right,up,down
		if(wheelY < wheelWidth/2)
		{
			// right,up
			if((wheelWidth/2-wheelY) < (wheelX-wheelWidth/2)) return(0); else return(90);
		}
		else
		{
			// right,down
			if((wheelY-wheelWidth/2) < (wheelX-wheelWidth/2)) return(0); else return(270);
		}						
	}
}



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

		if(hitSpot(thisX, thisY, "CLOSE_ICON")) { if(confirm("Wil je het spel verlaten en terugkeren naar Spellingoefenen.nl?")) document.location = "https://www.spellingoefenen.nl/spelletjes.html"; }
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
			if((game["pacmanStatus"] == "CAUGHT" || game["pacmanStatus"] == "WON") && game["pacmanStatusCount"] > 50)
			{
				if(game["pacmanLives"] <= 0) endGame(); else pacmanInit();
			}
			else if(hitSpot(thisX, thisY, "PACMAN_WHEEL")) pacmanMove(determineWheelDir(thisX, thisY));
			//else if(hitSpot(thisX, thisY, "BUTTON_BACK")) startGame("");
		}
		else if(game["status"] == "HIGHSCORES")
		{
			if(hitTest(thisX, thisY, "HIGHSCORE_SUBMIT", "button")) { if(game["score"] > 0) highscoreOpen(); }
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


	if(keyboard["status"] != "hidden")
	{
		pressKeyboard(e.key);
		
		//console.log(keyboard["status"]);
		//pressKeyboard(e.key);
	}	
	else
	{
		// *** Pacman
		if(game["status"] == "")
		{
			if((game["pacmanStatus"] == "CAUGHT" || game["pacmanStatus"] == "WON") && game["pacmanStatusCount"] > 50)
			{
				if(game["pacmanLives"] <= 0) endGame(); else pacmanInit();
			}		
			else if	(e.keyCode == '38' || e.keyCode == '87') 	{ pacmanMove(90); }
			else if (e.keyCode == '40' || e.keyCode == '83') 	{ pacmanMove(270); }
			else if (e.keyCode == '37' || e.keyCode == '65') 	{ pacmanMove(180); }
			else if (e.keyCode == '39' || e.keyCode == '68') 	{ pacmanMove(0); }
			else if (e.keyCode == '13') 				{ console.log("keyPress ENTER"); }		
		
		}
	}
}

// *** Answer returns from AJAX request
function ajaxReturn(data)
{
	var answer = $.parseJSON(data);
	
	console.log("ajaxReturn: " + answer["a"]);
	console.log(answer);
	
	if(answer["status"] == "OK")
	{
		console.log("ajaxReturn: " + answer["status"]);	

		if(answer["a"] == "highscoreView" && answer["status"] == "OK")
		{
			game["highscoreList"] = answer;
			game["highscoreListScroll"] = parseInt(answer["highscore_list_scroll"]);
			game["highscoreListBusy"] = false;
			
			console.log("highscoreListScroll: " + game["highscoreListScroll"]);
			
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
	else
	{
		console.error("highscoreView ERROR: " + answer["status"]);
		game["highscoreListBusy"] = false;
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
		
		return(thisKey);
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
			if(o[key].category == "ghost")
			{
				pacmanObjectGhost(key);
			}
			else if(o[key].category == "subscore")
			{
				
				o[key].y--;
				o[key].fontSize++;
				o[key].alpha-= 0.02;
				context.globalAlpha = o[key].alpha;
				
				spot["GAME_SUBSCORE"].font = "bold " + o[key].fontSize + "px 'Open Sans', sans-serif";
				
				drawText(o[key].text, "GAME_SUBSCORE", o[key].x, o[key].y);

				if(o[key].alpha <= 0.05) delete o[key];
			}			
			else if(o[key].category == "sunbeam")
			{					
				for(i = 1; i <= 10; i++)
				{	
					if(!o[key].initialize)
					{
						
						context.globalAlpha = Math.sin(o[key][i].alpha)/10;
						drawImage(manifest["sunbeam"], o[key].x, o[key].y, manifest["sunbeam"].width * o[key].radius, manifest["sunbeam"].height * o[key].radius, o[key][i].r, false, false, true);
				
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
