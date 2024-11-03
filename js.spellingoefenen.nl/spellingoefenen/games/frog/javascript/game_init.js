function init()
{
	if(!initDone)
	{
		initDone = true;
		
		console.log("Init game with Gamedesign.nl HTML5 canvas engine v2.02: all rights reserved (soundExtension: " + soundExtension + ")");
		console.log("---");

		// *** Device related checks and hacks
		deviceChecksPostInit();
				
		if(play_button) playSound("sword");
		
		showWL(); // woordenlijst tonen
		//resetGame(); // game starten
		
		setFramerate(framerate);
		
		animateAll();
		
		// *** Framerate calculator
		//stats.showPanel(0);
	}
}


// *** Static values
ajaxComm = "game_comm.php";
sha_pw = "great";

var iOS = /iPad|iPhone|iPod/.test(navigator.platform);
if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) isIphone = true; else isIphone = false;
var ua = navigator.userAgent.toLowerCase(); 
var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
var isWindowsPhone = navigator.userAgent.match(/Windows Phone/i);
if(isWindowsPhone) { isAndroid = false; isIphone = false; }

gameType = "";
var stats = new Stats();
framerate = 40;
framerate_recalculations = 1;
version = "v1.00";
globalFullscreenDisabled = false;
globalFullscreen = false;

mouse_x = 0;
mouse_y = 0;
dragging = false;
dragging_check = false;
dragging_x = 0; 
dragging_y = 0; 
userInteractionOccured = false;

// *** Preload and testing
testing = false; // *** If true, hides preloader and shows debugger at the bottom
preloadStarted = false;
preloadMinTime = 1000;
preloadMessage = "";
if(testing) preloadMinTime = 10;
preloadMinTimeDone = false;
play = true;
play_button = false; // *** Shows a playbutton (a-la-youtube) before game commences
initDone = false;

// *** Audio
globalAudio = true;
globalAudioDisabled = false;
audioNoBuffer = false; // *** Buffering audio is way better but NOT possible in IE and not LOCAL
switch(window.location.protocol) { case 'file:': audioNoBuffer = true; break; } // *** If LOCAL, no buffering
soundExtension = getSoundExtension();
window.AudioContext = window.AudioContext||window.webkitAudioContext;
var soundContext;
var soundBufferLoader;
var soudBufferList;

// *** Highscore
//alert("getCookie: " + getCookie("highscore_name"));

highscore_name = getCookie("highscore_name");
highscore_email = getCookie("highscore_email");
highscore_agreed_terms = getCookie("highscore_agreed_terms");
highscore_newsletter = getCookie("highscore_newsletter");
highscore_game_play = "";
highscore_list = new Array();
highscore_list_size = 11; // *** Player is the middle one (unless top/bottom player)
highscore_list_lineheight = 47;
score = 0;

// *** Gameplay
game_status = ""; // *** "" (playing), INTRO (startscreen), HIGHSCORES (after play)

//level = Math.ceil(Math.random() * 3);
level = 1;
showLevelText = 0;
showLevelTextType = "";
levelCorrectSpelwords = 0;
levelCorrectSpelwordsRequired = 5;

lives = 5;

starCount = 1;
starChance = 0;
coinCount = 1;
gravity = 1;
bouncyness = 0.4; // *** How high does objects bounce back up

pulsateAlpha = 0.1;
pulsateAlphaSpeed = 0.1;

backgroundX_1 = 0;
backgroundX_1r = 1400;
backgroundX_2 = 0;
backgroundX_2r = 1400;
backgroundX_3 = 0;
backgroundX_3r = 1400;

heliAni = 1;
heliCount = 1;
heliSpeed = 1;
heliWobble = 6;
heliWobbleSpeed = 0.4;

fallingLetterCount = 1;
bombCount = 1;
bombTimer = 0;

explosionCount = 1;

spelPool = "blik,bloem,breuk,brief,bril,broek,broer,bron,brug,bruin,glas,greep,groen,groep,groet,klap,klok,knal,knie,knoop,knop,kraan,kreet,kruis,kruk,plan,plas,plus,prik,proef,traag,trap,troon";

spelWord = "";
spelWordPhase = "";
spelWordY = 0;
spelError = 0;
spelledWord = "";
spelledWordsCorrect = 0;

// *** Static markup values
css = new Array();
css["shadow_color"] = "#000000";
css["font_spelword_color"] = "#FFFFFF";
css["font_spelword_color_2"] = "#FFFF00";
css["font_spelword_color_3"] = "#FF99FF";
css["font_spelledword_color"] = "#99FF99";
css["font_spelledword_error_color"] = "#FF0000";
css["font_spelword"] = "100px 'Roboto Condensed', sans-serif";
css["font_leveltext"] = "200px 'Roboto Condensed', sans-serif";
css["font_leveltext_extra"] = "50px 'Roboto Condensed', sans-serif"; 
css["font_player_info"] = "30px 'Roboto Condensed', sans-serif";

css["font_spelword_small"] = "70px 'Roboto Condensed', sans-serif";
css["font_heli"] = "~size~px 'Roboto Condensed', sans-serif";
css["font_heli_color"] = "#FFFFFF";

// *** Translations
c_z_winnaar = "WINNAAR!";


// *** Spots
var spot = {

	"PLAYER_INFO" 		: { "x" : 500,		"y" : 670, 	"r" : 0 },

	"LIVES" 		: { "x" : 760,		"y" : 630, 	"r" : 0 },
	"LEVEL_TEXT" 		: { "x" : 700,		"y" : 350, 	"r" : 0 },
	"SOUND_ICON" 		: { "x" : 1400 - 65*2,	"y" : 5, 	"r" : 0 },
	"BUTTON_X" 		: { "x" : 1400 - 65,	"y" : 5, 	"r" : 0 },
	"FULLSCREEN_ICON" 	: { "x" : 1400 - 60*3 - 14,	"y" : 6 },
	
	"STAR_SOURCE"  		: { "x" : 700,		"y" : 650, 	"r" : 0 },
	"COIN_SOURCE" 		: { "x" : 1200,		"y" : 200, 	"r" : 0 },
	"SPELWORD" 		: { "x" : 50,		"y" : 120, 	"r" : 0 },
	"SPELLEDWORD" 		: { "x" : 1200,		"y" : 120, 	"r" : 0 },
	"HIGHSCORE" 		: { "x" : 1400,		"y" : 600, 	"r" : 0 },

	"FROG" 		: { "x" : 700,		"y" : 500, 	"r" : 0 },
	"SPLASH" 	: { "x" : 700,		"y" : 500, 	"r" : 0 },

	"HIGHSCORE_TITEL"	: { "x" : 700,		"y" : 64 },
	"HIGHSCORE_AREA"	: { "x" : 300,		"y" : 20, 	"width" : 795, 		"height" : 670 },
	"HIGHSCORE_POSITIONS"	: { "x" : 490,		"y" : 80,	"paddingLeft" : -125, 	"paddingTop" : -11 },
	"HIGHSCORE_NAMES"	: { "x" : 490 + 20,	"y" : 80 },
	"HIGHSCORE_SCORES"	: { "x" : 930,		"y" : 80 },
	"HIGHSCORE_TEXT"	: { "x" : 1216,		"y" : 150 },
	"HIGHSCORE_SUBMIT"	: { "x" : 1065,		"y" : 300,	"paddingBottom" : 32 },
	"HIGHSCORE_SHARE"	: { "x" : 1065,		"y" : 375,	"paddingBottom" : 32 },
	"HIGHSCORE_PLAY"	: { "x" : 1065,		"y" : 450,	"paddingBottom" : 32 },
	"HIGHSCORE_WL"		: { "x" : 1065,		"y" : 525,	"paddingBottom" : 32 },

	"STONE_1" 		: { "x" : 434,		"y" : 366, 	"w" : 162, 	"h" : 64, 	"x_move" : -12.6, 	"y_move" : -8.6, 	"r" : 0 }, /* linksboven*/
	"STONE_2" 		: { "x" : 650,		"y" : 319, 	"w" : 165, 	"h" : 79, 	"x_move" : 1.8, 	"y_move" : -11, 	"r" : 1 }, /* boven */
	"STONE_3" 		: { "x" : 827,		"y" : 353, 	"w" : 250, 	"h" : 86, 	"x_move" : 14, 		"y_move" : -8.6, 	"r" : 1 },
	"STONE_4" 		: { "x" : 923,		"y" : 458, 	"w" : 150, 	"h" : 69, 	"x_move" : 19.5,	"y_move" : -2, 		"r" : 1 }, /* rechts */
	"STONE_5" 		: { "x" : 829,		"y" : 548, 	"w" : 156, 	"h" : 78, 	"x_move" : 13,	 	"y_move" : 4.6, 	"r" : 1 },
	"STONE_6" 		: { "x" : 623,		"y" : 577, 	"w" : 192, 	"h" : 80, 	"x_move" : 1, 		"y_move" : 5.1, 	"r" : 1 }, /* onder */
	"STONE_7" 		: { "x" : 444,		"y" : 550, 	"w" : 168, 	"h" : 74, 	"x_move" : -11, 	"y_move" : 3.3, 	"r" : 0 },
	"STONE_8" 		: { "x" : 347,		"y" : 442, 	"w" : 154, 	"h" : 86, 	"x_move" : -18, 	"y_move" : -2.6, 	"r" : 0 }, /* links */

	"LETTER_1" 		: { "x" : 434 + 162/2,		"y" : 366 + 10 },
	"LETTER_2" 		: { "x" : 650 + 165/2,		"y" : 319 + 20 },
	"LETTER_3" 		: { "x" : 827 + 250/2 - 30,	"y" : 353 + 30 },
	"LETTER_4" 		: { "x" : 923 + 150/2 - 10,	"y" : 458 + 15 },
	"LETTER_5" 		: { "x" : 829 + 156/2 - 10,	"y" : 548 + 15 },
	"LETTER_6" 		: { "x" : 623 + 192/2,		"y" : 577 + 25 },
	"LETTER_7" 		: { "x" : 444 + 168/2 - 10,	"y" : 550 + 10 },
	"LETTER_8" 		: { "x" : 347 + 154/2 - 15,	"y" : 442 + 15 },

	"FLOWERSPOT_1" 		: { "x" : 50,		"y" : 660,	"d" : 10 },
	"FLOWERSPOT_2" 		: { "x" : 100,		"y" : 550,	"d" : 9 },
	"FLOWERSPOT_3" 		: { "x" : 22,		"y" : 444,	"d" : 8 },
	"FLOWERSPOT_4" 		: { "x" : 177,		"y" : 476,	"d" : 7 },
	"FLOWERSPOT_5" 		: { "x" : 85,		"y" : 373,	"d" : 6 },
	"FLOWERSPOT_6" 		: { "x" : 21,		"y" : 279,	"d" : 5 },
	"FLOWERSPOT_7" 		: { "x" : 117,		"y" : 242,	"d" : 4 },
	"FLOWERSPOT_8" 		: { "x" : 171,		"y" : 184,	"d" : 3 },
	"FLOWERSPOT_9" 		: { "x" : 14,		"y" : 70,	"d" : 2 },
	"FLOWERSPOT_10"		: { "x" : 141,		"y" : 137,	"d" : 1 },

	"FLOWERSPOT_11" 	: { "x" : 169,		"y" : 612,	"d" : 10 },
	"FLOWERSPOT_12" 	: { "x" : 94,		"y" : 528,	"d" : 9 },
	"FLOWERSPOT_13" 	: { "x" : 200,		"y" : 558,	"d" : 8 },
	"FLOWERSPOT_14" 	: { "x" : 97,		"y" : 374,	"d" : 7 },
	"FLOWERSPOT_15" 	: { "x" : 261,		"y" : 280,	"d" : 6 },
	"FLOWERSPOT_16" 	: { "x" : 94,		"y" : 182,	"d" : 5 },
	"FLOWERSPOT_17" 	: { "x" : 309,		"y" : 224,	"d" : 4 },
	"FLOWERSPOT_18" 	: { "x" : 374,		"y" : 213,	"d" : 3 },
	"FLOWERSPOT_19" 	: { "x" : 428,		"y" : 176,	"d" : 2 },
	"FLOWERSPOT_20"		: { "x" : 536,		"y" : 167,	"d" : 1 },

	"FLOWERSPOT_21" 	: { "x" : 98,		"y" : 622,	"d" : 10 },
	"FLOWERSPOT_22" 	: { "x" : 1215,		"y" : 582,	"d" : 9 },
	"FLOWERSPOT_23" 	: { "x" : 41,		"y" : 567,	"d" : 8 },
	"FLOWERSPOT_24" 	: { "x" : 1342,		"y" : 512,	"d" : 7 },
	"FLOWERSPOT_25" 	: { "x" : 189,		"y" : 315,	"d" : 6 },
	"FLOWERSPOT_26" 	: { "x" : 1329,		"y" : 342,	"d" : 5 },
	"FLOWERSPOT_27" 	: { "x" : 74,		"y" : 243,	"d" : 4 },
	"FLOWERSPOT_28" 	: { "x" : 1051,		"y" : 266,	"d" : 3 },
	"FLOWERSPOT_29" 	: { "x" : 369,		"y" : 189,	"d" : 2 },
	"FLOWERSPOT_30"		: { "x" : 1344,		"y" : 192,	"d" : 1 },

	"FLOWERSPOT_31" 	: { "x" : 1374,		"y" : 665,	"d" : 10 },
	"FLOWERSPOT_32" 	: { "x" : 1254,		"y" : 536,	"d" : 9 },
	"FLOWERSPOT_33" 	: { "x" : 1296,		"y" : 423,	"d" : 8 },
	"FLOWERSPOT_34" 	: { "x" : 1393,		"y" : 354,	"d" : 7 },
	"FLOWERSPOT_35" 	: { "x" : 1237,		"y" : 321,	"d" : 6 },
	"FLOWERSPOT_36" 	: { "x" : 1201,		"y" : 261,	"d" : 5 },
	"FLOWERSPOT_37" 	: { "x" : 1110,		"y" : 245,	"d" : 4 },
	"FLOWERSPOT_38" 	: { "x" : 1204,		"y" : 164,	"d" : 3 },
	"FLOWERSPOT_39" 	: { "x" : 1042,		"y" : 180,	"d" : 2 },
	"FLOWERSPOT_40"		: { "x" : 1300,		"y" : 120,	"d" : 1 },

	"FLOWERSPOT_41" 	: { "x" : 1294,		"y" : 533,	"d" : 10 },
	"FLOWERSPOT_42" 	: { "x" : 1393,		"y" : 455,	"d" : 9 },
	"FLOWERSPOT_43" 	: { "x" : 1210,		"y" : 552,	"d" : 8 },
	"FLOWERSPOT_44" 	: { "x" : 1350,		"y" : 366,	"d" : 7 },
	"FLOWERSPOT_45" 	: { "x" : 1308,		"y" : 254,	"d" : 6 },
	"FLOWERSPOT_46" 	: { "x" : 978,		"y" : 266,	"d" : 5 },
	"FLOWERSPOT_47" 	: { "x" : 1362,		"y" : 240,	"d" : 4 },
	"FLOWERSPOT_48" 	: { "x" : 1066,		"y" : 158,	"d" : 3 },
	"FLOWERSPOT_49" 	: { "x" : 1009,		"y" : 174,	"d" : 2 },
	"FLOWERSPOT_50"		: { "x" : 1360,		"y" : 164,	"d" : 1 },

	"MOUSE" 		: { "x" : 0,		"y" : 0, 	"r" : 0 } // *** replaced by x,y of mouse	
};

frog = new Array();
frog.x = spot["FROG"].x;
frog.y = spot["FROG"].y;
frog.y_extra = 0; // *** Extra height to make jump more realistic (parabolic)
frog.frame = 1;
frog.status = "";
frog.status_frame = 0;
frog.jump_queue = ""; // *** String of commands (jumps)
frog.jump_target = ""; // *** Where to should the frog go?

splash = 0;

stone_letter = new Array();
stone_letter[1] = "";
stone_letter[2] = "";
stone_letter[3] = "";
stone_letter[4] = "";
stone_letter[5] = "";
stone_letter[6] = "";
stone_letter[7] = "";
stone_letter[8] = "";

stone_letter_color = new Array();
stone_letter_color[1] = 0;
stone_letter_color[2] = 0;
stone_letter_color[3] = 0;
stone_letter_color[4] = 0;
stone_letter_color[5] = 0;
stone_letter_color[6] = 0;
stone_letter_color[7] = 0;
stone_letter_color[8] = 0;

var coin = { }
var star = { }
var heli = { }
var fallingLetter = { }
var bomb = { }
var explosion = { }
var flower = { }

flowerCount = 0;
flowerSpot = 0;

//setInterval(function(){ addFlower(); addFlower(); addFlower(); growFlowers(); }, 500);				


// *** Device related checks and hacks
preloadMessage += deviceChecksPreInit();


// *** Image / sound manifest
manifest = new Array();
manifest_total = 0;
manifest_count = 0;
manifestSoundCurrent = "";
	
function loadManifest()
{
	ge("my_preloader_playbutton").style.display = "none";
	ge("my_preloader_titel").style.display = "block";
	ge("my_preloader_area").style.display = "inline-block";
		
	// *** Preload of sounds
	if(!globalAudioDisabled)
	{		
		manifestSound("bloep", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/frog/sound/bloep." + soundExtension);
		//manifestSound("gunshot", "sound/gunshot." + soundExtension);
		manifestSound("frog", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/frog/sound/frog." + soundExtension);
		//manifestSound("frog2", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/frog/sound/frog2." + soundExtension);
		manifestSound("sword", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/frog/sound/sword." + soundExtension);
		manifestSound("error", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/frog/sound/error." + soundExtension);
		manifestSound("falling", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/frog/sound/falling." + soundExtension);
		manifestSound("sploesj", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/frog/sound/sploesj." + soundExtension);
		manifestSound("klak", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/frog/sound/klak." + soundExtension);
	}
	
	// *** Preload of images
	manifestImage("sound_on", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/sound_on.png");
	manifestImage("sound_off", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/sound_off.png");
	manifestImage("button_x", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/close.png");
	manifestImage("fullscreen_on", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/fullscreen_on.png");
	manifestImage("fullscreen_off", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/fullscreen_off.png");
		

	manifestImage("highscore_bg", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/highscore_bg.png");
	manifestImage("highscore_selected", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/highscore_selected.png");
	manifestImage("highscore_between", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/highscore_between.png");
			
	manifestImage("button", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/wl/wl_button.png");
	manifestImage("button_hover", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/wl/wl_button_selected.png");


		manifestImage("star", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/frog/images/star.png");

	manifestImage("heart", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/frog/images/heart.png");
	manifestImage("heart_empty", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/frog/images/heart_empty.png");
		
	manifestImage("bg_dark", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/frog/images/bg_dark.png");
	manifestImage("bg", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/frog/images/bg.jpg");

	manifestImage("cross", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/frog/images/cross.png");
	
	for(i = 1; i <= 7; i++) manifestImage("frog_" + i, "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/frog/images/frog_" + i + ".png");
	for(i = 1; i <= 12; i++) manifestImage("splash_" + i, "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/frog/images/splash_" + i + ".png");
	for(i = 1; i <= 7; i++) manifestImage("flower_" + i, "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/frog/images/flower_" + i + ".png");
	
	
	// *** Buffer sound (if not IE or local)	
	bufferSound();
	
	startPreload();
	
	// *** Minimum amount of time that preload screen is visible (to show Gamedesign logo)
	setTimeout(function(){ preloadMinTimeDone = true; updatePreloader(); }, preloadMinTime);

}

function bodyLoaded()
{
	//updatePreloader("body");
			
	if(play_button)
	{
		ge("my_preloader_playbutton").style.display = "block";
		ge("my_preloader_titel").style.display = "none";
		ge("my_preloader_area").style.display = "none";
	}
	else
	{
		loadManifest();
	}
}