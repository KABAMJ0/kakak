// *** Animates (calculates) all
function animateAll()
{
	if(gameEngine["play"])
	{
		gameEngine["framerateStats"].begin();
				
		for(iii = 1; iii <= gameEngine["framerateRecalculations"]; iii++)
		{
			if(game["status"] == "")
			{
				// *** Dragging over wheel
				if(game["dragging"])
				{
					if(hitSpot(game["mouseX"], game["mouseY"], "PACMAN_WHEEL"))
					{						
						pacmanMove(determineWheelDir(game["mouseX"], game["mouseY"]));
					}						
				}
	
				// *** Pacman
				pacmanCalcProgress();
				
			}
					
			// *** Objects
			for(key in o)
			{
				proto = oPrototype[o[key].prototype];

				if(proto.category == "text")			
				{
					// *** Demo: handle all fruity objects (make them bounce around the game)				
					o[key].x += o[key].xSpeed;
					o[key].y += o[key].ySpeed;
					
					o[key].alpha += proto.alphaSpeed;
					
					if(o[key].alpha <= 0) delete o[key];
					
								
				}
				else if(proto.category == "ghost" && game["pacmanStatus"] == "")
				{
					pacmanRenderGhost(key);
				}
				else if(proto.category == "particles")			
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
		drawImage(manifest["pacman_bg"], spot["INTRO"].x, spot["INTRO"].y);
		
		context.globalAlpha = 0.5;
		context.fillColor = "#282421";
		context.fillRect(0, 0, game["width"], game["height"]); 			

		context.globalAlpha = 1;
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
		// *** Pacman: Interface
		context.globalAlpha = 1;
		drawImage(manifest["pacman_bg"], spot["INTRO"].x, spot["INTRO"].y);
		//drawImage(manifest["logo"], spot["PACMAN_LOGO"].x, spot["PACMAN_LOGO"].y, true);
		//drawTextarea(stopwatch(game["time"]), "PACMAN_TIME");
		//drawImage(manifest["button_back"], spot["BUTTON_BACK"].x, spot["BUTTON_BACK"].y);

		drawText("LEVEL:", "PACMAN_LEVEL_SUB");
		drawText(game["pacmanLevel"], "PACMAN_LEVEL");
		

		drawText("SCORE:", "PACMAN_SCORE_SUB");
		drawText(game["score"], "PACMAN_SCORE");
		
		if(game["wlTop"] != "-")
		{
			thisFont = "bold 60px Arial";
			if(game["wlTop"].length > 8) thisFont = "bold 40px Arial";
			if(game["wlTop"].length > 12) thisFont = "bold 30px Arial";
			if(game["wlTop"].length > 17) thisFont = "bold 22px Arial";
			
			spot["PACMAN_WL_TOP"].font = thisFont;
			spot["PACMAN_WL_TOP_TYPED"].font = thisFont;
			
			drawText(game["wlTop"], "PACMAN_WL_TOP");
			drawText(game["wlTop"].substr(0, game["wlTopTyped"]-1), "PACMAN_WL_TOP_TYPED");
			
			/*
			context.globalAlpha = game["pulsate"];
			drawText(game["wlTop"].substr(0, game["wlTopTyped"]), "PACMAN_WL_TOP_TYPED");
			context.globalAlpha = 1;
			*/
		}
				
		if(game["wlBottom"] != "-")
		{
			thisFont = "bold 60px Arial";
			if(game["wlBottom"].length > 8) thisFont = "bold 40px Arial";
			if(game["wlBottom"].length > 12) thisFont = "bold 30px Arial";
			if(game["wlBottom"].length > 17) thisFont = "bold 22px Arial";
			
			spot["PACMAN_WL_BOTTOM"].font = thisFont;
			spot["PACMAN_WL_BOTTOM_TYPED"].font = thisFont;
			
			drawText(game["wlBottom"], "PACMAN_WL_BOTTOM");
			drawText(game["wlBottom"].substr(0, game["wlBottomTyped"]-1), "PACMAN_WL_BOTTOM_TYPED");

			/*
			context.globalAlpha = game["pulsate"];
			drawText(game["wlBottom"].substr(0, game["wlBottomTyped"]), "PACMAN_WL_BOTTOM_TYPED");
			context.globalAlpha = 1;
			*/
		}


		tempWLcount = 0;
		
		for(key in wl)
		{
			if(wl[key] != "-") tempWLcount++;
		}
		
		if(game["wlTop"] != "-") tempWLcount++;
		if(game["wlBottom"] != "-") tempWLcount++;
		
		drawText("WOORDEN:", "PACMAN_WORDS_LEFT_SUB");
		drawText(game["pacmanWordCount"], "PACMAN_WORDS_LEFT");


		if(game["pacmanLives"] >= 1) tempManifest = "pacman_life"; else tempManifest = "pacman_nolife";
		drawImage(manifest[tempManifest], spot["PACMAN_LIFE_1"].x, spot["PACMAN_LIFE_1"].y);

		if(game["pacmanLives"] >= 2) tempManifest = "pacman_life"; else tempManifest = "pacman_nolife";
		drawImage(manifest[tempManifest], spot["PACMAN_LIFE_2"].x, spot["PACMAN_LIFE_2"].y);

		if(game["pacmanLives"] >= 3) tempManifest = "pacman_life"; else tempManifest = "pacman_nolife";
		drawImage(manifest[tempManifest], spot["PACMAN_LIFE_3"].x, spot["PACMAN_LIFE_3"].y);
		
		context.globalAlpha = 1;
		
		
		if(Math.random() > 0.8) addParticle(11, 356, 303 + Math.random()*22);
		if(Math.random() > 0.8) addParticle(12, 1046, 303 + Math.random()*22);
		if(Math.random() > 0.8) addParticle(13, 668 + Math.random()*70, 317);
		
		if(game["pacmanNextR"] != -1 && !game["pacmanStopped"]) drawImage(manifest["joystick_wheel_" + game["pacmanNextR"]], spot["PACMAN_WHEEL"].x, spot["PACMAN_WHEEL"].y); else drawImage(manifest["joystick_wheel"], spot["PACMAN_WHEEL"].x, spot["PACMAN_WHEEL"].y);

		//renderScores();
		
			
		// *** Pacman: Level	
		pacmanDrawLevel();
		
		// *** Pacman: pacman
		pacmanDrawPacman("#ffff00");
		
		game["pacmanGhostAniCount"]++;
		if(game["pacmanGhostAniCount"] > 8) game["pacmanGhostAniCount"] = 1;
		
				
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
		
		drawButton("HIGHSCORE_SUBMIT", "score plaatsen");
		drawButton("HIGHSCORE_PLAY",   "doorgaan");
		
	}
	
	renderObjects("");
	renderParticles("");
	
	context.globalAlpha = 1;
	

	if(game["status"] == "")
	{
		if(game["pacmanStatus"] == "CAUGHT" || game["pacmanStatus"] == "WON")
		{
			if(game["pacmanStatusCount"] > 100)
			{				
				context.globalAlpha = 0.5 + game["pulsateCos"] * 0.5;
				drawText("Druk om door te gaan...", "PACMAN_CONTINUE", spot["PACMAN_CONTINUE"].x, spot["PACMAN_CONTINUE"].y + game["pulsate"] * 20);				
				context.globalAlpha = 1;
			}		
		}	
	}
	
	
		
	// *** Window buttons (icons in top right corner)
	if(game["status"] != "PRELOAD_PRELOADER") // && game["status"] != "PLAYBUTTON"
	{	
		temp_x = spot["WINDOW_BUTTONS"].x;

		if(hoverSpot("CLOSE_ICON")) context.globalAlpha = 1; else context.globalAlpha = 0.5;
		
		spot["CLOSE_ICON"].x = temp_x;
		drawImage(manifest["close"], spot["CLOSE_ICON"].x, spot["CLOSE_ICON"].y);
		temp_x -= spot["CLOSE_ICON"].width + spot["WINDOW_BUTTONS"].margin;
		
		if(!gameEngine["globalFullscreenDisabled"])
		{
			if(hoverSpot("FULLSCREEN_ICON")) context.globalAlpha = 1; else context.globalAlpha = 0.5;
	
			spot["FULLSCREEN_ICON"].x = temp_x;
			if(gameEngine["globalFullscreen"]) icon = "fullscreen_on"; else icon = "fullscreen_off";
			drawImage(manifest[icon], spot["FULLSCREEN_ICON"].x, spot["FULLSCREEN_ICON"].y);
			temp_x -= spot["FULLSCREEN_ICON"].width + spot["WINDOW_BUTTONS"].margin;
		}
			
		if(!gameEngine["globalAudioDisabled"])
		{
			if(hoverSpot("SOUND_ICON")) context.globalAlpha = 1; else context.globalAlpha = 0.5;
	
			spot["SOUND_ICON"].x = temp_x;
			if(gameEngine["globalAudio"]) icon = "sound_on"; else icon = "sound_off";
			drawImage(manifest[icon], spot["SOUND_ICON"].x, spot["SOUND_ICON"].y);
			temp_x -= spot["SOUND_ICON"].width + spot["WINDOW_BUTTONS"].margin;
		}
		
		/*
		if(hoverSpot("KEYBOARD_ICON")) context.globalAlpha = 1; else context.globalAlpha = 0.5;

		spot["KEYBOARD_ICON"].x = temp_x;
		if(keyboard["status"] == "hidden") icon = "keyboard_off"; else icon = "keyboard_on";
		drawImage(manifest[icon], spot["KEYBOARD_ICON"].x, spot["KEYBOARD_ICON"].y);
		temp_x -= spot["KEYBOARD_ICON"].width + spot["WINDOW_BUTTONS"].margin;
		*/			
	}
	
	// *** Keyboard
	if(keyboard["status"] != "hidden") drawKeyboard();
}
