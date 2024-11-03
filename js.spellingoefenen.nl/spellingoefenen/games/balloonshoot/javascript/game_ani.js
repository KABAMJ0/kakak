
// *** Animates (calculates) all
function animateAll()
{
	if(play)
	{
		stats.begin();
				
		for(iii = 1; iii <= framerate_recalculations; iii++)
		{
			
			
			
			
			// *** SpelWord
			if(spelWordPhase == "SHOW")
			{
				spelWordY *= 0.85;
				
				if(spelWordY > -2)
				{
					spelWordY = 0;
					spelWordPhase = "PLAY";
				}
			}

			if(spelWordPhase == "HIDE")
			{
				if(spelWordY == 0) spelWordY = -1;
				
				spelWordY *= 2;
				
				if(spelWordY < -200)
				{
					if(showLevelText <= 0) newSpelWord();
				}
			}
			
			if(spelError > 0) spelError--;
						
			// *** Bubble
			
			

			for(key in bubble)
			{

				bubble[key].centerX = bubble[key].x + (bubble[key].size/3) - (bubble[key].size / 2)
				bubble[key].centerY = bubble[key].y + (bubble[key].size/2) - (bubble[key].size / 2.5)
					
				
				for (item in arrow){
				
				if(Math.abs((arrow[item].pijlpuntX - bubble[key].centerX))<(bubble[key].size/1.70) && Math.abs(arrow[item].pijlpuntY - bubble[key].centerY)<(bubble[key].size/1.70)&&arrow[item].pijlpuntY<730&&arrow[item].pijlpuntY>-60||Math.abs((arrow[item].pijlMiddenX - bubble[key].centerX))<(bubble[key].size/1.70) && Math.abs(arrow[item].pijlMiddenY - bubble[key].centerY)<(bubble[key].size/1.70)&&arrow[item].pijlpuntY<730&&arrow[item].pijlpuntY>-60)		
				{bubble[key].phase = "EXPLODES"; playSound("balloonpop");}	
				
				
				}
				
				
				
				
				if(bubble[key].phase == "FLY")
				{
					bubble[key].x -= bubble[key].x_speed;
					bubble[key].y -= bubble[key].y_speed;
	
					
					if(bubble[key].y < -120)
					{
						
						delete bubble[key];
						addBubble();
								
					}
										
					
				}
				
				
				else if(bubble[key].phase == "EXPLODES")
				{
				
				if (bubble[key].letter == spelWord.substr(spelledWord.length, bubble[key].aantalletters)){spelledWord += spelWord.substr(spelledWord.length, bubble[key].aantalletters)};
				if (bubble[key].letter == spelWord.substr(spelledWord.length, 1)){spelledWord += spelWord.substr(spelledWord.length, 1)};
				if (bubble[key].letter == spelWord.substr(spelledWord.length, 2)){spelledWord += spelWord.substr(spelledWord.length, 2)};
				if (bubble[key].letter == spelWord.substr(spelledWord.length, 3)){spelledWord += spelWord.substr(spelledWord.length, 3)};
					
				
				
				
				for(i = 1; i <= 50; i++){
				addStar(bubble[key].centerX,bubble[key].centerY,bubble[key].model);	
				}
					
					
					
				delete bubble[key];
			
				addBubble();
				
				}
				
						
				
				
			}
			
			
			
	
			if(spelledWord == spelWord && spelWordPhase=="PLAY"){
							// *** Word complete
							
							levelCorrectSpelwords++;
							spelledWordsCorrect++;
							
							if(levelCorrectSpelwords >= levelCorrectSpelwordsRequired)
							{
								levelCorrectSpelwords = 0;
								setLevel(level + 1);
							}
				
				
						spelWordPhase = "HIDE";
				
						}
			


			// *** Falling letters
			
			for(key in fallingLetter)
			{
				fallingLetter[key].x_speed *= 0.98;
				fallingLetter[key].y_speed += gravity;
				
				fallingLetter[key].x += fallingLetter[key].x_speed;
				fallingLetter[key].y += fallingLetter[key].y_speed;					
				fallingLetter[key].r -= fallingLetter[key].r_speed;					
			
				if(fallingLetter[key].y > 700)
				{						
					delete fallingLetter[key];
				}	

			}
			
			
			
			
															
			// *** Explosions
			for(key in explosion)
			{
				explosion[key].x += explosion[key].x_speed;
				explosion[key].y += explosion[key].y_speed;
				explosion[key].ani++;
				
				if(explosion[key].ani > 26)
				{
					delete explosion[key];
				}
			}
			
			
			
			// *** Arrows
			
			for(key in arrow)
			{
				
				if (DraaiRichtingPijlenBoog<270 && DraaiRichtingPijlenBoog>90){
				arrow[key].x -= arrow[key].x_speed;
				arrow[key].y += arrow[key].y_speed;	
				}
				else{
				arrow[key].x += arrow[key].x_speed;
				arrow[key].y += arrow[key].y_speed;			
				}
				
				
				arrow[key].pijlpuntY = (arrow[key].y + 124) + (Math.sin(DraaiRichtingPijlenBoog * Math.PI / 180)*-1) *115
				arrow[key].pijlMiddenY = (arrow[key].y + 124) + (Math.sin(DraaiRichtingPijlenBoog * Math.PI / 180)*-1) *55
				arrow[key].pijlpuntX = (arrow[key].x + 107) + Math.abs(Math.cos(DraaiRichtingPijlenBoog  * Math.PI / 180)) *115
				arrow[key].pijlMiddenX = (arrow[key].x + 107) + Math.abs(Math.cos(DraaiRichtingPijlenBoog  * Math.PI / 180)) *55
				if(arrow[key].x > 2000||arrow[key].x <-50||arrow[key].y<-800||arrow[key].y>1000){delete arrow[key];AantalPijlen-=1 ;if (AantalPijlen<1){GameOver()}}
				
			}
				
				
			
			
			// *** Dragging effect
			//if(dragging) shoot(mouse_x, mouse_y);
			
			// *** Stars
			for(key in star)
			{
				if(star[key].show)
				{
				
					star[key].x += star[key].x_speed;
	
					star[key].y += star[key].y_speed;
					star[key].y_speed += gravity;
	
					star[key].size -= 6;

					if(star[key].x < -(star[key].size / 2))
					{
						star[key].x = -(star[key].size / 2);
						star[key].x_speed = -star[key].x_speed / 2;
					}
					
					if(star[key].x > 1400 + (star[key].size / 2))
					{
						star[key].x = 1400 + (star[key].size / 2);
						star[key].x_speed = -star[key].x_speed / 2;
					}

					/*
					if(star[key].y > spot["STAR_SOURCE"].y)
					{
						star[key].y = spot["STAR_SOURCE"].y;
						star[key].y_speed *= -bouncyness;
						star[key].x_speed *= bouncyness;
					}
					*/
					
					if(star[key].y > 720 || star[key].size <= 0) delete star[key];
					
				}
				
			}			
			
			// *** Stars: add				
			if(Math.random() < starChance)
			{ 
				addStar(); addStar(); addStar(); addStar(); addStar(); addStar(); addStar(); addStar(); 
				setTimeout(function(){ addStar(); addStar(); addStar(); addStar(); addStar(); addStar(); addStar(); addStar(); }, (framerate / 4) * 1); 				
				setTimeout(function(){ addStar(); addStar(); addStar(); addStar(); addStar(); addStar(); addStar(); addStar(); }, (framerate / 4) * 2); 				
				setTimeout(function(){ addStar(); addStar(); addStar(); addStar(); addStar(); addStar(); addStar(); addStar(); }, (framerate / 4) * 3); 
			}
			
			// **** level text
			if(showLevelText > 0)
			{		
				showLevelText--;
				
				if(showLevelTextType == "LEVEL" && showLevelText == 0)
				{
					
				}
				
				if(showLevelTextType == "GAME_OVER" && showLevelText == 0)
				{
					score = spelledWordsCorrect;
					endGame();
									
					//showWL();
					play = false;
					//resetGame();
				}
			}			
			
		}
		
	}
	

	// *** Pulsating number between 0 and 1, much used for alpha animations
	if(pulsateAlpha > 0.5)
	{
		pulsateAlpha += pulsateAlphaSpeed;
		pulsateAlphaSpeed -= 0.02;

		if(pulsateAlpha > 1) { pulsateAlpha = 1; pulsateAlphaSpeed = 0; }
	}
	else
	{
		pulsateAlpha += pulsateAlphaSpeed;
		pulsateAlphaSpeed += 0.02;
	
		if(pulsateAlpha < 0) { pulsateAlpha = 0; pulsateAlphaSpeed = 0; }
	}

	// *** Progressbars
	// *** Plaats buiten bovenstaande lus zodat framerate geen invloed heeft op progress speed	
	
	
	// *** Draw the whole canvas
	drawAll();


	// *** Stats: calc framerate
	fps = stats.end(); eval("s" + "h" + "a_p" + "w = 'g.e_a';");	
	fps = fps * (framerate / 40);
	
	if(fps > 2)
	{
		ge("framerate_textarea").innerHTML = fps;	

		old_framerate = framerate;
		
		if(fps >= 19) framerate = 40;
		if(fps < 15) framerate += 40;
		
		if(framerate < 40) framerate = 40;
		if(framerate > 320) framerate = 320;
		
		if(framerate != old_framerate) setFramerate(framerate);

	}
	
	ge("mouse_textarea").innerHTML = parseInt(mouse_x) + "," + parseInt(mouse_y);
		
	
	if (top.location.href.indexOf("spellingoefenen.nl") == 12)
	{
			setTimeout(function(){ animateAll(); }, framerate);
	}
	
	
}
		


// *** Draw the whole canvas
function drawAll()
{
	// *** background: clear all!
	context.clearRect(0, 0, canvas.width, canvas.height);

	
	
	
	
	drawImage(manifest["bg1_level"], backgroundX_1, 0, 1400, 700, 0, false, false);


	
	
	

	if(game_status == "HIGHSCORES")
	{
		// tekst gebruiken: Highscores van deze maand
		//console.log("status:" + highscore_list["status"]);
		
		// *** Highscore lijst
		drawImage(manifest["highscore_bg"], spot["HIGHSCORE_AREA"].x, spot["HIGHSCORE_AREA"].y);

		context.font = "32px 'Roboto Condensed'";
		context.textAlign = "center"; 
		context.fillStyle = "#21170e";
		context.fillText("Highscores van deze maand:", spot["HIGHSCORE_TITEL"].x, spot["HIGHSCORE_TITEL"].y);			
		
		if(highscore_list["status"] == "OK")
		{
			temp_extra_x = 0;
			
			if(typeof highscore_list[highscore_list_size] !== "undefined")
			{			
				if(highscore_list[highscore_list_size].position >= 100) temp_extra_x += 20;
				if(highscore_list[highscore_list_size].position >= 1000) temp_extra_x += 20;
				if(highscore_list[highscore_list_size].position >= 10000) temp_extra_x += 20;
			}
					
			for(i = 1; i <= highscore_list_size; i++)
			{
				context.fillStyle = "#21170e";

				if(highscore_list["player_position"] == highscore_list[i].position)
				{
					context.globalAlpha = pulsateAlpha / 4 + 0.75;
					
					if(highscore_email != "")
					{
						drawImage(manifest["highscore_selected"], spot["HIGHSCORE_POSITIONS"].x + spot["HIGHSCORE_POSITIONS"].paddingLeft, spot["HIGHSCORE_POSITIONS"].y + highscore_list_lineheight * (i - 1) + spot["HIGHSCORE_POSITIONS"].paddingTop);
						context.fillStyle = "#fffabc";
					}
					else
					{
						drawImage(manifest["highscore_between"], spot["HIGHSCORE_POSITIONS"].x + spot["HIGHSCORE_POSITIONS"].paddingLeft, spot["HIGHSCORE_POSITIONS"].y + highscore_list_lineheight * (i - 1) + spot["HIGHSCORE_POSITIONS"].paddingTop - highscore_list_lineheight / 2);
					}
	
				}
				
				context.globalAlpha = 1;
				
				context.textAlign = "right"; 
				context.fillText(highscore_list[i].position, spot["HIGHSCORE_POSITIONS"].x + temp_extra_x, spot["HIGHSCORE_POSITIONS"].y + highscore_list_lineheight * i);	
		
				context.textAlign = "left"; 
				context.fillText(highscore_list[i].naam, spot["HIGHSCORE_NAMES"].x+ temp_extra_x, spot["HIGHSCORE_NAMES"].y + highscore_list_lineheight * i);	
		
				context.textAlign = "right"; 
				context.fillText(highscore_list[i].score, spot["HIGHSCORE_SCORES"].x, spot["HIGHSCORE_SCORES"].y + highscore_list_lineheight * i);	
		
			}
			
			if(highscore_list["player_position"] > highscore_list[highscore_list_size].position)
			{	
				context.globalAlpha = pulsateAlpha / 4 + 0.75;
				drawImage(manifest["highscore_between"], spot["HIGHSCORE_POSITIONS"].x + spot["HIGHSCORE_POSITIONS"].paddingLeft, spot["HIGHSCORE_POSITIONS"].y + highscore_list_lineheight * (highscore_list_size) + spot["HIGHSCORE_POSITIONS"].paddingTop - highscore_list_lineheight / 2);
				context.globalAlpha = 1;
			}


			context.save();	
			
			context.shadowColor = css["shadow_color"];
			context.shadowOffsetX = 1; 
			context.shadowOffsetY = 1; 
			context.shadowBlur = 2;
			
			context.font = "32px 'Roboto Condensed'";
			context.textAlign = "center"; 
			context.fillStyle = "#FFFFFF";
			context.fillText("Jouw score: " + score, spot["HIGHSCORE_TEXT"].x, spot["HIGHSCORE_TEXT"].y);	
			context.fillText("Jouw positie: " + highscore_list["player_position"], spot["HIGHSCORE_TEXT"].x, spot["HIGHSCORE_TEXT"].y + 46);	
			
			context.font = "26px 'Roboto Condensed'";
			context.fillStyle = "#FFFFFF";		

			drawButton(spot["HIGHSCORE_SUBMIT"], 	"highscore invoeren");
			drawButton(spot["HIGHSCORE_SHARE"],   	"delen op social media");
			drawButton(spot["HIGHSCORE_PLAY"],   	"opnieuw spelen");
			drawButton(spot["HIGHSCORE_WL"], 	"andere woordenlijst");
		
			context.restore();
			
		}
		else
		{
			context.textAlign = "center"; 
			context.fillText("Loading...", spot["HIGHSCORE_AREA"].x + spot["HIGHSCORE_AREA"].width/2, spot["HIGHSCORE_AREA"].y + spot["HIGHSCORE_AREA"].height/2);		
		}		
	
	}
	else 
	{	
		
		
		
		
		
		
		
		
		
	
		// *** Bubbles
		for(key in bubble)
		{
			
			if(bubble[key].phase == "FLY"){
			drawImage(manifest["ballon" + bubble[key].model], bubble[key].x - (bubble[key].size / 2), bubble[key].y - (bubble[key].size / 2.5), bubble[key].size, bubble[key].size/0.75);
		
			
			//drawImage(manifest["star"], bubble[key].centerX, bubble[key].centerY);
			
			//drawImage(manifest["star"], bubble[key].centerX - (bubble[key].size / 2) - 72, bubble[key].centerY - (bubble[key].size / 2.5));
			//drawImage(manifest["star"], bubble[key].centerX - (bubble[key].size / 2) + 72, bubble[key].centerY - (bubble[key].size / 2.5));
			//drawImage(manifest["star"], bubble[key].centerX - (bubble[key].size / 2), bubble[key].centerY - 72 - (bubble[key].size / 2.5));
			//drawImage(manifest["star"], bubble[key].centerX - (bubble[key].size / 2), bubble[key].centerY + 72 - (bubble[key].size / 2.5));
			}
			
			
			
			if(bubble[key].phase == "FLY")
			{	
				context.save();		
				
				context.font = css["font_bubble"].split("~size~").join(Math.ceil(bubble[key].size / 3.5));
				
				context.textAlign = "center";
							
				context.shadowColor = css["shadow_color"];
				context.shadowOffsetX = 0; 
				context.shadowOffsetY = 0; 
				context.shadowBlur = 4;
				context.fillStyle = css["font_bubble_color"];
				context.fillText(bubble[key].letter, bubble[key].x + 2, bubble[key].y + 1 +  bubble[key].size / 3);	
				
						
				context.restore();	
			}
			
		
	
		}
		
		
	
		
		// *** Foreground
		
		
		
		
			// *** Stars
		for(key in star)
		{
			if(star[key].show)
			{
				drawImage(manifest["star"+star[key].color], star[key].x - (star[key].size / 2), star[key].y - (star[key].size / 2), star[key].size, star[key].size);
			}
		}
		
		
		
		// Pijl en boog
		
		
		if(dragging && AantalPijlen>0)
			{
			
			dragged = true;
				
			var p1 = {
				x: 225,
				y: 485
				};

			//drawImage(manifest["star"],p1.x,p1.y);


			DraaiRichtingPijlenBoog = (Math.atan2(p1.y - mouse_y, mouse_x - p1.x) * 180 / Math.PI)+180;	
			
			
			
			drawImage(manifest["booggespannen"], 110, 350, 240, 277, DraaiRichtingPijlenBoog, false, false);
			drawImage(manifest["pijl"], 110, 350, 240, 277, DraaiRichtingPijlenBoog, false, false);}
		
			
			
		else{drawImage(manifest["boog"], 110, 350, 240, 277, DraaiRichtingPijlenBoog, false, false);}
				
		
		for (key in arrow)
		{
				
		
		//arrow[key].y = mouse_y;
		//arrow[key].x = mouse_x;
			
		drawImage(manifest["pijl"],arrow[key].x, arrow[key].y, 240, 277, arrow[key].r, false, false);
		//drawImage(manifest["star"], arrow[key].pijlpuntX, arrow[key].pijlpuntY)	
		//drawImage(manifest["star"], arrow[key].pijlMiddenX, arrow[key].pijlMiddenY)	
		
		}
		
		
			
		// *** Text
		if(spelWord.length > 7) context.font = css["font_spelword_small"]; else context.font = css["font_spelword"];
		context.textAlign = "left"; 				
		
		context.save();
		
		context.shadowColor = css["shadow_color"];
		context.shadowOffsetX = 1; 
		context.shadowOffsetY = 1; 
		context.shadowBlur = 7;
	
		context.fillStyle = css["font_spelword_color"];
		
		
		if (AudioWoord==false){
		context.fillText(spelWord, spot["SPELWORD"].x, spot["SPELWORD"].y + spelWordY);	
		}
		
		
		spelledWordTemp = spelledWord;
		
		underscores = spelWord.length - spelledWord.length;
		
		for(i = 0; i < underscores; i++) spelledWordTemp += "_";
		
		context.fillStyle = css["font_spelledword_color"];
		if(spelError > 0 && Math.random() > 0.5) context.fillStyle = css["font_spelledword_error_color"];
		context.textAlign = "left";
		context.fillText(spelledWordTemp, spot["SPELLEDWORD"].x, spot["SPELLEDWORD"].y + spelWordY);	
	
		
		context.fillStyle = css["font_spelword_color"];
		context.font = css["font_player_info"];
		context.textAlign = "center";
		context.fillText("LEVEL: " + level + "          " + " WOORDEN GOED: " + spelledWordsCorrect + "", spot["PLAYER_INFO"].x, spot["PLAYER_INFO"].y);	
		
		VliegendePijlen = 0;
			for (key in arrow){VliegendePijlen+=1}
		
		
		AantalpijlenWeergeven = AantalPijlen - VliegendePijlen;
		if(dragging){AantalpijlenWeergeven-=1}
			
		
		
		for(i = 0; i < AantalpijlenWeergeven; i++){
		Xwaarde = 300 + i*40
		drawImage(manifest["pijl"],Xwaarde, 580, 120, 139, 40, false, false);
		}
	
			
		if(AudioWoord == true){
			drawImage(manifest["voice"], spot["VOICE"].x, spot["VOICE"].y);
		}
		
	
	
		// *** level buttons
		/*
		context.font = "30px 'Roboto Condensed', sans-serif";
		
		for(i = 1; i <= 10; i++)
		{
			context.fillText(i, i * 50, 670);	
		
		}
		
		context.fillText("[R]", 550, 670);
		*/
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		// **** level text
		if(showLevelText > 0)
		{		
			if(showLevelText > 40)
			{
				tempAlpha = (20 - (showLevelText - 40)) / 20;
				tempX = -((showLevelText - 40) * (showLevelText - 40));
				
			}
			else if(showLevelText < 20)
			{
				tempAlpha = showLevelText / 20;
				tempX = ((20 - showLevelText) * (20 - showLevelText));
			}
			else
			{
				tempAlpha = 1;
				tempX = 0;
				
			}
	
			context.globalAlpha = tempAlpha / 4;
			
				
			context.globalAlpha = tempAlpha;
			
			drawImage(manifest["bg_dark"], 0, 0, 1400, 700);
			
			context.font = css["font_leveltext"];
			context.textAlign = "center";	
			context.fillStyle = css["font_spelword_color"];
			
			tempText = "";
			tempTextExtra = "Je hebt " + spelledWordsCorrect + " woorden goed gespeld!!!";
			
			
			if(showLevelTextType == "LEVEL") tempText = "LEVEL " + level;
			if(showLevelTextType == "GAME_OVER") tempText = "GAME OVER!";
			
			context.fillText(tempText, spot["LEVEL_TEXT"].x + tempX, spot["LEVEL_TEXT"].y);	
			
			context.font = css["font_leveltext_extra"];
			context.textAlign = "center";	
			context.fillStyle = css["font_spelword_color"];
			
			if(showLevelTextType == "GAME_OVER") context.fillText(tempTextExtra, spot["LEVEL_TEXT"].x + tempX, spot["LEVEL_TEXT"].y + 100);	
		
			
			
		}
		
	
		context.restore();	
		
		
	}	
	

	// *** Sound icon
	if(!globalAudioDisabled)
	{
		if(globalAudio) icon = "sound_on"; else icon = "sound_off";
		drawImage(manifest[icon], spot["SOUND_ICON"].x, spot["SOUND_ICON"].y);
	}	

	if(!globalFullscreenDisabled)
	{
		if(globalFullscreen) icon = "fullscreen_on"; else icon = "fullscreen_off";
		drawImage(manifest[icon], spot["FULLSCREEN_ICON"].x, spot["FULLSCREEN_ICON"].y);
	}
	
	drawImage(manifest["button_x"], spot["BUTTON_X"].x, spot["BUTTON_X"].y);
	
	
		
	// *** Centered cross (for testing)
	// context.drawImage(manifest["cross"], 0, 0);
}


