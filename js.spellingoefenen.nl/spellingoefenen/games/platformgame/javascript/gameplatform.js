
TileMaps();
var Tilemap = 0;

if (game["level"]<10)
{
InitTilemap(game["level"])
}
else 
{
InitTilemap(game["level"]-9)	
}


function InitTilemap(level){
	
Tilemap = eval("TilemapLevel" + level);
	
}

function StartLevel(levelnumber){
	
for (key in o){delete o[key]}
TileMaps();
	
if (levelnumber<10)
{	
InitTilemap(levelnumber);
}
else if (levelnumber<19){
InitTilemap(levelnumber-9);	
}
else {
InitTilemap(levelnumber-18);	
}
	
	

GameCharacter.OrientationLeft = false;
game["die"] = false;
game["levelscore"]=0;
game["spelword"]="";
game["spelledword"]="";
game["Camera-X"] = 0;
game["Camera-Y"] = 0;
game["keyfound"] = false;
game["GoNextLevel"] = 0;
newSpelWord();


}


function DrawLevel(){
	

	
	//if (GameCharacter.Grounded){GameCharacter.GroundedTimer += 1;}
	//else {GameCharacter.GroundedTimer = 0;}

	//if(game["CharacterY"]<200&&GameCharacter.GroundedTimer>2&&GameCharacter.Movement!="jump"){	
	//game["Camera-Y"]+=10;
	//game["CharacterY"]+=10;
	//for(key in o){o[key].y+=10}; 
	//for(key in particle){particle[key].x+=10}
	//}

ij = 25;
if(game["level"] == 4){ij = 85;}
		
	for (y=0; y<ij; y++){
		
	
		for (x=0; x<110; x++){
			 
			//Yposition = y * game["TileHeight"] + game["Y_SpaceScreenTop"] + game["Camera-Y"];
			
			Yposition = 700 - ((Tilemap.length/game["MapWidth"])*game["TileHeight"]) + y * game["TileHeight"] + game["Camera-Y"] ;
			Xposition = x * game["TileWidth"] - game["Camera-X"];
			ThisTile = y*game["MapWidth"]+x;
			
			if(Tilemap[ThisTile]==50){
				

				game["CharacterX"] = TileToXy(ThisTile,"x")-12;	
				game["CharacterY"] = TileToXy(ThisTile,"y")-32;

				Tilemap[ThisTile] = 0;


			}
			
			if(Tilemap[ThisTile]==51){

				thisKey = addO("leveldoor", TileToXy(ThisTile,"x")-40,TileToXy(ThisTile,"y")-83);
				o[thisKey].ani = 1;
				
				//o[thisKey].x = TileToXy(ThisTile,"x");
				//o[thisKey].y = TileToXy(ThisTile,"y");

				Tilemap[ThisTile] = 0;


			}
		
			if (game["PossibleTiles"].includes(Tilemap[ThisTile]) && Xposition<1200 && Xposition > -40){

				drawImage(manifest["tile_" + Tilemap[ThisTile] ], Xposition, Yposition);
			}
			
			else if (game["PossibleFruits"].includes(Tilemap[ThisTile])){
			
			if (Tilemap[ThisTile]==99){AddFruits(TileToXy(ThisTile,"x"),TileToXy(ThisTile,"y"),"orange");Tilemap[ThisTile]=0;}
			if (Tilemap[ThisTile]==98){AddFruits(TileToXy(ThisTile,"x"),TileToXy(ThisTile,"y"),"fraise");Tilemap[ThisTile]=0;}
			if (Tilemap[ThisTile]==97){AddFruits(TileToXy(ThisTile,"x"),TileToXy(ThisTile,"y"),"pear");Tilemap[ThisTile]=0;}	
	
			}
			
			else if (game["PossiblePlants"].includes(Tilemap[ThisTile])){
			
			AddPlants(Tilemap[ThisTile]-59,TileToXy(ThisTile,"x"),TileToXy(ThisTile,"y"))	
				Tilemap[ThisTile] = 0;
			}
			
			else if (game["PossibleItems"].includes(Tilemap[ThisTile])){
			
			AddItems(Tilemap[ThisTile]-69,TileToXy(ThisTile,"x"),TileToXy(ThisTile,"y"))
			Tilemap[ThisTile] = 0;
			}
			
			else if (Tilemap[ThisTile]==82){
			
			thisKey = addO("moving_platform", TileToXy(ThisTile,"x")-40,TileToXy(ThisTile,"y")-0);
			o[thisKey].movement = 1; //1 = moving right 0 = moving left
			Tilemap[ThisTile] = 0; 
			}
			
			else if (Tilemap[ThisTile]==83){
			
			thisKey = addO("moving_platform", TileToXy(ThisTile,"x")-40,TileToXy(ThisTile,"y")-0);
			o[thisKey].movement = 3; //1 = moving right 0 = moving left
			Tilemap[ThisTile] = 0; 
			}
			
			else if (Tilemap[ThisTile]==84){AddEnemie(TileToXy(ThisTile,"x"),TileToXy(ThisTile,"y")-24,"1");Tilemap[ThisTile]=0;}
			else if (Tilemap[ThisTile]==85){AddEnemie(TileToXy(ThisTile,"x"),TileToXy(ThisTile,"y")-24,"2");Tilemap[ThisTile]=0;}
			else if (Tilemap[ThisTile]==86){AddEnemie(TileToXy(ThisTile,"x"),TileToXy(ThisTile,"y")-37,"3");Tilemap[ThisTile]=0;}
			else if (Tilemap[ThisTile]==87){AddEnemie(TileToXy(ThisTile,"x"),TileToXy(ThisTile,"y")-28,"4");Tilemap[ThisTile]=0;}
			else if (Tilemap[ThisTile]==88){AddEnemie(TileToXy(ThisTile,"x"),TileToXy(ThisTile,"y")-28,"5");Tilemap[ThisTile]=0;}
		
	
		}
	
	
	
	}

}


function CharacterMovement(){
	
	//console.log("Ik ben aan het:"+GameCharacter.Movement)
	//console.log(XyToTile(game["mouseX"],game["mouseY"]))
	
	
	GameCharacter.centerX = game["CharacterX"]+30;
	GameCharacter.centerY = game["CharacterY"]+40;	

	CurrentCharacterTile = XyToTile(GameCharacter.centerX,GameCharacter.centerY);
	CharactersRightSite = XyToTile(GameCharacter.centerX + 20,GameCharacter.centerY+11);
	CharactersLeftSite = XyToTile(GameCharacter.centerX - 20,GameCharacter.centerY+11);
	CharactersLeftUnder = XyToTile(GameCharacter.centerX - 20,GameCharacter.centerY+41);
	CharactersRightUnder = XyToTile(GameCharacter.centerX + 20,GameCharacter.centerY+41);
	
	if (keyPressed("UP")&&GameCharacter.Movement!="fall"&&!game["die"]&&game["GoNextLevel"]==0||game["trampoline"]&&GameCharacter.Movement!="fall"){GameCharacter.Movement="jump";}
	else if(GameCharacter.Movement=="jump"){GameCharacter.Movement="fall";GameCharacter.JumpCounter=0;}
	
	if (game["trampoline"]&&GameCharacter.JumpCounter>0){for (key in Tilemap){if (Tilemap[key] == 81){Tilemap[key] = 80;playSound("trampoline");}}}


	if (GameCharacter.Movement=="jump")
	{
		GameCharacter.JumpCounter+=1;

		//if(GameCharacter.JumpCounter<7){game["CharacterY"]-=27;}
		//else if(GameCharacter.JumpCounter>6&&GameCharacter.JumpCounter<10){game["CharacterY"]-=5;}
		//else if(GameCharacter.JumpCounter>9){GameCharacter.Movement="fall";GameCharacter.JumpCounter=0;}
		
		
		if(game["CharacterY"]<200){
			
			if(GameCharacter.JumpCounter<7){
				ChangeYcamera(+27)
				if(game["trampoline"]){ChangeYcamera(+22)}
			}
			else if(GameCharacter.JumpCounter>6&&GameCharacter.JumpCounter<10){ChangeYcamera(+5);if(game["trampoline"]){ChangeYcamera(+5);}}
			else if(GameCharacter.JumpCounter>9){GameCharacter.Movement="fall";GameCharacter.JumpCounter=0;game["trampoline"]=false;}
					
			}
		else{
			
		if(GameCharacter.JumpCounter<7){
			game["CharacterY"]-=27;
			if(game["trampoline"]){game["CharacterY"]-=22}							   
		}		
		else if(GameCharacter.JumpCounter>6&&GameCharacter.JumpCounter<10){game["CharacterY"]-=5;if(game["trampoline"]){game["CharacterY"]-=5}}
		else if(GameCharacter.JumpCounter>9){GameCharacter.Movement="fall";GameCharacter.JumpCounter=0;game["trampoline"]=false;}
			
			
		}

	}


	
	//console.log(GameCharacter.Movement)

	CharacterDistanceToFloor = 0;
	
	for  (i=0; CharacterDistanceToFloor==0; i++){
	Distance = XyToTile(GameCharacter.centerX,GameCharacter.centerY+i);
	if (Tilemap[Distance]!="0"){CharacterDistanceToFloor = i;}
	}
		
	if (CharacterDistanceToFloor < (46 + (GameCharacter.Ycorrection*-1)) && CharacterDistanceToFloor > 15 && game["PossibleTiles"].includes(Tilemap[Distance])||game["GroundTiles"].includes(Tilemap[CurrentCharacterTile])){//Calc grounded
		
		
	
		GameCharacter.Grounded=true;


		if(GameCharacter.Movement=="fall"){GameCharacter.Movement="idle";GameCharacter.JumpCounter=0;}

		if(GameCharacter.Movement!="jump"){
			
			if (game["PossibleTiles"].includes(Tilemap[CurrentCharacterTile+game["MapWidth"]])){
			game["CharacterY"]= TileToXy(CurrentCharacterTile,"y")-30 - (game["GoNextLevel"]/2);
			}
			else {
			game["CharacterY"]= TileToXy(CurrentCharacterTile+game["MapWidth"],"y")-30 - (game["GoNextLevel"]/2);	
			}
			
			
			ropeladder = [32,33,35];
			if(ropeladder.includes(Tilemap[CurrentCharacterTile+game["MapWidth"]])){game["CharacterY"]+=10;}	
			
		}
				
		if (Tilemap[CurrentCharacterTile+game["MapWidth"]]==80){ // trampoline
		game["CharacterY"]+=12;Tilemap[CurrentCharacterTile+game["MapWidth"]]=81;game["trampoline"]=true;
		}
		
		if(game["GoNextLevel"]>0){game["CharacterY"]-=10;}
		//console.log("Onder de voetjes:" + Tilemap[CurrentCharacterTile+game["MapWidth"]])	

	}
	else{

	if (!game["MovingPlatform"]){GameCharacter.Grounded=false;}
	if(GameCharacter.Movement!="jump"&&GameCharacter.Movement!="fall"&&!game["MovingPlatform"]){GameCharacter.Movement="fall"}

	}	
	
	
	if(game["GroundTiles"].includes(Tilemap[CharactersRightSite])||GameCharacter.Movement=="fall"&&game["GroundTiles"].includes(Tilemap[CharactersRightUnder])){
		GameCharacter.CanMoveRight=false;
		game["CharacterX"] = TileToXy(CurrentCharacterTile,"x")-10;
		if(game["GroundTiles"].includes(Tilemap[CurrentCharacterTile])){game["CharacterX"]-=30}
		
	}
	else{GameCharacter.CanMoveRight=true;}
		
	if(game["GroundTiles"].includes(Tilemap[CharactersLeftSite])||GameCharacter.Movement=="fall"&&game["GroundTiles"].includes(Tilemap[CharactersLeftUnder])){
		GameCharacter.CanMoveLeft=false;
		game["CharacterX"] = TileToXy(CurrentCharacterTile,"x")-17;
		if(game["GroundTiles"].includes(Tilemap[CurrentCharacterTile])){game["CharacterX"]+=30}
		
	}
	else{GameCharacter.CanMoveLeft=true;}
	
	//console.log(GameCharacter.centerX-TileToXy(CurrentCharacterTile,"x"))
	
	

	
	if (keyPressed("LEFT") && GameCharacter.Grounded && GameCharacter.Movement!="jump"||keyPressed("RIGHT")&& GameCharacter.Grounded && GameCharacter.Movement!="jump"){
		GameCharacter.Movement="walk";
		GameCharacter.WalkAni+=1;
		if (GameCharacter.WalkAni==9){GameCharacter.WalkAni=1};
		} 
	else if (GameCharacter.Movement=="walk"){GameCharacter.Movement="idle";}
	
	
	if (keyPressed("LEFT")&& !game["die"] && game["GoNextLevel"]==0){
		GameCharacter.OrientationLeft = true;
		if(GameCharacter.CanMoveLeft && game["CharacterX"]>450){game["CharacterX"]-=10;}
		else if(GameCharacter.CanMoveLeft && game["Camera-X"]>0){ChangeXcamera(-10)}
		else if(game["CharacterX"]>-6 && GameCharacter.CanMoveLeft){game["CharacterX"]-=10;}
	}
		if (keyPressed("RIGHT")&&!game["die"] && game["GoNextLevel"]==0){
		GameCharacter.OrientationLeft = false;
		if(GameCharacter.CanMoveRight && game["CharacterX"]<500){game["CharacterX"]+=10;}
		else if (GameCharacter.CanMoveRight){ChangeXcamera(10)}
	}


	if (GameCharacter.Movement=="fall")
	{	
		
		GameCharacter.JumpCounter+=1;
		
		if(game["CharacterY"]>200  && game["Camera-Y"] > 0)
		{
			
			if(GameCharacter.JumpCounter<4){
			ChangeYcamera(-5)
			}
			else{
			ChangeYcamera(-27)
			}	
			
		}
		
		else
		{
			if(GameCharacter.JumpCounter<4){game["CharacterY"]+=5;}
			else{game["CharacterY"]+=27;}	
		}
		
	
		if(game["Camera-Y"]<0){
		Difference = 0 - game["Camera-Y"];
		ChangeYcamera(Difference);
		}
		
	}	
	
	if(game["CharacterY"]>750||Tilemap[CurrentCharacterTile+game["MapWidth"]]=="30"){if(!game["die"]){playSound("die");}game["die"]=true;}
	
	if(game["die"])
	{
		GameCharacter.DieAni+=1;if(GameCharacter.DieAni==5){GameCharacter.DieAni=1};
		game["CharacterY"]+=10;
		game["DieTimer"]+=1
		if (game["lives"]==1){game["gameover"] = true;}
		
		if (game["DieTimer"]>30)
		{
		StartLevel(game["level"]);
		game["lives"]-=1;		
		}
		
		
		//if(game["DieTimer"])
	}
	else if (game["DieTimer"]>0){game["DieTimer"]-=1;}
		
	//console.log("YCAMERA = "+ game["Camera-Y"]);
	//console.log(700-(Tilemap.length/game["MapWidth"])*game["TileHeight"]);
	
	
}


function DrawCharacter(){
	
	
	if(game["die"]){drawImage(manifest["die"+GameCharacter.DieAni],game["CharacterX"],game["CharacterY"],60,80,false,GameCharacter.OrientationLeft,false,false);}	
	else if(game["GoNextLevel"]>0){
		context.globalAlpha = 1 - game["GoNextLevel"]/20;
		if (game["GoNextLevel"]>10){context.globalAlpha=0;}
		drawImage(manifest["succes"],game["CharacterX"],game["CharacterY"],60,80,false,GameCharacter.OrientationLeft,false,false);
		context.globalAlpha = 1;
		
	}
	
	else if(GameCharacter.Movement=="idle"){drawImage(manifest[GameCharacter.Movement+"1"],game["CharacterX"],game["CharacterY"]+GameCharacter.Ycorrection,60,80,false,GameCharacter.OrientationLeft,false,false);}
	else if(GameCharacter.Movement=="jump"||GameCharacter.Movement=="fall"){drawImage(manifest["jump"],game["CharacterX"],game["CharacterY"],60,80,false,GameCharacter.OrientationLeft,false,false)}
	
	else if(GameCharacter.Movement=="walk"){drawImage(manifest["walk"+GameCharacter.WalkAni],game["CharacterX"],game["CharacterY"]+GameCharacter.Ycorrection,60,80,false,GameCharacter.OrientationLeft,false,false)}

	
	
	//console.log(GameCharacter.OrientationLeft);

	//context.fillRect(game["CharacterX"]+30, game["CharacterY"]+40, 5, 5);	
		
}	



function AddCharacter(x,y){
	
	GameCharacter = new Object;	

	GameCharacter.CanMoveRight = true;
	GameCharacter.CanMoveLeft = true;
	GameCharacter.CanMoveUp = true;
	GameCharacter.Grounded = false;

	GameCharacter.Movement = "idle"
	GameCharacter.JumpCounter = 0;
	GameCharacter.GroundedTimer = 0;
	GameCharacter.OrientationLeft = false

	GameCharacter.centerX = game["CharacterX"]+30;
	GameCharacter.centerY = game["CharacterY"]+40;

	GameCharacter.WalkAni = 1;
	GameCharacter.DieAni = 1;
	GameCharacter.Ycorrection = 0;

	
}

function AddFruits(thisX,thisY,thisFruit){
	
thisKey = addO("fruits", thisX, thisY);
	
	
letters = game["spelword"].split("");

if(letters.length>2)
{
	o[thisKey].letter = letters[Math.floor(Math.random() * (letters.length))];
}
else 
{
	randomletter = "abcdefghijklmnopqrstuvwxyz"
	if (Math.random()>0.8){o[thisKey].letter = letters[Math.floor(Math.random() * (letters.length))];}
	else {o[thisKey].letter = randomletter[Math.floor(Math.random() * (randomletter.length))];}
}
	
o[thisKey].kind = thisFruit;
	
}


function AddEnemie(thisX,thisY,thisEnemie){
	
thisKey = addO("enemie", thisX, thisY);

o[thisKey].kind = thisEnemie;
o[thisKey].direction = 0; // 0 = left, 1 is right
	
o[thisKey].die = false;
o[thisKey].ani = 1;
	
if (thisEnemie == "1"||thisEnemie == "2")
{
	o[thisKey].width = 54; 
	o[thisKey].height = 70; 
	o[thisKey].speed = 3;
}
	
if (thisEnemie == "3")
{
	o[thisKey].width = 59; 
	o[thisKey].height = 85; 
	o[thisKey].speed = 5;
}
	
if (thisEnemie == "4")
{
	o[thisKey].width = 50; 
	o[thisKey].height = 80; 
	o[thisKey].speed = 4;
}
	
if (thisEnemie == "5")
{
	o[thisKey].width = 70; 
	o[thisKey].height = 75; 
	o[thisKey].speed = 3;
}
	
}



function AddPlants(thisPlant,thisX,thisY){
	
thisKey = addO("plants", thisX, thisY);
o[thisKey].x = thisX
o[thisKey].y = thisY
o[thisKey].kind = thisPlant;
	
}

function AddItems(thisItem,thisX,thisY){
	
thisKey = addO("items", thisX, thisY);
o[thisKey].x = thisX
o[thisKey].y = thisY
o[thisKey].kind = thisItem;
if (o[thisKey].kind == 10){o[thisKey].visual=false;}
	
}

function NeededLetterOnScreen(neededletter){
	
	for (key1 in o)
	{

			if(o[key1].category == "fruits" && o[key1].letter == neededletter && o[key1].x > -20 && o[key1].x < 1000)
			{
			return true;
			}

	}	
	
return false;
	
}




function CheckColissions()
{
	
game["MovingPlatform"] = false;	
	
aaa = 0;

	
for(key in o){
	
aaa +=1
	
}
	
	
for(key in o)
	{
		
		
		
	
		
		
		if(o[key].category=="moving_platform")
		{

			centerX = o[key].x + 30;
			centerY = o[key].y + 10;	
			
			RightSite = XyToTile(centerX + 30,centerY+10);
			LeftSite = XyToTile(centerX - 30,centerY+10);
			Above = XyToTile(centerX+10,centerY-60);
			Under = XyToTile(centerX,centerY+60);
			
			
			if (o[key].movement==0 && Tilemap[LeftSite] != "0"){o[key].movement = 1;}
			if (o[key].movement==1 && Tilemap[RightSite] != "0"){o[key].movement = 0;}
			if (o[key].movement==3 && Tilemap[Above] != "0"){o[key].movement = 4;}
			if (o[key].movement==4 && Tilemap[Under] != "0"){o[key].movement = 3;}
			
			
			if((GameCharacter.centerX-centerX)<30 && (GameCharacter.centerX-centerX)>-30 && (GameCharacter.centerY-centerY)<-10 && (GameCharacter.centerY-centerY)>-55)
			{

				GameCharacter.Grounded = true;
				game["MovingPlatform"] = true;
				
				if(GameCharacter.Movement=="fall"){GameCharacter.Movement="idle";GameCharacter.JumpCounter=0;game["CharacterY"]= o[key].y - 65;}

				if(GameCharacter.Movement!="jump"){
					
							
						
							if(o[key].movement==0)
							{
								game["CharacterY"]= o[key].y - 65;
								if(game["CharacterX"]>450){game["CharacterX"]-=5;}
								else{ChangeXcamera(-5);}
							}
							else if (o[key].movement==1)
							{
								game["CharacterY"]= o[key].y - 65;
								if(game["CharacterX"]<500){game["CharacterX"]+=5;}
								else{ChangeXcamera(5);}
							}
							else if (o[key].movement==3)
							{
								if(game["CharacterY"]<200){ChangeYcamera(5);}
								else {game["CharacterY"] -=5;}
								
							}
							else if (o[key].movement==4)
							{
								
								if(game["CharacterY"]>200 && game["Camera-Y"] > 0)
								{	
									
									ChangeYcamera(-5);
									if(game["Camera-Y"]<0){
									Difference = 0 - game["Camera-Y"];
									ChangeYcamera(Difference);	
									} 
								
								}
								else {game["CharacterY"] +=5}
							}

				}

			}

			
			
			
			if(o[key].movement==0)
			{
				o[key].x -= 5;
				
			}
			else if (o[key].movement==1)
			{
				o[key].x += 5;
				
			}
				
			else if (o[key].movement==3)
			{
				o[key].y -= 5;
				
			}
			
			else if (o[key].movement==4)
			{
				o[key].y += 5;
			}

		}

		
		
		
		
		if(o[key].category == "leveldoor"){
			
			centerX = o[key].x + 42;
			centerY = o[key].y + 61;
			
			if((GameCharacter.centerX-centerX)<7&&(GameCharacter.centerX-centerX)>-10&&(GameCharacter.centerY-centerY)<50&&(GameCharacter.centerY-centerY)>-50&&game["GoNextLevel"]<12) {
				
				if(o[key].ani<10&&GameCharacter.Movement=="idle"&&game["keyfound"]){o[key].ani +=1;}
				if(o[key].ani==9){playSound("levelup");}
				
				
			}
			
			else if(o[key].ani>1){o[key].ani -= 1;}
			
			if(o[key].ani==10||game["GoNextLevel"]>0){game["GoNextLevel"] +=1;}
			if(o[key].ani==9 && game["level"] == 9){game["score"] += 250;}
			if(o[key].ani==9 && game["level"] == 18){game["score"] += 250;}
			
		}
		
		
		if(o[key].category == "items" && o[key].kind == 10)//the key
		{
			
			if(game["levelscore"]>24 && o[key].visual==false){o[key].visual=true;game["TextTimer"] = 30;playSound("woohoo");}

			centerX = o[key].x + 22;
			centerY = o[key].y + 18;	
			if((GameCharacter.centerX-centerX)<50&&(GameCharacter.centerX-centerX)>-70&&(GameCharacter.centerY-centerY)<25&&(GameCharacter.centerY-centerY)>-25&&o[key].visual==true) 
				{

					o[key].y = 1000;
					for (a=-10;a<10;a++){
					addParticle(3,centerX+(a*3),centerY)
					}
					game["keyfound"] = true;
					playSound("woohoo");

				}	



		}

		
		
		if(o[key].category == "fruits")
		{
			
			
		neededletter = game["spelword"].split("")[game["spelledword"].length];	
		if (!NeededLetterOnScreen(neededletter) && o[key].x < 0 && o[key].x > -30 && Math.random() > 0.8 ||
		    !NeededLetterOnScreen(neededletter) && o[key].x > 1000 && o[key].x < 1030 && Math.random() > 0.8){o[key].letter = neededletter;}
			
			
		centerX = o[key].x + 22;
		centerY = o[key].y + 28;
				
			if((GameCharacter.centerX-centerX)<40&&(GameCharacter.centerX-centerX)>-40&&(GameCharacter.centerY-centerY)<35&&(GameCharacter.centerY-centerY)>-35) 
			{
				//neededletter = game["spelword"].split("")[game["spelledword"].length];
				//console.log("Neededletter =" + neededletter)
				

				if(o[key].letter==neededletter){

					playSound("getfruit");
					game["spelledword"]+= o[key].letter;
					game["score"] += 1;
					game["levelscore"] += 1;

					if(game["spelledword"]==game["spelword"])
					{

						newSpelWord();

						letters = game["spelword"].split("");
						for(key2 in o){if(o[key2].category=="fruits")
												{

													if(letters.length>2)
													{
														o[key2].letter = letters[Math.floor(Math.random() * (letters.length))];
													}
													else 
													{
														randomletter = "abcdefghijklmnopqrstuvwxyz"
														if (Math.random()>0.8){o[key2].letter = letters[Math.floor(Math.random() * (letters.length))];}
														else {o[key2].letter = randomletter[Math.floor(Math.random() * (randomletter.length))];}
													}

													//o[key2].letter = letters[Math.floor(Math.random() * (letters.length))]}


												}
									  
									    };


						tempLength = drawText(game["spelword"], "PLATFORM_SPELWORD", 700, 150, false, true);

						for (a=1;a<tempLength;a++){
						if(a%2==0)addParticle(3,spot["PLATFORM_SPELWORD"].x-tempLength/2+a,spot["PLATFORM_SPELWORD"].y-10)
						}

					}

				}
				else {	playSound("tick");}

				delete o[key];

				for (a=0;a<10;a++){
				addParticle(3,centerX,centerY)
				}
				
			}
			
			
		}
	
	
	}
		
	
}


function renderEnemie()
{
	
	GameCharacter.Ycorrection = 0;
	
	for (key in o){
		
		if(o[key].category == "enemie")
		{
			
			o[key].ani  += 1;
			if (o[key].ani > 7){o[key].ani = 1}
			
			if(!o[key].die){
				if (o[key].direction==0){o[key].x -= o[key].speed;}
				else if (o[key].direction==1){o[key].x += o[key].speed;}
			}
			
			if (o[key].direction==0){MoveLeft = true;}
			else if (o[key].direction==1){MoveLeft = false;}
				
			TurningTiles = [2,8,14,22,74];
			TempTile = XyToTile(o[key].x + 26, o[key].y + 80);
			UnderThisEnemie = Tilemap[TempTile];
			
			if (o[key].direction == 0){ThisTile = XyToTile(o[key].x, o[key].y);}
			else if (o[key].direction == 1){ThisTile = XyToTile(o[key].x + o[key].width, o[key].y);}
			ThisEnemyTile = Tilemap[ThisTile];
			
			
			if (TurningTiles.includes(UnderThisEnemie)||game["GroundTiles"].includes(ThisEnemyTile)||o[key].x < TileToXy(0,"x"))
			{	
				
				if(!o[key].die){
					if (o[key].direction == 0){o[key].direction = 1}
					else if (o[key].direction == 1){o[key].direction = 0}
				}
			}
			
			
			centerY = o[key].y + o[key].height/2;
			rightsite = o[key].x + o[key].width;
			centerX = o[key].x + (o[key].width/2);
			
			
		
			if (GameCharacter.centerX - centerX < 40 && centerX - GameCharacter.centerX < 40 && (GameCharacter.centerY - centerY) < 10 && (GameCharacter.centerY - centerY) > - 60)
			{
			
				if(game["trampoline"] && GameCharacter.JumpCounter < 4 ){TrampolineDie = true} 
				else{TrampolineDie=false}
				
				if (GameCharacter.Movement!="fall" && !o[key].die && !TrampolineDie) {if(!game["die"]){playSound("die");}game["die"]=true;}
				else if(!game["die"] && (GameCharacter.centerY - centerY) < 0) {
					if(!o[key].die){playSound("hitenemie");
					o[key].die = true;
					game["levelscore"] += 1;
						game["score"] += 1;				
								   }
				}
				
				if (GameCharacter.Movement=="walk" || GameCharacter.Movement=="idle"){
					if (GameCharacter.centerX - centerX < 25 && centerX - GameCharacter.centerX < 25){GameCharacter.Ycorrection=-25}
				}
				
				if (GameCharacter.Movement=="fall"){GameCharacter.Ycorrection=-25}
			}
			
			
			if(!o[key].die){
			drawImage(manifest["enemie" + o[key].kind + "walk" + o[key].ani],o[key].x, o[key].y,o[key].width,o[key].heigth,false,MoveLeft,false,false);		
			}
			else {	drawImage(manifest["enemie" + o[key].kind + "die"], o[key].x, o[key].y,o[key].width,o[key].heigth,false,MoveLeft,false,false);}
		
		}
						
	}
		
}

function ChangeYcamera(change){

game["Camera-Y"]+=change;
for(item in o){o[item].y+=change};
for(item in particle){if(particle[item].x<1100){particle[item].y+=change}}
	
}

function ChangeXcamera(change){

if (change<0 && (change*-1)>game["Camera-X"]){change = 0 - game["Camera-X"] }
game["Camera-X"]+=change;
for(item in o){o[item].x-=change};
for(item in particle){if(particle[item].x<1100){particle[item].x-=change}}

	
}


function XyToTile(x,y){

x = x + game["Camera-X"];
y = y - game["Camera-Y"] - 700 + (Tilemap.length/game["MapWidth"])*game["TileHeight"]
TilemapX = Math.floor(x/game["TileWidth"]);
TilemapY = Math.floor(y/game["TileHeight"]);
	
return (TilemapY * game["MapWidth"]) + TilemapX;

	
}

function TileToXy(TileNumber,XorY){
	
	
if (XorY == "x"){return ((TileNumber%game["MapWidth"])*game["TileWidth"])-game["Camera-X"] }
//if (XorY == "y"){return (700-(Tilemap.length/game["MapWidth"])*game["TileHeight"]) + game["Camera-Y"] + Math.floor(TileNumber/game["MapWidth"])*game["TileHeight"]}	
		
if (XorY == "y"){return 700-(Tilemap.length/game["MapWidth"])*game["TileHeight"] + game["Camera-Y"] + Math.floor(TileNumber/game["MapWidth"])*game["TileHeight"]}
	
}





	
