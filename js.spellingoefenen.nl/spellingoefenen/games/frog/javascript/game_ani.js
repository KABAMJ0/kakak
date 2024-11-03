
// *** Animates (calculates) all
function animateAll()
{
	if(play)
	{
		stats.begin();
				
		for(iii = 1; iii <= framerate_recalculations; iii++)
		{					
			// *** Background
			backgroundX_1--;
			backgroundX_1r--;

			if(backgroundX_1 <= -1400) backgroundX_1 = backgroundX_1r + 1400;
			if(backgroundX_1r <= -1400) backgroundX_1r = backgroundX_1 + 1400;

			backgroundX_2-=2;
			backgroundX_2r-=2;

			if(backgroundX_2 <= -1400) backgroundX_2 = backgroundX_2r + 1400;			
			if(backgroundX_2r <= -1400) backgroundX_2r = backgroundX_2 + 1400;

			backgroundX_3-=4;
			backgroundX_3r-=4;

			if(backgroundX_3 <= -1400) backgroundX_3 = backgroundX_3r + 1400;			
			if(backgroundX_3r <= -1400) backgroundX_3r = backgroundX_3 + 1400;

			
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
						
				
			
			// *** Dragging effect
			//if(dragging) shoot(mouse_x, mouse_y);
			
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
			
			// *** Flowers
			for(key in flower)
			{
				//flower[key].size += 1;
				//if(flower[key].size > 14) delete flower[key];
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
					
					//highscoreView();
					//showWL();
					play = false;
					//resetGame();
				}
			}

			// *** Splash in pool
			if(splash > 0)
			{
				splash++;
				if(splash > 12) splash = 0;
			}				

			
			// *** Frog in pool
			if(frog.status == "")
			{
				frog.frame = 1;
				
				if(Math.random() > 0.99)
				{
					frog.status = "BLINK";
					frog.status_frame = 0;
				}
			}

			// *** Knipperen met ogen (in pool)
			if(frog.status == "BLINK")
			{
				if(frog.status_frame == 0)
				{
					frog.frame = 1;
					frog.status_frame++;
				}
				else if(frog.status_frame == 1)
				{
					frog.frame = 2;
					frog.status_frame++;
				}
				else if(frog.status_frame == 2)
				{
					frog.frame = 3;
					if(Math.random() > 0.8) frog.status_frame++;
				}
				else if(frog.status_frame == 3)
				{
					frog.frame = 2;
					frog.status_frame++;
				}
				else if(frog.status_frame == 4)
				{
					frog.frame = 1;
					frog.status_frame = 0;
					frog.status = "";
				}				
			}

			// *** Frog in pool: what to do?			
			if(frog.status == "" || frog.status == "BLINK")
			{
				if(frog.jump_queue != "")
				{
					playSound("sploesj");
					console.log("sploesj bij BLINK");
					
					frog.jump_target = frog.jump_queue.substr(0, 1);
					frog.jump_queue = frog.jump_queue.substr(1);
					frog.status_frame = 0;
					
					console.log("Jumping to " + frog.jump_target + " (queue: " + frog.jump_queue + ")");
					frog.status = "JUMP";
					frog.y_extra = 0;
					
					splash = 1;
				}
			}
			

			// *** Jump to stone
			if(frog.status == "JUMP")
			{
				if(frog.status_frame == 5 && Math.random() > 0.8) playSound("frog");
				
				frog.x += spot["STONE_" + frog.jump_target].x_move;
				frog.y += spot["STONE_" + frog.jump_target].y_move;
				
				frog.status_frame++;

				frog.frame = 4;
				if(frog.status_frame >= 5) frog.frame = 5;
				if(frog.status_frame >= 10) frog.frame = 6;

				frog.y_extra = Math.abs(frog.status_frame - 8);
				frog.y_extra = (50 - frog.y_extra * frog.y_extra) * 2;
				
				if(frog.status_frame >= 15)
				{
					frog.status = "SIT";
					frog.status_frame = 0;
					frog.y_extra = 0;
					
					// *** Check letter
					neededLetter = spelWord.substr(spelledWord.length, 1);
					
					console.log("neededLetter:" + neededLetter + ". jumped letter: " + stone_letter[frog.jump_target]);
					
					if(neededLetter == stone_letter[frog.jump_target])
					{
						playSound("klak");
												
						stone_letter[frog.jump_target] = "";
						
						spelledWord += neededLetter;
						
						for(i = 1; i <= 20; i++) addStar(spot["STONE_" + frog.jump_target].x + spot["STONE_" + frog.jump_target].w/2, spot["STONE_" + frog.jump_target].y + spot["STONE_" + frog.jump_target].h/2 - 30);
						
						if(spelledWord == spelWord)
						{
							spelledWordCorrect();
						}
						
						// *** Add letter here if word was too long. 
						restWord = spelWord.substring(spelledWord.length);
						//console.log("restWord: " + restWord);
						
						temp = restWord.split("");
						
						neededLetter = "";
						
						for(j = 0; j <  temp.length; j++)
						{
							if(neededLetter == "")
							{
								foundLetter = 0;
								
								for(i = 1; i <= 8; i++)
								{
									//console.log("plek " + i + ": " + stone_letter[i]);
									if(stone_letter[i] == temp[j]) foundLetter = 1;
									
								}
								
								//console.log(temp[j] + ": " + foundLetter);
								
								if(foundLetter == 0)
								{
									neededLetter = temp[j];
								}
							}
						}
						
						if(neededLetter != "")
						{						
							stone_letter[frog.jump_target] = neededLetter;
							stone_letter_color[frog.jump_target] = 600;
							playSound("falling");
						}
					}
					else
					{
						looseLive();
					}
							
				}				
			}
			

			// *** Sit on stone
			if(frog.status == "SIT")
			{
				frog.frame = 7;
				frog.status_frame++;

				if(frog.status_frame >= 5)
				{
					frog.status = "JUMP_BACK";
					frog.status_frame = 0;
					frog.y_extra = 0;				
				}				
			}
			
			
			// *** Jump back into water
			if(frog.status == "JUMP_BACK")
			{
				if(frog.status_frame == 5 && Math.random() > 0.8) playSound("frog");
				
				frog.x -= spot["STONE_" + frog.jump_target].x_move;
				frog.y -= spot["STONE_" + frog.jump_target].y_move;
				
				frog.status_frame++;

				frog.frame = 4;
				if(frog.status_frame >= 5) frog.frame = 5;
				if(frog.status_frame >= 10) frog.frame = 6;

				frog.y_extra = Math.abs(frog.status_frame - 8);
				frog.y_extra = (50 - frog.y_extra * frog.y_extra) * 2;
				
				if(frog.status_frame >= 15)
				{
					if(frog.jump_queue == "")
					{
						playSound("sploesj");
						console.log("sploesj bij JUMP_BACK");
					}
									
					frog.status = "";
					frog.status_frame = 0;
					frog.y_extra = 0;

					frog.x = spot["FROG"].x;
					frog.y = spot["FROG"].y;					

					splash = 1;	
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
	
	//ge("mouse_textarea").innerHTML = parseInt(mouse_x) + "," + parseInt(mouse_y);
		
	
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
		// ** Letters on stones
		context.font = css["font_spelword"];
		context.textAlign = "center";	
		context.fillStyle = css["font_spelword_color"];
			
		context.save();	
		
		context.shadowColor = css["shadow_color"];
		context.shadowOffsetX = 1; 
		context.shadowOffsetY = -1; 
		context.shadowBlur = 1;
					
		for(i = 1; i <= 8; i++)
		{
			if(i == 1 || i == 2 || i == 3 || i == 4 || i == 5 || i == 8)
			{
				context.fillText(stone_letter[i], spot["LETTER_" + i].x, spot["LETTER_" + i].y - stone_letter_color[i]);	
			}
		}
		
		context.restore();	
		
		
		// *** Frog
		flipFrog = false;
		
		if((frog.status == "JUMP" || frog.status == "SIT") && spot["STONE_" + frog.jump_target].r == 1) flipFrog = true;
		if((frog.status == "JUMP_BACK") && spot["STONE_" + frog.jump_target].r == 0) flipFrog = true;
		
		drawImage(manifest["frog_" + frog.frame], frog.x - 150, frog.y - 150 - frog.y_extra, 300, 200, 0, flipFrog);
	
	
		// *** Splash
		if(splash > 0) drawImage(manifest["splash_" + splash], spot["SPLASH"].x - (257), spot["SPLASH"].y - 130, 257*2, 93*2);
	
	
		context.save();	
		
		context.shadowColor = css["shadow_color"];
		context.shadowOffsetX = 1; 
		context.shadowOffsetY = -1; 
		context.shadowBlur = 1;
					
		for(i = 1; i <= 8; i++)
		{
			if(i == 6 || i == 7)
			{
				context.fillText(stone_letter[i], spot["LETTER_" + i].x, spot["LETTER_" + i].y - stone_letter_color[i]);	
			}
		}
		
		context.restore();
		
		
		// *** Falling letters
		for(key in fallingLetter)
		{
			context.save();	
			
			context.font = css["font_heli"].split("~size~").join(Math.ceil(fallingLetter[key].size / 4));
			context.textAlign = "center";
					
			context.shadowColor = css["shadow_color"];
			context.shadowOffsetX = 0; 
			context.shadowOffsetY = 0; 
			context.shadowBlur = 4;
		
			context.fillStyle = css["font_heli_color"];
			context.fillText(fallingLetter[key].letter, fallingLetter[key].x, fallingLetter[key].y + fallingLetter[key].size / 6);	
					
			context.restore();	
		}
		
		// *** Bombs
		for(key in bomb)
		{
			drawImage(manifest["bomb"], bomb[key].x, bomb[key].y);
		}
		
		// *** Explosions
		for(key in explosion)
		{
			drawImage(manifest["explosion" + explosion[key].ani], explosion[key].x - (explosion[key].size / 2), explosion[key].y - (explosion[key].size / 2) - (180 * explosion[key].size / 300), explosion[key].size, explosion[key].size * 1.6);
		}
	
		// *** Coins
		for(key in coin)
		{
			if(coin[key].show)
			{
				context.globalAlpha = coin[key].opacity;
				drawImage(manifest["coin_" + coin[key].val], coin[key].x - 20 , coin[key].y - 15, 40, 30);
				context.globalAlpha = 1;
			}
		}
	
		// *** Flowers
		for(i = 1; i <= 10; i++)
		{
			context.globalAlpha = (i / 10) / 2 + 0.5;
			
			for(key in flower)
			{
				if(flower[key].distance == i)
				{
					thisSize = flower[key].size;
					//if(thisSize > 27) thisSize = 8 - (flower[key].size - 27);
					if(thisSize > 7) thisSize = 7;
					
					mp = flower[key].distance / 10;
					
					// 102 x 245
					
					drawImage(manifest["flower_" + thisSize], flower[key].x - (61 * mp), flower[key].y - (243 * mp), (102 * mp), (245 * mp));
				}
			}
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
		context.fillText(spelWord, spot["SPELWORD"].x, spot["SPELWORD"].y + spelWordY);	
		
		spelledWordTemp = spelledWord;
		
		underscores = spelWord.length - spelledWord.length;
		
		for(i = 0; i < underscores; i++) spelledWordTemp += "_";
		
		context.fillStyle = css["font_spelledword_color"];
		if(spelError > 0 && Math.random() > 0.5) context.fillStyle = css["font_spelledword_error_color"];
		context.textAlign = "right";
		context.fillText(spelledWordTemp, spot["SPELLEDWORD"].x, spot["SPELLEDWORD"].y + spelWordY);	
	
		
		context.fillStyle = css["font_spelword_color"];
		context.font = css["font_player_info"];
		context.textAlign = "center";
		context.fillText("WOORDEN GOED: " + spelledWordsCorrect + "", spot["PLAYER_INFO"].x, spot["PLAYER_INFO"].y); // "LEVEL: " + level + "    " + 
	
		/*
		context.fillStyle = css["font_spelword_color"];
		context.font = css["font_player_info"];
		context.textAlign = "center";
		context.fillText("Highscore opsturen", spot["HIGHSCORE"].x, spot["HIGHSCORE"].y); 
		*/
			
	
	
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
	
			context.globalAlpha = tempAlpha / 4;
			
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
			if(level==5 && showLevelTextType == "LEVEL") context.fillText(tempTextBommen, spot["LEVEL_TEXT"].x + tempX, spot["LEVEL_TEXT"].y + 100);
			
		}

		context.restore();	
		
		
		// *** Hearts
		for(i = 1; i <= 5; i++)
		{
			if(lives >= i) thisHeart = "heart"; else thisHeart = "heart_empty";
			
			drawImage(manifest[thisHeart], spot["LIVES"].x + (i * 55), spot["LIVES"].y, 50, 50);
		}	
		
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


