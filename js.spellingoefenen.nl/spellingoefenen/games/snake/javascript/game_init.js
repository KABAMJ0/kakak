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

		//resetGame();
		showWL();
		
		//playSound("background_music");
		
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

var stats = new Stats();
framerate = 40;
framerate_recalculations = 1;
version = "v1.00";
globalFullscreenDisabled = false;
globalFullscreen = false;
gameType = "";

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

gameStarted = false;
Collides = true;
countDownToRestart = 0;

showLevelText = 0;
showLevelTextType = "";

starChance = 0;

gravity = 1;
bouncyness = 0.4; // *** How high does objects bounce back up

pulsateAlpha = 0.1;
pulsateAlphaSpeed = 0.1;

// *** Snake
snake_x = undefined;
snake_y = undefined;
snake_speed = 10;
snake_r = undefined; // 0=right, 90=up, 180=left, 270=down
snake_x_speed = undefined;
snake_y_speed = undefined;
snake_body_density = 1;
snake_body_density_count = 0;
snake_body_size_reduction = 0.15;
snake_min_distance = 0;
snake_try_u_turn = -1;
lives = 3;

snakePrevR = new Array(); // *** Making a U-turn may not be done too sharp
snakePrevR[0] = 0;
snakePrevR[90] = 0;
snakePrevR[180] = 0;
snakePrevR[270] = 0;

snake_fill_color = new Array();
snake_fill_color[1] = "#125f00";
snake_fill_color[2] = "#125f00";
snake_fill_color[3] = "#198200";
snake_fill_color[4] = "#0d4400";

snake_border_color = new Array();
snake_border_color[1] = "#74be41";
snake_border_color[2] = "#74be41";
snake_border_color[3] = "#8bd756";
snake_border_color[4] = "#56962a";

level = 1;
spelledWordsCorrect = 0;

// *** Spelling
spelPool = "blik,bloem,breuk,brief,bril,broek,broer,bron,brug,bruin,glas,greep,groen,groep,groet,klap,klok,knal,knie,knoop,knop,kraan,kreet,kruis,kruk,plan,plas,plus,prik,proef,traag,trap,troon";

spelWord = "";
spelWordPhase = "";
spelWordY = 0;
spelError = 0;
spelledWord = "";
spelledWordsCorrect = 0;
mPI = 2 * Math.PI;
submitted = false;



// *** Static markup values
css = new Array();
css["color"] = "#FFFFFF";
css["shadow_color"] = "#000000";

css["font_letter"] = "~size~px 'Roboto Condensed', sans-serif";
css["font_letter_color"] = "#FFFFFF";

css["font_spelword_color"] = "#FFFFFF";
css["font_spelledword_color"] = "#99FF99";
css["font_spelledword_error_color"] = "#FF0000";
css["font_spelword"] = "80px 'Roboto Condensed', sans-serif";
css["font_spelword_small"] = "50px 'Roboto Condensed', sans-serif";
css["font_leveltext"] = "200px 'Roboto Condensed', sans-serif";
css["font_player_info"] = "30px 'Roboto Condensed', sans-serif";

css["font_leveltext_extra"] = "50px 'Roboto Condensed', sans-serif";


// *** Translations
c_z_winnaar = "WINNAAR!";
c_z_uitleg = "Gebruik de pijltjestoetsen, W,A,S,D-toetsen of de buttons om snake te besturen!";

// *** Spots
var spot = {

	"BUTTON_LEFT" 		: { "x" : 1050,		"y" : 582, 	"r" : 0 },
	"BUTTON_DOWN" 		: { "x" : 1050 + 110,	"y" : 582, 	"r" : 0 },
	"BUTTON_RIGHT" 		: { "x" : 1050 + 220,	"y" : 582, 	"r" : 0 },
	"BUTTON_UP" 		: { "x" : 1050 + 110,	"y" : 582 - 100,"r" : 0 },
	"BUTTON_MAKKELIJK" 	: { "x" : 530 - 310,	"y" : 350 + 20,	"r" : 0 },
	"BUTTON_MOEILIJK" 	: { "x" : 530 + 10,	"y" : 350 + 20,	"r" : 0 },
	"BUTTON_PROF" 	: { "x" : 530 + 330,	"y" : 350 + 20,	"r" : 0 },
	"BUTTON_START" 		: { "x" : 700 - 150,	"y" : 350 + 20,	"r" : 0 },
	"BUTTON_START_UITLEG" 	: { "x" : 700,		"y" : 350 - 20,	"r" : 0 },

	"PLAYER_INFO" 		: { "x" : 1210,		"y" : 430, 	"r" : 0 },
	"SPELWORD" 		: { "x" : 1213,		"y" : 200, 	"r" : 0 },
	"SPELLEDWORD" 		: { "x" : 1213,		"y" : 300, 	"r" : 0 },
	
	"SOUND_ICON" 		: { "x" : 1400 - 65*2,	"y" : 5, 	"r" : 0 },
	"BUTTON_X" 		: { "x" : 1400 - 65,	"y" : 5, 	"r" : 0 },
	"FULLSCREEN_ICON" 	: { "x" : 1400 - 60*3 - 14,	"y" : 6 },
	
	"STAR_SOURCE"  		: { "x" : 700,		"y" : 650, 	"r" : 0 },
	"COIN_SOURCE" 		: { "x" : 1200,		"y" : 200, 	"r" : 0 },
	"LEVEL_TEXT" 		: { "x" : 700,		"y" : 350, 	"r" : 0 },
	"LIVES" 		: { "x" : 970,		"y" : 15, 	"r" : 0 },
	
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

var coin = { }; coinCount = 1;
var star = { }; starCount = 1;
var letter = { }; letterCount = 1;
var snakeBodypart = { }; snakeBodypartCount = 1;

// *** Device related checks and hacks
preloadMessage += deviceChecksPreInit();


// *** Image / sound manifest
manifest = new Array();
manifest_total = 0;
manifest_count = 0;
	
function loadManifest()
{
	ge("my_preloader_playbutton").style.display = "none";
	ge("my_preloader_titel").style.display = "block";
	ge("my_preloader_area").style.display = "inline-block";
	
	// *** Preload of sounds
	if(!globalAudioDisabled)
	{			
		manifestSound("sword", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/snake/sound/sword." + soundExtension);
		manifestSound("bloep", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/snake/sound/bloep." + soundExtension);
		manifestSound("error", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/snake/sound/error." + soundExtension);
		manifestSound("falling", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/snake/sound/falling." + soundExtension);
		manifestSound("ouk", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/snake/sound/ouk." + soundExtension);
		manifestSound("groan_high", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/snake/sound/groan_high." + soundExtension);
		manifestSound("pop", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/snake/sound/pop." + soundExtension);
		manifestSound("giggle", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/snake/sound/giggle." + soundExtension);
	}
			
	// *** Preload of images
	manifestImage("sound_on", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/sound_on.png");
	manifestImage("sound_off", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/sound_off.png");
	manifestImage("button_x", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/close.png");
	manifestImage("fullscreen_on", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/fullscreen_on.png");
	manifestImage("fullscreen_off", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/fullscreen_off.png");
	
	manifestImage("button_start", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/snake/images/button_start.png");
	manifestImage("button_makkelijk", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/snake/images/button_makkelijk.png");
	manifestImage("button_moeilijk", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/snake/images/button_moeilijk.png");
	manifestImage("button_prof", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/snake/images/button_prof.png");

	manifestImage("highscore_bg", "https://afbeeldingen.spellingoefenen.nl/global/spellingoefenen/highscore/bg.png");
	manifestImage("highscore_selected", "https://afbeeldingen.spellingoefenen.nl/global/spellingoefenen/highscore/selected.png");
	manifestImage("highscore_between", "https://afbeeldingen.spellingoefenen.nl/global/spellingoefenen/highscore/between.png");
			
	manifestImage("button", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/wl/wl_button.png");
	manifestImage("button_hover", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/wl/wl_button_selected.png");


	manifestImage("fg", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/snake/images/fg.png");
	manifestImage("bg_dark", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/snake/images/bg_dark.png");
	//manifestImage("checkboard", "images/checkboard.png");
	
	manifestImage("button_down", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/snake/images/button_down.png");
	manifestImage("button_left", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/snake/images/button_left.png");
	manifestImage("button_right", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/snake/images/button_right.png");
	manifestImage("button_up", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/snake/images/button_up.png");

	manifestImage("snake_head", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/snake/images/snake_head.png");
	manifestImage("snake_head_sad", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/snake/images/snake_head_sad.png");


	manifestImage("star", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/snake/images/star.png");
	
	manifestImage("heart", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/snake/images/heart.png");
	manifestImage("heart_empty", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/snake/images/heart_empty.png");
		
	// *** Buffer sound (if not IE or local)	
	bufferSound();
	
	startPreload();
	
	// *** Minimum amount of time that preload screen is visible (to show Gamedesign logo)
	setTimeout(function(){ preloadMinTimeDone = true; updatePreloader(); }, preloadMinTime);
}