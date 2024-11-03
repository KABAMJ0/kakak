
gameType = getParameterByName("gameType");
ExtraOption = getParameterByName("extraoption");
console.log ("extra option = " + ExtraOption)
gameNumber = 1;
gameWordCurrent = 1; // *** 1 to 15
gameWordTotal = 15; // *** Total words
gameCollectableItem = 1; // *** Item at end of progressbar for monkey to collect
spelWord = ""
spelledWord = ""
Xcorrectie = 0;
Attempt = 0;
letterBrightness = 0.3;
MistakeFeedback = 0;
spelPool = "boeken"
shift = 0;
ShowKeyboardOnce = "false";
EenmaligeLevelUpEindeTaak = 0;

level = parseInt(getCookie('level'));
if (level!=1&&level!=2&&level!=3&&level!=4&&level!=5&&level!=6){level=1}


var mark = new Array();



var spelledWordsAttempt1 = new Array();
var spelledWordsAttempt2 = new Array();
var spelWords = new Array();



// *** Initialize game after html body has been loaded
function init()
{
	if(!gameEngine["initDone"])
	{
		gameEngine["initDone"] = true;
		
		console.log("Init game with Gamedesign.nl HTML5 game engine " + gameEngine["version"] + " (versionHTML: " + versionHTML + "): all rights reserved");
		console.log("---");

		// *** Device related checks and hacks
		deviceChecksPostInit();
		
		if(gameEngine["playButton"]) playSound("sword");

		setFramerate(gameEngine["framerate"]);
		animateAll();
		
		//resetGame();			
		//showIntro();	
	}
}

// *** Create manifest (collection of images/sounds) for preloading and use in game
function loadManifest()
{
	ge("my_preloader_playbutton").style.display = "none";
	ge("my_preloader_titel").style.display = "block";
	ge("my_preloader_area").style.display = "inline-block";
	
	// *** Preload of sounds
	if(!gameEngine["globalAudioDisabled"])
	{	
		manifestSound("sword", "https://afbeeldingen.spellingoefenen.nl/oefenen/sound/sword.mp3");
		manifestSound("gunshot", "https://afbeeldingen.spellingoefenen.nl/oefenen/sound/gunshot.mp3");
		manifestSound("scream_man", "https://afbeeldingen.spellingoefenen.nl/oefenen/sound/scream_man.mp3");
		manifestSound("bell_chord", "https://afbeeldingen.spellingoefenen.nl/oefenen/sound/bell_chord.mp3");
		manifestSound("error", "https://afbeeldingen.spellingoefenen.nl/oefenen/sound/error.mp3");
		
	}
			
	// *** Preload of images
	manifestImage("bg_result", "https://afbeeldingen.spellingoefenen.nl/oefenen/images/bg_result.png");
	manifestImage("bg_score", "https://afbeeldingen.spellingoefenen.nl/oefenen/images/" + gameType + "/bg_score.png");

	manifestImage("character", "https://afbeeldingen.spellingoefenen.nl/oefenen/images/" + gameType + "/character.png");
	
	manifestImage("letter", "https://afbeeldingen.spellingoefenen.nl/oefenen/images/letter.png");
	manifestImage("letter_empty", "https://afbeeldingen.spellingoefenen.nl/oefenen/images/letter_empty.png");
	
	for(i = 1; i <= 10; i++) manifestImage("character_walk_" + i, "https://afbeeldingen.spellingoefenen.nl/oefenen/images/" + gameType + "/character_walk_" + i + ".png");
	
	manifestImage("progress_bar", "https://afbeeldingen.spellingoefenen.nl/oefenen/images/progress_bar.png");
	manifestImage("progress_bar_green", "https://afbeeldingen.spellingoefenen.nl/oefenen/images/progress_bar_green.png");
	manifestImage("progress_bar_red", "https://afbeeldingen.spellingoefenen.nl/oefenen/images/progress_bar_red.png");
	manifestImage("progress_bar_dot", "https://afbeeldingen.spellingoefenen.nl/oefenen/images/progress_bar_dot.png");

	for(i = 1; i <= 5; i++)
	{
		manifestImage("collectable_item_" + i, "https://afbeeldingen.spellingoefenen.nl/oefenen/images/" + gameType + "/collectable_item_" + i + ".png");
		manifestImage("collectable_item_" + i + "_outline", "https://afbeeldingen.spellingoefenen.nl/oefenen/images/" + gameType + "/collectable_item_" + i + "_outline.png");
		
	}
	
	
	
	
	
	manifestImage("bg", "https://afbeeldingen.spellingoefenen.nl/oefenen/images/" + gameType + "/level" + level + "/bg.jpg");

    for(i = 1; i <= 5; i++)
    {
        manifestImage("collectable_item_" + i, "https://afbeeldingen.spellingoefenen.nl/oefenen/images/" + gameType + "/level" + level + "/collectable_item_" + i + ".png");
        manifestImage("collectable_item_" + i + "_outline", "https://afbeeldingen.spellingoefenen.nl/oefenen/images/" + gameType + "/level" + level + "/collectable_item_" + i + "_outline.png");
        
    }  
	
	
	
		
	manifestImage("intro_bg", "https://afbeeldingen.spellingoefenen.nl/oefenen/images/intro_bg.jpg");

	manifestImage("orange_slice", "https://afbeeldingen.spellingoefenen.nl/oefenen/images/orange_slice.png");
	manifestImage("orange_slice_shadow", "https://afbeeldingen.spellingoefenen.nl/oefenen/images/orange_slice_shadow.png");

	manifestImage("highscore_bg", "https://afbeeldingen.spellingoefenen.nl/oefenen/images/highscore_bg.png");
	manifestImage("highscore_selected", "https://afbeeldingen.spellingoefenen.nl/oefenen/images/highscore_selected.png");
	manifestImage("highscore_between", "https://afbeeldingen.spellingoefenen.nl/oefenen/images/highscore_between.png");

	manifestImage("button", "https://afbeeldingen.spellingoefenen.nl/oefenen/images/button.png");
	manifestImage("button_hover", "https://afbeeldingen.spellingoefenen.nl/oefenen/images/button_hover.png");


	manifestImage("check", "https://afbeeldingen.spellingoefenen.nl/oefenen/images/check.png");
	manifestImage("check_dot", "https://afbeeldingen.spellingoefenen.nl/oefenen/images/check_dot.png");
		
	manifestImage("close", "https://afbeeldingen.spellingoefenen.nl/oefenen/images/ui/close.png");
	manifestImage("sound_on", "https://afbeeldingen.spellingoefenen.nl/oefenen/images/ui/sound_on.png");
	manifestImage("sound_off", "https://afbeeldingen.spellingoefenen.nl/oefenen/images/ui/sound_off.png");
	manifestImage("fullscreen_on", "https://afbeeldingen.spellingoefenen.nl/oefenen/images/ui/fullscreen_on.png");
	manifestImage("fullscreen_off", "https://afbeeldingen.spellingoefenen.nl/oefenen/images/ui/fullscreen_off.png");
	manifestImage("keyboard", "https://afbeeldingen.spellingoefenen.nl/oefenen/images/ui/keyboard.png");
	manifestImage("voice", "https://afbeeldingen.spellingoefenen.nl/oefenen/images/ui/voice.png");
	manifestImage("voice_sentence", "https://afbeeldingen.spellingoefenen.nl/oefenen/images/ui/voice_sentence.png");

	manifestImage("particle", "https://afbeeldingen.spellingoefenen.nl/oefenen/images/particle.png");
	manifestImage("particle_black", "https://afbeeldingen.spellingoefenen.nl/oefenen/images/particle_black.png");
		
	// *** Buffer sound (if not IE or local)	
	bufferSound();
	
	startPreload();
	
	// *** Minimum amount of time that preload screen is visible (to show Gamedesign logo)
	setTimeout(function(){ gameEngine["preloadMinTimeDone"] = true; updatePreloader(); }, gameEngine["preloadMinTime"]);
}


// *** Spots (locations in game; capitalized for recognition)
var spot = {

	"WINDOW_BUTTONS"	: { "x" : 1290,		"y" : 600,	"margin" : 10 },
	"CLOSE_ICON" 		: { "x" : 2335,		"y" : 600,	"width" : 85,	"height" : 78 }, // *** x gets recalculated according to visible icons
	"FULLSCREEN_ICON" 	: { "x" : 2335,		"y" : 600,	"width" : 85,	"height" : 78 }, // *** x gets recalculated according to visible icons
	"SOUND_ICON" 		: { "x" : 2335,		"y" : 600,	"width" : 85,	"height" : 78 }, // *** x gets recalculated according to visible icons
	"KEYBOARD_ICON" 	: { "x" : 2335,		"y" : 600,	"width" : 85,	"height" : 78 }, // *** x gets recalculated according to visible icons
	
	"BUTTON" 		: { "paddingBottom" : 32, 	"font" : "bold 36px Arial",		"color" : "#663300",	"shadow" : true,	"paddingBottomHover" : 29, 	"fontHover" : "bold 36px Arial",	"colorHover" : "#663300",	"shadowHover" : true, },

	"BG"	: { "x" : 0,		"y" : 0 },

	"CHARACTER"	: { "x" : -5,		"y" : 253   },

	"PROGRESS_BAR"	: { "x" : -20,		"y" : 300,		"paddingLeft" : 52,		"paddingTop" : 16,		"interval" : 92   },

	"PROGRESS_BAR_COLLECTABLE_ITEM"	: { "x" : 1346 - 110,		"y" : 352 - 85 },
	
	"COLLECTABLE_ITEM_SHOWCASE"	: { "x" : 700 - 160 - 160 - 160/2,		"y" : 400,		"interval" : 160 },

	"VOICE"	: { "x" : 30,		"y" : 30,	"width" : 85,	"height" : 78  },
	
	"VOICE_SENTENCE"	: { "x" : 30,		"y" : 120,	"width" : 85,	"height" : 78  },

	"WORD"	: { "x" : 180,		"y" : 60,	"interval" : 114  },

	"RESULT_BUTTON_NEXT"	: { "x" : 520,		"y" : 600  },
	"SCORE_BUTTON_NEXT"	: { "x" : 520,		"y" : 600  },

	"SCORE"	: { "x" : 825,		"y" : 170  },



	// *** Demo
	"DEMO_PARTICLE_SOURCE"	: { "x" : 973,		"y" : 680 }, 

	"DEMO_WALK_BUTTON"	: { "x" : 950,		"y" : 10 }, 
	"DEMO_PARTICLE_BUTTON"	: { "x" : 950,		"y" : 100 }, 
	"DEMO_SCREEN_BUTTON"	: { "x" : 950,		"y" : 190 }, 

	"INTRO" 		: { "x" : 0,		"y" : 0 },
	"INTRO_TITLE" 		: { "x" : 700,		"y" : 120 },

	"TITLE" 		: { "x" : 25,		"y" : 580, 	"width" : 200, 		"height" : 15 },
	"LINK_1"		: { "x" : 25,		"y" : 600, 	"width" : 200, 		"height" : 15 },
	"LINK_2"		: { "x" : 25,		"y" : 620, 	"width" : 200, 		"height" : 15 },
	"LINK_3"		: { "x" : 25,		"y" : 640, 	"width" : 200, 		"height" : 15 },
	"DEBUG" 		: { "x" : 25,		"y" : 660, 	"width" : 200, 		"height" : 15 },

	"HIGHSCORE_AREA"	: { "x" : 300,		"y" : 20, 	"width" : 795, 		"height" : 670 },
	"HIGHSCORE_POSITIONS"	: { "x" : 490,		"y" : 80,	"paddingLeft" : -125, 	"paddingTop" : -11 },
	"HIGHSCORE_NAMES"	: { "x" : 490 + 20,	"y" : 80 },
	"HIGHSCORE_SCORES"	: { "x" : 930,		"y" : 80 },
	"HIGHSCORE_TEXT"	: { "x" : 1216,		"y" : 300 },
	"HIGHSCORE_SUBMIT"	: { "x" : 1065,		"y" : 400,	"paddingBottom" : 50 },
	"HIGHSCORE_PLAY"	: { "x" : 1065,		"y" : 530,	"paddingBottom" : 50 },

};



// *** Objects
var o = { }; 

var oPrototype = {	

	"CHARACTER" : { // *** Bunny/mouse
	
		"category" : "character",
		"status" : "stand",		
		"manifest" : "character",
		"hasShadow" : false,

		"xSpeed" : 0,
		"ySpeed" : 0,
		
		"r" : 0,
		"rSpeed" : 0,
		
		"frame" : 1,
		"frame_total" : 10,
						
	},	

	"PROGRESS_BAR_RED" : { 
	
		"category" : "progress_bar",		
		"manifest" : "progress_bar_red",
		"hasShadow" : false, "xSpeed" : 0, "ySpeed" : 0, "r" : 0, "rSpeed" : 0,				
	},	

	"PROGRESS_BAR_GREEN" : { 
	
		"category" : "progress_bar",		
		"manifest" : "progress_bar_green",
		"hasShadow" : false, "xSpeed" : 0, "ySpeed" : 0, "r" : 0, "rSpeed" : 0,				
	},	

	"PROGRESS_BAR_DOT" : { 
	
		"category" : "progress_bar",		
		"manifest" : "progress_bar_dot",
		"hasShadow" : false, "xSpeed" : 0, "ySpeed" : 0, "r" : 0, "rSpeed" : 0,				
	},	

	"COLLECTABLE_ITEM" : { 
	
		"category" : "collectable_item",		
		"manifest" : "collectable_item_1",
		"hasShadow" : false, "xSpeed" : 0, "ySpeed" : 0, "r" : 0, "rSpeed" : 0,				
	},	

};


// *** Game and gameplay
var game = {

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
	"highscoreList" : new Array(),
	
	"keyCount" : 0,

	"demoParticleSelected" : 1,
	"preparevoicebutton" : true,
	"ShowVoiceButton" : true,
	"preparevoicebuttonsentences" : true,
	"ShowVoiceButtonSentences" : true,
	
	
};


// *** Game engine
var gameEngine = {

	"version" : "v2.20.1",
	// *** Use the last digit (1) for verion updates of your game: increase it here AND increase versionHTML in index.html in the same way. This will eliminate cache problems.
	// *** v2.20 : loose init vars organized in neat objects. Fixed getMousePos scrollTop problem om iPhone
	// *** v2.14 : game["pulsate"] now follows sin-wave and has a brother pulsateCos
	// *** v2.13 : WAV support not necessary anymore as all mayor browsers support MP3
	// *** v2.12 : Custom keyboard added

	"testing" : true,
	"globalAudio" : true,
	
	"ajaxComm" : "game_comm.php", 
	
	"shaPW" : "great",	
	
	"iOS" : false, "isIphone" : false, "isAndroid" : false,	"isWindowsPhone" : false, "isSmartphone" : false, "isTopWindow" : false, "iPhoneScrollCheck" : false, "iPhoneMaxScroll" : 0, "globalFullscreenDisabled" : false, "globalFullscreen" : false, "userInteractionOccured" : false,
	
	"framerate" : 40,	
	"framerateRecalculations" : 1,	
	"framerateStats" : new Stats(),
	
	"preloadStarted" : false,	
	"preloadMinTime" : 1000, // *** This may not be changed without permission of gamedesign.nl
	"preloadMinTimeDone" : false,	
	"preloadMessage" : "",	
	
	"play" : true,
	"playButton" : false, // *** Shows a playbutton (a-la-youtube) before game commences

	"globalAudioDisabled" : false,	
	"audioNoBuffer" : false, // *** Buffering audio is way better but NOT possible in IE and not LOCAL	
	
	"initDone" 	: false,	
	"manifestTotal" : 0,	
	"manifestCount" : 0,
};


// *** Particles
var particle = { }; 

var particlePrototype = {

	1 : { 	"name" : "Smoke",	"manifest" : "particle",	"manifestVariation" : 0.25,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -3,		"xSpeedVariation" : 3,		"xSpeedChange" : 0.1,		"xSpeedChangeVariation" : 0.1,
		"ySpeed" : 0,		"ySpeedVariation" : 0,		"ySpeedChange" : -0.1,		"ySpeedChangeVariation" : -0.2,
		"size"   : 1,		"sizeVariation"   : 10,		"sizeChange"   : 3,		"sizeChangeVariation"   : 3,
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
	
		"xSpeed" : -6,		"xSpeedVariation" : 12,		"xSpeedChange" : 0,		"xSpeedChangeVariation" : 0,
		"ySpeed" : -6,		"ySpeedVariation" : 12,		"ySpeedChange" : 0,		"ySpeedChangeVariation" : 1,
		"size"   : 16,		"sizeVariation"   : 20,		"sizeChange"   : -1,		"sizeChangeVariation"   : 0,
		"alpha"  : 1,		"alphaVariation"  : 0,		"alphaChange"  : 0,		"alphaChangeVariation"  : 0,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0.01,	"flashSizeMultiplier" : 5,	"destructionChance" : 0,
	},	

	4 : { 	"name" : "Waterhose",	"manifest" : "particle",	"manifestVariation" : 0.1,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -15,		"xSpeedVariation" : 4,		"xSpeedChange" : 0,		"xSpeedChangeVariation" : 0,
		"ySpeed" : -15,		"ySpeedVariation" : -4,		"ySpeedChange" : 1,		"ySpeedChangeVariation" : 1,
		"size"   : 5,		"sizeVariation"   : 100,	"sizeChange"   : 10,		"sizeChangeVariation"   : 0,
		"alpha"  : 0.5,		"alphaVariation"  : 0.5,	"alphaChange"  : -0.01,		"alphaChangeVariation"  : 0,

		"bounces" : true,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : false,		"bouncesRight" : false,
	
		"flashChance" : 0,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	

	5 : { 	"name" : "BounceBalls",	"manifest" : "particle",	"manifestVariation" : 0.95,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -5,		"xSpeedVariation" : 10,		"xSpeedChange" : 0,		"xSpeedChangeVariation" : 0,
		"ySpeed" : -10,		"ySpeedVariation" : -20,	"ySpeedChange" : 1,		"ySpeedChangeVariation" : 1,
		"size"   : 50,		"sizeVariation"   : 0,		"sizeChange"   : 0,		"sizeChangeVariation"   : 0,
		"alpha"  : 1,		"alphaVariation"  : 0,		"alphaChange"  : 0,		"alphaChangeVariation"  : 0,

		"bounces" : true,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0,	"flashSizeMultiplier" : 2,	"destructionChance" : 0.015,
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
};


// *** Keyboard
var keyboard = {

	"keys"	: { 

		"é" : { x : 0.5, 	y : 0, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		"è" : { x : 1.5, 	y : 0, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		"ë" : { x : 2.5, 	y : 0, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		"ê" : { x : 3.5, 	y : 0, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		"ï" : { x : 4.5, 	y : 0, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		"ü" : { x : 5.5, 	y : 0, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		"ä" : { x : 6.5, 	y : 0, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		"ö" : { x : 7.5, 	y : 0, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		"'" : { x : 8.5, 	y : 0, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		//"0" : { x : 9.5, 	y : 0, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		"-" : { x : 10, 	y : 1, 		pushed : 0, 	type : "extra", 	opacity : 0.75 },
		
		"ç" : { x : 0.5, 	y : 100, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		"ñ" : { x : 1.5, 	y : 100, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		"í" : { x : 2.5, 	y : 100, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		"ú" : { x : 3.5, 	y : 100, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		"ù" : { x : 4.5, 	y : 100, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		"ó" : { x : 5.5, 	y : 100, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		"ò" : { x : 6.5, 	y : 100, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		"á" : { x : 7.5, 	y : 100, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
	
		"q" : { x : 0, 		y : 1, 		pushed : 0, 	type : "letter" },
		"w" : { x : 1, 		y : 1, 		pushed : 0, 	type : "letter" },
		"e" : { x : 2, 		y : 1, 		pushed : 0, 	type : "letter" },
		"r" : { x : 3, 		y : 1, 		pushed : 0, 	type : "letter" },
		"t" : { x : 4, 		y : 1, 		pushed : 0, 	type : "letter" },
		"y" : { x : 5, 		y : 1, 		pushed : 0, 	type : "letter" },
		"u" : { x : 6, 		y : 1, 		pushed : 0, 	type : "letter" },
		"i" : { x : 7, 		y : 1, 		pushed : 0, 	type : "letter" },
		"o" : { x : 8, 		y : 1, 		pushed : 0, 	type : "letter" },
		"p" : { x : 9, 		y : 1, 		pushed : 0, 	type : "letter" },
		
		"Q" : { x : 0, 		y : 100, 		pushed : 0, 	type : "letter" },
		"W" : { x : 1, 		y : 100, 		pushed : 0, 	type : "letter" },
		"E" : { x : 2, 		y : 100, 		pushed : 0, 	type : "letter" },
		"R" : { x : 3, 		y : 100, 		pushed : 0, 	type : "letter" },
		"T" : { x : 4, 		y : 100, 		pushed : 0, 	type : "letter" },
		"Y" : { x : 5, 		y : 100, 		pushed : 0, 	type : "letter" },
		"U" : { x : 6, 		y : 100, 		pushed : 0, 	type : "letter" },
		"I" : { x : 7, 		y : 100, 		pushed : 0, 	type : "letter" },
		"O" : { x : 8, 		y : 100, 		pushed : 0, 	type : "letter" },
		"P" : { x : 9, 		y : 100, 		pushed : 0, 	type : "letter" },
		
		
		"<<" : { x : 9.5, 	y : 0, 		pushed : 0, 	type : "system", 	opacity : 0.75,		extraLength : 2 },
		
		"a" : { x : 0.5, 	y : 2, 		pushed : 0, 	type : "letter" },
		"s" : { x : 1.5, 	y : 2, 		pushed : 0, 	type : "letter" },
		"d" : { x : 2.5, 	y : 2, 		pushed : 0, 	type : "letter" },
		"f" : { x : 3.5, 	y : 2, 		pushed : 0, 	type : "letter" },
		"g" : { x : 4.5, 	y : 2, 		pushed : 0, 	type : "letter" },
		"h" : { x : 5.5, 	y : 2, 		pushed : 0, 	type : "letter" },
		"j" : { x : 6.5, 	y : 2, 		pushed : 0, 	type : "letter" },
		"k" : { x : 7.5, 	y : 2, 		pushed : 0, 	type : "letter" },
		"l" : { x : 8.5, 	y : 2, 		pushed : 0, 	type : "letter" },
		
		
		"A" : { x : 0.5, 	y : 100, 		pushed : 0, 	type : "letter" },
		"S" : { x : 1.5, 	y : 200, 		pushed : 0, 	type : "letter" },
		"D" : { x : 2.5, 	y : 200, 		pushed : 0, 	type : "letter" },
		"F" : { x : 3.5, 	y : 200, 		pushed : 0, 	type : "letter" },
		"G" : { x : 4.5, 	y : 200, 		pushed : 0, 	type : "letter" },
		"H" : { x : 5.5, 	y : 200, 		pushed : 0, 	type : "letter" },
		"J" : { x : 6.5, 	y : 200, 		pushed : 0, 	type : "letter" },
		"K" : { x : 7.5, 	y : 200, 		pushed : 0, 	type : "letter" },
		"L" : { x : 8.5, 	y : 200, 		pushed : 0, 	type : "letter" },
		"OK" : { x : 9.5, 	y : 2, 		pushed : 0, 	type : "system", 	opacity : 0.75, 	extraLength : 2 },
		
	
		"z" : { x : 1, 		y : 3, 		pushed : 0, 	type : "letter" },
		"x" : { x : 2, 		y : 3, 		pushed : 0, 	type : "letter" },
		"c" : { x : 3, 		y : 3, 		pushed : 0, 	type : "letter" },
		"v" : { x : 4, 		y : 3, 		pushed : 0, 	type : "letter" },
		"b" : { x : 5, 		y : 3, 		pushed : 0, 	type : "letter" },
		"n" : { x : 6, 		y : 3, 		pushed : 0, 	type : "letter" },
		"m" : { x : 7, 		y : 3, 		pushed : 0, 	type : "letter" },
		"SHIFT" : { x : 9, 	y : 3, 		pushed : 0, 	type : "system", 	opacity : 0.75, 	extraLength : 2 },
		
		"Z" : { x : 1, 		y : 300, 		pushed : 0, 	type : "letter" },
		"X" : { x : 2, 		y : 300, 		pushed : 0, 	type : "letter" },
		"C" : { x : 3, 		y : 300, 		pushed : 0, 	type : "letter" },
		"V" : { x : 4, 		y : 300, 		pushed : 0, 	type : "letter" },
		"B" : { x : 5, 		y : 300, 		pushed : 0, 	type : "letter" },
		"N" : { x : 6, 		y : 300, 		pushed : 0, 	type : "letter" },
		"M" : { x : 7, 		y : 300, 		pushed : 0, 	type : "letter" },
		//"@" : { x : 8, 		y : 3, 		pushed : 0, 	type : "extra", 	opacity : 0.75 },
		"." : { x : 8, 		y : 3, 		pushed : 0, 	type : "extra", 	opacity : 0.75 },
		"?" : { x : 8, 		y : 300, 		pushed : 0, 	type : "extra", 	opacity : 0.75 },
		"0" : { x : 8, 		y : 300, 		pushed : 0, 	type : "extra", 	opacity : 0.75 },
		"1" : { x : 8, 		y : 300, 		pushed : 0, 	type : "extra", 	opacity : 0.75 },
		"2" : { x : 8, 		y : 300, 		pushed : 0, 	type : "extra", 	opacity : 0.75 },
		"3" : { x : 8, 		y : 300, 		pushed : 0, 	type : "extra", 	opacity : 0.75 },
		"4" : { x : 8, 		y : 300, 		pushed : 0, 	type : "extra", 	opacity : 0.75 },
		"5" : { x : 8, 		y : 300, 		pushed : 0, 	type : "extra", 	opacity : 0.75 },
		"6" : { x : 8, 		y : 300, 		pushed : 0, 	type : "extra", 	opacity : 0.75 },
		"7" : { x : 8, 		y : 300, 		pushed : 0, 	type : "extra", 	opacity : 0.75 },
		"8" : { x : 8, 		y : 300, 		pushed : 0, 	type : "extra", 	opacity : 0.75 },
		"9" : { x : 8, 		y : 300, 		pushed : 0, 	type : "extra", 	opacity : 0.75 },
		"`" : { x : 8, 		y : 300, 		pushed : 0, 	type : "extra", 	opacity : 0.75 },
		"’" : { x : 8, 		y : 300, 		pushed : 0, 	type : "extra", 	opacity : 0.75 },
		
		
		" " : { x : 2, 	y : 4, 		pushed : 0, 	type : "letter", 	opacity : 0.75, 	extraLength : 7 }
	},

	"key_width"		: 96,
	"key_height"		: 51,
	"key_lineheight"	: 37,
	"key_padding"		: 8,
	"font"			: "32px Arial",
	
	"x"		: 0,
	"y"		: 700,
	"y_dest"	: 350,
	"x_inner"	: 112,
	"y_inner"	: 20,

	"backgroundcolor"	: "#000000",
	"foregroundcolor"	: "#FFFFFF",
	"hovercolor"		: "#AAAAAA",
	"disabledcolor"		: "#AA0000",
	"opacity"		: 0.85,

	"view"			: "", // "" (=all), letter, number, extra or combination like letter/extra (system always shown)
	"status"		: "hidden" // show, hide, hidden
};


// *** Image / sound manifest
manifest = new Array();


// *** Speed up preload screen if testing: this may not be changed without permission of gamedesign.nl
if(gameEngine["testing"]) gameEngine["preloadMinTime"] = 10; 


// *** Audio
switch(window.location.protocol) { case 'file:': gameEngine["audioNoBuffer"] = true; break; } // *** If LOCAL, no buffering
window.AudioContext = window.AudioContext||window.webkitAudioContext;
var soundContext;
var soundBufferLoader;
var soudBufferList;


// *** Device related checks and hacks before initializing
gameEngine["preloadMessage"] += deviceChecksPreInit();