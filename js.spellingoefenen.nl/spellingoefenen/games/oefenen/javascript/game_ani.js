// *** Animates (calculates) all
function animateAll()
{
	if(gameEngine["play"])
	{
		gameEngine["framerateStats"].begin();
				
		for(iii = 1; iii <= gameEngine["framerateRecalculations"]; iii++)
		{
			// *** Demo
			if(game["status"] == "")
			{
				// *** Demo: Increase of score for demo purposes: delete it eventually!
				if(game["status"] == "") game["score"]++; 
	
				// *** Demo: Particles: add stream out of vulcano as demo				
				//for(i = 1; i <= 4; i++) addParticle(game["demoParticleSelected"], spot["DEMO_PARTICLE_SOURCE"].x + Math.random() * 15 - 15, spot["DEMO_PARTICLE_SOURCE"].y + Math.random() * 10 - 10);

				// *** Demo: Dragging: add particle for testing
				//if(game["dragging"]) { addParticle(game["demoParticleSelected"], game["mouseX"], game["mouseY"]); playSound("sword"); }

		
		
				// *** Objects
				for(key in o)
				{
					proto = oPrototype[o[key].prototype];

				
					if(o[key].category == "character")			
					{
						
						if(o[key].status == "walk")
						{
							if(typeof o[key].frameDelay === "undefined") o[key].frameDelay = 0;
							
							o[key].frameDelay++;
							
							if(o[key].frameDelay >= 2)
							{
								o[key].frameDelay = 0;
								
								o[key].frame++;
								
								if(o[key].frame > proto.frame_total)
								{
									o[key].frame = 0;
									o[key].status = "stand";
									//o[key].x += 92;
									
									o["character"].x = spot["CHARACTER"].x = ((gameWordCurrent - 1) * spot["PROGRESS_BAR"].interval) - 13
								}
							}
						}
						
					}
					else
					{
						// *** Demo: handle all fruity objects (make them bounce around the game)				
						o[key].x += o[key].xSpeed;
						o[key].y += o[key].ySpeed;
						//o[key].ySpeed += game["gravity"];
									
						o[key].r += o[key].rSpeed;
			
						if(o[key].y + manifest[o[key].manifest].height/2 > 700) { o[key].y = 700 - manifest[o[key].manifest].height/2; o[key].ySpeed *= -game["bouncyness"]; }
						if(o[key].x + manifest[o[key].manifest].width/2 > 1400) { o[key].x = 1400 - manifest[o[key].manifest].width/2; o[key].xSpeed *= -1; o[key].rSpeed *= -1; }
						if(o[key].x - manifest[o[key].manifest].width/2 < 0) { o[key].x = manifest[o[key].manifest].width/2; o[key].xSpeed *= -1; o[key].rSpeed *= -1; }
					}		
					
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
					if(particlePrototype[particle[key].prototype].bouncesLeft && particle[key].x < 0) 	{ particle[key].x = 0; 		particle[key].xSpeed = -particle[key].xSpeed * game["bouncyness"]; }					
					if(particlePrototype[particle[key].prototype].bouncesRight && particle[key].x > 1400) 	{ particle[key].x = 1400; 	particle[key].xSpeed = -particle[key].xSpeed * game["bouncyness"]; }
					if(particlePrototype[particle[key].prototype].bouncesTop && particle[key].y < 0) 	{ particle[key].y = 0; 		particle[key].ySpeed = -particle[key].ySpeed * game["bouncyness"]; }
					if(particlePrototype[particle[key].prototype].bouncesBottom && particle[key].y > 700) 	{ particle[key].y = 700; 	particle[key].ySpeed = -particle[key].ySpeed * game["bouncyness"]; }
				}							
				
				if(particle[key].y > 700 + (particle[key].size / 2) || particle[key].size <= 0 || particle[key].alpha <= 0 || (Math.random() < particlePrototype[particle[key].prototype].destructionChance)) delete particle[key];
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
	

	
	if (top.location.href.indexOf("spellingoefenen.nl") == 12)
	{
			setTimeout(function(){ animateAll(); }, gameEngine["framerate"]);
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


	
	// *** Screens
	if(game["status"] == "INTRO")
	{
		drawImage(manifest["intro_bg"], spot["INTRO"].x, spot["INTRO"].y);

		context.save(); 
		
		context.font = "54px Arial";
		context.textAlign = "center"; 
		context.fillStyle = "#FFFFFF";
		context.shadowColor = "#000000";
		context.shadowOffsetX = 1;
		context.shadowOffsetY = 1;
		context.shadowBlur = 5;

		context.globalAlpha = game["pulsate"] / 4 + 0.75;


		if(gameEngine["isSmartphone"] && !gameEngine["isTopWindow"])
		{
			temp_button_text = "Press anywhere to load game...";
		}
		else
		{
			temp_button_text = "Press anywhere to start...";
		}
		
		context.fillText(temp_button_text, spot["INTRO_TITLE"].x, spot["INTRO_TITLE"].y + game["pulsate"] * 10);	
		context.restore(); 
		
	}	
	else if(game["status"] == "")
	{
		drawImage(manifest["bg"], spot["BG"].x, spot["BG"].y);
		
		// *** Playing
		context.save(); 
		
			
		
		context.textAlign = "left"; 
		context.font = "34px Arial";
		context.fillStyle = "#FFFFFF";
		context.shadowColor = "#000000";
		
		
		var markx = 360;
		var marky = 600;
		
		if(klas_wachtwoord == "" && taak == "" && leerling == ""){//gewoon oefenen
			
			for (z=1;z<(gameNumber);z++){
			 context.fillText(mark[z],markx,marky);
			markx += 160;
			}
			
		}
		
		else{
		AantalWoorden = spelPool.split(","); 	
			context.font = "36px Arial";
			context.fillStyle = "#ffffff";
			context.shadowColor = "#000000";
			context.shadowOffsetX = 2;
			context.shadowOffsetY = 2;
			context.shadowBlur = 5;
			context.fillText("Je hebt " +voortgang+" van de "+AantalWoorden.length+" woorden gemaakt.",330,670);
		
			
			
		}
		
		//context.fillText("Gamedesign.nl HTML5 Game Blanco " + gameEngine["version"], spot["TITLE"].x, spot["TITLE"].y + 12);		
			
		//context.fillStyle = "#9999FF";
		//context.fillText("Show intro screen",	 	spot["LINK_1"].x, spot["LINK_1"].y + 12);		
		//context.fillText("Reset game", 			spot["LINK_2"].x, spot["LINK_2"].y + 12);
		//context.fillText("End game (shows highscores)",	spot["LINK_3"].x, spot["LINK_3"].y + 12);
		//drawSpot("LINK_1");

		//context.fillStyle = "#00FF00";
		//context.fillText("Score: " + game["score"] + " | Particles: " + Object.keys(particle).length + " | Objects: " + Object.keys(o).length, spot["DEBUG"].x, spot["DEBUG"].y + 12);		
		//console.log(Object.keys(particle).length);
		
		//context.font = "18px Arial";
		//context.fillStyle = "#FFFFFF";
		//context.textAlign = "center"; 
		
		//context.fillText(game["demoParticleSelected"] + ": " + particlePrototype[game["demoParticleSelected"]].name, spot["DEMO_PARTICLE_SOURCE"].x, spot["DEMO_PARTICLE_SOURCE"].y + 45);		
		
		
	
		
		context.restore(); 

		//drawButton("DEMO_WALK_BUTTON", "NEXT WORD");	
		//drawButton("DEMO_PARTICLE_BUTTON", "PARTICLE");
		//drawButton("DEMO_SCREEN_BUTTON", "NEXT SCREEN");
		
		
	
		//drawImage(manifest["letter"], spot["WORD"].x, spot["WORD"].y);
		//drawImage(manifest["letter_empty"], spot["WORD"].x + spot["WORD"].interval, spot["WORD"].y);
		//drawImage(manifest["letter_empty"], spot["WORD"].x + (2 * spot["WORD"].interval), spot["WORD"].y);
		
		//spot["WORD"].x = 700 - (spelWord.length*spot["WORD"].interval)/2; //Spelword centreren.
		
		if(level==6 && gameType=="oefenen"){context.fillStyle = "#ffffff";} else{context.fillStyle = "#000000"}
		if(MistakeFeedback>0){MistakeFeedback -= 1;if(MistakeFeedback==1){spelledWord="";letterBrightness = 0.3;if(Attempt>2&&gameWordCurrent<15){nextWord();newSpelWord();}}}
	
		if(spelledWord.length>1 && letterBrightness>0.05 && Attempt<2||spelledWord.length>0 && spelWord.length<6 && letterBrightness>0.05 && Attempt<2){letterBrightness -= 0.05;}
			else if(letterBrightness<0.40 && spelledWord.length<1 && spelWord.length<6||letterBrightness<0.40 && spelledWord.length<2 && spelWord.length>5){letterBrightness += 0.05}
		
		if(gameType=="dictee" && Attempt<2){letterBrightness = 0;}
		
		if(spelWord.length>10){
			LetterSize = 80;
			spot["WORD"].interval = 75;
			spot["WORD"].y = 80;
			LetterHeight = 63
			context.font = "70px Arial";
			letterX = 20
		} 
		
		else {
			LetterSize = 120;
			spot["WORD"].interval = 114;
			spot["WORD"].y = 60;
			LetterHeight = 93
			context.font = "110px Arial";
			letterX = 29
		}
		
		if(spelWord.length>16){
		LetterSize = 0;
		spot["WORD"].interval = 50;
		spot["WORD"].y = 57;
		LetterHeight = 63
		context.font = "50px Arial";
		letterX = 20	
		}
        
	
		LetterDistance = 0;
		for (key in spelWord){
			if(!ExtraOption){drawImage(manifest["letter_empty"], spot["WORD"].x + LetterDistance, spot["WORD"].y,LetterSize,LetterSize);}
			Xcorrectie = 0;
			Xcorrectie = xCorrectie(spelWord[key]);
			context.globalAlpha = letterBrightness;
			context.fillText(spelWord[key], spot["WORD"].x + letterX + Xcorrectie + LetterDistance, spot["WORD"].y + LetterHeight);
			context.globalAlpha = 1;
			LetterDistance += spot["WORD"].interval;
		}
		
		context.fillStyle = "#000000";
		if (MistakeFeedback>0){context.fillStyle = "#ff0000";}
		LetterDistance = 0;
		for (key in spelledWord){
			drawImage(manifest["letter"], spot["WORD"].x + LetterDistance, spot["WORD"].y,LetterSize,LetterSize);
			Xcorrectie = 0;
			Xcorrectie = xCorrectie(spelledWord[key]);
			context.fillText(spelledWord[key], spot["WORD"].x + letterX + Xcorrectie + LetterDistance, spot["WORD"].y + LetterHeight);
			LetterDistance += spot["WORD"].interval;
		}
	
		// *** Objects
		for(key in o)
		{
			if(o[key].category != "character" && o[key].category != "collectable_item" && o[key].category != "collectable_item_reached")
			{				
				if(proto.hasShadow) drawImage(manifest[o[key].manifest + "_shadow"], o[key].x + 5, o[key].y + 5, true, true, false, false, false, true);
				drawImage(manifest[o[key].manifest], o[key].x, o[key].y, true, true, o[key].r, false, false, true);
			}
		}

		drawImage(manifest["progress_bar"], spot["PROGRESS_BAR"].x, spot["PROGRESS_BAR"].y);
	
		// *** Objects
		for(key in o)
		{
			if(o[key].category == "character")
			{
				if(o[key].status == "walk")
				{
					drawImage(manifest["character_walk_" + o[key].frame], o[key].x, o[key].y);
				
				}
				else
				{
					drawImage(manifest[o[key].manifest], o[key].x, o[key].y);
				}
			}
			
			if(o[key].category == "collectable_item")
			{
				drawImage(manifest[o[key].manifest], o[key].x + game["pulsate"] * 5, o[key].y +  game["pulsateCos"] * 5, 160 - game["pulsate"] * 10, 160 - game["pulsateCos"] * 10);
				
				if(gameWordCurrent==15){o[key].category = "collectable_item_reached"; }
			
			}
			
			if(o[key].category == "collectable_item_reached")
			{
			
				destinationX = spot["COLLECTABLE_ITEM_SHOWCASE"].x + ((gameCollectableItem-1) * spot["COLLECTABLE_ITEM_SHOWCASE"].interval);  
				destinationY = spot["COLLECTABLE_ITEM_SHOWCASE"].y;
									
				o[key].x = destinationX + ((o[key].x-destinationX)/1.3);
				o[key].y = destinationY + ((o[key].y-destinationY)/1.3);
				o[key].y -= (o[key].x-destinationX)/8;
				
				drawImage(manifest[o[key].manifest], o[key].x, o[key].y, 160, 160);
				if(gameWordCurrent!=15){o[key].category = "collectable_item"; o[key].x = spot["PROGRESS_BAR_COLLECTABLE_ITEM"].x; o[key].y = spot["PROGRESS_BAR_COLLECTABLE_ITEM"].y}
			
			}

		}
		
		// *** Collectable items
		if(klas_wachtwoord == "" && taak == "" && leerling == ""){
		
			for(i = 1; i <= 5; i++)
			{
				if(gameCollectableItem > i) extra = ""; else extra = "_outline";

				drawImage(manifest["collectable_item_" + i + extra], spot["COLLECTABLE_ITEM_SHOWCASE"].x + (i - 1) * spot["COLLECTABLE_ITEM_SHOWCASE"].interval, spot["COLLECTABLE_ITEM_SHOWCASE"].y);

			}
		}
		
		else 
			
		{
			
			
			
			for(i = 1; i <= AantalWoorden.length/15; i++)
			{
				if(gameCollectableItem > i) extra = ""; else extra = "_outline";

				drawImage(manifest["collectable_item_" + i + extra], spot["COLLECTABLE_ITEM_SHOWCASE"].x + (i - 1) * spot["COLLECTABLE_ITEM_SHOWCASE"].interval, spot["COLLECTABLE_ITEM_SHOWCASE"].y);

			}	
				
				
				
		}
		
		
		
		
		if(game["ShowVoiceButton"]) {
		context.globalAlpha = 0.75;
		}
		else{context.globalAlpha = 0.3;}
		
		if(hoverSpot("VOICE")&& game["ShowVoiceButton"]) context.globalAlpha = 1;
		
		drawImage(manifest["voice"], spot["VOICE"].x, spot["VOICE"].y);
		
		
		
		
		if(game["ShowVoiceButtonSentences"]) {
		context.globalAlpha = 0.75;
		}
		else{context.globalAlpha = 0.3;}
		
		if(hoverSpot("VOICE_SENTENCE")&& game["ShowVoiceButtonSentences"]) context.globalAlpha = 1;
		
		drawImage(manifest["voice_sentence"], spot["VOICE_SENTENCE"].x, spot["VOICE_SENTENCE"].y);
		
		context.globalAlpha = 1;
			
				
	}
	else if(game["status"] == "RESULT")
	{
		drawImage(manifest["bg"], spot["BG"].x, spot["BG"].y);
		drawImage(manifest["bg_result"], spot["BG"].x, spot["BG"].y);


		context.font = "bold 26px Arial";
		context.fillStyle = "#000000";
		context.textAlign = "right"; 
		
		var x = 90 // numbers
		var y = 90
		for(a=0; a<15; a++){
			context.fillText((a+1)+".", x, y);
			y += 100
			if(a==4){x = 540; y = 90;}
			if(a==9){x = 990; y = 90;}
		}
		
		context.font = "26px Arial";
		context.textAlign = "left"; 
		
		var x = 100 // spelwords
		var y = 90
		for(a=0; a<15; a++){
			
			if(spelWords[a+1].indexOf("`")>-1){spelWords[a+1] = spelWords[a+1].split("`").join("'");}
			
			context.fillText(spelWords[a+1], x, y);
			y += 100
			if(a==4){x = 550; y = 90;}
			if(a==9){x = 1000; y = 90;}
		}
		
		var x = 100 // spelledwords first attempt
		var y = 120
		for(a=0; a<15; a++){
			if (spelledWordsAttempt1[a+1]==spelWords[a+1]){context.fillStyle = "#339900";} else{context.fillStyle = "#FF0000";}
			context.fillText(spelledWordsAttempt1[a+1], x, y);
			y += 100
			if(a==4){x = 550; y = 120;}
			if(a==9){x = 1000; y = 120;}
		}
		
		var x = 100 // spelledwords second attempt
		var y = 150
		for(a=0; a<15; a++){
			if (spelledWordsAttempt2[a+1]==spelWords[a+1]){context.fillStyle = "#339900";} else{context.fillStyle = "#FF0000";}
			context.fillText(spelledWordsAttempt2[a+1], x, y);
			y += 100
			if(a==4){x = 550; y = 150;}
			if(a==9){x = 1000; y = 150;}
		}
		
		
		var x = 370 // Check/Dots
		var y = 55
		for(a=0; a<15; a++){
			if(spelledWordsAttempt1[a+1]==spelWords[a+1]){drawImage(manifest["check"], x,y);}
			else if(spelledWordsAttempt2[a+1]==spelWords[a+1]){drawImage(manifest["check_dot"], x,y);}
			
			y += 100
			if(a==4){x = 810; y = 55;}
			if(a==9){x = 1250; y = 55;}
		}
	
		
		//drawImage(manifest["check"], 100 + 270, 90 - 35);
		//drawImage(manifest["check_dot"], 100 + 270, 90 - 35 + 100);
		//drawImage(manifest["check_dot"], 100 + 270, 90 - 35 + 200);
		//drawImage(manifest["check_dot"], 100 + 270, 90 - 35 + 300);
		//drawImage(manifest["check"], 100 + 270, 90 - 35 + 400);
				
		drawButton("RESULT_BUTTON_NEXT", "DOORGAAN");
		
	}
	else if(game["status"] == "SCORE")
	{
		drawImage(manifest["bg"], spot["BG"].x, spot["BG"].y);
		drawImage(manifest["bg_score"], spot["BG"].x, spot["BG"].y);
		
		if (mark[gameNumber]<5.5){ResultaatTekst = "Nog niet voldoende :("}
		if (mark[gameNumber]>5){ResultaatTekst = "Voldoende, blijf oefenen!"}
		if (mark[gameNumber]>6.5){ResultaatTekst = "Goed gedaan!"}
		if (mark[gameNumber]==10){ResultaatTekst = "Geweldig, foutloos!"}
		

		context.font = "48px Arial";
		context.fillStyle = "#000000";
		context.textAlign = "center"; 
		
		context.fillText("Jouw score:", spot["SCORE"].x, spot["SCORE"].y);		
		context.fillText(ResultaatTekst, spot["SCORE"].x, spot["SCORE"].y + 295);		
		
		context.font = "bold 200px Arial";
						
		context.fillText(mark[gameNumber], spot["SCORE"].x, spot["SCORE"].y + 200);						
		drawButton("RESULT_BUTTON_NEXT", "DOORGAAN");
		context.textAlign = "left";
		
		
	}	
	else if(game["status"] == "ENDSCORE")
	{
		drawImage(manifest["bg"], spot["BG"].x, spot["BG"].y);
		drawImage(manifest["bg_score"], spot["BG"].x, spot["BG"].y);
		
		context.font = "48px Arial";
		context.fillStyle = "#000000";
		context.textAlign = "center"; 
		
		if(klas_wachtwoord == "" && taak == "" && leerling == ""){//gewoon oefenen
		
				context.fillText("Goed geoefend!", spot["SCORE"].x, spot["SCORE"].y + 295);		


				for(i = 1; i <= 5; i++)
				{
					distance = i-1;
					ychange = 300
					if(i>3){distance = i-3.5; ychange = 150 }

					if(gameCollectableItem > i) extra = ""; else extra = "_outline";

					drawImage(manifest["collectable_item_" + i + extra], spot["COLLECTABLE_ITEM_SHOWCASE"].x + distance * spot["COLLECTABLE_ITEM_SHOWCASE"].interval + 300, spot["COLLECTABLE_ITEM_SHOWCASE"].y - ychange);

				}
		}
		
		else{//taken
		
				context.fillText("Je hebt je taak af!", spot["SCORE"].x, spot["SCORE"].y + 295);		
				if (EenmaligeLevelUpEindeTaak == 0 && voortgang>20){level+=1;
																	if (level==7){level=1}
																	setCookie('level',level,14); 
																	EenmaligeLevelUpEindeTaak = 1;}

				for(i = 1; i <= AantalWoorden.length/15; i++)
				{
					distance = i-1;
					ychange = 300
					if(i>3){distance = i-3.5; ychange = 150 }

					if(gameCollectableItem > i) extra = ""; else extra = "_outline";

					drawImage(manifest["collectable_item_" + i + extra], spot["COLLECTABLE_ITEM_SHOWCASE"].x + distance * spot["COLLECTABLE_ITEM_SHOWCASE"].interval + 300, spot["COLLECTABLE_ITEM_SHOWCASE"].y - ychange);

				}
			
				
		}
						
		drawButton("RESULT_BUTTON_NEXT", "DOORGAAN");
		context.textAlign = "left";
		
	}	
	else if(game["status"] == "HIGHSCORES")
	{
		drawImage(manifest["bg"], spot["BG"].x, spot["BG"].y);
		
		// *** Highscore lijst
		drawImage(manifest["highscore_bg"], spot["HIGHSCORE_AREA"].x, spot["HIGHSCORE_AREA"].y);
				
		context.font = "28px Arial";
		
		if(game["highscoreList"]["status"] == "OK")
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
				context.fillStyle = "#21170e";

				if(game["highscoreList"]["player_position"] == game["highscoreList"][i].position)
				{
					context.globalAlpha = game["pulsate"] / 4 + 0.75;
					
					if(game["highscoreEmail"] != "")
					{
						drawImage(manifest["highscore_selected"], spot["HIGHSCORE_POSITIONS"].x + spot["HIGHSCORE_POSITIONS"].paddingLeft, spot["HIGHSCORE_POSITIONS"].y + game["highscoreListLineheight"] * (i - 1) + spot["HIGHSCORE_POSITIONS"].paddingTop);
						context.fillStyle = "#fffabc";
					}
					else
					{
						drawImage(manifest["highscore_between"], spot["HIGHSCORE_POSITIONS"].x + spot["HIGHSCORE_POSITIONS"].paddingLeft, spot["HIGHSCORE_POSITIONS"].y + game["highscoreListLineheight"] * (i - 1) + spot["HIGHSCORE_POSITIONS"].paddingTop - game["highscoreListLineheight"] / 2);
					}
	
				}
				
				context.globalAlpha = 1;
				
				context.textAlign = "right"; 
				context.fillText(game["highscoreList"][i].position, spot["HIGHSCORE_POSITIONS"].x + temp_extra_x, spot["HIGHSCORE_POSITIONS"].y + game["highscoreListLineheight"] * i);	
		
				context.textAlign = "left"; 
				context.fillText(game["highscoreList"][i].naam, spot["HIGHSCORE_NAMES"].x+ temp_extra_x, spot["HIGHSCORE_NAMES"].y + game["highscoreListLineheight"] * i);	
		
				context.textAlign = "right"; 
				context.fillText(game["highscoreList"][i].score, spot["HIGHSCORE_SCORES"].x, spot["HIGHSCORE_SCORES"].y + game["highscoreListLineheight"] * i);	
		
			}
			
			if(game["highscoreList"]["player_position"] > game["highscoreList"][game["highscoreListSize"]].position)
			{	
				context.globalAlpha = game["pulsate"] / 4 + 0.75;
				drawImage(manifest["highscore_between"], spot["HIGHSCORE_POSITIONS"].x + spot["HIGHSCORE_POSITIONS"].paddingLeft, spot["HIGHSCORE_POSITIONS"].y + game["highscoreListLineheight"] * (game["highscoreListSize"]) + spot["HIGHSCORE_POSITIONS"].paddingTop - game["highscoreListLineheight"] / 2);
				context.globalAlpha = 1;
			}

			context.font = "38px Arial";
			context.textAlign = "center"; 
			context.fillStyle = "#fffabc";
			context.fillText("Jouw score: " + game["score"], spot["HIGHSCORE_TEXT"].x, spot["HIGHSCORE_TEXT"].y);	
			context.fillText("Jouw positie: " + game["highscoreList"]["player_position"], spot["HIGHSCORE_TEXT"].x, spot["HIGHSCORE_TEXT"].y + 46);	
	
			context.font = "28px Arial";
			context.fillStyle = "#21170e";		
			drawButton("HIGHSCORE_SUBMIT", "highscore plaatsen!");
			drawButton("HIGHSCORE_PLAY",   "nogmaals spelen!");
		}
		else
		{
			context.textAlign = "center"; 
			context.fillText("Loading...", spot["HIGHSCORE_AREA"].x + spot["HIGHSCORE_AREA"].width/2, spot["HIGHSCORE_AREA"].y + spot["HIGHSCORE_AREA"].height/2);		
		}
	}
	
	

	// *** Particles
	for(key in particle)
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
	
	context.globalAlpha = 1;
	

	// *** Keyboard
	if(keyboard["status"] != "hidden") drawKeyboard();	
	
		
	// *** Window buttons (icons in top right corner)
	temp_x = spot["WINDOW_BUTTONS"].x;
	
	/*
	if(gameEngine["isTopWindow"])
	{	
		if(hoverSpot("CLOSE_ICON")) context.globalAlpha = 1; else context.globalAlpha = 0.75;
		
		spot["CLOSE_ICON"].x = temp_x;
		drawImage(manifest["close"], spot["CLOSE_ICON"].x, spot["CLOSE_ICON"].y);
		temp_x -= spot["CLOSE_ICON"].width + spot["WINDOW_BUTTONS"].margin;
	}
	*/
	

	if(!gameEngine["globalFullscreenDisabled"])
	{
		if(hoverSpot("FULLSCREEN_ICON")) context.globalAlpha = 1; else context.globalAlpha = 0.75;

		spot["FULLSCREEN_ICON"].x = temp_x;
		if(gameEngine["globalFullscreen"]) icon = "fullscreen_on"; else icon = "fullscreen_off";
		drawImage(manifest[icon], spot["FULLSCREEN_ICON"].x, spot["FULLSCREEN_ICON"].y);
		temp_x -= spot["FULLSCREEN_ICON"].width + spot["WINDOW_BUTTONS"].margin;
	}
	

	if(hoverSpot("KEYBOARD_ICON")) context.globalAlpha = 1; else context.globalAlpha = 0.75;

	spot["KEYBOARD_ICON"].x = temp_x;
	icon = "keyboard";
	drawImage(manifest[icon], spot["KEYBOARD_ICON"].x, spot["KEYBOARD_ICON"].y);
	temp_x -= spot["KEYBOARD_ICON"].width + spot["WINDOW_BUTTONS"].margin;

	
	
	
	if(!gameEngine["globalAudioDisabled"])
	{
		if(hoverSpot("SOUND_ICON")) context.globalAlpha = 1; else context.globalAlpha = 0.75;

		spot["SOUND_ICON"].x = temp_x;
		if(gameEngine["globalAudio"]) icon = "sound_on"; else icon = "sound_off";
		drawImage(manifest[icon], spot["SOUND_ICON"].x, spot["SOUND_ICON"].y);
		temp_x -= spot["SOUND_ICON"].width + spot["WINDOW_BUTTONS"].margin;
	}	
	
	
}
