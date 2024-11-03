
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
					//if(showLevelText <= 0) newSpelWord();
				}
			}
			
			if(spelError > 0) spelError--;
				

			for(i = 1; i <= 8; i++)
			{
				if(stone_letter_color[i] > 0)
				{
					stone_letter_color[i] *= 0.9;
					addStar(spot["LETTER_" + i].x, spot["LETTER_" + i].y - stone_letter_color[i]);
					
					if(stone_letter_color[i] < 2) stone_letter_color[i] = 0;
					
				}
				
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
						
				

			
			// *** Spiders
			spiderFound = false;
			
			for(key in spider)
			{
				spiderFound = true;
				// *** Wobble en vertraagde wobble
				spider[key].wobble5 = spider[key].wobble4;
				spider[key].wobble4 = spider[key].wobble3;
				spider[key].wobble3 = spider[key].wobble2;
				spider[key].wobble2 = spider[key].wobble1;
				spider[key].wobble1 = spider[key].wobble;
				
				if(spider[key].wobble > 0) spider[key].wobble_speed -= 0.5;
				else if(spider[key].wobble <= 0) spider[key].wobble_speed += 0.5;
				
				spider[key].wobble += spider[key].wobble_speed;
							
				if(spider[key].status == "DROP")
				{
					spider[key].y_speed *= spider[key].y_speed_redemption;
					if(spider[key].y_speed < 0.1) spider[key].y_speed = spider[key].y_fall_speed;
					
					
					if(spider[key].y < -40)
					{
					spider[key].y_speed = 8;	
					}
					
					
					spider[key].y += spider[key].y_speed;
					
					if(spider[key].y > 700 - spider_info[spider[key].spidertype].height)
					{
						looseLive();
						retreatSpider(key);
					}
					
					
					
				}

				if(spider[key].status == "RETREAT")
				{
					spider[key].y -= 20;
					
					spider[key].plate_x_speed *= 0.8;
					spider[key].plate_y_speed += gravity;
				
					spider[key].plate_x += spider[key].plate_x_speed;
					spider[key].plate_y += spider[key].plate_y_speed;

					if(spider[key].y < -200 && spider[key].plate_y > 750) 
					{
						console.log("DELETE");
						delete spider[key];					
					}
				}
			
			}
			
			if(gameResetted && showLevelText <= 0)
			{
				if(Math.random() > spiderProbability[level] || !spiderFound)
				{
					// *** Nieuwe spin
					console.log(level + " heeft spiderProbability " + spiderProbability[level] + " (spiderFound: " + spiderFound + ")");
					newSpelWord();
					
				}
			}		
						
		
			// *** Float words
			for(key in floatWord)
			{
				floatWord[key].wordSize += 0.3;
				
				floatWord[key].y_speed -= 0.05;
				floatWord[key].y += floatWord[key].y_speed;
				
				floatWord[key].x_speed += 0.01;
				floatWord[key].x += floatWord[key].x_speed;
				
				floatWord[key].alpha -= 0.01;
		
				if(floatWord[key].alpha < 0.5)
				{
					playSound("ouk");
					for(i = 1; i <= 10 + floatWord[key].word.length; i++) addStar(floatWord[key].x + (floatWord[key].word.length * 20 * Math.random()) - (floatWord[key].word.length * 20 / 2), floatWord[key].y);
					delete floatWord[key];
				}
			}			
			
			
			// *** Stars
			for(key in star)
			{
				if(star[key].show)
				{
				
					star[key].x_speed += 0.1;
					star[key].x += star[key].x_speed;
	
					star[key].y += star[key].y_speed;
					star[key].y_speed -= (gravity/6);
	
					star[key].size -= 1;
					
					if(star[key].y < -100 || star[key].x > 1500 || star[key].size <= 0) delete star[key];
					
				}
				
			}			
				
			
			
			// **** level text
			if(showLevelText > 0)
			{		
				showLevelText--;
				
				if(showLevelTextType == "LEVEL" && showLevelText == 0)
				{
					
				}
				
				if(showLevelTextType == "GAME_OVER" && showLevelText == 20)
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
		
	
	setTimeout(function(){ animateAll(); }, framerate);
}

// *** Draw the whole canvas
function drawAll()
{
	// *** background: clear all!
	context.clearRect(0, 0, canvas.width, canvas.height);

	drawImage(manifest["bg"], 0, 0, 1400, 700, 0, false, false);


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
		
		// ** Spiders
		for(key in spider)
		{
	
			info = spider_info[spider[key].spidertype];
			spider_x = spider[key].x + spider[key].wobble;
			spider_y = spider[key].y;
			
			wobble_plate = spider[key].wobble3;
			if(!info.wobble_plate) wobble_plate = spider[key].wobble;
			
			context.strokeStyle = "#FFFFFF";
			
			context.beginPath();
			context.moveTo(spider_x + info.line_body_x, spider_y + info.line_body_y);
			context.lineTo(spider[key].x + info.line_body_x, -300);
			context.stroke();	
	
			context.strokeStyle = spider_info[spider[key].spidertype].line_color;
	
			if(spider[key].status == "DROP")
			{
				for(i = 1; i <= 6; i++)
				{
					if(info["line_" + i + "_x"] != 0)
					{
						context.beginPath();
						context.moveTo(spider_x + info["line_" + i + "_x"], spider_y + info["line_" + i + "_y"]);
						context.lineTo(spider[key].x + wobble_plate + info["line_" + i + "_x_end"], spider[key].y + info["line_" + i + "_y_end"]);
						context.stroke();	
					}
				}
			}
			
					
			if(spider[key].blink > 0) spider[key].blink++;
			if(spider[key].blink > 3) spider[key].blink = 0;
			
			if(Math.random() < 0.02) spider[key].blink = 1;
			
			spiderImg = "spider_" + spider[key].spidertype;
			
			if(spider[key].blink == 1) spiderImg = "spider_" + spider[key].spidertype + "_blink_1";
			if(spider[key].blink == 2) spiderImg = "spider_" + spider[key].spidertype + "_blink_2";
			if(spider[key].blink == 3) spiderImg = "spider_" + spider[key].spidertype + "_blink_1";
			
			drawImage(manifest[spiderImg], spider_x, spider_y);
	
			if(spider[key].status == "DROP")
			{		
				drawImage(manifest["spider_" + spider[key].spidertype + "_plate"], spider[key].x + wobble_plate + info.plate_x, spider_y + info.plate_y);
			
				context.fillStyle = info.text_color;
				context.font = css["font_spider"];
				context.textAlign = "center";
				
				context.fillText(spider[key].word.toUpperCase(), spider[key].x + wobble_plate + info.text_x, spider_y + info.text_y);
			}
					
	
			if(spider[key].status == "RETREAT")
			{
				drawImage(manifest["spider_" + spider[key].spidertype + "_plate"], spider[key].plate_x, spider[key].plate_y);
			}
				
		}
		
		// *** Float words
		for(key in floatWord)
		{
			context.globalAlpha = floatWord[key].alpha;
	
			context.fillStyle = "#FFFFFF";
			context.font = floatWord[key].wordSize + "px 'Roboto Condensed', sans-serif";
			context.textAlign = "center";
			
			context.fillText(floatWord[key].word, floatWord[key].x, floatWord[key].y);
	
		}
	
		context.globalAlpha = 1;
	
		// *** Stars
		for(key in star)
		{
			if(star[key].show)
			{
				drawImage(manifest["star"], star[key].x - (star[key].size / 2), star[key].y - (star[key].size / 2), star[key].size, star[key].size);
			}
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
		//context.fillText(spelWord, spot["SPELWORD"].x, spot["SPELWORD"].y + spelWordY);	
		
		spelledWordTemp = spelledWord;
		
		//underscores = spelWord.length - spelledWord.length;
		
		spelledWordTemp += "_";
		
		context.fillStyle = css["font_spelledword_color"];
		context.font = css["font_spelword"];
		//if(spelError > 0 && Math.random() > 0.5) context.fillStyle = css["font_spelledword_error_color"];
		context.textAlign = "center";
		
		
		if(showKeyboard)
		{
			context.fillText(spelledWordTemp, spot["SPELLEDWORD_KEYBOARD"].x, spot["SPELLEDWORD_KEYBOARD"].y);	
		}
		else
		{
			context.fillText(spelledWordTemp, spot["SPELLEDWORD"].x, spot["SPELLEDWORD"].y);	
		}
	
		
		context.fillStyle = css["font_spelword_color"];
		context.font = css["font_player_info"];
		context.textAlign = "left";
		
		
		context.fillText("LEVEL: " + level, spot["PLAYER_INFO"].x, spot["PLAYER_INFO"].y - 36); // "LEVEL: " + level + "    " + 
		context.fillText("WOORDEN GOED: " + spelledWordsCorrect + "", spot["PLAYER_INFO"].x, spot["PLAYER_INFO"].y); // "LEVEL: " + level + "    " + 
	
		
		if(spelledWordsCorrect == 0)
		{
			context.fillStyle = "#FFFF00";
			context.font = css["font_spider"];
			context.textAlign = "center";
	
		}
		
		
		
		
		
		// **** level text
		if(showLevelText > 0)
		{		
			if(showLevelText > 80)
			{
				tempAlpha = (20 - (showLevelText - 80)) / 20;
				tempX = -((showLevelText - 80) * (showLevelText - 80));
				
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
	
			context.globalAlpha = tempAlpha;
			
			drawImage(manifest["bg_dark"], 0, 0, 1400, 700);
				
			context.globalAlpha = tempAlpha;
			
			context.font = css["font_leveltext"];
			context.textAlign = "center";	
			context.fillStyle = css["font_spelword_color"];
			
			tempText = "";
			tempTextExtra = "Je hebt " + spelledWordsCorrect + " woorden goed gespeld!!!";
			tempTextBommen = "Kijk uit voor vallende bommen!!!"
			
			if(showLevelTextType == "LEVEL") tempText = "LEVEL " + level;
			if(showLevelTextType == "GAME_OVER") tempText = "GAME OVER!";
			
			context.fillText(tempText, spot["LEVEL_TEXT"].x + tempX, spot["LEVEL_TEXT"].y);	
			
			context.font = css["font_leveltext_extra"];
			context.textAlign = "center";	
			context.fillStyle = css["font_spelword_color"];
			
			if(showLevelTextType == "GAME_OVER") context.fillText(tempTextExtra, spot["LEVEL_TEXT"].x + tempX, spot["LEVEL_TEXT"].y + 100);	
			//if(level==5 && showLevelTextType == "LEVEL") context.fillText(tempTextBommen, spot["LEVEL_TEXT"].x + tempX, spot["LEVEL_TEXT"].y + 100);
			
		}
		
		// *** Hearts
		context.restore();	
		for(i = 1; i <= 5; i++)
		{
			if(lives >= i) thisHeart = "heart"; else thisHeart = "heart_empty";
			
			drawImage(manifest[thisHeart], spot["LIVES"].x + (i * 55), spot["LIVES"].y, 50, 50);
		}	
		
	}	
	

	// *** Icons
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
	
	if(showKeyboard) keyboardIcon = "button_keyboard_2"; else keyboardIcon = "button_keyboard";
	drawImage(manifest[keyboardIcon], spot["KEYBOARD_ICON"].x, spot["KEYBOARD_ICON"].y);
	
	
	// *** Keyboard
	if(showKeyboard)
	{
		drawImage(manifest["a"], spot["A"].x, spot["A"].y);
		drawImage(manifest["b"], spot["B"].x, spot["B"].y);
		drawImage(manifest["c"], spot["C"].x, spot["C"].y);
		drawImage(manifest["d"], spot["D"].x, spot["D"].y);
		drawImage(manifest["e"], spot["E"].x, spot["E"].y);
		drawImage(manifest["f"], spot["F"].x, spot["F"].y);
		drawImage(manifest["g"], spot["G"].x, spot["G"].y);
		drawImage(manifest["h"], spot["H"].x, spot["H"].y);
		drawImage(manifest["i"], spot["I"].x, spot["I"].y);
		drawImage(manifest["j"], spot["J"].x, spot["J"].y);
		drawImage(manifest["k"], spot["K"].x, spot["K"].y);
		drawImage(manifest["l"], spot["L"].x, spot["L"].y);
		drawImage(manifest["m"], spot["M"].x, spot["M"].y);
		drawImage(manifest["n"], spot["N"].x, spot["N"].y);
		drawImage(manifest["o"], spot["O"].x, spot["O"].y);
		drawImage(manifest["p"], spot["P"].x, spot["P"].y);
		drawImage(manifest["q"], spot["Q"].x, spot["Q"].y);
		drawImage(manifest["r"], spot["R"].x, spot["R"].y);
		drawImage(manifest["s"], spot["S"].x, spot["S"].y);
		drawImage(manifest["t"], spot["T"].x, spot["T"].y);
		drawImage(manifest["u"], spot["U"].x, spot["U"].y);
		drawImage(manifest["v"], spot["V"].x, spot["V"].y);
		drawImage(manifest["w"], spot["W"].x, spot["W"].y);
		drawImage(manifest["x"], spot["X"].x, spot["X"].y);
		drawImage(manifest["y"], spot["Y"].x, spot["Y"].y);
		drawImage(manifest["z"], spot["Z"].x, spot["Z"].y);
		drawImage(manifest["delete"], spot["Delete"].x, spot["Delete"].y);
		drawImage(manifest["special"], spot["Special"].x, spot["Special"].y);
		//drawImage(manifest["ok"], spot["ok"].x, spot["ok"].y);
		//if (Shift == 1){drawImage(manifest["HoofdletterVol"], spot["HoofdletterVol"].x, spot["HoofdletterVol"].y);}
		//else {drawImage(manifest["HoofdletterLeeg"], spot["HoofdletterLeeg"].x, spot["HoofdletterLeeg"].y);}
		
		
		if (ExtraButtons==1){
			drawImage(manifest["atrema"], spot["atrema"].x, spot["atrema"].y);
			drawImage(manifest["etrema"], spot["etrema"].x, spot["etrema"].y);
			drawImage(manifest["buttonleeg"], spot["buttonleeg"].x, spot["buttonleeg"].y);
			drawImage(manifest["eeen"], spot["eeen"].x, spot["eeen"].y);
			drawImage(manifest["eelf"], spot["eelf"].x, spot["eelf"].y);
			drawImage(manifest["apostrof"], spot["apostrof"].x, spot["apostrof"].y);
			drawImage(manifest["itrema"], spot["itrema"].x, spot["itrema"].y);
			drawImage(manifest["specialselected"], spot["specialselected"].x, spot["specialselected"].y);
			drawImage(manifest["tussenstreepje"], spot["tussenstreepje"].x, spot["tussenstreepje"].y);
		}
	}		
			
	// *** Centered cross (for testing)
	// context.drawImage(manifest["cross"], 0, 0);
}


