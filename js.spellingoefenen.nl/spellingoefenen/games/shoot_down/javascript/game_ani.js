
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
						
			// *** Heli
			heliAni++;
			if(heliAni > 3) heliAni = 1;

			for(key in heli)
			{

				if(heli[key].phase == "FLY")
				{
					heli[key].x += heli[key].x_speed;
					heli[key].y += heli[key].y_speed;

					if(heli[key].y > 300) heli[key].y_speed -= heliWobbleSpeed; else heli[key].y_speed += heliWobbleSpeed;
					
					if(heli[key].x > 1400 + heli[key].size)
					{
						delete heli[key];
						addHeli();		
					}
				}
				else if(heli[key].phase == "FALL")
				{
					heli[key].x_speed *= 0.98;
					heli[key].y_speed += gravity;
					
					heli[key].x += heli[key].x_speed;
					heli[key].y += heli[key].y_speed;					
					heli[key].r -= heli[key].r_speed;					
				
					if(heli[key].y > 700)
					{
						
						addExplosion(heli[key].x, heli[key].y - 50, heli[key].size + 50);	
						
						addHeli();
						//if(Math.random() < 0.2) addHeli(); // *** More and more heli's!
												
						delete heli[key];wl
						
					}				
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
			
			// *** Bombs
			if(level >= 5) bombTimer++
			
			if(bombTimer > 350)
			{
				addBomb();
				bombTimer = 0;
				
			}

			for(key in bomb)
			{
				//bomb[key].x_speed *= 0.98;
				bomb[key].y_speed += gravity/2;
				
				bomb[key].x += bomb[key].x_speed;
				bomb[key].y += bomb[key].y_speed;					
				bomb[key].r -= bomb[key].r_speed;					
			
				if(bomb[key].y > 700)
				{
					addExplosion(bomb[key].x, bomb[key].y, 600);
					looseLive();
					delete bomb[key];
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
			
				
				
							
			// *** Coins
			for(key in coin)
			{
				if(coin[key].show)
				{
					if(coin[key].coin_status == "BOUNCE")
					{
						coin[key].y_speed += gravity;
						coin[key].x_speed *= 0.96;
		
						coin[key].x += coin[key].x_speed;
						coin[key].y += coin[key].y_speed;
					
						if(coin[key].y > coin[key].floor)
						{
							coin[key].y = coin[key].floor;
							coin[key].y_speed *= -0.5;
							coin[key].x_speed *= 0.9;
							
							if(coin[key].x_speed > -0.5 && coin[key].x_speed < 0.5 && coin[key].y_speed > -0.5 && coin[key].y_speed < 0.5)
							{
								coin[key].coin_status = "MOVE";
							}
						}
						
					}
					else if(coin[key].coin_status == "MOVE")
					{
						coin[key].x += (coin[key].x_dest - coin[key].x) * 0.2;
						coin[key].y += (coin[key].y_dest - coin[key].y) * 0.2;
		
						if(coin[key].x > coin[key].x_dest - 4 && coin[key].x < coin[key].x_dest + 4 && coin[key].y > coin[key].y_dest - 4 && coin[key].y < coin[key].y_dest + 4)
						{
							coin[key].coin_status = "FADE";
							coin[key].opacity = 1;
							//coin[key].show = false;
						}			
					}
					else if(coin[key].coin_status == "FADE")
					{
						coin[key].opacity -= 0.1;
						coin[key].y++;
											
						if(coin[key].opacity <= 0)
						{
							coin[key].opacity = 0;
							
							//coin[key].show = false;
							
							if(coin[key].destination == "STAKE")
							{
								if(stake_show < stake)
								{
									stake_show += coin[key].val / 100;
									if(stake_show > stake) stake_show = stake;
									updateStake();
									
								}
							}
	
							if(coin[key].destination == "HOUSE_TEXT")
							{
								if(stake_house_show < stake_house)
								{
									stake_house_show += coin[key].val / 100;
									console.log("stake_house_show: " + stake_house_show + " / " + stake_house);
								
									if(stake_house_show >= stake_house)
									{
										console.log("HOUSE_TEXT: reached");
										stake_house_show = stake_house;
										hideDealer();	
									}
									
									
								}
							}
	
							delete coin[key];
							
						}
								
					}
					
				}
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
	
					star[key].size -= 2;

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
	drawImage(manifest["bg1_level"], backgroundX_1r, 0, 1400, 700, 0, true, false);

	drawImage(manifest["bg2_level"], backgroundX_2, 0, 1400, 700, 0, false, false);
	drawImage(manifest["bg2_level"], backgroundX_2r, 0, 1400, 700, 0, true, false);


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
		
		// *** Helis
		for(key in heli)
		{
			if(heli[key].model == 1 && heli[key].phase == "FLY") tempR = -heli[key].y_speed * 2; else tempR = 0;
			
			drawImage(manifest["heli" + heli[key].model + "_" + heliAni], heli[key].x - (heli[key].size / 2), heli[key].y - (heli[key].size / 6), heli[key].size, heli[key].size / 3, heli[key].r + tempR);
		
	
			if(heli[key].phase == "FLY")
			{	
				context.save();		
				
				context.font = css["font_heli"].split("~size~").join(Math.ceil(heli[key].size / 4));
				context.textAlign = "center";
							
				context.shadowColor = css["shadow_color"];
				context.shadowOffsetX = 0; 
				context.shadowOffsetY = 0; 
				context.shadowBlur = 4;
			
				context.fillStyle = css["font_heli_color"];
				context.fillText(heli[key].letter, heli[key].x, heli[key].y +  heli[key].size / 6);	
						
				context.restore();	
			}
	
		}
	
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
	
		// *** Stars
		for(key in star)
		{
			if(star[key].show)
			{
				drawImage(manifest["star"], star[key].x - (star[key].size / 2), star[key].y - (star[key].size / 2), star[key].size, star[key].size);
			}
		}
		
		// *** Foreground
		drawImage(manifest["bg3_level"], backgroundX_3, 0, 1400, 700, 0, false, false);
		drawImage(manifest["bg3_level"], backgroundX_3r, 0, 1400, 700, 0, true, false);
			
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
		context.fillText("LEVEL: " + level + "    " + " WOORDEN GOED: " + spelledWordsCorrect + "", spot["PLAYER_INFO"].x, spot["PLAYER_INFO"].y);	
	
		
	
	
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
		
		// *** Hearts
		context.restore();	
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


