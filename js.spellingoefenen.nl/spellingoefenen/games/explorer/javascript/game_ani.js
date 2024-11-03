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

		
			// *** Particles
			for(key in particle)
			{
				particle[key].x += particle[key].xSpeed; particle[key].xSpeed += particle[key].xSpeedChange;
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
		//drawImage(manifest["logo"], spot["INTRO_LOGO"].x, spot["INTRO_LOGO"].y + game["pulsateCos"]*5, true, true, game["pulsate"], false, false, true);
	
		
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
		
		if(gameEngine["playButtonStatus"] == "PLAY")
		{
			if(hoverSpot("INTRO_PLAYBUTTON"))
			{
				tempManifest = "playbutton_hover";
				//addParticle(3, spot["INTRO_PLAYBUTTON"].x + 15 + Math.random() * 200, spot["INTRO_PLAYBUTTON"].y + 15 + Math.random() * 200, "BETWEEN");
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
		if(!game["gamePaused"])
		{
			// *** Occasional non-wave blob
			if(Math.random() > game["levelBlobRandomChance"] && game["levelWaveStatus"] == "COUNTDOWN") defenseAddBlob([game["levelOccasionalBlobType"]]);
			
			context.globalAlpha = 1;
			
			// *** Drag map
			if(game["dragging"])
			{
				
				game["scrollX"] = game["scrollXsrc"] + (game["mouseX"]-game["draggingX"]);
				game["scrollY"] = game["scrollYsrc"] + (game["mouseY"]-game["draggingY"]);
	
				if(game["scrollX"] < -800) game["scrollX"] = -800;
				if(game["scrollX"] > 800) game["scrollX"] = 800;
	
				if(game["scrollY"] > 1150) game["scrollY"] = 1150;
				if(game["scrollY"] < -1150) game["scrollY"] = -1150;
	
				// console.log(game["scrollX"] + ", " + game["scrollY"]);
			}
	
			// *** Map background
			for(i = -1; i <= 1; i++)
			{
				//context.globalAlpha = 0.9;
				//if(i == 0) context.globalAlpha = 1;
				drawImage(manifest["map_bg"], tX(-500), tY(-500 + i*1000));
				//context.globalAlpha = 0.9;
				drawImage(manifest["map_bg"], tX(-500 - 1000), tY(-500 + i*1000));
				drawImage(manifest["map_bg"], tX(-500 + 1000), tY(-500 + i*1000));
			}		
			
			// *** Map objects
			
			PrintObjects = new Array();
			PrintCount = 0;
			
			for(key in o)
			{
				if(o[key].map && o[key].category != "shots")
				{
					o[key].z = "MAP_" + Math.round(o[key].y);
					PrintObjects[PrintCount] = Math.round(o[key].y);
					PrintCount += 1;
				}
				
			}
			
			PrintObjects.sort((a,b)=>a-b);
			
			
			
			for (i = 0; i<PrintObjects.length; i++){
				
				if (PrintObjects[i] != PrintObjects[i-1] && PrintObjects[i] != PrintObjects[i-2] && PrintObjects[i] != PrintObjects[i-3]){ renderObjects("MAP_" + PrintObjects[i]);}
				
			}
			
			
			
			
			//for(i = -1500; i <= 1500; i++) {renderObjects("MAP_" + i);}
	
	
			if(game["placeBuilding"] != 0)
			{
				context.globalAlpha = 0.5;
				context.fillStyle = "#FF0000";
	
				for(key in o)
				{
					if(o[key].category == "castles" || o[key].category == "towers")
					{
						context.fillRect(tX(o[key].x - o[key].width/2), tY(o[key].y - 30), o[key].width, 60); 					
					}
				}
	
				context.globalAlpha = 1;
				
			}
	
	
	
			// *** Darkness
			context.globalAlpha = 1;
			if(game["debugInfo"]) context.globalAlpha = 0.7;
			
			for(i = 1; i <= 15; i++)
			{
				for(j = 1; j <= 15; j++)
				{
					if(!tile[i][j].discovered)
					{
						context.fillStyle = "#28280e";
						context.fillRect(tX((i-1)*200 - 1500)-1, tY((j-1)*200 - 1500)-1, 202, 202);
						
						//context.globalAlpha = 0.25;
						if(game["debugInfo"]) drawText("" + i + ", " + j, "DEBUG_TEXT", tX((i-1)*200 - 1500) + 5, tY((j-1)*200 - 1500) + 20);
						//context.globalAlpha = 0.79;
					}
					else
					{					
						if(i < 15 && !tile[i+1][j].discovered) drawImage(manifest["map_darkness_r"], tX((i-1)*200 - 1500 + 150), tY((j-1)*200 - 1500));
						if(i > 1 && !tile[i-1][j].discovered) drawImage(manifest["map_darkness_r"], tX((i-1)*200 - 1500), tY((j-1)*200 - 1500), true, true, true, true, false, false);					
						if(j < 15 && !tile[i][j+1].discovered) drawImage(manifest["map_darkness_r"], tX((i-1)*200 - 1500 + 75), tY((j-1)*200 - 1500 + 75), true, true, -90, false, false, false);
						if(j > 1 && !tile[i][j-1].discovered) drawImage(manifest["map_darkness_r"], tX((i-1)*200 - 1500 + 75), tY((j-1)*200 - 1500 - 75), true, true, 90, false, false, false);
	
						if(i < 15 && j > 1 && !tile[i+1][j-1].discovered && tile[i+1][j].discovered && tile[i][j-1].discovered) drawImage(manifest["map_darkness_c"], tX((i-1)*200 - 1500 + 150), tY((j-1)*200 - 1500), true, true, 180, false, false, false);
						if(i > 1 && j > 1 && !tile[i-1][j-1].discovered && tile[i-1][j].discovered && tile[i][j-1].discovered) drawImage(manifest["map_darkness_c"], tX((i-1)*200 - 1500), tY((j-1)*200 - 1500), true, true, -90, false, false, false);					
						if(i > 1 && j < 15 && !tile[i-1][j+1].discovered && tile[i-1][j].discovered && tile[i][j+1].discovered) drawImage(manifest["map_darkness_c"], tX((i-1)*200 - 1500), tY((j-1)*200 - 1500 + 150), true, true, 0, false, false, false);
						if(i < 15 && j < 15 && !tile[i+1][j+1].discovered && tile[i+1][j].discovered && tile[i][j+1].discovered) drawImage(manifest["map_darkness_c"], tX((i-1)*200 - 1500 + 150), tY((j-1)*200 - 1500 + 150), true, true, 90, false, false, false);
					}
				}		
			}
		
			context.globalAlpha = 1;
	
			for(key in o)
			{
				if(o[key].category == "heroes")
				{
					if(defenseVisible(key))
					{
						context.globalAlpha = 0.2;
						drawImage(manifest[o[key].manifest], tX(o[key].x), tY(o[key].y), true, true, o[key].r, game["playerMirrored"], false, true);
						context.globalAlpha = 1;
						
						if((o[key].xDest == 0 && o[key].yDest == 0) || (o[key].xDest == 0 && o[key].yDest == 50))
						{
						}
						else
						{						
							drawImage(manifest["hero_marker_shadow"], tX(o[key].xDest), tY(o[key].yDest), 30 - game["pulsate"]*5, 30 - game["pulsate"]*5, false, false, false, true);
							drawImage(manifest["hero_marker"], tX(o[key].xDest), tY(o[key].yDest - game["pulsate"]*20), true, true, false, false, false, true);
						}
					}
				}
			}
			
			// *** Debug
			if(game["debugShow"])
			{
				drawImage(manifest["ui_button_hero"], spot["DEBUG_BUTTON_1"].x, spot["DEBUG_BUTTON_1"].y);
				drawTextarea("dood", "DEBUG_TEXT", spot["DEBUG_BUTTON_1"].x + 12, spot["DEBUG_BUTTON_1"].y + 45);
		
				drawImage(manifest["ui_button_hero"], spot["DEBUG_BUTTON_2"].x, spot["DEBUG_BUTTON_2"].y);
				drawTextarea("debug", "DEBUG_TEXT", spot["DEBUG_BUTTON_2"].x + 12, spot["DEBUG_BUTTON_2"].y + 45);
		
				drawImage(manifest["ui_button_hero"], spot["DEBUG_BUTTON_3"].x, spot["DEBUG_BUTTON_3"].y);
				drawTextarea("save", "DEBUG_TEXT", spot["DEBUG_BUTTON_3"].x + 12, spot["DEBUG_BUTTON_3"].y + 45);
		
				drawImage(manifest["ui_button_hero"], spot["DEBUG_BUTTON_4"].x, spot["DEBUG_BUTTON_4"].y);
				drawTextarea("resources", "DEBUG_TEXT", spot["DEBUG_BUTTON_4"].x + 12, spot["DEBUG_BUTTON_4"].y + 45);
				
				//drawImage(manifest["ui_button_hero"], spot["DEBUG_BUTTON_5"].x, spot["DEBUG_BUTTON_5"].y);
				
				drawTextarea("Upgrade: " + game["playerUpgradeLevel"] + " / Research: " + game["playerResearchLevel"] + "\nScore: " + game["score"] + "\nlevelWaveAmount: " + game["levelWaveAmount"] + "\nlevelBlobRandomChance: " + game["levelBlobRandomChance"], "DEBUG_TEXT");
			}
			
			// *** Map particles/objects
			renderObjects("MAP");
			renderParticles("MAP");
			
			
			// *** Upgrade circle
			if(game["playerSelected"] != 0 && typeof o[game["playerSelected"]] !== "undefined")
			{
				drawImage(manifest["upgrade_bg"], tX(o[game["playerSelected"]].x), tY(o[game["playerSelected"]].y + o[game["playerSelected"]].mapUpgradeExtraY), true);
			
				for(i = 1; i <= 4; i++)
				{
					if(typeof o[game["playerSelected"]]["upgrade"] !== "undefined" && typeof o[game["playerSelected"]]["upgrade"][i] !== "undefined" && typeof o[game["playerSelected"]]["upgrade"][i][o[game["playerSelected"]]["upgrade" + i]] !== "undefined")
					{
						drawImage(manifest["upgrade_" + i], tX(o[game["playerSelected"]].x), tY(o[game["playerSelected"]].y + o[game["playerSelected"]].mapUpgradeExtraY), true);				
						
						tempUpgrade = o[game["playerSelected"]]["upgrade"][i][o[game["playerSelected"]]["upgrade" + i]];
					
						if(i == 1) { tempX = tX(o[game["playerSelected"]].x) - 78; tempY = tY(o[game["playerSelected"]].y + o[game["playerSelected"]].mapUpgradeExtraY) - 62; }
						if(i == 2) { tempX = tX(o[game["playerSelected"]].x) + 71; tempY = tY(o[game["playerSelected"]].y + o[game["playerSelected"]].mapUpgradeExtraY) - 62; }
						if(i == 3) { tempX = tX(o[game["playerSelected"]].x) - 78; tempY = tY(o[game["playerSelected"]].y + o[game["playerSelected"]].mapUpgradeExtraY) + 60; }
						if(i == 4) { tempX = tX(o[game["playerSelected"]].x) + 71; tempY = tY(o[game["playerSelected"]].y + o[game["playerSelected"]].mapUpgradeExtraY) + 60; }
						
						context.globalAlpha = game["upgradeFlash" + i];
						game["upgradeFlash" + i] *= 0.8;
						drawImage(manifest["upgrade_flash"], tempX, tempY + 10, true);
						
						context.globalAlpha = 1;
						drawImage(manifest[tempUpgrade.icon], tempX, tempY, true);
						
						drawImage(manifest["icon_resource_" + tempUpgrade.resource], tempX - 29, tempY + 34, 30, 30, true, false, false, true);
		
						drawText(tempUpgrade.price, "RESOURCE_" + tempUpgrade.resource + "_SMALL", tempX, tempY + 37);
		
						if(game["resource" + tempUpgrade.resource] < tempUpgrade.price) drawImage(manifest["icon_x"], tempX + 29, tempY + 34, 19, 19, true, false, false, true);
						
						tempLine = tempUpgrade.description.split("\n");
						drawText(tempLine[0], "UPGRADE_" + i + "_DESC", tempX + spot["UPGRADE_" + i + "_DESC"].extraX, tempY + spot["UPGRADE_" + i + "_DESC"].extraY);
						drawText(tempLine[1].split("~VAL~").join(tempUpgrade.rewardAmount), "UPGRADE_" + i + "_DESC", tempX + spot["UPGRADE_" + i + "_DESC"].extraX, tempY + spot["UPGRADE_" + i + "_DESC"].extraY + 22);
						
						if(game["playerUpgradeLevel"] < tempUpgrade.upgradeLevel)
						{
							drawImage(manifest["ui_lock"], tempX - 29, tempY - 40, 101*0.5, 135*0.5);
						}
					}
				}	
		
			}
			
			
			// *** Popup: Discover tiles
			if(game["showDiscover"])
			{
				game["playerSelected"] = 0;
				//drawImage(manifest["bg_discover"], 0, 0);
	
				context.globalAlpha = 0.5;
				context.fillColor = "#000000";
				context.fillRect(0, 0, game["width"], game["height"]); 
				context.globalAlpha = 1;
				
				for(i = 1; i <= 15; i++)
				{
					for(j = 1; j <= 15; j++)
					{
						if(!tile[i][j].discovered && defenseDoesTileHaveAdjacentDiscoveredTile(i, j))
						{
							drawImage(manifest["map_button"], tX((i-1)*200 - 1500), tY((j-1)*200 - 1500));
							drawText(tile[i][j].word, "DISCOVER_BUTTON_TEXT", tX((i-1)*200 - 1500) + 100, tY((j-1)*200 - 1500) + 125);
						}
					}		
				}
			}
			
			// *** Tower is being placed
			if(game["placeBuilding"] != 0)
			{
				context.globalAlpha = 0.25 + game["pulsate"]/4;
				context.fillStyle = "#FF0000";
				context.fillRect(game["mouseX"] - oPrototype["TOWER_" + game["placeBuilding"]].width/2, game["mouseY"] - 30, oPrototype["TOWER_" + game["placeBuilding"]].width, 60); 					
	
				context.globalAlpha = 0.5 + game["pulsateCos"]/2;
				drawImage(manifest["tower_" + game["placeBuilding"] + "_static"], game["mouseX"], game["mouseY"], true);
	
				context.globalAlpha = 0.5 + game["pulsate"]/2;
				context.strokeStyle = "#4e6a02";
				drawEllipseByCenter(game["mouseX"], game["mouseY"], oPrototype["TOWER_" + game["placeBuilding"]].shootDistance*2, oPrototype["TOWER_" + game["placeBuilding"]].shootDistance*2 * 0.75)
				
				context.globalAlpha = 1;
						
				drawImage(manifest["ui_x"], spot["BUILD_CLOSE"].x, spot["BUILD_CLOSE"].y);
			}
			
			if(game["subInfoText"] != "")
			{
				context.globalAlpha = 0.5 + game["pulsateCos"]/2;
				drawText(game["subInfoText"], "SUB_INFO_TEXT");
				context.globalAlpha = 1;
			}
			


			// *** Passive multiplayer list
			tempNextScore = 10000000;
			tempNextName = "---";
			
			for(key in passiveMultiplayerList)
			{
				if(parseInt(key) >= game["score"])
				{
					if(parseInt(key) < tempNextScore) tempNextScore = key;
				}
			}
			
			tempScoreExtra = "";
			tempPosition = 0;
			
			if(typeof passiveMultiplayerList[tempNextScore] !== "undefined")
			{
				drawText(passiveMultiplayerList[tempNextScore], "PASSIVE_MULTIPLAYER_LIST_NEXT");
				drawText(tempNextScore, "PASSIVE_MULTIPLAYER_LIST_NEXT_SCORE");				
				tempPosition = parseInt(passiveMultiplayerList[tempNextScore].substr(0, passiveMultiplayerList[tempNextScore].indexOf(".")));				
				tempScoreExtra = (tempPosition+1) + ". ";
			}
			
			drawText(tempScoreExtra + "Jouw score:", "PASSIVE_MULTIPLAYER_LIST_YOU");
			drawText(game["score"], "PASSIVE_MULTIPLAYER_LIST_YOU_SCORE");

			tempPrevScore = 0;
			tempPrevName = "---";
			
			for(key in passiveMultiplayerList)
			{
				if(parseInt(key) < game["score"])
				{
					if(parseInt(key) > tempPrevScore) tempPrevScore = key;
				}
			}
						
			if(typeof passiveMultiplayerList[tempPrevScore] !== "undefined")
			{
				tempPrevPosition = parseInt(passiveMultiplayerList[tempPrevScore].substr(0, passiveMultiplayerList[tempPrevScore].indexOf(".")));
				tempName = passiveMultiplayerList[tempPrevScore];
				if(tempPrevPosition == (tempPosition+1)) tempName = tempName.split(tempPrevPosition).join((tempPosition+1)+1);
				drawText(tempName, "PASSIVE_MULTIPLAYER_LIST_PREV");
				drawText(tempPrevScore, "PASSIVE_MULTIPLAYER_LIST_PREV_SCORE");
			}
			
						
			// *** Popup: Build towers
			if(game["showBuilding"])
			{
				game["playerSelected"] = 0;
	
				drawImage(manifest["bg_building"], 0, 0);
				
				tempX = 182;
				
				for(i = 1; i <= 7; i++)
				{
					game["canBuildTower" + i] = true;
					
					tempY = 465;
	
					for(j = 1; j <= 4; j++)
					{			
						if(oPrototype["TOWER_" + i]["priceResource" + j] > 0)
						{
							drawText(oPrototype["TOWER_" + i]["priceResource" + j], "RESOURCE_" + j + "_MEDIUM", tempX, tempY);					
							drawImage(manifest["icon_resource_" + j], tempX - 36, tempY - 20, 26, 26, false, false, false, false);
							
							if(game["resource" + j] < oPrototype["TOWER_" + i]["priceResource" + j])
							{
								drawImage(manifest["icon_x"], tempX - 46, tempY - 15);
								game["canBuildTower" + i] = false;
							}
							
							tempY += 30;
						}
					}
	
					if(game["playerResearchLevel"] < oPrototype["TOWER_" + i].researchLevel)
					{
						drawImage(manifest["ui_lock"], tempX - 46, tempY - 320);
						game["canBuildTower" + i] = false;
					}
									
					if(game["canBuildTower" + i])
					{
						if(hoverSpot("BUILD_TOWER_AREA_" + i)) tempManifest = "ui_button_build_selected"; else tempManifest = "ui_button_build";
						drawImage(manifest[tempManifest], spot["BUILD_TOWER_" + i].x, spot["BUILD_TOWER_" + i].y);
	
					}
					else
					{
						context.globalAlpha = 0.4;
						drawImage(manifest["ui_button_build"], spot["BUILD_TOWER_" + i].x, spot["BUILD_TOWER_" + i].y);
						context.globalAlpha = 1;
					}
					
					tempX += 175;
				}
			}
	
	
			
			// *** UI
			if(game["messageCount"] > 0)
			{
				tempX = 100;
				
				if(game["messageCount"] > 190) tempX = 100 - (game["messageCount"]-190)*6;
				if(game["messageCount"] <= 10) tempX = 100 - (10 - game["messageCount"])*6;
				
				drawText(game["messageText"], "MESSAGE", 700, tempX);
				game["messageCount"]--;
			}
			
			drawImage(manifest["ui_bar"], 465, 0);
			
			drawImage(manifest["icon_resource_1"], 507, 30, true);		drawText(game["resource1"], "RESOURCE_1");
			drawImage(manifest["icon_resource_2"], 634-20, 30, true);	drawText(game["resource2"], "RESOURCE_2");
			drawImage(manifest["icon_resource_3"], 745-20, 30, true);	drawText(game["resource3"], "RESOURCE_3");
			drawImage(manifest["icon_resource_4"], 856-20, 30, true);	drawText(game["resource4"], "RESOURCE_4");
	
	
			drawImage(manifest["ui_button_stop"], spot["UI_BUTTON_STOP"].x, spot["UI_BUTTON_STOP"].y);
			drawImage(manifest["ui_button_pause"], spot["UI_BUTTON_PAUSE"].x, spot["UI_BUTTON_PAUSE"].y);
			drawImage(manifest["ui_button_castle"], spot["UI_BUTTON_CASTLE"].x, spot["UI_BUTTON_CASTLE"].y);
			drawImage(manifest["ui_button_hero"], spot["UI_BUTTON_HERO"].x, spot["UI_BUTTON_HERO"].y);
			
			if(game["bombCount"] == 0)
			{
				context.globalAlpha = 0.5;
				drawImage(manifest["ui_button_bomb"], spot["UI_BUTTON_BOMB"].x, spot["UI_BUTTON_BOMB"].y);
				context.globalAlpha = 1;
			}
			else drawImage(manifest["ui_button_bomb"], spot["UI_BUTTON_BOMB"].x, spot["UI_BUTTON_BOMB"].y);
			
			if (game["bombCount"] > 0) drawText(game["bombCount"], "UI_BUTTON_BOMB_TEXT", spot["UI_BUTTON_BOMB"].x + 30, spot["UI_BUTTON_BOMB"].y + 35);
			
			if(game["showDiscover"])
			{
				tempManifest = "ui_button_discover_selected";
			}
			else
			{
				tempManifest = "ui_button_discover";
	
				tempCount = 0;
							
				for(key in o)
				{
					if(o[key].category == "resources") tempCount++;
				}
				
				if(tempCount > 3) context.globalAlpha = 0.5;
			}
			
			drawImage(manifest[tempManifest], spot["UI_BUTTON_DISCOVER"].x, spot["UI_BUTTON_DISCOVER"].y);
			context.globalAlpha = 1;
			
			if(game["showBuilding"]) tempManifest = "ui_button_build_selected"; else tempManifest = "ui_button_build";
			drawImage(manifest[tempManifest], spot["UI_BUTTON_BUILD"].x, spot["UI_BUTTON_BUILD"].y);
			
			
				
			// *** Wave progress bar
			if(!game["gameFinished"])
			{
				if(game["levelWaveStatus"] == "COUNTDOWN")
				{
					drawText("Volgende golf: ", "WAVE_TEXT", 466 - 0, 670+12);
					drawImage(manifest["ui_wave_bg"], 466, 670);
			
					game["levelWaveCount"]++;
					
					if(game["levelWaveCount"] > game["levelWaveCountMax"])
					{
						// *** Wave is coming!
						game["levelWaveStatus"] = "WAVE";
						game["levelWaveCount"] = 0;
						
						defenseGenerateWave();
					}
					
					drawImage(manifest["ui_wave_bar"], 466+76, 670+4, (game["levelWaveCount"] / game["levelWaveCountMax"]) * 356, 9);
					drawImage(manifest["ui_wave_quick"], spot["WAVE_QUICK"].x, spot["WAVE_QUICK"].y);
					
					drawText("golf " + (game["levelWave"]+1), "WAVE_TEXT", 466+440+50, 670+12);
					
				}
				else if(game["levelWaveStatus"] == "WAVE")
				{
					drawText("Golf " + game["levelWave"] + " is bezig: ", "WAVE_TEXT_2", 466 - 10, 670+12);
		
					drawImage(manifest["ui_wave_bg_2"], 466, 670);
			
					if(game["levelWaveCount"] < game["levelWaveCountMaxWave"] + 2){game["levelWaveCount"]++;}
					
					
								
					drawImage(manifest["ui_wave_bar_2"], 466+76, 670+4, (game["levelWaveCount"] / game["levelWaveCountMaxWave"]) * 356, 9);
					
					tempCount = 0;
					
					for(key in o)
					{
						if(o[key].category == "blobs") tempCount++;
					}
					
					if(game["levelWaveCount"] > game["levelWaveCountMaxWave"] && tempCount < 3)
					{
						// *** Wave is over
						game["levelWaveStatus"] = "COUNTDOWN";
						game["levelWaveCount"] = 0;
					}
					drawText("Nog " + tempCount + " blobs", "WAVE_TEXT_2", 466 + 440, 670+12);
				}
			}		
		}
		else
		{
			
			// *** Spelling word
			if(game["showSpellingWord"])
			{
				// *** BG
				drawImage(manifest["bg_spelling"], 0, 0);

				drawText("Woord " + (game["spellingAmountCount"]+1) + " van " + game["spellingAmount"], "WORD_COUNT_TEXT");

				// *** Voice buttons
				voicebutton();
				
				if(game["ShowVoiceButton"]) context.globalAlpha = 0.75; else context.globalAlpha = 0.3;				
				if(hoverSpot("VOICE") && game["ShowVoiceButton"]) context.globalAlpha = 1;				
				drawImage(manifest["voice"], spot["VOICE"].x, spot["VOICE"].y);
				
				if(game["ShowVoiceButtonSentences"]) context.globalAlpha = 0.75; else context.globalAlpha = 0.3;				
				if(hoverSpot("VOICE_SENTENCE") && game["ShowVoiceButtonSentences"]) context.globalAlpha = 1;				
				drawImage(manifest["voice_sentence"], spot["VOICE_SENTENCE"].x, spot["VOICE_SENTENCE"].y);
				
				context.globalAlpha = 1;
					
										
				// *** Word					
				context.save(); 
				
				context.textAlign = "left"; 
				context.font = "34px Arial";
				context.fillStyle = "#FFFFFF";
				context.shadowColor = "#000000";
				
				var markx = 360;
				var marky = 600;
				
				if(klas_wachtwoord == "" && taak == "" && leerling == "")
				{
					// *** gewoon oefenen					
					for (z=1;z<(gameNumber);z++) { context.fillText(mark[z],markx,marky); markx += 160; }					
				}				
								
				context.restore(); 
		
				if(level==6 && gameType=="oefenen"){context.fillStyle = "#ffffff";} else{context.fillStyle = "#000000"}
				if(MistakeFeedback>0){MistakeFeedback -= 1;if(MistakeFeedback==1){spelledWord="";letterBrightness = 0.3;if(Attempt>2&&gameWordCurrent<15){nextWord();newSpelWord();}}}			
				if(spelledWord.length>1 && letterBrightness>0.05 && Attempt<2||spelledWord.length>0 && spelWord.length<6 && letterBrightness>0.05 && Attempt<2){letterBrightness -= 0.05;} else if(letterBrightness<0.40 && spelledWord.length<1 && spelWord.length<6||letterBrightness<0.40 && spelledWord.length<2 && spelWord.length>5){letterBrightness += 0.05}				
				if(gameType=="dictee" && Attempt<2){letterBrightness = 0;}
				
				if(spelWord.length>10)
				{
					LetterSize = 80;
					spot["WORD"].interval = 75;
					spot["WORD"].y = 180;
					LetterHeight = 63
					context.font = "70px Arial";
					letterX = 20
				} 				
				else
				{
					LetterSize = 120;
					spot["WORD"].interval = 114;
					spot["WORD"].y = 160;
					LetterHeight = 93
					context.font = "110px Arial";
					letterX = 29
				}
				
				if(spelWord.length>16)
				{
					LetterSize = 0;
					spot["WORD"].interval = 50;
					spot["WORD"].y = 157;
					LetterHeight = 63
					context.font = "50px Arial";
					letterX = 20;
				}
			
				LetterDistance = 0;
				
				for(key in spelWord)
				{
					drawImage(manifest["letter_empty"], spot["WORD"].x + LetterDistance, spot["WORD"].y,LetterSize,LetterSize);
					Xcorrectie = 0;
					Xcorrectie = xCorrectie(spelWord[key]);
					context.globalAlpha = letterBrightness;
					context.fillText(spelWord[key], spot["WORD"].x + letterX + Xcorrectie + LetterDistance, spot["WORD"].y + LetterHeight);
					context.globalAlpha = 1;
					LetterDistance += spot["WORD"].interval;
				}
				
				context.fillStyle = "#000000";
				if(MistakeFeedback>0){context.fillStyle = "#ff0000";}
				LetterDistance = 0;
				
				for(key in spelledWord)
				{
					drawImage(manifest["letter"], spot["WORD"].x + LetterDistance, spot["WORD"].y,LetterSize,LetterSize);
					Xcorrectie = 0;
					Xcorrectie = xCorrectie(spelledWord[key]);
					context.fillText(spelledWord[key], spot["WORD"].x + letterX + Xcorrectie + LetterDistance, spot["WORD"].y + LetterHeight);
					LetterDistance += spot["WORD"].interval;
				}
							
			}
			

			// *** Game paused
			if(!game["showHeroSelect"])
			{
				context.globalAlpha = 0.5 + game["pulsate"]/2;
				drawImage(manifest["ui_button_pause"], spot["UI_BUTTON_PAUSE"].x, spot["UI_BUTTON_PAUSE"].y);
				context.globalAlpha = 0.5 + game["pulsateCos"]/2;
				drawText("Spel gepauzeerd", "UI_BUTTON_PAUSE_TEXT");
				context.globalAlpha = 1;
			}			
			
		}

		// *** Popup: Select hero
		if(game["showHeroSelect"])
		{
			game["playerSelected"] = 0;
			drawImage(manifest["bg_hero_select"], 0, 0);
			
			tempMsg = new Array();
			tempMsg[1] = "";
			tempMsg[2] = "";
			tempMsg[3] = "Haal 5000 punten om te unlocken!";
			tempMsg[4] = "Haal 5000 punten om te unlocken!";
			tempMsg[5] = "Haal 10000 punten om te unlocken!";

			for(k = 1; k <= 5; k++)
			{
				if(game["heroesUnlocked"] < k)
				{
					drawImage(manifest["ui_hero_select_lock"], spot["HERO_SELECT_BUTTON_" + k].x - 7, spot["HERO_SELECT_BUTTON_" + k].y + 322);
					
					drawTextarea(tempMsg[k], "HERO_SELECT_LOCK_TEXT", spot["HERO_SELECT_BUTTON_" + k].x - 7 + 64, spot["HERO_SELECT_BUTTON_" + k].y + 322 + 42);
					
				}			
			}
		}
		
		if(game["score"] >= 5000 && game["heroesUnlocked"] < 4)
		{
			defenseMessage("Helden Vuurmeester en Bliksem magiër unlocked!");
			game["heroesUnlocked"] = 4;
			setCookie("explorerSaveGame_heroes", 4);
		}
		
		if(game["score"] >= 10000 && game["heroesUnlocked"] < 5)
		{
			defenseMessage("Held Oppermeester unlocked!");
			game["heroesUnlocked"] = 5;
			setCookie("explorerSaveGame_heroes", 5);
		}
		
		
		
		// *** Game finished screen	
		if(game["gameFinishedScreen"])
		{
			game["gameFinishedCount"]++;
			if(game["gameFinishedCount"] < 50) context.globalAlpha = 0;
			else if(game["gameFinishedCount"] >= 50 && game["gameFinishedCount"] <= 100) context.globalAlpha = (game["gameFinishedCount"] - 50)/50;
			else context.globalAlpha = 1;
			
			drawImage(manifest["bg_end"], 0, 0);
			context.globalAlpha = 1;
		}

		
		// *** Game over screen	
		if(game["gameGameOverScreen"])
		{
			game["gameFinishedCount"]++;
			if(game["gameFinishedCount"] < 50) context.globalAlpha = 0;
			else if(game["gameFinishedCount"] >= 50 && game["gameFinishedCount"] <= 100) context.globalAlpha = (game["gameFinishedCount"] - 50)/50;
			else context.globalAlpha = 1;
			
			drawImage(manifest["bg_game_over"], 0, 0);
			context.globalAlpha = 1;
		}

		
		/* *** Sin/cos/tan test
		markX = tX(500);
		markY = tY(350);
		markR = Math.atan((markX - game["mouseX"]) / (markY - game["mouseY"]));
		markR = toDegrees(markR);
		if(markY - game["mouseY"] < 0) markR = markR + 180;
		
		console.log(Math.round(markR));
		
		drawImage(manifest["arrow"], markX, markY, true, true, markR + 90, false, false, true);
		drawImage(manifest["arrow"], markX + Math.sin(toRadians(markR+180))*150, markY + Math.cos(toRadians(markR+180))*150, 50, 50, markR + 90, false, false, true);
		*/
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
		
		if(hoverSpot("KEYBOARD_ICON")) context.globalAlpha = 1; else context.globalAlpha = 0.75;

		spot["KEYBOARD_ICON"].x = temp_x;
		if(keyboard["status"] == "hidden") icon = "keyboard_off"; else icon = "keyboard_on";
		if(keyboard["status"] == "hidden" && game["showSpellingWord"] && !hoverSpot("KEYBOARD_ICON")) context.globalAlpha = 0.5 + game["pulsate"]/2;
		
		drawImage(manifest[icon], spot["KEYBOARD_ICON"].x, spot["KEYBOARD_ICON"].y);
		temp_x -= spot["KEYBOARD_ICON"].width + spot["WINDOW_BUTTONS"].margin;
					
	}
	
	// *** Keyboard
	if(keyboard["status"] != "hidden") drawKeyboard();
}
