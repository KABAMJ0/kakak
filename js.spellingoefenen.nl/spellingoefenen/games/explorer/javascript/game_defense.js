function tX(thisTX) 	{ return(700 + game["scrollX"] + thisTX); }
function tY(thisTY)	{ return(350 + game["scrollY"] + thisTY); }
function tileX(thisX)	{ return(Math.ceil((thisX+100) / 200 + 7)); }
function tileY(thisY)	{ return(Math.ceil((thisY+100) / 200 + 7)); }
function distance(x1, y1, x2, y2) { return(Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1))) }
function drawEllipseByCenter(cx, cy, w, h) { drawEllipse(cx - w/2.0, cy - h/2.0, w, h); }
function drawEllipse(x, y, w, h) { var kappa = .5522848, ox = (w / 2) * kappa, oy = (h / 2) * kappa, xe = x + w, ye = y + h, xm = x + w / 2, ym = y + h / 2; context.beginPath(); context.moveTo(x, ym); context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y); context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym); context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye); context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym); context.stroke(); }
function isEven(n) { return n % 2 == 0; }
function isOdd(n) { return Math.abs(n % 2) == 1; }

function defenseGenerateMap()
{
	ajaxUpdate("a=highscoreList");

	/*
	console.log("--- LOAD GAME ---");

	tempLoadGame_game = getCookie("explorerSaveGame_game");
	console.log(tempLoadGame_game);
	
	tempLoadGame_o = getCookie("explorerSaveGame_o");
	console.log(tempLoadGame_o);
	
	tempLoadGame_tile = getCookie("explorerSaveGame_tile");
	console.log(tempLoadGame_tile);
	*/
	
	tempCookie = getCookie("explorerSaveGame_heroes");
	console.log("explorerSaveGame_heroes: " + tempCookie);
	if(typeof tempCookie !== "undefined" && tempCookie != "") game["heroesUnlocked"] = tempCookie;
	
	// *** Reset tiles
	for(i = 1; i <= 15; i++)
	{
		for(j = 1; j <= 15; j++)
		{
			//tile[i][j] = new Array();
			tile[i][j].discovered = false;
			tile[i][j].word = Math.ceil(Math.random()*3);
		}
	}
	
	// *** Reveal starting tiles
	defenseRevealTile(7,7);		defenseRevealTile(8,7);		defenseRevealTile(9,7);
	defenseRevealTile(7,8);		defenseRevealTile(8,8);		defenseRevealTile(9,8);
	defenseRevealTile(7,9);		defenseRevealTile(8,9);		defenseRevealTile(9,9);

	// *** Remove objects too near to castle
	for(key in o)
	{
		if(o[key].map && o[key].x > -250 && o[key].x < 250 && o[key].y > -250 && o[key].y < 250) delete o[key];
	}

	// *** Castle
	defenseAddToMap("CASTLE", 0, 0);
	
	// *** Hero
	defenseAddToMap("HERO", 0, -10);
	// defenseAddToMap("HERO", 0, 150);
	
	// defenseAddToMap("RESOURCE_1", -100, -100);
	
	//defenseAddToMap("BLOB_1", 249, 60);
	
	//defenseAddToMap("TOWER_4", 100, 100);
	//defenseAddToMap("TOWER_2", -100, 100);
	//defenseAddToMap("TOWER_5", 100, 30);
	//defenseAddToMap("TOWER_4", -140, 0);
	
	game["score"] = 0;
	
	//game["score"] = Math.ceil(Math.random()*100);
	//endGame();
	
	// defenseShowSpellingWord();
}


function defenseChooseHero(thisHero)
{
	if(thisHero <= game["heroesUnlocked"])
	{

		stopSound(game["music"]);
		game["music"] = playSound("music", true);
	
		playSound("select4");
		
		for(key in o)
		{
			if(o[key].category == "heroes") game["playerSelected"] = key;
		}
		
		console.log("defenseChooseHero " + thisHero + ": " + game["playerSelected"]);
		
		// *** Strijder
		if(thisHero == 1)
		{	
			defenseUpgrade(1, true); // Health
			defenseUpgrade(2, true); // Dmg
		}
		
		// *** Verdediger
		if(thisHero == 2)
		{	
			defenseUpgrade(1, true);
			defenseUpgrade(1, true);
			defenseUpgrade(1, true);
		}
		
		// *** Vuurmeester
		if(thisHero == 3)
		{	
			defenseUpgrade(3, true); // Burn
		}
		
		// *** Bliksem magiër
		if(thisHero == 4)
		{	
			defenseUpgrade(4, true); // Flash
		}
		
		// *** Oppermeester
		if(thisHero == 5)
		{	
			defenseUpgrade(1, true);
			defenseUpgrade(3, true);
			defenseUpgrade(4, true);
		}
		
		console.log(o[game["playerSelected"]]);
		
	
		game["gamePaused"] = false;
		game["showHeroSelect"] = false;
		game["playerSelected"] = 0;
	}
	else playSound("wrong");
	
}

function defenseGameOver()
{
	setTimeout(function(){ stopSound(game["music"]); playSound("music5"); }, 2000);
	
	
	game["gameFinished"] = true;
	game["gameGameOverScreen"] = true;
	game["gameFinishedCount"] = 0;
}

function defenseTogglePause()
{
	if(!game["showHeroSelect"])
	{
		playSound("select3");
		
		if(!game["gamePaused"])
		{
			game["gamePaused"] = true;
		}
		else
		{	
			game["gamePaused"] = false;
		}
	}
}

function defenseAddToMap(thisManifest, thisX, thisY)
{
	
	// addO(thisPrototype, thisX, thisY, thisWidth, thisHeight, thisSpecial, thisZ)
	
	thisKey = addO(thisManifest, thisX, thisY);
	o[thisKey].z = "MAP";
	o[thisKey].map = true;

	if(thisManifest == "CASTLE")
	{
		thisOldKey = thisKey;
		thisRelatedKey = defenseAddToMap("ARCHER", thisX - 30, thisY + 11 + 10); o[thisRelatedKey].relatedTo = thisOldKey;
		thisRelatedKey = defenseAddToMap("ARCHER", thisX + 30, thisY + 11 + 10); o[thisRelatedKey].relatedTo = thisOldKey;
	}	
	
	if(thisManifest == "HERO")
	{
		o[thisKey].status = "WALK_OUT";
		o[thisKey].aniFrameCount = 0;
		o[thisKey].aniFrame = 0;
		o[thisKey].xDest = 0;	
		o[thisKey].yDest = 50;
	}

	if(thisManifest == "ARCHER")
	{
		if(thisX < 0) o[thisKey].mirrored = true;
	}

	if(thisManifest == "TOWER_1")
	{
		//console.log("TOWER_1 " + thisKey);
		thisOldKey = thisKey;
		thisRelatedKey = defenseAddToMap("ARCHER_2", thisX, thisY); o[thisRelatedKey].relatedTo = thisOldKey;
		//console.log("TOWER_1 " + thisKey + " thisRelatedKey: " + thisRelatedKey);
				
	}	
	
	return(thisKey);
}

function defenseShowSpellingWord(thisAmount, thisType, thisVar)
{
	console.log("defenseShowSpellingWord " + thisAmount + ", " + thisType + ", " + thisVar + "");
	game["showSpellingWord"] = true;
	
	game["spellingAmount"] = thisAmount;
	game["spellingAmountCount"] = 0;
	game["spellingType"] = thisType;
	game["spellingVar"] = thisVar;
	
	game["gamePaused"] = true;
	game["showHeroSelect"] = false;

	nextWord(); 
	newSpelWord();
	//if(gameWordCurrent < 16) { newSpelWord(); }
	
	//wlNewWord();
	//checkvoice();	
	//setTimeout(function(){ voice(); }, 600);
	
}

function defenseRevealTile(thisTileX, thisTileY)
{
	console.log("defenseRevealTile");
	
	if(game["score"] != 0)
	{
		playSound("discover");
		game["score"] += 100;
	}
	
	tile[thisTileX][thisTileY].discovered = true;
	
	thisTileX = (thisTileX-8)*200-100;
	thisTileY = (thisTileY-8)*200-100;
	
	// *** Wood
	for(i = 1; i <= Math.random()*3; i++) defenseAddToMap("RESOURCE_1", thisTileX + Math.random()*200, thisTileY + Math.random()*200);
	for(i = 1; i <= Math.random()*1 + 0.05; i++) defenseAddToMap("RESOURCE_2", thisTileX + Math.random()*200, thisTileY + Math.random()*200);
	for(i = 1; i <= Math.random()*2 - 0.1; i++) defenseAddToMap("RESOURCE_3", thisTileX + Math.random()*200, thisTileY + Math.random()*200);
	
	// *** Stone
	for(i = 1; i <= Math.random()*3-0.5; i++) defenseAddToMap("RESOURCE_4", thisTileX + Math.random()*200, thisTileY + Math.random()*200);
	for(i = 1; i <= Math.random()*3-0.5; i++) defenseAddToMap("RESOURCE_5", thisTileX + Math.random()*200, thisTileY + Math.random()*200);
	for(i = 1; i <= Math.random()*1 + 0.23; i++) defenseAddToMap("RESOURCE_6", thisTileX + Math.random()*200, thisTileY + Math.random()*200);
	for(i = 1; i <= Math.random()*1 + 0.23; i++) defenseAddToMap("RESOURCE_7", thisTileX + Math.random()*200, thisTileY + Math.random()*200);

	// *** Crystal
	if(defenseCountDiscoveredTiles() > 12)
	{		
		for(i = 1; i <= Math.random()*1 + 0.25; i++) defenseAddToMap("RESOURCE_8", thisTileX + Math.random()*200, thisTileY + Math.random()*200);
	}
	
	// *** Swamp wood
	if(defenseCountDiscoveredTiles() > 26)
	{
		for(i = 1; i <= Math.random()*2; i++) defenseAddToMap("RESOURCE_9", thisTileX + Math.random()*200, thisTileY + Math.random()*200);
		for(i = 1; i <= Math.random()*2; i++) defenseAddToMap("RESOURCE_10", thisTileX + Math.random()*200, thisTileY + Math.random()*200);		
	}
	
}

function defenseUpgrade(thisUpgrade, thisNoCost)
{
	if(typeof thisNoCost === "undefined") thisNoCost = false;
	
	if(typeof o[game["playerSelected"]]["upgrade"][thisUpgrade][o[game["playerSelected"]]["upgrade" + thisUpgrade]] !== "undefined")
	{
		tempUpgrade = o[game["playerSelected"]]["upgrade"][thisUpgrade][o[game["playerSelected"]]["upgrade" + thisUpgrade]];

		console.log("defenseUpgrade (" + thisUpgrade + "): " + tempUpgrade.reward + " . " + game["resource" + tempUpgrade.resource] + " >= " + tempUpgrade.price);

		if(game["resource" + tempUpgrade.resource] >= tempUpgrade.price || thisNoCost)
		{
			console.log("defenseUpgrade: " + thisUpgrade);
			
			playSound("select3");
			
			game["upgradeFlash" + thisUpgrade] = 1;
						
			console.log(tempUpgrade);

			if(tempUpgrade.reward == "GAIN_DAMAGE") o[game["playerSelected"]].damage += tempUpgrade.rewardAmount;
			if(tempUpgrade.reward == "GAIN_FIRE_DAMAGE") o[game["playerSelected"]].damageBurn += tempUpgrade.rewardAmount;
			if(tempUpgrade.reward == "GAIN_LIGHTNING_CHANCE") o[game["playerSelected"]].lightningChance = tempUpgrade.rewardAmount;
			if(tempUpgrade.reward == "INCREASE_UPGRADE_LEVEL") game["playerUpgradeLevel"] += tempUpgrade.rewardAmount;
			if(tempUpgrade.reward == "INCREASE_RESEARCH_LEVEL") game["playerResearchLevel"] += tempUpgrade.rewardAmount;
			if(tempUpgrade.reward == "GAIN_SPLASH_RADIUS") { o[game["playerSelected"]].shotSplashRadius += tempUpgrade.rewardAmount; }
			if(tempUpgrade.reward == "GAIN_SHOOT_SPEED") { o[game["playerSelected"]].speed = tempUpgrade.rewardAmount; }
			if(tempUpgrade.reward == "GAIN_SHOOT_DISTANCE") { o[game["playerSelected"]].shootDistance += tempUpgrade.rewardAmount; }
			if(tempUpgrade.reward == "GAIN_CHANCE_SHOT_5") { o[game["playerSelected"]].chanceShot5 += tempUpgrade.rewardAmount; }
			if(tempUpgrade.reward == "GAIN_CHANCE_SHOT_6") { o[game["playerSelected"]].chanceShot6 += tempUpgrade.rewardAmount; }
			if(tempUpgrade.reward == "GAIN_CHANCE_SHOT_7") { o[game["playerSelected"]].chanceShot7 += tempUpgrade.rewardAmount; }
			if(tempUpgrade.reward == "ADD_HERO") defenseAddToMap("HERO", 0, -10);			
			if(tempUpgrade.reward == "GAIN_HEALTH") { o[game["playerSelected"]].hp += tempUpgrade.rewardAmount; o[game["playerSelected"]].hpMax += tempUpgrade.rewardAmount; }
			
			if(tempUpgrade.reward == "ADD_ARCHER_CASTLE") 
			{
				if(o[game["playerSelected"]]["upgrade" + thisUpgrade] == 1) defenseAddToMap("ARCHER", -60, 15+10);
				if(o[game["playerSelected"]]["upgrade" + thisUpgrade] == 2) defenseAddToMap("ARCHER", 60, 15+10);
				if(o[game["playerSelected"]]["upgrade" + thisUpgrade] == 3) defenseAddToMap("ARCHER", -40, 22+10);
				if(o[game["playerSelected"]]["upgrade" + thisUpgrade] == 4) defenseAddToMap("ARCHER", 40, 22+10);
			}

			if(tempUpgrade.reward == "GAIN_ARCHER_DAMAGE")
			{
				for(key2 in o)
				{
					if(o[key2].map && typeof o[key2].relatedTo !== "undefined" && o[key2].relatedTo == game["playerSelected"]) o[key2].damage = tempUpgrade.rewardAmount;
				}
			}

			if(tempUpgrade.reward == "ADD_ARCHER_TOWER")
			{
				for(key2 in o)
				{
					if(o[key2].map && typeof o[key2].relatedTo !== "undefined" && o[key2].relatedTo == game["playerSelected"])
					{
						tempDamage = o[key2].damage;
						tempSpeed = o[key2].speed;
					}
				}

				thisOldKey = game["playerSelected"];

				if(o[game["playerSelected"]]["upgrade" + thisUpgrade] == 1)
				{					
					thisRelatedKey = defenseAddToMap("ARCHER_2", o[game["playerSelected"]].x - 15, o[game["playerSelected"]].y + 5); 
					o[thisRelatedKey].relatedTo = thisOldKey;
					o[thisRelatedKey].damage = tempDamage;
					o[thisRelatedKey].speed = tempSpeed;
				}
				
				if(o[game["playerSelected"]]["upgrade" + thisUpgrade] == 2)
				{					
					thisRelatedKey = defenseAddToMap("ARCHER_2", o[game["playerSelected"]].x + 11, o[game["playerSelected"]].y + 7); 
					o[thisRelatedKey].relatedTo = thisOldKey;
					o[thisRelatedKey].damage = tempDamage;
					o[thisRelatedKey].speed = tempSpeed;
				}
			}
			
			if(tempUpgrade.reward == "GAIN_ARCHER_SHOOT_SPEED")
			{
				for(key2 in o)
				{
					if(o[key2].map && typeof o[key2].relatedTo !== "undefined" && o[key2].relatedTo == game["playerSelected"]) o[key2].speed = tempUpgrade.rewardAmount;
				}
			}
			
			
			
			if(!thisNoCost) game["resource" + tempUpgrade.resource] -= tempUpgrade.price;
			o[game["playerSelected"]]["upgrade" + thisUpgrade]++;			
		}		
	}
}

function defenseCountDiscoveredTiles()
{
	thisTiles = 0;
	
	for(i = 1; i <= 15; i++)
	{
		for(j = 1; j <= 15; j++)
		{
			if(tile[i][j].discovered) thisTiles++;
		}
	}	
	
	return(thisTiles);
}


function defenseVisible(thisKey)
{
	thisVisible = true;
	if(tX(o[thisKey].x) < 0-100 || tX(o[thisKey].x) > 1400+100 || tY(o[thisKey].y) < 0-100 || tY(o[thisKey].y) > 700+100) thisVisible = false;
	return(thisVisible);
}

function defenseToggleDiscover()
{
	if(game["showDiscover"])
	{
		playSound("select");
		game["showDiscover"] = false;
	}
	else
	{		
		tempCount = 0;
					
		for(key in o)
		{
			if(o[key].category == "resources") tempCount++;
		}
		
		if(tempCount > 3)
		{
			defenseMessage("Haal eerst de zichtbare grondstoffen op!");
		}
		else
		{	
			playSound("select3");
		
			game["showDiscover"] = true;
			game["showBuilding"] = false;
		}
	}
}

function defenseToggleBuilding()
{
	if(game["showBuilding"])
	{
		playSound("select");
		game["showBuilding"] = false;
	}
	else
	{
		playSound("select3");
		game["showBuilding"] = true;
		game["showDiscover"] = false;
	}
}

function defenseAddShot(thisShotType, thisOrigin, thisShotX, thisShotY, thisShotXspeed, thisShotYspeed, thisDamage, thisDamageBurn, thisDamageLightning, thisTargetKey, thisDamageCold)
{
	if(typeof thisDamageBurn === "undefined") thisDamageBurn = 0;
	if(typeof thisDamageLightning === "undefined") thisDamageLightning = 0;
	if(typeof thisTargetKey === "undefined") thisTargetKey = 0;
	if(typeof thisDamageCold === "undefined") thisDamageCold = 0;

	if(oPrototype["SHOT_" + thisShotType].shotHasSetTarget && typeof o[thisTargetKey] === "undefined")
	{
	
	}
	else
	{		
		thisKey3 = addO("SHOT_" + thisShotType, thisShotX, thisShotY);
		o[thisKey3].z = "MAP";
		o[thisKey3].map = true;	
		o[thisKey3].xSpeed = thisShotXspeed * oPrototype["SHOT_" + thisShotType].speed;
		o[thisKey3].ySpeed = thisShotYspeed * oPrototype["SHOT_" + thisShotType].speed;
		o[thisKey3].damage = thisDamage;
		o[thisKey3].damageBurn = thisDamageBurn;
		o[thisKey3].damageLightning = thisDamageLightning;
		o[thisKey3].damageCold = thisDamageCold;
		o[thisKey3].origin = thisOrigin;

		if(o[thisKey3].sound != "") playSound(o[thisKey3].sound);
		
		if(oPrototype["SHOT_" + thisShotType].rotatesTowardsTarget)
		{
			thisR = toDegrees(Math.atan(thisShotYspeed / thisShotXspeed));	
			if(thisShotXspeed < 0) thisR = thisR - 180;
			o[thisKey3].r = -thisR;
		}
		else o[thisKey3].r = 0;
	
		//console.log("defenseAddShot: " + oPrototype["SHOT_" + thisShotType].shotHasSetTarget + " / " + thisTargetKey);
		
		if(oPrototype["SHOT_" + thisShotType].shotHasSetTarget && thisTargetKey != 0)
		{
			o[thisKey3].shotHasSetTarget = true;
			o[thisKey3].shotHasSetTargetX = o[thisTargetKey].x;
			o[thisKey3].shotHasSetTargetY = o[thisTargetKey].y;
			o[thisKey3].shotHasSetTargetKey = thisTargetKey;
			
			//console.log("shotHasSetTarget: " + o[thisKey3].shotHasSetTargetX + ", " + o[thisKey3].shotHasSetTargetY);		
		}
		
		return(thisKey3);
	}
	
}

function defenseInchHero(thisX, thisY)
{
	for(key in o)
	{
		if(o[key].category == "heroes")
		{
			if(thisX == -1) { if(defenseCheckTileDiscovered(o[key].x - 100, o[key].y)) { o[key].xDest = o[key].x - 100; o[key].yDest = o[key].y; } }
			if(thisX == 1)  { if(defenseCheckTileDiscovered(o[key].x + 100, o[key].y)) { o[key].xDest = o[key].x + 100; o[key].yDest = o[key].y; } }
			if(thisY == -1) { if(defenseCheckTileDiscovered(o[key].x, o[key].y - 100)) { o[key].xDest = o[key].x; o[key].yDest = o[key].y - 100; } }
			if(thisY == 1)  { if(defenseCheckTileDiscovered(o[key].x, o[key].y + 100)) { o[key].xDest = o[key].x; o[key].yDest = o[key].y + 100; } }	
		}
	}
}

function defenseDetermineTarget(thisKey, thisExtraX, thisExtraY)
{
	if(typeof thisExtraX === "undefined") thisExtraX = 0;
	if(typeof thisExtraY === "undefined") thisExtraY = 0;
	
	//console.log("defenseDetermineTarget: " + thisExtraX + ", " + thisExtraY);
	
	tempShotdone = false;
	tempMinDistance = 0;
	tempMinDistanceKey = 0;
	
	// *** Target blobs	
	if(!tempShotdone && (o[thisKey].category == "heroes" || o[thisKey].category == "archers" || o[thisKey].category == "towers"))
	{		
		for(key2 in o)
		{
			if(o[key2].category == "blobs")
			{
				tempDistance = distance(o[thisKey].x, o[thisKey].y, o[key2].x, o[key2].y);

				if(tempDistance <= o[thisKey].shootDistance)
				{
					// *** Blob in range		
					if(typeof o[thisKey].targets !== "undefined" && o[thisKey].targets == "MOST_HP")
					{
						//console.log(o[thisKey].category + ": Targets MOST_HP");
						
						// *** Target blob with most HP
						if(o[key2].hp > tempMinDistance || tempMinDistance == 0)
						{
							tempMinDistance = o[key2].hp;
							tempMinDistanceKey = key2;
							//console.log("tempMinDistanceKey set to " + tempMinDistanceKey);
							o[thisKey].selectedTarget = key2;
						}						
					}
					else if(typeof o[thisKey].targets !== "undefined" && o[thisKey].targets == "CLOSE_TO_HERO")
					{
						//console.log(o[thisKey].category + ": Targets CLOSE_TO_HERO");
						
						// *** Target blob closest to hero
						thisHeroKey = 0;
						
						for(key3 in o)
						{
							if(o[key3].category == "heroes") thisHeroKey = key3;
						}
						
						if(thisHeroKey != 0)
						{
							tempDistance = distance(o[key2].x, o[key2].y, o[thisHeroKey].x, o[thisHeroKey].y);
							
							if(tempDistance < tempMinDistance || tempMinDistance == 0)
							{
								tempMinDistance = tempDistance;
								tempMinDistanceKey = key2;
								o[thisKey].selectedTarget = key2;
							}						
						}
					}					
					else
					{
						//console.log(o[thisKey].category + ": Targets closest");
						
						// *** Target closest blob
						if(tempDistance < tempMinDistance || tempMinDistance == 0)
						{
							tempMinDistance = tempDistance;
							tempMinDistanceKey = key2;
							o[thisKey].selectedTarget = key2;
						}
					}
				}
			}							
		}
		
		if(tempMinDistanceKey != 0)
		{	
			// console.log("--- defenseDetermineTarget: " + o[thisKey].x);
		
			// *** Shoot object								
			o[thisKey].status = "SHOOT";
						
			markX = (o[thisKey].x + thisExtraX);
			markY = (o[thisKey].y + o[thisKey].shootStartY + thisExtraY);
			markR = Math.atan((markX - o[tempMinDistanceKey].x) / (markY - o[tempMinDistanceKey].y));
			markR = toDegrees(markR);
			if(markY - o[tempMinDistanceKey].y < 0) markR = markR + 180;
											
			o[thisKey].shootXspeed = Math.sin(toRadians(markR+180));
			o[thisKey].shootYspeed = Math.cos(toRadians(markR+180));
			
			tempShotdone = true;
		}							
	}
	
	
	// *** Target resources (only hero)
	if(!tempShotdone && o[thisKey].category == "heroes")
	{		
		for(key2 in o)
		{
			if(o[key2].category == "resources")
			{
				tempDistance = distance(o[thisKey].x, o[thisKey].y, o[key2].x, o[key2].y);
				
				if(tempDistance < tempMinDistance || tempMinDistance == 0)
				{
					if(tempDistance <= o[thisKey].shootDistance)
					{
						tempMinDistance = tempDistance;
						tempMinDistanceKey = key2;
						//console.log("tempMinDistanceKey (resources) set to " + tempMinDistanceKey);
						
					}
				}
			}							
		}
		
		if(tempMinDistanceKey != 0)
		{
			// *** Shoot object								
			o[thisKey].status = "SHOOT";
			// o[thisKey].aniFrame = 0;
			// o[thisKey].aniFrameCount = 0;
						
			markX = (o[thisKey].x);
			markY = (o[thisKey].y + o[thisKey].shootStartY);
			markR = Math.atan((markX - o[tempMinDistanceKey].x) / (markY - o[tempMinDistanceKey].y));
			markR = toDegrees(markR);
			if(markY - o[tempMinDistanceKey].y < 0) markR = markR + 180;
											
			o[thisKey].shootXspeed = Math.sin(toRadians(markR+180));
			o[thisKey].shootYspeed = Math.cos(toRadians(markR+180));
		}							
	}



	// *** Blob targets something
	if(!tempShotdone && o[thisKey].category == "blobs")
	{
		tempMinDistance = 0;
		
		for(key2 in o)
		{
			if((o[key2].category == "heroes" || o[key2].category == "castles" || o[key2].category == "towers") && o[key2].status != "DEAD" && o[key2].status != "WALK_OUT")
			{
				tempDistance = distance(o[thisKey].x, o[thisKey].y, o[key2].x, o[key2].y);

				if(tempDistance < tempMinDistance || tempMinDistance == 0)
				{
					tempMinDistance = tempDistance;
					tempMinDistanceKey = key2;
					o[thisKey].selectedTarget = key2;
				}
			}							
		}
		
		if(tempMinDistanceKey != 0)
		{	
			// console.log("--- defenseDetermineTarget: " + o[thisKey].x);
		
			// *** Move towards object
			markX = o[thisKey].x;
			markY = o[thisKey].y;
			markR = Math.atan((markX - o[tempMinDistanceKey].x) / (markY - o[tempMinDistanceKey].y));
			markR = toDegrees(markR);
			if(markY - o[tempMinDistanceKey].y < 0) markR = markR + 180;
											
			o[thisKey].xSpeed = Math.sin(toRadians(markR+180)) * o[thisKey].speed;
			o[thisKey].ySpeed = Math.cos(toRadians(markR+180)) * o[thisKey].speed;
			
			// console.log("Target of blob set to " + o[thisKey].xSpeed + ", " + o[thisKey].ySpeed);
			
			tempShotdone = true;
		}							
	}
	
	
	
	//console.log("tempMinDistanceKey now is " + tempMinDistanceKey);

	return(tempMinDistanceKey);
}

function defenseCheckTileDiscovered(thisX, thisY)
{
	return(tile[tileX(thisX)][tileY(thisY)].discovered);
}


function defenseDoesTileHaveAdjacentDiscoveredTile(thisX, thisY)
{
	// console.log("defenseDoesTileHaveAdjacentDiscoveredTile: " + thisX + ", " + thisY);
	
	hasDiscoveredTile = false;
	
	if(thisX > 1 && tile[thisX-1][thisY].discovered) hasDiscoveredTile = true;
	if(thisX < 15 && tile[thisX+1][thisY].discovered) hasDiscoveredTile = true;
	if(thisY > 1 && tile[thisX][thisY-1].discovered) hasDiscoveredTile = true;
	if(thisY < 15 && tile[thisX][thisY+1].discovered) hasDiscoveredTile = true;
		
	return(hasDiscoveredTile);
}

function defenseHeroDies(thisKey)
{
	playSound("argh");

	o[thisKey].status = "DEAD";
	o[key].aniFrame = 0;
	o[key].aniFrameCount = 0;
	
	o[key].hp = o[key].hpMax;
}

function defenseDropDown()
{
	defenseShowSpellingWord(2, "DROP_BOMB", "");
}

function defenseDropDownNow()
{
	playSound("explosion");
	
	thisDamage = 50;
	
	for(key in o)
	{
		if(o[key].category == "heroes") thisDamage = o[key].damage * 10;
	}
	
	if(thisDamage < 50) thisDamage = 50;
	
	for(key in o)
	{
		if(o[key].category == "blobs")
		{
			defenseAddToMap("IMPACT_SHOT_3", o[key].x, o[key].y);
			o[key].hp -= thisDamage;
		}
	}
	
	game["bombCount"] -= 1;
}


function defensePlaceBuilding(thisBuilding)
{
	if(game["canBuildTower" + thisBuilding]) defenseShowSpellingWord(thisBuilding, "PLACE_TOWER", thisBuilding);
}

function defensePlaceBuildingMap(thisBuilding)
{
	if(game["canBuildTower" + thisBuilding])
	{		
		console.log("defensePlaceBuilding: " + thisBuilding);
		
		game["placeBuilding"] = thisBuilding;
		game["showBuilding"] = false;
		
		game["subInfoText"] = "Plaats de toren door in het veld te klikken!";
	}
}

function defenseBuildBuilding(thisX, thisY)
{
	thisRealX = thisX - 700 - game["scrollX"];
	thisRealY = thisY - 350 - game["scrollY"];

	if(defenseCheckTileDiscovered(thisRealX, thisRealY))
	{
		tempError = 0;

		towerWidth = oPrototype["TOWER_" + game["placeBuilding"]].width;
		console.log("towerWidth: " + towerWidth);
		
		for(key in o)
		{
			if(o[key].map && (o[key].category == "castles" || o[key].category == "towers"))
			{
				if(thisRealX + towerWidth/2 >= o[key].x - o[key].width/2 && thisRealX + towerWidth/2 <= o[key].x + o[key].width/2 && thisRealY + 30 >= o[key].y - 30 && thisRealY + 30 <= o[key].y + 30) tempError = 1;
				if(thisRealX - towerWidth/2 >= o[key].x - o[key].width/2 && thisRealX - towerWidth/2 <= o[key].x + o[key].width/2 && thisRealY + 30 >= o[key].y - 30 && thisRealY + 30 <= o[key].y + 30) tempError = 1;
				if(thisRealX + towerWidth/2 >= o[key].x - o[key].width/2 && thisRealX + towerWidth/2 <= o[key].x + o[key].width/2 && thisRealY - 30 >= o[key].y - 30 && thisRealY - 30 <= o[key].y + 30) tempError = 1;
				if(thisRealX - towerWidth/2 >= o[key].x - o[key].width/2 && thisRealX - towerWidth/2 <= o[key].x + o[key].width/2 && thisRealY - 30 >= o[key].y - 30 && thisRealY - 30 <= o[key].y + 30) tempError = 1;
			}
		}
		
		if(tempError == 0)
		{
			playSound("explosion");
			playSound("select4");			
		
			console.log("defenseBuildBuilding: " + game["placeBuilding"] + " at " + thisRealX + ", " + thisRealY);		
			defenseAddToMap("TOWER_" + game["placeBuilding"], thisRealX, thisRealY);
			
			for(i = 1; i <= 4; i++)
			{
				game["resource" + i] -= oPrototype["TOWER_" + game["placeBuilding"]]["priceResource" + i];				
				oPrototype["TOWER_" + game["placeBuilding"]]["priceResource" + i] *= 1.3;
				oPrototype["TOWER_" + game["placeBuilding"]]["priceResource" + i] = Math.round(oPrototype["TOWER_" + game["placeBuilding"]]["priceResource" + i]);
				if(i==4 && oPrototype["TOWER_" + game["placeBuilding"]]["priceResource" + i] > 1){oPrototype["TOWER_" + game["placeBuilding"]]["priceResource" + i] = 1;}
				
			}

			game["placeBuilding"] = 0;
			game["subInfoText"] = "";			
		}
		else { game["subInfoText"] = "Plaats de toren niet te dichtbij andere gebouwen"; playSound("wrong"); }
	}
	else { game["subInfoText"] = "Plaats de toren op ontdekt land"; playSound("wrong"); }
}

function defenseDrawHealthbar(thisX, thisY, thisPercentage)
{
	if(thisPercentage < 1)
	{
		if(thisPercentage < 0) thisPercentage = 0;
		drawImage(manifest["healthbar_bg"], thisX, thisY);
		drawImage(manifest["healthbar_bar"], thisX + 1, thisY + 1, thisPercentage*38, 4);
		drawImage(manifest["healthbar_heart"], thisX - 7, thisY - 2);	
	}
}

function defenseTick()
{
	// console.log("defenseTick");
	
	if(!game["gamePaused"])
	{
		for(key in o)
		{
			if(o[key].towerID == 5)
			{
				for(key3 in o)
				{
					if((o[key3].category == "towers" || o[key3].category == "castles" || o[key3].category == "heroes") && distance(o[key].x, o[key].y, o[key3].x, o[key3].y) <= o[key].shootDistance)
					{
						o[key3].hp += o[key].damage;
						if(o[key3].hp > o[key3].hpMax) o[key3].hp = o[key3].hpMax;
					}				
				}
			}
		}
		
		
		
	}
}

function defenseAddBlob(thisBlobArray, thisAmount)
{
	if(!game["gameFinished"])
	{
		//console.log(thisBlobArray.length);
		//if(thisBlob == 0) thisRandomBlob = true; else thisRandomBlob = false;
		
		//console.log(thisBlobArray);
		//console.log("Nr0:" + thisBlobArray[0]);
		
		tempFound = false;
		
		while(!tempFound)
		{
		
			tempX = Math.ceil(Math.random()*15);
			tempY = Math.ceil(Math.random()*15);
			
			if(!tile[tempX][tempY].discovered && defenseDoesTileHaveAdjacentDiscoveredTile(tempX, tempY))
			{
				// console.log(thisAmount + " new blob(s) on tile: " + (tempX) + ", " + (tempY) + ": ");
				
				tempFound = true;
							
				for(i = 0; i < thisBlobArray.length; i++)
				{
					
					if(thisBlobArray[i] == 0)
					{
						thisBlobArray[i] = Math.ceil(Math.random() * game["levelWaveBlobTypes"]);
						if(Math.random() > 0.25 && game["levelWaveBlobTypeFocus"] != 0) thisBlobArray[i] = game["levelWaveBlobTypeFocus"];				
					}
					
					// console.log("Nr " + i + ":" + thisBlobArray[i]);
									
					defenseAddToMap("BLOB_" + thisBlobArray[i], ((tempX-1)*200)-1400 + Math.random()*200-100, ((tempY-1)*200)-1400 + Math.random()*200-100);
				}
			}
		}	
	
		/*
		tempFound = false;
		
		while(!tempFound)
		{
			tempX = -1400 + Math.random()*2800;
			tempY = -1400 + Math.random()*2800;
			
			if(!defenseCheckTileDiscovered(tempX, tempY) && defenseDoesTileHaveAdjacentDiscoveredTile(tileX(tempX), tileY(tempY)))
			{
				// console.log("New blob on tile: " + tileX(tempX) + ", " + tileY(tempY) + ": ");
				tempFound = true;
				
				for(i = 1; i <= thisAmount; i++) defenseAddToMap("BLOB_" + thisBlob, (tempX) + Math.random()*200, (tempY) + Math.random()*200);
			}
		}
		*/
	}
}

function defenseCenterOnCastle()
{
	playSound("select");
	
	for(key in o)
	{
		if(o[key].category == "castles")
		{
			game["scrollX"] = -(o[key].x);
			game["scrollY"] = -(o[key].y);
			game["playerSelected"] = key;						
		}
	}
}

function defenseCenterOnHero()
{
	playSound("select");
	
	for(key in o)
	{
		if(o[key].category == "heroes")
		{
			game["scrollX"] = -o[key].x;
			game["scrollY"] = -o[key].y;
			game["playerSelected"] = key;
		}
	}
}

function defenseMessage(thisMessage)
{
	playSound("select4");
	game["messageCount"] = 200;
	game["messageText"] = thisMessage;
}

function defenseHurryNextWave()
{
	playSound("select");
	
	game["levelHurryWaveReward"] = Math.ceil((game["levelWaveCountMax"] - game["levelWaveCount"])/30);
	game["resource1"] += game["levelHurryWaveReward"];
	game["levelWaveCount"] = game["levelWaveCountMax"];
}

function defenseLoad()
{
	console.log("LOAD GAME");
	load = JSON.parse(ge("savegame").value);
	console.log(load);
	game = load["game"];
	o = load["o"];
	tile = load["tile"];
	
	click(0,0);
	
}


function defenseGenerateWave()
{
	game["levelWave"]++;
	
	// **********************
	// *** Level build up ***
	// **********************

	if(game["levelWave"] == 1) { defenseAddBlob([1,1,1]); game["levelBlobRandomChance"] = 0.999; game["levelOccasionalBlobType"] = 1; }	
	if(game["levelWave"] == 2) { defenseAddBlob([5,1,1,1]); }
	if(game["levelWave"] == 3) { defenseAddBlob([5,3,1,1,1]); }
	if(game["levelWave"] == 4) { defenseAddBlob([3,3,3,3]); game["levelBlobRandomChance"] = 0.998; game["levelOccasionalBlobType"] = 3; }
	if(game["levelWave"] == 5) { for(j = 1; j <= 9; j++) { defenseAddBlob([3]); } }
	if(game["levelWave"] == 6) { for(j = 1; j <= 4; j++) { defenseAddBlob([5]); } }
	if(game["levelWave"] == 7) { defenseAddBlob([5,5,3,1,1,1]); }
	if(game["levelWave"] == 8) { defenseAddBlob([3,3,3,3,3,3]); }
	if(game["levelWave"] == 9) { for(j = 1; j <= 3; j++) { defenseAddBlob([5]); } for(j = 1; j <= 3; j++) { defenseAddBlob([3]); } }
	if(game["levelWave"] == 10) { game["levelWaveCountMaxWave"] += 5*5; defenseAddBlob([4]); }
	if(game["levelWave"] == 11) { for(j = 1; j <= 6; j++) { defenseAddBlob([2]); } game["levelOccasionalBlobType"] = 2; }
	if(game["levelWave"] == 12) { for(j = 1; j <= 2; j++) { defenseAddBlob([5]); } for(j = 1; j <= 2; j++) { defenseAddBlob([2]); } for(j = 1; j <= 2; j++) { defenseAddBlob([1]); } for(j = 1; j <= 2; j++) { defenseAddBlob([3]); } }
	if(game["levelWave"] == 13) { defenseAddBlob([1,1,1,1,1,1,1,1,1,1,1]); defenseAddBlob([1,1,1,1,1,1,1,1,1,1,1]); defenseAddBlob([1,1,1,1,1,1,1,1,1,1,1]); game["levelBlobRandomChance"] = 0.998; }	
	if(game["levelWave"] == 14) { defenseAddBlob([7,2,2,2,2]); }
	if(game["levelWave"] == 15) { for(j = 1; j <= 15; j++) { defenseAddBlob([3]); } }
	if(game["levelWave"] == 16) { defenseAddBlob([8,5,5,5]); }
	if(game["levelWave"] == 17) { defenseAddBlob([6]); defenseAddBlob([6,6]); }
	if(game["levelWave"] == 18) { defenseAddBlob([1,2,3,5,6,7]); }
	if(game["levelWave"] == 19) { for(j = 1; j <= 30; j++) { defenseAddBlob([1]); } }
	if(game["levelWave"] == 20) { game["levelWaveCountMaxWave"] += 5*5; defenseAddBlob([9]); }
	if(game["levelWave"] == 21) { for(j = 1; j <= 20; j++) { defenseAddBlob([3]); } }
	if(game["levelWave"] == 22) { for(j = 1; j <= 4; j++) { defenseAddBlob([6]); }; for(j = 1; j <= 15; j++) { defenseAddBlob([3]); } ; game["levelOccasionalBlobType"] = 3; }
	if(game["levelWave"] == 23) { for(j = 1; j <= 3; j++) { defenseAddBlob([8]); }; game["levelBlobRandomChance"] = 0.999; game["levelOccasionalBlobType"] = 3; }
	if(game["levelWave"] == 24) { defenseAddBlob([11,11,11,11,12,12,12,12,13,13,13,13]); game["levelOccasionalBlobType"] = 13; }
	if(game["levelWave"] == 25) { for(j = 1; j <= 14; j++) { defenseAddBlob([11]); } }
	if(game["levelWave"] == 26) { defenseAddBlob([11,11,11,11,11]); defenseAddBlob([12,12,12,12,12]); defenseAddBlob([13,13,13,13,13]); }
	if(game["levelWave"] == 27) { defenseAddBlob([14,14,14,10]); defenseAddBlob([14,14,14,10]); defenseAddBlob([14,14,14,10]); }
	if(game["levelWave"] == 28) { for(j = 1; j <= 17; j++) { defenseAddBlob([14]); } }
	if(game["levelWave"] == 29) { defenseAddBlob([1,2,3,4,5,6,7,8,10]); defenseAddBlob([11,12,13]); defenseAddBlob([11,12,13]); }
	if(game["levelWave"] == 30) { game["levelWaveCountMaxWave"] += 5*5; defenseAddBlob([15]); }
	if(game["levelWave"] == 31) { for(j = 1; j <= 6; j++) { defenseAddBlob([16]); } game["levelOccasionalBlobType"] = 13; }
	if(game["levelWave"] == 32) { game["levelWaveCountMaxWave"] += 5*10; }
	if(game["levelWave"] == 33) { defenseAddBlob([9,9,10,10]); }
	if(game["levelWave"] == 34) { defenseAddBlob([11,11,11,11,11,12,12,12,12,12,13,13,13,13,13]); }
	if(game["levelWave"] == 35) { defenseAddBlob([4,4,4,4,4,4,4,4,4,4,4,4,4]); }
	if(game["levelWave"] == 36) { game["levelWaveCountMaxWave"] += 5*10; }
	if(game["levelWave"] == 37) { defenseAddBlob([7,7,7,2,2,2]); defenseAddBlob([7,7,7,2,2,2]); defenseAddBlob([7,7,7,2,2,2]); }
	if(game["levelWave"] == 38) { defenseAddBlob([14,14,14,14,14,14,14,14,14]); setTimeout(function(){ defenseAddBlob([13,13,13,13,13,13]); }, 10000); setTimeout(function(){ defenseAddBlob([13,13,13,13,13,13]); }, 20000); setTimeout(function(){ defenseAddBlob([13,13,13,13,13,13]); }, 30000); }
	if(game["levelWave"] == 39) { for(j = 1; j <= 3; j++) { defenseAddBlob([18]); } setTimeout(function(){ defenseAddBlob([18]); }, 10000); setTimeout(function(){ defenseAddBlob([18]); }, 20000); setTimeout(function(){ defenseAddBlob([18]); }, 30000); }
	if(game["levelWave"] == 40) { game["levelWaveCountMaxWave"] += 5*5; defenseAddBlob([19]); }
	if(game["levelWave"] == 41) { game["levelWaveCountMaxWave"] += 5*10; }
	if(game["levelWave"] == 42) { for(j = 1; j <= 17; j++) { defenseAddBlob([20]); } game["levelOccasionalBlobType"] = 20; }
	if(game["levelWave"] == 43) { for(j = 1; j <= 30; j++) { setTimeout(function(){ defenseAddBlob([13]); }, 500*j); } }
	if(game["levelWave"] == 44) { for(j = 1; j <= 10; j++) { defenseAddBlob([13]); } }
	if(game["levelWave"] == 45) { for(j = 1; j <= 10; j++) { defenseAddBlob([21]); } }
	if(game["levelWave"] == 46) { defenseAddBlob([11,11,11,11,11]); defenseAddBlob([12,12,12,12,12]); defenseAddBlob([13,13,13,13,13]); setTimeout(function(){ defenseAddBlob([11,11,11,11,11]); defenseAddBlob([12,12,12,12,12]); defenseAddBlob([13,13,13,13,13]); }, 15000); }
	if(game["levelWave"] == 47) { for(j = 1; j <= 7; j++) { defenseAddBlob([9]); } }
	if(game["levelWave"] == 48) { game["levelWaveCountMaxWave"] += 5*10; }
	if(game["levelWave"] == 49) { for(j = 1; j <= 5; j++) { setTimeout(function(){ defenseAddBlob([18,18]); }, 5000*j); } }
	if(game["levelWave"] == 50) { game["levelWaveCountMaxWave"] += 5*5; defenseAddBlob([23]); }
	if(game["levelWave"] == 51) { defenseAddBlob([21]); }
	if(game["levelWave"] == 52) { defenseAddBlob([21]); }
	if(game["levelWave"] == 53) { defenseAddBlob([21]); }
	if(game["levelWave"] == 54) { defenseAddBlob([21]); }
	
	
	if(game["levelHurryWaveReward"] > 0) tempExtraMsg = " Golf snel oproepen levert " + game["levelHurryWaveReward"] + " op!"; else tempExtraMsg = "";
	game["levelHurryWaveReward"] = 0;
	
	tempMsg = "Golf " + game["levelWave"] + " komt eraan!";
	if(game["levelWave"] == 10 || game["levelWave"] == 20 || game["levelWave"] == 30 || game["levelWave"] == 40) tempMsg = "Eindbaas komt eraan!";
	if(game["levelWave"] == 32 || game["levelWave"] == 36 || game["levelWave"] == 41 || game["levelWave"] == 48) tempMsg = "Geen blobs deze golf. Zouden ze verslagen zijn?";
	if(game["levelWave"] == 50) tempMsg = "De moederblob komt eraan! Lok haar weg van de basis!";
	
	defenseMessage(tempMsg + tempExtraMsg);
	
	// *** Strengthen settings for next wave
	// game["levelBlobRandomChance"] -= 0.001;
	if(isEven(game["levelWave"])) game["levelWaveAmount"]++;
}
