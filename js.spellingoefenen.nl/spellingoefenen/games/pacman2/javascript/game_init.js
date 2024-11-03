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

	manifestImage("logo", 			"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/images/logo.png");
	manifestImage("particle", 		"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/images/particle.png");
	manifestImage("particle_black", 	"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/images/particle_black.png");
	manifestImage("sunbeam", 		"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/images/sunbeam.png");
	
	// *** Pacman
	manifestImage("pacman_bg", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/images/pacman/bg.png");
		
	startPreload();
}

// *** Create manifest (collection of images/sounds) for preloading and use in game
function loadManifest()
{
	// *** Preload of sounds
	if(!gameEngine["globalAudioDisabled"])
	{	
		manifestSound("sword", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/sound/sword.mp3");
		manifestSound("gunshot", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/sound/gunshot.mp3");

		manifestSound("thud", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/sound/thud.mp3");
		manifestSound("succes1", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/sound/succes1.mp3");
		manifestSound("succes2", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/sound/succes2.mp3");
		manifestSound("succes3", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/sound/succes3.mp3");
		manifestSound("succes4", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/sound/succes4.mp3");
		manifestSound("click", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/sound/click.mp3");
		manifestSound("click2", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/sound/click2.mp3");
		manifestSound("loose", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/sound/loose.mp3");
		manifestSound("music_start", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/sound/music_start.mp3");
		manifestSound("whoop", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/sound/whoop.mp3");
		manifestSound("woosh", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/sound/woosh.mp3");
		manifestSound("tick", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/sound/tick.mp3");
		
		manifestSound("teleport", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/sound/teleport.mp3");
		manifestSound("ploep", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/sound/ploep.mp3");
		manifestSound("bloep", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/sound/bloep.mp3");
		manifestSound("explosion", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/sound/explosion.mp3");
		manifestSound("win", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/sound/win.mp3");
		manifestSound("ball", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/sound/ball.mp3");
		manifestSound("chime_positive", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/sound/chime_positive.mp3");
		manifestSound("release", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/sound/release.mp3");
		manifestSound("caught", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/sound/caught.mp3");
		manifestSound("caught2", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/sound/caught2.mp3");
		manifestSound("caught3", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/sound/caught3.mp3");		

		manifestSound("monster", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/sound/monster2.mp3");		
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

	manifestImage("button", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/images/button.png");
	manifestImage("button_hover", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/images/button_hover.png");

	manifestImage("bg", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/images/bg_landscape.jpg");

	manifestImage("joystick_wheel", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/images/joystick/wheel.png");
	manifestImage("joystick_wheel_0", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/images/joystick/wheel_0.png");
	manifestImage("joystick_wheel_90", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/images/joystick/wheel_90.png");
	manifestImage("joystick_wheel_180", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/images/joystick/wheel_180.png");
	manifestImage("joystick_wheel_270", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/images/joystick/wheel_270.png");

	// *** Pacman
	manifestImage("pacman_life", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/images/pacman/life.png");
	manifestImage("pacman_nolife", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/images/pacman/nolife.png");
	manifestImage("pacman_1_evil", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/images/pacman/1_evil.png");
	manifestImage("pacman_1_eyes", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/images/pacman/1_eyes.png");
	manifestImage("pacman_1_frame_1", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/images/pacman/1_frame_1.png");
	manifestImage("pacman_1_frame_2", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/images/pacman/1_frame_2.png");
	manifestImage("pacman_1_frame_3", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/images/pacman/1_frame_3.png");
	manifestImage("pacman_1_scared", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/images/pacman/1_scared.png");
	manifestImage("pacman_1_vulnerable", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/images/pacman/1_vulnerable.png");
	manifestImage("pacman_level_ball", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/images/pacman/level_ball.png");
	manifestImage("pacman_level_cherry", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/images/pacman/level_cherry.png");
	manifestImage("pacman_level_door_left", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/images/pacman/level_door_left.png");
	manifestImage("pacman_level_door_right", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/images/pacman/level_door_right.png");
	manifestImage("pacman_level_dot", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/images/pacman/level_dot.png");
	manifestImage("pacman_level_wall", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/images/pacman/level_wall.png");
	manifestImage("pacman_eye", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/pacman/images/pacman/eye.png");
			
			
			
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
	"lives" : 1, 

	"wlTop" : "", 
	"wlBottom" : "", 
	"wlTopTyped" : 0, 
	"wlBottomTyped" : 0, 

	// *** Pacman
	"pacmanDots" : 0,
	"pacmanDotsTotal" : 0,
	"pacmanCherry" : false,
	"pacmanCherryTaken" : false,
	"pacmanCherriesPopped" : 0,
	"pacmanCherriesPoppedMax" : 10,
	"pacmanLevelDoorR" : 0,
	"pacmanLevelFrameCount" : 0, // *** Counts from 1 to 24 (great for animations), then move for pacman and ghost is done
	"pacmanR" : 0, // 0=right, 90=up, 180=left, 270=down, -1=no movement
	"pacmanNextR" : -1,
	"pacmanX" : 0,
	"pacmanY" : 0,	
	"pacmanTrueX" : 0,
	"pacmanTrueY" : 0,	
	"pacmanStopped" : true,	
	"pacmanFrame" : false,	
	"pacmanStatus" : "",	
	"pacmanStatusCount" : 0,	
	"pacmanLives" : 3,	
	"pacmanGhostVulnerableDuration" : 200,	
	"pacmanGhostSpawnX" : 0,	
	"pacmanGhostSpawnY" : 0,	
	"pacmanGhostAniCount" : 0,	
	"pacmanCherryChance" : 0.005,	
	"pacmanLevel" : 1, 
	"pacmanWordCount" : 0, 
	"speed" : 1,
		
	
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


	// *** Game
	"BG"	: { "x" : 0,		"y" : 0, }, 


	// *** Pacman
	"PACMAN_LOGO"		: { "x" : 168,		"y" : 242, }, 
	
	"PACMAN_SCORE_SUB"	: { "x" : 160+5,	"y" : 70, 		"font" : "bold 36px Arial", 	"color" : "#92a2af", 	"textAlign" : "center",	"shadow" : false,	"lineHeight" : 90 }, 
	"PACMAN_SCORE"		: { "x" : 160,		"y" : 150, 		"font" : "bold 86px Arial", 	"color" : "#ffff00", 	"textAlign" : "center",	"shadow" : false,	"lineHeight" : 90,	"maxWidth" : 300 }, 

	"PACMAN_LEVEL_SUB"	: { "x" : 1130,		"y" : 295, 		"font" : "bold 24px Arial", 	"color" : "#92a2af", 	"textAlign" : "left",	"shadow" : false,	"lineHeight" : 90 }, 
	"PACMAN_LEVEL"		: { "x" : 1130,		"y" : 355, 		"font" : "bold 60px Arial", 	"color" : "#ffff00", 	"textAlign" : "left",	"shadow" : false,	"lineHeight" : 90,	"maxWidth" : 300 }, 

	"PACMAN_WORDS_LEFT_SUB"	: { "x" : 1100,		"y" : 345 + 320, 	"font" : "bold 24px Arial", 	"color" : "#92a2af", 	"textAlign" : "left",	"shadow" : false,	"lineHeight" : 90 }, 
	"PACMAN_WORDS_LEFT"	: { "x" : 1100 + 220,	"y" : 345 + 320, 	"font" : "bold 24px Arial", 	"color" : "#ffff00", 	"textAlign" : "left",	"shadow" : false,	"lineHeight" : 90,	"maxWidth" : 300 }, 

	"PACMAN_WL_TOP"		: { "x" : 1100,		"y" : 160, 		"font" : "bold 60px Arial", 	"color" : "#92a2af", 	"textAlign" : "left",	"shadow" : false,	"lineHeight" : 90, }, 
	"PACMAN_WL_TOP_TYPED"	: { "x" : 1100,		"y" : 160, 		"font" : "bold 60px Arial", 	"color" : "#ffff00", 	"textAlign" : "left",	"shadow" : false,	"lineHeight" : 90, }, 

	"PACMAN_WL_BOTTOM"	: { "x" : 1100,		"y" : 530, 		"font" : "bold 60px Arial", 	"color" : "#92a2af", 	"textAlign" : "left",	"shadow" : false,	"lineHeight" : 90, }, 
	"PACMAN_WL_BOTTOM_TYPED": { "x" : 1100,		"y" : 530, 		"font" : "bold 60px Arial", 	"color" : "#ffff00", 	"textAlign" : "left",	"shadow" : false,	"lineHeight" : 90, }, 

	"PACMAN_LIFE_1"		: { "x" : 100 + 42*0,	"y" : 175 }, 
	"PACMAN_LIFE_2"		: { "x" : 100 + 42*1,	"y" : 175 }, 
	"PACMAN_LIFE_3"		: { "x" : 100 + 42*2,	"y" : 175 }, 
	"PACMAN_CONTINUE"	: { "x" : game["width"]/2,		"y" : 340, 		"font" : "bold 46px Arial", 	"color" : "#FFFFFF", 	"textAlign" : "center",	"shadow" : false,	"lineHeight" : 90 }, 
	"PACMAN_LIVES"		: { "x" : 304,		"y" : 22 }, 
	"PACMAN_BOARD"		: { "x" : 365-24,	"y" : 15-24 }, 
	"PACMAN_WHEEL"		: { "x" : 38,		"y" : 406, 	"width" : 226, 		"height" : 226 }, 

	"PACMAN_LEVEL_LETTER"	: { "x" : 0,		"y" : 0, 		"font" : "bold 24px Arial", 	"color" : "#92a2af", 	"textAlign" : "center",	"shadow" : true,	"lineHeight" : 90,	"maxWidth" : 60 }, 

	
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

	"SCORE" : { 	
	
		"category" : "text",
		
		"manifest" : "",
		"hasShadow" : true,

		"xSpeed" : 0,
		"ySpeed" : -5,
		
		"r" : 0,
		"rSpeed" : -10,
		
		"alpha" : 1,
		"alphaSpeed" : -0.05,		
	},	

	"GHOST_1" : { 	
	
		"category" : "ghost",
		"manifest" : "pacman_1",
		
		"eyeFrame" : 0,
		"speed" : 8,
		"speedVulnerable" : 4,
		"r" : 0,		
		"alpha" : 1,
	},	

	"SUBSCORE" : { 	
	
		"category" : "subscore",

		"counter" : 0,
		"alpha" : 1,		
		"fontSize" : 54,		
	},		

	"ORANGE_SLICE" : { 	
	
		"category" : "fruit",
		
		"manifest" : "orange_slice",
		"hasShadow" : true,

		"xSpeed" : 10,
		"ySpeed" : -5,
		
		"r" : 0,
		"rSpeed" : -10,
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
	
	10 : { 	"name" : "Mini Glitter down",	"manifest" : "particle",	"manifestVariation" : 0,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -1,		"xSpeedVariation" : 2,		"xSpeedChange" : 0.01,		"xSpeedChangeVariation" : 0,
		"ySpeed" : 1,		"ySpeedVariation" : 3,		"ySpeedChange" : -0.1,		"ySpeedChangeVariation" : 0,
		"size"   : 25,		"sizeVariation"   : 0,		"sizeChange"   : -1,		"sizeChangeVariation"   : -2,
		"alpha"  : 1,		"alphaVariation"  : 0,		"alphaChange"  : -0.02,		"alphaChangeVariation"  : -0.02,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	
	
	11 : { 	"name" : "Mini Glitter right",	"manifest" : "particle",	"manifestVariation" : 0,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : 0.5,		"xSpeedVariation" : 0.5,	"xSpeedChange" : -0.01,		"xSpeedChangeVariation" : 0,
		"ySpeed" : -0.5,	"ySpeedVariation" : 1,		"ySpeedChange" : 0,		"ySpeedChangeVariation" : 0,
		"size"   : 15,		"sizeVariation"   : 0,		"sizeChange"   : -0.25,		"sizeChangeVariation"   : -1,
		"alpha"  : 1,		"alphaVariation"  : 0,		"alphaChange"  : -0.01,		"alphaChangeVariation"  : -0.01,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	
	
	12 : { 	"name" : "Mini Glitter right",	"manifest" : "particle",	"manifestVariation" : 0,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -0.5,	"xSpeedVariation" : -0.5,	"xSpeedChange" : 0.01,		"xSpeedChangeVariation" : 0,
		"ySpeed" : -0.5,	"ySpeedVariation" : 1,		"ySpeedChange" : 0,		"ySpeedChangeVariation" : 0,
		"size"   : 15,		"sizeVariation"   : 0,		"sizeChange"   : -0.25,		"sizeChangeVariation"   : -1,
		"alpha"  : 1,		"alphaVariation"  : 0,		"alphaChange"  : -0.01,		"alphaChangeVariation"  : -0.01,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	
	
	13 : { 	"name" : "Mini Glitter right",	"manifest" : "particle",	"manifestVariation" : 0,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -0.5,	"xSpeedVariation" : 1,		"xSpeedChange" : -0.01,		"xSpeedChangeVariation" : 0,
		"ySpeed" : -2,	"ySpeedVariation" : 2,		"ySpeedChange" : 0,		"ySpeedChangeVariation" : 0,
		"size"   : 15,		"sizeVariation"   : 0,		"sizeChange"   : -0.25,		"sizeChangeVariation"   : -1,
		"alpha"  : 0.5,		"alphaVariation"  : 0,		"alphaChange"  : -0.01,		"alphaChangeVariation"  : -0.01,

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