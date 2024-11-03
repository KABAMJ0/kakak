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
		//resetGame(); // game starten, UITEINDELIJK WEGHALEN
		
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
submitted = false;

// *** Static markup values
css = new Array();
css["shadow_color"] = "#000000";
css["font_spelword_color"] = "#FFFFFF";
css["font_spelword_color_2"] = "#FFFF00";
css["font_spelword_color_3"] = "#FF99FF";
css["font_spelledword_color"] = "#99FF99";
css["font_spelledword_error_color"] = "#FF0000";
css["font_spelword"] = "100px 'Roboto Condensed', sans-serif";
css["font_leveltext"] = "100px 'Roboto Condensed', sans-serif";
css["font_leveltext_extra"] = "35px 'Roboto Condensed', sans-serif"; 
css["font_player_info"] = "30px 'Roboto Condensed', sans-serif";

css["font_spelword_small"] = "70px 'Roboto Condensed', sans-serif";
css["font_heli"] = "~size~px 'Roboto Condensed', sans-serif";
css["font_heli_color"] = "#FFFFFF";

// *** Translations
c_z_winnaar = "WINNAAR!";


// *** Spots
var spot = {

	"PLAYER_INFO" 		: { "x" : 1000,		"y" : 80, 	"r" : 0 },

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


	"WORDSEARCH_CENTER" 		: { "x" : 520+76/2,	"y" : 370+84/2 }, 
	"WORDSEARCH_LETTER" 		: { "x" : 0,		"y" : 0,	"font" : "bold 60px 'Roboto Condensed', sans-serif", 	"color" : "#000000", 	"textAlign" : "center",		"shadow" : false,	"lineHeight" : 50 }, 
	"WORDSEARCH_WORDBAR" 		: { "x" : 1049,		"y" : 0,	"font" : "bold 24px 'Roboto Condensed', sans-serif", 	"color" : "#000000", 	"textAlign" : "left",		"shadow" : false,	"lineHeight" : 42,	"paddingLeft" : 24,	"paddingTop" : 122, "paddingBottomStripe" : 12 }, 
	"WORDSEARCH_SELECTED_WORD" 	: { "x" : 50,		"y" : 90,	"font" : "bold 72px 'Roboto Condensed', sans-serif", 	"color" : "#FFFFFF", 	"textAlign" : "left",		"shadow" : true,	"lineHeight" : 42,	"paddingLeft" : 24,	"paddingTop" : 122, "paddingBottomStripe" : 12 }, 
	"WORDSEARCH_TIME" 		: { "x" : 45,		"y" : 670 }, 


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

	"MOUSE" 		: { "x" : 0,		"y" : 0, 	"r" : 0 } // *** replaced by x,y of mouse	
};

var star = { }
var fallingLetter = { }


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
		manifestSound("bloep", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/ruzzle/sound/bloep." + soundExtension);
		manifestSound("klak", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/ruzzle/sound/klak." + soundExtension);
		manifestSound("wood_tick", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/ruzzle/sound/wood_tick.mp3");
		manifestSound("woosh", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/ruzzle/sound/woosh.mp3");
		manifestSound("tutot", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/ruzzle/sound/tutot.mp3");
		manifestSound("ting", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/ruzzle/sound/ting.mp3");		
		manifestSound("fanfare", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/ruzzle/sound/fanfare.mp3");		
		manifestSound("glitter", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/ruzzle/sound/glitter.mp3");		
		manifestSound("error", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/ruzzle/sound/error.mp3");		
		manifestSound("wood_crack", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/ruzzle/sound/wood_crack.mp3");		
	}
	
	// *** Preload of images
	manifestImage("sound_on", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/ruzzle/images/sound_on.png");
	manifestImage("sound_off", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/ruzzle/images/sound_off.png");
	manifestImage("button_x", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/ruzzle/images/button_x.png");
	manifestImage("fullscreen_on", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/fullscreen_on.png");
	manifestImage("fullscreen_off", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/fullscreen_off.png");

	manifestImage("highscore_bg", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/highscore_bg.png");
	manifestImage("highscore_selected", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/highscore_selected.png");
	manifestImage("highscore_between", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/highscore_between.png");
			
	manifestImage("button", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/wl/wl_button.png");
	manifestImage("button_hover", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/wl/wl_button_selected.png");

	manifestImage("star", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/ruzzle/images/star.png");

	manifestImage("bg_dark", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/ruzzle/images/bg_dark.png");
	manifestImage("bg", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/ruzzle/images/bg.jpg");
	
	// *** Wordsearch
	manifestImage("wordsearch_tile", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/ruzzle/images/wordsearch/tile.png");
	manifestImage("wordsearch_tile_hover", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/ruzzle/images/wordsearch/tile_hover.png");
	manifestImage("wordsearch_bg_wordbar", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/ruzzle/images/wordsearch/bg_wordbar.png");
	manifestImage("wordsearch_stripe", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/ruzzle/images/wordsearch/stripe.png");
	manifestImage("wordsearch_time", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/ruzzle/images/wordsearch/time.png");
	manifestImage("wordsearch_time_bar", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/ruzzle/images/wordsearch/time_bar.png");
	
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





var game = {

	"gravity" : 1.2,
	
	"wordsearchStatus" : "INIT",
	"wordsearchStatusCount" : 0,

	"wordsearchWord" : "",
	"wordsearchPrevBlock" : 0,

	"wordsearchWidthInit" : 4,
	"wordsearchHeightInit" : 3,
	"wordsearchWidth" : 0,
	"wordsearchHeight" : 0,

	"wordsearchKeyCount" : 0,

	"wordsearchTime" : 0,
	"wordsearchTimeTotal" : 100,
	"wordsearchTimePerWord" : 50,
	"wordsearchTimeExtra" : 300,

	"wordsearchMatrixWidth" : 85,
	"wordsearchMatrixHeight" : 85,

	"wordsearchTingSoundTime" : 0,

};

gameWoordenlijst = new Array();

