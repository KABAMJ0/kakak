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
	gameEngine["playButtonIntroMessage"] = false;
}

// *** Start game (start playing)
function startGame()
{
	game["score"] = 0;
	
	for(key in o) delete o[key];
	for(key in particle) delete particle[key];

	game["status"] = "CARSELECT"; 
	playSound("car_start"); 
	
}

function startRace()
{
	stopSound(game["music"]);
	game["music"] = playSound("music", true);
	
	for(key in o) delete o[key];
	for(key in particle) delete particle[key];

	game["score"] = 0;
	game["status"] = "";
	game["raceInitRounds"] = 350;
	game["carSpeed"] = game["carSpeed" + game["car"]];
	game["wordCount"] = 0;
	game["carLives"] = 5;

	wlNewWord();
	

	game["wordCount"] = game["wordFrequency"];
	
}


function carAdd(thisCar, thisTrack)
{
	//console.log("carAdd");
	

	thisO = addO("CAR", game["carSpawnTrackX" + thisTrack], 0, 0, 0, "", "GAME");

	o[thisO].car = thisCar;
	o[thisO].track = thisTrack;
	
	o[thisO].speed = 0.01;
	o[thisO].isHit = false;
	
	if(o[thisO].car >= 6) o[thisO].speedExtra = 0.07; else o[thisO].speedExtra = 0;
		
}

function carAddSyllable(thisSyllable, thisTrack)
{
	if(thisSyllable != "-")
	{
		thisO = addO("SYLLABLE", game["carSpawnTrackX" + thisTrack], 0, 0, 0, "", "GAME");
	
		o[thisO].syllable = thisSyllable;
		o[thisO].track = thisTrack;
		o[thisO].car = 9;
		
		o[thisO].speed = 0.01;
		o[thisO].isHit = false;
		
		o[thisO].speedExtra = 0.04;	
	}
}

function carProgress()
{
	//console.log("carProgress");

	for(key in o)
	{
		if(o[key].category == "car" || o[key].category == "syllable")
		{
			o[key].speed *= (game["carSpeed"] - o[key].speedExtra);
						
			o[key].y += o[key].speed;
			
			if(o[key].track == 1) o[key].x -= o[key].speed * 0.8;
			if(o[key].track == 3) o[key].x += o[key].speed * 0.8;
			
			if(o[key].y > 700 + game["horizon"] + 260) delete o[key];
		}
	}

	if(game["raceInitRounds"] == 1)	
	{
		game["wordCount"]++;
		
		if(game["wordCount"] >= game["wordFrequency"])
		{
			tempLocation = Math.ceil(Math.random()*3);
			
			for(i = 1; i <= 3; i++)
			{
				if(i == tempLocation)
				{
					carAddSyllable(game["wordSyllable"][game["wordSyllableCount"]], i);
				}
				else
				{
					carAddSyllable(wlRandomSyllable(), i);
					
				}

			}
			
			game["wordCount"] = 0;	
		}
	}
}

function carRender(thisAhead)
{
	//console.log("carRender");
	
	tempHit = false;
	tempHitCorrectSyllable = false;
	//tempCount = 0;
	
	// *** Reverse for(key in o)
	Object.keys(o).reverse().forEach(function(key)
	{ 
		//tempCount++;
		
		if((o[key].category == "car" || o[key].category == "syllable") && ((thisAhead && o[key].y <= game["carY"] - game["horizon"]) || (!thisAhead && o[key].y > game["carY"] - game["horizon"])))
		{
			if(o[key].y < 10) context.globalAlpha = o[key].y/10; else context.globalAlpha = 1;
			
			if(o[key].car >= 6 && o[key].y + game["horizon"] >= game["carY"] - game["carLength"] && o[key].y + game["horizon"] < game["carY"])
			{
				carLeft = game["carX"] - game["carWidth" + game["car"]]/2;
				carRight = game["carX"] + game["carWidth" + game["car"]]/2;
				oppLeft = o[key].x - game["carWidth" + o[key].car]/2;
				oppRight = o[key].x + game["carWidth" + o[key].car]/2;
				
				if((carRight > oppLeft && carRight < oppRight) || (carLeft > oppLeft && carLeft < oppRight) || (carLeft < oppLeft && carRight > oppRight))
				{
					o[key].y -= 4;
					
					if(o[key].x > 700-200 && o[key].x < 700+200)
					{
						if((o[key].x <= game["carX"] && game["carXspeed"] <= 0) || (o[key].x >= game["carX"] && game["carXspeed"] >= 0))
						{
							tempMove = game["carXspeed"]*0.9; 
							if(tempMove > 0 && tempMove < 2) tempMove = 2;
							if(tempMove <= 0 && tempMove > -2) tempMove = -2;
							
							o[key].x += tempMove; 
						}
					}
						
					if(o[key].category == "syllable" && !o[key].isHit)
					{
						if(o[key].syllable == game["wordSyllable"][game["wordSyllableCount"]]) tempHitCorrectSyllable = true; else {playSound("error");}
						
						
					
					}

					if(o[key].category == "car" && !o[key].isHit)
					{
						playSound("crash");game["carLives"]--;
						if(Math.random() > 0.65) { setTimeout(function(){ playSound("honk" + Math.ceil(Math.random()*3)); }, Math.ceil(Math.random()*500)+250); }
							
						if(game["carLives"] <= 0)
						{
							playSound("crash_worse"); 						
							game["blackOut"] = 15;
							endGame();
						}
						//if(game["score"] > 0) game["score"] -= 2;
						
						
					}
					
					o[key].isHit = true;
				}
			}
			
			
			if(o[key].category == "car")			
			{
				thisSize = o[key].y + 20;
				drawImage(manifest["car_" + o[key].car], o[key].x, game["horizon"] + o[key].y, thisSize*2, thisSize, o[key].r, false, false, true);
			}
			else
			{
				if(o[key].syllable != "-")
				{
					thisSize = o[key].y/3+5;
					spot["WORD"].font = "bold " + thisSize + "px Arial";	
								
					spot["WORD"].color = "#000000";
					drawText(o[key].syllable, "WORD", o[key].x, game["horizon"] + o[key].y-thisSize/20);
	
					spot["WORD"].color = "#FFFFFF";
					drawText(o[key].syllable, "WORD", o[key].x, game["horizon"] + o[key].y);
				}
								
				if(o[key].isHit) delete o[key];
			}	
		
		}
	});

	// *** Correct syllable caught!
	if(tempHitCorrectSyllable)
	{
		playSound("bonus");
		
		//console.log("CORRECT " + game["wordSyllableCount"] + " / " + game["wordSyllable"].length);
		
		game["score"] += 10;
		
		game["wordTyped"] += game["wordSyllable"][game["wordSyllableCount"]];
		
		if(game["wordSyllableCount"]+1 >= game["wordSyllable"].length)
		{
			tempOldSyllable = game["wordSyllable"][game["wordSyllableCount"]];
			
			wlNewWord();
			
			if(game["word"] == "-")
			{
				console.log("End!");
				playSound("car_leave"); 
				
				//game["blackOut"] = 1;
				//endGame();
				
				wlInit(completeWL);
				wlNewWord();
			}
			
			
			for(key in o)
			{
				if(o[key].category == "syllable")
				{
					if(o[key].syllable == tempOldSyllable)
					{
						o[key].syllable = game["wordSyllable"][game["wordSyllableCount"]];
					}
					else
					{
						o[key].syllable = wlRandomSyllable();
					}				
				}
			}			
		
		}
		else
		{		
			for(key in o)
			{
				if(o[key].category == "syllable")
				{
					if(o[key].syllable == game["wordSyllable"][game["wordSyllableCount"]])
					{
						o[key].syllable = game["wordSyllable"][game["wordSyllableCount"]+1];
					}
					else
					{
						o[key].syllable = wlRandomSyllable();
					}				
				}
			}
			
			game["wordSyllableCount"]++;	
			game["wordCount"] = game["wordFrequency"];		
		}
	}
	
	//console.log("carRender " + tempCount);
	
	context.globalAlpha = 1;
}

function carMove(thisDir)
{
	//console.log("carMove: " + thisDir);
	
	game["carTrack"] += thisDir;
	
	if(game["carTrack"] < 1) game["carTrack"] = 1;
	else if(game["carTrack"] > 3) game["carTrack"] = 3;
	else playSound("car_skid");
}

function carSpeedUp(thisDir)
{
	/*
	//console.log("carMove: " + thisDir);
	//game["carSpeed"] += thisDir/100;
	
	game["carGear"] += thisDir;
	
	if(game["carGear"] < 1) game["carGear"] = 1;
	if(game["carGear"] > 3) game["carGear"] = 3;	

	game["carSpeed"] = game["carSpeedGear" + game["carGear"]];
	
	console.log("carSpeedUp: gear " + game["carGear"] + " speeds up to " + game["carSpeed"]);
	*/
}

// *** End game
function endGame()
{
	console.log("endGame");

	stopSound(game["music"]);
		
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
		else if(game["status"] == "CARSELECT")
		{
			if(hitSpot(thisX, thisY, "CARSELECT_ARROW_LEFT"))  { playSound("click"); playSound("car_start"); game["car"]--; if(game["car"] < 1) game["car"] = game["carMax"]; }
			if(hitSpot(thisX, thisY, "CARSELECT_ARROW_RIGHT")) { playSound("click"); playSound("car_start"); game["car"]++; if(game["car"] > game["carMax"]) game["car"] = 1; }
			if(hitSpot(thisX, thisY, "CARSELECT_GO")) { playSound("click"); playSound("car_leave"); game["blackOut"] = 1; startRace(); }
		
		}					
		else if(game["status"] == "")
		{
			if(hitSpot(thisX, thisY, "CARSELECT_ARROW_LEFT"))  { carMove(-1); }
			if(hitSpot(thisX, thisY, "CARSELECT_ARROW_RIGHT")) { carMove(1); }			
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

	//pressKeyboard(e.key);
	
	if(keyboard["status"] != "hidden")
	{
		pressKeyboard(e.key);
	}
	else
	{
		if(game["status"] == "")		
		{
			if 	(e.keyCode == '38' || e.keyCode == '87') 	{ carSpeedUp(1); }
			else if (e.keyCode == '40' || e.keyCode == '83') 	{ carSpeedUp(-1); }
			else if (e.keyCode == '37' || e.keyCode == '65') 	{ carMove(-1); }
			else if (e.keyCode == '39' || e.keyCode == '68') 	{ carMove(1); }
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
		thisKey = false;
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
	
	return(thisKey);
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


// *** Functions with wl (woordenlijst)
function wlInit(completeWL)
{
	wl = new Array();
	wl = completeWL.split(",");

	for(key in wl)
	{
		wl[key] = wl[key].split("*").join("");
		wl[key] = wl[key].split("'").join("`");
		wl[key] = wl[key].trim();
	
		if(wl[key] == "") wl[key] = "-";
	}
	
}

function wlUnderscore(thisTyped, thisWord)
{
	thisUnderscores = "";
	
	if(thisWord.length > thisTyped.length)
	{
		for(i = 0; i < thisWord.length-thisTyped.length; i++) thisUnderscores += "_";
	}
	
	return(thisTyped + thisUnderscores);
}

function wlNewWord()
{
	game["word"] = wlPick(true);
	game["wordTyped"] = "";
	
	game["wordSyllable"] = wlSyllabify(game["word"]);
	game["wordSyllableCount"] = 0;
	
	console.log("wlNewWord: " + game["word"]);
}

function wlPick(thisDeleteWord)
{
	if(typeof thisDeleteWord === "undefined") thisDeleteWord = true;
	
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
				if(thisDeleteWord) wl[thisArray] = "-";
				thisFound = true;
			}
		}
	}
	else thisWord = "-";

	thisSyl = wlSyllabify(thisWord);

	//console.log("wlPick: " + thisWord + ". wlSyllabify:");
	//console.log(thisSyl);
	//console.log(wl);
	
	return(thisWord);	
}


function wlSyllabify(word)
{
	/* *** Lettergrepen
	syllableRegex = /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi;
	thisSyl = word.match(syllableRegex);
	if(!thisSyl) thisSyl = word;
	return(thisSyl);
	*/
	
	// *** Splitsen in delen van 3 letters
	if(word.length < 8)
	{
		thisSyl = word.match(/.{1,2}/g);
	}
	else
	{
		thisSyl = word.match(/.{1,3}/g);
	}
	

	/* *** Splitsen in 3 delen van X letters
	if(word.length <= 6)
	{
		thisSyl = word.match(/.{1,2}/g);
	}
	else
	{
		thisLetters = word.length;
		thisLength = word.length/3;
		
		if(thisLetters == 7 || thisLetters == 10 || thisLetters == 13) thisLength = Math.floor(thisLength); else thisLength = Math.ceil(thisLength);
		
		thisSyl = new Array();
		thisSyl[0] = word.substr(0,thisLength);
		thisSyl[1] = word.substr(thisLength, thisLength);
		thisSyl[2] = word.substr(thisLength*2);
	}
	*/
	
	return(thisSyl);
}

function wlRandomSyllable()
{
	thisRandomSyllableArray = wlSyllabify(wlPick(false));
	thisRandomSyllable = thisRandomSyllableArray[Math.floor(Math.random()*thisRandomSyllableArray.length)];
	
	
	
	return(thisRandomSyllable);
}
