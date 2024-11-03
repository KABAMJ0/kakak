pacmanLevelString = "\
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\n\
X.............XX.............X\n\
XoXXXXX.XXXXX.XX.XXXXX.XXXXXoX\n\
X.XXXXX.XXXXX.XX.XXXXX.XXXXX.X\n\
X............................X\n\
X.XXXXX.XX.XXXXXXXX.XX.XXXXX.X\n\
X.XXXXX.XX.XXXXXXXX.XX.XXXXX.X\n\
X.......XX....XX....XX.......X\n\
XXXXXXX.XXXXX.XX.XXXXX.XXXXXXX\n\
XXXXXXX.XXXXX.XX.XXXXX.XXXXXXX\n\
XXXXXXX.XX.  rrrr  .XX.XXXXXXX\n\
XXXXXXX.XX.XXX}{XXX.XX.XXXXXXX\n\
XXXXXXX.XX.XXX_XXXX.XX.XXXXXXX\n\
<      .XX.XXXgXXXX.XX.      >\n\
XXXXXXX....XXXXXXXX....XXXXXXX\n\
XXXXXXX.XX.XXXXXXXX XX.XXXXXXX\n\
XXXXXXX.XX..........XX.XXXXXXX\n\
XXXXXXX.XX.XXXXXXXX.XX.XXXXXXX\n\
XXXXXXX.XX.XXXXXXXX.XX.XXXXXXX\n\
X.............XX.............X\n\
X.XXXXX.XXXXX.XX.XXXXX.XXXXX.X\n\
X.XXXXX.XXXXX.XX.XXXXX.XXXXX.X\n\
X....XX.......p........XX....X\n\
XXXX.XX.XX.XXXXXXXX.XX.XX.XXXX\n\
XXXX.XX.XX.XXXXXXXX.XX.XX.XXXX\n\
X.......XX....XX....XX.......X\n\
X.XXXXXXXXXXX.XX.XXXXXXXXXXX.X\n\
XoXXXXXXXXXXX.XX.XXXXXXXXXXXoX\n\
X............................X\n\
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\n\
";

var pacmanLevel = { };
var pacmanLevelVal = { };



	


function pacmanInit()
{
	deleteAllO();
	
	pacmanLevelString = pacmanLevelString.trim();
	
	levelRow = pacmanLevelString.split("\n");
	
	game["pacmanDotsTotal"] = 0;
	game["pacmanDots"] = 0;
	
	//game["pacmanWordCount"] = 0;
	
	for(i = 0; i <= 29; i++)
	{
		pacmanLevel[i+1] = new Array();
		pacmanLevelVal[i+1] = new Array();
	}
		
	for(i = 0; i <= 29; i++)
	{
		for(j = 0; j <= 29; j++)
		{
			pacmanLevel[j+1][i+1] = levelRow[i].substring(j, j+1);
			pacmanLevelVal[j+1][i+1] = "";
						
			if(pacmanLevel[j+1][i+1] == "p")
			{
				pacmanLevel[j+1][i+1] = "";
				game["pacmanX"] = j+1;
				game["pacmanY"] = i+1;
			}
			
			if(pacmanLevel[j+1][i+1] == "g")
			{
				game["pacmanGhostSpawnX"] = j+1;
				game["pacmanGhostSpawnY"] = i+1;
			}
			
			if(pacmanLevel[j+1][i+1] == ".")
			{
				game["pacmanDotsTotal"]++;
				
				pacmanLevel[j+1][i+1] = ""; // *** Delete all dots as words will appear in this level
				
				/*
				if(j==18 && i==22)
				{
					game["pacmanDotsTotal"]++;
				}
				else pacmanLevel[j+1][i+1] = "";
				*/
			}

			if(pacmanLevel[j+1][i+1] == " ")
			{
				pacmanLevel[j+1][i+1] = "";
			}			
		}
	}

	console.log("dotsTotal: " + game["pacmanDotsTotal"]);
		
	//game["score"] = 0;
		
	game["markedSpot"] = 0;
	game["markedSpot2"] = 0;
	
	//game["gameStatus"] = "";
	game["gameStatus"] = "READY";
	game["pacmanStatusCount"] = 0;
	game["pacmanR"] = 0;
	game["pacmanNextR"] = 0;
	game["pacmanStopped"] = true;

	game["pacmanStatus"] = "";
	game["pacmanStatusCount"] = 0;
	game["pacmanLevelFrameCount"] = 0;
	
	game["initBoard"] = true;

	// *** Woordenlijst
	// completeWL = "de bijt,de blaas,de bij";
	
	wl = new Array();
	wl = completeWL.split(",");

	for(key in wl)
	{
		wl[key] = wl[key].split("*").join("");
		wl[key] = wl[key].split("'").join("`");
		wl[key] = wl[key].trim();
	
		if(wl[key] == "") wl[key] = "-";
	}
	
	pacmanNewWord("BOTTOM");
	pacmanNewWord("TOP");

	console.log("wordsGroep: " + wordsGroep);
	
	
	ghostAmount = 3;
	
	//if(wordsGroep > 4) ghostAmount++;
	//if(wordsGroep > 5) ghostAmount++;
	//if(wordsGroep > 7) ghostAmount++;
	
	for (a = 1; a < game["pacmanLevel"]; a++){ghostAmount++;}
	
	if (wordsGroep<7){game["speed"]=0.8}
	if (wordsGroep<5){game["speed"]=0.7}
	if (klas_wachtwoord != ""){game["speed"]=0.8}
	
	for(i = 1; i <= ghostAmount; i++)
	{
		setTimeout(function(){ thisGhost = pacmanAddGhost(pacmanBoardX(game["pacmanGhostSpawnX"]), pacmanBoardY(game["pacmanGhostSpawnY"]), 90); }, i*600);
	}
	
	playSound("monster");
}

function pacmanNewWord(thisLocation)
{
	if(thisLocation == "TOP")
	{
		game["wlTop"] = wlPick(); 
		console.log("pacmanNewWord wlTop: " + game["wlTop"]);
		
		game["wlTopTyped"] = 1;
	
		if(game["wlTop"] != "-") pacmanSpreadWord(game["wlTop"], "TOP");
	}
	else
	{
		game["wlBottom"] = wlPick(); 
		console.log("pacmanNewWord wlBottom: " + game["wlBottom"]);

		game["wlBottomTyped"] = 1;

		if(game["wlBottom"] != "-") pacmanSpreadWord(game["wlBottom"], "BOTTOM");
	}

	
	
	console.log("pacmanNewWord pacmanWordCount: " + game["pacmanWordCount"]); 
	
	if(game["pacmanWordCount"] == 4) pacmanProgressLevel();
	if(game["pacmanWordCount"] == 8) pacmanProgressLevel();
	if(game["pacmanWordCount"] == 12) pacmanProgressLevel();
	if(game["pacmanWordCount"] == 16) pacmanProgressLevel();
	if(game["pacmanWordCount"] == 20) pacmanProgressLevel();
	if(game["pacmanWordCount"] == 24) pacmanProgressLevel();
	if(game["pacmanWordCount"] == 28) pacmanProgressLevel();
	if(game["pacmanWordCount"] == 32) pacmanProgressLevel();
	if(game["pacmanWordCount"] == 36) pacmanProgressLevel();
	if(game["pacmanWordCount"] == 40) pacmanProgressLevel();
	
	
	if(game["wlTop"] == "-" && game["wlBottom"] == "-")
	{
				wl = new Array();
				wl = completeWL.split(",");

				for(key in wl)
				{
					wl[key] = wl[key].split("*").join("");
					wl[key] = wl[key].split("'").join("`");
					wl[key] = wl[key].trim();

					if(wl[key] == "") wl[key] = "-";
				}

				pacmanNewWord("BOTTOM");
				pacmanNewWord("TOP");
	}
}

function pacmanProgressLevel()
{
	playSound("monster");
	game["pacmanLevel"]++;
	
	pacmanAddGhost(pacmanBoardX(game["pacmanGhostSpawnX"]), pacmanBoardY(game["pacmanGhostSpawnY"]), 90);
}
function pacmanCurrentLetterTop()
{
	return(game["wlTop"].substr((game["wlTopTyped"]-1), 1));
}

function pacmanCurrentLetterBottom()
{
	return(game["wlBottom"].substr((game["wlBottomTyped"]-1), 1));
}

function pacmanSpreadWord(thisWord, thisLocation)
{
	if(thisLocation == "TOP")
	{
		thisMinRow = 1;
		thisMaxRow = 10;
	}
	
	if(thisLocation == "BOTTOM")
	{
		thisMinRow = 14;
		thisMaxRow = 29;
	}
	
	thisSyl = syllabify(thisWord);
	
	for(ii = 0; ii < thisSyl.length; ii++)
	{
		thisSyl[ii] = thisSyl[ii].trim();
		
		console.log("|" + thisSyl[ii] + "|");
		
		thisFound = false;
		
		while(!thisFound)
		{
			tempX = Math.ceil(Math.random()*28) + 1;
			tempY = Math.ceil(Math.random()*(thisMaxRow-thisMinRow)) + thisMinRow;
			
			if(pacmanLevel[tempX][tempY] == "")
			{
				thisFits = true;
				
				for(jj = 0; jj < thisSyl[ii].length; jj++)
				{
					//console.log("- " + thisSyl[ii].substr(jj,1));
					
					if(tempX + jj >= 30)
					{
						thisFits = false;
					}
					else
					{
						if(pacmanLevel[tempX + jj][tempY] != "") thisFits = false;
					}
				}
				
				if(thisFits)
				{
					for(jj = 0; jj < thisSyl[ii].length; jj++)
					{
						// console.log("- " + thisSyl[ii].substr(jj,1));
						pacmanLevel[tempX + jj][tempY] = ".";
						pacmanLevelVal[tempX + jj][tempY] = thisSyl[ii].substr(jj,1);
					}
					
					thisFound = true;
				}
			}
		}
	
	}
	
}

function pacmanAddGhost(thisX, thisY, thisR)
{
	console.log("pacmanAddGhost");
	
	thisKey = addO("GHOST_1", thisX, thisY);

	o[thisKey].r = thisR;
	o[thisKey].speed = oPrototype["GHOST_1"].speed * game["speed"];
	o[thisKey].speedVulnerable = oPrototype["GHOST_1"].speedVulnerable;
	
	o[thisKey].status = "";
	o[thisKey].statusCount = 0;
	
	o[thisKey].released = false;
	o[thisKey].trapped = true;

	
	o[thisKey].status = "EYES";
	o[thisKey].statusCount = 700;
	
	o[thisKey].eyesMoveX = (pacmanBoardX(game["pacmanGhostSpawnX"]) - 650)/50;
	o[thisKey].eyesMoveY = (pacmanBoardY(game["pacmanGhostSpawnY"]) - -50)/50;
	o[thisKey].x = 650;
	o[thisKey].y = -50;
	
	
	
	return(thisKey);
}

function pacmanBoardX(thisBoardX)
{
	return(spot["PACMAN_BOARD"].x + (thisBoardX-1)*24 + 24/2);
}

function pacmanBoardY(thisBoardY)
{
	return(spot["PACMAN_BOARD"].y + (thisBoardY-1)*24 + 24/2);
}

function pacmanBoardGetX(thisBoardX)
{
	thisBoardX -= spot["PACMAN_BOARD"].x;
	
	return(Math.ceil(thisBoardX/24));
}

function pacmanBoardGetY(thisBoardY)
{
	thisBoardY -= spot["PACMAN_BOARD"].y;
	return(Math.ceil(thisBoardY/24));
}

function pacmanIsTrueCord(thisX, thisY)
{
	thisX -= spot["PACMAN_BOARD"].x;
	thisY -= spot["PACMAN_BOARD"].y;

	thisXtrue = false;
	thisYtrue = false;
	
	for(i = 0; i < 30; i++)
	{
		if(thisX == i*24+12) thisXtrue = true;
		if(thisY == i*24+12) thisYtrue = true;
	}
	
	if(!thisXtrue && !thisYtrue) console.log("pacmanIsTrueCord warning: x and y both out of sync!");
	
	if(thisXtrue && thisYtrue) return(true); else return(false);
	
}

function pacmanBoardMX(thisR)
{
	if(thisR == 0) return(1);
	else if(thisR == 180) return(-1);
	else return(0);
}

function pacmanBoardMY(thisR)
{
	if(thisR == 90) return(-1);
	else if(thisR == 270) return(1);
	else return(0);
}

function pacmanLevelWall(thisX, thisY, thisReleased)
{
	if(typeof thisReleased === "undefined") thisReleased = true;
	
	if(typeof pacmanLevel[thisX] === "undefined") return(true);
	else if(typeof pacmanLevel[thisX][thisY] === "undefined") return(true);
	else
	{
		thisWall = pacmanLevel[thisX][thisY];
		
		if(!thisReleased)
		{
			if(thisWall == "X" || thisWall == "{") return(true); else return(false);	
		}
		else
		{
			if(thisWall == "X" || thisWall == "}" || thisWall == "{") return(true); else return(false);
		}
	}
}

function pacmanAniTeleport(thisY)
{
	for(i = 1; i <= 10; i++) addParticle(8, pacmanBoardX(1), pacmanBoardY(thisY) + Math.random()*30-15);
	playSound("teleport");
	for(i = 1; i <= 10; i++) addParticle(9, pacmanBoardX(30), pacmanBoardY(thisY) + Math.random()*30-15);
}

function pacmanProgress()
{
	game["pacmanFrame"] = 0;

	game["pacmanX"] += pacmanBoardMX(game["pacmanR"]);
	game["pacmanY"] += pacmanBoardMY(game["pacmanR"]);
	
	if(pacmanLevel[game["pacmanX"]][game["pacmanY"]] == "<") { pacmanAniTeleport(game["pacmanY"]); game["pacmanX"] = 30; }
	else if(pacmanLevel[game["pacmanX"]][game["pacmanY"]] == ">") { pacmanAniTeleport(game["pacmanY"]); game["pacmanX"] = 1; }
	
	if(pacmanLevel[game["pacmanX"]][game["pacmanY"]] == "." && (pacmanCurrentLetterTop() == pacmanLevelVal[game["pacmanX"]][game["pacmanY"]] || pacmanCurrentLetterBottom() == pacmanLevelVal[game["pacmanX"]][game["pacmanY"]]))
	{	
		if(game["pacmanY"] >= 14)
		{
			// *** Bottom
			if(pacmanCurrentLetterBottom() == pacmanLevelVal[game["pacmanX"]][game["pacmanY"]])
			{
				pacmanLevel[game["pacmanX"]][game["pacmanY"]] = "";
				pacmanLevelVal[game["pacmanX"]][game["pacmanY"]] = "";
			
				playSound("bloep");
				
				game["pacmanDots"]++;
				game["score"] += 10;
			
				for(ii = 1; ii <= 5; ii++) addParticle(1, pacmanBoardX(game["pacmanX"]) + Math.random()*10-5, pacmanBoardY(game["pacmanY"]) + Math.random()*10-5);

				game["wlBottomTyped"]++;
				
				for(ii = 1; ii <= 5; ii++) { if(game["wlBottom"].substr(game["wlBottomTyped"]-1,1) == " ") game["wlBottomTyped"]++; }
			}
		}
		else
		{
			// *** Top
			console.log("pacmanProgress top: " + pacmanCurrentLetterTop());
					
			if(pacmanCurrentLetterTop() == pacmanLevelVal[game["pacmanX"]][game["pacmanY"]])
			{
				pacmanLevel[game["pacmanX"]][game["pacmanY"]] = "";
				pacmanLevelVal[game["pacmanX"]][game["pacmanY"]] = "";
			
				playSound("bloep");
				
				game["pacmanDots"]++;
				game["score"] += 10;
							
				for(ii = 1; ii <= 5; ii++) addParticle(1, pacmanBoardX(game["pacmanX"]) + Math.random()*10-5, pacmanBoardY(game["pacmanY"]) + Math.random()*10-5);
				
				game["wlTopTyped"]++;

				for(ii = 1; ii <= 5; ii++) { if(game["wlTop"].substr(game["wlTopTyped"]-1,1) == " ") game["wlTopTyped"]++; }
				
			}
		}
		
		

		//playSound("ploep");	

		//console.log("Dot " + game["pacmanDots"] + " van " + game["pacmanDotsTotal"] + " gepakt.");
		


		if(game["wlBottomTyped"] > game["wlBottom"].length)
		{
			pacmanNewWord("BOTTOM");
			game["pacmanWordCount"]++;
		}
				
		if(game["wlTopTyped"] > game["wlTop"].length)
		{
			pacmanNewWord("TOP");
			game["pacmanWordCount"]++;
		}
		
		// *** END GAME:
		/*
		if(game["pacmanDots"] >= game["pacmanDotsTotal"])
		{
			playSound("explosion");
			playSound("win");
			
			game["score"] += 1500;
			
			game["pacmanStatus"] = "WON";
			game["pacmanStatusCount"] = 0;
			
			for(key in o)
			{
				proto = oPrototype[o[key].prototype];
	
				if(proto.category == "ghost")
				{

					for(i = 1; i <= 20; i++)
					{
						addParticle(Math.ceil(Math.random() * 3), o[key].x, o[key].y);
					}
									
					delete o[key];				
				}
			}			
		}
		*/
	}
	else if(pacmanLevel[game["pacmanX"]][game["pacmanY"]] == "o")
	{
		pacmanLevel[game["pacmanX"]][game["pacmanY"]] = "";			
		playSound("ball");
		
		for(key in o)
		{
			proto = oPrototype[o[key].prototype];

			if(proto.category == "ghost" && (o[key].status == "" || o[key].status == "VULNERABLE"))
			{
				o[key].status = "VULNERABLE";
				o[key].statusCount = 0;
			
			}
		}		
	}
	else
	{
		//playSound("ploep");	
	}
	
	if(pacmanLevel[game["pacmanX"]][game["pacmanY"]] == "c")
	{
		pacmanLevel[game["pacmanX"]][game["pacmanY"]] = "";

		playSound("bloep");
		playSound("chime_positive");
		
		game["score"] += 25;
		game["pacmanCherryTaken"] = true;
		game["pacmanCherry"] = false;
	}
	
	if(game["pacmanNextR"] != -1)
	{
		if(!pacmanLevelWall(game["pacmanX"]+pacmanBoardMX(game["pacmanNextR"]), game["pacmanY"]+pacmanBoardMY(game["pacmanNextR"])))
		{
			game["pacmanR"] = game["pacmanNextR"];
			//game["pacmanNextR"] = -1;
		}
	}
	
	
	if(pacmanLevelWall(game["pacmanX"]+pacmanBoardMX(game["pacmanR"]), game["pacmanY"]+pacmanBoardMY(game["pacmanR"])))
	{
		game["pacmanStopped"] = true;
	}
	
}

function pacmanEndGame()
{
	playSound("explosion");
	playSound("win");
	
	game["score"] += game["pacmanLives"]*500;
	game["pacmanLives"] = 0;
	
	game["pacmanStatus"] = "WON";
	game["pacmanStatusCount"] = 0;
	
	for(key in o)
	{
		proto = oPrototype[o[key].prototype];

		if(proto.category == "ghost")
		{

			for(i = 1; i <= 20; i++)
			{
				addParticle(Math.ceil(Math.random() * 3), o[key].x, o[key].y);
			}
							
			delete o[key];				
		}
	}
}


function pacmanMove(thisR)
{
	//console.log("pacmanMove: " + game["pacmanR"] + " > " + thisR + " (" + game["pacmanNextR"] + ")");
	
	if(game["pacmanR"] == 0 && thisR == 180)
	{
		if(pacmanLevelWall(game["pacmanX"]+pacmanBoardMX(thisR), game["pacmanY"]+pacmanBoardMY(thisR)))
		{
			console.log("Intervene 1");		
		}
		else
		{
			game["pacmanR"] = thisR;
			game["pacmanFrame"] = -game["pacmanFrame"];
		}
	}
	
	if(game["pacmanR"] == 180 && thisR == 0)
	{
		if(pacmanLevelWall(game["pacmanX"]+pacmanBoardMX(thisR), game["pacmanY"]+pacmanBoardMY(thisR)))
		{
			console.log("Intervene 2");			
		}
		else
		{	
			game["pacmanR"] = thisR;
			game["pacmanFrame"] = -game["pacmanFrame"];
		}			
	}
	
	if(game["pacmanR"] == 90 && thisR == 270)
	{
		if(pacmanLevelWall(game["pacmanX"]+pacmanBoardMX(thisR), game["pacmanY"]+pacmanBoardMY(thisR)))
		{
			console.log("Intervene 3");		
		}
		else
		{	
			game["pacmanR"] = thisR;
			game["pacmanFrame"] = -game["pacmanFrame"];
		}
	}
	
	if(game["pacmanR"] == 270 && thisR == 90)
	{
		if(pacmanLevelWall(game["pacmanX"]+pacmanBoardMX(thisR), game["pacmanY"]+pacmanBoardMY(thisR)))
		{
			console.log("Intervene 4");		
		}
		else
		{	
			game["pacmanR"] = thisR;
			game["pacmanFrame"] = -game["pacmanFrame"];
		}
	}
	
	//if(game["pacmanNextR"] != -1) game["pacmanFrame"] = 0;
	
	game["pacmanNextR"] = thisR;
	
	//console.log("- pacmanLevelWall(" + (game["pacmanX"]+pacmanBoardMX(thisR)) + ", " + (game["pacmanY"]+pacmanBoardMY(thisR)) + "): " + pacmanLevelWall(game["pacmanX"]+pacmanBoardMX(thisR), game["pacmanY"]+pacmanBoardMY(thisR)) + "");
	
	if(!pacmanLevelWall(game["pacmanX"]+pacmanBoardMX(thisR), game["pacmanY"]+pacmanBoardMY(thisR)))
	{
		game["pacmanR"] = thisR;
		//game["pacmanFrame"] = 0;
		game["pacmanStopped"] = false;
	}
	else
	{

		
	}
	
	
}

function pacmanCalcProgress()
{
	// *** Pacman
	game["pacmanStatusCount"]++;

	if(game["pacmanStatus"] == "")	
	{
		game["pacmanFrame"]+=( 8 * game["speed"])
		if(game["pacmanStopped"]) game["pacmanFrame"] = 0;
		
		if(game["pacmanFrame"] >= 24)
		{
			pacmanProgress();
		}
	}
		
	// *** Cherry
	if(game["pacmanCherriesPopped"] < game["pacmanCherriesPoppedMax"] && !game["pacmanCherry"] && Math.random() < game["pacmanCherryChance"] && game["pacmanStatus"] != "CAUGHT" && game["pacmanStatus"] != "WON") //  && game["pacmanDots"] > 150
	{		
		tempX = Math.ceil(Math.random()*30);
		tempY = Math.ceil(Math.random()*30);
	
		if(pacmanLevel[tempX][tempY] == "")
		{
			console.log("Added cherry");
		
			pacmanLevel[tempX][tempY] = "c";
			playSound("chime_positive");
			game["pacmanCherry"] = true;
			
			for(ii = 1; ii <= 20; ii++) addParticle(3, pacmanBoardX(tempX) + Math.random()*10-5, pacmanBoardY(tempY) + Math.random()*10-5);
		}
	}
	
	// *** Doors	
	tempDoorsOpen = false;
	
	for(key in o)
	{
		proto = oPrototype[o[key].prototype];

		if(proto.category == "ghost")
		{
			if(!o[key].released) { tempDoorsOpen = true; }
		}
	}
	
	if(tempDoorsOpen) { game["pacmanLevelDoorR"] += (90 - game["pacmanLevelDoorR"]) * 0.15; } else game["pacmanLevelDoorR"] += (0 - game["pacmanLevelDoorR"]) * 0.15;	
}


function pacmanObjectGhost(key)
{
	//context.globalAlpha = 0.2;
	//drawImage(manifest[o[key].manifest], pacmanBoardX(pacmanBoardGetX(o[key].x)), pacmanBoardY(pacmanBoardGetY(o[key].y)), true, true, false, false, false, true);
	//context.globalAlpha = 1;

	/*
	thisFrame = 1;
	if(game["pacmanGhostAniCount"] > 2) thisFrame = 2;
	if(game["pacmanGhostAniCount"] > 4) thisFrame = 3;
	if(game["pacmanGhostAniCount"] > 6) thisFrame = 2;
	*/
	
	if(Math.random() > 0.99 || o[key].eyeFrame == 0) o[key].eyeFrame = Math.ceil(Math.random()*3);
	
	thisManifest = o[key].manifest + "_frame_" + o[key].eyeFrame;
	if(o[key].status == "SCARED") thisManifest = o[key].manifest + "_scared";
	if(o[key].status == "EVIL") thisManifest = o[key].manifest + "_evil";
	if(o[key].status == "EYES") thisManifest = o[key].manifest + "_eyes";

	if(o[key].status == "VULNERABLE")
	{	
		if(o[key].statusCount < game["pacmanGhostVulnerableDuration"] - 50 || (o[key].statusCount > game["pacmanGhostVulnerableDuration"] - 45 && o[key].statusCount <= game["pacmanGhostVulnerableDuration"] - 40) || (o[key].statusCount > game["pacmanGhostVulnerableDuration"] - 35 && o[key].statusCount <= game["pacmanGhostVulnerableDuration"] - 30) || (o[key].statusCount > game["pacmanGhostVulnerableDuration"] - 25 && o[key].statusCount <= game["pacmanGhostVulnerableDuration"] - 20) || (o[key].statusCount > game["pacmanGhostVulnerableDuration"] - 15 && o[key].statusCount <= game["pacmanGhostVulnerableDuration"] - 10) || (o[key].statusCount > game["pacmanGhostVulnerableDuration"] - 5 && o[key].statusCount <= game["pacmanGhostVulnerableDuration"] - 0) ) thisManifest = o[key].manifest + "_vulnerable";
	}
	
	o[key].statusCount++;

	if(o[key].statusCount > 25 && o[key].status == "SCARED") o[key].status = "";
	if(o[key].statusCount > game["pacmanGhostVulnerableDuration"] && o[key].status == "VULNERABLE") o[key].status = "";
	
	if(o[key].status == "EYES")
	{
		context.globalAlpha = (game["pulsate"]/4+0.75);
		drawImage(manifest[thisManifest], o[key].x, o[key].y, manifest[thisManifest].width * (game["pulsateCos"]/4+0.75), manifest[thisManifest].height * (game["pulsate"]/4+0.75), false, false, false, true);						
	}
	else
	{
		if(o[key].r == 0 || o[key].r == 270) tempMirror = true; else tempMirror = false;
		
		if(o[key].spawnCount > 0)
		{
			context.globalAlpha = (10-o[key].spawnCount)/10;
			for(i=1; i<=5; i++) addParticle(13, o[key].x + Math.random()*30-15, o[key].y + 15+Math.random()*5);
		}
		
		drawImage(manifest[thisManifest], o[key].x, o[key].y, true, true, false, tempMirror, false, true);		
	}
}


function pacmanRenderGhost(key)
{	
	//tempOldCord = pacmanBoardGetX(o[key].x) + "," + pacmanBoardGetY(o[key].y);
	
	if(typeof o[key].spawnCount === "undefined") o[key].spawnCount = 10;
	
	
	if(o[key].status == "EYES")
	{
		o[key].statusCount++;
		//console.log(o[key].statusCount);
		
		o[key].x += o[key].eyesMoveX;
		o[key].y += o[key].eyesMoveY;
		
		if(o[key].statusCount >= 800)
		{
			playSound("release");
			
			o[key].x = pacmanBoardX(game["pacmanGhostSpawnX"]);
			o[key].y = pacmanBoardY(game["pacmanGhostSpawnY"]);
			o[key].status = "";
			o[key].r = 90;
			
			o[key].released = false;
			o[key].trapped = true;
			
			o[key].spawnCount = 10;
		}
		
	}
	else
	{
		if(pacmanBoardGetX(o[key].x) == game["pacmanGhostSpawnX"] && pacmanBoardGetY(o[key].y) == game["pacmanGhostSpawnY"] && o[key].spawnCount > 0)
		{
			o[key].spawnCount--;
			//console.log("Spawn: " + o[key].spawnCount);
		}
		else
		{
			
			
			thisSpeed = o[key].speed;
			if(o[key].status == "VULNERABLE") thisSpeed = o[key].speedVulnerable;
			
			for(s = 1; s <= thisSpeed; s++)
			{
				o[key].x += pacmanBoardMX(o[key].r);
				o[key].y += pacmanBoardMY(o[key].r);
			
				if(pacmanIsTrueCord(o[key].x, o[key].y))
				{
		
					if(pacmanLevel[pacmanBoardGetX(o[key].x)][pacmanBoardGetY(o[key].y)] == "<" || pacmanLevel[pacmanBoardGetX(o[key].x)][pacmanBoardGetY(o[key].y)] == ">")
					{
						pacmanAniTeleport(pacmanBoardGetY(o[key].y));
																
						if(pacmanLevel[pacmanBoardGetX(o[key].x)][pacmanBoardGetY(o[key].y)] == "<") o[key].x = pacmanBoardX(30);
						else if(pacmanLevel[pacmanBoardGetX(o[key].x)][pacmanBoardGetY(o[key].y)] == ">") o[key].x = pacmanBoardX(1);
	
						
						
					}
					else
					{
						if(pacmanLevel[pacmanBoardGetX(o[key].x)][pacmanBoardGetY(o[key].y)] == "r")
						{	
							//console.log("Release " + key);
							o[key].released = true;
						}
						
						tempFound = false;
						
						while(!tempFound)
						{
							tempRandom = Math.ceil(Math.random()*4);
							
							// *** Right
							if(tempRandom == 1 && o[key].r != 180 && !pacmanLevelWall(pacmanBoardGetX(o[key].x)+1, pacmanBoardGetY(o[key].y), o[key].released))
							{
								o[key].r = 0;
								tempFound = true;
							}
							
							// *** Up
							if(tempRandom == 2 && o[key].r != 270 && !pacmanLevelWall(pacmanBoardGetX(o[key].x), pacmanBoardGetY(o[key].y)-1, o[key].released))
							{
								o[key].r = 90;
								tempFound = true;
							}
							
							// *** Left
							if(tempRandom == 3 && o[key].r != 0 && !pacmanLevelWall(pacmanBoardGetX(o[key].x)-1, pacmanBoardGetY(o[key].y), o[key].released))
							{
								o[key].r = 180;
								tempFound = true;
							}
							
							// *** Down
							if(tempRandom == 4 && o[key].r != 90 && !pacmanLevelWall(pacmanBoardGetX(o[key].x), pacmanBoardGetY(o[key].y)+1, o[key].released))
							{
								o[key].r = 270;
								tempFound = true;
							}
						}
					}						
				}
			}
			
			tempDistance = Math.ceil(Math.sqrt(Math.pow(o[key].x - game["pacmanTrueX"], 2) + Math.pow(o[key].y - game["pacmanTrueY"], 2)));
			
			if(tempDistance < 40)
			{
				if(o[key].status == "VULNERABLE")							
				{
					console.log("VULNERABLE");
					playSound("ball");
					playSound("chime_positive");
					
					for(i = 1; i <= 15; i++)
					{
						addParticle(10, o[key].x + Math.random()*30-15, o[key].y + Math.random()*30-15);
					}
					
					game["score"] += 75;
					
					o[key].status = "EYES";
					o[key].statusCount = 0;
					
					o[key].eyesMoveX = (pacmanBoardX(game["pacmanGhostSpawnX"]) - o[key].x) / 400;
					o[key].eyesMoveY = (pacmanBoardY(game["pacmanGhostSpawnY"]) - o[key].y) / 400;
					
					
					/*
					o[key].x = pacmanBoardX(game["pacmanGhostSpawnX"]);
					o[key].y = pacmanBoardY(game["pacmanGhostSpawnY"]);
					*/
				}
				else
				{
					//console.log("PACMAN DEAD");
					
					playSound("caught");
					game["pacmanStatus"] = "CAUGHT";
					game["pacmanStatusCount"] = 20;
																		
					o[key].status = "EVIL";
	
					game["pacmanLives"]--;
				}
			}
		}
	}
}

function pacmanDrawLevel()
{
	for(i = 1; i <= 30; i++)
	{
		for(j = 1; j <= 30; j++)
		{
			if(pacmanLevel[i][j] == "X")
			{
				/*
				context.globalAlpha = 1;
				drawImage(manifest["pacman_level_wall"], pacmanBoardX(i), pacmanBoardY(j), true, true, false, false, false, true);
				context.globalAlpha = 1;
				*/
			}		

			if(pacmanLevel[i][j] == ".")
			{
				//drawImage(manifest["pacman_level_dot"], pacmanBoardX(i), pacmanBoardY(j), true, true, false, false, false, true);
				
				/* eerste letter geel kleuren
				if((j <= 14 && pacmanLevelVal[i][j] == pacmanCurrentLetterTop()) || (j > 14 && pacmanLevelVal[i][j] == pacmanCurrentLetterBottom()))
				{
					spot["PACMAN_LEVEL_LETTER"].color = "#FFFF00";
				}
				else
				{
					spot["PACMAN_LEVEL_LETTER"].color = "#92a2af";				
				}
				*/
				
				drawText(pacmanLevelVal[i][j], "PACMAN_LEVEL_LETTER", pacmanBoardX(i), pacmanBoardY(j) + 10)
			}		

			if(pacmanLevel[i][j] == "o")
			{
				context.globalAlpha = (game["pulsateCos"]*0.25+0.75);
				drawImage(manifest["pacman_level_ball"], pacmanBoardX(i), pacmanBoardY(j), manifest["pacman_level_ball"].width, manifest["pacman_level_ball"].height, false, false, false, true);
				context.globalAlpha = 1;
			}		

			if(pacmanLevel[i][j] == "c")
			{
				addParticle(13, pacmanBoardX(i), pacmanBoardY(j));
				drawImage(manifest["pacman_level_cherry"], pacmanBoardX(i), pacmanBoardY(j), manifest["pacman_level_cherry"].width * (game["pulsate"]*0.25+0.75), manifest["pacman_level_cherry"].height * (game["pulsate"]*0.25+0.75), false, false, false, true);
			}		

			if(pacmanLevel[i][j] == "}")
			{
				drawImage(manifest["pacman_level_door_left"], pacmanBoardX(i)-6, pacmanBoardY(j), true, true, game["pacmanLevelDoorR"], false, false, true);
			}		

			if(pacmanLevel[i][j] == "{")
			{
				drawImage(manifest["pacman_level_door_right"], pacmanBoardX(i)+6, pacmanBoardY(j), true, true, -game["pacmanLevelDoorR"], false, false, true);
			}	
		}
	}
}

function pacmanDrawPacman(thisPacmanColor)
{
	tempExtraX = pacmanBoardMX(game["pacmanR"])*game["pacmanFrame"];
	tempExtraY = pacmanBoardMY(game["pacmanR"])*game["pacmanFrame"];
	
	//context.globalAlpha = 0.25;
	//drawImage(manifest["pacman_1"], pacmanBoardX(game["pacmanX"]), pacmanBoardY(game["pacmanY"]), true, true, game["pacmanR"], false, false, true);
	//context.globalAlpha = 1;
	
	extraPi = 0;
	if(game["pacmanR"] == 90) extraPi = -Math.PI*0.5;
	if(game["pacmanR"] == 180) extraPi = -Math.PI;
	if(game["pacmanR"] == 270) extraPi = -Math.PI*1.5;
	
	
	tempPF = game["pacmanFrame"];
	if(tempPF < 0) tempPF = 0;
	
	game["pacmanTrueX"] = pacmanBoardX(game["pacmanX"]) + tempExtraX;
	game["pacmanTrueY"] = pacmanBoardY(game["pacmanY"]) + tempExtraY;

	if(game["pacmanStatus"] == "CAUGHT")
	{
		if(game["pacmanStatusCount"] < 55)
		{
			context.beginPath();
			context.globalAlpha = 0.4;
			context.fillStyle = "#000000";
			context.arc(game["pacmanTrueX"]+3, game["pacmanTrueY"]+3, 17, Math.PI*0.0 + extraPi + game["pacmanStatusCount"]/20, Math.PI*2.0 + extraPi - game["pacmanStatusCount"]/20, false);
			context.lineTo(pacmanBoardX(game["pacmanX"]) + tempExtraX, pacmanBoardY(game["pacmanY"]) + tempExtraY);
			context.closePath();
			context.fill();

			context.beginPath();
			context.globalAlpha = 1;
			context.fillStyle = thisPacmanColor;
			context.arc(game["pacmanTrueX"], game["pacmanTrueY"], 17, Math.PI*0.0 + extraPi + game["pacmanStatusCount"]/20, Math.PI*2.0 + extraPi - game["pacmanStatusCount"]/20, false);
			context.lineTo(pacmanBoardX(game["pacmanX"]) + tempExtraX, pacmanBoardY(game["pacmanY"]) + tempExtraY);
			context.closePath();
			context.fill();

			if(game["pacmanStatusCount"] == 50) playSound("caught2");
		}
		else if(game["pacmanStatusCount"] >= 55 && game["pacmanStatusCount"] < 72)
		{			
			context.beginPath();
			context.globalAlpha = 0.4;
			context.fillStyle = "#000000";
			context.arc(game["pacmanTrueX"]+3, game["pacmanTrueY"]+3, 17 - (game["pacmanStatusCount"]-55), Math.PI*0.0 + extraPi + 55/20, Math.PI*2.0 + extraPi - 55/20, false);
			context.lineTo(pacmanBoardX(game["pacmanX"]) + tempExtraX, pacmanBoardY(game["pacmanY"]) + tempExtraY);
			context.closePath();
			context.fill();				

			context.beginPath();
			context.globalAlpha = 1;
			context.fillStyle = thisPacmanColor;
			context.arc(game["pacmanTrueX"], game["pacmanTrueY"], 17 - (game["pacmanStatusCount"]-55), Math.PI*0.0 + extraPi + 55/20, Math.PI*2.0 + extraPi - 55/20, false);
			context.lineTo(pacmanBoardX(game["pacmanX"]) + tempExtraX, pacmanBoardY(game["pacmanY"]) + tempExtraY);
			context.closePath();
			context.fill();				
		}
		else if(game["pacmanStatusCount"] == 72)
		{
			playSound("explosion");
			
			for(i = 1; i <= 100; i++)
			{
				addParticle(Math.ceil(Math.random() * 8), game["pacmanTrueX"], game["pacmanTrueY"]);
			}
			
			for(key in o)
			{
				if(o[key].category == "ghost")
				{
					tempDistance = Math.ceil(Math.sqrt(Math.pow(o[key].x - game["pacmanTrueX"], 2) + Math.pow(o[key].y - game["pacmanTrueY"], 2)));

					if(tempDistance < 200)
					{
						o[key].status = "SCARED";
						o[key].statusCount = 0;	
					}
				}
			}	
		}	
	}
	else
	{				
		context.beginPath();
		context.globalAlpha = 0.4;
		context.fillStyle = "#000000";
		context.arc(game["pacmanTrueX"]+3, game["pacmanTrueY"]+3, 17, Math.PI*0.0 + extraPi + Math.abs(12-tempPF)/15, Math.PI*2.0 + extraPi - Math.abs(12-tempPF)/15, false);
		context.lineTo(pacmanBoardX(game["pacmanX"]) + tempExtraX, pacmanBoardY(game["pacmanY"]) + tempExtraY);
		context.closePath();
		context.fill();


		context.beginPath();
		context.globalAlpha = 1;
		context.fillStyle = thisPacmanColor;
		context.arc(game["pacmanTrueX"], game["pacmanTrueY"], 17, Math.PI*0.0 + extraPi + Math.abs(12-tempPF)/15, Math.PI*2.0 + extraPi - Math.abs(12-tempPF)/15, false);
		context.lineTo(pacmanBoardX(game["pacmanX"]) + tempExtraX, pacmanBoardY(game["pacmanY"]) + tempExtraY);
		context.closePath();
		context.fill();
		
		tempR = 0;
		tempFlip = false;
		
		if(game["pacmanR"] == 90) tempR = 90;
		if(game["pacmanR"] == 180) tempFlip = true;
		if(game["pacmanR"] == 270) tempR = 270;
		
		drawImage(manifest["pacman_eye"], game["pacmanTrueX"], game["pacmanTrueY"], true, true, tempR, tempFlip, false, true);
	}
		

}
