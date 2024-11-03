
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

			
									
			if(showLevelText < 1){var CountFishes = 0;}
			
			for(key in fish)
			{
				
				
				CountFishes += 1;
				
				fish[key].ani += 1;
				if (fish[key].ani == fish[key].maxani){fish[key].ani=1}
				fish[key].x += fish[key].x_speed;
				fish[key].y += fish[key].y_speed;
				fish[key].r = 0 - fish[key].y_speed*5;
				
				fish[key].y_speed = fish[key].y_speed + (-0.3 + Math.random() * 0.6);
				if (fish[key].y > 400 && fish[key].y_speed > 0.01){fish[key].y_speed = fish[key].y_speed-0.3};
				if (fish[key].y < 100 && fish[key].y_speed < -0.01){fish[key].y_speed = fish[key].y_speed+0.3};
				
				if (fish[key].r > 0){fish[key].x_speed = 0.6 - (fish[key].r/10)}
				if (fish[key].r < 0){fish[key].x_speed = 0.6 + (fish[key].r/10)}
				
				if (fish[key].x > 1200 && fish[key].x_speed > 0.01){fish[key].x_speed = fish[key].x_speed - 0.5};
				if (fish[key].x < 950 && fish[key].x_speed < -0.01){fish[key].x_speed = fish[key].x_speed + 0.5};
				
				
				for(item in shark){
					
					if(fish[key].target == "true"){if(shark[item].victim == 999 && shark[item].x < 700 && shark[item].phase == "SWIM"){ addVictim(shark[item].name) } } 
					
					if (fish[key].name != "fish"+shark[item].victim &&  fish[key].x - shark[item].x < 100 && fish[key].x - shark[item].x > -100){
					
						
						
						if (fish[key].y < 500 && fish[key].y > 20 && fish[key].y - shark[item].y > -50 && fish[key].y - shark[item].y < 20){fish[key].y_speed = 4;}
						if (fish[key].y < 500 && fish[key].y > 20 && fish[key].y - shark[item].y > -120 && fish[key].y - shark[item].y < -50){fish[key].y_speed = -4;}
						
						
					}
					
					if (fish[key].name == "fish"+shark[item].victim && fish[key].x - shark[item].x < 70 && fish[key].x - shark[item].x > 60){
						
						
					
						if(shark[item].phase == "SWIM"){shark[item].ani = 1;}
						shark[item].phase = "ATTACK";
						playSound("danger");
						fish["fish"+shark[item].victim].y_speed = -1;
						
					}
					
					
					
					
				}
				
				
			}
			
			if (CountFishes == 0){gameOver()}
			
			
			sharkFound = 0;
			
			for(key in shark)
			{
				
			
				
				if(shark[key].phase == "SWIM")
				{
					
				sharkFound += 1;
					
				shark[key].ani+=1;	
				if(shark[key].ani==8){shark[key].ani=1;};	
					
				shark[key].x += shark[key].x_speed;
					
					
					if(shark[key].victim != 999){shark[key].y_speed = ((fish["fish"+shark[key].victim].y + 65)-(shark[key].y))/((fish["fish"+shark[key].victim].x - shark[key].x)/5)} else {shark[key].y_speed = 0} ;
					shark[key].y += shark[key].y_speed;
					
					shark[key].r = 0 - shark[key].y_speed*5;
					
				
					
					//if(shark[key].y > 300) shark[key].y_speed -= sharkWobbleSpeed; else shark[key].y_speed += sharkWobbleSpeed;
					
					if(shark[key].x > 1400 + shark[key].size)
					{
						
						delete shark[key];
					
						
					}
					
					
					
				}
				
				else if(shark[key].phase == "AWAY")
				{
					
				shark[key].ani += 1;
				if(shark[key].ani==16){shark[key].ani=9}	
				shark[key].size = shark[key].size - 2;
				shark[key].x -= 1;
				if(shark[key].r > 0){shark[key].r -= 5}
				if(shark[key].r < 0){shark[key].r += 5}
				
				if (shark[key].size<=1){delete shark[key];}
				
				
				
							
				}
				
				else if(shark[key].phase == "TURN")
				{
								
				shark[key].ani += 1;
				if(shark[key].ani==8){shark[key].phase = "SWIMBACK"; shark[key].ani=1;};	
							
				}
				
				
				else if(shark[key].phase == "ATTACK")
				{
					
				shark[key].ani+=1;	
					
				shark[key].x_speed = 9;
				shark[key].x += shark[key].x_speed;
					
					
				if(shark[key].victim != 999){shark[key].y_speed = ((fish["fish"+shark[key].victim].y + 65)-(shark[key].y)) /6; fish["fish"+shark[key].victim].y_speed = -1;} else {shark[key].y_speed = 0} ;
				shark[key].y += shark[key].y_speed;
					
				shark[key].r = 0 - shark[key].y_speed*5;
					
				//if(shark[key].ani==18){fish["fish"+shark[key].victim].x = 1700
			
			
				if(shark[key].ani==20){shark[key].ani=1;delete fish["fish"+shark[key].victim]; shark[key].victim = 999;shark[key].phase = "SWIM";};		
				
					
					
				}
				
				//else if(shark[key].phase == "SWIMBACK")
				//{
				
			
				//if(shark[key].ani==8){shark[key].ani=1;}	
					
				//shark[key].x -= shark[key].x_speed;
				//shark[key].y -= shark[key].y_speed;
				//shark[key].r = 0 - shark[key].y_speed*5;
				
					
				//if(shark[key].y > 300) shark[key].y_speed += sharkWobbleSpeed; else shark[key].y_speed -= sharkWobbleSpeed;
					
				//if(shark[key].x > 1400 + shark[key].size)
					//{
						//delete shark[key];
						//newSpelWord();	
					//}
				//}
				
				
				
			}
			
		
			
			
			
			
			
			if(showLevelText <= 0)
			{
				if(Math.random() > SharkChance && sharkFound < MaxSwimmingSharks|| sharkFound == 0)
				{
					// *** Nieuwe haai
					
					newSpelWord();
					
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

	drawImage(manifest["ocean1_layer_1"], backgroundX_1, 0, 1400, 700, 0, false, false);
	drawImage(manifest["ocean1_layer_1"], backgroundX_1r, 0, 1400, 700, 0, true, false);

	drawImage(manifest["ocean1_layer_2"], backgroundX_2, 0, 1400, 700, 0, false, false);
	drawImage(manifest["ocean1_layer_2"], backgroundX_2r, 0, 1400, 700, 0, true, false);




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
		
		//Fishes
		
		for(key in fish)
		{
			
			
			if (fish[key].kindfish == 1){
			drawImage(manifest["larry" + fish[key].ani], fish[key].x, fish[key].y, 120, 67,fish[key].r);}
				
			if (fish[key].kindfish == 2){
			drawImage(manifest["puffer" + fish[key].ani], fish[key].x, fish[key].y, 144, 81,fish[key].r);}
			
			if (fish[key].kindfish == 3){
			drawImage(manifest["toonblue" + fish[key].ani], fish[key].x, fish[key].y, 144, 81,fish[key].r);}
				
			if (fish[key].kindfish == 4){
			drawImage(manifest["toongreen" + fish[key].ani], fish[key].x, fish[key].y, 144, 81,fish[key].r);}
				
			}
		
		
		
	
		// *** Sharks
		for(key in shark)
		{
			if(shark[key].model == 1 && shark[key].phase == "SWIM") tempR = -shark[key].y_speed * 2; else tempR = 0;
			
			
			if(shark[key].phase == "SWIMBACK"){
				
			drawImage(manifest["SharkSwimBack" + "_" + shark[key].ani], shark[key].x - (shark[key].size / 2), shark[key].y - (shark[key].size / 3), shark[key].size, shark[key].size / 2, shark[key].r + tempR);	
				
			}
		
	
			if(shark[key].phase == "SWIM")
			{	
				
				if (shark[key].model == 1){
				drawImage(manifest["SharkSwim" + "_" + shark[key].ani], shark[key].x - (shark[key].size / 2), shark[key].y - (shark[key].size / 3), shark[key].size, shark[key].size / 2, shark[key].r + tempR);}
				
				if (shark[key].model == 2){
				drawImage(manifest["SharkSwim" + "_" + shark[key].ani + "light"], shark[key].x - (shark[key].size / 2), shark[key].y - (shark[key].size / 3), shark[key].size, shark[key].size / 2, shark[key].r + tempR);}
				
				
			
			}
			
			if(shark[key].phase == "TURN")
			{
				drawImage(manifest["SharkTurn" + "_" + shark[key].ani], shark[key].x - (shark[key].size / 2), shark[key].y - (shark[key].size / 3), shark[key].size, shark[key].size / 2, shark[key].r + tempR);
			
				
			}
			
			if(shark[key].phase == "AWAY")
			{
				context.globalAlpha = 1.1 - (1 - ((shark[key].size)/500))
				
				
				if (shark[key].model == 1){
				drawImage(manifest["sharkaway" + shark[key].ani], shark[key].x - (shark[key].size / 2), shark[key].y - (shark[key].size / 3), shark[key].size, shark[key].size / 2, shark[key].r + tempR);
				}
				if (shark[key].model == 2){
				drawImage(manifest["sharkawaylight" + shark[key].ani], shark[key].x - (shark[key].size / 2), shark[key].y - (shark[key].size / 3), shark[key].size, shark[key].size / 2, shark[key].r + tempR);
				}
					
					
				context.globalAlpha = 1;
				shark[key].y -= 0.5;
				
				
			}
			
			
			if(shark[key].phase == "ATTACK")
			{
				
				
				if (shark[key].model == 1){
				drawImage(manifest["sharkbite" + shark[key].ani], shark[key].x - (shark[key].size / 2), shark[key].y - (shark[key].size / 3), shark[key].size, shark[key].size / 2, shark[key].r + tempR);
				}
				
				if (shark[key].model == 2){
				drawImage(manifest["sharkbitelight" + shark[key].ani], shark[key].x - (shark[key].size / 2), shark[key].y - (shark[key].size / 3), shark[key].size, shark[key].size / 2, shark[key].r + tempR);
				}
				
				
				
			}
			
			
	
		}
	
		// *** Falling letters
		for(key in fallingLetter)
		{
			context.save();	
			
			context.font = css["font_shark"].split("~size~").join(Math.ceil(fallingLetter[key].size / 14));
			context.textAlign = "center";
					
			context.shadowColor = css["shadow_color"];
			context.shadowOffsetX = 0; 
			context.shadowOffsetY = 0; 
			context.shadowBlur = 4;
		
			context.fillStyle = css["font_shark_color"];
			context.fillText(fallingLetter[key].word, fallingLetter[key].x, fallingLetter[key].y + fallingLetter[key].size / 15);	
				
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
		drawImage(manifest["ocean1_layer_3"], backgroundX_3, 0, 1400, 700, 0, false, false);
		drawImage(manifest["ocean1_layer_3"], backgroundX_3r, 0, 1400, 700, 0, true, false);
		
		
		for (key in shark){
			
		if(shark[key].phase == "SWIM")
			{	
				
				context.save();		
				
				context.font = css["font_shark"].split("~size~").join(Math.ceil(shark[key].size / 14));
				context.textAlign = "center";
							
				context.shadowColor = css["shadow_color"];
				context.shadowOffsetX = 0; 
				context.shadowOffsetY = 0; 
				context.shadowBlur = 4;
			
				context.fillStyle = css["font_shark_color"];
				
				SecondWordPosition = 47
				
				if(shark[key].word != "undefined"){
				context.fillText(shark[key].word, shark[key].x, (shark[key].y + 16) +  shark[key].size / 15);	
				}
				else(SecondWordPosition = 16)	
				
				
				
				if(shark[key].extraword != "undefined"){
					context.fillText(shark[key].extraword, shark[key].x, (shark[key].y + SecondWordPosition) +  shark[key].size / 15);
				}
					
					
				context.restore();	
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
		
		
		
		context.fillText(spelledWordTemp, spot["SPELLEDWORD"].x, spot["SPELLEDWORD"].y);	
		
	
		
		context.fillStyle = css["font_spelword_color"];
		context.font = css["font_player_info"];
		context.textAlign = "left";
		
		
		context.fillText("LEVEL: " + level, spot["PLAYER_INFO"].x - 220, spot["PLAYER_INFO"].y); // "LEVEL: " + level + "    " + 
		context.fillText("WOORDEN GOED: " + spelledWordsCorrect + "", spot["PLAYER_INFO"].x, spot["PLAYER_INFO"].y); // "LEVEL: " + level + "    " + 
	
		
		if(spelledWordsCorrect == 0)
		{
			context.fillStyle = "#FFFF00";
			context.font = css["font_spider"];
			context.textAlign = "center";
	
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
	
			
			if(showLevelTextType == "LEVEL") tempText = "LEVEL " + level;
			if(showLevelTextType == "GAME_OVER") tempText = "GAME OVER!";
			
			context.fillText(tempText, spot["LEVEL_TEXT"].x + tempX, spot["LEVEL_TEXT"].y);	
			
			context.font = css["font_leveltext_extra"];
			context.textAlign = "center";	
			
			
			if(showLevelTextType == "GAME_OVER") context.fillText(tempTextExtra, spot["LEVEL_TEXT"].x + tempX, spot["LEVEL_TEXT"].y + 100);	
			
		}
		
		
		context.restore();	
		
		
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
		if (Shift == 1){drawImage(manifest["HoofdletterVol"], spot["HoofdletterVol"].x, spot["HoofdletterVol"].y);}
		else {drawImage(manifest["HoofdletterLeeg"], spot["HoofdletterLeeg"].x, spot["HoofdletterLeeg"].y);}
		
		
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




