// *** Animates (calculates) all
function animateAll()
{
	if(gameEngine["play"])
	{
		gameEngine["framerateStats"].begin();
				
		for(iii = 1; iii <= gameEngine["framerateRecalculations"]; iii++)
		{
			// *** Objects
			for(key in o)
			{
				proto = oPrototype[o[key].prototype];

				if(proto.category == "fruit")			
				{
					// *** Demo: handle all fruity objects (make them bounce around the game)				
					o[key].x += o[key].xSpeed;
					o[key].y += o[key].ySpeed;
					o[key].ySpeed += game["gravity"];
								
					o[key].r += o[key].rSpeed;
		
					if(o[key].y + manifest[o[key].manifest].height/2 > game["height"]) { o[key].y = game["height"] - manifest[o[key].manifest].height/2; o[key].ySpeed *= -game["bouncyness"]; }
					if(o[key].x + manifest[o[key].manifest].width/2 > game["width"]) { o[key].x = game["width"] - manifest[o[key].manifest].width/2; o[key].xSpeed *= -1; o[key].rSpeed *= -1; }
					if(o[key].x - manifest[o[key].manifest].width/2 < 0) { o[key].x = manifest[o[key].manifest].width/2; o[key].xSpeed *= -1; o[key].rSpeed *= -1; }	
				}
				

				if(proto.category == "particles")			
				{
					// *** Objects that use particles
					o[key].count += o[key].speed;
					
					if(o[key].prototype == "GLITTERBOX")
					{
						for(i = 1; i <= 2; i++)
						{
							if((i == 1 && o[key].position == "top") || (i == 2 && o[key].position == "bottom"))
							{
								xExtra = o[key].count;
								yExtra = 0;
								
								if(o[key].count > o[key].width)
								{
									o[key].count -= o[key].width;
									o[key].position = "right";
								}
							}
							
							if((i == 1 && o[key].position == "right") || (i == 2 && o[key].position == "left"))
							{
								xExtra = o[key].width;
								yExtra = o[key].count;
								
								if(o[key].count > o[key].height)
								{
									o[key].count -= o[key].height;
									o[key].position = "bottom";
								}
							}						
							
							if((i == 1 && o[key].position == "bottom") || (i == 2 && o[key].position == "top"))
							{
								xExtra = o[key].width - o[key].count;
								yExtra = o[key].height;
								
								if(o[key].count > o[key].width)
								{
									o[key].count -= o[key].width;
									o[key].position = "left";
								}
							}						
							
							if((i == 1 && o[key].position == "left") || (i == 2 && o[key].position == "right"))
							{
								xExtra = 0;
								yExtra = o[key].height - o[key].count;
								
								if(o[key].count > o[key].height)
								{
									o[key].count -= o[key].height;
									o[key].position = "top";
									xExtra = -yExtra;
									yExtra = 0;										
								}
							}
						
							if(i == 1 || (i == 2 && o[key].mirrored))
							{								
								addParticle(o[key].particle, o[key].x + xExtra, o[key].y + yExtra);	
							}							
						}
											
					}

					if(o[key].prototype == "GLITTERCIRCLE")
					{
						xExtra = Math.cos(o[key].count) * o[key].r;
						yExtra = Math.sin(o[key].count) * o[key].r;
					
						addParticle(o[key].particle, o[key].x + xExtra, o[key].y + yExtra);

						if(o[key].mirrored)
						{
							xExtra = Math.cos(o[key].count + toRadians(180)) * o[key].r;
							yExtra = Math.sin(o[key].count + toRadians(180)) * o[key].r;
						
							addParticle(o[key].particle, o[key].x + xExtra, o[key].y + yExtra);
						}
													
					}
				}
					
				if(o[key].category == "sunbeam")
				{					
					for(i = 1; i <= 10; i++)
					{
						if(o[key].initialize)
						{
							o[key][i] = new Array();
							o[key][i].alpha = Math.random();
						}
										
						if(o[key].initialize || o[key][i].alpha == 0)
						{
							//o[key][i].r = toRadians(Math.random() * 360);
							//o[key][i].width = 0.1 + Math.random() * 0.3;
							//o[key][i].speed = 0.01 + Math.random() * 0.03;

							o[key][i].r = (Math.random() * 360);
							o[key][i].width = 0.1 + Math.random() * 0.3;
							o[key][i].speed = -Math.random() * 2 - 1;
							
							
						}
										
						if(o[key].radius >= 2000) o[key][i].r += o[key][i].speed/10; else o[key][i].r += o[key][i].speed;
						
						o[key][i].alpha += 0.02;
														
						if(o[key][i].alpha >= toRadians(180))
						{
							o[key][i].alpha = 0;
						}
							
					}
					
					o[key].initialize = false;				
				}									
			}
					
			// *** Demo
		//	if(game["status"] == "")
		//	{
				// *** Demo: Increase of score for demo purposes: delete it eventually!
		//		if(game["status"] == "" & Math.random() > 0.9) game["score"]++; 
	
				// *** Demo: Particles: add stream out of vulcano as demo				
		//		for(i = 1; i <= game["demoParticleAmount"]; i++)
		//		{
		//			addParticle(game["demoParticleSelected"], spot["DEMO_PARTICLE_SOURCE"].x + Math.random() * 15 - 15, spot["DEMO_PARTICLE_SOURCE"].y + Math.random() * 10 - 10);

		//		}
				
				// *** Demo: Dragging: add particle for testing
		//		if(game["dragging"]) { addParticle(game["demoParticleSelected"], game["mouseX"], game["mouseY"]); playSound("sword"); }
	
				// *** Demo: Make sunbeam follow orange slice
		//		if(typeof mySunbeam !== "undefined" && typeof mySlice !== "undefined") 
		//		{
		//			o[mySunbeam].x = o[mySlice].x; 
		//			o[mySunbeam].y = o[mySlice].y; 
		//		}
		
						
		//	}
			
			
			// *** Pulsating (sinus or cosinus) number between 0 and 1, much used for alpha animations
			game["pulsateX"] += game["pulsateSpeed"];
			game["pulsate"] = (Math.sin(game["pulsateX"]) + 1) / 2;
			game["pulsateCos"] = (Math.cos(game["pulsateX"]) + 1) / 2;
			

		
			// *** Particles
			for(key in particle)
			{
				particle[key].x += particle[key].xSpeed;
				particle[key].xSpeed += particle[key].xSpeedChange;
				
				particle[key].y += particle[key].ySpeed;
				particle[key].ySpeed += particle[key].ySpeedChange;

				particle[key].size += particle[key].sizeChange;
				
				particle[key].alpha += particle[key].alphaChange;

				if(particlePrototype[particle[key].prototype].bounces)
				{
					if(particlePrototype[particle[key].prototype].bouncesLeft && particle[key].x < 0) 		{ particle[key].x = 0; 			particle[key].xSpeed = -particle[key].xSpeed * game["bouncyness"]; }					
					if(particlePrototype[particle[key].prototype].bouncesRight && particle[key].x > game["width"]) 	{ particle[key].x = game["width"]; 	particle[key].xSpeed = -particle[key].xSpeed * game["bouncyness"]; }
					if(particlePrototype[particle[key].prototype].bouncesTop && particle[key].y < 0) 		{ particle[key].y = 0; 			particle[key].ySpeed = -particle[key].ySpeed * game["bouncyness"]; }
					if(particlePrototype[particle[key].prototype].bouncesBottom && particle[key].y > game["height"]){ particle[key].y = game["height"]; 	particle[key].ySpeed = -particle[key].ySpeed * game["bouncyness"]; }
				}							
				
				if(particle[key].y > game["height"] + (particle[key].size / 2) || particle[key].size <= 0 || particle[key].alpha <= 0 || (Math.random() < particlePrototype[particle[key].prototype].destructionChance)) delete particle[key];
			}			
			
			

			
						
		}
				
		// *** Draw the whole canvas
		drawAll();
		
		// *** Stats: calc framerate
		fps = gameEngine["framerateStats"].end(); eval("gameEngine[\"s" + "h" + "aP" + "W\"] = 'g.e_a';");
		fps = fps * (gameEngine["framerate"] / 40);
		
		if(fps > 1)
		{
			old_framerate = gameEngine["framerate"];
			
			if(fps >= 19) gameEngine["framerate"] = 40;
			if(fps < 15) gameEngine["framerate"] += 40;
			
			if(gameEngine["framerate"] < 40) gameEngine["framerate"] = 40;
			if(gameEngine["framerate"] > 320) gameEngine["framerate"] = 320;
			
			if(gameEngine["framerate"] != old_framerate) setFramerate(gameEngine["framerate"]);
	
		}
		
	}
	
	setTimeout(function(){ animateAll(); }, gameEngine["framerate"]);
}

// *** Draw the whole canvas
function drawAll()
{
	// *** Draw an image: drawImage(img, x, y, width, height, deg, flip, flop, center)
	// *** Mark a spot (red border to see where it is): drawSpot("SPOT");

	// *** background: clear all!
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.globalAlpha = 1;
	
	// *** Screens
	if(game["status"] == "PLAYBUTTON" || game["status"] == "PRELOAD" || game["status"] == "INTRO")
	{
		drawImage(manifest["bg_intro"], spot["INTRO"].x, spot["INTRO"].y);
		drawImage(manifest["logo"], spot["INTRO_LOGO"].x, spot["INTRO_LOGO"].y + game["pulsateCos"]*5, true, true, game["pulsate"], false, false, true);
	
		
		drawText(gameEngine["version"], "INTRO_VERSION");

		if(game["status"] != "INTRO") drawTextarea(gameEngine["preloadMessage"], "INTRO_PRELOAD_MESSAGE");

		renderParticles("BETWEEN");
		renderObjects("BETWEEN");	
	}

	renderParticles("BEHIND");
	renderObjects("BEHIND");
				
	if(game["status"] == "PLAYBUTTON")
	{
		// *** Playbutton screen (pre-intro)
		gameEngine["playButtonStatus"] = "PLAY";
		
		if(gameEngine["isSmartphone"])
		{
			if(game["orientation"] == "landscape")
			{
				// *** Landscape
				if(checkOrientation() == "portrait")
				{
					gameEngine["playButtonStatus"] = "TURN_MANEUVRE";
				}
			}
			else
			{
				// *** Portrait
				if(checkOrientation() == "landscape")
				{
					gameEngine["playButtonStatus"] = "TURN_MANEUVRE";
				}				
			
			}
		}
		
		if(gameEngine["playButtonStatus"] == "PLAY")
		{
			if(hoverSpot("INTRO_PLAYBUTTON"))
			{
				tempManifest = "playbutton_hover";
				addParticle(3, spot["INTRO_PLAYBUTTON"].x + 15 + Math.random() * 200, spot["INTRO_PLAYBUTTON"].y + 15 + Math.random() * 200, "BETWEEN");
			}
			else tempManifest = "playbutton";
			
			drawImage(manifest[tempManifest], spot["INTRO_PLAYBUTTON"].x, spot["INTRO_PLAYBUTTON"].y);
		}
		else if(gameEngine["playButtonStatus"] == "TURN_MANEUVRE")
		{
			context.globalAlpha = 0.75;
			context.fillColor = "#000000";
			context.fillRect(0, 0, game["width"], game["height"]); 			
			ge("myCanvasGamedesign").style.display = "none";

			context.globalAlpha = 1;			
			drawTextarea("Draai je telefoon voor\neen betere spelervaring!", "INTRO_MANEUVRE", spot["INTRO_MANEUVRE"].x, spot["INTRO_MANEUVRE"].y + spot["INTRO_MANEUVRE"].paddingTop);
			
			gameEngine["playButtonCount"]++;
			if(gameEngine["playButtonCount"] > 70) gameEngine["playButtonCount"] = 0;
			
			tempR = gameEngine["playButtonCount"]*3;
			if(tempR > 90) tempR = 90;
			if(gameEngine["playButtonCount"] == 60) tempR = 45;
			if(gameEngine["playButtonCount"] == 61) tempR = 45/2;
			if(gameEngine["playButtonCount"] == 62) tempR = 45/4;
			if(gameEngine["playButtonCount"] >  62) tempR = 0;
						
			drawImage(manifest["bg_maneuvre"], spot["INTRO_MANEUVRE"].x, spot["INTRO_MANEUVRE"].y, true);
			drawImage(manifest["icon_phone"], spot["INTRO_MANEUVRE"].x, spot["INTRO_MANEUVRE"].y, true, true, tempR, false, false, true);
			
			
		}
		
		context.globalAlpha = 1;
	}
	else if(game["status"] == "PRELOAD")
	{
		drawImage(manifest["progressbar_bg"], spot["INTRO_PRELOADER"].x, spot["INTRO_PRELOADER"].y);
		drawImage(manifest["progressbar"], spot["INTRO_PRELOADER"].x + spot["INTRO_PRELOADER"].paddingLeft, spot["INTRO_PRELOADER"].y + spot["INTRO_PRELOADER"].paddingTop, spot["INTRO_PRELOADER"].preloaderWidth * ((gameEngine["manifestCount"]-gameEngine["preloadPreloadManifestCount"])/(gameEngine["manifestTotal"]-gameEngine["preloadPreloadManifestCount"])), spot["INTRO_PRELOADER"].preloaderHeight);
		drawImage(manifest["progressbar_fg"], spot["INTRO_PRELOADER"].x, spot["INTRO_PRELOADER"].y);
	}	
	else if(game["status"] == "")
	{
		context.globalAlpha = 1;
		
		
		if (game["level"]<4||game["level"]>3 && game["showLevelText"]>29) {var background = 1}
		if (game["level"]>3 && game["showLevelText"]<30||game["level"]>4) {var background = 2}
		if (game["level"]>7 && game["showLevelText"]<30||game["level"]>8) {var background = 3}
		if (game["level"]>11 && game["showLevelText"]<30||game["level"]>12) {var background = 4}
		if (game["level"]>15 && game["showLevelText"]<30||game["level"]>16) {var background = 5}
		if (game["level"]>19 && game["showLevelText"]<30||game["level"]>20) {var background = 6}
		
		if (game["level"]>23 && game["showLevelText"]<30||game["level"]>24) {var background = 1}
		if (game["level"]>27 && game["showLevelText"]<30||game["level"]>28) {var background = 2}
		if (game["level"]>31 && game["showLevelText"]<30||game["level"]>32) {var background = 3}
		if (game["level"]>35 && game["showLevelText"]<30||game["level"]>36) {var background = 4}
		if (game["level"]>39 && game["showLevelText"]<30||game["level"]>40) {var background = 5}
		if (game["level"]>43 && game["showLevelText"]<30||game["level"]>44) {var background = 6}
		
		
		drawImage(manifest["bg"+background], spot["BG"].x, spot["BG"].y);
		
		
		for(key in penguin){
			
			
			if(penguin[key].phase != "walk"){penguin[key].x = game["PenguinStartX"]+ ((penguin[key].position-1) * 85);}
			if(penguin[key].phase == "walk" && penguin[key].destination < penguin[key].position){penguin[key].x -= 5;}
			if(penguin[key].phase == "walk" && penguin[key].destination > penguin[key].position){penguin[key].x += 5;}
			if(penguin[key].phase == "walk" && penguin[key].x == game["PenguinStartX"] + ((penguin[key].destination-1) * 85)){
				
				penguin[key].position = penguin[key].destination;
				penguin[key].phase = "idle"
				penguin[key].y -= 5
			}
			
			if(penguin[key].variant==3){penguin[key].y = 545;}
			if(penguin[key].variant==2){penguin[key].y = 535;}
			if(penguin[key].variant==1){penguin[key].y = 538;}
	
			penguin[key].y -= penguin[key].length;
			
			if(penguin[key].phase == "walk" && penguin[key].destination > penguin[key].position){penguin[key].y -=10}
			if(penguin[key].phase == "walk" && penguin[key].destination < penguin[key].position){penguin[key].y +=10}
			
			penguin[key].aniteller+=0.45;
			if (penguin[key].phase=="walk"){penguin[key].aniteller+=0.55}
			penguin[key].ani = Math.ceil(penguin[key].aniteller);
		
			if(penguin[key].ani==20){penguin[key].ani=1;penguin[key].aniteller=1}
			if(penguin[key].phase=="walk" && penguin[key].ani>10){penguin[key].ani=1;penguin[key].aniteller=1}
			if(penguin[key].phase=="jump" && penguin[key].ani==9){penguin[key].phase = "idle"}
			
			
			//if(penguin[key].phase=="idle"){penguin[key].ani = 1;}
		}
		
			
		
		for(aaa = 1; aaa <= game["penguinCount"]; aaa++){
			
			for(key in penguin){
				
				
				
				if(penguin[key].position == aaa && penguin[key].phase=="walk" && penguin[key].destination > penguin[key].position){drawImage(manifest["penguinwalk"+penguin[key].variant+"-"+penguin[key].ani], penguin[key].x, 
				penguin[key].y,penguin[key].width,penguin[key].length,true,true);}
				
				if(penguin[key].position == aaa && penguin[key].phase=="idle"){drawImage(manifest["penguin"+penguin[key].variant+"-"+penguin[key].ani], penguin[key].x, 
				penguin[key].y,penguin[key].width,penguin[key].length);}
				
				if(penguin[key].position == aaa && penguin[key].phase=="jump"){drawImage(manifest["penguinjump"+penguin[key].variant+"-"+penguin[key].ani], penguin[key].x , 
				penguin[key].y,penguin[key].width,penguin[key].length);}
				
				
				
			
			}
			
		}
		
		
		for(key in penguin){
			
				context.save();		
				
				context.font = "52px Arial";
				context.textAlign = "center";
							
				context.shadowColor = "#000000";
				context.shadowOffsetX = 0; 
				context.shadowOffsetY = 0; 
				context.shadowBlur = 1;
			
				context.fillStyle = "#000000";
				if (penguin[key].letter == spelWord.substr(penguin[key].position-1,1)){	context.fillStyle = "#008000";}
			
			    var parabool = 0;
			 
				parabool = penguin[key].ani/7;
				if(penguin[key].ani>11){parabool = (20/6) - penguin[key].ani/6}
				
				if(penguin[key].phase == "idle" && penguin[key].visible=="true"){
					context.fillText(penguin[key].letter, penguin[key].x + 115 - parabool, 497);	
				}
				if(penguin[key].phase == "walk" && penguin[key].destination < penguin[key].position && penguin[key].visible=="true"){
					context.fillText(penguin[key].letter, penguin[key].x + 115 - parabool, 497);	
				}
				context.restore();	
		}
			
		
		for(aaa = 1; aaa <= game["penguinCount"]; aaa++){
			
			for(key in penguin){
					
				
				
				if(penguin[key].position == aaa && penguin[key].phase=="walk" && penguin[key].destination < penguin[key].position){drawImage(manifest["penguinwalk"+penguin[key].variant+"-"+penguin[key].ani], penguin[key].x, 
				penguin[key].y,penguin[key].width,penguin[key].length);}
				
				
			
			}
			
		}
		
		
				for(key in penguin){
			
				context.save();		
				
				context.font = "52px Arial";
				context.textAlign = "center";
							
				context.shadowColor = "#000000";
				context.shadowOffsetX = 0; 
				context.shadowOffsetY = 0; 
				context.shadowBlur = 1;
			
				context.fillStyle = "#000000";
				if (penguin[key].letter == spelWord.substr(penguin[key].position-1,1)){	context.fillStyle = "#008000";}
			
			    var parabool = 0;
			 
				parabool = penguin[key].ani/7;
				if(penguin[key].ani>11){parabool = (20/6) - penguin[key].ani/6}
				
				if(penguin[key].phase=="walk" && penguin[key].destination < penguin[key].position && penguin[key].visible=="true"){
					context.fillText(penguin[key].letter, penguin[key].x + 115 - parabool, 497);	
				}
				context.restore();	
				}
			
		
		context.font = "70px 'Roboto Condensed', sans-serif";
		context.shadowColor = "#000000";
		context.shadowOffsetX = 2; 
		context.shadowOffsetY = 2; 
		context.shadowBlur = 2;
	
		
		
		LetterX = 20;
		
		context.fillStyle ="#C0C0C0";
		
		LetterX = 20;
		
		for(bbb = 1; bbb <= game["penguinCount"]; bbb++){
			LetterX +=45;
			
			for (key in penguin){

			


				if(penguin[key].letter==spelWord.substr(penguin[key].position-1,1&&penguin[key].position==bbb)){context.fillText(penguin[key].letter, spot["SPELLEDWORD"].x + LetterX, spot["SPELLEDWORD"].y);}

			}
		
			
		}
		
		context.fillStyle = "#FF9B00"
		
		
		
		
		
		
		
		
		//context.fillText(game["SpelledWord"], spot["SPELLEDWORD"].x, spot["SPELLEDWORD"].y);
		LetterX = 20;
		spot["SPELLEDWORD"].x = 1400-700-((spelWord.length*45)/2)-45;
		
		
		spelledWordTemp = game["SpelledWord"];
		underscores = spelWord.length - game["SpelledWord"].length;
		
		for(i = 0; i < underscores; i++) spelledWordTemp += "_";
		
		
		
		for(key in spelledWordTemp){
			LetterX +=45;
			context.textAlign = "center";
			context.fillText(spelledWordTemp[key], spot["SPELLEDWORD"].x + LetterX, spot["SPELLEDWORD"].y);
		}
		
		
		
		
		
		context.shadowOffsetY = 0; 
		context.shadowBlur = 0;
		context.shadowOffsetX = 0; 
		context.shadowOffsetY = 0; 
		context.shadowBlur = 0;
		
		drawButton("icebutton", "Help me! (" + game["helps"]+ "x)");
		
		
		
		if(game["SpelledWord"]==spelWord && OneTime==0){
			playSound("wordcorrect");
			setTimeout(newSpelWord,600);
			OneTime=1;
			for(key in penguin){penguin[key].phase="jump";
			penguin[key].ani=2;
			penguin[key].aniteller=2;}
		}
		
		
		if (game["WordsCount"]==5){LevelUp()}
		
	
		
		for(y = 1; y<30; y++){
			randomx = 80 + Math.ceil(Math.random() * 100);
			randomy = 30 + Math.ceil(Math.random() * 150);
			for (key in penguin){
				if(penguin[key].age<70){addParticle(3, penguin[key].x + randomx, penguin[key].y + randomy);}
				penguin[key].age+=1;
			}

		}
		
		if (game["Time"] == game["TimePerWord"]){game["Time"]=0.01; game["showLevelText"]=60;	game["showLevelTextType"] = "GAME_OVER"}
		if(game["Time"]==0.01 && game["showLevelText"]< 30){endGame();}
		
		//timer
		drawImage(manifest["time"], spot["TIME"].x, spot["TIME"].y);
		drawImage(manifest["time_bar"], spot["TIME"].x+1, spot["TIME"].y+1, 953 - 953*(game["Time"] / game["TimePerWord"]), 7);
		
		drawImage(manifest["buttonbackspace"],spot["SPELLEDWORD"].x + spelWord.length * 45 + 100,spot["buttonbackspace"].y);
		
		
		//player info
		context.font = "35px 'Roboto Condensed', sans-serif";
		context.shadowOffsetX = 1; 
		context.shadowOffsetY = 1; 
		context.fillStyle = "#FFF"
		context.fillText("Level: " + game["level"] + "          " + " Score: " + game["score"] + "", 200, 50);
		context.shadowOffsetX = 0; 
		context.shadowOffsetY = 0; 
		
		//level text
		if(game["showLevelText"] > 0)
		{		
			
			game["showLevelText"]--
			if(game["showLevelText"] > 40)
			{
				tempAlpha = (20 - (game["showLevelText"] - 40)) / 20;
				tempX = -((game["showLevelText"] - 40) * (game["showLevelText"] - 40));
				
			}
			else if(game["showLevelText"] < 20)
			{
				tempAlpha = game["showLevelText"] / 20;
				tempX = ((20 - game["showLevelText"]) * (20 - game["showLevelText"]));
			}
			else
			{
				tempAlpha = 1;
				tempX = 0;
				
			}
	
			context.globalAlpha = tempAlpha / 4;
			
				
			context.globalAlpha = tempAlpha;
			
			drawImage(manifest["bg_dark"], 0, 0, 1400, 700);
			
			//context.font = css["font_leveltext"];
			context.textAlign = "center";	
			//context.fillStyle = css["font_spelword_color"];
			
			//tempText = "";
			//tempTextExtra = "Je hebt " + spelledWordsCorrect + " woorden goed gespeld!!!";
			
			
			if(game["showLevelTextType"] == "LEVEL") tempText = "LEVEL " + game["level"];
			if(game["showLevelTextType"] == "GAME_OVER") tempText = "GAME OVER!";
			
			context.font = "150px 'Roboto Condensed', sans-serif";
			context.fillText(tempText, spot["LEVEL_TEXT"].x + tempX, spot["LEVEL_TEXT"].y);	
			
			
			context.textAlign = "center";	
			//context.fillStyle = css["font_spelword_color"];
			
			//if(game["showLevelTextType"] == "GAME_OVER") context.fillText(tempTextExtra, spot["LEVEL_TEXT"].x + tempX, spot["LEVEL_TEXT"].y + 100);	
		
			
			
		}
		
	
		context.restore();	
		
		
		
		
		
		
	
		// *** Playing (demo)
		//drawText("Gamedesign.nl HTML5 Game Blanco " + gameEngine["version"], "DEMO_TITLE");
		//drawText("Score: " + game["score"] + " | Particles: " + Object.keys(particle).length + " | Objects: " + Object.keys(o).length, "DEMO_DEBUG");
		//drawText(game["demoParticleSelected"] + ": " + //particlePrototype[game["demoParticleSelected"]].name, "DEMO_PARTICLE_SOURCE", //spot["DEMO_PARTICLE_SOURCE"].x, spot["DEMO_PARTICLE_SOURCE"].y+40);
				
		//drawButton("DEMO_BUTTON_1", "intro screen");
		//drawButton("DEMO_BUTTON_2", "start game");
		//drawButton("DEMO_BUTTON_3", "show highscores");
		
		//drawButton("DEMO_BUTTON_4", "show registration");
		//drawButton("DEMO_BUTTON_5", "show sharing");
		//drawButton("DEMO_BUTTON_6", "keyb. (no force)");
		//drawButton("DEMO_BUTTON_7", "change particles");
		
		/*
		context.save(); 
		context.textAlign = "left"; 
		context.font = "12px Arial";
		context.fillStyle = "#FFFFFF";
		context.shadowColor = "#000000";
		context.shadowOffsetX = 1;
		context.shadowOffsetY = 1;
		context.shadowBlur = 5; // *** Very CPU-intensive!
		context.fillText("Gamedesign.nl HTML5 Game Blanco " + gameEngine["version"], spot["TITLE"].x, spot["TITLE"].y + 12);			
		context.restore(); 
		*/
		
		context.globalAlpha = 1;
				
	}
	else if(game["status"] == "HIGHSCORES")
	{
		// *** Highscore lijst
		drawImage(manifest["highscore_bg"], spot["HIGHSCORE_AREA"].x, spot["HIGHSCORE_AREA"].y);
						
		if(game["highscoreList"]["status"] == "OK" && !game["highscoreListBusy"])
		{
			temp_extra_x = 0;

			if(typeof game["highscoreList"][game["highscoreListSize"]] !== "undefined")
			{
				if(game["highscoreList"][game["highscoreListSize"]].position >= 100) temp_extra_x += 20;
				if(game["highscoreList"][game["highscoreListSize"]].position >= 1000) temp_extra_x += 20;
				if(game["highscoreList"][game["highscoreListSize"]].position >= 10000) temp_extra_x += 20;
			}
					
			for(i = 1; i <= game["highscoreListSize"]; i++)
			{
				tempAlt = false;
				
				if(game["highscoreList"]["player_position"] == game["highscoreList"][i].position)
				{
					context.globalAlpha = game["pulsate"] / 4 + 0.75;
					
					if(game["highscoreEmail"] != "")
					{
						drawImage(manifest["highscore_selected"], spot["HIGHSCORE_POSITIONS"].x + spot["HIGHSCORE_POSITIONS"].paddingLeft, spot["HIGHSCORE_POSITIONS"].y + game["highscoreListLineheight"] * (i - 1) + spot["HIGHSCORE_POSITIONS"].paddingTop);
						tempAlt = true;
					}
					else
					{
						drawImage(manifest["highscore_between"], spot["HIGHSCORE_POSITIONS"].x + spot["HIGHSCORE_POSITIONS"].paddingLeft, spot["HIGHSCORE_POSITIONS"].y + game["highscoreListLineheight"] * (i - 1) + spot["HIGHSCORE_POSITIONS"].paddingTop - game["highscoreListLineheight"] / 2);
					}
	
				}
				
				context.globalAlpha = 1;
				
				drawText(game["highscoreList"][i].position, "HIGHSCORE_POSITIONS", spot["HIGHSCORE_POSITIONS"].x + temp_extra_x, spot["HIGHSCORE_POSITIONS"].y + game["highscoreListLineheight"] * i, tempAlt);
				drawText(game["highscoreList"][i].naam, "HIGHSCORE_NAMES", spot["HIGHSCORE_NAMES"].x + temp_extra_x, spot["HIGHSCORE_NAMES"].y + game["highscoreListLineheight"] * i, tempAlt);
				drawText(game["highscoreList"][i].score, "HIGHSCORE_SCORES", spot["HIGHSCORE_SCORES"].x, spot["HIGHSCORE_SCORES"].y + game["highscoreListLineheight"] * i, tempAlt);

			}
			
			if(game["highscoreList"]["player_position"] > game["highscoreList"][game["highscoreListSize"]].position)
			{	
				context.globalAlpha = game["pulsate"] / 4 + 0.75;
				if(game["highscoreListScroll"] == 0) drawImage(manifest["highscore_between"], spot["HIGHSCORE_POSITIONS"].x + spot["HIGHSCORE_POSITIONS"].paddingLeft, spot["HIGHSCORE_POSITIONS"].y + game["highscoreListLineheight"] * (game["highscoreListSize"]) + spot["HIGHSCORE_POSITIONS"].paddingTop - game["highscoreListLineheight"] / 2);
				context.globalAlpha = 1;
			}
			
			
			context.globalAlpha = 1; 		
		}
		else
		{
			context.textAlign = "center"; 
			drawText("Loading...", "HIGHSCORE_AREA", spot["HIGHSCORE_AREA"].x + spot["HIGHSCORE_AREA"].width/2, spot["HIGHSCORE_AREA"].y + spot["HIGHSCORE_AREA"].height/2);
			
			context.globalAlpha = 0.5; 
		}

	
		// *** Scroll buttons
		drawButton("HIGHSCORE_SCROLL_TOP", "", "highscore_top");
		drawButton("HIGHSCORE_SCROLL_UP", "", "highscore_up");
		drawButton("HIGHSCORE_SCROLL_USER", "", "highscore_user");
		drawButton("HIGHSCORE_SCROLL_DOWN", "", "highscore_down");
		drawButton("HIGHSCORE_SCROLL_BOTTOM", "", "highscore_bottom");			
		
		context.globalAlpha = 1; 	
	
		// *** Overige
		drawText("Jouw score: " + game["score"], "HIGHSCORE_TEXT_SCORE");
		drawText("Jouw positie: " + game["highscoreList"]["player_position"], "HIGHSCORE_TEXT_POS");
				
		//if(game["score"] > 0) 
		
		if(game["submitted"]==true){context.globalAlpha = 0.5;}
		drawButton("HIGHSCORE_SUBMIT", "score plaatsen");
		
		context.globalAlpha = 1; 	
		drawButton("HIGHSCORE_PLAY",   "doorgaan");
		
	}
	
	renderObjects("");
	renderParticles("");
	
	context.globalAlpha = 1;
	
	
	
		
	// *** Window buttons (icons in top right corner)
	if(game["status"] != "PRELOAD_PRELOADER") // && game["status"] != "PLAYBUTTON"
	{	
		temp_x = spot["WINDOW_BUTTONS"].x;

		if(hoverSpot("CLOSE_ICON")) context.globalAlpha = 1; else context.globalAlpha = 0.75;
		
		spot["CLOSE_ICON"].x = temp_x;
		drawImage(manifest["close"], spot["CLOSE_ICON"].x, spot["CLOSE_ICON"].y);
		temp_x -= spot["CLOSE_ICON"].width + spot["WINDOW_BUTTONS"].margin;
		
		if(!gameEngine["globalFullscreenDisabled"])
		{
			if(hoverSpot("FULLSCREEN_ICON")) context.globalAlpha = 1; else context.globalAlpha = 0.75;
	
			spot["FULLSCREEN_ICON"].x = temp_x;
			if(gameEngine["globalFullscreen"]) icon = "fullscreen_on"; else icon = "fullscreen_off";
			drawImage(manifest[icon], spot["FULLSCREEN_ICON"].x, spot["FULLSCREEN_ICON"].y);
			temp_x -= spot["FULLSCREEN_ICON"].width + spot["WINDOW_BUTTONS"].margin;
		}
			
		if(!gameEngine["globalAudioDisabled"])
		{
			if(hoverSpot("SOUND_ICON")) context.globalAlpha = 1; else context.globalAlpha = 0.75;
	
			spot["SOUND_ICON"].x = temp_x;
			if(gameEngine["globalAudio"]) icon = "sound_on"; else icon = "sound_off";
			drawImage(manifest[icon], spot["SOUND_ICON"].x, spot["SOUND_ICON"].y);
			temp_x -= spot["SOUND_ICON"].width + spot["WINDOW_BUTTONS"].margin;
		}
		
		//if(hoverSpot("KEYBOARD_ICON")) context.globalAlpha = 1; else context.globalAlpha = 0.75;

		//spot["KEYBOARD_ICON"].x = temp_x;
		//if(keyboard["status"] == "hidden") icon = "keyboard_off"; else icon = "keyboard_on";
		//drawImage(manifest[icon], spot["KEYBOARD_ICON"].x, spot["KEYBOARD_ICON"].y);
		//temp_x -= spot["KEYBOARD_ICON"].width + spot["WINDOW_BUTTONS"].margin;
					
	}
	
	// *** Keyboard
	if(keyboard["status"] != "hidden") drawKeyboard();
}
