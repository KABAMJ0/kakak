// *** GAME FLOW

// *** Reset game and start up first step
function resetGame()
{
	
	gameCollectableItem = 1;
	
	game["score"] = 0;
	gameNumber = 1;
	
	for(key in o) delete o[key];
	for(key in particle) delete particle[key];
	for(key in mark) delete mark[key];
	
	//showIntro();
	startGame();	
	newSpelWord();

}

// *** Show intro screen
function showIntro()
{
	game["status"] = "INTRO";
}

// *** Start game (start playing)
function startGame()
{
	for (key in spelWords){spelWords[key] = "";}
	game["status"] = "";
	for(key in o) delete o[key];
	spot["CHARACTER"].x = -5;
	addO("CHARACTER", spot["CHARACTER"].x, spot["CHARACTER"].y, "character"); // *** The monkey!

	addO("COLLECTABLE_ITEM", spot["PROGRESS_BAR_COLLECTABLE_ITEM"].x, spot["PROGRESS_BAR_COLLECTABLE_ITEM"].y, "collectableItem"); // *** The item the monkey can get at the end of the progress bar!
	
	o["collectableItem"].manifest = "collectable_item_" + gameCollectableItem;
	
	gameWordCurrent = 1; // *** 1 to 15
	
	Xcorrectie = 0;
	Attempt = 0;
	letterBrightness = 0.3;
	MistakeFeedback = 0;
	mark[gameNumber] = 10;
	
	if(klas_wachtwoord != "" && taak != "" && leerling != "")
	{herinitialiseren();}
	
	
}


// *** End game
function endGame()
{
	console.log("endGame");
	
	if(game["highscoreEmail"] != "")
	{
		highscoreSubmit();	
	}
	else
	{
		highscoreView();
	}
}



function herinitialiseren(){
	
	console.log("herinitialiseren");
	console.log(pogingen);
	
	
	temp = spelPool.split(",");
	
	var taak = new Array();
	
			for(i = 0; i <= temp.length; i++){
				taak[i] = new Array();
			}
	
		for(i = 0; i <= temp.length; i++){
		
			if(typeof pogingen !== "undefined" && typeof pogingen[temp[i]] !== "undefined")
			{
			   // *** De array bestaat, nu kan je kijken of de pogingen bestaan:
			  if(typeof pogingen[temp[i]][1] !== "undefined") taak[i]['AntwoordLeerlingPoging1'] = pogingen[temp[i]][1]; else taak[i]['AntwoordLeerlingPoging1'] = "";
			  if(typeof pogingen[temp[i]][2] !== "undefined") taak[i]['AntwoordLeerlingPoging2'] = pogingen[temp[i]][2]; else taak[i]['AntwoordLeerlingPoging2'] = "";
		
			  
			}
			
			else{taak[i]['AntwoordLeerlingPoging1'] = ""; taak[i]['AntwoordLeerlingPoging2'] = ""; }

	
		}
		

	
		

	if(voortgang>-1){gameNumber = 1}
	if(voortgang>14){gameNumber = 2}
	if(voortgang>29){gameNumber = 3}
	if(voortgang>44){gameNumber = 4}
	if(voortgang>59){gameNumber = 5}


	gameWordCurrent = voortgang % 15;

	
	gameCollectableItem =(voortgang - gameWordCurrent)/15 + 1;
	
	if(gameWordCurrent<16){gameWordCurrent++;}

	o["character"].x = spot["CHARACTER"].x = ((gameWordCurrent - 1) * spot["PROGRESS_BAR"].interval) - 13;	

	o["collectableItem"].manifest = "collectable_item_" + gameCollectableItem;


	for(i = 1; i <= (gameWordCurrent-1); i++){

		if(taak[((gameNumber-1)*15)+i-1]['AntwoordLeerlingPoging1']==""){tempDot = "GREEN"}
			else if(taak[((gameNumber-1)*15)+i-1]['AntwoordLeerlingPoging2']==""){tempDot = "DOT"}
				else {tempDot = "RED"}


		addO("PROGRESS_BAR_" + tempDot, spot["PROGRESS_BAR"].x + spot["PROGRESS_BAR"].paddingLeft + (i - 1) * spot["PROGRESS_BAR"].interval, spot["PROGRESS_BAR"].y + spot["PROGRESS_BAR"].paddingTop);


	}


	mark[1] = 10;mark[2] = 10;mark[3] = 10;mark[4] = 10;mark[5] = 10;

	for (i = 0; i <= (voortgang-1); i++){

		if(i<16){nummer = 1}
		if( i>15){nummer = 2}
		if( i>30){nummer = 3}
		if( i>45){nummer = 4}
		if( i>60){nummer = 5}


		if(taak[i]['AntwoordLeerlingPoging1']!=""){mark[nummer]-=0.5}
		if(taak[i]['AntwoordLeerlingPoging2']!=""){mark[nummer]-=0.5}

	}
	
	for (i = 1; i <=(voortgang%15); i++){
	
		
		
		if(taak[((gameNumber-1)*15)+i-1]['AntwoordLeerlingPoging1']=="") spelledWordsAttempt1[i] = temp[((gameNumber-1)*15)+i-1];
		  	else{spelledWordsAttempt1[i]=taak[((gameNumber-1)*15)+i-1]['AntwoordLeerlingPoging1']}
		
		
		
		if(taak[((gameNumber-1)*15)+i-1]['AntwoordLeerlingPoging2']=="" && taak[((gameNumber-1)*15)+i-1]['AntwoordLeerlingPoging1']!="") spelledWordsAttempt2[i] = temp[((gameNumber-1)*15)+i-1];
		  	else{spelledWordsAttempt2[i]=taak[((gameNumber-1)*15)+i-1]['AntwoordLeerlingPoging2']}
		
	
	}
	
	
	
	for (i = 1; i < 16; i++){
		spelWords[i] = temp[((gameNumber-1)*15)+i-1]
	}
	
	
}




function newSpelWord()
{

		
	temp = spelPool.split(","); 
		
	//TotalWordNumber = ((gameNumber-1)*15)+gameWordCurrent;
	//spelWord = temp[(TotalWordNumber+(temp.length-1))%(temp.length-1)];
	
	
		if(taak == ""){
	
			
			found=false;
			teller = 0;
			
			while (found==false)
			{	
					
					teller += 1;
					spelWord = temp[Math.floor(Math.random() * (temp.length - 1))];	

					var Used = false	

					for (a=0; a<spelWords.length; a++){

					if (spelWord == spelWords[a]){Used = true}

					}


					if (Used == false || teller>200){

						found = true;
						spelWord = spelWord.trim();

						if(spelWord.indexOf("?")>0){keyboard.keys["."].y = 100;keyboard.keys["?"].y = 3;} else{keyboard.keys["."].y = 3;keyboard.keys["?"].y = 100;}
                        
                        if(spelWord.indexOf("`")>-1){spelWord = spelWord.split("`").join("'");}
                        if(spelWord.indexOf("´")>-1){spelWord = spelWord.split("´").join("'");}
                        if(spelWord.indexOf("’")>-1){spelWord = spelWord.split("’").join("'");}

						console.log("newSpelWord: " + spelWord);

						spelWords[gameWordCurrent] = spelWord;

						temp = spelWord.split("");

						//setTimeout(function(){ voice(); }, 600);

						spelledWord = "";
						letterBrightness = 0.3;
						if(ShowKeyboardOnce == true){hideKeyboard();ShowKeyboardOnce = false;}

						if (spelWord.indexOf('ë') > -1 ||spelWord.indexOf('é') > -1 ||spelWord.indexOf('è') > -1 ||spelWord.indexOf('ï') > -1 ||spelWord.indexOf('ö') > -1 ||spelWord.indexOf('ä') > -1){if (keyboard["status"] != "show"){showKeyboard();ShowKeyboardOnce = true;}}


					}

			}
	
		
		}
	
		if(taak != ""){
			
		spelWord = temp[voortgang];
	
		if(spelWord.indexOf("?")>0){keyboard.keys["."].y = 100;keyboard.keys["?"].y = 3;} else{keyboard.keys["."].y = 3;keyboard.keys["?"].y = 100;}
		
		if(spelWord.indexOf("`")>-1){spelWord = spelWord.split("`").join("'");}
		if(spelWord.indexOf("´")>-1){spelWord = spelWord.split("´").join("'");}
		if(spelWord.indexOf("’")>-1){spelWord = spelWord.split("’").join("'");}
		

		//setTimeout(function(){ voice(); }, 600);
			
		

		spelledWord = "";
		letterBrightness = 0.3;

		if(ShowKeyboardOnce == true){hideKeyboard();ShowKeyboardOnce = false;}

		if (spelWord.indexOf('ë') > -1 ||spelWord.indexOf('é') > -1 ||spelWord.indexOf('è') > -1 ||spelWord.indexOf('ï') > -1 ||spelWord.indexOf('ö') > -1 ||spelWord.indexOf('ä') > -1){if (keyboard["status"] != "show"){showKeyboard();ShowKeyboardOnce = true;}}

		console.log("voortgang = " + voortgang);	

			
		}
	
    
	checkvoice();
	
		
}


function LevelUp(){
	
level+=1;
if (level==7){level=1}
	
setCookie('level',level,14)

manifestImage("bg", "https://afbeeldingen.spellingoefenen.nl/oefenen/images/" + gameType + "/level" + level + "/bg.jpg");

    for(i = 1; i <= 5; i++)
    {
        manifestImage("collectable_item_" + i, "https://afbeeldingen.spellingoefenen.nl/oefenen/images/" + gameType + "/level" + level + "/collectable_item_" + i + ".png");
        manifestImage("collectable_item_" + i + "_outline", "https://afbeeldingen.spellingoefenen.nl/oefenen/images/" + gameType + "/level" + level + "/collectable_item_" + i + "_outline.png");
        
    }  
	
	
}

function nextWord()
{
	console.log("nextWord");

	console.log("---");
	console.log("check: " + spelWord);
	console.log("spelledWordsAttempt1:" + spelledWordsAttempt1[gameWordCurrent]);
	console.log("spelledWordsAttempt2:" + spelledWordsAttempt2[gameWordCurrent]);
	console.log("gameWordCurrent:" + gameWordCurrent);
	console.log("klas_wachtwoord:" + klas_wachtwoord);
	console.log("taak:" + taak);
	console.log("leerling:" + leerling);
	
	
	
	playSound("bell_chord");
	
	if (Attempt == 0){tempDot = "GREEN";}
	if (Attempt == 1){tempDot = "DOT";}
	if (Attempt > 1){tempDot = "RED";}
	
	
	addO("PROGRESS_BAR_" + tempDot, spot["PROGRESS_BAR"].x + spot["PROGRESS_BAR"].paddingLeft + (gameWordCurrent - 1) * spot["PROGRESS_BAR"].interval, spot["PROGRESS_BAR"].y + spot["PROGRESS_BAR"].paddingTop);
	
	walkCharacter();
	
	o["character"].x = spot["CHARACTER"].x = ((gameWordCurrent - 1) * spot["PROGRESS_BAR"].interval)-13;
	
	gameWordCurrent++;
	voortgang++;
	
	if(taak != ""){
		ajaxUpdate("a=progressTaak&klas_wachtwoord=" + klas_wachtwoord + "&taak=" + taak + "&leerling=" + leerling + "&woord=" + spelWord + "&poging_1=" + spelledWordsAttempt1[gameWordCurrent-1] + "&poging_2=" + spelledWordsAttempt2[gameWordCurrent-1] + "&voortgang=" + voortgang);
	}
	
	Attempt = 0;
	spelledWord = "";
	
}

function ControlAnswer(){

	console.log("ControlAnswer");
	
	if (spelledWord=="leveltest"){LevelUp()}
	if (spelledWord=="levelup"){spelledWord="jammer dan"}
	
	if (spelWord==spelledWord&&gameWordCurrent == 15||gameWordCurrent == 15 && Attempt>1){gameCollectableItem += 1;hideKeyboard();game["status"] = "RESULT";}
	
	if(Attempt==0){spelledWordsAttempt1[gameWordCurrent]=spelledWord;spelledWordsAttempt2[gameWordCurrent]=""}
	if(Attempt==1){spelledWordsAttempt2[gameWordCurrent]=spelledWord;}
	
	if(spelWord==spelledWord||gameWordCurrent == 15 && Attempt>1){	
				
		nextWord(); if (gameWordCurrent < 16){newSpelWord();}
	}
	else {
		console.log("Fout antwoord")
		Mistake();
	}	
	
}

function Mistake(){
	playSound("error");
	Attempt += 1;
	MistakeFeedback = 25;
	if(mark[gameNumber]>1){mark[gameNumber] -= 0.5};
	// Feedback fout antwoord gegeven.	
}

function walkCharacter()
{
	console.log("walkCharacter");
	
	o["character"].status = "walk";
	o["character"].frame = 1;

}



function checkvoice(){
	
	
	for (WordOrSentence = 1; WordOrSentence<3; WordOrSentence++)
	{
		if(WordOrSentence == 1){
		var MethodenMetWoorden = mergeLists([lijn3,veiliglerenlezen,taalactief3,taalactief4,taalactief5,spellinginbeeld2,taaljournaal,taalverhaalnu,pit,staal,staal2,taaljacht,Categorie]);
		}
		if(WordOrSentence == 2){
		var MethodenMetWoorden = mergeLists([taalactief4,Categorie]);
		}
			
			
			
		WoordenMetGeluid = "";
		WoordPakketten = "";

			for(key in MethodenMetWoorden)
			{	
				WoordPakketten += "," + key + ",";				
			}

		TempPakketten = WoordPakketten.split(",");	

			for(i = 0; i < TempPakketten.length; i++)
			{
				if(TempPakketten[i] != "")
				{
					WoordenMetGeluid += MethodenMetWoorden[TempPakketten[i]].woorden + ",";
				}
			}

		WoordenMetGeluid = WoordenMetGeluid.split(",,").join(",");	
		WoordenMetGeluid = WoordenMetGeluid.split(",")



		var geluid = false;

		for (key in WoordenMetGeluid){

			if(WoordenMetGeluid[key] == spelWord){geluid = true;}

		}

		if(WordOrSentence == 1){
			if (geluid == false){console.log("Hier is geen woordbestand van");game["preparevoicebutton"]=false;} else{console.log("Hier is wel een woordbestand van");game["preparevoicebutton"]=true;}
		}
		else if(WordOrSentence == 2){
			if (geluid == false){console.log("Hier is geen zinsbestand van");game["preparevoicebuttonsentences"]=false;} else{console.log("Hier is wel een zinsbestand van");game["preparevoicebuttonsentences"]=true;}
		}

	
	}

	
	voicebutton();
	if(game["preparevoicebutton"]==true){setTimeout(function(){ voice(); }, 600);};
	
	//SentenceAudio.onerror = function(){console.log("Hier is geen bestand van");game["preparevoicebuttonsentences"]=false;}
	//WordAudio.onerror = function(){console.log("Hier is geen bestand van");game["preparevoicebutton"]=false;}
	
	
}

function voicebutton(){

if (game["preparevoicebutton"]==true){game["ShowVoiceButton"]=true}
if (game["preparevoicebutton"]==false){game["ShowVoiceButton"]=false}
	
if (game["preparevoicebuttonsentences"]==true){game["ShowVoiceButtonSentences"]=true}
if (game["preparevoicebuttonsentences"]==false){game["ShowVoiceButtonSentences"]=false}

	
}

function voice()
{
	console.log("voice (speak word again)");
	
	
	MySound = "https://afbeeldingen.spellingoefenen.nl/oefenen/sound/words/"+spelWord[0]+"/"+spelWord+".mp3"
	if (spelWord[0]=="'"){MySound = "https://afbeeldingen.spellingoefenen.nl/oefenen/sound/words/s/"+spelWord+".mp3"}
	
	var WordAudio = new Audio(replaceSpecialChars(MySound));
	
	
	WordAudio.play();
		
}

function voicesentence()
{
	console.log("voice (speak sentence again)");
	
	
	MySound = "https://afbeeldingen.spellingoefenen.nl/oefenen/sound/sentences/"+spelWord[0]+"/"+spelWord+".mp3"
	if (spelWord[0]=="'"){MySound = "https://afbeeldingen.spellingoefenen.nl/oefenen/sound/sentences/s/"+spelWord+".mp3"}
	
	var WordAudio = new Audio(replaceSpecialChars(MySound));
	
	
	WordAudio.play();
		
}

// *** INTERACTION

// *** Click in game
function click(thisX, thisY, scale)
{
	gameEngine["userInteractionOccured"] = true;
	
	//if(keyboard["status"] == "show") clickKeyboard(thisX, thisY);
	if(!game["dragging"])
	{
		if(typeof scale === "undefined") scale = true;
		
		if(scale)
		{
			thisX = scaleX(thisX);
			thisY = scaleY(thisY);
		}
			
		console.log("click: " + Math.ceil(thisX) + ", " + Math.ceil(thisY));
		logGamePlay("click: " + Math.ceil(thisX) + ", " + Math.ceil(thisY));

		if(gameEngine["isTopWindow"] && hitSpot(thisX, thisY, "CLOSE_ICON")) history.go(-1);
		else if(!gameEngine["globalFullscreenDisabled"] && hitSpot(thisX, thisY, "FULLSCREEN_ICON")) toggleFullScreen();
		else if(!gameEngine["globalAudioDisabled"] && hitSpot(thisX, thisY, "SOUND_ICON")) switchSound();
		else if(hitSpot(thisX, thisY, "KEYBOARD_ICON")) { if(keyboard["status"] == "show") hideKeyboard(); else showKeyboard(); }
		else if(game["status"] == "" && hitTest(thisX, thisY, "VOICE", "voice") && game["preparevoicebutton"]==true) voice();	
		else if(game["status"] == "" && hitTest(thisX, thisY, "VOICE_SENTENCE", "voice_sentence") && game["preparevoicebuttonsentences"]==true) voicesentence();	
		else if(keyboard["status"] == "show") clickKeyboard(thisX, thisY);
		
		else if(game["status"] == "INTRO")
		{
			if(gameEngine["isSmartphone"] && !gameEngine["isTopWindow"])
			{
				// *** Open in top window
				var myWindow = window.open(window.location.href, "_top");
			}
			else
			{
				resetGame();
			}
		}	
		else if(game["status"] == "")
		{
			//if(hitSpot(thisX, thisY, "TITLE")) document.location = "https://www.gamedesign.nl";
			//else if(hitSpot(thisX, thisY, "LINK_1")) showIntro();
			//else if(hitSpot(thisX, thisY, "LINK_2")) resetGame();
			//else if(hitSpot(thisX, thisY, "LINK_3")) endGame();
			if(hitTest(thisX, thisY, "VOICE", "voice") && gameType == "dictee" && game["preparevoicebutton"]==true) voice();	
			if(hitTest(thisX, thisY, "VOICE_SENTENCE", "voice_sentence") && gameType == "dictee" && game["preparevoicebuttonsentences"]==true) voicesentence();	
			//else if(hitTest(thisX, thisY, "DEMO_WALK_BUTTON", "button")) nextWord();
			//else if(hitTest(thisX, thisY, "DEMO_SCREEN_BUTTON", "button")) game["status"] = "RESULT";					
			//else if(hitTest(thisX, thisY, "DEMO_PARTICLE_BUTTON", "button"))
			//{
				// *** Demo: change particle type
			//	game["demoParticleSelected"]++;
			//	if(typeof particlePrototype[game["demoParticleSelected"]] === "undefined") game["demoParticleSelected"] = 1;
				
			//	console.log("Change to particlePrototype: " + game["demoParticleSelected"]);
			//}
			else
			{
				//for(i = 1; i <= 10; i++) addParticle(game["demoParticleSelected"], thisX, thisY);
				//playSound("gunshot");
				
				// *** Objects
				for(key in o)
				{
					if(oPrototype[o[key].prototype].category == "fruit")			
					{
						// *** Demo: make all fruity objects clickable
						if(hitO(thisX, thisY, key)) demoHitFruit(key);
					}
				}				
			}
		}
		else if(game["status"] == "RESULT")
		{
			if(hitTest(thisX, thisY, "RESULT_BUTTON_NEXT", "button")){ 
			game["status"] = "SCORE";}
			
			
		
		}
		else if(game["status"] == "SCORE")
		{
			if(hitTest(thisX, thisY, "SCORE_BUTTON_NEXT", "button")&& gameCollectableItem<6 && temp.length!=voortgang){ gameNumber += 1;startGame(); newSpelWord(); }
		if(hitTest(thisX, thisY, "SCORE_BUTTON_NEXT", "button") && gameCollectableItem==6||temp.length==voortgang){
			game["status"] = "ENDSCORE"}
		}	
		else if(game["status"] == "ENDSCORE")
		{
			if(hitTest(thisX, thisY, "SCORE_BUTTON_NEXT", "button") && temp.length!=voortgang){ LevelUp(); resetGame();}
			if(temp.length==voortgang){ /*alert("Klik op 'Andere taak kiezen' om andere taken te oefenen of een spelletje te spelen!") */ window.top.location = '/taken.php?a=reset_taak'; }
		
		}	
		else if(game["status"] == "HIGHSCORES")
		{
			//if(hitTest(thisX, thisY, "HIGHSCORE_SUBMIT", "button")) highscoreOpen();
			//else if(hitTest(thisX, thisY, "HIGHSCORE_PLAY", "button")) resetGame();
		}		
	}
				
	endDrag();	
	console.log(temp.length + ".................." + voortgang)
}

// *** Dragging starts
function drag(thisX, thisY)
{
	console.log("drag: " + Math.ceil(thisX) + ", " + Math.ceil(thisY));
	if(keyboard["status"] == "show") clickKeyboard(thisX, thisY);
}

// *** Dragging ends
function endDrag()
{
	gameEngine["userInteractionOccured"] = true;
	
	thisX = game["mouseX"];
	thisY = game["mouseY"];
		
	if(game["dragging"])
	{
		// *** At the end of a drag invoce a click (when playing an intended click can accidentally easily become a short drag)
		console.log("endDrag results in click: " + Math.ceil(thisX) + ", " + Math.ceil(thisY));
		game["dragging"] = false;
		click(thisX, thisY);
	}

	game["draggingX"] = 0;
	game["draggingY"] = 0;
	game["dragging"] = false;
	game["draggingCheck"] = false;

	
}

function uppercase(){

keyboard.keys["q"].y = 100;keyboard.keys["Q"].y = 1; 
keyboard.keys["w"].y = 100;keyboard.keys["W"].y = 1; 
keyboard.keys["e"].y = 100;keyboard.keys["E"].y = 1; 
keyboard.keys["r"].y = 100;keyboard.keys["R"].y = 1; 
keyboard.keys["t"].y = 100;keyboard.keys["T"].y = 1; 
keyboard.keys["y"].y = 100;keyboard.keys["Y"].y = 1; 
keyboard.keys["u"].y = 100;keyboard.keys["U"].y = 1; 
keyboard.keys["i"].y = 100;keyboard.keys["I"].y = 1; 
keyboard.keys["o"].y = 100;keyboard.keys["O"].y = 1; 
keyboard.keys["p"].y = 100;keyboard.keys["P"].y = 1; 
	
keyboard.keys["a"].y = 100;keyboard.keys["A"].y = 2;
keyboard.keys["s"].y = 100;keyboard.keys["S"].y = 2; 
keyboard.keys["d"].y = 100;keyboard.keys["D"].y = 2; 
keyboard.keys["f"].y = 100;keyboard.keys["F"].y = 2; 
keyboard.keys["g"].y = 100;keyboard.keys["G"].y = 2; 
keyboard.keys["h"].y = 100;keyboard.keys["H"].y = 2; 
keyboard.keys["j"].y = 100;keyboard.keys["J"].y = 2; 
keyboard.keys["k"].y = 100;keyboard.keys["K"].y = 2; 
keyboard.keys["l"].y = 100;keyboard.keys["L"].y = 2; 
	
keyboard.keys["z"].y = 100;keyboard.keys["Z"].y = 3; 
keyboard.keys["x"].y = 100;keyboard.keys["X"].y = 3; 
keyboard.keys["c"].y = 100;keyboard.keys["C"].y = 3;
keyboard.keys["v"].y = 100;keyboard.keys["V"].y = 3; 
keyboard.keys["b"].y = 100;keyboard.keys["B"].y = 3; 
keyboard.keys["n"].y = 100;keyboard.keys["N"].y = 3; 
keyboard.keys["m"].y = 100;keyboard.keys["M"].y = 3; 
	
keyboard.keys["é"].y = 100;keyboard.keys["ç"].y = 0; 
keyboard.keys["è"].y = 100;keyboard.keys["ñ"].y = 0;
keyboard.keys["ë"].y = 100;keyboard.keys["í"].y = 0;
keyboard.keys["ê"].y = 100;keyboard.keys["ú"].y = 0;
keyboard.keys["ï"].y = 100;keyboard.keys["ù"].y = 0;
keyboard.keys["ü"].y = 100;keyboard.keys["ó"].y = 0;
keyboard.keys["ä"].y = 100;keyboard.keys["ò"].y = 0;
keyboard.keys["ö"].y = 100;keyboard.keys["á"].y = 0;

}

function lowercase(){
keyboard.keys["Q"].y = 100;keyboard.keys["q"].y = 1; 
keyboard.keys["W"].y = 100;keyboard.keys["w"].y = 1; 
keyboard.keys["E"].y = 100;keyboard.keys["e"].y = 1; 
keyboard.keys["R"].y = 100;keyboard.keys["r"].y = 1; 
keyboard.keys["T"].y = 100;keyboard.keys["t"].y = 1; 
keyboard.keys["Y"].y = 100;keyboard.keys["y"].y = 1; 
keyboard.keys["U"].y = 100;keyboard.keys["u"].y = 1; 
keyboard.keys["I"].y = 100;keyboard.keys["i"].y = 1; 
keyboard.keys["O"].y = 100;keyboard.keys["o"].y = 1; 
keyboard.keys["P"].y = 100;keyboard.keys["p"].y = 1; 
	
keyboard.keys["A"].y = 100;keyboard.keys["a"].y = 2;
keyboard.keys["S"].y = 100;keyboard.keys["s"].y = 2; 
keyboard.keys["D"].y = 100;keyboard.keys["d"].y = 2; 
keyboard.keys["F"].y = 100;keyboard.keys["f"].y = 2; 
keyboard.keys["G"].y = 100;keyboard.keys["g"].y = 2; 
keyboard.keys["H"].y = 100;keyboard.keys["h"].y = 2; 
keyboard.keys["J"].y = 100;keyboard.keys["j"].y = 2; 
keyboard.keys["K"].y = 100;keyboard.keys["k"].y = 2; 
keyboard.keys["L"].y = 100;keyboard.keys["l"].y = 2; 
	
keyboard.keys["Z"].y = 100;keyboard.keys["z"].y = 3; 
keyboard.keys["X"].y = 100;keyboard.keys["x"].y = 3; 
keyboard.keys["C"].y = 100;keyboard.keys["c"].y = 3;
keyboard.keys["V"].y = 100;keyboard.keys["v"].y = 3; 
keyboard.keys["B"].y = 100;keyboard.keys["b"].y = 3; 
keyboard.keys["N"].y = 100;keyboard.keys["n"].y = 3; 
keyboard.keys["M"].y = 100;keyboard.keys["m"].y = 3;
	
	
keyboard.keys["é"].y = 0;keyboard.keys["ç"].y = 100; 
keyboard.keys["è"].y = 0;keyboard.keys["ñ"].y = 100;
keyboard.keys["ë"].y = 0;keyboard.keys["í"].y = 100;
keyboard.keys["ê"].y = 0;keyboard.keys["ú"].y = 100;
keyboard.keys["ï"].y = 0;keyboard.keys["ù"].y = 100;
keyboard.keys["ü"].y = 0;keyboard.keys["ó"].y = 100;
keyboard.keys["ä"].y = 0;keyboard.keys["ò"].y = 100;
keyboard.keys["ö"].y = 0;keyboard.keys["á"].y = 100;

}

// *** (custom) Keyboard key pressed
function keyboardKeyPressed(thisKey)
{
	console.log("keyboardKeyPressed: \"" + thisKey + "\"");
	
	if(thisKey == "OK")
	{
		if(game["status"] == "" && spelledWord!=""){ControlAnswer();}
		else if(game["status"] == "RESULT"){game["status"] = "SCORE"}
		else if(game["status"] == "SCORE" && gameCollectableItem == 6||game["status"] == "SCORE" && temp.length==voortgang){game["status"] = "ENDSCORE"; }
		else if(game["status"] == "SCORE" && gameCollectableItem < 6 && temp.length!=voortgang){gameNumber += 1;startGame(); newSpelWord();game["status"] = ""}
		else if(game["status"] == "ENDSCORE" && temp.length!=voortgang){LevelUp(); resetGame();}
		else if(game["status"] == "ENDSCORE" && temp.length==voortgang){ /* alert("Klik op 'Andere taak kiezen' om andere taken te oefenen of een spelletje te spelen!") */ window.top.location = '/taken.php?a=reset_taak'; }
		
	}
	else if(thisKey == "<<")
	{
	spelledWord = spelledWord.slice(0, -1)
	}
	else if(thisKey == "OK")
	{
		hideKeyboard();
	}	
	else if(thisKey == "SHIFT")
	{
		if(keyboard.keys["A"].y == 100){uppercase();} else{lowercase();}
	}
	else
	{
	spelledWord += thisKey; lowercase();
		//for(i=1;i<50;i++){addParticle(3,spot["WORD"].x + (spelledWord.length*spot["WORD"].interval-60),spot["WORD"].y + 40)} letter effect
	}
}

function keyPress(e)
{
	e = e || window.event;

	
	pressKeyboard(e.key);
		
		if 	(e.keyCode == '38' || e.keyCode == '87') 	{ console.log("keyPress UP"); }
		else if (e.keyCode == '40' || e.keyCode == '83') 	{ console.log("keyPress DOWN"); }
		else if (e.keyCode == '37' || e.keyCode == '65') 	{ console.log("keyPress LEFT"); }
		else if (e.keyCode == '39' || e.keyCode == '68') 	{ console.log("keyPress RIGHT"); }
		else if (e.keyCode == '13') {
			if(game["status"] == "" && spelledWord!=""){ControlAnswer();}
			else if(game["status"] == "RESULT"){game["status"] = "SCORE"}
			else if(game["status"] == "SCORE" && gameCollectableItem == 6||game["status"] == "SCORE" && temp.length==voortgang){game["status"] = "ENDSCORE"; }
			else if(game["status"] == "SCORE" && gameCollectableItem < 6 && temp.length!=voortgang){gameNumber += 1;startGame(); newSpelWord();game["status"] = ""}
			else if(game["status"] == "ENDSCORE" && temp.length!=voortgang){LevelUp(); resetGame();}
			else if(game["status"] == "ENDSCORE" && temp.length==voortgang){ /* alert("Klik op 'Andere taak kiezen' om andere taken te oefenen of een spelletje te spelen!") */ window.top.location = '/taken.php?a=reset_taak'; }
			}
		else if (e.keyCode == '8') 				{ spelledWord = spelledWord.slice(0, -1) }
	
}

function replaceSpecialChars(t)
{
	t = t.split("ä").join("a");
	t = t.split("á").join("a");
	t = t.split("à").join("a");

	t = t.split("ë").join("e");
	t = t.split("é").join("e");
	t = t.split("è").join("e");
    t = t.split("ê").join("e");

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
	t = t.split("?").join("");
	t = t.split("!").join("");
	t = t.toLowerCase();


	return(t);
}

// *** Answer returns from AJAX request
function ajaxReturn(data)
{
	var answer = $.parseJSON(data);
	
	console.log("ajaxReturn: " + answer["a"]);
	console.log(answer);
	
	if(answer["a"] == "highscoreView" && answer["status"] == "OK")
	{
		game["highscoreList"] = answer;
	}
	
	if(answer["a"] == "highscoreSubmit" && answer["status"] == "OK")
	{
		highscoreView();
	}

	if(answer["a"] == "getTaak" && answer["status"] == "OK")
	{
		startWLTaakReturn(answer);
	}
		
}



// *** FUNCTIONS

function xCorrectie(Letter){
if (Letter=="m"){var Correctie = -14;}
else if (Letter=="f"){var Correctie = 8;}
else if (Letter=="i"){var Correctie = 16;}
else if (Letter=="j"){var Correctie = 16;}
else if (Letter=="l"){var Correctie = 16;}
else if (Letter=="r"){var Correctie = 7;}
else if (Letter=="s"){var Correctie = 4;}
else if (Letter=="t"){var Correctie = 8;}
else if (Letter=="w"){var Correctie = -8;}
else if (Letter=="A"){var Correctie = -5;}
else if (Letter=="B"){var Correctie = -3;}
else if (Letter=="C"){var Correctie = -10;}
else if (Letter=="D"){var Correctie = -3;}
else if (Letter=="E"){var Correctie = -8;}
else if (Letter=="F"){var Correctie = -3;}
else if (Letter=="G"){var Correctie = -14;}
else if (Letter=="H"){var Correctie = -10;}
else if (Letter=="I"){var Correctie = 13;}
else if (Letter=="J"){var Correctie = -3;}
else if (Letter=="K"){var Correctie = -6;}
else if (Letter=="L"){var Correctie = -3;}
else if (Letter=="M"){var Correctie = -16;}
else if (Letter=="N"){var Correctie = -10;}
else if (Letter=="O"){var Correctie = -12;}
else if (Letter=="P"){var Correctie = -3;}
else if (Letter=="Q"){var Correctie = -10;}
else if (Letter=="R"){var Correctie = -10;}
else if (Letter=="S"){var Correctie = -6;}
else if (Letter=="T"){var Correctie = -3;}
else if (Letter=="U"){var Correctie = -8;}
else if (Letter=="V"){var Correctie = -6;}
else if (Letter=="W"){var Correctie = -22;}
else if (Letter=="X"){var Correctie = -7;}
else if (Letter=="Y"){var Correctie = -7;}
else if (Letter=="Z"){var Correctie = -3;}
else if (Letter=="'"){var Correctie = 18;}
else if (Letter=="-"){var Correctie = 14;}
else{Correctie = 0;}
return Correctie;
	
}

// *** Objects in game
function addO(thisPrototype, thisX, thisY, thisKey)
{
	if(typeof thisKey === "undefined")
	{
		game["keyCount"]++;
		thisKey = game["keyCount"];
	}
	
	console.log("addO " + thisKey + ": prototype " + thisPrototype + " at (" + thisX + ", " + thisY + ")");
	
	o[thisKey] = new Object;
	
	o[thisKey].prototype = thisPrototype;
	o[thisKey].category = oPrototype[thisPrototype].category;
	
	o[thisKey].x = thisX;
	o[thisKey].y = thisY;

	o[thisKey].xSpeed = oPrototype[thisPrototype].xSpeed;
	o[thisKey].ySpeed = oPrototype[thisPrototype].ySpeed;

	o[thisKey].r = oPrototype[thisPrototype].r;
	o[thisKey].rSpeed = oPrototype[thisPrototype].rSpeed;
		
	o[thisKey].manifest = oPrototype[thisPrototype].manifest;
}

// *** Particles
function addParticle(thisPrototype, thisX, thisY)
{
	game["keyCount"]++;
	thisKey = game["keyCount"];
	
	particle[thisKey] = new Object;
	
	particle[thisKey].prototype = thisPrototype;
	particle[thisKey].x = thisX;
	particle[thisKey].y = thisY;
		
	particle[thisKey].xSpeed = particlePrototype[thisPrototype].xSpeed + particlePrototype[thisPrototype].xSpeedVariation * Math.random();
	particle[thisKey].xSpeedChange = particlePrototype[thisPrototype].xSpeedChange + particlePrototype[thisPrototype].xSpeedChangeVariation * Math.random();
	
	particle[thisKey].ySpeed = particlePrototype[thisPrototype].ySpeed + particlePrototype[thisPrototype].ySpeedVariation * Math.random();
	particle[thisKey].ySpeedChange = particlePrototype[thisPrototype].ySpeedChange + particlePrototype[thisPrototype].ySpeedChangeVariation * Math.random();
	
	particle[thisKey].size = particlePrototype[thisPrototype].size + particlePrototype[thisPrototype].sizeVariation * Math.random();
	particle[thisKey].sizeChange = particlePrototype[thisPrototype].sizeChange + particlePrototype[thisPrototype].sizeChangeVariation * Math.random();
	
	particle[thisKey].alpha = particlePrototype[thisPrototype].alpha + particlePrototype[thisPrototype].alphaVariation * Math.random();
	particle[thisKey].alphaChange = particlePrototype[thisPrototype].alphaChange + particlePrototype[thisPrototype].alphaChangeVariation * Math.random();
	
	tempManifest = particlePrototype[thisPrototype].manifest;
	if(particlePrototype[thisPrototype].manifestVariation > 0 && Math.random() < particlePrototype[thisPrototype].manifestVariation) tempManifest = particlePrototype[thisPrototype].manifestVariationManifest;
	particle[thisKey].manifest = tempManifest;
}
