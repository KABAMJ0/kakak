// *** Wordsearch
wordsearchLevel = new Array();
wordsearchWords = new Array(); // *** UPPERCASE
wordsearchWordsFound = new Array();
wordsearchBlock = new Array();


function wordsearchInitLevel()
{
	game["wordsearchStatus"] = "INIT";
	
	//context.globalAlpha = 0.75;
	//context.fillStyle="#000000";
	//context.fillRect(0, 0, 1050, 700);
	
	for(iii = 0; iii < wordsearchWords.length; iii++)	
	{
		//wordsearchWords[iii] = wordsearchWords[iii].toUpperCase();
		wordsearchWordsFound[iii] = false;
	}
	
	tempDebug = true; //false;
	
	game["wordsearchWidth"] = game["wordsearchWidthInit"];
	game["wordsearchHeight"] = game["wordsearchHeightInit"];

	tempLetterAmount = 0;

	if(tempDebug) console.log("---");	
	if(tempDebug || 1==1) console.log("Words to find:");	
	
	for(iii = 0; iii < wordsearchWords.length; iii++)	
	{
		if(tempDebug || 1==1) console.log("- " + wordsearchWords[iii]);
		tempLetterAmount += wordsearchWords[iii].length;
	}

	if(tempDebug) console.log("---");		
	if(tempDebug) console.log("wordsearchWords length: " + wordsearchWords.length + " with total of " + tempLetterAmount + " letters.");
	
	game["wordsearchTime"] = 0;
	game["wordsearchTimeTotal"] = Math.round(tempLetterAmount * game["wordsearchTimePerWord"] + game["wordsearchTimeExtra"]); // 300 ************
	console.log("wordsearchTimeTotal: " + game["wordsearchTimeTotal"]);
	
	if(tempLetterAmount > 20) game["wordsearchWidth"]++; // 5x3
	if(tempLetterAmount > 30) { game["wordsearchWidth"]++; game["wordsearchHeight"]++; } // 6x4
	if(tempLetterAmount > 40) { game["wordsearchWidth"]++; game["wordsearchHeight"]++; } // 7x5
	if(tempLetterAmount > 50) { game["wordsearchWidth"]+=2; game["wordsearchHeight"]++; } // 9x6
	if(tempLetterAmount > 60) { game["wordsearchWidth"]+=2; } // 11x6
	if(tempLetterAmount > 70) game["wordsearchHeight"]++; // 11x7
	if(tempLetterAmount > 80) game["wordsearchWidth"]++; // 12x7
	if(tempLetterAmount > 90) game["wordsearchWidth"]++; // 13x7
	
	//game["wordsearchWidth"] = 13;
	//game["wordsearchHeight"] = 7;
	
	// *** Read level into array
	if(tempDebug) console.log("---");	
	
	tempMatrixError = true;
	
	for(kk = 1; kk <= 20; kk++)
	{		
		if(tempMatrixError)
		{
			if(tempDebug) console.log("ATTEMPT " + kk + ":");
		
			tempMatrixError = false;
	
			if(tempDebug) console.log("Create matrix (" + game["wordsearchWidth"] + ", " + game["wordsearchHeight"] + ")");
			levelText = wordsearchCreateLevel(game["wordsearchWidth"], game["wordsearchHeight"]);
			wordsearchReadLevel(levelText);
		
			tempWordCount = 0;
			tempSnakeIns = 0;
			
			while(tempWordCount < wordsearchWords.length)
			{
				tempWordCount = 0;
					
				for(iii = 0; iii < wordsearchWords.length; iii++)	
				{		
					if(!wordsearchCheckForWord(wordsearchWords[iii]))
					{
						wordsearchSnakeInWord(wordsearchWords[iii]);
						tempSnakeIns++;
					}
					else
					{
						tempWordCount++;
					}
				}
				
				if(tempSnakeIns > 10000)
				{
					if(tempDebug) console.log("ERROR: Not all words could be snaked in! (tempSnakeIns: " + tempSnakeIns + ")");
					tempWordCount = wordsearchWords.length;
				}
			}
			
			console.log(wordsearchLevelArrayToString());
			console.log("Total snake ins (CPU weight): " + tempSnakeIns);
		
			for(iii = 0; iii < wordsearchWords.length; iii++)	
			{
				if(wordsearchCheckForWord(wordsearchWords[iii]))
				{
					console.log("- '" + wordsearchWords[iii] + "' present in matrix.");
				}
				else
				{
					if(tempDebug) console.log("- ERROR: " + wordsearchWords[iii] + " could not be found!");
					tempMatrixError = true;
				}
			}
			
			
			//console.log("tempMatrixError:" + tempMatrixError);
		
			if(tempMatrixError)
			{				
				if(game["wordsearchWidth"] > game["wordsearchHeight"]*2)
				{
					game["wordsearchHeight"]++;
				}
				else
				{
					game["wordsearchWidth"]++;
				}
				
				if(game["wordsearchWidth"] > 14) game["wordsearchWidth"] = 14;
				if(game["wordsearchHeight"] > 7) game["wordsearchHeight"] = 7;
				
				if(tempDebug) console.log("Enlarge matrix to (" + game["wordsearchWidth"] + ", " + game["wordsearchHeight"] + ")");
			}
			
			
			if(tempDebug) console.log("---");
		}
	}
	
	if(tempMatrixError) console.log("FINAL ERROR: Not all words fit!");
		
	for(ii = 0; ii < game["wordsearchHeight"]; ii++)
	{
		for(jj = 0; jj < game["wordsearchWidth"]; jj++)
		{
			wordsearchAddBlock(jj, ii);
		}
	}

	game["wordsearchStatus"] = "";

	playSound("tutot");
	playSound("glitter");
}

function wordsearchTickTime()
{

	if(game["wordsearchStatus"] == "")
	{
		
		
		game["wordsearchTime"]++;
		
		if(game["wordsearchTime"] > game["wordsearchTimeTotal"]) game["wordsearchTime"] = game["wordsearchTimeTotal"];
		
		if(game["wordsearchTime"] >= game["wordsearchTimeTotal"])
		{
			wordsearchGameOver();
		}
	
	}	
}

function wordsearchMX(thisMX)
{
	return(spot["WORDSEARCH_CENTER"].x - game["wordsearchWidth"]*game["wordsearchMatrixWidth"]/2 + game["wordsearchMatrixWidth"]*thisMX);
}

function wordsearchMY(thisMY)
{
	return(spot["WORDSEARCH_CENTER"].y - game["wordsearchHeight"]*game["wordsearchMatrixHeight"]/2 + game["wordsearchMatrixHeight"]*thisMY);
}

function wordsearchAddBlock(thisMX, thisMY)
{
	//console.log("wordsearchAddBlock (" + thisMX + ", " + thisMY + "): " + wordsearchLevel[thisMX][thisMY]);
	
	game["wordsearchKeyCount"]++;
	thisKey = game["wordsearchKeyCount"];

	thisX = wordsearchMX(thisMX);
	thisY = wordsearchMY(thisMY);
	
	//console.log("addO " + thisKey + ": prototype " + thisPrototype + " at (" + thisX + ", " + thisY + ")");
	
	wordsearchBlock[thisKey] = new Object;	

	wordsearchBlock[thisKey].letter = wordsearchLevel[thisMX][thisMY];
	wordsearchBlock[thisKey].mx = thisMX;
	wordsearchBlock[thisKey].my = thisMY;

	wordsearchBlock[thisKey].x = thisX + 1200 + thisMX*200 - (thisMY+1)*200;
	wordsearchBlock[thisKey].y = thisY + (thisMY+1)*250;

	wordsearchBlock[thisKey].xLeaveSpeed = -Math.random()*4-2;
	wordsearchBlock[thisKey].yLeaveSpeed = Math.random()*4-2;
	
	wordsearchBlock[thisKey].wobble = Math.random()*10;

	wordsearchBlock[thisKey].status = "WAIT";
	wordsearchBlock[thisKey].statusCount = 0;
	wordsearchBlock[thisKey].statusWaitCount = thisMY*(game["wordsearchWidth"]+0)*2 + thisMX*2;
	
	wordsearchBlock[thisKey].selected = false;
	
	//if(wordsearchBlock[thisKey].y < 100) wordsearchBlock[thisKey].y = 100;
	//if(wordsearchBlock[thisKey].y > 600) wordsearchBlock[thisKey].y = 600;
	
	
	wordsearchBlock[thisKey].xDest = thisX;
	wordsearchBlock[thisKey].yDest = thisY;
	
}

function wordsearchSelectCheck(thisX, thisY)
{
	if(game["wordsearchStatus"] == "")
	{
		tempBorder = 18;
		
		for(key in wordsearchBlock)
		{
			if(thisX > wordsearchBlock[key].x - manifest["wordsearch_tile"].width/2 + tempBorder && thisX <  wordsearchBlock[key].x + manifest["wordsearch_tile"].width/2 - tempBorder && thisY > wordsearchBlock[key].y - manifest["wordsearch_tile"].height/2 + tempBorder && thisY <  wordsearchBlock[key].y + manifest["wordsearch_tile"].height/2 - tempBorder+6)
			{
				//console.log("Click on block " + key + " (" + wordsearchBlock[key].letter + ")");
				wordsearchSelectBlock(key);
				
			}
		}
	}
}

function wordsearchCheckSelectedWord()
{
	if(game["wordsearchStatus"] == "")
	{
		console.log("wordsearchCheckSelectedWord: " + game["wordsearchWord"]);
		
		tempFound = false;
		
		for(iii = 0; iii < wordsearchWords.length; iii++)	
		{
			if(game["wordsearchWord"] == wordsearchWords[iii] && !wordsearchWordsFound[iii])
			{
				wordsearchWordsFound[iii] = true;
				tempFound = true;
				
				playSound("bloep");
	
				context.font = spot["WORDSEARCH_WORDBAR"].font;
										
				for(jjj = 0; jjj <= 100; jjj++) addStar(spot["WORDSEARCH_WORDBAR"].x + spot["WORDSEARCH_WORDBAR"].paddingLeft + context.measureText(wordsearchWords[iii]).width*Math.random(), spot["WORDSEARCH_WORDBAR"].y + iii*spot["WORDSEARCH_WORDBAR"].lineHeight + spot["WORDSEARCH_WORDBAR"].paddingTop);
				
				spelledWordsCorrect++;
				score = spelledWordsCorrect;
			}
		}
		
		if(!tempFound) playSound("klak");
		
		// *** Level completed?
		tempComplete = true;
		
		for(iii = 0; iii < wordsearchWords.length; iii++)	
		{
			if(!wordsearchWordsFound[iii]) tempComplete = false;	
		}
		
		if(tempComplete) wordsearchCompleted();
	}
}

function wordsearchCompleted()
{
	if(game["wordsearchStatus"] == "" && game["wordsearchTimeTotal"] > 0)
	{
		console.log("wordsearchCompleted! " + game["wordsearchTime"] + " / " + game["wordsearchTimeTotal"]);
		
		playSound("woosh");
		
		game["wordsearchStatus"] = "WON";
		game["wordsearchTime"] = 0;
		
		setTimeout(function(){ wordsearchNextLevel(); }, 3000);
	}
}

function wordsearchGameOver()
{
	if(game["wordsearchStatus"] == "" && game["wordsearchTimeTotal"] > 0)
	{
		console.log("wordsearchGameOver! " + game["wordsearchTime"] + " / " + game["wordsearchTimeTotal"]);
		
		playSound("woosh");
		playSound("error");
		
		game["wordsearchStatus"] = "GAMEOVER";
		game["wordsearchTime"] = 0;
		
		setTimeout(function(){ endGame(); }, 3000);
	}
}



function wordsearchNextLevel()
{
	//gameWoordenlijst = new Array();

	for(key in wordsearchBlock)
	{
		delete wordsearchBlock[key];
	}
	
	game["wordsearchStatus"] = "INIT";
	
	game["wordsearchTimePerWord"] = game["wordsearchTimePerWord"] * 0.8;
	game["wordsearchTimeExtra"] = game["wordsearchTimeExtra"] * 0.8;
	level++;
	console.log("level: " + level);
	
	amountOfWords = getNewWords();	
	
	if(amountOfWords > 0)
	{
		wordsearchInitLevel();
	}
	else
	{
		playSound("fanfare");
		game["wordsearchStatus"] = "ENDSCENE";
		showLevelText = 100;
		
		console.log("Woordenlijst compleet");
		console.log(completeWL);

		gameWoordenlijst = completeWL.split(",");
		getNewWords();
		
			
		//setTimeout(function(){ endGame(); /* showWL(); */ }, 5000);
		
		setTimeout(function(){ wordsearchInitLevel(); }, 5000);
	}
}

function wordsearchUnselectBlocks()
{
	for(key in wordsearchBlock)
	{
		wordsearchBlock[key].selected = false;
	}
	
	game["wordsearchWord"] = "";
	game["wordsearchPrevBlock"] = 0;
}

function wordsearchSelectBlock(thisKey)
{
	tempAdjacent = false;
	
	if(game["wordsearchPrevBlock"] == 0)
	{
		tempAdjacent = true;
	}
	else
	{
		if(Math.abs(wordsearchBlock[thisKey].mx - wordsearchBlock[game["wordsearchPrevBlock"]].mx) <= 1 && Math.abs(wordsearchBlock[thisKey].my - wordsearchBlock[game["wordsearchPrevBlock"]].my) <= 1) tempAdjacent = true;
	}
	
	if(tempAdjacent && !wordsearchBlock[thisKey].selected)
	{
		playSound("wood_tick");
		
		wordsearchBlock[thisKey].selected = true;
		
		game["wordsearchWord"] += wordsearchBlock[thisKey].letter;
		game["wordsearchPrevBlock"] = thisKey;
		
		console.log("wordsearchSelectBlock: " + game["wordsearchWord"]);
	}
}

function wordsearchRenderBlocks()
{
	for(key in wordsearchBlock)
	{
		if(wordsearchBlock[key].selected)
		{
			tempManifest = "wordsearch_tile_hover";
			tempExtraY = 18;
		}
		else
		{
			tempManifest = "wordsearch_tile";
			tempExtraY = 24;
		}
		
		drawImage(manifest[tempManifest], wordsearchBlock[key].x + Math.sin(wordsearchBlock[key].wobble)*1, wordsearchBlock[key].y, manifest["wordsearch_tile"].width -7, manifest["wordsearch_tile"].height-7, 0, false, false, true);
		
		drawText(wordsearchBlock[key].letter, "WORDSEARCH_LETTER", wordsearchBlock[key].x + Math.sin(wordsearchBlock[key].wobble)*1, wordsearchBlock[key].y + tempExtraY);
	}
}

function wordsearchRenderWordbar()
{
	drawImage(manifest["wordsearch_bg_wordbar"], spot["WORDSEARCH_WORDBAR"].x, spot["WORDSEARCH_WORDBAR"].y);

	for(iii = 0; iii < wordsearchWords.length; iii++)	
	{
		if(!wordsearchWordsFound[iii]) context.globalAlpha = 1; else context.globalAlpha = 0.3;
		
		tempX = spot["WORDSEARCH_WORDBAR"].x + spot["WORDSEARCH_WORDBAR"].paddingLeft;
		tempY = spot["WORDSEARCH_WORDBAR"].y + iii*spot["WORDSEARCH_WORDBAR"].lineHeight + spot["WORDSEARCH_WORDBAR"].paddingTop;
		
		tempL = drawText(wordsearchWords[iii], "WORDSEARCH_WORDBAR", tempX, tempY);
		
		if(wordsearchWordsFound[iii])
		{
			context.font = spot["WORDSEARCH_WORDBAR"].font;
			
			drawImage(manifest["wordsearch_stripe"], tempX, tempY - spot["WORDSEARCH_WORDBAR"].paddingBottomStripe, context.measureText(wordsearchWords[iii]).width, manifest["wordsearch_stripe"].height);
			
			
		}
		
	}
	
	context.globalAlpha = 1
	
}

function wordsearchMoveBlocks()
{
	for(key in wordsearchBlock)
	{
		wordsearchBlock[key].statusCount++;
		
		if(wordsearchBlock[key].status == "WAIT")
		{
			if(wordsearchBlock[key].statusCount >= wordsearchBlock[key].statusWaitCount) wordsearchBlock[key].status = "";
		}
		else
		{
			if(game["wordsearchStatus"] == "WON")
			{
				// *** Move away to make place for next batch
				wordsearchBlock[key].xLeaveSpeed *= 1.1;
				wordsearchBlock[key].yLeaveSpeed *= 1.1;
				
				wordsearchBlock[key].x += wordsearchBlock[key].xLeaveSpeed;
				wordsearchBlock[key].y += wordsearchBlock[key].yLeaveSpeed;
				
				addStar(wordsearchBlock[key].x, wordsearchBlock[key].y);
			}
			else if(game["wordsearchStatus"] == "GAMEOVER")
			{
				// *** Fall down
				wordsearchBlock[key].xLeaveSpeed *= 1;
				
				wordsearchBlock[key].yLeaveSpeed = Math.abs(wordsearchBlock[key].yLeaveSpeed);
				wordsearchBlock[key].yLeaveSpeed += game["gravity"];
				
				wordsearchBlock[key].x += wordsearchBlock[key].xLeaveSpeed;
				wordsearchBlock[key].y += wordsearchBlock[key].yLeaveSpeed;
				
				
				
				if(Math.random() > 0.95)
				{
					for(i=1;i<=100;i++) addStar(wordsearchBlock[key].x + Math.random()*game["wordsearchMatrixWidth"]-game["wordsearchMatrixWidth"]/2, wordsearchBlock[key].y + Math.random()*game["wordsearchMatrixHeight"]-game["wordsearchMatrixHeight"]/2);

					if(wordsearchBlock[key].y < 700) playSound("wood_crack");
					
					delete wordsearchBlock[key];
				}
			}			
			else
			{
				// *** Go to destination and wobble
				wordsearchBlock[key].wobble += 0.1;
					
				if(wordsearchBlock[key].x != wordsearchBlock[key].xDest || wordsearchBlock[key].y != wordsearchBlock[key].yDest)
				{
					//if(wordsearchBlock[key].x < 1000 && wordsearchBlock[key].y < 700) addStar(wordsearchBlock[key].x, wordsearchBlock[key].y);
					
					tempSpeedX = (wordsearchBlock[key].xDest - wordsearchBlock[key].x) * 0.2;
					tempSpeedY = (wordsearchBlock[key].yDest - wordsearchBlock[key].y) * 0.2;
					
					//if(tempSpeedX < -40) { tempSpeedX *= 0.5; tempSpeedY *= 0.5; }				
					//if(tempSpeedY < -40) { tempSpeedX *= 0.5; tempSpeedY *= 0.5; }
												
					wordsearchBlock[key].x += tempSpeedX;
					wordsearchBlock[key].y += tempSpeedY; 
					
					if(wordsearchBlock[key].x > wordsearchBlock[key].xDest-2 && wordsearchBlock[key].x < wordsearchBlock[key].xDest+2 && wordsearchBlock[key].y > wordsearchBlock[key].yDest-2 && wordsearchBlock[key].y < wordsearchBlock[key].yDest+2)
					{
						if(game["wordsearchTingSoundTime"] <= 0)
						{
							//playSound("ting");
							game["wordsearchTingSoundTime"] = 2;	
						}

						
						wordsearchBlock[key].x = wordsearchBlock[key].xDest;
						wordsearchBlock[key].y = wordsearchBlock[key].yDest;
					}
				}
			}
		}
	}

}

// *** Creates a matrix-string of letters
function wordsearchCreateLevel(thisWidth, thisHeight)
{
	/*
	levelText = "\
	HERB.....NE\n\
	.HEB......R\n\
	..REH......\n\
	H....H....H\n\
	".trim();
	*/

	levelText = "";
	letterList = "abcdefghijklmnopqrstuvwxyz";
	
	for(ii = 1; ii <= thisHeight; ii++)
	{
		for(jj = 1; jj <= thisWidth; jj++)
		{
			rnd = Math.floor(Math.random() * letterList.length);
			levelText += letterList.charAt(rnd);
			//levelText += ".";
		}
	
		levelText += "\n";
	
	}

	return(levelText);
}

// *** Randomly snake in a word into the letter-matrix
function wordsearchSnakeInWord(thisWord)
{
	tempLetter = thisWord.split("");
	
	tempX = Math.floor(Math.random() * game["wordsearchWidth"]);
	tempY = Math.floor(Math.random() * game["wordsearchHeight"]);

	aDone = "";

	for(ii = 0; ii < tempLetter.length; ii++)
	{
		//console.log(tempLetter[ii] + " on (" + tempX + ", " + tempY + ")");
		
		wordsearchLevel[tempX][tempY] = tempLetter[ii];
		aDone += "[" + tempX + "," + tempY + "]";	
			
		for(jj = 1; jj <= 100; jj++)
		{
			// 812
			// 703
			// 654
		
			tempDir = Math.ceil(Math.random()*8);
			
			/**/ if(tempDir == 1 && aDone.indexOf("[" + (tempX) + "," + (tempY-1) + "]") == -1 						&& tempY-1 >= 0) 			{ tempY--; break; }
			else if(tempDir == 2 && aDone.indexOf("[" + (tempX+1) + "," + (tempY-1) + "]") == -1 	&& tempX+1 < game["wordsearchWidth"] 	&& tempY-1 >= 0) 			{ tempX++; tempY--; break; }
			else if(tempDir == 3 && aDone.indexOf("[" + (tempX+1) + "," + (tempY) + "]") == -1 	&& tempX+1 < game["wordsearchWidth"]) 						{ tempX++; break; }
			else if(tempDir == 4 && aDone.indexOf("[" + (tempX+1) + "," + (tempY+1) + "]") == -1 	&& tempX+1 < game["wordsearchWidth"] 	&& tempY+1 < game["wordsearchHeight"]) 	{ tempX++; tempY++; break; }
			else if(tempDir == 5 && aDone.indexOf("[" + (tempX) + "," + (tempY+1) + "]") == -1 						&& tempY+1 < game["wordsearchHeight"]) 	{ tempY++; break; }
			else if(tempDir == 6 && aDone.indexOf("[" + (tempX-1) + "," + (tempY+1) + "]") == -1 	&& tempX-1 >= 0 			&& tempY+1 < game["wordsearchHeight"]) 	{ tempX--; tempY++; break; }
			else if(tempDir == 7 && aDone.indexOf("[" + (tempX-1) + "," + (tempY) + "]") == -1 	&& tempX-1 >= 0) 								{ tempX--; break; }
			else if(tempDir == 8 && aDone.indexOf("[" + (tempX-1) + "," + (tempY-1) + "]") == -1 	&& tempX-1 >= 0 			&& tempY-1 >= 0) 			{ tempX--; tempY--; break; }
		}			
	}
}


// *** Converts a matrix-string of letters into an array for use in game
function wordsearchReadLevel(levelText)
{
	wordsearchLevel = new Array();
		
	levelRow = levelText.split("\n");
	
	for(i = 0; i < levelRow[0].length; i++)
	{
		wordsearchLevel[i] = new Array();
	}
		
	for(i = 0; i < levelRow.length; i++)
	{
		levelCol = levelRow[i].split("");
		
		for(j = 0; j < levelCol.length; j++)
		{
			wordsearchLevel[j][i] = levelCol[j];
		}
		
		//console.log(levelTemp[i]);
	
	}
	
	//console.log(level);
	
}

// *** Checks all letters in word matrix for a specific word
function wordsearchCheckForWord(thisWord)
{
	tempFound = false;
	
	for(i = 0; i < wordsearchLevel.length; i++)
	{
		for(j = 0; j < wordsearchLevel[i].length; j++)
		{		
			if(!tempFound)
			{
				//console.log("Check (" + i + ", " + j + ")");
				
				tempFound = wordsearchCheckForWordOnSpot(thisWord, i, j);
				//if(tempFound) console.log("wordsearchCheckForWord: Found '" + thisWord + "' on (" + i + ", " + j + ")");			
			}

		}				
	}
	
	return(tempFound);
}


// *** Checks if a word can be formed on a coordinate in the word matrix
function wordsearchCheckForWordOnSpot(thisWord, thisX, thisY)
{
	thisDebug = false;

	letter = thisWord.split("");
			
	if(wordsearchLevel[thisX][thisY] == letter[0])
	{
		// *** Starting letter ok
		letterArray = new Array();
		
		wordFound = false;
		
		for(ii = 1; ii < letter.length; ii++)
		{
			letterArray[ii] = 0;
		}
		
		aCount = 0;
		
		while(aCount < 1000 && !wordFound && letterArray[1] <= 8)
		{
			if(!wordFound)
			{
				aCount++;
				
				if(thisDebug) console.log("----------------------------------\nATTEMPT " + aCount + " / letterArray[1]: " + letterArray[1]);
				
				aX = thisX;
				aY = thisY
				aDone = "";
				
				for(ii = 1; ii < letter.length; ii++)
				{
					// 812
					// 703
					// 654
		
					tempFound = false;

					for(jj = letterArray[ii]; jj <= 8; jj++)
					{				
						/**/ if(!tempFound && jj == 1 && aY-1 >= 0 && wordsearchLevel[aX][aY-1] == letter[ii] && aDone.indexOf("[" + (aX) + "," + (aY-1) + "]") == -1)
						{
							if(thisDebug) console.log("Up (1)");
							aDone += "[" + aX + "," + aY + "]";	
							tempFound = true;
							letterArray[ii] = jj;
							aX += 0; aY += -1;
						}
						else if(!tempFound && jj == 2 && aX+1 < wordsearchLevel.length && aY-1 >= 0 && wordsearchLevel[aX+1][aY-1] == letter[ii] && aDone.indexOf("[" + (aX+1) + "," + (aY-1) + "]") == -1)
						{
							if(thisDebug) console.log("Right/Up (2)");
							aDone += "[" + aX + "," + aY + "]";						
							tempFound = true;
							letterArray[ii] = jj;
							aX += 1; aY += -1;
						}
						else if(!tempFound && jj == 3 && aX+1 < wordsearchLevel.length && wordsearchLevel[aX+1][aY] == letter[ii] && aDone.indexOf("[" + (aX+1) + "," + (aY) + "]") == -1)
						{
							if(thisDebug) console.log("Right (3)");
							aDone += "[" + aX + "," + aY + "]";							
							tempFound = true;
							letterArray[ii] = jj;
							aX += 1; aY += 0;
						}					
						else if(!tempFound && jj == 4 && aX+1 < wordsearchLevel.length && wordsearchLevel[aX+1][aY+1] == letter[ii] && aDone.indexOf("[" + (aX+1) + "," + (aY+1) + "]") == -1)
						{
							if(thisDebug) console.log("Right/Down (4)");
							aDone += "[" + aX + "," + aY + "]";								
							tempFound = true;
							letterArray[ii] = jj;
							aX += 1; aY += 1;
						}					
						else if(!tempFound && jj == 5 && wordsearchLevel[aX][aY+1] == letter[ii] && aDone.indexOf("[" + (aX) + "," + (aY+1) + "]") == -1)
						{
							if(thisDebug) console.log("Down (5)");
							aDone += "[" + aX + "," + aY + "]";								
							tempFound = true;
							letterArray[ii] = jj;
							aX += 0; aY += 1;
						}					
						else if(!tempFound && jj == 6 && aX-1 >= 0 && wordsearchLevel[aX-1][aY+1] == letter[ii] && aDone.indexOf("[" + (aX-1) + "," + (aY+1) + "]") == -1)
						{
							if(thisDebug) console.log("Left/Down (6)");
							aDone += "[" + aX + "," + aY + "]";							
							tempFound = true;
							letterArray[ii] = jj;
							aX += -1; aY += 1;
						}					
						else if(!tempFound && jj == 7 && aX-1 >= 0 && wordsearchLevel[aX-1][aY] == letter[ii] && aDone.indexOf("[" + (aX-1) + "," + (aY) + "]") == -1)
						{
							if(thisDebug) console.log("Left (7)");
							aDone += "[" + aX + "," + aY + "]";							
							tempFound = true;
							letterArray[ii] = jj;
							aX += -1; aY += 0;
						}					
						else if(!tempFound && jj == 8 && aX-1 >= 0 && aY-1 >= 0  && wordsearchLevel[aX-1][aY-1] == letter[ii] && aDone.indexOf("[" + (aX-1) + "," + (aY-1) + "]") == -1)
						{
							if(thisDebug) console.log("Left/Up (8)");
							aDone += "[" + aX + "," + aY + "]";							
							tempFound = true;
							letterArray[ii] = jj;
							aX += -1; aY += -1;
						}					
					}
	
					if(!tempFound)
					{	
						letterArray[ii] = 9;
											
						for(jj = ii; jj <= 8; jj++)
						{
							if(jj > 1) letterArray[jj] = 0;
						}
	
						if(ii == 100000) letterArray[ii]++; else letterArray[ii-1]++;

						if(thisDebug) console.log("Dead end at " + ii + " (letterArray:" + letterArray[1] + "). Rest reset to 0");
						
						break;
						
					}
	
					if(thisDebug) console.log(letter[ii] + " -> " + letterArray[ii]);
				}
	
				if(thisDebug) console.log("Last letter direction: " + letterArray[letter.length-1] + " (0 or 9 means no direction i.o.w not found)");
	
				if(letterArray[letter.length-1] > 0 && letterArray[letter.length-1] <= 8) wordFound = true;
			}
		}		
		
		if(aCount > 950) console.error("aCount too high: " + aCount);
		
		return(wordFound);
	}
	else
	{
		// *** Starting letter is not correct letter
		return(false);
	}
}

// *** Debug help
function wordsearchLevelArrayToString()
{
	levelText = "  ";

	for(jj = 0; jj < game["wordsearchWidth"]; jj++)
	{
		levelText += jj;
		if(jj < 10) levelText += " ";
	}
	
	levelText += "\n";
			
	for(ii = 0; ii < game["wordsearchHeight"]; ii++)
	{
		levelText += ii + " ";
		
		for(jj = 0; jj < game["wordsearchWidth"]; jj++)
		{
			levelText += wordsearchLevel[jj][ii] + " ";
		}
	
		levelText += "\n";
	
	}

	return(levelText);
}

