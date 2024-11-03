// *** Initialize game after html body has been loaded
function init()
{
	if(!gameEngine["initDone"])
	{
		gameEngine["initDone"] = true;
		//aaa = dddffd + 5;
		
		console.log("Init game with Gamedesign.nl HTML5 game engine " + gameEngine["version"] + " (versionHTML: " + versionHTML + "): all rights reserved");
		console.log("---");

		// *** Device related checks and hacks
		deviceChecksPostInit();
		
		//setFramerate(gameEngine["framerate"]);
		//animateAll();
		
		//completeWL = "aaa,bbb,ccc,ddd,eee,fff";
		
		tempArray = completeWL.split(",");
		tempCount = 0;
		
		for(i = 0; i < tempArray.length; i++)
		{
			tempArray[i] = tempArray[i].split("*").join("");
			tempArray[i] = tempArray[i].split("'").join("`");
			tempArray[i] = tempArray[i].trim();
			
			if(tempArray[i].length > 2)
			{
				hangmanWL[tempCount] = tempArray[i];
				tempCount++;
			}
		}
				
		ge('myCanvasGamedesign').style.display = 'none';
		
		startGame();			
		//showIntro();	
	}
}

// *** Create begin of manifest for showing of preload screen only (NO PRELOADING OF SOUND!)
function loadPreloadManifest()
{	
	// *** Preload of images	
	manifestImage("playbutton", 		"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/playbutton.png");
	manifestImage("playbutton_hover", 	"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/playbutton_hover.png");
	manifestImage("alert_bg", 		"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/alert_bg.png");
	manifestImage("ios_startscreen", 	"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/ios_startscreen.png");
	manifestImage("bg_maneuvre", 		"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/bg_maneuvre.png");
	manifestImage("icon_phone", 		"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/icon_phone.png");
	manifestImage("progressbar", 		"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/progressbar.png");
	manifestImage("progressbar_bg", 	"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/progressbar_bg.png");
	manifestImage("progressbar_fg", 	"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/progressbar_fg.png");
	manifestImage("close", 			"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/close.png");
	manifestImage("sound_on", 		"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/sound_on.png");
	manifestImage("sound_off", 		"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/sound_off.png");
	manifestImage("fullscreen_on", 		"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/fullscreen_on.png");
	manifestImage("fullscreen_off", 	"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/fullscreen_off.png");
	manifestImage("keyboard_on", 		"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/keyboard_on.png");
	manifestImage("keyboard_off", 		"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/keyboard_off.png");

	manifestImage("bg_intro", 		"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/riddergalgriel/images/bg_intro.png");
	manifestImage("logo", 			"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/riddergalgriel/images/logo.png");
	manifestImage("particle", 		"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/riddergalgriel/images/particle.png");
	manifestImage("particle_black", 	"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/riddergalgriel/images/particle_black.png");
	manifestImage("sunbeam", 		"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/riddergalgriel/images/sunbeam.png");
	manifestImage("transition_top", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/riddergalgriel/images/transition_top.png");
	manifestImage("transition_bottom", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/riddergalgriel/images/transition_bottom.png");

	//for(i = 1; i <= 8; i++) manifestImage("fire_" + i, "images/fire/" + i + ".png");
			
	startPreload();
}

// *** Create manifest (collection of images/sounds) for preloading and use in game
function loadManifest()
{
	// *** Preload of sounds
	if(!gameEngine["globalAudioDisabled"])
	{	
		manifestSound("sword", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/riddergalgriel/sound/sword.mp3");

		manifestSound("coin1", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/riddergalgriel/sound/coin1.mp3");
		manifestSound("coin2", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/riddergalgriel/sound/coin2.mp3");
		manifestSound("coin3", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/riddergalgriel/sound/coin3.mp3");
		manifestSound("succes", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/riddergalgriel/sound/succes.mp3");
		manifestSound("beam", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/riddergalgriel/sound/beam.mp3");
		manifestSound("door", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/riddergalgriel/sound/door2.mp3");
		manifestSound("door3", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/riddergalgriel/sound/door3.mp3");
		manifestSound("next_word", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/riddergalgriel/sound/next_word.mp3");
		manifestSound("ping", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/riddergalgriel/sound/ping.mp3");

		
	}
			
	// *** Preload of images
	manifestImage("keyboard_key",	 		"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/keyboard/key.png");
	manifestImage("keyboard_key_hover",		"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/keyboard/key_hover.png");
	manifestImage("keyboard_key_pushed",	 	"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/keyboard/key_pushed.png");
	manifestImage("keyboard_key_long", 		"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/keyboard/key_long.png");
	manifestImage("keyboard_key_long_hover", 	"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/keyboard/key_long_hover.png");
	manifestImage("keyboard_key_long_pushed", 	"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/keyboard/key_long_pushed.png");
	manifestImage("keyboard_key_alt",	 	"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/keyboard/key_alt.png");
	manifestImage("keyboard_key_alt_pushed",	"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/keyboard/key_alt_pushed.png");
	manifestImage("keyboard_key_long_alt", 		"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/keyboard/key_long_alt.png");
	manifestImage("keyboard_key_long_alt_pushed", 	"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/keyboard/key_long_alt_pushed.png");
	
	manifestImage("highscore_bg", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/bg.png");
	manifestImage("highscore_selected", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/selected.png");
	manifestImage("highscore_between", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/between.png");
	manifestImage("highscore_top", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/top.png");		manifestImage("highscore_top_hover", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/top_hover.png");
	manifestImage("highscore_up", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/up.png");		manifestImage("highscore_up_hover", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/up_hover.png");
	manifestImage("highscore_user", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/user.png");		manifestImage("highscore_user_hover", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/user_hover.png");
	manifestImage("highscore_down", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/down.png");		manifestImage("highscore_down_hover", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/down_hover.png");
	manifestImage("highscore_bottom", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/bottom.png");	manifestImage("highscore_bottom_hover", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/bottom_hover.png");

	manifestImage("button", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/riddergalgriel/images/button.png");
	manifestImage("button_hover", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/riddergalgriel/images/button_hover.png");

	manifestImage("bg", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/riddergalgriel/images/bg_landscape.jpg");

	for(i = 1; i <= 8; i++) { manifestImage("treasure_" + i, "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/riddergalgriel/images/treasure/" + i + ".png"); manifestImage("treasure_" + i + "_tint", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/riddergalgriel/images/treasure/" + i + "_tint.png"); }
	for(i = 1; i <= 8; i++) { manifestImage("knight_hit_" + i, "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/riddergalgriel/images/knight/hit_" + i + ".png"); }
	for(i = 1; i <= 6; i++) { manifestImage("knight_static_" + i, "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/riddergalgriel/images/knight/static_" + i + ".png"); }
	for(i = 1; i <= 9; i++) { manifestImage("coin_" + i, "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/riddergalgriel/images/coin/" + i + ".png"); }
	
	manifestImage("knight_chair_bottom", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/riddergalgriel/images/knight/chair_bottom.png");
	manifestImage("treasure_beam", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/riddergalgriel/images/treasure_beam.png");
	manifestImage("score_added", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/riddergalgriel/images/score_added.png");
	
	// *** Buffer sound (if not IE or local)	
	bufferSound();
	
	startPreload();
}

hangmanWL = new Array();


// *** Game and gameplay
var game = {

	"submitted" : false,
	"orientation" : "landscape", // *** landscape or portrait. Also change the class/dimensions in the canvas-tag in the index-file
	"width" : 1400,  // *** Landscape: 1400, Portrait: 640
	"height" : 700, // *** Landscape: 700,  Portrait: 920
			
	"backButton" : "", // *** URL backbutton (X) leads to, leave empty for history.go(-1)
	"status" : "", // *** General game status: "" (playing), INTRO (startscreen), HIGHSCORES (after play)
	"score" : 0, // *** Score of player

	"mouseX" : 0, // *** Mouse position is untrustworthy as touch-devices don't support this
	"mouseY" : 0,	
	
	"dragging" : false,	
	"draggingCheck" : false,	
	"draggingX" : 0,	
	"draggingY" : 0,	

	"gravity" : 1, // *** Gravity to make objects fall
	"bouncyness" : 0.5, // *** How high does objects bounce back up

	"pulsate" : 0, // *** Sinus-curved pulsating between 0 and 1
	"pulsateCos" : 0, // *** Cosinus-curved pulsating between 0 and 1
	"pulsateX" : 0,	
	"pulsateSpeed" : 0.2, // *** Speed of sinus/cosinus pulsation

	"highscoreName" : getCookie("highscoreName"),	
	"highscoreEmail" : getCookie("highscoreEmail"),	
	"highscoreAgreedTerms" : getCookie("highscoreAgreedTerms"),	
	"highscoreNewsletter" : getCookie("highscoreNewsletter"),	
	"highscoreGamePlay" : "",	
	"highscoreListSize" : 11, // *** Player is the middle one (unless top/bottom player)
	"highscoreListLineheight" : 47,	
	"highscoreListScroll" : 0, // *** Indicates how many pages up/down the user has scrolled, compared from the page the user is on (page 0)	
	"highscoreListBusy" : false,
	"highscoreList" : new Array(),
	
	
	"keyCount" : 0,

	"demoParticleSelected" : 1,
	"demoParticleAmount" : 1,

	"music" : "",	
	"loopingMusic" : 1,

	"hangmanWordsDone" : 0,
	"hangmanWordsDoneMax" : 5,
	"hangmanWord" : "", 
	"hangmanWordVisible" : "",
	"hangmanLettersUnused" : "",
	"hangmanLettersUsed" : "",
	
	"hangmanTreasure" : 8, // 8
	"hangmanTreasure1Y" : 0,	"hangmanTreasure1Yspeed" : 0,
	"hangmanTreasure2Y" : 0,	"hangmanTreasure2Yspeed" : 0,
	"hangmanTreasure3Y" : 0,	"hangmanTreasure3Yspeed" : 0,
	"hangmanTreasure4Y" : 0,	"hangmanTreasure4Yspeed" : 0,
	"hangmanTreasure5Y" : 0,	"hangmanTreasure5Yspeed" : 0,
	"hangmanTreasure6Y" : 0,	"hangmanTreasure6Yspeed" : 0,
	"hangmanTreasure7Y" : 0,	"hangmanTreasure7Yspeed" : 0,
	"hangmanTreasure8Y" : 0,	"hangmanTreasure8Yspeed" : 0,

	"hangmanMinigame" : false,	
	"hangmanMinigameCount" : 0,	

	"hangmanAni" : "",	
	"hangmanAniCount" : 0,	
	"hangmanAddedScore" : 100,	
	
	"hangmanScoreAddedDarken" : 0,	
	"hangmanPreviousCorrect" : false,	
	"hangmanEnded" : false,	
	"hangmanEndedY" : 0,	
	
	
};

// *** Spots (locations in game; capitalized for recognition)
var spot = {

	// *** UI
	"WINDOW_BUTTONS"	: { "x" : game["width"] - 75,	"y" : 15,	"margin" : 10 },
	"CLOSE_ICON" 		: { "x" : 10000,		"y" : 15,	"width" : 60,	"height" : 60 }, // *** x gets recalculated according to visible icons
	"FULLSCREEN_ICON" 	: { "x" : 10000,		"y" : 15,	"width" : 60,	"height" : 60 }, // *** x gets recalculated according to visible icons
	"SOUND_ICON" 		: { "x" : 10000,		"y" : 15,	"width" : 60,	"height" : 60 }, // *** x gets recalculated according to visible icons
	"KEYBOARD_ICON"		: { "x" : 10000,		"y" : 15,	"width" : 60,	"height" : 60 }, // *** x gets recalculated according to visible icons	
	"BUTTON" 		: { "paddingBottom" : 36, 	"font" : "bold 22px Arial",		"color" : "#FFFFFF",	"shadow" : true,	"paddingBottomHover" : 33, 	"fontHover" : "bold 22px Arial",	"colorHover" : "#FFFFFF",	"shadowHover" : true, },

	// *** Intro / playbutton / preload
	"INTRO" 		: { "x" : 0,				"y" : 0 },
	"INTRO_LOGO"	 	: { "x" : game["width"]/2,		"y" : game["height"]/2 - 230 },
	"INTRO_PLAYBUTTON" 	: { "x" : game["width"]/2 - 230/2,	"y" : game["height"]/2 - 230/2, 	"width" : 230, 		"height" : 230 },
	"INTRO_PRELOADER"	: { "x" : game["width"]/2 - 476/2,	"y" : 310, 				"width" : 475, 		"height" : 70,		"paddingLeft" : 13,	"paddingTop" : 9,	"preloaderWidth" : 448,		"preloaderHeight" : 50, },
	"INTRO_PRELOAD_MESSAGE"	: { "x" : game["width"]/2,		"y" : game["height"]/2 + 150,		"font" : "bold 20px Arial", 	"color" : "#000000", 	"textAlign" : "center",	"shadow" : false,	"lineHeight" : 24  },

	"INTRO_MANEUVRE" 	: { "x" : game["width"]/2,		"y" : game["height"]/2,			"font" : "bold 46px Arial", 	"color" : "#FFFFFF", 	"textAlign" : "center",		"shadow" : true,	"lineHeight" : 50,	"paddingTop" : 230 },

	"INTRO_VERSION" 	: { "x" : game["width"] - 20,		"y" : game["height"] - 20,		"font" : "12px Arial", 	"color" : "#FFFFFF", 	"textAlign" : "right",	"shadow" : true },
	"INTRO_IOS_ALERT"	: { "x" : game["width"]/2 - 400/2-4,	"y" : game["height"]/2-125, 		"font" : "bold 22px Arial", 	"color" : "#000000", 	"textAlign" : "center",	"shadow" : false,	"lineHeight" : 24 }, 
	"INTRO_IOS_BUTTON"	: { "x" : game["width"]/2 - 200/2,	"y" : game["height"]/2-125+177 }, 
	"INTRO_NINJA"		: { "x" : game["width"]/2 - 600/2,	"y" : game["height"]/2-150 }, 
	"INTRO_PLAY_BUTTON"	: { "x" : game["width"]/2 - 210,	"y" : game["height"]/2+230 }, 
	"INTRO_HIGHSCORE_BUTTON": { "x" : game["width"]/2 + 10,		"y" : game["height"]/2+230 }, 


	// *** Game
	"BG"	: { "x" : 0,		"y" : 0, }, 

	"KNIGHT"		: { "x" : 118,		"y" : 278-60 }, 

	"SCORE_SHADOW"		: { "x" : 1223,	"y" : 274+4, 		"font" : "bold 60px Arial", 	"color" : "#462808", 	"textAlign" : "center",	"shadow" : false,	"lineHeight" : 60 }, 
	"SCORE"			: { "x" : 1223,	"y" : 274, 		"font" : "bold 60px Arial", 	"color" : "#e4a733", 	"textAlign" : "center",	"shadow" : false,	"lineHeight" : 60 }, 

	"SCORE_ADDED_SHADOW"	: { "x" : 1226,	"y" : 152-2, 		"font" : "bold 36px Arial", 	"color" : "#e4a833", 	"textAlign" : "center",	"shadow" : false,	"lineHeight" : 60 }, 
	"SCORE_ADDED"		: { "x" : 1226,	"y" : 152, 		"font" : "bold 36px Arial", 	"color" : "#5e321f", 	"textAlign" : "center",	"shadow" : false,	"lineHeight" : 60 }, 
	"SCORE_ADDED_IMAGE"	: { "x" : 1088+16,	"y" : 119 }, 

	"MINIGAME_INFO_SHADOW"	: { "x" : 700,	"y" : 650+3, 		"font" : "bold 80px Arial", 	"color" : "#000000", 	"textAlign" : "center",	"shadow" : false,	"lineHeight" : 60 }, 
	"MINIGAME_INFO"		: { "x" : 700,	"y" : 650, 		"font" : "bold 80px Arial", 	"color" : "#f8de35", 	"textAlign" : "center",	"shadow" : false,	"lineHeight" : 60 }, 

	"WORD_SHADOW"		: { "x" : 550,	"y" : 160+4, 		"font" : "bold 100px Arial", 	"color" : "#000000", 	"textAlign" : "center",	"shadow" : true,	"lineHeight" : 100 }, 
	"WORD"			: { "x" : 550,	"y" : 160, 		"font" : "bold 100px Arial", 	"color" : "#f8de35", 	"textAlign" : "center",	"shadow" : true,	"lineHeight" : 100 }, 

	"USED_LETTERS_SHADOW"	: { "x" : 550,	"y" : 234+2, 		"font" : "bold 30px Arial", 	"color" : "#000000", 	"textAlign" : "center",	"shadow" : false,	"lineHeight" : 100 }, 
	"USED_LETTERS"		: { "x" : 550,	"y" : 234, 		"font" : "bold 30px Arial", 	"color" : "#d2243e", 	"textAlign" : "center",	"shadow" : false,	"lineHeight" : 100 }, 


	"TREASURE_1"		: { "x" : 598,		"y" : 417 }, 
	"TREASURE_2"		: { "x" : 522,		"y" : 452 }, 
	"TREASURE_3"		: { "x" : 422,		"y" : 452 }, 
	"TREASURE_4"		: { "x" : 465,		"y" : 436 }, 
	"TREASURE_5"		: { "x" : 678,		"y" : 435 }, 
	"TREASURE_6"		: { "x" : 665,		"y" : 453 }, 
	"TREASURE_7"		: { "x" : 483,		"y" : 455 }, 
	"TREASURE_8"		: { "x" : 716,		"y" : 452 }, 
	
	// *** Highscore	
	"HIGHSCORE_AREA"	: { "x" : game["width"]/2 - 400,		"y" : 20, 	"width" : 795, 		"height" : 670,		"font" : "28px Arial", 	"color" : "#21170e",  	"textAlign" : "center" },
	"HIGHSCORE_POSITIONS"	: { "x" : game["width"]/2 - 400 + 190,		"y" : 80,	"paddingLeft" : -125, 	"paddingTop" : -11,	"font" : "28px Arial", 	"color" : "#21170e", 	"colorAlt" : "#fdd086", 	"textAlign" : "right" },
	"HIGHSCORE_NAMES"	: { "x" : game["width"]/2 - 400 + 210,		"y" : 80,							"font" : "28px Arial", 	"color" : "#21170e", 	"colorAlt" : "#fdd086", 	"textAlign" : "left" },
	"HIGHSCORE_SCORES"	: { "x" : game["width"]/2 - 400 + 630,		"y" : 80,							"font" : "28px Arial", 	"color" : "#21170e", 	"colorAlt" : "#fdd086", 	"textAlign" : "right" },
	
	"HIGHSCORE_TEXT_SCORE"	: { "x" : game["width"]/2 - 400 + 866,		"y" : 300,	"font" : "32px Arial",	"color" : "#fffabc",	"textAlign" : "center" },
	"HIGHSCORE_TEXT_POS"	: { "x" : game["width"]/2 - 400 + 866,		"y" : 300 + 46,	"font" : "32px Arial",	"color" : "#fffabc",	"textAlign" : "center" },
	"HIGHSCORE_SUBMIT"	: { "x" : game["width"]/2 - 400 + 765,		"y" : 400,	"paddingBottom" : 50 },
	"HIGHSCORE_PLAY"	: { "x" : game["width"]/2 - 400 + 765,		"y" : 500,	"paddingBottom" : 50 },
	
	"HIGHSCORE_SCROLL_TOP"		: { "x" : game["width"]/2 - 184 + 70 * 0,		"y" : 632, 	"width" : 70, 		"height" : 50 },
	"HIGHSCORE_SCROLL_UP"		: { "x" : game["width"]/2 - 184 + 70 * 1,		"y" : 632, 	"width" : 70, 		"height" : 50 },
	"HIGHSCORE_SCROLL_USER"		: { "x" : game["width"]/2 - 184 + 70 * 2,		"y" : 632 - 1, 	"width" : 84, 		"height" : 51 },
	"HIGHSCORE_SCROLL_DOWN"		: { "x" : game["width"]/2 - 184 + 70 * 3 + 14,	"y" : 632, 	"width" : 70, 		"height" : 50 },
	"HIGHSCORE_SCROLL_BOTTOM"	: { "x" : game["width"]/2 - 184 + 70 * 4 + 14,	"y" : 632, 	"width" : 70, 		"height" : 50 },

};



// *** Objects
var o = { }; 

var oPrototype = {


	"TREASURE_BEAM" : { 	
	
		"category" : "treasure_beams",
		
		"manifest" : "treasure_1",
		"hasShadow" : false,

		"xSpeed" : 0,
		"ySpeed" : -2,
		
		"r" : 0,
		"rSpeed" : 0,
	},	

	"GLITTERBOX" : { 	
	
		"category" : "particles",
		
		"width" : 200,
		"height" : 150,
				
		"speed" : 10,
		"particle" : 3,
		"position" : "top",
		"count" : 0,
		"mirrored" : true,	
	},	

	"GLITTERCIRCLE" : { 	
	
		"category" : "particles",
		
		"width" : 200,
		"height" : 150,
				
		"speed" : 0.12,
		"particle" : 3,
		"count" : 0,
		"mirrored" : true,
	},	

	"SUNBEAM" : { 	
	
		"category" : "sunbeam",
				
		"radius" : 400,
		"initialize" : true,

	},	

};




// *** Game engine
var gameEngine = {

	"version" : "v2.25.1",
	// *** Use the last digit (1) for verion updates of your game: increase it here AND increase versionHTML in index.html in the same way. This will eliminate cache problems.
	// *** v2.25 : changed mysql to pdo for php7 compatibility

	"testing" : true,
	"globalAudio" : true,
	
	"ajaxComm" : "game_comm.php", 
	"shaPW" : "great",	
	
	"iOS" : false, "isIphone" : false, "isAndroid" : false,	"isWindowsPhone" : false, "isSmartphone" : false, "isTopWindow" : false, "iPhoneScrollCheck" : false, "iPhoneMaxScroll" : 0, "globalFullscreenDisabled" : false, "globalFullscreen" : false, "userInteractionOccured" : false,
	
	"framerate" : 40,	
	"framerateRecalculations" : 1,	
	"framerateStats" : new Stats(),
	
	"preloadStarted" : false,	
	"preloadPreloadManifestCount" : 0, // *** How many preload items the preload of the preloader has
	"preloadMessage" : "",	
	
	"play" : true,
	"playButtonIntroMessage" : true, // *** Pre-play message about for instance placing the game on startscreen
	"playButtonCount" : 0,
	"playButtonStatus" : "INIT", // *** INIT, PLAY, TURN_MANEUVRE, SWIPE_MANEUVRE, TOGGLE_FULLSCREEN

	"globalAudioDisabled" : false,	
	"audioNoBuffer" : false, // *** Buffering audio is way better but NOT possible in IE and not LOCAL	
	
	"initDone" 	: false,	
	"manifestTotal" : 0,	
	"manifestCount" : 0,
};


// *** Particles
var particle = { }; 

var particlePrototype = {

	1 : { 	"name" : "Smoke",	"manifest" : "particle",	"manifestVariation" : 0,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -3,		"xSpeedVariation" : 3,		"xSpeedChange" : 0.1,		"xSpeedChangeVariation" : 0.1,
		"ySpeed" : 0,		"ySpeedVariation" : 0,		"ySpeedChange" : -0.2,		"ySpeedChangeVariation" : -0.4,
		"size"   : 2,		"sizeVariation"   : 20,		"sizeChange"   : 6,		"sizeChangeVariation"   : 6,
		"alpha"  : 0.5,		"alphaVariation"  : 0.5,	"alphaChange"  : -0.02,		"alphaChangeVariation"  : 0,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	

	2 : { 	"name" : "Black Smoke",	"manifest" : "particle",	"manifestVariation" : 1,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -4,		"xSpeedVariation" : 4,		"xSpeedChange" : 0.2,		"xSpeedChangeVariation" : 0.2,
		"ySpeed" : -2,		"ySpeedVariation" : 0,		"ySpeedChange" : -0.2,		"ySpeedChangeVariation" : -0.2,
		"size"   : 10,		"sizeVariation"   : 60,		"sizeChange"   : 6,		"sizeChangeVariation"   : 6,
		"alpha"  : 0.5,		"alphaVariation"  : 0.5,	"alphaChange"  : -0.02,		"alphaChangeVariation"  : 0,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	

	3 : { 	"name" : "Glitter",	"manifest" : "particle",	"manifestVariation" : 0,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -1,		"xSpeedVariation" : 1,		"xSpeedChange" : 0.01,		"xSpeedChangeVariation" : 0,
		"ySpeed" : 1,		"ySpeedVariation" : -2,		"ySpeedChange" : -0.1,		"ySpeedChangeVariation" : 0,
		"size"   : 50,		"sizeVariation"   : 50,		"sizeChange"   : -3,		"sizeChangeVariation"   : -4,
		"alpha"  : 1,		"alphaVariation"  : 0,		"alphaChange"  : -0.02,		"alphaChangeVariation"  : -0.02,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0.01,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	

	4 : { 	"name" : "Waterhose",	"manifest" : "particle",	"manifestVariation" : 0.1,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -15,		"xSpeedVariation" : 4,		"xSpeedChange" : 0,		"xSpeedChangeVariation" : 0,
		"ySpeed" : -15,		"ySpeedVariation" : -4,		"ySpeedChange" : 1,		"ySpeedChangeVariation" : 1,
		"size"   : 5,		"sizeVariation"   : 100,	"sizeChange"   : 10,		"sizeChangeVariation"   : 0,
		"alpha"  : 0.5,		"alphaVariation"  : 0.5,	"alphaChange"  : -0.01,		"alphaChangeVariation"  : 0,

		"bounces" : true,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : false,		"bouncesRight" : false,
	
		"flashChance" : 0,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	

	5 : { 	"name" : "BounceBalls",	"manifest" : "particle",	"manifestVariation" : 1,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -5,		"xSpeedVariation" : 10,		"xSpeedChange" : 0,		"xSpeedChangeVariation" : 0,
		"ySpeed" : -8,		"ySpeedVariation" : -8,		"ySpeedChange" : 1,		"ySpeedChangeVariation" : 1,
		"size"   : 20,		"sizeVariation"   : 20,		"sizeChange"   : -0.1,		"sizeChangeVariation"   : 0,
		"alpha"  : 1,		"alphaVariation"  : 0,		"alphaChange"  : 0,		"alphaChangeVariation"  : 0,

		"frame" : 0,
		
		"bounces" : false,	"bouncesTop" : false,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0,	"flashSizeMultiplier" : 2,	"destructionChance" : 0.0,
	},	

	6 : { 	"name" : "BentBeam",	"manifest" : "particle",	"manifestVariation" : 0,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -35,		"xSpeedVariation" : 0,		"xSpeedChange" : 1,		"xSpeedChangeVariation" : 0,
		"ySpeed" : -9,		"ySpeedVariation" : 0,		"ySpeedChange" : 0,		"ySpeedChangeVariation" : 0,
		"size"   : 50,		"sizeVariation"   : 50,		"sizeChange"   : -1,		"sizeChangeVariation"   : -2,
		"alpha"  : 1,		"alphaVariation"  : 0,		"alphaChange"  : -0.01,		"alphaChangeVariation"  : 0,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0.01,	"flashSizeMultiplier" : 4,	"destructionChance" : 0,
	},	

	7 : { 	"name" : "CrAzY!",	"manifest" : "particle",	"manifestVariation" : 0.1,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -5,		"xSpeedVariation" : 10,		"xSpeedChange" : -1,		"xSpeedChangeVariation" : 2,
		"ySpeed" : -5,		"ySpeedVariation" : 5,		"ySpeedChange" : 1,		"ySpeedChangeVariation" : -2,
		"size"   : 10,		"sizeVariation"   : 10,		"sizeChange"   : 3,		"sizeChangeVariation"   : 12,
		"alpha"  : 1,		"alphaVariation"  : 0,		"alphaChange"  : -0.01,		"alphaChangeVariation"  : 0,

		"bounces" : true,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0,	"flashSizeMultiplier" : 4,	"destructionChance" : 0,
	},
	

	8 : { 	"name" : "Black Mini Smoke",	"manifest" : "particle",	"manifestVariation" : 0.85,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -1,		"xSpeedVariation" : 1,		"xSpeedChange" : 0.02,		"xSpeedChangeVariation" : 0.02,
		"ySpeed" : 0,		"ySpeedVariation" : 0,		"ySpeedChange" : -0.02,		"ySpeedChangeVariation" : -0.02,
		"size"   : 5,		"sizeVariation"   : 1,		"sizeChange"   : 1,		"sizeChangeVariation"   : 2,
		"alpha"  : 1,		"alphaVariation"  : 0,	"alphaChange"  : -0.03,		"alphaChangeVariation"  : 0,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	

	9 : { 	"name" : "Mini Glitter",	"manifest" : "particle",	"manifestVariation" : 0,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -1,		"xSpeedVariation" : 1,		"xSpeedChange" : 0.01,		"xSpeedChangeVariation" : 0,
		"ySpeed" : 1,		"ySpeedVariation" : -2,		"ySpeedChange" : -0.1,		"ySpeedChangeVariation" : 0,
		"size"   : 25,		"sizeVariation"   : 0,		"sizeChange"   : -1,		"sizeChangeVariation"   : -2,
		"alpha"  : 1,		"alphaVariation"  : 0,		"alphaChange"  : -0.02,		"alphaChangeVariation"  : -0.02,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	
	
	10 : { 	"name" : "Rotating Glitter",	"manifest" : "particle",	"manifestVariation" : 0,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : 0,		"xSpeedVariation" : 0,		"xSpeedChange" : 0,		"xSpeedChangeVariation" : 0,
		"ySpeed" : -5,		"ySpeedVariation" : -2,		"ySpeedChange" : -0.2,		"ySpeedChangeVariation" : 0, // 1 -2 -0.1

		"r" : 0,
		"rSpeed" : 0.1,		"rSpeedVariation" : 0,		"rSpeedChange" : 0,		"rSpeedChangeVariation" : 0,
		"rRadius" : 25,		"rRadiusVariation" : 25,	"rRadiusChange" : -0.3,		"rRadiusChangeVariation" : 0,

		"size"   : 25,		"sizeVariation"   : 25,		"sizeChange"   : -0.4,		"sizeChangeVariation"   : -0.4, //-1 -2
		"alpha"  : 1,		"alphaVariation"  : 0,		"alphaChange"  : -0.01,		"alphaChangeVariation"  : -0.00,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	
	
	11 : { 	"name" : "Rotating Big coins",	"manifest" : "particle",	"manifestVariation" : 1,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : 0,		"xSpeedVariation" : 0,		"xSpeedChange" : 0,		"xSpeedChangeVariation" : 0,
		"ySpeed" : -2,		"ySpeedVariation" : -2,		"ySpeedChange" : -0.03,		"ySpeedChangeVariation" : -0.03, // 1 -2 -0.1

		"r" : 0,
		"rSpeed" : 0.03,	"rSpeedVariation" : 0.02,	"rSpeedChange" : 0.01,		"rSpeedChangeVariation" : 0.02,
		"rRadius" : 15,		"rRadiusVariation" : 15,	"rRadiusChange" : 2,		"rRadiusChangeVariation" : 2,

		"frame" : 0,
		
		"size"   : 4,		"sizeVariation"   : 2,		"sizeChange"   : 1,		"sizeChangeVariation"   : 0, //-1 -2
		"alpha"  : 1,		"alphaVariation"  : 0,		"alphaChange"  : -0.003,	"alphaChangeVariation"  : 0,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : false,		"bouncesRight" : false,
	
		"flashChance" : 0,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	
	
};


// *** Keyboard
var keyboard = {

	"keys"	: { 

		/*
		"1" : { x : 0.5, 	y : 0, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		"2" : { x : 1.5, 	y : 0, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		"3" : { x : 2.5, 	y : 0, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		"4" : { x : 3.5, 	y : 0, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		"5" : { x : 4.5, 	y : 0, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		"6" : { x : 5.5, 	y : 0, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		"7" : { x : 6.5, 	y : 0, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		"8" : { x : 7.5, 	y : 0, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		"9" : { x : 8.5, 	y : 0, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		"0" : { x : 9.5, 	y : 0, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		*/
		
		"Q" : { x : 0, 		y : 1-1, 		pushed : 0, 	type : "letter" },
		"W" : { x : 1, 		y : 1-1, 		pushed : 0, 	type : "letter" },
		"E" : { x : 2, 		y : 1-1, 		pushed : 0, 	type : "letter" },
		"R" : { x : 3, 		y : 1-1, 		pushed : 0, 	type : "letter" },
		"T" : { x : 4, 		y : 1-1, 		pushed : 0, 	type : "letter" },
		"Y" : { x : 5, 		y : 1-1, 		pushed : 0, 	type : "letter" },
		"U" : { x : 6, 		y : 1-1, 		pushed : 0, 	type : "letter" },
		"I" : { x : 7, 		y : 1-1, 		pushed : 0, 	type : "letter" },
		"O" : { x : 8, 		y : 1-1, 		pushed : 0, 	type : "letter" },
		"P" : { x : 9, 		y : 1-1, 		pushed : 0, 	type : "letter" },
		"<<": { x : 10, 	y : 1-1, 		pushed : 0, 	type : "system", 	opacity : 0.35,		extraLength : 2 },
		"Ä" : { x : 12.5, 	y : 1-1, 		pushed : 0, 	type : "letter", 	opacity : 0.35 },
		"É" : { x : 13.5, 	y : 1-1, 		pushed : 0, 	type : "letter", 	opacity : 0.35 },
		"È" : { x : 14.5, 	y : 1-1, 		pushed : 0, 	type : "letter", 	opacity : 0.35 },
		"Ë" : { x : 15.5, 	y : 1-1, 		pushed : 0, 	type : "letter", 	opacity : 0.35 },
		
		"A" : { x : 0.5, 	y : 2-1, 		pushed : 0, 	type : "letter" },
		"S" : { x : 1.5, 	y : 2-1, 		pushed : 0, 	type : "letter" },
		"D" : { x : 2.5, 	y : 2-1, 		pushed : 0, 	type : "letter" },
		"F" : { x : 3.5, 	y : 2-1, 		pushed : 0, 	type : "letter" },
		"G" : { x : 4.5, 	y : 2-1, 		pushed : 0, 	type : "letter" },
		"H" : { x : 5.5, 	y : 2-1, 		pushed : 0, 	type : "letter" },
		"J" : { x : 6.5, 	y : 2-1, 		pushed : 0, 	type : "letter" },
		"K" : { x : 7.5, 	y : 2-1, 		pushed : 0, 	type : "letter" },
		"L" : { x : 8.5, 	y : 2-1, 		pushed : 0, 	type : "letter" },
		"OK": { x : 9.5, 	y : 2-1, 		pushed : 0, 	type : "system", 	opacity : 0.35, 	extraLength : 2 },
		"Ê" : { x : 12, 	y : 2-1, 		pushed : 0, 	type : "letter", 	opacity : 0.35 },
		"Ü" : { x : 13, 	y : 2-1, 		pushed : 0, 	type : "letter", 	opacity : 0.35 },
		"Ï" : { x : 14, 	y : 2-1, 		pushed : 0, 	type : "letter", 	opacity : 0.35 },
		"Ö" : { x : 15, 	y : 2-1, 		pushed : 0, 	type : "letter", 	opacity : 0.35 },
	
		"Z" : { x : 1, 		y : 3-1, 		pushed : 0, 	type : "letter" },
		"X" : { x : 2, 		y : 3-1, 		pushed : 0, 	type : "letter" },
		"C" : { x : 3, 		y : 3-1, 		pushed : 0, 	type : "letter" },
		"V" : { x : 4, 		y : 3-1, 		pushed : 0, 	type : "letter" },
		"B" : { x : 5, 		y : 3-1, 		pushed : 0, 	type : "letter" },
		"N" : { x : 6, 		y : 3-1, 		pushed : 0, 	type : "letter" },
		"M" : { x : 7, 		y : 3-1, 		pushed : 0, 	type : "letter" },
		"-" : { x : 8, 		y : 3-1, 		pushed : 0, 	type : "extra",  },		
		"SHIFT" : { x : 9, 	y : 3-1, 		pushed : 0, 	type : "system", 	opacity : 0.35, 	extraLength : 2 },

		"." : { x : 11.5, 	y : 3-1, 		pushed : 0, 	type : "extra", 	opacity : 0.35 },
		"`" : { x : 12.5, 	y : 3-1, 		pushed : 0, 	type : "extra", 	opacity : 0.35 },		
		" " : { x : 13.5, 	y : 3-1, 		pushed : 0, 	type : "extra", 	opacity : 0.35, 	extraLength : 2 }
	},

	"keyWidth"		: 70,			"keyWidthPortrait"	: 42,
	"keyHeight"		: 50,
	"keyLineheight"		: 34,
	"keyPadding"		: 6,
	"font"			: "bold 32px Arial",
	
	"x"		: 0,
	"y"		: game["height"],
	"yDest"		: game["height"] - 200,
	"xInner"	: 236-180,				"xInnerPortrait"	: 20,
	"yInner"	: 20,

	"backgroundcolor"	: "#000000",
	"foregroundcolor"	: "#461c12",
	"hovercolor"		: "#602e22",
	"disabledcolor"		: "#AA0000",
	"opacity"		: 0.0,
	"shift"			: false,

	"view"			: "", // "" (=all), letter, number, extra or combination like letter/extra (system always shown)
	"status"		: "hidden", // show, hide, hidden
	"forceHiding"		: false // show, hide, hidden
};


// *** Image / sound manifest
manifest = new Array();

// *** Audio
switch(window.location.protocol) { case 'file:': gameEngine["audioNoBuffer"] = true; break; } // *** If LOCAL, no buffering
window.AudioContext = window.AudioContext||window.webkitAudioContext;
var soundContext;
var soundBufferLoader;
var soudBufferList;


// *** Device related checks and hacks before initializing
gameEngine["preloadMessage"] += deviceChecksPreInit();