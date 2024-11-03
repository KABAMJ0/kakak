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

				if(proto.category == "particles")			
				{
					// *** Objects that use particles
					o[key].count += o[key].speed;
					
					if(o[key].prototype == "GLITTERBOX")
					{
						for(i = 1; i <= 2; i++)
						{
							if((i == 1 && o[key].position == "top") || (i == 2 && o[key].position == "bottom")) { xExtra = o[key].count; yExtra = 0; if(o[key].count > o[key].width) { o[key].count -= o[key].width; o[key].position = "right"; } }							
							if((i == 1 && o[key].position == "right") || (i == 2 && o[key].position == "left")) { xExtra = o[key].width; yExtra = o[key].count; if(o[key].count > o[key].height) { o[key].count -= o[key].height; o[key].position = "bottom"; } }													
							if((i == 1 && o[key].position == "bottom") || (i == 2 && o[key].position == "top")) { xExtra = o[key].width - o[key].count; yExtra = o[key].height; if(o[key].count > o[key].width) { o[key].count -= o[key].width; o[key].position = "left"; } }													
							if((i == 1 && o[key].position == "left") || (i == 2 && o[key].position == "right")) { xExtra = 0; yExtra = o[key].height - o[key].count; if(o[key].count > o[key].height) { o[key].count -= o[key].height; o[key].position = "top"; xExtra = -yExtra; yExtra = 0; } }						
							if(i == 1 || (i == 2 && o[key].mirrored)) { addParticle(o[key].particle, o[key].x + xExtra, o[key].y + yExtra);	 }							
						}					
					}

					if(o[key].prototype == "GLITTERCIRCLE")
					{
						xExtra = Math.cos(o[key].count) * o[key].r; yExtra = Math.sin(o[key].count) * o[key].r;
						addParticle(o[key].particle, o[key].x + xExtra, o[key].y + yExtra);

						if(o[key].mirrored) { xExtra = Math.cos(o[key].count + toRadians(180)) * o[key].r; yExtra = Math.sin(o[key].count + toRadians(180)) * o[key].r;	addParticle(o[key].particle, o[key].x + xExtra, o[key].y + yExtra); }							
					}
				}
					
				if(o[key].category == "sunbeam")
				{					
					for(i = 1; i <= 10; i++)
					{
						if(o[key].initialize) { o[key][i] = new Array(); o[key][i].alpha = Math.random(); }
						if(o[key].initialize || o[key][i].alpha == 0) { o[key][i].r = (Math.random() * 360); o[key][i].width = 0.1 + Math.random() * 0.3; o[key][i].speed = -Math.random() * 2 - 1; }
						if(o[key].radius >= 2000) o[key][i].r += o[key][i].speed/10; else o[key][i].r += o[key][i].speed;
						o[key][i].alpha += 0.02;				
						if(o[key][i].alpha >= toRadians(180)) o[key][i].alpha = 0;	
					}
					
					o[key].initialize = false;				
				}									
			}
			

							
			// *** Pulsating (sinus or cosinus) number between 0 and 1, much used for alpha animations
			game["pulsateX"] += game["pulsateSpeed"];
			game["pulsate"] = (Math.sin(game["pulsateX"]) + 1) / 2;
			game["pulsateCos"] = (Math.cos(game["pulsateX"]) + 1) / 2;

			game["pulsateFishX"] += game["pulsateFishSpeed"];
			game["pulsateFish"] = (Math.sin(game["pulsateFishX"]) + 1) / 2;
			game["pulsateFishCos"] = (Math.cos(game["pulsateFishX"]) + 1) / 2;

		
			// *** Particles
			for(key in particle)
			{
				particle[key].x += particle[key].xSpeed; particle[key].xSpeed += particle[key].xSpeedChange;
				if(particle[key].prototype == 12) particle[key].x += game["backgroundSpeed"]*3;
				
				particle[key].y += particle[key].ySpeed; particle[key].ySpeed += particle[key].ySpeedChange;
				particle[key].size += particle[key].sizeChange;
				particle[key].alpha += particle[key].alphaChange;

				if(particlePrototype[particle[key].prototype].bounces)
				{
					if(particlePrototype[particle[key].prototype].bouncesLeft && particle[key].x < 0) 		{ particle[key].x = 0; 			particle[key].xSpeed = -particle[key].xSpeed * game["bouncyness"]; }					
					if(particlePrototype[particle[key].prototype].bouncesRight && particle[key].x > game["width"]) 	{ particle[key].x = game["width"]; 	particle[key].xSpeed = -particle[key].xSpeed * game["bouncyness"]; }
					if(particlePrototype[particle[key].prototype].bouncesTop && particle[key].y < 0) 		{ particle[key].y = 0; 			particle[key].ySpeed = -particle[key].ySpeed * game["bouncyness"]; }
					if(particlePrototype[particle[key].prototype].bouncesBottom && particle[key].y > game["height"]){ particle[key].y = game["height"]; 	particle[key].ySpeed = -particle[key].ySpeed * game["bouncyness"]; }
				}							
				
				
				if(particle[key].prototype == 12 && particle[key].y < 85) {delete particle[key];}
				else if(particle[key].prototype == 17 && particle[key].alpha < 0.099) {delete particle[key];}
				else if(particle[key].prototype == 18 && particle[key].alpha < 0.019) {delete particle[key];}
				else if(particle[key].y < -100 || particle[key].y > game["height"] + (particle[key].size / 2) || particle[key].size <= 0 || particle[key].alpha <= 0 || (Math.random() < particlePrototype[particle[key].prototype].destructionChance)) delete particle[key];
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

function questionContinue()
{
	if(game["answer"][game["round"]][game["question"]].correct == 2)
	{
		nextQuestion();
	}
	else
	{
		if(game["questionsCorrect"] < 5)
		{
			nextQuestion();					
		}
		else
		{
			game["playerLevelCurr"]++;			
			game["questionsCorrect"] = 0;
			game["status"] = "";
			game["playerBullets"] = game["playerBulletsMax"];
		}				
	}
}
	
	
// *** Draw the whole canvas
function drawAll()
{
	// *** Draw an image: drawImage(img, x, y, width, height, deg, flip, flop, center)
	// *** Mark a spot (red border to see where it is): drawSpot("SPOT");

	// *** background: clear all!
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.globalAlpha = 1;

	game["count"]++;
	
	if(game["count"]%18 == 0){tick()}
	
	// *** Screens
	if(game["status"] == "PLAYBUTTON" || game["status"] == "PRELOAD" || game["status"] == "INTRO" || game["status"] == "SAVE_DOCENTEN")
	{
		//renderBackground();
		//renderForeground();

		// wlRender();
		
		context.globalAlpha = 1;

		drawImage(manifest["bg_cutscene"], 0, 0, true, true, false, false, false, false);
		
		context.globalAlpha = 0.5 + game["pulsate"]/2;
		if(game["status"] == "PLAYBUTTON") drawTextarea("Klik om door te gaan!", "INTRO_CONTINUE", 700, 675);

		context.globalAlpha = 1;
		
		//drawImage(manifest["logo"], spot["INTRO_LOGO"].x, spot["INTRO_LOGO"].y, manifest["logo"].width, manifest["logo"].height, false, false, false, true);
		
		tempExtraX = Math.random()*manifest["logo"].width;
		//if(Math.random() > 0.7) addParticle(12, spot["INTRO_LOGO"].x - manifest["logo"].width/2 + tempExtraX, spot["INTRO_LOGO"].y + 58);
		
		
		context.globalAlpha = 1;
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
			if(game["orientation"] == "landscape") { if(checkOrientation() == "portrait") gameEngine["playButtonStatus"] = "TURN_MANEUVRE"; }
			else { if(checkOrientation() == "landscape") gameEngine["playButtonStatus"] = "TURN_MANEUVRE"; }
		}
		
		if(gameEngine["playButtonStatus"] == "TURN_MANEUVRE")
		{
			context.globalAlpha = 0.75;
			context.fillStyle = "#000000";
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
	else if(game["status"] == "QUESTION")
	{
		renderBackground(false);
		drawImage(manifest["fg"], spot["INTRO"].x, spot["INTRO"].y);


		// *** wl		
		wlRenderQuestion(false);
		
		
		// *** Octopus
		tempHeight = spot["OCTOPUS"].height + game["pulsate"]*7;

		drawImage(manifest["octopus_tentacle_left"], spot["OCTOPUS"].x - 125, spot["OCTOPUS"].y - 60, 59 + game["pulsate"]*4, 214 - game["pulsateCos"]*6, game["pulsateCos"]*3, false, false, true);
		drawImage(manifest["octopus_tentacle_right"], spot["OCTOPUS"].x + 11, spot["OCTOPUS"].y - 45, 109 - game["pulsateCos"]*4, 310 + game["pulsate"]*5, game["pulsate"]*3, false, false, true);

		drawImage(manifest["octopus_body"], spot["OCTOPUS"].x, spot["OCTOPUS"].y, spot["OCTOPUS"].width, tempHeight, false, false, false, true);
		
		if(game["octopusBlink"] > 0) game["octopusBlink"]--;
		if(Math.random() > 0.99) game["octopusBlink"] = 6;
		
		if(game["octopusBlink"] == 1 || game["octopusBlink"] == 2 || game["octopusBlink"] == 5 || game["octopusBlink"] == 6) drawImage(manifest["octopus_blink_1"], spot["OCTOPUS"].x, spot["OCTOPUS"].y, spot["OCTOPUS"].width, tempHeight, false, false, false, true);
		if(game["octopusBlink"] == 3 || game["octopusBlink"] == 4) drawImage(manifest["octopus_blink_2"], spot["OCTOPUS"].x, spot["OCTOPUS"].y, spot["OCTOPUS"].width, tempHeight, false, false, false, true);
		
		if(game["octopusSmile"] > 0) game["octopusSmile"]--;
		// if(Math.random() > 0.999) game["octopusSmile"] = 50;
		
		if(game["octopusSmile"] == 0) drawImage(manifest["octopus_smile_1"], spot["OCTOPUS"].x, spot["OCTOPUS"].y, spot["OCTOPUS"].width, tempHeight, false, false, false, true);
		else if(game["octopusSmile"] == 1 || game["octopusSmile"] == 2 || game["octopusSmile"] == 48 || game["octopusSmile"] == 49 || game["octopusSmile"] == 50) drawImage(manifest["octopus_smile_2"], spot["OCTOPUS"].x, spot["OCTOPUS"].y, spot["OCTOPUS"].width, tempHeight, false, false, false, true);
			



		// *** Bullets
		/*
		for(i = 1; i <= game["playerBulletsMax"]; i++)
		{
			if(game["playerBullets"] >= i) tempManifest = "bullet"; else tempManifest = "bullet_empty"; 			
			drawImage(manifest[tempManifest], spot["BULLETS_QUESTION"].x + (i-1) * spot["BULLETS_QUESTION"].width, spot["BULLETS_QUESTION"].y - game["sentenceExtraY"]);		
		}
		*/

				
		// *** Result screen
		if(game["statusAni"] == "RESULT")
		{
			drawImage(manifest["bg_result"], spot["BG"].x, spot["BG"].y);
			
			tempX = spot["RESULT"].x;
			tempY = spot["RESULT"].y;
			tempCount = 0;
			
			for(i = 1; i <= game["answer"][game["round"]].questions; i++)
			{
				if(game["answer"][game["round"]][i].correct != 0)
				{
					tempManifest = "";
					if(game["answer"][game["round"]][i].correct == 1) { tempManifest = "check"; tempTextManifest = "RESULT_CORRECT"; }
					if(game["answer"][game["round"]][i].correct == 2) { tempManifest = "cross"; tempTextManifest = "RESULT_WRONG"; }
					
					drawImage(manifest[tempManifest], tempX, tempY);
					
					drawText(game["answer"][game["round"]][i].correctAnswer, "RESULT", tempX + 100, tempY + 35);
					drawText(game["answer"][game["round"]][i].answer, tempTextManifest, tempX + 100, tempY + 65);
					
					tempY += 90;
					
					tempCount++;
					
					if(tempCount >= 5)
					{
						tempX += 440;
						tempY = spot["RESULT"].y;
						tempCount = 0;
					}
				}
			}

			drawButton("RESULT_BUTTON", "Doorgaan");						
		}



		// *** Score screen
		if(game["statusAni"] == "SCORE")
		{
			tempManifest = "bg_score_4";
			
			//game["answer"][game["round"]].score = 10;
			
			if(game["score"] < 100) { tempText = "Onvoldoende :("; tempManifest = "bg_score_4"; }
			if(game["score"] > 500)   { tempText = "Voldoende, blijf oefenen!"; tempManifest = "bg_score_3"; }
			if(game["score"] > 1000) { tempText = "Goed gedaan!"; tempManifest = "bg_score_2"; }
			if(game["score"] >= 2000) { tempText = "Geweldig, foutloos!"; tempManifest = "bg_score_1"; }
						
			drawImage(manifest[tempManifest], spot["BG"].x, spot["BG"].y);

			drawText("Jouw score:", "SCORE_HEADER");
			drawText(game["score"], "SCORE_SCORE");
			//drawText(tempText, "SCORE_TEXT");
			
			drawButton("SCORE_BUTTON", "Doorgaan");			

			if(game["score"] >= 2000) addParticle(11, Math.random()*1400, Math.random()*700);
		}
			
	}
	else if(game["status"] == "SELECT")
	{
		// *** Select/upgrade boat and go!
		//game["bgOceanX"] -= 0.5;
		//if(game["bgOceanX"] < -700) game["bgOceanX"] += 700;
		//game["bgOceanY"] -= 0.5;
		//if(game["bgOceanY"] < -700) game["bgOceanY"] += 700;
			
		// renderBackground();

		renderObjects("BEHIND");
		renderParticles("BEHIND");
				
		drawImage(manifest["bg"], 0, 0);
		drawImage(manifest["bg_select"], 0, 0);
		//drawImage(manifest["bg_guide"], 0, 0);
		
		
		// *** Left col (coureur / track)
		drawText("Coureur:", "TEXT_LARGE_CENTER", 158, 41);
		
		drawButton("SELECT_BUTTON_AVATAR_LEFT", "", "game_ui_button_small");
		drawImage(manifest["game_ui_arrow_left"], spot["SELECT_BUTTON_AVATAR_LEFT"].x + 15, spot["SELECT_BUTTON_AVATAR_LEFT"].y + 16);
		drawButton("SELECT_BUTTON_AVATAR_RIGHT", "", "game_ui_button_small");
		drawImage(manifest["game_ui_arrow_right"], spot["SELECT_BUTTON_AVATAR_RIGHT"].x + 18, spot["SELECT_BUTTON_AVATAR_RIGHT"].y + 16);

		drawImage(manifest["game_ui_bg_avatar"], 112, 72);
		drawImage(manifest["avatar_" + game["avatar"]], 112 + 5, 72 + 5);
		
		drawButton("SELECT_BUTTON_AVATAR_NAME", "", "game_ui_button_name");
		drawText(game["avatarName"], "TEXT_MEDIUM_CENTER", 158, 194);

		drawText("Volgende baan:", "TEXT_LARGE_CENTER", 158, 267);
		drawImage(manifest["track_" + game["trackCurrent"] + "_select"], 158, 370, true);
		drawText(game["track"][game["trackCurrent"]].name, "TEXT_MEDIUM_CENTER", 158, 485);
		drawText("3 laps", "TEXT_MEDIUM_CENTER", 158, 514);

		drawText("1e plek:", "TEXT_SMALL_LEFT", 32, 554);		
		drawText("2e plek:", "TEXT_SMALL_LEFT", 129, 554);
		drawText("3e plek:", "TEXT_SMALL_LEFT", 219, 554);

		tempMultiplier = game["boat"][game["selectedBoat"]]["upgrade4"][game["boat"][game["selectedBoat"]]["upgrade4"].upgradesDone].value;
		
		drawCoinValue(Math.ceil(game["trackWin1"] * tempMultiplier), 32, 577, "SMALL");
		drawCoinValue(Math.ceil(game["trackWin2"] * tempMultiplier), 129, 577, "SMALL");
		drawCoinValue(Math.ceil(game["trackWin3"] * tempMultiplier), 219, 577, "SMALL");


		if(game["track"][game["trackCurrent"]].best > 0)
		{
			drawStopwatch("Jouw beste tijd:", game["track"][game["trackCurrent"]].best, 105, 665);
		}

		//drawStopwatch("bestCompare", game["track"][game["trackCurrent"]].bestCompare, 215, 665);

		// *** Middle col (boats)
		drawText("Auto:", "TEXT_LARGE_CENTER", 460, 41);
		
		for(i = 1; i <= 4; i++)
		{	
			drawButton("SELECT_BUTTON_BOAT_" + i, "", "game_ui_button_boat");
			
			if(game["selectedBoat"] == i)
			{
				drawImage(manifest["game_ui_button_boat_selected"], spot["SELECT_BUTTON_BOAT_" + i].x, spot["SELECT_BUTTON_BOAT_" + i].y);
			}
			
			drawLargeBoat(i, spot["SELECT_BUTTON_BOAT_" + i].x + 284/2, spot["SELECT_BUTTON_BOAT_" + i].y + 145/2, -90, 0.45);
			
			if(game["boat"][i].bought) drawText("GEKOCHT", "TEXT_SMALL_LEFT", spot["SELECT_BUTTON_BOAT_" + i].x + 212, spot["SELECT_BUTTON_BOAT_" + i].y + 132); else drawCoinValue(game["boat"][i].price, spot["SELECT_BUTTON_BOAT_" + i].x + 212, spot["SELECT_BUTTON_BOAT_" + i].y + 132, "SMALL");
		}
		

		// *** Right col (boat details)
		drawCoinValue(game["coins"], 898, 70, "LARGE");
		
		drawLargeBoat(game["selectedBoat"], 985, 350, 0, 1);


		// *** Upgrades
		for(j = 1; j <= 5; j++)
		{		
			tempX = spot["SELECT_UPGRADE_" + j].x + 2; tempY = spot["SELECT_UPGRADE_" + j].y - 82;
			tempUpgradesDone = game["boat"][game["selectedBoat"]]["upgrade" + j].upgradesDone;
			if(tempUpgradesDone < 5) tempUpgradeCost = game["boat"][game["selectedBoat"]]["upgrade" + j][(tempUpgradesDone+1)].cost;
			
			drawText(game["boat"][game["selectedBoat"]]["upgrade" + j].title, "TEXT_LARGE_LEFT", tempX, tempY);
			drawText(game["boat"][game["selectedBoat"]]["upgrade" + j].desc, "TEXT_SMALL_LEFT", tempX, tempY + 30);
			
			for(i = 1; i <= 5; i++)
			{
				if(tempUpgradesDone >= i) drawImage(manifest["game_ui_star"], tempX + (i-1)*32, tempY + 40); else drawImage(manifest["game_ui_star_empty"], tempX + (i-1)*32, tempY + 40);
			}		
			
			if(tempUpgradesDone >= 5)
			{
			
			}
			else if(game["coins"] < tempUpgradeCost)
			{
				context.globalAlpha = 0.5;
				drawImage(manifest["game_ui_button_add"], spot["SELECT_UPGRADE_" + j].x, spot["SELECT_UPGRADE_" + j].y);		
				drawCoinValue(tempUpgradeCost, spot["SELECT_UPGRADE_" + j].x + 10, spot["SELECT_UPGRADE_" + j].y + 33, "MEDIUM");
				context.globalAlpha = 1;
			}
			else
			{
				drawButton("SELECT_UPGRADE_" + j, "", "game_ui_button_add");
				drawImage(manifest["game_ui_plus"], spot["SELECT_UPGRADE_" + j].x + 127, spot["SELECT_UPGRADE_" + j].y + 12);
				drawCoinValue(tempUpgradeCost, spot["SELECT_UPGRADE_" + j].x + 10, spot["SELECT_UPGRADE_" + j].y + 33, "MEDIUM");
			}
		}
		
		// *** Race button
		thisPossible = false;
			
		for(key in wl)
		{
			if(!wl[key].done) thisPossible = true;
		}	
		
		if(1==1 || thisPossible) // ******************************
		{		
			drawButton("SELECT_BUTTON_RACE", "", "game_ui_button_big");
			drawText("Racen!", "TEXT_LARGE_CENTER_BROWN", spot["SELECT_BUTTON_RACE"].x + 186/2, spot["SELECT_BUTTON_RACE"].y + 43);
			
			tempCost = game["raceCost"];
			if(tempCost > game["coins"]) tempCost = game["coins"];
			drawCoinValue(tempCost, spot["SELECT_BUTTON_RACE"].x + 69, spot["SELECT_BUTTON_RACE"].y + 66, "SMALL");
			addParticle(9, spot["SELECT_BUTTON_RACE"].x + Math.random()*spot["SELECT_BUTTON_RACE"].width, spot["SELECT_BUTTON_RACE"].y + 25, "BEHIND");
			addParticle(9, spot["SELECT_BUTTON_RACE"].x + (Math.random()*(spot["SELECT_BUTTON_RACE"].width-100))+50, spot["SELECT_BUTTON_RACE"].y + 15, "BEHIND");
		}
		else
		{
			context.globalAlpha = 0.5;
			drawButton("SELECT_BUTTON_RACE", "", "game_ui_button_big");
			drawText("Momentje", "TEXT_LARGE_CENTER_BROWN", spot["SELECT_BUTTON_RACE"].x + 186/2, spot["SELECT_BUTTON_RACE"].y + 52);		
		}	


		// *** Cut scene
		if(game["count"] < 25)
		{
			context.globalAlpha = (25-game["count"])/25;
			drawImage(manifest["bg_cutscene"], 0, 0);
			
			if(!game["endedRaceManually"]) drawCutsceneText();
			
			if(game["count"] == 1 && game["positionFinish"] <= 3)
			{
				if(game["endedRaceManually"])
				{
					
				}
				else
				{
					playSound("coins");
					
					tempMultiplier = game["boat"][game["selectedBoat"]]["upgrade4"][game["boat"][game["selectedBoat"]]["upgrade4"].upgradesDone].value;

					console.log("Cut scene coins " + game["coins"]);
					
					if(game["positionFinish"] == 1) game["coins"] += Math.ceil(game["trackWin1"] * tempMultiplier);
					if(game["positionFinish"] == 2) game["coins"] += Math.ceil(game["trackWin2"] * tempMultiplier);
					if(game["positionFinish"] == 3) game["coins"] += Math.ceil(game["trackWin3"] * tempMultiplier);
                   			// if(game["avatarName"] == "Jacobkaas") {game["coins"] += 5000};
					
					console.log("Cut scene coins now " + game["coins"]);
					
					setRaceCookie();
				}				
			}
			
			context.globalAlpha = 1;
		}
				
	}
	else if(game["status"] == "RANKING")
	{
		drawImage(manifest["ranking_bg"], 0, 0);

		drawText("Je staat op plek", "RANKING_TEXT", 50, 308);
		drawText(game["rankingPos"], "RANKING_TEXT_HUGE", 50, 308 + 135);
		drawText("in de ranglijst!", "RANKING_TEXT", 50, 308 + 180);

		drawButton("SELECT_BUTTON_RACE", "", "game_ui_button_big");
		drawText("Doorgaan", "TEXT_LARGE_CENTER_BROWN", spot["SELECT_BUTTON_RACE"].x + 186/2, spot["SELECT_BUTTON_RACE"].y + 43 + 10);
					
		if(game["count"] > 25 && game["rankingPos"] != game["rankingPosPrev"])
		{
			tempYdest = -game["rankingPos"]*70 + 8*70;		
			game["rankingY"] += (tempYdest - game["rankingY"])*0.1;
			
			if(game["rankingY"] > tempYdest - 3 && game["rankingY"] < tempYdest + 3)
			{
				console.log("Snap!");
				playSound("metal_hit");
				
				game["rankingY"] = tempYdest;
				game["rankingPosPrev"] = game["rankingPos"];
				
				for(j = 1; j <= 500; j++)
				{
					addParticle(3, 370 + Math.random()*660, 495 + Math.random()*60);
					//addParticle(9, 370 + Math.random()*660, 495 + Math.random()*60);
				}
				
				game["rankingYextra"] = -70;
			}
		}
				
		tempY = game["rankingY"];
		
		
		drawImage(manifest["ranking_top"], 230, tempY - 200);
		
		if(game["rankingPos"] == 1)
		{
			drawText("Je bent eerste!", "RANKING_TEXT_HUGE_2", 410, tempY - 310);
			
			context.globalAlpha = game["pulsate"];
			drawText("Je bent eerste!", "RANKING_TEXT_HUGE_3", 410, tempY - 310);
			
			context.globalAlpha = 1;
			drawText("GEWELDIG GEDAAN!", "RANKING_TEXT", 410 + 150, tempY - 255);

			if(Math.random() > 0.9) addParticle(19, 400 + Math.random()*600, tempY);
			
			addParticle(9, 400 + Math.random()*600, tempY);
		}
		
		tempExtraI = 0;
		game["rankingYextra"] *= 0.8;
		
		for(i = 1; i <= 100; i++)
		{
			if(game["rankingPosPrev"] == i)
			{
				context.globalAlpha = 0.75 + game["pulsate"]/4;
				drawImage(manifest["ranking_box"], 370, 490);
				context.globalAlpha = 1;
				drawImage(manifest["avatar_" + game["avatar"]], 370 + 6, 490 + 6, 50, 50);
				
				drawText(game["rankingPosPrev"] + ".", "RANKING_TEXT_BLACK", 370 + 72, 490 + 43);
				drawText(game["avatarName"], "RANKING_TEXT_BLACK", 370 + 72 + 70, 490 + 43);
				
				tempExtraI++;
				tempY += 70;
			}
			
			if(i+tempExtraI <= 100)
			{
				if(tempExtraI > 0) tempYextra = game["rankingYextra"]; else tempYextra = 0;
				
				if(tempY > -100 && tempY < 800)
				{
					context.globalAlpha = 0.4;
					drawImage(manifest["ranking_box"], 370, tempY + tempYextra);
					
					context.globalAlpha = 1;
					drawImage(manifest["avatar_" + opponentInfo[i].avatar], 370 + 6, tempY + 6 + tempYextra, 50, 50);
					
					drawText((i+tempExtraI) + ".", "RANKING_TEXT", 370 + 72, tempY + 43 + tempYextra);
					drawText(opponentInfo[i].name, "RANKING_TEXT", 370 + 72 + 70, tempY + 43 + tempYextra);

					context.globalAlpha = 0.4;
					drawImage(manifest["boat_" + opponentInfo[i].car + "_small_shadow"], 370 + 580 + 2, tempY + 30 + tempYextra + 4, true, true, -90, false, false, true);
					
					context.globalAlpha = 1;
					drawImage(manifest["boat_" + opponentInfo[i].car + "_small_v" + opponentInfo[i].carVariation], 370 + 580, tempY + 30 + tempYextra, true, true, -90, false, false, true);
				}
			}
			
			tempY += 70;
		
		}
	}
	else if(game["status"] == "")
	{	
		game["countCheckpoint"]++;
		
		// stopSound(game["music"]);

				
		// *** Player movement		
		tempPlayerRold = game["playerR"];
		tempPlayerXold = game["playerX"];
		tempPlayerYold = game["playerY"];

		if(!game["raceEnded"] && game["raceStarted"] && game["raceCountdown"] >= 5)
		{		
			if(pressedKeys[38] || pressedKeys[87] || (game["touchSpeed"] == 1 && !game["driverKeys"])) steerUp();
			if(pressedKeys[40] || pressedKeys[83] || (game["touchSpeed"] == -1 && !game["driverKeys"])) steerDown();
			if(pressedKeys[37] || pressedKeys[65] || (game["touchAction"] == "LEFT" && !game["driverKeys"])) steerLeft();
			if(pressedKeys[39] || pressedKeys[68] || (game["touchAction"] == "RIGHT" && !game["driverKeys"])) steerRight();			
		}
		
				
		game["playerSpeed"] *= (1 - game["playerAcceleration"]/35);
		game["playerRspeed"] *= 0.8;
		game["playerRextra"] *= 0;
		
		
		game["playerR"] += game["playerRspeed"];
		//if(game["playerR"] > 360) game["playerR"] -= 360;
		//if(game["playerR"] < -360) game["playerR"] += 360;
		
		game["playerXspeed"] = -Math.sin(toRadians(game["playerR"])) * game["playerSpeed"];
		game["playerYspeed"] = -Math.cos(toRadians(game["playerR"])) * game["playerSpeed"];
		
				
		game["playerX"] += game["playerXspeed"];
		game["playerY"] += game["playerYspeed"];

		if(checkCollision())
		{
			game["playerR"] = tempPlayerRold;
			game["playerX"] = tempPlayerXold;
			game["playerY"] = tempPlayerYold;
			//game["playerRextra"] = 0;
			
			game["playerSpeed"] *= -0.25; 
			game["playerXspeed"] = -(Math.sin(toRadians(game["playerR"])) * game["playerSpeed"])*1;
			game["playerYspeed"] = -(Math.cos(toRadians(game["playerR"])) * game["playerSpeed"])*1;
			
			//game["playerSpeed"] = 0;
			//game["playerXspeed"] = 0;
			//game["playerYspeed"] = 0;
			
			game["playerX"] += game["playerXspeed"];
			game["playerY"] += game["playerYspeed"];
		}
		
	
		for(key in particle)
		{
			particle[key].x -= game["playerXspeed"];
			particle[key].y -= game["playerYspeed"];
		}
		
		
		// *** Calc raced distance for progress in race, and calculate position
		if(!game["finished"])		
		{		
			game["raceProgress"] = Math.round(game["raceProgress"]) + 0.10000;
			
			for(key in o)
			{
				if(o[key].category == "checkpoints" && o[key].sequence == game["checkpoint"]) game["raceProgress"] -= pythagoras(game["playerX"] - o[key].x, game["playerY"] - o[key].y)/10000;
			}
			
			game["raceProgress"] = Math.round(game["raceProgress"]*1000)/1000;
		}

		for(i = 1; i <= 5; i++)
		{
			if(typeof game["opponent"][i] !== "undefined" && !game["opponent"][i].finished)		
			{
				game["opponent"][i].raceProgress = Math.round(game["opponent"][i].raceProgress) + 0.10000;
				
				for(key in o)
				{
					if(o[key].category == "checkpoints" && o[key].sequence == game["opponent"][i].checkpointProgress) game["opponent"][i].raceProgress -= pythagoras(game["opponent"][i].x - o[key].x, game["opponent"][i].y - o[key].y)/10000;
				}
				
				game["opponent"][i].raceProgress = Math.round(game["opponent"][i].raceProgress*1000)/1000;		
			}
		}

		// *** Position (in race)
		for(i = 1; i <= 5; i++)
		{
			if(typeof game["opponent"][i] !== "undefined")
			{
				game["opponent"][i].position = 1;
				
				for(j = 1; j <= 5; j++)
				{
					if(typeof game["opponent"][j] !== "undefined" && i != j && game["opponent"][j].raceProgress > game["opponent"][i].raceProgress) game["opponent"][i].position++;
				}
			
				if(game["raceProgress"] > game["opponent"][i].raceProgress) game["opponent"][i].position++;
			}
		}

		game["position"] = 1;
		
		for(i = 1; i <= 5; i++)
		{
			if(typeof game["opponent"][i] !== "undefined" && game["opponent"][i].raceProgress > game["raceProgress"]) game["position"]++;
		}				
		


						
		// *** Background
		context.globalAlpha = 1;

		game["bgOceanX"] -= game["playerXspeed"];
		game["bgOceanY"] -= game["playerYspeed"];

		renderBackground();
		renderForeground();
		
		//game["bgOceanX"] -= game["playerXspeed"];
		//if(game["bgOceanX"] < -700) game["bgOceanX"] += 700;
		//if(game["bgOceanX"] > 700) game["bgOceanX"] -= 700;

		//game["bgOceanY"] -= game["playerYspeed"];
		//if(game["bgOceanY"] < -700) game["bgOceanY"] += 700;
		//if(game["bgOceanY"] > 700) game["bgOceanY"] -= 700;
		
		//game["bgOceanX"] -= 0.5; // wave movement
		//game["bgOceanY"] -= 0.5;
		
		renderObjects("BACKGROUND");
		renderParticles("BACKGROUND");

		renderObjects("GAME_UNDERWATER");
		renderParticles("GAME_UNDERWATER");		

		renderObjects("GAME");
		renderParticles("GAME");		

		// *** Opponent boats
		game["carCrashSoundCounter"]--;

		opponentMove();

		if(game["levelcreator"])
		{
			for(key in game["opponentCheckpoint"])
			{
				if(Math.random() > 0.8) addParticle(9, cX(game["opponentCheckpoint"][key].x), cY(game["opponentCheckpoint"][key].y));
			}
		}
		
		/*
		for(i = 1; i <= game["raceOpponents"]; i++)
		{
			if(typeof opponent[i] !== "undefined" && typeof opponent[i]["trackSplit"][game["raceCounter"]] !== "undefined")
			{
				// console.log(opponent[i]["trackSplit"][game["raceCounter"]]);
				tempCurrentPos = opponent[i]["trackSplit"][game["raceCounter"]].split(",");
				
				opponent[i].x = parseInt(tempCurrentPos[0]);
				opponent[i].y = parseInt(tempCurrentPos[1]);
				
				drawSmallBoat("OPPONENT" + i, cX(parseInt(tempCurrentPos[0])) + opponent[i].extraX, cY(parseInt(tempCurrentPos[1])), parseInt(tempCurrentPos[2]), parseInt(tempCurrentPos[3]));
				
				if(tempCurrentPos[0] == 0 && tempCurrentPos[1] == 0)
				{
					// *** Don't center boat when not yet moving
				}
				else
				{
					if(game["raceStarted"] && game["raceCountdown"] >= 5)
					{
						if(opponent[i].extraX > 0) opponent[i].extraX-=0.5;
						if(opponent[i].extraX < 0) opponent[i].extraX+=0.5;
					}
				}
			}
		}
		*/
		
		if(game["raceStarted"] && game["raceCountdown"] >= 5) game["raceCounter"]++;

		// *** Player Boat		
		drawSmallBoat(game["selectedBoat"], 700, 350, game["playerR"] + game["playerRextra"], game["playerSpeed"]);

		if(!game["finished"])
		{
			for(key in o)
			{
				if(o[key].category == "checkpoints" && o[key].sequence == game["checkpoint"])
				{
					tempX = cX(o[key].x)-700;
					tempY = 350-cY(o[key].y);					
					tempR = Math.atan(tempY/tempX);					
					tempDegrees = Math.round(toDegrees(tempR));					
					if(cX(o[key].x) > 700) tempDegrees += 180;
					
					context.globalAlpha = 0.5 + game["pulsate"]/2;
					drawImage(manifest["pointer"], 700, 350, true, true, tempDegrees + 90, false, false, true);
					context.globalAlpha = 1;
				}
			}
		}
				
		
		// *** Player race recording
		// if(game["raceStarted"] && game["raceCountdown"] >= 5) currentRace += "" + Math.round(game["playerX"]) + "," + Math.round(game["playerY"]) + "," + Math.round(game["playerR"] + game["playerRextra"]) + "," + Math.round(game["playerSpeed"]) + "|";
		// if(Math.random() > 0.995) console.log(currentRace);
		

		renderObjects("GAME_ON_TOP");
		renderParticles("GAME_ON_TOP");		
		
		for(key in o)
		{
			if(o[key].prototype == "LEVEL_OBJECT_1" && o[key].letter != "")
			{
				tempX = cX(o[key].x);
				tempY = cY(o[key].y) + 20;
				
				if(tempX > -100 && tempX < 1500 && tempY > -100 && tempY < 800)
				{
					context.globalAlpha = 0.5 + game["pulsate"]/2;
					if(o[key].letterCount > 0) context.globalAlpha = (100-o[key].letterCount)/100;
				
					drawText(o[key].letter, "PLAYER_LETTER", tempX, tempY);
					
					context.globalAlpha = 1;
				}
			}
		}
		
		// *** UI

		// *** Steering
		/*
		steeringX = 700;
		steeringY = 550;
		
		game["driverTurnSpeed"] = 0;
		
		context.globalAlpha = 0.5;
		if(!game["driverKeys"]) drawImage(manifest["steering_bg"], steeringX, steeringY, true);
		context.globalAlpha = 1;
		
		tempBrakeSkid = false;
		
		if(game["dragging"])
		{
			tempBallX = game["mouseX"];
			tempBallY = game["mouseY"];
			
			tempW = steeringX - tempBallX;
			tempH = steeringY - tempBallY;
			tempDistance = Math.sqrt(tempW*tempW + tempH*tempH);
			
			if(tempDistance > 70)
			{
				tempAngle = Math.atan(tempH/tempW);

				if(tempBallX <= steeringX)
				{
					tempBallX = steeringX - Math.cos(tempAngle)*70;
					tempBallY = steeringY - Math.sin(tempAngle)*70;
				}
				else
				{
					tempBallX = steeringX + Math.cos(tempAngle)*70;
					tempBallY = steeringY + Math.sin(tempAngle)*70;
				}
				
				context.globalAlpha = 0.5;
			}
			else context.globalAlpha = 0.25;

			
			if(!game["driverKeys"])
			{
				drawImage(manifest["steering_ball"], tempBallX, tempBallY, true);
			}
							
			context.globalAlpha = 1;

			// *** Move to left/right
			game["driverTurnSpeed"] = (steeringX - tempBallX) * 0.03;
			game["driverR"] += game["driverTurnSpeed"];

			// *** Accelerate
			game["driverAcceleration"] = (steeringY - tempBallY) * 0.04;
			
			drawText(game["driverTurnSpeed"] + ", " + game["driverAcceleration"], "TEXT_MEDIUM_LEFT", steeringX + 150, steeringY);

			if(game["driverAcceleration"] > 1.75) steerUp(); 
			if(game["driverAcceleration"] < -1.75) steerDown(); 
			
			if(game["driverTurnSpeed"] > 0.75) steerLeft(); 
			if(game["driverTurnSpeed"] < -0.75) steerRight(); 
		}
		*/
		
				
		// *** Positions (lower left corner)
		if(game["raceStarted"] && game["raceCountdown"] >= 5)
		{
			tempPosText = "";
			
			for(i = 1; i <= 5; i++)
			{
				if(typeof game["opponent"][i] !== "undefined")
				{
					tempDest = (game["opponent"][i].position-1)*50;
					if(!game["raceEnded"]) game["opponent"][i].positionY += (tempDest-game["opponent"][i].positionY)*0.1;
					
					tempY = 394 + game["opponent"][i].positionY;
					tempManifest = "game_ui_position_opponent";
					tempName = game["opponent"][i].name;
					if(game["opponent"][i].raceProgress >= 10000) { tempManifest = "game_ui_position_finished"; tempName = game["opponent"][i].position + ". " + tempName; }
					
					drawImage(manifest[tempManifest], 20, tempY);		
					drawImage(manifest["avatar_" + game["opponent"][i].avatar], 20 + 5, tempY + 5, 30, 30);		
					drawText(tempName, "TEXT_RACE_AVATAR_OPPONENT", 20 + 42, tempY + 27);
					
					tempPosText += tempName + ">" + game["opponent"][i].checkpointProgress + ":" + game["opponent"][i].position + " (" + game["opponent"][i].raceProgress + ")     ";
				}
			}		
	
			tempDest = (game["position"]-1)*50;
			if(!game["raceEnded"]) game["positionY"] += (tempDest-game["positionY"])*0.1;
			
			tempY = 394 + game["positionY"];
			tempManifest = "game_ui_position_player";
			tempName = game["avatarName"];
			if(game["raceProgress"] >= 10000) { tempManifest = "game_ui_position_finished"; tempName = game["position"] + ". " + tempName; context.globalAlpha = 0.5 + game["pulsate"]; }
			
			drawImage(manifest[tempManifest], 20, tempY);		
			drawImage(manifest["avatar_" + game["avatar"]], 20 + 5, tempY + 5, 30, 30);		
			drawText(tempName, "TEXT_RACE_AVATAR_PLAYER", 20 + 42, tempY + 27);
	
			context.globalAlpha = 1;
			
			tempPosText += "Player:" + game["position"] + " (" + game["raceProgress"]  + ")";
			
			// drawText(tempPosText, "DEBUGTEXT", 260, 680);
			
			
		}	
	
		
		
		// *** End race button
		drawImage(manifest["game_ui_button_tiny"], spot["BUTTON_END_RACE"].x, spot["BUTTON_END_RACE"].y);		
		drawText("Race stoppen", "BUTTON_END_RACE_TEXT", spot["BUTTON_END_RACE"].x + spot["BUTTON_END_RACE"].width/2, spot["BUTTON_END_RACE"].y + 23);		
		
		
		// *** Laps
		drawText("Lap", "TEXT_MEDIUM_LEFT", 1340, 387);
		drawText("/ 2", "TEXT_LARGE_LEFT", 1337, 424);
		tempLap = game["lap"];
		if(tempLap > 2) tempLap = 2;
		drawText(tempLap, "TEXT_HUGE_LEFT", 1298, 424);

		
		// *** Speedometer
		drawImage(manifest["speedometer_bg"], 1240, 300);
		
		tempSpeed = Math.floor(game["playerSpeed"]/2);
		if(tempSpeed > 14) tempSpeed = 14;
		
		for(i = 1; i <= tempSpeed; i++)
		{
			drawImage(manifest["speedometer_" + i], 1240, 300);
		}

		// drawText("raceStarted:" + game["raceStarted"], "BUTTON_END_RACE_TEXT", 1200, 530);	
		
		
		// *** Minimap
		drawImage(manifest["track_" + game["trackCurrent"]], 1290, 575, true);
		
		tempX = 1290 + game["playerX"]/20;
		tempY = 575 + game["playerY"]/20;

		drawImage(manifest["minimap_marker_player"], tempX, tempY, true);

		for(i = 1; i <= 5; i++)
		{
			if(typeof game["opponent"][i] !== "undefined") drawImage(manifest["minimap_marker_opponent"], 1290 + game["opponent"][i].x/20, 575 + game["opponent"][i].y/20, true);
		}

		/* ******************* DRAW MINIMAP */
		if(game["levelcreator"])
		{	
			if(Math.random() > 0.5 && game["levelcreatorMinimapMarkers"] < 1500)
			{
				tempO = addO("MINIMAP_MARKER_EDITOR", tempX, tempY, true);
				o[tempO].z = "GAME";
				game["levelcreatorMinimapMarkers"]++;
			}
			
			drawImage(manifest["minimap_marker_player"], 1290, 575, 4, 4, true, false, false, true);
		}
		


		// *** Stopwatches
		if(!game["raceEnded"])
		{
			game["raceTimeMilli"] += 3;
			if(game["raceTimeMilli"] > 99) game["raceTimeMilli"] = 99;
			if(!game["raceStarted"] || (game["raceStarted"] && game["raceCountdown"] == 4)) game["raceTimeMilli"] = 0;
			game["raceTimeMilli"] = Math.round(game["raceTimeMilli"]);
		}
		
		drawStopwatch("Verlopen tijd:", game["raceTime"] + game["raceTimeMilli"]/100, 20, 70);		

		if(game["track"][game["trackCurrent"]].best > 0) drawStopwatch("Jouw beste tijd:", game["track"][game["trackCurrent"]].best, 145, 70);
		
		tempTime = game["track"][game["trackCurrent"]].best - (game["raceTime"] + game["raceTimeMilli"]/100);
		if(tempTime > 0) drawStopwatch("Resterende tijd:", tempTime, 270, 70);
		
		
		
		// *** Word to spel
		game["pickWordCounter"]--;
		tempText = game["playerWord"].toUpperCase().split("").join(" ");
		
		if(game["pickWordCounter"] > 0 && game["playerWordSpelled"] == "")
		{
			context.globalAlpha = 1.0;
			
			// "60px 'Asap Condensed', sans-serif"
			
			spot["PLAYER_WORD_2"].font = Math.round(60 + (game["pickWordCounter"]*game["pickWordCounter"])/5) + "px 'Asap Condensed', sans-serif";
			drawText(tempText, "PLAYER_WORD_2", 700, 60 + game["pickWordCounter"]*30);
		
			if(game["pickWordCounter"] == 1)
			{
				playSound("cymbal");

				context.font = "60px 'Asap Condensed', sans-serif";
				tempWidth = context.measureText(tempText).width;
				
				// for(ii = 1; ii <= 50; ii++) addParticle(21, 700 - tempWidth/2 + Math.random()*tempWidth, 60 - Math.random()*30);
			}
		}
		else
		{		
			context.font = "60px 'Asap Condensed', sans-serif";
			tempWidth = context.measureText(tempText).width;
			
			context.globalAlpha = 0.4;
			drawText(tempText, "PLAYER_WORD", 700 - tempWidth/2, 60);
	
			context.globalAlpha = 1;
			drawText(game["playerWordSpelled"].toUpperCase().split("").join(" "), "PLAYER_WORD", 700 - tempWidth/2, 60);
		}
		
		// *** Countdown to start
		if((!game["raceStarted"] && game["raceCountdown"] > 0) || (game["raceStarted"] && game["raceCountdown"] == 4) || (game["raceStarted"] && game["raceCountdown"] == 5))
		{			
			context.globalAlpha = (60 - game["count"])/60;

			// if(game["raceCountdown"] == 1) game["raceCountdown"] = 3; 

			if(game["raceCountdown"] == 1) { drawText(" ", "TEXT_COUNTDOWN", 700, 550 - game["count"]); }
			if(game["raceCountdown"] == 2) { drawText(3, "TEXT_COUNTDOWN", 700, 550 - game["count"]); }
			if(game["raceCountdown"] == 3) { drawText(2, "TEXT_COUNTDOWN", 700, 550 - game["count"]); }
			if(game["raceCountdown"] == 4) { drawText(1, "TEXT_COUNTDOWN", 700, 550 - game["count"]); }
			if(game["raceCountdown"] == 5) { drawText("GO!", "TEXT_COUNTDOWN", 700, 550 - game["count"]); }
			
			context.globalAlpha = 1;
		}

		if(!game["driverKeys"])
		{
			if(!game["raceStarted"])
			{
				context.globalAlpha = 0.5;
				drawImage(manifest["game_ui_button_overlay"], 0, 0);

				context.globalAlpha = 0.5 + game["pulsate"]/2;	
				drawImage(manifest["game_ui_button_overlay"], 0, 0);
			
				context.globalAlpha = 1;
			}
			else
			{
				drawImage(manifest["game_ui_button_overlay_modest"], 0, 0);				
			}

			if(game["touchSpeed"] == 1) drawImage(manifest["game_ui_button_overlay_selected"], 10, 90);
			if(game["touchSpeed"] == 0) drawImage(manifest["game_ui_button_overlay_selected"], 10, 190);
			if(game["touchSpeed"] == -1) drawImage(manifest["game_ui_button_overlay_selected"], 10, 290);
		}
		
		// ** Before race cutscene
		if(game["showCutscene"] > 0)
		{
			context.globalAlpha = (game["showCutscene"]/20);
			drawImage(manifest["bg_cutscene"], 0, 0);
			game["showCutscene"]--;
			context.globalAlpha = 1;
		}
		
		// *** After race end screen
		if(game["raceEnded"])
		{
			if(game["count"] < 100)
			{
			
			}
			else if(game["count"] >= 100)
			{
				if(game["count"] >= 100 && game["count"] < 125)
				{
					context.globalAlpha = (game["count"] - 100)/25;
				}
				
				drawImage(manifest["bg_cutscene"], 0, 0);

				drawCutsceneText();
						
				if(game["count"] > 150)
				{					
					game["count"] = 0;

					// *** Save recording to database
					/*
					tempUpgrades = game["boat"][game["selectedBoat"]]["upgrade1"].upgradesDone + "|" + game["boat"][game["selectedBoat"]]["upgrade2"].upgradesDone + "|" + game["boat"][game["selectedBoat"]]["upgrade3"].upgradesDone + "|" + game["boat"][game["selectedBoat"]]["upgrade4"].upgradesDone + "|" + game["boat"][game["selectedBoat"]]["upgrade5"].upgradesDone;
					
					// console.log("Save recording"); console.log(game["trackCurrent"]); console.log(game["raceEndedTime"]); console.log(game["selectedBoat"]); console.log(tempUpgrades); console.log(game["avatarName"]); console.log(game["avatar"]); console.log(currentRace);
					
					ajaxUpdate("a=saveBoatraceRecording&track=" + game["trackCurrent"] + "&time=" + game["raceEndedTime"] + "&boat=" + game["selectedBoat"] + "&boat_upgrades=" + tempUpgrades + "&name=" + game["avatarName"] + "&avatar=" + game["avatar"] + "&recording=" + currentRace);
					*/
					
					// *** Select next track
					game["racesFinished"]++;
					
					// tempMaxTracks = 1;
					// if(game["racesFinished"] > 3) tempMaxTracks = 2;
					// if(game["racesFinished"] > 8) tempMaxTracks = 3;
					// if(game["racesFinished"] > 12) tempMaxTracks = 4;
					
					// game["trackCurrent"] = Math.ceil(Math.random()*tempMaxTracks);
					
					if(game["racesFinished"] <= 5) game["trackCurrent"] = 1;
					else if(game["racesFinished"] <= 10) game["trackCurrent"] = Math.ceil(Math.random()*2);
					else game["trackCurrent"] = Math.ceil(Math.random()*3);
						
					//game["trackCurrent"] = 3; // ***********************
					console.log("New Track: " + game["trackCurrent"]);

					// loadLevel();
					// showSelectScreen();
					showRanking();
					
				}
			}
		
		
			context.globalAlpha = 1;
		}
		
		if(game["levelcreator"])
		{
			drawText(game["levelcreatorItem"] + ". Levelcreator (gebruik +, -, del)", "TEXT_SMALL_LEFT", 610, 20);
			
			context.globalAlpha = 0.75;
			if(game["levelcreatorItem"] == 1) { addParticle(9, 610, 25); addParticle(9, game["mouseX"], game["mouseY"]); }
			if(game["levelcreatorItem"] == 2) { drawImage(manifest["checkpoint"], 610, 25, 50, 50, false, false, false, false); drawImage(manifest["checkpoint"], game["mouseX"], game["mouseY"], true, true, false, false, false, true); }
			
			if(game["levelcreatorItem"] == 3) { drawImage(manifest["level_editor_marker"], 610, 25, 26, 26, false, false, false, false); drawImage(manifest["level_editor_marker"], game["mouseX"], game["mouseY"], 26, 26, false, false, false, true); }
			if(game["levelcreatorItem"] == 4) { drawImage(manifest["level_editor_marker"], 610, 25, 30, 30, false, false, false, false); drawImage(manifest["level_editor_marker"], game["mouseX"], game["mouseY"], 30, 30, false, false, false, true); }
			if(game["levelcreatorItem"] == 5) { drawImage(manifest["level_editor_marker"], 610, 25, 40, 40, false, false, false, false); drawImage(manifest["level_editor_marker"], game["mouseX"], game["mouseY"], 40, 40, false, false, false, true); }
			if(game["levelcreatorItem"] == 6) { drawImage(manifest["level_editor_marker"], 610, 25, 60, 60, false, false, false, false); drawImage(manifest["level_editor_marker"], game["mouseX"], game["mouseY"], 60, 60, false, false, false, true); }
			if(game["levelcreatorItem"] == 7) { drawImage(manifest["level_editor_marker"], 610, 25, 100, 100, false, false, false, false); drawImage(manifest["level_editor_marker"], game["mouseX"], game["mouseY"], 100, 100, false, false, false, true); }
			if(game["levelcreatorItem"] == 8) { drawImage(manifest["level_editor_marker"], 610, 25, 100, 100, false, false, false, false); drawImage(manifest["level_editor_marker"], game["mouseX"], game["mouseY"], 150, 150, false, false, false, true); }
			if(game["levelcreatorItem"] == 9) { drawImage(manifest["level_editor_marker"], 610, 25, 100, 100, false, false, false, false); drawImage(manifest["level_editor_marker"], game["mouseX"], game["mouseY"], 200, 200, false, false, false, true); }
			if(game["levelcreatorItem"] == 10) { drawImage(manifest["level_editor_marker"], 610, 25, 100, 100, false, false, false, false); drawImage(manifest["level_editor_marker"], game["mouseX"], game["mouseY"], 300, 300, false, false, false, true); }
			if(game["levelcreatorItem"] == 11) { drawImage(manifest["level_editor_marker"], 610, 25, 100, 100, false, false, false, false); drawImage(manifest["level_editor_marker"], game["mouseX"], game["mouseY"], 500, 500, false, false, false, true); }
			if(game["levelcreatorItem"] == 12) { drawImage(manifest["level_editor_marker"], 610, 25, 100, 100, false, false, false, false); drawImage(manifest["level_editor_marker"], game["mouseX"], game["mouseY"], 800, 800, false, false, false, true); }

			if(game["levelcreatorItem"] == 13) { drawImage(manifest["level_object_13"], 610, 25, 100, 100, false, false, false, false); drawImage(manifest["level_object_13"], game["mouseX"], game["mouseY"], true, true, false, false, false, true); }
			if(game["levelcreatorItem"] == 14) { drawImage(manifest["level_object_14"], 610, 25, 100, 100, false, false, false, false); drawImage(manifest["level_object_14"], game["mouseX"], game["mouseY"], true, true, false, false, false, true); }
			if(game["levelcreatorItem"] == 15) { drawImage(manifest["level_object_15"], 610, 25, 100, 100, false, false, false, false); drawImage(manifest["level_object_15"], game["mouseX"], game["mouseY"], true, true, false, false, false, true); }
			if(game["levelcreatorItem"] == 16) { drawImage(manifest["level_object_16"], 610, 25, 100, 100, false, false, false, false); drawImage(manifest["level_object_16"], game["mouseX"], game["mouseY"], true, true, false, false, false, true); }
			if(game["levelcreatorItem"] == 17) { drawImage(manifest["level_object_17"], 610, 25, 100, 100, false, false, false, false); drawImage(manifest["level_object_17"], game["mouseX"], game["mouseY"], true, true, false, false, false, true); }
			if(game["levelcreatorItem"] == 18) { drawImage(manifest["level_object_18"], 610, 25, 100, 100, false, false, false, false); drawImage(manifest["level_object_18"], game["mouseX"], game["mouseY"], true, true, false, false, false, true); }
			if(game["levelcreatorItem"] == 19) { drawImage(manifest["level_object_19"], 610, 25, 100, 100, false, false, false, false); drawImage(manifest["level_object_19"], game["mouseX"], game["mouseY"], true, true, false, false, false, true); }
			if(game["levelcreatorItem"] == 20) { drawImage(manifest["level_object_20"], 610, 25, 100, 100, false, false, false, false); drawImage(manifest["level_object_20"], game["mouseX"], game["mouseY"], true, true, false, false, false, true); }
			
			context.globalAlpha = 1;
		}
	}
	else if(game["status"] == "RACE_LOADING")
	{
		drawImage(manifest["bg_cutscene"], 0, 0);
		game["showCutscene"] = 20;
	}
	else if(game["status"] == "HIGHSCORES")
	{
		// *** Highscore lijst
		drawImage(manifest["bg_1_docentendeel"], 0, 0);
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
	
			
	// *** Window buttons (icons in top right corner)
	if(game["status"] != "PRELOAD_PRELOADER") // && game["status"] != "PLAYBUTTON"
	{	
		temp_x = spot["WINDOW_BUTTONS"].x;

		if(klas_wachtwoord == "")
		{
			if(hoverSpot("CLOSE_ICON")) context.globalAlpha = 1; else context.globalAlpha = 0.75;
			
			spot["CLOSE_ICON"].x = temp_x;
			drawImage(manifest["close"], spot["CLOSE_ICON"].x, spot["CLOSE_ICON"].y);
			temp_x -= spot["CLOSE_ICON"].width + spot["WINDOW_BUTTONS"].margin;
		}
				
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
		
		/*
		if(hoverSpot("KEYBOARD_ICON")) context.globalAlpha = 1; else context.globalAlpha = 0.75;

		spot["KEYBOARD_ICON"].x = temp_x;
		if(keyboard["status"] == "hidden") icon = "keyboard_off"; else icon = "keyboard_on";
		drawImage(manifest[icon], spot["KEYBOARD_ICON"].x, spot["KEYBOARD_ICON"].y);
		temp_x -= spot["KEYBOARD_ICON"].width + spot["WINDOW_BUTTONS"].margin;
		*/
		
		
		if(game["status"] != "PLAYBUTTON")
		{
			// if(hoverSpot("KEYBOARD_ICON")) context.globalAlpha = 1; else context.globalAlpha = 0.85;
			// drawImage(manifest["keyboard"], spot["KEYBOARD_ICON"].x, spot["KEYBOARD_ICON"].y);	

			if(klas_wachtwoord == "")
			{
				//if(hoverSpot("MAIN_MENU_ICON")) context.globalAlpha = 1; else context.globalAlpha = 0.85;
				//drawImage(manifest["main_menu"], spot["MAIN_MENU_ICON"].x, spot["MAIN_MENU_ICON"].y, 42, 39);	
			}
		}
	}
	
	// *** Keyboard
	if(keyboard["status"] != "hidden") drawKeyboard();
	
	
	// *** Draw rectangles on spots for debug purposes
	for(key in spot)
	{
		if(typeof spot[key].debugDraw !== "undefined")
		{
			if(spot[key].debugDraw)
			{
				context.globalAlpha = 0.25 + game["pulsate"]/10;
				context.fillStyle = "#FF0000";
				context.fillRect(spot[key].x, spot[key].y, spot[key].width, spot[key].height);
				context.globalAlpha = 1;
			}
		}
	}
	
	/*
	tempParticles = 0;
	for(key in particle) tempParticles++;
	drawText("Particles:" + tempParticles, "SCORE_HEADER");	
	*/
}
