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
	
	for(key in o) delete o[key];
	for(key in particle) delete particle[key];

	game["status"] = "";
	
	game["hangmanWordsDone"] = 0;
	game["hangmanTreasure"] = 8;
	game["hangmanMinigame"] = false;
	game["hangmanMinigameCount"] = 0;
	game["hangmanAddedScore"] = 100;
	game["hangmanPreviousCorrect"] = false;
	game["hangmanEnded"] = false;
			
	hangmanNewWord();

	playSound("door");
	
	//mySlice = addO("ORANGE_SLICE", 700, 350);
	//myGlitterbox = addGlitterbox(350, 250, 250, 150)
	//myGlittercircle = addGlittercircle(475, 325, 75);
	
	//if(!gameEngine["isTabletSmartphone"]) mySunbeam = addSunbeam(1200, 500, 0.5, "BEHIND");

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
			
		//console.log("click: " + Math.ceil(thisX) + ", " + Math.ceil(thisY));
		//logGamePlay("click: " + Math.ceil(thisX) + ", " + Math.ceil(thisY));

		if(hitSpot(thisX, thisY, "CLOSE_ICON")) { if(confirm("Wil je het spel verlaten en terugkeren naar Spellingoefenen.nl?"))  history.go(-1);}
		else if(!gameEngine["globalFullscreenDisabled"] && hitSpot(thisX, thisY, "FULLSCREEN_ICON")) toggleFullScreen();
		else if(!gameEngine["globalAudioDisabled"] && hitSpot(thisX, thisY, "SOUND_ICON")) switchSound();
		else if(hitSpot(thisX, thisY, "KEYBOARD_ICON")) { if(keyboard["status"] == "hidden") showKeyboard("", true); else hideKeyboard(true); }		
		else if(keyboard["status"] == "show" && thisY > 500) clickKeyboard(thisX, thisY);		
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

			for(key in particle)
			{
				if(particle[key].prototype == 11)
				{
					if(thisX > particle[key].xReal - particle[key].size/1.5 && thisX < particle[key].xReal + particle[key].size/1.5 && thisY > particle[key].y - particle[key].size/1.5 && thisY < particle[key].y + particle[key].size/1.5)
					{
						playSound("coin1");
						
						for(i = 1; i <= 10; i++) addParticle(3, particle[key].xReal + Math.random()*particle[key].size - particle[key].size/2, particle[key].y + Math.random()*particle[key].size - particle[key].size/2);
						
						game["score"] += 10;
						
						delete particle[key];
					}
				}
			}

			// hangmanRemoveTreasure();
			
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
		else if(game["status"] == "HIGHSCORES")
		{
			if(hitTest(thisX, thisY, "HIGHSCORE_SUBMIT", "button")) { if(game["score"] > 0 && game["submitted"] == false) highscoreOpen(); }
			else if(hitTest(thisX, thisY, "HIGHSCORE_PLAY", "button")) { if(hangmanWL.length <= 0) document.location = document.location; else startGame(); }
			
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
	//console.log("drag: " + Math.ceil(thisX) + ", " + Math.ceil(thisY));
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
		//console.log("endDrag results in click: " + Math.ceil(thisX) + ", " + Math.ceil(thisY));
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
	
	if(game["status"] == "")
	{
		hangmanKeypress(thisKey);
	}
	else
	{
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
		
		if(typeof particlePrototype[thisPrototype].r !== "undefined")
		{
			particle[thisKey].r = Math.random() * Math.PI*2;

			particle[thisKey].rSpeed = particlePrototype[thisPrototype].rSpeed + particlePrototype[thisPrototype].rSpeedVariation * Math.random();
			particle[thisKey].rSpeedChange = particlePrototype[thisPrototype].rSpeedChange + particlePrototype[thisPrototype].rSpeedChangeVariation * Math.random();
			
			particle[thisKey].rRadius = particlePrototype[thisPrototype].rRadius + particlePrototype[thisPrototype].rRadiusVariation * Math.random();
			particle[thisKey].rRadiusChange = particlePrototype[thisPrototype].rRadiusChange + particlePrototype[thisPrototype].rRadiusChangeVariation * Math.random();
		}

		if(typeof particlePrototype[thisPrototype].frame !== "undefined")
		{		
			particle[thisKey].frame = Math.ceil(Math.random() * 9);
		}
		
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

			tempX = 0;
			
			if(typeof particle[key].r !== "undefined")
			{
				particle[key].r += particle[key].rSpeed;
				particle[key].rRadius += particle[key].rRadiusChange;
				if(particle[key].rRadius < 0) particle[key].rRadius = 0;
				tempX = particle[key].rRadius * Math.sin(particle[key].r);

				particle[key].xReal = particle[key].x + tempX;
			}
			
			thisManifest = particle[key].manifest;
			
			if(typeof particle[key].frame !== "undefined")
			{
				particle[key].frame++;
				if(particle[key].frame > 9) particle[key].frame = 1;
				
				thisManifest = "coin_" + particle[key].frame;
			}
			
			drawImage(manifest[thisManifest], particle[key].x + tempX, particle[key].y, tempSize, tempSize, false, false, false, true);
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
			else if(o[key].category == "treasure_beams")
			{
				o[key].y += o[key].ySpeed;
				
				o[key].ySpeed -= 0.1;
				
				context.globalAlpha = 0.5 + game["pulsateCos"]/2;
				drawImage(manifest["treasure_beam"], o[key].x, o[key].y, manifest["treasure_beam"].width + manifest["treasure_beam"].width * 0.1 * game["pulsate"], true, o[key].r, false, false, true);
				
				context.globalAlpha = 1;
				drawImage(manifest["treasure_" + o[key].treasure], o[key].x, o[key].y, true, true, o[key].r, false, false, true);
				
				context.globalAlpha = 0.5 + game["pulsate"]/2;
				drawImage(manifest["treasure_" + o[key].treasure + "_tint"], o[key].x, o[key].y, true, true, o[key].r, false, false, true);
			
				context.globalAlpha = 1;
				
				if(Math.random() > 0.9) addParticle(10, o[key].x, o[key].y);
				
				if(o[key].y < -200) delete o[key];
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
	context.shadowOffsetY = 0;
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

function addTreasureBeam(thisX, thisY, thisTreasure)
{
	thisKey = addO("TREASURE_BEAM", thisX, thisY); 
	
	o[thisKey].treasure = thisTreasure;

	return(thisKey);
}