function shoppinglistInit(thisShoppinglist)
{
	console.log("shoppinglistInit: " + thisShoppinglist);
	
	shoppinglist = thisShoppinglist.split(",");
		
	for(key in shoppinglist)
	{
		shoppinglist[key] = shoppinglist[key].split("*").join("");
		shoppinglist[key] = shoppinglist[key].split("'").join("`");
		shoppinglist[key] = shoppinglist[key].trim();
	
		if(shoppinglist[key] == "") delete shoppinglist[key];
	}
	
	console.log(shoppinglist);
	
	for(key in shoppinglist)
	{
		//console.log(key + ": " + shoppinglist[key]);
	}	
}

function shoppinglistGetWords()
{
	game["shoppinglistRound"]++;
	console.log("------------------\nshoppinglistGetWords round " + game["shoppinglistRound"]);
	
	if(game["shoppinglistRound"] >= game["shoppinglistRoundMax"])
	{
		//endGame();
		console.log("Max rounds reached!");
		
		game["shoppinglistComplete"] = true;
		game["shoppinglistDoorFirstTime"] = true;		
	}
	else
	{
		thisWordAmount = game["shoppinglistWords"];
		
		shoppinglistCurrent = new Array();
		shoppinglistDone = new Array();
			
		thisAmount = 0;
		thisTotalWords = 0;
		
		for(key in shoppinglist)
		{
			if(shoppinglist[key] != "-") thisAmount++;
			thisTotalWords++;
		}
	
		if(thisAmount < thisWordAmount) thisWordAmount = thisAmount;
		
		if(thisWordAmount == 0)
		{
			console.log("shoppinglistGetWords: This shoppinglist is finished!");
			
			game["shoppinglistComplete"] = true;
			game["shoppinglistDoorFirstTime"] = true;
			
		}
		else
		{
			thisCount = 0;
			tempCount = 0;
			
			while(thisCount < thisWordAmount || tempCount > 10000)
			{
				thisWord = Math.floor(Math.random()*thisTotalWords);
				
				if(shoppinglist[thisWord] != "-")
				{
					thisCount++;
					shoppinglistCurrent[thisCount] = shoppinglist[thisWord];
					shoppinglistDone[thisCount] = false;
					shoppinglist[thisWord] = "-";
				}
							
				tempCount++;
			}
			
			game["shoppinglistAmountWords"] = thisCount;
		}
	
		game["shoppinglistWordScore"] = game["shoppinglistWordScoreStart"];
		game["shoppinglistDoorFirstTime"] = true;
					
		console.log("shoppinglistCurrent (" + game["shoppinglistAmountWords"] + " words):");
		console.log(shoppinglistCurrent);
		
		if(game["shoppinglistAmountWords"] <= 0)
		{
			document.location = document.location;
		}
	}
}

function shoppinglistAni()
{
	if(game["shoppinglistProduct"] == 8 && game["pulsate"] > 0.75) addParticle(11, 1500, Math.random()*700);
	if(game["shoppinglistProduct"] == 9) addParticle(11, 1500, Math.random()*700);
	
	// *** Door: opening
	if(game["shoppinglistDoorStatus"] == 1)
	{
		game["shoppinglistDoorX"] -= 20 * game["shoppinglistSpeedUp"];
		game["shoppinglistDoorY"] += 2 * game["shoppinglistSpeedUp"];
		
		if(game["shoppinglistDoorX"] < -800)
		{
			console.log("shoppinglistDoorStatus 2");
			game["shoppinglistDoorStatus"] = 2;
			game["shoppinglistDoorCount"] = 0;
			
			if(game["shoppinglistComplete"]) game["shoppinglistDoorStatus"] = 4;
		}
	}

	// *** Door: open
	if(game["shoppinglistDoorStatus"] == 2)
	{
		game["shoppinglistDoorCount"]+=2 * game["shoppinglistSpeedUp"];
		
		addParticle(9, spot["SHOPPINGLIST_COUNTDOWN"].x + Math.sin(toRadians(game["shoppinglistDoorCount"]))*296, spot["SHOPPINGLIST_COUNTDOWN"].y - Math.cos(toRadians(game["shoppinglistDoorCount"]))*296, "DOOR2");
		
		if(game["shoppinglistDoorCount"] >= 360)
		{
			playSound("stone");
		
			game["shoppinglistDoorStatus"] = 3;
		}
	}

	// *** Door: closing
	if(game["shoppinglistDoorStatus"] == 3)
	{
		game["shoppinglistDoorX"] += 20 * game["shoppinglistSpeedUp"];
		game["shoppinglistDoorY"] -= 2 * game["shoppinglistSpeedUp"];
		
		if(game["shoppinglistDoorX"] >= 0)
		{
			console.log("shoppinglistDoorStatus 3");
			game["shoppinglistDoorStatus"] = 0;
			game["shoppinglistDoorX"] = 0;
			game["shoppinglistDoorY"] = 0;
			
			showKeyboard();
		}

	}
	
	if(game["shoppinglistDoorStatus"] == 4)
	{
		game["shoppinglistDoor2X"] -= 1;
		game["shoppinglistDoor2Y"] -= 10;
		game["score"]+=5;
		
		if(game["shoppinglistDoor2Y"] < -700)
		{
			shoppinglistStartEndgame();
		}
	}
	
	// *** Treasure glitter
	if(game["shoppinglistDoorStatus"] == 5 || (game["shoppinglistDoorStatus"] == 4 && game["shoppinglistDoor2Y"] < -150))
	{
		if(!game["shoppinglistEndgameChest"]) addParticle(9, spot["SHOPPINGLIST_TREASURE"].x + Math.random()*spot["SHOPPINGLIST_TREASURE"].width, spot["SHOPPINGLIST_TREASURE"].y + Math.random()*spot["SHOPPINGLIST_TREASURE"].height);
	}
	
	// *** Aladdin blinks eyes
	if(Math.random() > 0.99) game["shoppinglistBlink"] = 5;


	if(game["shoppinglistEndgame"])
	{
		if(!game["shoppinglistEndgameChest"])
		{
			// *** Bat end game
			game["shoppinglistEndgameBatCount"]++;
	
			tempBatCount = 0;				
			for(key in o) if(o[key].category == "bats") tempBatCount++;
			
			if(game["shoppinglistEndgameBatCount"] < game["shoppinglistEndgameBatDuration"])
			{
				if(Math.random()*10000 < game["shoppinglistEndgameBatCount"])
				{
					if(tempBatCount <= 20) addBat(310, 140 + Math.random()*420);
				}
			}
			else if(tempBatCount == 0)
			{
				shoppinglistStartEndgameChest();
			}		
		}
		else
		{
			// *** End game chest
			for(i = 1; i <= 3; i++)
			{
				tempX = spot["SHOPPINGLIST_ENDGAME_GLITTER"].x + Math.random()*spot["SHOPPINGLIST_ENDGAME_GLITTER"].width;
				tempY = spot["SHOPPINGLIST_ENDGAME_GLITTER"].y + Math.random()*spot["SHOPPINGLIST_ENDGAME_GLITTER"].height;
				tempY -= (tempX - spot["SHOPPINGLIST_ENDGAME_GLITTER"].x)/5;
				addParticle(3, tempX, tempY);				
			}
			
			game["shoppinglistProductXspeed"] *= 0.96;
			if(game["shoppinglistProductYspeed"] != -100) game["shoppinglistProductYspeed"] += game["gravity"];
			
			if(game["shoppinglistProductY"] > 330)
			{
				playSound("boing");
				
				game["shoppinglistProductY"] = 330;
				game["shoppinglistProductYspeed"] *= -0.5;
				
				if(game["shoppinglistProductYspeed"] > -3.5 && game["shoppinglistProductYspeed"] < 3.5)
				{
					game["shoppinglistProductYspeed"] = -100;
					game["shoppinglistProductY"] = 330;
				}
			}
			
			game["shoppinglistProductX"] += game["shoppinglistProductXspeed"];
			if(game["shoppinglistProductYspeed"] != -100) game["shoppinglistProductY"] += game["shoppinglistProductYspeed"];
		}
	}
		
}

function shoppinglistDraw()
{
	drawImage(manifest["bg"], spot["BG"].x, spot["BG"].y);
	drawImage(manifest["bg_door2"], game["shoppinglistDoor2X"], game["shoppinglistDoor2Y"]);
	
	if(!game["shoppinglistComplete"])
	{
		for(i = 1; i <= game["shoppinglistAmountWords"]; i++)
		{
			spot["SHOPPINGLIST_WORDS"].color = "#000000";
			context.globalAlpha = 0.5; drawText(shoppinglistCurrent[i], "SHOPPINGLIST_WORDS", spot["SHOPPINGLIST_WORDS"].x-1, spot["SHOPPINGLIST_WORDS"].y-1 + (i-1)*70);
			context.globalAlpha = 0.15; drawText(shoppinglistCurrent[i], "SHOPPINGLIST_WORDS", spot["SHOPPINGLIST_WORDS"].x-2, spot["SHOPPINGLIST_WORDS"].y-2 + (i-1)*70);
			
			spot["SHOPPINGLIST_WORDS"].color = "#FFFFFF";
			context.globalAlpha = 0.15; drawText(shoppinglistCurrent[i], "SHOPPINGLIST_WORDS", spot["SHOPPINGLIST_WORDS"].x+1, spot["SHOPPINGLIST_WORDS"].y+1 + (i-1)*70);
			context.globalAlpha = 0.05; drawText(shoppinglistCurrent[i], "SHOPPINGLIST_WORDS", spot["SHOPPINGLIST_WORDS"].x+2, spot["SHOPPINGLIST_WORDS"].y+2 + (i-1)*70);
	
			context.globalAlpha = 1;
					
			if(shoppinglistDone[i])	spot["SHOPPINGLIST_WORDS"].color = "#3f2f25"; else spot["SHOPPINGLIST_WORDS"].color = "#d58f2d";
			drawText(shoppinglistCurrent[i], "SHOPPINGLIST_WORDS", spot["SHOPPINGLIST_WORDS"].x, spot["SHOPPINGLIST_WORDS"].y + (i-1)*70);
		
		}
	
		if(game["shoppinglistDoorStatus"] < 4) drawImage(manifest["door2_pin"], spot["SHOPPINGLIST_COUNTDOWN"].x + Math.sin(toRadians(game["shoppinglistDoorCount"]))*296, spot["SHOPPINGLIST_COUNTDOWN"].y - Math.cos(toRadians(game["shoppinglistDoorCount"]))*296, true);
	}
	
	renderParticles("DOOR2");
	
	drawImage(manifest["bg_door1"], game["shoppinglistDoorX"] + Math.random()*game["shoppinglistDoorShake"]-game["shoppinglistDoorShake"]/2, game["shoppinglistDoorY"] + Math.random()*game["shoppinglistDoorShake"]-game["shoppinglistDoorShake"]/2);
	game["shoppinglistDoorShake"]*= 0.92;
	
	renderParticles("DOOR1");
	renderObjects("DOOR1");
	
	drawImage(manifest["bg_cave"], spot["BG"].x, spot["BG"].y);

	if(game["shoppinglistBlink"] > 0)
	{
		drawImage(manifest["aladdin_blink"], spot["SHOPPINGLIST_BLINK"].x, spot["SHOPPINGLIST_BLINK"].y);
		game["shoppinglistBlink"]--;
	}
	
	// *** Products
	for(i = 0; i <= game["shoppinglistProduct"]; i++)
	{
		if(i > 0 && i <= 10)
		{
			drawImage(manifest["product_" + i], spot["PRODUCT_" + i].x, spot["PRODUCT_" + i].y, spot["PRODUCT_" + i].width, spot["PRODUCT_" + i].height, false, false, false, false);
		}
	}
	
	if(game["shoppinglistDoorStatus"] == 0)
	{
		drawText(game["shoppinglistTypedWord"], "SHOPPINGLIST_TYPED_WORD");
	}
	
	// *** Score board
	tempScoreTotal = 0;
	tempScoreDone = 0;
	
	for(i = 1; i <= game["shoppinglistAmountWords"]; i++)
	{
		tempScoreTotal++;
		if(shoppinglistDone[i]) tempScoreDone++;
	}
	
	drawText(tempScoreDone + " van " + tempScoreTotal + " juist", "SHOPPINGLIST_SCORE_JUIST");
	drawText(game["score"], "SHOPPINGLIST_SCORE");
	drawText(game["shoppinglistWordScore"], "SHOPPINGLIST_SCORE_WORD");
	
	// *** End game chest
	if(game["shoppinglistEndgameChest"])
	{
		drawImage(manifest["bg_chest"], spot["BG"].x, spot["BG"].y);
		drawImage(manifest["product_" + game["shoppinglistProduct"]], game["shoppinglistProductX"], game["shoppinglistProductY"], true);
		
		drawButton("SHOPPINGLIST_ENDGAME_BUTTON", "doorgaan");

	}	
	
	
}

function shoppinglistOpenDoor()
{
	hideKeyboard();
			
	if(game["shoppinglistDoorStatus"] == 0)
	{
		playSound("stone");
		playSound("waiting");
		
		game["shoppinglistDoorStatus"] = 1;
		game["shoppinglistDoorX"] = 0;
		game["shoppinglistDoorY"] = 0;
		
		if(!game["shoppinglistDoorFirstTime"])
		{
			game["shoppinglistWordScore"] -= 20;
			
			for(i = 1; i <= 40; i++) addParticle(2, spot["SHOPPINGLIST_SCORE_WORD"].x + Math.random()*50-25, spot["SHOPPINGLIST_SCORE_WORD"].y + Math.random()*30-15);
			//for(i = 1; i <= 5; i++) addParticle(3, spot["SHOPPINGLIST_SCORE_WORD"].x + Math.random()*50-25, spot["SHOPPINGLIST_SCORE_WORD"].y + Math.random()*30-15);
		}
		
		if(game["shoppinglistWordScore"] < 40) game["shoppinglistWordScore"] = 40;
		game["shoppinglistDoorFirstTime"] = false;
	}

	if(game["shoppinglistDoorStatus"] == 2)
	{
		game["shoppinglistDoorCount"] = 360;
	}	
	
	if(game["shoppinglistDoorStatus"] == 5)
	{
		//endGame();
	}
	
}

function shoppinglistType(thisKey)
{
	console.log("shoppinglistType: \"" + thisKey + "\" (" + game["shoppinglistDoorStatus"] + ")");
	
	if (game["shoppinglistTypedWord"]=="geheimetest"){game["shoppinglistDoorStatus"] = 4;}
	
	if(game["shoppinglistDoorStatus"] == 0)
	{
		if(thisKey == "<<")
		{
			game["shoppinglistTypedWord"] = game["shoppinglistTypedWord"].substr(0, game["shoppinglistTypedWord"].length-1);
		}
		else if(thisKey == "OK")
		{
			game["shoppinglistTypedWord"] = "";
		}
		else if(thisKey == "SHIFT")
		{
			if(keyboard.shift) keyboard.shift = false; else keyboard.shift = true;
		}		
		else
		{
			game["shoppinglistTypedWord"] += "" + thisKey;
		}
		
		//console.log(game["shoppinglistTypedWord"]);
		
		for(i = 1; i <= game["shoppinglistAmountWords"]; i++)
		{
			if(!shoppinglistDone[i] && game["shoppinglistTypedWord"].indexOf(shoppinglistCurrent[i]) >= 0)
			{
				shoppinglistDone[i] = true;
				
				for(j = 1; j <= 40; j++) addParticle(3, spot["SHOPPINGLIST_SCORE_WORD"].x + Math.random()*40-20, spot["SHOPPINGLIST_SCORE_WORD"].y - Math.random()*120-10);
				
				console.log("Word correct!");
				
				addFlyText(shoppinglistCurrent[i], spot["SHOPPINGLIST_TYPED_WORD"].x, spot["SHOPPINGLIST_TYPED_WORD"].y, 100);

				game["shoppinglistTypedWord"] = "";
				
				game["score"] += game["shoppinglistWordScore"];


				tempComplete = true;
				
				for(i = 1; i <= game["shoppinglistAmountWords"]; i++)
				{					
					if(!shoppinglistDone[i]) tempComplete = false;					
				}
				
				if(tempComplete)
				{
					console.log("complete!");
					
					setTimeout(function(){

					shoppinglistGetWords();
					shoppinglistOpenDoor();
					
					}, 2500);
				}
				
			}		
		}
	}	
}


function shoppinglistStartEndgame()
{
	console.log("shoppinglistDoorStatus 5");
	game["shoppinglistDoorStatus"] = 5;

	game["shoppinglistDoorX"] = -800;
	game["shoppinglistDoor2Y"] = -700;

	game["shoppinglistEndgame"] = true;
	game["shoppinglistEndgameBatCount"] = 0;
		
	addFlyText("Vang de vleermuizen!", 700, 300, 100);

}

function shoppinglistStartEndgameChest()
{
	playSound("whoop");
	
	game["shoppinglistEndgame"] = true;
	game["shoppinglistEndgameChest"] = true;

	game["shoppinglistProduct"]++;
	if(game["shoppinglistProduct"] > 10) game["shoppinglistProduct"] = 10;
	
	setCookie("shoppinglistProduct", game["shoppinglistProduct"]);
	
	
	game["shoppinglistProductX"] = 557;
	game["shoppinglistProductY"] = 330;
	game["shoppinglistProductXspeed"] = 15;
	game["shoppinglistProductYspeed"] = -20;

	for(i = 1; i <= 10; i++)
	{
		addParticle(1, game["shoppinglistProductX"] + Math.random()*200-100, game["shoppinglistProductY"] + Math.random()*200-100);
	}			
}