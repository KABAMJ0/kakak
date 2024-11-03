// *** Animates (calculates) all
function animateAll()
{
	if(play)
	{
		stats.begin();
				
		for(iii = 1; iii <= framerate_recalculations; iii++)
		{	
			// *** Restarting
			if(gameStarted && countDownToRestart > 0)
			{
				countDownToRestart--;
				
				if(countDownToRestart <= 0)
				{
					gameStarted = false;
					for(key in letter) delete letter[key];
					for(key in snakeBodypart) delete snakeBodypart[key];										
					if(snake_speed==4){resetGame(1)} if(snake_speed==8){resetGame(2)} if(snake_speed==12){resetGame(3)};
				}
		
			}
			
			// *** Snake and movement
			if(snake_min_distance > 0) snake_min_distance -= snake_speed;
			
			if(snakePrevR[0] 	> 0 && snake_r != 0) snakePrevR[0] 	-= snake_speed; 
			if(snakePrevR[90] 	> 0 && snake_r != 90) snakePrevR[90] 	-= snake_speed;
			if(snakePrevR[180] 	> 0 && snake_r != 180) snakePrevR[180] 	-= snake_speed;
			if(snakePrevR[270] 	> 0 && snake_r != 270) snakePrevR[270] 	-= snake_speed;		
			
			if(snakePrevR[0] < 0) snakePrevR[0] = 0;
			if(snakePrevR[90] < 0) snakePrevR[90] = 0;
			if(snakePrevR[180] < 0) snakePrevR[180] = 0;
			if(snakePrevR[270] < 0) snakePrevR[270] = 0;
			
			//console.log(snakePrevR[0] + " | " + snakePrevR[90] + " | " + snakePrevR[180] + " | " + snakePrevR[270]);
			
			if(snake_try_u_turn != -1) snakeChangeDir(snake_try_u_turn);

			//snake_x_1 = snake_x + (snake_x_speed/4) * 1;
			//snake_y_1 = snake_y + (snake_y_speed/4) * 1;
			snake_x_2 = snake_x + (snake_x_speed/4) * 2;
			snake_y_2 = snake_y + (snake_y_speed/4) * 2;
			//snake_x_3 = snake_x + (snake_x_speed/4) * 3;
			//snake_y_3 = snake_y + (snake_y_speed/4) * 3;
			
			snake_x += snake_x_speed;
			snake_y += snake_y_speed;
				
			snake_body_density_count++;
			
			if(snake_body_density_count >= snake_body_density)
			{
				snake_body_density_count = 1;
				
				if(Collides==true)
				{
					addSnakeBodypart(snake_x, snake_y);
					//addSnakeBodypart(snake_x_1, snake_y_1);
					addSnakeBodypart(snake_x_2, snake_y_2);
					//addSnakeBodypart(snake_x_3, snake_y_3);
				}
			}
			
			// *** Collide with walls
			if(snake_x < 0 + 15 || snake_x > 995 - 15 || snake_y < 0 + 15 || snake_y > 700 - 15)
			{
				snakeCollides();
			}

			// *** Snake bodyparts
			for(key in snakeBodypart)
			{
				if(Collides==true)
				{
					snakeBodypart[key].age++;
					snakeBodypart[key].size -= snake_body_size_reduction;				
					
					//snakeBodypart[key].y_speed += gravity/ 10;					
					//snakeBodypart[key].y += snakeBodypart[key].y_speed;
					
									
					if(snakeBodypart[key].size > 0 && snakeBodypart[key].age > Math.ceil((30 + 26) / snake_speed) && snake_x > snakeBodypart[key].x - 10 - snakeBodypart[key].size/2 && snake_x < snakeBodypart[key].x + 10 + snakeBodypart[key].size/2 && snake_y > snakeBodypart[key].y - 10 - snakeBodypart[key].size/2 && snake_y < snakeBodypart[key].y + 10 + snakeBodypart[key].size/2)
					{
						//console.log("COLLIDE!");
						snakeCollides();
					}
					
					
					if(snakeBodypart[key].size <= 10) delete snakeBodypart[key];
				}				
				
			}
			
			
			// *** SpelWord
			if (spelWord.substr(spelledWord.length, 1)==" "){spelledWord+=" "};
			
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
					//if(showLevelText <= 0) 
					newSpelWord();
				}
			}
			
			if(spelError > 0) spelError--;
			
			// *** Letters			
			for(key in letter)
			{		
				letter[key].z--;
				if(letter[key].z < 0) letter[key].z = 0;

				if(letter[key].z <= 0 && letter[key].phase == "WAIT") 
				{
					playSound("falling");
					letter[key].z = 20;
					letter[key].phase = "FALL";
				}

				if(letter[key].z <= 0 && letter[key].phase == "FALL") 
				{
					playSound("ouk");
					addStar(letter[key].x, letter[key].y - 25, 0, 3);
					
					letter[key].z = 2;
					letter[key].phase = "PLAY";
				}

				if(letter[key].phase == "PLAY" && letter[key].z <= 0)
				{
					if(snake_x > letter[key].x - 10 - 20 && snake_x < letter[key].x + 10 + 20 && snake_y > letter[key].y - 10 - 40 && snake_y < letter[key].y + 10 + 0 && letter[key].letter != " ")
					{
						//console.log("Botsing met " + letter[key].letter);
						
						//getLetter(letter[key].letter);
						
	
						neededLetter = spelWord.substr(spelledWord.length, 1);
						//console.log("neededLetter: " + neededLetter);
						
						
						
						if(letter[key].letter == neededLetter)
						{
							// *** Right letter
							playSound("pop");
							
							spelError = 0;
							spelledWord += neededLetter;
							
							//snake_body_size_reduction -= 0.3;
							snake_body_size_reduction *= 0.85;
							
							//snake_body_size_reduction = Math.ceil(snake_body_size_reduction * 1000) / 1000;
							if(snake_body_size_reduction < 0.02) snake_body_size_reduction = 0.02;
							
							//console.log("snake_body_size_reduction:" + snake_body_size_reduction);
							
							
							//addFallingLetter(tempShotDown);
							
							if(spelledWord == spelWord)
							{
								// *** Word complete
								playSound("giggle");
																
								spelWordPhase = "HIDE";
								
								//levelCorrectSpelwords++;
								spelledWordsCorrect++;
								
								/*
								if(levelCorrectSpelwords >= levelCorrectSpelwordsRequired && level < 10)
								{
									levelCorrectSpelwords = 0;
									setLevel(level + 1);
								}
								*/
								
								//heliWobble++;
							}
						}
						else
						{
							playSound("error");
							
							spelError = 50;
							snakeCollides();
							//looseLive();
						}
												
						delete letter[key];
					}
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
			
			// *** Dragging coin effect for testing
			//if(dragging) addCoins(0.01, "MOUSE", "STAR_SOURCE", "BOUNCE LEFT EYES");
			
			// *** Stars
			for(key in star)
			{
				if(star[key].show)
				{
					star[key].x_speed *= 0.9;
					star[key].y_speed *= 0.9;
					//star[key].size_speed -= gravity;

					
					star[key].x += star[key].x_speed;
					star[key].y += star[key].y_speed;
					
					star[key].opacity *= 0.9;
					
					//star[key].y_speed += gravity;
	
					star[key].size_speed *= 0.9;
					
					star[key].size += star[key].size_speed;

					/*
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

					if(star[key].y > spot["STAR_SOURCE"].y)
					{
						star[key].y = spot["STAR_SOURCE"].y;
						star[key].y_speed *= -bouncyness;
						star[key].x_speed *= bouncyness;
					}
					*/
					
					if(star[key].y > 720 || star[key].size <= 0 || star[key].opacity <= 0.05) 
					{
						//console.log("Delete star");
						delete star[key];
					}
					
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
			
		}
		
		if(showLevelText > 0)
		{		
			showLevelText--;
			
			if(showLevelTextType == "GAME_OVER" && showLevelText == 20 || showLevelTextType == "END" && showLevelText == 20)
			{
				//showLevelTextType = "";
				//showLevelText = 0;
				lives = 3;
				score = spelledWordsCorrect;
				endGame();
								
				//showWL();
				play = false;				
				//resetGame();
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
	
	if(fps > 1)
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

			if(submitted==true){context.globalAlpha = 0.5;}
			
		
			drawButton(spot["HIGHSCORE_SUBMIT"], "score plaatsen");
			context.globalAlpha = 1; 	
			
			
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
		//console.log("drawing...");
		
		//drawImage(manifest["checkboard"], 0, 0);
	
		// *** Snake bodyparts
		for(key in snakeBodypart)
		{
			context.beginPath();
			context.arc(snakeBodypart[key].x, snakeBodypart[key].y, snakeBodypart[key].size/2, 0, mPI, false);
			context.fillStyle = snakeBodypart[key].fillColor;
			context.fill();
			
		}
		
		
		// *** Snake head
		if(Collides==false) thisHead = "snake_head_sad"; else thisHead = "snake_head";
		drawImage(manifest[thisHead], snake_x, snake_y, 30, 30, snake_r, false, false, true);
		
			
		// *** Coins
		for(key in coin)
		{
			if(coin[key].show)
			{
				context.globalAlpha = coin[key].opacity;
				drawImage(manifest["coin_" + coin[key].val], coin[key].x - 20 , coin[key].y - 15);
				context.globalAlpha = 1;
			}
		}
	
	
		// *** Stars (dust)
		for(key in star)
		{
			if(star[key].show)
			{
				context.globalAlpha = star[key].opacity;
				
				drawImage(manifest["star"], star[key].x - (star[key].size / 2), star[key].y - (star[key].size / 2), star[key].size, star[key].size);
				
				context.globalAlpha = 1;
			}
		}
		
		// *** Sidebar
		drawImage(manifest["fg"], 1400 - 471, 0);
	
		drawImage(manifest["button_left"], spot["BUTTON_LEFT"].x, spot["BUTTON_LEFT"].y);
		drawImage(manifest["button_down"], spot["BUTTON_DOWN"].x, spot["BUTTON_DOWN"].y);
		drawImage(manifest["button_right"], spot["BUTTON_RIGHT"].x, spot["BUTTON_RIGHT"].y);
		drawImage(manifest["button_up"], spot["BUTTON_UP"].x, spot["BUTTON_UP"].y);
	
	
	
		
		
		
		// *** Text	
		context.save();
		
		// *** Letters
		context.textAlign = "center"; 
			
		for(key in letter)
		{
		
			context.globalAlpha = 0.2;
			
			if(letter[key].phase == "FALL")
			{
				context.globalAlpha = 0.4 - letter[key].z * 0.02;
			}		
			
			if(letter[key].phase != "WAIT")
			{
				shadowSize = 50;
				
				if(letter[key].phase == "FALL") shadowSize += letter[key].z;
				 
				context.font = css["font_letter"].split("~size~").join(shadowSize);	
				context.fillStyle = css["shadow_color"];
				context.fillText(letter[key].letter, letter[key].x + 2, letter[key].y + 2);	
				context.fillText(letter[key].letter, letter[key].x - 2, letter[key].y + 2);	
				context.fillText(letter[key].letter, letter[key].x + 0, letter[key].y + 1);	
			
			}
			
	
			if(letter[key].phase == "FALL" || letter[key].phase == "PLAY")
			{
				if(letter[key].phase == "FALL") zTemp = letter[key].z; else zTemp = 0;
				
				context.globalAlpha = (20 - zTemp) / 20;
				context.font = css["font_letter"].split("~size~").join(50 + (zTemp * zTemp));
				context.fillStyle = css["font_letter_color"];
				context.fillText(letter[key].letter, letter[key].x, letter[key].y - zTemp * zTemp);
			}
	
		}
	
	
		context.shadowColor = css["shadow_color"];
		context.shadowOffsetX = 1; 
		context.shadowOffsetY = 1; 
		context.shadowBlur = 7;
		
		// *** Spel word & Spelled word
		context.globalAlpha = 1;
		
		if(spelWord.length > 7) context.font = css["font_spelword_small"]; else context.font = css["font_spelword"];
		
		context.fillStyle = css["font_spelword_color"];
		context.textAlign = "center"; 				
		context.fillText(spelWord, spot["SPELWORD"].x - spelWordY * 3, spot["SPELWORD"].y);	
		
		spelledWordTemp = spelledWord;
		
		underscores = spelWord.length - spelledWord.length;
		
		for(i = 0; i < underscores; i++) spelledWordTemp += "_";
		
		context.fillStyle = css["font_spelledword_color"];
		if(spelError > 0 && Math.random() > 0.5) context.fillStyle = css["font_spelledword_error_color"];
		context.textAlign = "center";
		context.fillText(spelledWordTemp, spot["SPELLEDWORD"].x - spelWordY * 3, spot["SPELLEDWORD"].y);	
	
		context.font = css["font_player_info"];
		context.textAlign = "center";
		context.fillText("WOORDEN GOED: " + spelledWordsCorrect + "", spot["PLAYER_INFO"].x, spot["PLAYER_INFO"].y);	
	
		context.restore();	
		
		
		
		
		
		for(i = 1; i <= 3; i++)
		{
			if(lives >= i) thisHeart = "heart"; else thisHeart = "heart_empty";
			
			drawImage(manifest[thisHeart], spot["LIVES"].x + (i * 55), spot["LIVES"].y, 50, 50);
		}	



		
		if(!gameStarted && showLevelText == 0)
		{
			drawImage(manifest["bg_dark"], 0, 0, 1400, 700);
	
			//drawImage(manifest["button_start"], spot["BUTTON_START"].x, spot["BUTTON_START"].y);
			drawImage(manifest["button_makkelijk"], spot["BUTTON_MAKKELIJK"].x, spot["BUTTON_MAKKELIJK"].y);
			drawImage(manifest["button_moeilijk"], spot["BUTTON_MOEILIJK"].x, spot["BUTTON_MOEILIJK"].y);
			drawImage(manifest["button_prof"], spot["BUTTON_PROF"].x, spot["BUTTON_MOEILIJK"].y);
	
			context.font = css["font_player_info"];
			context.fillStyle = css["font_spelword_color"];
			context.textAlign = "center"; 			
			context.fillText(c_z_uitleg, spot["BUTTON_START_UITLEG"].x, spot["BUTTON_START_UITLEG"].y);	
			
			
		}	
		
		if(showLevelText > 0)
		{		
			if(showLevelText > 80)
			{
				tempAlpha = (20 - (showLevelText - 80)) / 20;
				tempX = -((showLevelText - 80) * (showLevelText - 80));
				
			}
			else if(showLevelText < 20)
			{
			showWL()
			spelledWordsCorrect = 0;
			lives = 3;	
			}
			else
			{
				tempAlpha = 1;
				tempX = 0;
				
			}
	
			context.globalAlpha = tempAlpha/2;
			
			drawImage(manifest["bg_dark"], 0, 0, 1400, 700);
				
			context.globalAlpha = tempAlpha;
			
			context.font = css["font_leveltext"];
			context.textAlign = "center";	
			context.fillStyle = css["font_spelword_color"];
			
			tempText = "";
			tempTextExtra = "Je hebt " + spelledWordsCorrect + " woorden goed gespeld!!!!!";
			
			if(showLevelTextType == "LEVEL") tempText = "LEVEL " + level;
			if(showLevelTextType == "GAME_OVER") tempText = "GAME OVER!";
			
			context.fillText(tempText, spot["LEVEL_TEXT"].x + tempX, spot["LEVEL_TEXT"].y);	
			
			context.font = css["font_leveltext_extra"];
			context.textAlign = "center";	
			context.fillStyle = css["font_spelword_color"];
			
			context.fillText(tempTextExtra, spot["LEVEL_TEXT"].x + tempX, spot["LEVEL_TEXT"].y + 100);	
			
			
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
	

		
	
	
}

