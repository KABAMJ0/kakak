// *** START
function resetGame()
{
	score = 0;
	game_status = "";
	
	level = 1;
	spelledWord = ""
	levelCorrectSpelwords = 0;
	spelledWordsCorrect = 0;
	play = true;
	sharkCount = 0;
	fishCount = 0;
	
	for(key in shark) delete shark[key];
	for (key in fish){fish[key].target = "true"}
	
	setLevel(level);
	
	//newSpelWord();
	
	
	addFish();
	addFish();
	addFish();
	addFish();
	addFish();
	
}

// *** End game
function endGame()
{
	console.log("endGame");
	
	if(highscore_email != "")
	{
		highscoreSubmit();	
	}
	else
	{
		highscoreView();
	}
}

function setLevel(thisLevel)
{
	
	for (key in shark){shark[key].phase = "AWAY"}
	for (key in fish){fish[key].target = "true"}
	
	playSound("cymbals");
	
	level = thisLevel;
	showLevelText = 100;
	showLevelTextType = "LEVEL";
	
	console.log("setLevel: " + level);
	
	
	if(level == 1){SharkChance = 0.997;MaxSwimmingSharks = 2;LightSharkChance = 0.999}
	if(level == 2){SharkChance = 0.99;MaxSwimmingSharks = 2;LightSharkChance = 0.99}
	if(level == 3){SharkChance = 0.98;MaxSwimmingSharks = 3;LightSharkChance = 0.96}
	if(level == 4){SharkChance = 0.96;MaxSwimmingSharks = 3;LightSharkChance = 0.9}
	if(level == 5){SharkChance = 0.98;MaxSwimmingSharks = 4;LightSharkChance = 0.85}
	if(level == 6){SharkChance = 0.97;MaxSwimmingSharks = 4;LightSharkChance = 0.8}
	if(level == 7){SharkChance = 0.97;MaxSwimmingSharks = 5;LightSharkChance = 0.7}
	if(level == 8){SharkChance = 0.96;MaxSwimmingSharks = 5;LightSharkChance = 0.6}
	if(level == 9){SharkChance = 0.95;MaxSwimmingSharks = 5;LightSharkChance = 0.5}
	if(level == 10){SharkChance = 0.94;MaxSwimmingSharks = 5;LightSharkChance = 0.4}
	
	
	
	if(level == 1)
	{
		manifestImage("ocean1_layer_1", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/ocean1_layer_1.png");
		manifestImage("ocean1_layer_2", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/ocean1_layer_2.png");
		manifestImage("ocean1_layer_3", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/ocean1_layer_3.png");
	}
	

	
}

// *** SPELWORDS
function newSpelWord()
{
	
	
	oldSpelWord = spelWord
	
	temp = spelPool.split(",");
		
	spelWord = temp[Math.floor(Math.random() * (temp.length - 1))];
	
	spelWord = spelWord.trim();
	
	temp = spelPool.split(",");
	
	ExtraSpelWord = temp[Math.floor(Math.random() * (temp.length - 1))];
	
	ExtraSpelWord = ExtraSpelWord.trim();
	
	

	
	addShark();


}



// *** Sharks / FALLING LETTERS
function addShark()
{
	sharkCount++;
	keyShark = "SHARK" + sharkCount;
	
	//console.log("Added shark " + keyShark);
	
	shark[keyShark] = new Object;

	shark[keyShark].size = 380;

	shark[keyShark].x = -120
	shark[keyShark].y = 100 + Math.random() * 400;
	shark[keyShark].y_start = shark[keyShark].y;
	shark[keyShark].y_speed = (Math.random() + 1) * sharkWobble;
	shark[keyShark].r = 0;
	shark[keyShark].x_speed = Math.random() * 2.5 + 2;
	shark[keyShark].r_speed = 1 + Math.random() * 5;
	shark[keyShark].ani = 1;
	shark[keyShark].name = keyShark;
	shark[keyShark].wordcount = 1;
	shark[keyShark].extraword = "undefined";
	
	addVictim(keyShark)
	
	shark[keyShark].model = 1;
	if(Math.random() > LightSharkChance){shark[keyShark].model = 2;shark[keyShark].size = 450;shark[keyShark].wordcount = 2;shark[keyShark].extraword = ExtraSpelWord;}
	
	
	
	shark[keyShark].phase = "SWIM";
	
	shark[keyShark].word = spelWord;
}


function addVictim(thisshark)
{
	
	for (key in fish){
	
		if(fish[key].name == "fish1" && fish[key].target == "true"){shark[thisshark].victim = 1; }
		else if(fish[key].name == "fish2" && fish[key].target == "true"){shark[thisshark].victim = 2; }
		else if(fish[key].name == "fish3" && fish[key].target == "true"){shark[thisshark].victim = 3; }
		else if(fish[key].name == "fish4" && fish[key].target == "true"){shark[thisshark].victim = 4; }
		else if(fish[key].name == "fish5" && fish[key].target == "true"){shark[thisshark].victim = 5; }
	

		
	}	
	

	
	if (shark[thisshark].victim == 1){fish["fish1"].target = false;}
	if (shark[thisshark].victim == 2){fish["fish2"].target = false;}
	if (shark[thisshark].victim == 3){fish["fish3"].target = false;}
	if (shark[thisshark].victim == 4){fish["fish4"].target = false;}
	if (shark[thisshark].victim == 5){fish["fish5"].target = false;}
	
	
	if (shark[thisshark].victim != 1 && shark[thisshark].victim != 2 && shark[thisshark].victim != 3 && shark[thisshark].victim != 4 && shark[thisshark].victim != 5)
		{shark[thisshark].victim = 999}
	
}




function addFish()
{
	fishCount++;
	keyfish = "fish" + fishCount;
	
	//console.log("Added fish " + keyfish);
	
	fish[keyfish] = new Object;
	fish[keyfish].x = 900 + Math.random() * 400;
	fish[keyfish].y = Math.random() * 400 + 50;
	fish[keyfish].y_speed = -3 + Math.random() * 6;
	fish[keyfish].r = 0;
	fish[keyfish].x_speed = 0;
	fish[keyfish].name = keyfish;
	
	
	fish[keyfish].ani = Math.floor(Math.random() * (10 - 1)) + 1;
	
	fish[keyfish].kindfish = Math.ceil(Math.random() * 4);
	//fish[keyfish].kindfish = 1;
	
	
	if (fish[keyfish].kindfish==1){fish[keyfish].maxani=47}
	if (fish[keyfish].kindfish==2){fish[keyfish].maxani=23}
	if (fish[keyfish].kindfish==3||fish[keyfish].kindfish==4){fish[keyfish].maxani=12}
	
	
	fish[keyfish].target = "true";
		
}



function addBomb()
{
	playSound("phaser");
	bombCount++;
	key = "BOMB" + bombCount;

	console.log("addBomb: " + key);
	
	bomb[key] = new Object;
	
	bomb[key].x = -1000 + Math.random() * 100;
	bomb[key].y = 650;
	
	bomb[key].x_speed = 22 + Math.random() * 2;
	bomb[key].y_speed = -25 + Math.random() * 2;
	
	
}

function addFallingLetter(thisShark)
{
	fallingLetterCount++;
	keyFL = "FALLINGLETTER" + fallingLetterCount;

	console.log("AddFallingLetter: " + keyShark + " -> " + keyFL);
	
	fallingLetter[keyFL] = new Object;

	fallingLetter[keyFL].size = shark[thisShark].size;
	fallingLetter[keyFL].x = shark[thisShark].x;
	fallingLetter[keyFL].y = shark[thisShark].y;
	fallingLetter[keyFL].x_speed = shark[thisShark].x_speed;
	fallingLetter[keyFL].y_speed = shark[thisShark].y_speed - 5;
	fallingLetter[keyFL].word = shark[thisShark].word;

	/*
	shark[keyShark].x = 0 - shark[keyShark].size - Math.random() * 100;
	shark[keyShark].y = 150 + Math.random() * 400;
	shark[keyShark].y_start = shark[keyShark].y;
	shark[keyShark].y_speed = (Math.random() + 1) * sharkWobble;
	shark[keyShark].r = 0;
	shark[keyShark].x_speed = ((shark[keyShark].size * 10) / (20 * 10)) * sharkSpeed;
	shark[keyShark].r_speed = 1 + Math.random() * 5;
	*/
	
	
}

function addExplosion(thisXExplosion, thisYExplosion, thisSize)
{
	explosionCount++;
	keyExplosion = "EXPLOSION" + explosionCount;
	
	//console.log("Added explosion " + keyExplosion);
	
	explosion[keyExplosion] = new Object;

	explosion[keyExplosion].x = thisXExplosion;
	explosion[keyExplosion].y = thisYExplosion;
	explosion[keyExplosion].x_speed = -3;
	explosion[keyExplosion].y_speed = 0;
	explosion[keyExplosion].ani = 1;
	explosion[keyExplosion].size = thisSize;
	
	playSound("explosion_sound");
	
}

function gameOver()
{
	
			// *** Game over!
			playSound("cymbals");
			showLevelText = 100;
			showLevelTextType = "GAME_OVER";					
	
}
// *** INTERACTION
function removeWord()
{
	spelledWord = "";
}

function removeKey()
{
	spelledWord = spelledWord.substring(0, spelledWord.length - 1);
}
		
function addKey(thisKey)
{
	if(showLevelText <= 0)
	{
		//console.log("keyPress " + thisKey);
		//if(showKeyboard) 
		
		playSound("tick");
		
		ButtonEffect(thisKey);
		
		spelledWord += thisKey;
		spelledWordFound = false;
		
		for(key in shark)
		{
			if(replaceSpecialChars(spelledWord).indexOf(replaceSpecialChars(shark[key].word)) >= 0 && shark[key].phase == "SWIM")
			{
				// *** Woord goed getypt!
				playSound("gunshot");
				
				if(shark[key].wordcount == 1){
					shark[key].phase = "AWAY";
					if(shark[key].victim != 999){fish["fish"+shark[key].victim].target = "true";}
					}
				setTimeout(function(){ spelledWord = "" }, 100);
				
				for(i = 1; i <= 10 + shark[key].word.length; i++) addStar(shark[key].x + (shark[key].word.length * 20 * Math.random()) - (shark[key].word.length * 20 / 2), shark[key].y + 40)
				shark[key].wordcount -= 1;
				shark[key].word = "undefined"
				spelledWordFound = true;
				
			}
			
			if(replaceSpecialChars(spelledWord).indexOf(replaceSpecialChars(shark[key].extraword)) >= 0 && shark[key].phase == "SWIM" && spelWord!="")
			{
				// *** Woord goed getypt!
				playSound("gunshot");
				
				if(shark[key].wordcount == 1){
					shark[key].phase = "AWAY";
					if(shark[key].victim != 999){fish["fish"+shark[key].victim].target = "true";}
					}
				
				setTimeout(function(){ spelledWord = "" }, 100);
				for(i = 1; i <= 10 + shark[key].extraword.length; i++) addStar(shark[key].x + (shark[key].extraword.length * 20 * Math.random()) - (shark[key].extraword.length * 20 / 2), shark[key].y + 60)
				shark[key].wordcount -= 1;
				shark[key].extraword = "undefined"
				spelledWordFound = true;
			}
			
			
			
			
			
		}
	
		if(spelledWordFound)
		{
			spelledWord = "";
			spelledWordsCorrect++;
			
			if(level == 1 && spelledWordsCorrect >= 20) setLevel(2);
			if(level == 2 && spelledWordsCorrect >= 40) setLevel(3);				
			if(level == 3 && spelledWordsCorrect >= 60) setLevel(4);
			if(level == 4 && spelledWordsCorrect >= 80) setLevel(5);
			if(level == 5 && spelledWordsCorrect >= 100) setLevel(6);
			if(level == 6 && spelledWordsCorrect >= 130) setLevel(7);				
			if(level == 7 && spelledWordsCorrect >= 160) setLevel(8);
			if(level == 8 && spelledWordsCorrect >= 190) setLevel(9);
			if(level == 9 && spelledWordsCorrect >= 220) setLevel(10);
			
		}
		

		//if(spelledWord == "level2") setLevel(2);
		//if(spelledWord == "level3") setLevel(3);
		//if(spelledWord == "level4") setLevel(4);
		//if(spelledWord == "level5") setLevel(5);
		//if(spelledWord == "level6") setLevel(6);
		//if(spelledWord == "level7") setLevel(7);
		//if(spelledWord == "level8") setLevel(8);
		//if(spelledWord == "level9") setLevel(9);
		//if(spelledWord == "level10") setLevel(10);
		
	}
}

function replaceSpecialChars(t)
{
	t = t.split("ä").join("a");
	t = t.split("á").join("a");
	t = t.split("à").join("a");

	t = t.split("ë").join("e");
	t = t.split("é").join("e");
	t = t.split("è").join("e");

	t = t.split("ï").join("i");
	t = t.split("í").join("i");
	t = t.split("î").join("i");

	t = t.split("ö").join("o");
	t = t.split("ó").join("o");
	t = t.split("ò").join("o");

	t = t.split("ü").join("u");
	t = t.split("ú").join("u");
	t = t.split("ù").join("u");

	t = t.split("-").join("");
	t = t.split("'").join("");
	t = t.split("`").join("");


	return(t);
}

function keyPress(e)
{
	e = e || window.event;
	
	if 	(e.keyCode == '16') 	{ if(Shift==1){Shift=0;} else {Shift = 1; }}
	
	if(e.keyCode >= '32' && e.keyCode <= '165'){ 	
	thisKey = String.fromCharCode(e.keyCode);
		
	if(e.keyCode == '65' && Shift == 0){addKey('a');} if (e.keyCode == '65' && Shift == 1){addKey('A');Shift = 0}
	if(e.keyCode == '66' && Shift == 0){addKey('b');} if (e.keyCode == '66' && Shift == 1){addKey('B');Shift = 0}
	if(e.keyCode == '67' && Shift == 0){addKey('c');} if (e.keyCode == '67' && Shift == 1){addKey('C');Shift = 0}
	if(e.keyCode == '68' && Shift == 0){addKey('d');} if (e.keyCode == '68' && Shift == 1){addKey('D');Shift = 0}
	if(e.keyCode == '69' && Shift == 0){addKey('e');} if (e.keyCode == '69' && Shift == 1){addKey('E');Shift = 0}
	if(e.keyCode == '70' && Shift == 0){addKey('f');} if (e.keyCode == '70' && Shift == 1){addKey('F');Shift = 0}
	if(e.keyCode == '71' && Shift == 0){addKey('g');} if (e.keyCode == '71' && Shift == 1){addKey('G');Shift = 0}
	if(e.keyCode == '72' && Shift == 0){addKey('h');} if (e.keyCode == '72' && Shift == 1){addKey('H');Shift = 0}
	if(e.keyCode == '73' && Shift == 0){addKey('i');} if (e.keyCode == '73' && Shift == 1){addKey('I');Shift = 0}
	if(e.keyCode == '74' && Shift == 0){addKey('j');} if (e.keyCode == '74' && Shift == 1){addKey('J');Shift = 0}
	if(e.keyCode == '75' && Shift == 0){addKey('k');} if (e.keyCode == '75' && Shift == 1){addKey('K');Shift = 0}
	if(e.keyCode == '76' && Shift == 0){addKey('l');} if (e.keyCode == '76' && Shift == 1){addKey('L');Shift = 0}
	if(e.keyCode == '77' && Shift == 0){addKey('m');} if (e.keyCode == '77' && Shift == 1){addKey('M');Shift = 0}
	if(e.keyCode == '78' && Shift == 0){addKey('n');} if (e.keyCode == '78' && Shift == 1){addKey('N');Shift = 0}
	if(e.keyCode == '79' && Shift == 0){addKey('o');} if (e.keyCode == '79' && Shift == 1){addKey('O');Shift = 0}
	if(e.keyCode == '80' && Shift == 0){addKey('p');} if (e.keyCode == '80' && Shift == 1){addKey('P');Shift = 0}
	if(e.keyCode == '81' && Shift == 0){addKey('q');} if (e.keyCode == '81' && Shift == 1){addKey('Q');Shift = 0}
	if(e.keyCode == '82' && Shift == 0){addKey('r');} if (e.keyCode == '82' && Shift == 1){addKey('R');Shift = 0}
	if(e.keyCode == '83' && Shift == 0){addKey('s');} if (e.keyCode == '83' && Shift == 1){addKey('S');Shift = 0}
	if(e.keyCode == '84' && Shift == 0){addKey('t');} if (e.keyCode == '84' && Shift == 1){addKey('T');Shift = 0}
	if(e.keyCode == '85' && Shift == 0){addKey('u');} if (e.keyCode == '85' && Shift == 1){addKey('U');Shift = 0}
	if(e.keyCode == '86' && Shift == 0){addKey('v');} if (e.keyCode == '86' && Shift == 1){addKey('V');Shift = 0}
	if(e.keyCode == '87' && Shift == 0){addKey('w');} if (e.keyCode == '87' && Shift == 1){addKey('W');Shift = 0}
	if(e.keyCode == '88' && Shift == 0){addKey('x');} if (e.keyCode == '88' && Shift == 1){addKey('X');Shift = 0}
	if(e.keyCode == '89' && Shift == 0){addKey('y');} if (e.keyCode == '89' && Shift == 1){addKey('Y');Shift = 0}
	if(e.keyCode == '90' && Shift == 0){addKey('z');} if (e.keyCode == '90' && Shift == 1){addKey('Z');Shift = 0}
	
	if(e.keyCode == '48' && Shift == 0){addKey('0');} 
	if(e.keyCode == '49' && Shift == 0){addKey('1');}
	if(e.keyCode == '50' && Shift == 0){addKey('2');} 
	if(e.keyCode == '51' && Shift == 0){addKey('3');} 
	if(e.keyCode == '52' && Shift == 0){addKey('4');} 
	if(e.keyCode == '53' && Shift == 0){addKey('5');} 
	if(e.keyCode == '54' && Shift == 0){addKey('6');} 
	if(e.keyCode == '55' && Shift == 0){addKey('7');}
	if(e.keyCode == '56' && Shift == 0){addKey('8');} 
	if(e.keyCode == '57' && Shift == 0){addKey('9');}
	if(e.keyCode == '32' && Shift == 0){addKey(' ');}
	}
	
	 				
	
	if(e.keyCode == '13') removeWord();
	if(e.keyCode == '8') removeKey();
}


function type(thisX, thisY){
	
	
	
		if(showKeyboard)
			{		
					if(hitTest(thisX, thisY, "Q", "q") && Shift==1) { addKey("Q"); }; if(hitTest(thisX, thisY, "Q", "q") && Shift==0){addKey("q");}
					if(hitTest(thisX, thisY, "W", "w") && Shift==1) { addKey("W"); }; if(hitTest(thisX, thisY, "W", "e") && Shift==0){addKey("w");}
					if(hitTest(thisX, thisY, "E", "e") && Shift==1) { addKey("E"); }; if(hitTest(thisX, thisY, "E", "r") && Shift==0){addKey("e");}
					if(hitTest(thisX, thisY, "R", "r") && Shift==1) { addKey("R"); }; if(hitTest(thisX, thisY, "R", "t") && Shift==0){addKey("r");}
					if(hitTest(thisX, thisY, "T", "t") && Shift==1) { addKey("T"); }; if(hitTest(thisX, thisY, "T", "t") && Shift==0){addKey("t");}
					if(hitTest(thisX, thisY, "Y", "y") && Shift==1) { addKey("Y"); }; if(hitTest(thisX, thisY, "Y", "y") && Shift==0){addKey("y");}
					if(hitTest(thisX, thisY, "U", "u") && Shift==1) { addKey("U"); }; if(hitTest(thisX, thisY, "U", "u") && Shift==0){addKey("u");}
					if(hitTest(thisX, thisY, "I", "i") && Shift==1) { addKey("I"); }; if(hitTest(thisX, thisY, "I", "i") && Shift==0){addKey("i");}
					if(hitTest(thisX, thisY, "O", "o") && Shift==1) { addKey("O"); }; if(hitTest(thisX, thisY, "O", "o") && Shift==0){addKey("o");}
					if(hitTest(thisX, thisY, "P", "p") && Shift==1) { addKey("P"); }; if(hitTest(thisX, thisY, "P", "p") && Shift==0){addKey("p");}
					if(hitTest(thisX, thisY, "A", "a") && Shift==1) { addKey("A"); }; if(hitTest(thisX, thisY, "A", "a") && Shift==0){addKey("a");}
					if(hitTest(thisX, thisY, "S", "s") && Shift==1) { addKey("S"); }; if(hitTest(thisX, thisY, "S", "s") && Shift==0){addKey("s");}
					if(hitTest(thisX, thisY, "D", "d") && Shift==1) { addKey("D"); }; if(hitTest(thisX, thisY, "D", "d") && Shift==0){addKey("d");}
					if(hitTest(thisX, thisY, "F", "f") && Shift==1) { addKey("F"); }; if(hitTest(thisX, thisY, "F", "f") && Shift==0){addKey("f");}
					if(hitTest(thisX, thisY, "G", "g") && Shift==1) { addKey("G"); }; if(hitTest(thisX, thisY, "G", "g") && Shift==0){addKey("g");}
					if(hitTest(thisX, thisY, "H", "h") && Shift==1) { addKey("H"); }; if(hitTest(thisX, thisY, "H", "h") && Shift==0){addKey("h");}
					if(hitTest(thisX, thisY, "J", "j") && Shift==1) { addKey("J"); }; if(hitTest(thisX, thisY, "J", "j") && Shift==0){addKey("j");}
					if(hitTest(thisX, thisY, "K", "k") && Shift==1) { addKey("K"); }; if(hitTest(thisX, thisY, "K", "k") && Shift==0){addKey("k");}
					if(hitTest(thisX, thisY, "L", "l") && Shift==1) { addKey("L"); }; if(hitTest(thisX, thisY, "L", "l") && Shift==0){addKey("l");}
					if(hitTest(thisX, thisY, "Z", "z") && Shift==1) { addKey("Z"); }; if(hitTest(thisX, thisY, "Z", "z") && Shift==0){addKey("z");}
					if(hitTest(thisX, thisY, "X", "x") && Shift==1) { addKey("X"); }; if(hitTest(thisX, thisY, "X", "x") && Shift==0){addKey("x");}
					if(hitTest(thisX, thisY, "C", "c") && Shift==1) { addKey("C"); }; if(hitTest(thisX, thisY, "C", "c") && Shift==0){addKey("c");}
					if(hitTest(thisX, thisY, "V", "v") && Shift==1) { addKey("V"); }; if(hitTest(thisX, thisY, "V", "v") && Shift==0){addKey("v");}
					if(hitTest(thisX, thisY, "B", "b") && Shift==1) { addKey("B"); }; if(hitTest(thisX, thisY, "B", "b") && Shift==0){addKey("b");}
					if(hitTest(thisX, thisY, "N", "n") && Shift==1) { addKey("N"); }; if(hitTest(thisX, thisY, "N", "n") && Shift==0){addKey("n");}
					if(hitTest(thisX, thisY, "M", "m") && Shift==1) { addKey("M"); }; if(hitTest(thisX, thisY, "M", "m") && Shift==0){addKey("m");}
					
					if(hitTest(thisX, thisY, "HoofdletterLeeg", "HoofdletterLeeg")) 			{ if(Shift==1){Shift=0;} else {Shift = 1; }}
					if(hitTest(thisX, thisY, "Delete", "delete")) 					{ removeKey(); }
					if(hitTest(thisX, thisY, "ok", "ok")) 						{ CheckSpelword(); ButtonEffect("ok")}
					if(hitTest(thisX, thisY, "specialselected", "specialselected")) 			{ ShowExtraButtons();ButtonEffect("specialselected");}
					if(hitTest(thisX, thisY, "etrema", "etrema") && ExtraButtons==1) 			{ addKey("Ë"); ShowExtraButtons();}
					if(hitTest(thisX, thisY, "itrema", "itrema") && ExtraButtons==1) 			{ addKey("Ï"); ShowExtraButtons();}
					if(hitTest(thisX, thisY, "eeen", "eeen") && ExtraButtons==1) 			{ addKey("É"); ShowExtraButtons();}
					if(hitTest(thisX, thisY, "eelf", "eelf") && ExtraButtons==1) 			{ addKey("È"); ShowExtraButtons();}
					if(hitTest(thisX, thisY, "buttonleeg", "buttonleeg")) 		{ addKey(" ")}
					if(hitTest(thisX, thisY, "apostrof", "apostrof") && ExtraButtons==1) 		{ addKey("'"); ShowExtraButtons();}
					if(hitTest(thisX, thisY, "tussenstreepje", "tussenstreepje") && ExtraButtons==1) 	{ addKey("-"); ShowExtraButtons();}
					if(hitTest(thisX, thisY, "atrema", "atrema") && ExtraButtons==1) 			{ addKey("Ä"); ShowExtraButtons();}
				}
	
	
	
	
}


// *** Click in game
function click(thisX, thisY, scale)
{
	userInteractionOccured = true;
	
	if(!dragging)
	{
		if(typeof scale === "undefined") scale = true;
		
		if(scale)
		{
			thisX = scaleX(thisX);
			thisY = scaleY(thisY);
		}
			
		//console.log("click: " + Math.ceil(thisX) + ", " + Math.ceil(thisY));
	
		// *** Game actions here
		//addCoins(1, "MOUSE", "STAR_SOURCE", "BOUNCE LEFT EYES");
		
		/* WERKT NIET !!!
		else if(thisX >= spot["KEYBOARD_ICON"].x && thisX <= spot["KEYBOARD_ICON"].x + 60 && thisY >= spot["KEYBOARD_ICON"].y && thisY <= spot["KEYBOARD_ICON"].y + 60)
		{
			// *** Keyboard-button
			switchKeyboard();
		}
		*/
		
		if(thisX >= spot["SOUND_ICON"].x && thisX <= spot["SOUND_ICON"].x + 60 && thisY >= spot["SOUND_ICON"].y && thisY <= spot["SOUND_ICON"].y + 60)
		{
			// *** Sound on/off
			switchSound();
		}
		else if(thisX >= spot["BUTTON_X"].x && thisX <= spot["BUTTON_X"].x + 60 && thisY >= spot["BUTTON_X"].y && thisY <= spot["BUTTON_X"].y + 60)
		{
			// *** X-button
			if(confirm('Wil je het spel verlaten?') == true) { history.go(-1); }
			
			/*			
			showLevelText = 0;
			lives = 1;
			looseLive();
			*/
		}	
		else if(thisX >= spot["FULLSCREEN_ICON"].x && thisX <= spot["FULLSCREEN_ICON"].x + 60 && thisY >= spot["FULLSCREEN_ICON"].y && thisY <= spot["FULLSCREEN_ICON"].y + 60)
		{
			// *** Fullscreen-button
			 toggleFullScreen();
		}	
		else if(thisX >= spot["KEYBOARD_ICON"].x && thisX <= spot["KEYBOARD_ICON"].x + 60 && thisY >= spot["KEYBOARD_ICON"].y && thisY <= spot["KEYBOARD_ICON"].y + 60)
		{
			// *** Keyboard-button
			switchKeyboard();
		}	
		else
		{
		
			if(game_status == "HIGHSCORES")
			{
				if(hitTest(thisX, thisY, "HIGHSCORE_SUBMIT", "button")) highscoreOpen();
				else if(hitTest(thisX, thisY, "HIGHSCORE_SHARE", "button")) showMe("popup_share");
				else if(hitTest(thisX, thisY, "HIGHSCORE_PLAY", "button")) resetGame();
				else if(hitTest(thisX, thisY, "HIGHSCORE_WL", "button")) showWL();
			}		
			else
			{
				
				
			type(thisX, thisY);	
				
				
			}
		}	
	}
				
	endDrag();			
}

// *** Keyboard
function ButtonEffect(ButtonName)
{	
	if(typeof spot[ButtonName] === "undefined")
	{
		// Keyboard button bestaat niet
	}
	else
	{
		spot[ButtonName].y +=4; 
		setTimeout(function(){ spot[ButtonName].y -=4; }, 140);	
	}
}

function ShowExtraButtons(){if(ExtraButtons==1){ExtraButtons = 0;} else{ExtraButtons = 1;} }

function switchKeyboard()
{
	playSound("sword");
	if(showKeyboard) showKeyboard = false; else showKeyboard = true;
}


// *** Dragging starts
function drag(thisX, thisY)
{
	type(thisX, thisY);	
	
}

// *** Dragging ends
function endDrag()
{
	userInteractionOccured = true;
	
	thisX = mouse_x;
	thisY = mouse_y;

	
	//if(dragging) console.log("endDrag: " + Math.ceil(thisX) + ", " + Math.ceil(thisY));
	
	dragging_x = 0;
	dragging_y = 0;
	dragging = false;
	dragging_check = false;

}







// *** FUNCTIONS

// *** Coins
function addCoins(totalVal, origin, destination, animation, delay)
{
	if(typeof delay === "undefined") delay = 0;

	setTimeout(function(){
		
		totalVal *= 100;
		
		while(totalVal >= 5000) { totalVal -= 5000; addCoin(5000, origin, destination, animation); }			
		while(totalVal >= 1000) { totalVal -= 1000; addCoin(1000, origin, destination, animation); }			
		while(totalVal >= 100)  { totalVal -= 100; addCoin(100, origin, destination, animation); }	
		while(totalVal >= 50)   { totalVal -= 50; addCoin(50, origin, destination, animation); }	
		while(totalVal >= 10)   { totalVal -= 10; addCoin(10, origin, destination, animation); }	
		while(totalVal >= 5)    { totalVal -= 5; addCoin(5, origin, destination, animation); }	
		while(totalVal >= 1)    { totalVal -= 1; addCoin(1, origin, destination, animation); }
		
	 }, delay); 
}

function addCoin(val, origin, destination, animation)
{
	coin_status = animation;
	x_speed = 0;
	y_speed = 0;
	floor_extra_y = 0;
	
	if(animation == "BOUNCE RIGHT" || animation == "BOUNCE LEFT")
	{
		coin_status = "BOUNCE";
		x_speed = (Math.random() * 3 - 1) + 3/Math.sqrt(val);
		y_speed = -Math.random() * 3;
	}
	
	if(animation == "BOUNCE LEFT") x_speed = -x_speed;

	if(animation == "BOUNCE RIGHT EYES" || animation == "BOUNCE LEFT EYES")
	{
		coin_status = "BOUNCE";
		x_speed = (Math.random() * 5 + 13) + 3/Math.sqrt(val);
		y_speed = -(Math.random() * 3 + 6);
		
		floor_extra_y = -100;
	}
	
	if(animation == "BOUNCE LEFT EYES")
	{
		x_speed = (Math.random() * 5 - 9) - 3/Math.sqrt(val);
	}
		
	if(animation == "BOUNCE STAKE")
	{
		coin_status = "BOUNCE";
		x_speed = -(Math.random() * 3 + 3) - 2/Math.sqrt(val);
		y_speed = -(Math.random() * 7 + 10);
		floor_extra_y = -25;
	}
	
	// *** Add object
	coinCount++;
	key = "COIN" + coinCount;

	coin[key] = new Object;
	coin[key].coin_status = coin_status;
	coin[key].val = val;
	coin[key].x = spot[origin].x;
	coin[key].y = spot[origin].y;
	coin[key].x_speed = x_speed;
	coin[key].y_speed = y_speed;
	coin[key].floor = spot[origin].y + 100 + floor_extra_y;
	coin[key].x_dest = spot[destination].x;
	coin[key].y_dest = spot[destination].y;
	coin[key].origin = origin;
	coin[key].destination = destination;
	coin[key].opacity = 1;
	coin[key].show = true;
}

// *** Stars
function addStar(thisX, thisY)
{
	starCount++;
	key_star = "STAR" + starCount;
	
	star[key_star] = new Object;
	star[key_star].x = thisX + Math.random() * 30 - 15;
	star[key_star].y = thisY + Math.random() * 20 - 10;
	star[key_star].x_speed = Math.random() * 6 - 4;
	star[key_star].y_speed = (Math.random() * 5) - 4;

	star[key_star].size = 20 + Math.random() * 30;
	
	if(Math.random() < 0.002) star[key_star].size *= 3;
	star[key_star].show = true;
}
