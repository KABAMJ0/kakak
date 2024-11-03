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
	manifestImage("music_on", 		"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/music_on.png");
	manifestImage("music_off", 		"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/music_off.png");

	manifestImage("bg_intro", 		"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/bg_intro.jpg");
	manifestImage("logo", 			"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/logo.png");
	manifestImage("particle", 		"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/particle.png");
	manifestImage("particle_black", 	"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/particle_black.png");
	manifestImage("sunbeam", 		"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/sunbeam.png");
			
	startPreload();
}

// *** Create manifest (collection of images/sounds) for preloading and use in game
function loadManifest()
{
	// *** Preload of sounds
	if(!gameEngine["globalAudioDisabled"])
	{	
		
		manifestSound("hitenemie", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/sound/hitenemie.mp3");
		manifestSound("getfruit", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/sound/getfruit.mp3");
		manifestSound("levelup", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/sound/levelup.mp3");
		manifestSound("trampoline", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/sound/trampoline.mp3");
		manifestSound("die", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/sound/die.mp3");
		manifestSound("music", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/sound/music.mp3");
		manifestSound("tick", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/sound/tick.mp3");
		manifestSound("woohoo", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/sound/woohoo.mp3");
		
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

	manifestImage("button", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/button.png");
	manifestImage("button_hover", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/button_hover.png");

	manifestImage("bg", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/bg_landscape.jpg");
	
	manifestImage("tile_2", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/tiles/tile_2.png");
	manifestImage("tile_3", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/tiles/tile_3.png");
	manifestImage("tile_4", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/tiles/tile_4.png");
	manifestImage("tile_5", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/tiles/tile_5.png");
	manifestImage("tile_6", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/tiles/tile_6.png");
	manifestImage("tile_7", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/tiles/tile_7.png");
	manifestImage("tile_8", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/tiles/tile_8.png");
	manifestImage("tile_9", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/tiles/tile_9.png");
	manifestImage("tile_10", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/tiles/tile_10.png");
	manifestImage("tile_11", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/tiles/tile_11.png");
	manifestImage("tile_14", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/tiles/tile_14.png");
	manifestImage("tile_15", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/tiles/tile_15.png");
	manifestImage("tile_20", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/tiles/tile_20.png");
	manifestImage("tile_21", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/tiles/tile_21.png");
	manifestImage("tile_22", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/tiles/tile_22.png");
	manifestImage("tile_30", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/tiles/tile_30.png");
	manifestImage("tile_32", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/tiles/tile_32.png");
	manifestImage("tile_33", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/tiles/tile_33.png");
	manifestImage("tile_35", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/tiles/tile_35.png");
	manifestImage("tile_80", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/tiles/tile_80.png");
	manifestImage("tile_81", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/tiles/tile_81.png");

	
	
	
	manifestImage("background1", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/background1.jpg");
	manifestImage("background2", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/background2.jpg");
	manifestImage("background3", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/background3.jpg");
	manifestImage("background4", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/background4.jpg");
	manifestImage("background5", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/background5.jpg");
	manifestImage("background6", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/background6.jpg");
	manifestImage("background7", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/background7.jpg");
	manifestImage("site_background", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/fg.png");
	
	manifestImage("heart", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/heart.png");
	manifestImage("heart_empty", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/heart_empty.png");
	
	
	for(i=1; i<9; i++){manifestImage("walk"+i, "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/character/walk/walk"+i+".png");}
		
	manifestImage("idle1", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/character/idle.png");
	manifestImage("jump", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/character/jump.png");
	manifestImage("die1", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/character/die1.png");
	manifestImage("die2", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/character/die1.png");
	manifestImage("die3", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/character/die2.png");
	manifestImage("die4", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/character/die2.png");
	manifestImage("succes", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/character/succes.png");
	
	
	
	manifestImage("orange", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/fruits/orange.png");
	manifestImage("fraise", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/fruits/fraise.png");
	manifestImage("pear", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/fruits/pear.png");
	
	manifestImage("key", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/key.png");
	manifestImage("key_outline", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/keyoutline.png");
	manifestImage("moving_platform", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/moving_platform.png");
	
	manifestImage("door1", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/door1.png");
	manifestImage("door2", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/door2.png");
	manifestImage("door3", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/door3.png");
	manifestImage("door4", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/door4.png");
	manifestImage("door5", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/door5.png");
	manifestImage("door6", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/door6.png");
	manifestImage("door7", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/door7.png");
	manifestImage("door8", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/door8.png");
	manifestImage("door9", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/door9.png");
	manifestImage("door10", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/door10.png");
	

	manifestImage("enemie1walk1", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/enemie/enemie1/enemie1_Walk1.png");
	manifestImage("enemie1walk2", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/enemie/enemie1/enemie1_Walk2.png");
	manifestImage("enemie1walk3", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/enemie/enemie1/enemie1_Walk3.png");
	manifestImage("enemie1walk4", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/enemie/enemie1/enemie1_Walk4.png");
	manifestImage("enemie1walk5", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/enemie/enemie1/enemie1_Walk5.png");
	manifestImage("enemie1walk6", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/enemie/enemie1/enemie1_Walk6.png");
	manifestImage("enemie1walk7", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/enemie/enemie1/enemie1_Walk7.png");
	manifestImage("enemie1die", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/enemie/enemie1/enemie1_die.png");
		
	manifestImage("enemie2walk1", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/enemie/enemie2/enemie2_Walk1.png");
	manifestImage("enemie2walk2", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/enemie/enemie2/enemie2_Walk2.png");
	manifestImage("enemie2walk3", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/enemie/enemie2/enemie2_Walk3.png");
	manifestImage("enemie2walk4", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/enemie/enemie2/enemie2_Walk4.png");
	manifestImage("enemie2walk5", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/enemie/enemie2/enemie2_Walk5.png");
	manifestImage("enemie2walk6", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/enemie/enemie2/enemie2_Walk6.png");
	manifestImage("enemie2walk7", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/enemie/enemie2/enemie2_Walk7.png");
	manifestImage("enemie2die", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/enemie/enemie2/enemie2_die.png");
	
	manifestImage("enemie3walk1", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/enemie/enemie3/enemie3_Walk1.png");
	manifestImage("enemie3walk2", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/enemie/enemie3/enemie3_Walk2.png");
	manifestImage("enemie3walk3", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/enemie/enemie3/enemie3_Walk3.png");
	manifestImage("enemie3walk4", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/enemie/enemie3/enemie3_Walk4.png");
	manifestImage("enemie3walk5", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/enemie/enemie3/enemie3_Walk5.png");
	manifestImage("enemie3walk6", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/enemie/enemie3/enemie3_Walk6.png");
	manifestImage("enemie3walk7", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/enemie/enemie3/enemie3_Walk7.png");
	manifestImage("enemie3die", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/enemie/enemie3/enemie3_die.png");
	
	manifestImage("enemie4walk1", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/enemie/enemie4/enemie4_Walk1.png");
	manifestImage("enemie4walk2", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/enemie/enemie4/enemie4_Walk2.png");
	manifestImage("enemie4walk3", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/enemie/enemie4/enemie4_Walk3.png");
	manifestImage("enemie4walk4", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/enemie/enemie4/enemie4_Walk4.png");
	manifestImage("enemie4walk5", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/enemie/enemie4/enemie4_Walk5.png");
	manifestImage("enemie4walk6", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/enemie/enemie4/enemie4_Walk6.png");
	manifestImage("enemie4walk7", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/enemie/enemie4/enemie4_Walk7.png");
	manifestImage("enemie4die", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/enemie/enemie4/enemie4_die.png");
	
	manifestImage("enemie5walk1", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/enemie/enemie5/enemie5_Walk1.png");
	manifestImage("enemie5walk2", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/enemie/enemie5/enemie5_Walk2.png");
	manifestImage("enemie5walk3", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/enemie/enemie5/enemie5_Walk3.png");
	manifestImage("enemie5walk4", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/enemie/enemie5/enemie5_Walk4.png");
	manifestImage("enemie5walk5", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/enemie/enemie5/enemie5_Walk5.png");
	manifestImage("enemie5walk6", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/enemie/enemie5/enemie5_Walk6.png");
	manifestImage("enemie5walk7", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/enemie/enemie5/enemie5_Walk7.png");
	manifestImage("enemie5die", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/enemie/enemie5/enemie5_die.png");


	
	for(i=1; i<11; i++){manifestImage("plant"+i, "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/plant_"+i+".png");}
	for(i=1; i<10; i++){manifestImage("item"+i, "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/platformgame/images/item_"+i+".png");}

	
	
	// *** Buffer sound (if not IE or local)	
	bufferSound();
	
	startPreload();
}



// *** Game and gameplay
var game = {

	"submitted" : false,
	"orientation" : "landscape", // *** landscape or portrait. Also change the class/dimensions in the canvas-tag in the index-file
	"width" : 1400,  // *** Landscape: 1400, Portrait: 640
	"height" : 700, // *** Landscape: 700,  Portrait: 920
			
	"backButton" : "", // *** URL backbutton (X) leads to, leave empty for history.go(-1)
	"status" : "", // *** General game status: "" (playing), INTRO (startscreen), HIGHSCORES (after play)
	"score" : 0, // *** Score of player
	"levelscore" : 0,
	
	"spelword" : "",
	"spelledword" : "",

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

	"music" : true,	
	"loopingMusic" : 1,


	"demoIntroNinjaBlink" : 50,	
	
	"MapWidth" : 110,
	"TileWidth" : 38,
	"TileHeight" : 38,
	"Y_SpaceScreenTop" : 16,
	"Camera-X": 0,
	"Camera-Y": 0,
	"level": 1,
	

	
	"PossibleTiles" : [2,3,4,5,6,7,8,9,10,11,14,15,20,21,22,30,32,33,35,80,81],
	"GroundTiles" : [2,3,4,5,6,7,8,9,10,11,80,81],
	
	
	"PossibleFruits" : [99,98,97],
	"PossiblePlants" : [60,61,62,63,64,65,66,67,68,69],
	"PossibleItems" : [70,71,72,73,74,75,76,78,79],
	"keyfound" : false,
	"die" : false,
	"DieTimer" : 0,
	"TextTimer" : 0,
	"GoNextLevel" : 0,
	"lives" : 5,
	"trampoline" : false,
	"MovingPlatform" : false,
	"gameover" : false,
	
	
};

// *** Spots (locations in game; capitalized for recognition)
var spot = {

	// *** UI
	"WINDOW_BUTTONS"	: { "x" : game["width"] - 75,	"y" : 15,	"margin" : 10 },
	"CLOSE_ICON" 		: { "x" : 10000,		"y" : 15,	"width" : 60,	"height" : 60 }, // *** x gets recalculated according to visible icons
	"FULLSCREEN_ICON" 	: { "x" : 10000,		"y" : 15,	"width" : 60,	"height" : 60 }, // *** x gets recalculated according to visible icons
	"SOUND_ICON" 		: { "x" : 10000,		"y" : 15,	"width" : 60,	"height" : 60 }, // *** x gets recalculated according to visible icons
	"MUSIC_ICON" 		: { "x" : 10000,		"y" : 15,	"width" : 60,	"height" : 60 }, // *** x gets recalculated according to visible icons
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
	
	"PLATFORM_SPELWORD"		: { "x" : 1230,		"y" : 150, 		"font" : "bold 45px Arial", 	"color" : "#ffffff", 	"textAlign" : "center",	"shadow" : true,	"lineHeight" : 90,	"maxWidth" : 300 }, 
	"PLATFORM_SPELLEDWORD"		: { "x" : 1230,		"y" : 220, 		"font" : "bold 45px Arial", 	"color" : "#fc8003", 	"textAlign" : "center",	"shadow" : true,	"lineHeight" : 90,	"maxWidth" : 300 }, 
	
	
	"PLATFORM_LEVEL"		: { "x" : 1245,		"y" : 450, 		"font" : "bold 24px Arial", 	"color" : "#ffffff", 	"textAlign" : "center",	"shadow" : true,	"lineHeight" : 90,	"maxWidth" : 300 }, 
	"PLATFORM_SCORE"		: { "x" : 1245,		"y" : 500, 		"font" : "bold 24px Arial", 	"color" : "#ffffff", 	"textAlign" : "center",	"shadow" : true,	"lineHeight" : 90,	"maxWidth" : 300 }, 
	"PLATFORM_LEVELSCORE"		: { "x" : 1245,		"y" : 550, 		"font" : "bold 20px Arial", 	"color" : "#ffffff", 	"textAlign" : "center",	"shadow" : true,	"lineHeight" : 90,	"maxWidth" : 300 }, 

	"PLATFORM_TEXT"		: { "x" : 520,		"y" : 560, 		"font" : "bold 38px Arial", 	"color" : "#ffffff", 	"textAlign" : "center",	"shadow" : true,	"lineHeight" : 90,	"maxWidth" : 600 }, 
	"PLATFORMLEVEL_TEXT"		: { "x" : 520,		"y" : 360, 		"font" : "bold 88px Didot", 	"color" : "#ffffff", 	"textAlign" : "center",	"shadow" : true,	"lineHeight" : 90,	"maxWidth" : 1000 }, 
	

	// *** Demo
	"DEMO_PARTICLE_SOURCE"	: { "x" : 973,		"y" : 540,								"font" : "12px Arial", 	"color" : "#CCCCCC", 	"textAlign" : "center",	"shadow" : true }, 
	"DEMO_TITLE" 		: { "x" : 25,		"y" : game["height"]-60, 	"width" : 200, 		"height" : 15,	"font" : "12px Arial", 	"color" : "#FFFFFF", 	"textAlign" : "left",	"shadow" : true },
	"DEMO_DEBUG" 		: { "x" : 25,		"y" : game["height"]-40, 	"width" : 200, 		"height" : 15,	"font" : "12px Arial", 	"color" : "#CCCCCC", 	"textAlign" : "left",	"shadow" : true },

	"DEMO_BUTTON_1"	: { "x" : game["width"] - 225,		"y" : 100 + 75*0 }, 
	"DEMO_BUTTON_2"	: { "x" : game["width"] - 225,		"y" : 100 + 75*1 }, 
	"DEMO_BUTTON_3"	: { "x" : game["width"] - 225,		"y" : 100 + 75*2 }, 
	"DEMO_BUTTON_4"	: { "x" : game["width"] - 225,		"y" : 100 + 75*3 }, 
	"DEMO_BUTTON_5"	: { "x" : game["width"] - 225,		"y" : 100 + 75*4 }, 
	"DEMO_BUTTON_6"	: { "x" : game["width"] - 225,		"y" : 100 + 75*5 }, 
	"DEMO_BUTTON_7"	: { "x" : game["width"] - 225,		"y" : 100 + 75*6 }, 
	
	
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

	
	"enemie" : { 	
	
		"category" : "enemie",
		"manifest" : "",
		
		"speed" : 0,
		"speedVulnerable" : 0,
		"r" : 0,		
		"alpha" : 0,
	},	
	
	
	"moving_platform" : { 	
	
		"category" : "moving_platform",
		"manifest" : "",
		
		"speed" : 0,
		"speedVulnerable" : 0,
		"r" : 0,		
		"alpha" : 0,
	},	
	
	"leveldoor" : { 	
	
		"category" : "leveldoor",
		"manifest" : "",
		
		"speed" : 0,
		"speedVulnerable" : 0,
		"r" : 0,		
		"alpha" : 0,
	},	
	
	"fruits" : { 	
	
		"category" : "fruits",
		"manifest" : "",
		
		"speed" : 0,
		"speedVulnerable" : 0,
		"r" : 0,		
		"alpha" : 0,
	},	
	
	"plants" : { 	
	
		"category" : "plants",
		"manifest" : "",
		
		"speed" : 0,
		"speedVulnerable" : 0,
		"r" : 0,		
		"alpha" : 0,
	},	

	"items" : { 	
	
		"category" : "items",
		"manifest" : "",
		
		"speed" : 0,
		"speedVulnerable" : 0,
		"r" : 0,		
		"alpha" : 0,
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