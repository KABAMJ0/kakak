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
ajaxComm = "https://www.spellingoefenen.nl/games/spiders/game_comm.php";
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

// *** Keyboard
Shift = 0;
ExtraButtons =  0;


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
gameResetted = false;

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
showKeyboard = false;

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

spiderProbability = new Array();
spiderProbability[1] = 0.996;
spiderProbability[2] = 0.992;
spiderProbability[3] = 0.988;
spiderProbability[4] = 0.984;
spiderProbability[5] = 0.980;
spiderProbability[6] = 0.977;
spiderProbability[7] = 0.974;
spiderProbability[8] = 0.971;
spiderProbability[9] = 0.968;
spiderProbability[10] = 0.966;


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
css["font_spider"] = "20px 'Roboto Condensed', sans-serif";

css["font_spelword_small"] = "70px 'Roboto Condensed', sans-serif";
css["font_heli"] = "~size~px 'Roboto Condensed', sans-serif";
css["font_heli_color"] = "#FFFFFF";

// *** Translations
c_z_winnaar = "WINNAAR!";


// *** Spots
var spot = {

	"PLAYER_INFO" 		: { "x" : 30,		"y" : 670, 	"r" : 0 },

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

	"LIVES" 		: { "x" : 1050,		"y" : 630, 	"r" : 0 },
	"LEVEL_TEXT" 		: { "x" : 700,		"y" : 350, 	"r" : 0 },

	"KEYBOARD_ICON" 	: { "x" : 1400 - 65*4 - 14,	"y" : 5, 	"r" : 0 },
	"SOUND_ICON" 		: { "x" : 1400 - 65*2,	"y" : 5, 	"r" : 0 },
	"BUTTON_X" 		: { "x" : 1400 - 65,	"y" : 5, 	"r" : 0 },
	"FULLSCREEN_ICON" 	: { "x" : 1400 - 60*3 - 14,	"y" : 6 },

	"STAR_SOURCE"  		: { "x" : 700,		"y" : 650, 	"r" : 0 },
	"COIN_SOURCE" 		: { "x" : 1200,		"y" : 200, 	"r" : 0 },
	"SPELWORD" 		: { "x" : 50,		"y" : 120, 	"r" : 0 },
	"SPELLEDWORD" 		: { "x" : 700,		"y" : 650, 	"r" : 0 },
	"SPELLEDWORD_KEYBOARD"	: { "x" : 700,		"y" : 370, 	"r" : 0 },

	"FROG" 		: { "x" : 700,		"y" : 500, 	"r" : 0 },
	"SPLASH" 	: { "x" : 700,		"y" : 500, 	"r" : 0 },


	"Q" 		: { "x" : 240,		"y" : 420, 	"r" : 0 },
	"W" 		: { "x" : 320,		"y" : 420, 	"r" : 0 },
	"E" 		: { "x" : 400,		"y" : 420, 	"r" : 0 },
	"R" 		: { "x" : 480,		"y" : 420, 	"r" : 0 },
	"T" 		: { "x" : 560,		"y" : 420, 	"r" : 0 },
	"Y" 		: { "x" : 640,		"y" : 420, 	"r" : 0 },
	"U" 		: { "x" : 720,		"y" : 420, 	"r" : 0 },
	"I" 		: { "x" : 800,		"y" : 420, 	"r" : 0 },
	"O" 		: { "x" : 880,		"y" : 420, 	"r" : 0 },
	"P" 		: { "x" : 960,		"y" : 420, 	"r" : 0 },
	
	"A" 		: { "x" : 280,		"y" : 500, 	"r" : 0 },
	"S" 		: { "x" : 360,		"y" : 500, 	"r" : 0 },
	"D" 		: { "x" : 440,		"y" : 500, 	"r" : 0 },
	"F" 		: { "x" : 520,		"y" : 500, 	"r" : 0 },
	"G" 		: { "x" : 600,		"y" : 500, 	"r" : 0 },
	"H" 		: { "x" : 680,		"y" : 500, 	"r" : 0 },
	"J" 		: { "x" : 760,		"y" : 500, 	"r" : 0 },
	"K" 		: { "x" : 840,		"y" : 500, 	"r" : 0 },
	"L" 		: { "x" : 920,		"y" : 500, 	"r" : 0 },
	
	"Z" 		: { "x" : 320,		"y" : 580, 	"r" : 0 },
	"X" 		: { "x" : 400,		"y" : 580, 	"r" : 0 },
	"C" 		: { "x" : 480,		"y" : 580, 	"r" : 0 },
	"V" 		: { "x" : 560,		"y" : 580, 	"r" : 0 },
	"B" 		: { "x" : 640,		"y" : 580, 	"r" : 0 },
	"N" 		: { "x" : 720,		"y" : 580, 	"r" : 0 },
	"M" 		: { "x" : 800,		"y" : 580, 	"r" : 0 },
	"Special" 		: { "x" : 1000,		"y" : 500, 	"r" : 0 },
	"specialselected" 		: { "x" : 1000,		"y" : 500, 	"r" : 0 },
	"Delete" 		: { "x" : 1040,		"y" : 420, 	"r" : 0 },
	"ok" 		: { "x" : 880,		"y" : 580, 	"r" : 0 },
	"HoofdletterLeeg" 		: { "x" : 240,		"y" : 580, 	"r" : 0 },
	"HoofdletterVol" 		: { "x" : 240,		"y" : 580, 	"r" : 0 },
	
	"eeen" 		: { "x" : 360,		"y" : 350, 	"r" : 0 },
	"eelf" 		: { "x" : 440,		"y" : 350, 	"r" : 0 },
	"etrema" 		: { "x" : 520,		"y" : 350, 	"r" : 0 },
	"atrema" 		: { "x" : 600,		"y" : 350, 	"r" : 0 },
	"itrema" 		: { "x" : 680,		"y" : 350, 	"r" : 0 },
	"apostrof" 		: { "x" : 760,		"y" : 350, 	"r" : 0 },
	"tussenstreepje" 		: { "x" : 840,		"y" : 350, 	"r" : 0 },
	"buttonleeg" 		: { "x" : 920,		"y" : 350, 	"r" : 0 },
	
	
	"MOUSE" 		: { "x" : 0,		"y" : 0, 	"r" : 0 } // *** replaced by x,y of mouse	
};

// *** Spider info (per type of spider)
var spider_info = {

	// *** Kleine spin
	1 : { 
	
	"speed" : 4,
	"speed_redemption" : 0.91,
	"wobble" : 2,
	"wobble_plate" : true,

	"text_color" : "#986b44",	
	"text_x" : -13 + 40,	
	"text_y" : 66 + 22,	
		
	"line_color" : "#4f3133",	
	"line_body_x" : 23,	
	"line_body_y" : 1, 	

	"plate_x" : -13,	
	"plate_y" : 66,	
	
	"line_1_x" : 1,		"line_1_y" : 25,	"line_1_x_end" : -12 + 16 * 0,		"line_1_y_end" : 66,		
	"line_2_x" : 5,		"line_2_y" : 32,	"line_2_x_end" : -12 + 16 * 1,		"line_2_y_end" : 66,		
	"line_3_x" : 9,		"line_3_y" : 37,	"line_3_x_end" : -12 + 16 * 2,		"line_3_y_end" : 66,		
	"line_4_x" : 39,	"line_4_y" : 37,	"line_4_x_end" : -12 + 16 * 3,		"line_4_y_end" : 66,		
	"line_5_x" : 43,	"line_5_y" : 32,	"line_5_x_end" : -12 + 16 * 4,		"line_5_y_end" : 66,		
	"line_6_x" : 47,	"line_6_y" : 25,	"line_6_x_end" : -12 + 16 * 5 - 2,	"line_6_y_end" : 66,		
	
	"width" : 49,
	"height" : 95
	
	},

	// *** Middelgrote spin
	2 : { 
	
	"speed" : 3,
	"speed_redemption" : 0.88,
	"wobble" : 3,
	"wobble_plate" : true,

	"text_color" : "#2f3037",	
	"text_x" : -29 + 129/2,	
	"text_y" : 82 + 22,	
		
	"line_color" : "#755c5d",	
	"line_body_x" : 35,	
	"line_body_y" : 6, 	

	"plate_x" : -29,	
	"plate_y" : 82,	
	
	"line_1_x" : 2,		"line_1_y" : 18,	"line_1_x_end" : -29 + 26 * 0,		"line_1_y_end" : 82,		
	"line_2_x" : 4,		"line_2_y" : 50,	"line_2_x_end" : -29 + 26 * 1,		"line_2_y_end" : 82,		
	"line_3_x" : 14,	"line_3_y" : 64,	"line_3_x_end" : -29 + 26 * 2 - 10,	"line_3_y_end" : 82,		
	"line_4_x" : 57,	"line_4_y" : 64,	"line_4_x_end" : -29 + 26 * 3 + 10,	"line_4_y_end" : 82,		
	"line_5_x" : 68,	"line_5_y" : 50,	"line_5_x_end" : -29 + 26 * 4,		"line_5_y_end" : 82,		
	"line_6_x" : 71,	"line_6_y" : 18,	"line_6_x_end" : -29 + 26 * 5 - 2,	"line_6_y_end" : 82,		
	
	"width" : 72,
	"height" : 111
	
	},

	// *** Grote spin
	3 : { 
	
	"speed" : 2,
	"speed_redemption" : 0.83,
	"wobble" : 4,
	"wobble_plate" : false,

	"text_color" : "#fe3b25",	
	"text_x" : 3 + 205/2,	
	"text_y" : 87 + 22,	
		
	"line_color" : "#755c5d",	
	"line_body_x" : 105,	
	"line_body_y" : 21, 	

	"plate_x" : -29,	
	"plate_y" : 82,	
	
	"line_1_x" : 0,		"line_1_y" : 18,	"line_1_x_end" : -29 + 26 * 0,		"line_1_y_end" : 82,		
	"line_2_x" : 0,		"line_2_y" : 50,	"line_2_x_end" : -29 + 26 * 1,		"line_2_y_end" : 82,		
	"line_3_x" : 0,		"line_3_y" : 64,	"line_3_x_end" : -29 + 26 * 2 - 10,	"line_3_y_end" : 82,		
	"line_4_x" : 0,		"line_4_y" : 64,	"line_4_x_end" : -29 + 26 * 3 + 10,	"line_4_y_end" : 82,		
	"line_5_x" : 0,		"line_5_y" : 50,	"line_5_x_end" : -29 + 26 * 4,		"line_5_y_end" : 82,		
	"line_6_x" : 0,		"line_6_y" : 18,	"line_6_x_end" : -29 + 26 * 5 - 2,	"line_6_y_end" : 82,		
	
	"width" : 208,
	"height" : 117
	
	}

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

var spider = { }; spiderCount = 0;
var floatWord = { }; floatWordCount = 0;
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
		manifestSound("bloep", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/sound/bloep." + soundExtension);
		manifestSound("cymbals", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/sound/cymbals." + soundExtension);
		//manifestSound("frog", "sound/frog." + soundExtension);
		manifestSound("ouk", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/sound/ouk." + soundExtension);
		manifestSound("sword", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/sound/sword." + soundExtension);
		manifestSound("error", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/sound/error." + soundExtension);
		manifestSound("falling", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/sound/falling." + soundExtension);
		manifestSound("gunshot", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/sound/gunshot." + soundExtension);
		manifestSound("klak", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/sound/klak." + soundExtension);
	}
	
	// *** Preload of images
	manifestImage("sound_on", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/sound_on.png");
	manifestImage("sound_off", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/sound_off.png");
	manifestImage("button_x", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/close.png");
	manifestImage("fullscreen_on", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/fullscreen_on.png");
	manifestImage("fullscreen_off", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/fullscreen_off.png");
		manifestImage("button_keyboard", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/keyboard_off.png");
	manifestImage("button_keyboard_2", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/keyboard_on.png");

	manifestImage("highscore_bg", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/highscore_bg.png");
	manifestImage("highscore_selected", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/highscore_selected.png");
	manifestImage("highscore_between", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/highscore_between.png");
	
	
	manifestImage("button", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/wl/wl_button.png");
	manifestImage("button_hover", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/wl/wl_button_selected.png");
			
	manifestImage("star", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/star.png");

	manifestImage("heart", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/heart.png");
	manifestImage("heart_empty", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/heart_empty.png");
		
	manifestImage("bg_dark", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/bg_dark.png");
	manifestImage("bg", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/bg_1.jpg");

	for(i = 1; i <= 3; i++)
	{
		manifestImage("spider_" + i + "", 		"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/spider_" + i + ".png");
		manifestImage("spider_" + i + "_blink_1", 	"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/spider_" + i + "_blink_1.png");
		manifestImage("spider_" + i + "_blink_2", 	"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/spider_" + i + "_blink_2.png");
		manifestImage("spider_" + i + "_plate", 	"https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/spider_" + i + "_plate.png");
	}
	
	// *** Keyboard
	manifestImage("a", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/keyboard/A.png");
	manifestImage("b", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/keyboard/B.png");
	manifestImage("c", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/keyboard/C.png");
	manifestImage("d", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/keyboard/D.png");
	manifestImage("e", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/keyboard/E.png");
	manifestImage("f", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/keyboard/F.png");
	manifestImage("g", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/keyboard/G.png");
	manifestImage("h", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/keyboard/H.png");
	manifestImage("i", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/keyboard/I.png");
	manifestImage("j", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/keyboard/J.png");
	manifestImage("k", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/keyboard/K.png");
	manifestImage("l", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/keyboard/L.png");
	manifestImage("m", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/keyboard/M.png");
	manifestImage("n", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/keyboard/N.png");
	manifestImage("o", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/keyboard/O.png");
	manifestImage("p", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/keyboard/P.png");
	manifestImage("q", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/keyboard/Q.png");
	manifestImage("r", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/keyboard/R.png");
	manifestImage("s", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/keyboard/S.png");
	manifestImage("t", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/keyboard/T.png");
	manifestImage("u", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/keyboard/U.png");
	manifestImage("v", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/keyboard/V.png");
	manifestImage("w", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/keyboard/W.png");
	manifestImage("x", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/keyboard/X.png");
	manifestImage("y", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/keyboard/Y.png");
	manifestImage("z", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/keyboard/Z.png");
	manifestImage("special", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/keyboard/Special.png");
	manifestImage("delete", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/keyboard/Delete.png");
	manifestImage("ok", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/keyboard/OKbutton.png");	
	manifestImage("HoofdletterLeeg", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/keyboard/HoofdletterLeeg.png");
	manifestImage("HoofdletterVol", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/keyboard/HoofdletterVol.png");
	manifestImage("atrema", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/keyboard/Atrema.png");
	manifestImage("etrema", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/keyboard/Etrema.png");
	manifestImage("buttonleeg", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/keyboard/Buttonleeg.png");
	manifestImage("eeen", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/keyboard/Eeen.png");	
	manifestImage("apostrof", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/keyboard/apostrof.png");
	manifestImage("eelf", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/keyboard/Eelf.png");
	manifestImage("itrema", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/keyboard/Itrema.png");	
	manifestImage("specialselected", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/keyboard/SpecialSelected.png");
	manifestImage("tussenstreepje", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/spiders/images/keyboard/tussenstreepje.png");
	
	
		
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