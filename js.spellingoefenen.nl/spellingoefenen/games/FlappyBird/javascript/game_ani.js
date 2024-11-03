
// *** Animates (calculates) all
function animateAll()
{
	if(play)
	{
		stats.begin();
				
		for(iii = 1; iii <= framerate_recalculations; iii++)
		{
			
			if (FlappyPhase =="STUITER DOOR"){flappy = 8; FlappyPhase="FALL DOWN";}
			
			
			if (FlappyPhase=="FLY"||FlappyPhase=="FALL DOWN"){
			// *** Background
			backgroundX_1-=2;
			backgroundX_1r-=2;

			if(backgroundX_1 <= -1400) backgroundX_1 = backgroundX_1r + 1400;
			if(backgroundX_1r <= -1400) backgroundX_1r = backgroundX_1 + 1400;

			backgroundX_2-=4;
			backgroundX_2r-=4;

			if(backgroundX_2 <= -1400) backgroundX_2 = backgroundX_2r + 1400;			
			if(backgroundX_2r <= -1400) backgroundX_2r = backgroundX_2 + 1400;

			backgroundX_3-=6.4;
			backgroundX_3r-=6.4;

			if(backgroundX_3 <= -1400) backgroundX_3 = backgroundX_3r + 1400;			
			if(backgroundX_3r <= -1400) backgroundX_3r = backgroundX_3 + 1400;
			}
				
					
			
			
			// Flappy
			
			
			if (FlappyPhase=="STUITER TERUG"){
			
				
				flappy += 3;
				flappyAni = "die"
				TerugStuiterTeller += 1;
				flappy_y += (0+(flappy-15)) ;flappy_r += (0+(flappy/5));
				
				
				if (TerugStuiterTeller <= 5){
				backgroundX_1+=2;
				backgroundX_1r+=2;


				backgroundX_2+=4;
				backgroundX_2r+=4;


				backgroundX_3+=6;
				backgroundX_3r+=6;
				
				
				for(key in obstacle){obstacle[key].x += 8}
				for(key in bubble){bubble[key].x += 8}
				
				
				
				
				}
				
				if (flappy_y > 525){FlappyPhase="DIEBACK"; TerugStuiterTeller=0;}
			}
			
			
			
			
			if (FlappyPhase=="START"){
				flappy_y = 300; 
				flappy_r = 30;
				flappyAni = 1;
				obstacleTimer = 60
				FlappyRestart();
			
			
			}
			
			if (FlappyPhase=="FLY"){
			
				if (flappy<9){
			
				flappyAni++;
				if(flappyAni > 3) {flappyAni = 1;}
				}
				else{flappyAni = 1;}
				// Flappy y
			
				if (flappy < 15){flappy_y -= (15-flappy) ;flappy_r -= (2-(flappy/15));}
				if (flappy > 15){flappy_y += (0+(flappy-15)) ;flappy_r -= (0+(flappy/15));}
				flappy++;
				
				if (flappy_y > 525){ playSound("error"); looseLive();FlappyPhase="DIE";}	
				if (flappy_y < -50){playSound("error"); looseLive();FlappyPhase="FALL DOWN"}
				
				
			
			}
			
			
			if (FlappyPhase=="FALL DOWN"){
			
				flappyAni = "die"
			
				if (flappy < 15){flappy_y -= (15-flappy) ;flappy_r -= (2-(flappy/15));}
				if (flappy > 15){flappy_y += (0+(flappy-15)) ;flappy_r -= (0+(flappy/15));}
				flappy++;
				
				if (flappy_y > 525){FlappyPhase="DIE";}	
			
			}
			
			
			
			if (FlappyPhase=="DIE")
			{
			DieLength += 1;
			flappy_y = 540;
			flappyAni = "die"
				if(flappy_r>-180){
			
					flappy_r -=45; 
					if(flappy_r<-180){flappy_r = -180;}
				 
					backgroundX_1-=1;
					backgroundX_1r-=1;

					backgroundX_2-=2;
					backgroundX_2r-=2;

					backgroundX_3-=4;
					backgroundX_3r-=4; };	
				
			
			if (DieLength == 60){DieLength = 0;FlappyRestart();}
						 	
				
			}
		
			
			
			if (FlappyPhase=="DIEBACK")
			{
			DieLength += 1;
			flappy_y = 540;
			flappyAni = "die";
				if(flappy_r<180){
			
					flappy_r +=45; 
					
				}
			
			if(flappy_r>180){flappy_r = 180;}
				
			
			if (DieLength == 60){DieLength = 0;FlappyRestart();}
						 	
				
			}
			
			
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

					
					
				if(bubble[key].phase == "FLY" && FlappyPhase=="FLY"||FlappyPhase=="FALL DOWN" && bubble[key].phase == "FLY")
				{
					bubble[key].x -= bubble[key].x_speed;
					bubble[key].y += bubble[key].y_speed;

					if(bubble[key].y > 300) bubble[key].y_speed -= bubbleWobbleSpeed; else bubble[key].y_speed += bubbleWobbleSpeed;
					
					
					
					if(bubble[key].x < (100 + 100) && bubble[key].x > 165 && (flappy_y - 25) < bubble[key].y && (flappy_y + 50) > bubble[key].y)
					{
						bubble[key].phase = "EXPLODES";
						playSound("bubbledrop");
						
						
						if (bubble[key].letter == spelWord.substr(spelledWord.length, 1)){spelledWord += spelWord.substr(spelledWord.length, 1)}
						else if(FlappyPhase == "FLY" && level > 1){playSound("error"); looseLive();}
						else if(FlappyPhase == "FLY" && level == 1){playSound("error");}
				
					
						
						
						
						if(spelledWord == spelWord){
							// *** Word complete
							spelWordPhase = "HIDE";
							
							levelCorrectSpelwords++;
							spelledWordsCorrect++;
							if (lives < 8){lives += 1}
							
							if(levelCorrectSpelwords >= levelCorrectSpelwordsRequired)
							{
								levelCorrectSpelwords = 0;
								setLevel(level + 1);
							}
						
					
							
					}	
					}
					
					
			
					
					if(bubble[key].x < -20)
					{
						
						delete bubble[key];
						
						addBubble();		
					}
					
					
					
					
					
				}
				
				else if(bubble[key].phase == "EXPLODES")
				{
				bubble[key].Ani++
				if (bubble[key].Ani>6){delete bubble[key]; addBubble();}
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
			
			// *** Obstacles
			if(level > 3 && FlappyPhase=="FLY"){ obstacleTimer += (0.06*(level*3))}
			
			
			if(obstacleTimer > 350)
			{
				addObstacle();
				obstacleTimer = 0;
				
			}

			for(key in obstacle)
			{
				
				if(FlappyPhase=="FLY"||FlappyPhase=="FALL DOWN"){
						
						obstacle[key].x -= obstacle[key].x_speed;				
						obstacle[key].r -= obstacle[key].r_speed;					
				}
				
				if(obstacle[key].x < 170 && obstacle[key].x > 77 && FlappyPhase=="FLY"){ 
							if (flappy_y > (obstacle[key].y + 700 - ((170 - obstacle[key].x)/4))){playSound("error");looseLive();FlappyPhase="STUITER TERUG";} //links onderkant
							if (flappy_y < (obstacle[key].y + 495 + ((170 - obstacle[key].x)/2))){playSound("error");looseLive();FlappyPhase="STUITER TERUG";} //links bovenkant
							}
				
				if(obstacle[key].x < 77 && obstacle[key].x > -15 && FlappyPhase=="FLY"){ 
							if (flappy_y > (obstacle[key].y + 700 - ((0 + obstacle[key].x)/2))){playSound("error");looseLive();FlappyPhase="STUITER DOOR";} //rechts onderkant
							if (flappy_y < (obstacle[key].y + 495 + ((0 + obstacle[key].x)/2))){playSound("error");looseLive();FlappyPhase="FALL DOWN"; flappy = flappy + (15)} // rechts bovenkant
							}
				
				
				if(obstacle[key].x < -200)
				{
					delete obstacle[key];
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
		
		drawImage(manifest["flappy"+"_"+flappyAni], 100, flappy_y, 80, 80, flappy_r, false, false);
		//drawImage(manifest["flappy_pink"+flappyAni], 100, flappy_y, 80, 80, flappy_r, false, false);
		
		
		
		if(FlappyPhase=="START" && level==1){drawImage(manifest["aanwijzinggebruik"], 260, 230, 400, 200, 0, false, false);}
		
		
		
	
		// *** Bubbles
		for(key in bubble)
		{
			if(bubble[key].model == 1 && bubble[key].phase == "FLY") tempR = -bubble[key].y_speed * 2; else tempR = 0;
			
			drawImage(manifest["bubble" + bubble[key].model + "_" + bubble[key].Ani], bubble[key].x - (bubble[key].size / 2), bubble[key].y - (bubble[key].size / 6), bubble[key].size, bubble[key].size/1.3, bubble[key].r + tempR);
		
	
			if(bubble[key].phase == "FLY")
			{	
				context.save();		
				
				context.font = css["font_bubble"].split("~size~").join(Math.ceil(bubble[key].size / 4));
				context.textAlign = "center";
							
				context.shadowColor = css["shadow_color"];
				context.shadowOffsetX = 0; 
				context.shadowOffsetY = 0; 
				context.shadowBlur = 4;
				context.fillStyle = css["font_bubble_color"];
				context.fillText(bubble[key].letter, bubble[key].x + 2, bubble[key].y + 15 +  bubble[key].size / 6);	
				
						
				context.restore();	
			}
			
		
	
		}
		
		
		
		
		// *** Obstacles
		for(key in obstacle)
		{
			drawImage(manifest["obstacle"], obstacle[key].x, obstacle[key].y);
		}
		
		// *** Explosions
		for(key in explosion)
		{
			drawImage(manifest["explosion" + explosion[key].ani], explosion[key].x - (explosion[key].size / 2), explosion[key].y - (explosion[key].size / 2) - (180 * explosion[key].size / 300), explosion[key].size, explosion[key].size * 1.6);
		}
		
		
		
		drawImage(manifest["flappy"+"_"+flappyAni], 100, flappy_y, 80, 80, flappy_r, false, false);
		//drawImage(manifest["flappy_pink"+flappyAni], 100, flappy_y, 80, 80, flappy_r, false, false);	
		
	
		
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
			
			context.font = css["font_leveltext"];
			context.textAlign = "center";	
			context.fillStyle = css["font_spelword_color"];
			
			tempText = "";
			tempTextExtra = "Je hebt " + spelledWordsCorrect + " woorden goed gespeld!!!";
			tempTextlevel2 = "Pak geen verkeerde letters meer!!!"
			tempTextlevel3 = "Er komen meer bellen!!!"
			tempTextlevel4 = "Let op voor obstakels!"
			tempTextlevel5 = "Er komen meer obstakels!"
			
			
			
			if(showLevelTextType == "LEVEL") tempText = "LEVEL " + level;
			if(showLevelTextType == "GAME_OVER") tempText = "GAME OVER!";
			
			context.fillText(tempText, spot["LEVEL_TEXT"].x + tempX, spot["LEVEL_TEXT"].y);	
			
			context.font = css["font_leveltext_extra"];
			context.textAlign = "center";	
			context.fillStyle = css["font_spelword_color"];
			
			if(showLevelTextType == "GAME_OVER") context.fillText(tempTextExtra, spot["LEVEL_TEXT"].x + tempX, spot["LEVEL_TEXT"].y + 100);	
			if(level== 2 && showLevelTextType == "LEVEL") context.fillText(tempTextlevel2, spot["LEVEL_TEXT"].x + tempX, spot["LEVEL_TEXT"].y + 100);
			if(level== 3 && showLevelTextType == "LEVEL") context.fillText(tempTextlevel3, spot["LEVEL_TEXT"].x + tempX, spot["LEVEL_TEXT"].y + 100);
			if(level== 4 && showLevelTextType == "LEVEL") context.fillText(tempTextlevel4, spot["LEVEL_TEXT"].x + tempX, spot["LEVEL_TEXT"].y + 100);
			if(level > 4 && showLevelTextType == "LEVEL") context.fillText(tempTextlevel5, spot["LEVEL_TEXT"].x + tempX, spot["LEVEL_TEXT"].y + 100);
			
			
		}
		
		// *** Hearts
		context.restore();	
		for(i = 1; i <= 8; i++)
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


