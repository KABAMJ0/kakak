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
		
		ge('myCanvasGamedesign').style.display = 'none';
		
		//completeWL = "a,b";
		
		wlInit(completeWL);
		
				
		startGame();	
		//startRace();		
		
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

	manifestImage("bg_intro", 		"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/speedchaser/images/bg_intro.jpg");
	manifestImage("logo", 			"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/speedchaser/images/logo.png");
	manifestImage("particle", 		"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/speedchaser/images/particle.png");
	manifestImage("particle_black", 	"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/speedchaser/images/particle_black.png");
	manifestImage("sunbeam", 		"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/speedchaser/images/sunbeam.png");

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
					
	startPreload();
}

// *** Create manifest (collection of images/sounds) for preloading and use in game
function loadManifest()
{
	// *** Preload of sounds
	if(!gameEngine["globalAudioDisabled"])
	{	
		manifestSound("sword", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/speedchaser/sound/sword.mp3");
		manifestSound("click", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/speedchaser/sound/click.mp3");
		manifestSound("music", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/speedchaser/sound/music2.mp3");

		manifestSound("car_start", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/speedchaser/sound/car_start.mp3");
		manifestSound("car_skid", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/speedchaser/sound/car_skid2.mp3");
		manifestSound("car_leave", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/speedchaser/sound/car_leave.mp3");

		manifestSound("bonus", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/speedchaser/sound/bonus.mp3");
		manifestSound("error", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/speedchaser/sound/error2.mp3");
		manifestSound("crash", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/speedchaser/sound/crash.mp3");
		manifestSound("crash_worse", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/speedchaser/sound/crash_worse.mp3");

		manifestSound("honk1", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/speedchaser/sound/honk1.mp3"); manifestSound("honk2", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/speedchaser/sound/honk2.mp3"); manifestSound("honk3", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/speedchaser/sound/honk3.mp3");
		
	}
			
	manifestImage("highscore_bg", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/bg.png");
	manifestImage("highscore_selected", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/selected.png");
	manifestImage("highscore_between", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/between.png");
	manifestImage("highscore_top", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/top.png");		manifestImage("highscore_top_hover", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/top_hover.png");
	manifestImage("highscore_up", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/up.png");		manifestImage("highscore_up_hover", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/up_hover.png");
	manifestImage("highscore_user", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/user.png");		manifestImage("highscore_user_hover", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/user_hover.png");
	manifestImage("highscore_down", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/down.png");		manifestImage("highscore_down_hover", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/down_hover.png");
	manifestImage("highscore_bottom", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/bottom.png");	manifestImage("highscore_bottom_hover", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/bottom_hover.png");

	manifestImage("button", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/speedchaser/images/button.png");		
	manifestImage("button_hover", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/speedchaser/images/button_hover.png");
	
	manifestImage("bg", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/speedchaser/images/bg.png");
	manifestImage("fg", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/speedchaser/images/fg.png");

	manifestImage("bg_score", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/speedchaser/images/bg_score.png");

	manifestImage("arrow_left", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/speedchaser/images/arrow_left.png");
	manifestImage("arrow_right", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/speedchaser/images/arrow_right.png");

	// *** Carselect
	manifestImage("carselect_bg", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/speedchaser/images/carselect/bg.png");
	manifestImage("carselect_go", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/speedchaser/images/carselect/go.png");
	for(i = 1; i <= game["carMax"]; i++) manifestImage("carselect_" + i, "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/speedchaser/images/carselect/" + i + ".png");

	// *** Cars
	manifestImage("carselect_wheel_1", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/speedchaser/images/carselect/wheel_1.png");
	manifestImage("carselect_wheel_2", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/speedchaser/images/carselect/wheel_2.png");
	manifestImage("carselect_wheel_3", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/speedchaser/images/carselect/wheel_3.png");
	
	manifestImage("carselect_1_chassie", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/speedchaser/images/carselect/1_chassie.png");
	manifestImage("carselect_2_chassie", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/speedchaser/images/carselect/2_chassie.png");
	manifestImage("carselect_3_chassie", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/speedchaser/images/carselect/3_chassie.png");
	manifestImage("carselect_4_chassie", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/speedchaser/images/carselect/4_chassie.png");

	for(i = 1; i <= 10; i++) manifestImage("car_" + i, "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/speedchaser/images/car/" + i + ".png"); 
	
	// *** Buffer sound (if not IE or local)	
	bufferSound();
	startPreload();
}


// *** Game and gameplay
var game = {

	"orientation" : "landscape", // *** landscape or portrait. Also change the class/dimensions in the canvas-tag in the index-file
	"width" : 1400,  // *** Landscape: 1400, Portrait: 640
	"height" : 700, // *** Landscape: 700,  Portrait: 920
			
	"backButton" : "", // *** URL backbutton (X) leads to, leave empty for history.go(-1)
	
	"status" : "", // *** General game status: "" (playing), INTRO (startscreen), HIGHSCORES (after play)
	"statusCount" : 0,
	
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
	"music" : "",	
	"loopingMusic" : 1,

	"blackOut" : 0,
	"horizon" : 196,

	"objectSpeed" : 1.08,
	"raceInitRounds" : 1,
	
	"car" : 2,
	"carX" : 700, // 700
	"carY" : 615,
	"carLives" : 5,
	"carXspeed" : 0,
	"carLength" : 40,
	"carFrame" : 1,
	"carTrack" : 2,
	"carTrackX1" : 700-334,
	"carTrackX2" : 700,
	"carTrackX3" : 700+334,
	"carMax" : 4,
	"carSpeed" : 1.08,
	"carSpeedGear1" : 1.06,
	"carSpeedGear2" : 1.08,
	"carSpeedGear3" : 1.10,
	"carGear" : 2,
	"carSelectExhaustX1" : -340+5,	"carSelectExhaustY1" : 84,
	"carSelectExhaustX2" : -448+10,	"carSelectExhaustY2" : 93,
	"carSelectExhaustX3" : -348+0,	"carSelectExhaustY3" : 77,
	"carSelectExhaustX4" : -430+10,	"carSelectExhaustY4" : 89,
	"carSpawnTrackX1" : 700-15,
	"carSpawnTrackX2" : 700,
	"carSpawnTrackX3" : 700+15,
	"carObjectWidth" : 520,
	"carObjectHeight" : 520,

	// *** Player cars
	"carWidth1" : 160,	"carSteering1" : 1.3,	"carWobblyness1" : 0.15,	"carExhaust1X1" : 48, "carExhaust1Y1" : -15,		"carExhaust1X2" : 48, "carExhaust1Y2" : -15,	"carShakyness1" : 0,	"carSpeed1" : 1.080,
	"carWidth2" : 160,	"carSteering2" : 1.3,	"carWobblyness2" : 0.25,	"carExhaust2X1" : -57, "carExhaust2Y1" : -25,		"carExhaust2X2" : 57, "carExhaust2Y2" : -25,	"carShakyness2" : 0,	"carSpeed2" : 1.080,
	"carWidth3" : 166,	"carSteering3" : 0.7,	"carWobblyness3" : 0.45,	"carExhaust3X1" : 36, "carExhaust3Y1" : -14,		"carExhaust3X2" : 36, "carExhaust3Y2" : -14,	"carShakyness3" : 2,	"carSpeed3" : 1.080,
	"carWidth4" : 160,	"carSteering4" : 2.6,	"carWobblyness4" : 0.10,	"carExhaust4X1" : -57, "carExhaust4Y1" : -27,		"carExhaust4X2" : 57, "carExhaust4Y2" : -27,	"carShakyness4" : 0,	"carSpeed4" : 1.080,

	// *** Opponents
	"carWidth6" : 200 * 0.84,
	"carWidth7" : 166 * 0.84,
	"carWidth8" : 184 * 0.84,
	"carWidth9" : 156 * 0.84,
	"carWidth10" : 160 * 0.84,
	
	"word" : "",
	"wordTyped" : "",
	"wordSyllable" : {},
	"wordSyllableCount" : 0,
	"wordCount" : 0,
	"wordFrequency" : 100,
	"cartimer" : 0,
	"cardistance" : 60,
	
};

// *** Woordenlijst
var wl = { }; 

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

	// *** Carselect
	"CARSELECT_CAR"		: { "x" : 700,		"y" : 440, }, 
	"CARSELECT_ARROW_LEFT"	: { "x" : 0,		"y" : 305, 	"width" : 161, 		"height" : 201 },
	"CARSELECT_ARROW_RIGHT"	: { "x" : 1400-161,	"y" : 305, 	"width" : 161, 		"height" : 201 },
	"CARSELECT_GO"		: { "x" : 700-240/2,	"y" : 700-162, 	"width" : 240, 		"height" : 162 },


	// *** Game
	"BG"			: { "x" : 0,		"y" : 0, }, 
	"WORD"			: { "x" : 0,		"y" : 0,	"font" : "bold 74px Arial", 	"color" : "#FFFFFF", 	"textAlign" : "center",	"shadow" : true,	"lineHeight" : 24 }, 
	"SCORE"			: { "x" : 0,		"y" : 700-120,	}, 
	"SCORE_TEXT"		: { "x" : 135,		"y" : 680,	"font" : "bold 74px Arial", 	"color" : "#FFFFFF", 	"textAlign" : "center",	"shadow" : true,	"lineHeight" : 24,	"maxWidth" : 300 }, 
	
	
	"WL_WORD"		: { "x" : 700-70,	"y" : 110,	"font" : "bold 74px Arial", 	"color" : "#FFFFFF", 	"textAlign" : "right",	"shadow" : true,	"lineHeight" : 24,	"maxWidth" : 600 }, 
	"WL_WORD_TYPED"		: { "x" : 700+70,	"y" : 110,	"font" : "bold 74px Arial", 	"color" : "#ffff66", 	"textAlign" : "left",	"shadow" : true,	"lineHeight" : 24,	"maxWidth" : 600 }, 
	"WL_WORD_LAST"		: { "x" : 700,		"y" : 660,	"font" : "bold 62px Arial", 	"color" : "#FFFFFF", 	"textAlign" : "center",	"shadow" : true,	"lineHeight" : 24 }, 


	
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

	"CAR" : { 	
	
		"category" : "car",
		
		"width" : 202,
		"height" : 514,
				
		"thisType" : 5,
		"track" : 2,
	},	

	"SYLLABLE" : { 	
	
		"category" : "syllable",
		
		"width" : 202,
		"height" : 514,
				
		"thisType" : 5,
		"track" : 2,
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

	1 : { 	"name" : "Smoke",	"manifest" : "particle",	"manifestVariation" : 0.25,	"manifestVariationManifest" : "particle_black",		
	
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
	
	10 : { 	"name" : "",	"manifest" : "particle",	"manifestVariation" : 1,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -5,		"xSpeedVariation" : -5,		"xSpeedChange" : 0.02,		"xSpeedChangeVariation" : 0.02,
		"ySpeed" : 1,		"ySpeedVariation" : -2,		"ySpeedChange" : -0.1,		"ySpeedChangeVariation" : 0,
		"size"   : 35,		"sizeVariation"   : 35,		"sizeChange"   : 1,		"sizeChangeVariation"   : 1,
		"alpha"  : 1,		"alphaVariation"  : 0,		"alphaChange"  : -0.02,		"alphaChangeVariation"  : -0.01,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	
	
	11 : { 	"name" : "Exhaust",	"manifest" : "particle",	"manifestVariation" : 1,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : 0,		"xSpeedVariation" : 0,		"xSpeedChange" : 0,		"xSpeedChangeVariation" : 0,
		"ySpeed" : 5,		"ySpeedVariation" : 0,		"ySpeedChange" : 1,		"ySpeedChangeVariation" : 0,
		"size"   : 10,		"sizeVariation"   : 20,		"sizeChange"   : 15,		"sizeChangeVariation"   : 0,
		"alpha"  : 0.5,		"alphaVariation"  : 0.5,	"alphaChange"  : -0.03,		"alphaChangeVariation"  : 0,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	

	12 : { 	"name" : "Exhaust (big)",	"manifest" : "particle",	"manifestVariation" : 1,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : 0,		"xSpeedVariation" : 0,		"xSpeedChange" : 0,		"xSpeedChangeVariation" : 0,
		"ySpeed" : 5,		"ySpeedVariation" : 0,		"ySpeedChange" : 1,		"ySpeedChangeVariation" : 0,
		"size"   : 50,		"sizeVariation"   : 50,		"sizeChange"   : 50,		"sizeChangeVariation"   : 50,
		"alpha"  : 1,		"alphaVariation"  : 0,		"alphaChange"  : -0.05,		"alphaChangeVariation"  : 0,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
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
		"Í" : { x : 12, 	y : 2-1, 		pushed : 0, 	type : "letter", 	opacity : 0.35 },
		"Ì" : { x : 13, 	y : 2-1, 		pushed : 0, 	type : "letter", 	opacity : 0.35 },
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