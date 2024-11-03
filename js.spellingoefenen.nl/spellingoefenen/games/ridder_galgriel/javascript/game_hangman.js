
function hangmanInit()
{
	
}

function hangmanAni()
{
	for(i = 1; i <= game["hangmanTreasure"]; i++)
	{
		if(game["hangmanTreasure" + i + "Y"] != 0)
		{
			game["hangmanTreasure" + i + "Yspeed"] += game["gravity"];
			
			game["hangmanTreasure" + i + "Y"] += game["hangmanTreasure" + i + "Yspeed"];
			
			if(game["hangmanTreasure" + i + "Y"] > 0)
			{
				game["hangmanTreasure" + i + "Y"] = -0.1;
				game["hangmanTreasure" + i + "Yspeed"] *= -0.25;
				
				if(Math.abs(game["hangmanTreasure" + i + "Yspeed"]) < 3)
				{
					game["hangmanTreasure" + i + "Y"] = 0;
					game["hangmanTreasure" + i + "Yspeed"] *= 0;
									
				}
			}
		}

	}
	
	if(game["hangmanEndedY"] < 1.1) game["hangmanEndedY"] = 1.1;

	if(game["hangmanEnded"]) game["hangmanEndedY"] *= 0.5; else game["hangmanEndedY"] *= 1.2;

	if(game["hangmanEndedY"] > 1000) game["hangmanEndedY"] = 1000;
	
	if(game["hangmanMinigame"])
	{
		game["hangmanMinigameCount"]++;
		
		if(game["hangmanMinigameCount"] > 200)
		{
			game["hangmanMinigame"]	= false;
			hangmanNewWord();
		}
		
		if(Math.random() > 0.94)
		{
			playSound("ping");
			addParticle(11, 700 + Math.random()*200-100, 650);
		}
	}
}

function hangmanDraw()
{
	for(i = 1; i <= game["hangmanTreasure"]; i++)
	{
		drawImage(manifest["treasure_" + i], spot["TREASURE_" + i].x, spot["TREASURE_" + i].y + game["hangmanTreasure" + i + "Y"], true);
	}
	
	game["hangmanAniCount"]++;
	
	if(game["hangmanAni"] == "")
	{
		drawImage(manifest["knight_static_" + Math.ceil(game["hangmanAniCount"]/2)], spot["KNIGHT"].x, spot["KNIGHT"].y);

		if(game["hangmanAniCount"] >= 12) game["hangmanAniCount"] = 0;
	}
	
	if(game["hangmanAni"] == "HIT")
	{
		drawImage(manifest["knight_hit_" + Math.ceil(game["hangmanAniCount"]/2)], spot["KNIGHT"].x, spot["KNIGHT"].y);
		
		if(game["hangmanAniCount"] >= 16) { game["hangmanAni"] = ""; game["hangmanAniCount"] = 0; }
	}
	
	drawImage(manifest["knight_chair_bottom"], 193, 523-60);
	
	
	drawText(game["score"], "SCORE_SHADOW");
	drawText(game["score"], "SCORE");
	
	drawText(game["hangmanAddedScore"], "SCORE_ADDED_SHADOW");
	drawText(game["hangmanAddedScore"], "SCORE_ADDED");
	
	if(game["hangmanScoreAddedDarken"] > 0)
	{
		game["hangmanScoreAddedDarken"]-=2;
		
		context.globalAlpha = game["hangmanScoreAddedDarken"]/100;
		
		drawImage(manifest["score_added"], spot["SCORE_ADDED_IMAGE"].x, spot["SCORE_ADDED_IMAGE"].y);
		
	}
	
	context.globalAlpha = 1;

	if(game["hangmanMinigame"])
	{
		context.globalAlpha = (1-game["hangmanMinigameCount"]/200)/1;
	}

	
	tempLetter = game["hangmanWordVisible"].split("");
	
	tempSpacing = 1000 / tempLetter.length;
	if(tempSpacing > 100) tempSpacing = 100;
	
	tempX = spot["WORD"].x - (tempLetter.length*tempSpacing)/2 + tempSpacing/2;
	
	for(i = 0; i < tempLetter.length; i++)
	{
		if(game["hangmanMinigame"]) spot["WORD_SHADOW"].color = "#AAA"; else spot["WORD_SHADOW"].color = "#000000";
		drawText(tempLetter[i], "WORD_SHADOW", tempX, spot["WORD_SHADOW"].y);

		if(game["hangmanMinigame"]) spot["WORD"].color = "#FFFFFF"; else spot["WORD"].color = "#f8de35";
		drawText(tempLetter[i], "WORD", tempX, spot["WORD"].y);

		tempX += tempSpacing;
	}

	
	context.globalAlpha = 1;
			
	if(game["hangmanLettersUnused"] != "")
	{
		drawText("Komt niet voor: " + game["hangmanLettersUnused"].split("").join(", "), "USED_LETTERS_SHADOW");
		drawText("Komt niet voor: " + game["hangmanLettersUnused"].split("").join(", "), "USED_LETTERS");
	}

	if(game["hangmanMinigame"])
	{
		drawText("Pak de muntjes!", "MINIGAME_INFO_SHADOW", spot["MINIGAME_INFO_SHADOW"].x, spot["MINIGAME_INFO_SHADOW"].y + Math.abs((game["pulsate"]-0.5)*60));
		drawText("Pak de muntjes!", "MINIGAME_INFO", spot["MINIGAME_INFO"].x, spot["MINIGAME_INFO"].y + Math.abs((game["pulsate"]-0.5)*60));
		
	}	
	
	drawImage(manifest["transition_top"], 0, -game["hangmanEndedY"]);
	drawImage(manifest["transition_bottom"], 0, 329 + game["hangmanEndedY"]);

}

function hangmanRemoveTreasure()
{
	if(game["hangmanTreasure"] > 0)
	{
		playSound("beam");
		
		addTreasureBeam(spot["TREASURE_" + game["hangmanTreasure"]].x, spot["TREASURE_" + game["hangmanTreasure"]].y, game["hangmanTreasure"]);

		game["hangmanTreasure"]--;
		
		setTimeout(function(){

			game["hangmanAni"] = "HIT";
			game["hangmanAniCount"] = 0;
		
		}, 500);
	}
}

function hangmanNewWord()
{	
	if(game["hangmanWordsDone"] >= game["hangmanWordsDoneMax"] || hangmanWL.length <= 0)
	{
		console.log("No more words or max words reached");
		
		playSound("next_word");
		playSound("door3");
		
		setTimeout(function(){ endGame();playSound("door"); }, 3000);
		game["hangmanEnded"] = true;
		game["hangmanEndedY"] = 420;
		
	}	
	else
	{
		playSound("next_word");
		
		
		
		for(i = game["hangmanTreasure"]+1; i <= 8; i++)
		{
			if(i <= 8) game["hangmanTreasure" + i + "Y"] = -500 - Math.random()*300;
		}
		
		game["hangmanTreasure"] += 4;
		if(game["hangmanTreasure"] > 8) game["hangmanTreasure"] = 8;
		
		showKeyboard();
		
		thisWord = Math.floor(Math.random() * hangmanWL.length);
		//console.log("thisWord: " + hangmanWL[thisWord]);
		
		game["hangmanWord"] = hangmanWL[thisWord];
		
		delete hangmanWL[thisWord];
	
		hangmanWL = hangmanWL.filter(function(el) { return el; });
					
		game["hangmanWordVisible"] = "";
		game["hangmanLettersUnused"] = "";
		game["hangmanLettersUsed"] = "AEIOU";
		game["hangmanAddedScore"] = 100 + game["hangmanTreasure"]*50;
		game["hangmanPreviousCorrect"] = false;
		
		tempLetter = game["hangmanWord"].split("");
		
		for(i = 0; i < tempLetter.length; i++)
		{
			//console.log(tempLetter[i]);
			
			thisLetter = tempLetter[i].toUpperCase();
			
			if(thisLetter == "A" || thisLetter == "E" || thisLetter == "I" || thisLetter == "O" || thisLetter == "U")
			{
				game["hangmanWordVisible"] += tempLetter[i];
			}
			else
			{
				game["hangmanWordVisible"] += "_";		
			}
		}
	}
}

function hangmanKeypress(thisKey)
{
	thisKey = thisKey.toUpperCase();
	
	if(!game["hangmanMinigame"])
	{
		if(thisKey == "<<")
		{
	
		}
		else if(thisKey == "OK")
		{
			
		}		
		else if(thisKey == "SHIFT")
		{
			if(keyboard.shift) keyboard.shift = false; else keyboard.shift = true;
		}		
		else
		{
			hangmanCheckLetter(thisKey);
		}
	}
}

function hangmanCheckLetter(thisKey)
{
	//console.log(game["hangmanLettersUsed"] + " > " + thisKey);
	
	if(game["hangmanLettersUsed"].indexOf(thisKey) < 0)
	{
		tempLetter = game["hangmanWord"].split("");
		
		hitFound = false;
		
		for(i = 0; i < tempLetter.length; i++)
		{
			//console.log(tempLetter[i]);
			
			thisLetter = tempLetter[i].toUpperCase();
			
			if(tempLetter[i].toUpperCase() == thisKey)
			{
				//console.log("Hit op pos " + i);
				
				game["hangmanWordVisible"] = game["hangmanWordVisible"].substr(0, i) + tempLetter[i] + game["hangmanWordVisible"].substr(i + 1);
				
				hitFound = true;
				
				tempSpacing = 1000 / tempLetter.length;
				if(tempSpacing > 100) tempSpacing = 100;

				tempX = spot["WORD"].x - (tempLetter.length*tempSpacing)/2 + tempSpacing/2 + i*tempSpacing;
				
				for(j = 0; j <= Math.ceil(game["hangmanAddedScore"]/20); j++)
				{
					addParticle(1, tempX, spot["WORD"].y - Math.random()*40);
					addParticle(5, tempX, spot["WORD"].y - Math.random()*40);
				}
					
			}
		}
		
		if(!hitFound)
		{
			hangmanRemoveTreasure();
			
			game["hangmanAddedScore"] -= 25;
			game["hangmanLettersUnused"] += thisKey;
			
			for(i = 1; i <= 10; i++) addParticle(5, spot["SCORE_ADDED"].x, spot["SCORE_ADDED"].y);
			
			game["hangmanScoreAddedDarken"] = 100;
			game["hangmanPreviousCorrect"] = false;
		}
		else
		{
			playSound("coin" + Math.ceil(Math.random()*3));
			
			if(game["hangmanPreviousCorrect"])
			{				
				if(game["hangmanTreasure"] < 8)
				{
					game["hangmanAddedScore"] += 25;
					game["hangmanTreasure"] += 1;
					game["hangmanTreasure" + game["hangmanTreasure"] + "Y"] = -500;
				}
			}
				
			game["hangmanPreviousCorrect"] = true;
		}
		
		if(game["hangmanAddedScore"] < 50) game["hangmanAddedScore"] = 50;
		
		game["hangmanLettersUsed"] += thisKey;
		
		if(game["hangmanWordVisible"] == game["hangmanWord"])
		{
			playSound("succes");

			game["hangmanWordsDone"]++;
			game["score"] += game["hangmanAddedScore"];

			game["hangmanMinigame"] = true;
			game["hangmanMinigameCount"] = 0;
			hideKeyboard();
		}
	}
	else
	{
		//console.log("Letter " + thisKey + " already used!");
	}
}