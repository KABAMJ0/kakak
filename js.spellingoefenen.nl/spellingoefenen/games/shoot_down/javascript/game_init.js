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

	"LIVES" 		: { "x" : 710,		"y" : 630, 	"r" : 0 },
	"LEVEL_TEXT" 		: { "x" : 700,		"y" : 350, 	"r" : 0 },
	"SOUND_ICON" 		: { "x" : 1400 - 65*2,	"y" : 5, 	"r" : 0 },
	"BUTTON_X" 		: { "x" : 1400 - 65,	"y" : 5, 	"r" : 0 },
	"FULLSCREEN_ICON" 	: { "x" : 1400 - 60*3 - 14,	"y" : 6 },
	
	"STAR_SOURCE"  		: { "x" : 700,		"y" : 650, 	"r" : 0 },
	"COIN_SOURCE" 		: { "x" : 1200,		"y" : 200, 	"r" : 0 },
	"SPELWORD" 		: { "x" : 50,		"y" : 120, 	"r" : 0 },
	"SPELLEDWORD" 		: { "x" : 1200,		"y" : 120, 	"r" : 0 },

	"MOUSE" 		: { "x" : 0,		"y" : 0, 	"r" : 0 } // *** replaced by x,y of mouse	
};

var coin = { }
var star = { }
var heli = { }
var fallingLetter = { }
var bomb = { }
var explosion = { }


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
		manifestSound("bloep", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/sound/bloep." + soundExtension);
		manifestSound("gunshot", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/sound/gunshot." + soundExtension);
		manifestSound("explosion", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/sound/explosion." + soundExtension);
		manifestSound("sword", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/sound/sword." + soundExtension);
		manifestSound("error", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/sound/error." + soundExtension);
		manifestSound("falling", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/sound/falling." + soundExtension);
		manifestSound("cymbals", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/sound/cymbals." + soundExtension);
		manifestSound("phaser", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/sound/phaser." + soundExtension);
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

		
	manifestImage("coin_1", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/images/coin_1.png");
	manifestImage("coin_5", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/images/coin_5.png");
	manifestImage("coin_10", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/images/coin_10.png");
	manifestImage("coin_50", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/images/coin_50.png");
	manifestImage("coin_100", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/images/coin_100.png");
	manifestImage("coin_1000", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/images/coin_1000.png");
	manifestImage("coin_5000", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/images/coin_5000.png");
	
	manifestImage("star", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/images/star.png");

	manifestImage("bomb", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/images/bomb.png");

	manifestImage("heart", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/images/heart.png");
	manifestImage("heart_empty", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/images/heart_empty.png");
	
	manifestImage("heli1_1", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/images/heli1_1.png");
	manifestImage("heli1_2", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/images/heli1_2.png");
	manifestImage("heli1_3", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/images/heli1_3.png");
	manifestImage("heli2_1", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/images/heli2_1.png");
	manifestImage("heli2_2", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/images/heli2_2.png");
	manifestImage("heli2_3", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/images/heli2_3.png");
	manifestImage("heli3_1", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/images/heli3_1.png");
	manifestImage("heli3_2", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/images/heli3_2.png");
	manifestImage("heli3_3", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/images/heli3_3.png");
	manifestImage("heli4_1", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/images/heli4_1.png");
	manifestImage("heli4_2", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/images/heli4_2.png");
	manifestImage("heli4_3", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/images/heli4_3.png");
	
	manifestImage("bg_dark", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/images/bg_dark.png");
	manifestImage("bg1_level", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/images/bg1_level_1.jpg");
	manifestImage("bg2_level", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/images/bg2_level_1.png");
	manifestImage("bg3_level", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/images/bg3_level_1.png");
	manifestImage("cross", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/images/cross.png");
	
	for(i = 1; i <= 26; i++) manifestImage("explosion" + i, "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/shootdown/images/explosion" + i + ".png");
	
	
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