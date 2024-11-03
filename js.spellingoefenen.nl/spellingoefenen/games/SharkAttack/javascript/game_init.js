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
ExtraButtons = 0;

tijdelijk = 1;
mouse_x = 0;
mouse_y = 0;
dragging = false;
dragging_check = false;
dragging_x = 0; 
dragging_y = 0; 
userInteractionOccured = false;
Shift = 0;

// *** Preload and testing
testing = false; // *** If true, hides preloader and shows debugger at the bottom
preloadStarted = false;
preloadMinTime = 1000;
preloadMessage = "";
if(testing) preloadMinTime = 10;
preloadMinTimeDone = false;
play = false;
play_button = false; // *** Shows a playbutton (a-la-youtube) before game commences
initDone = false;
sharkFound = 0;
MaxSwimmingSharks = 1;

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
SharkChance = 0;
MaxSwimmingSharks = 0;
LightSharkChance = 0;
coinCount = 1;
gravity = 1;
bouncyness = 0.4; // *** How high does objects bounce back up
anicounter = 0;

pulsateAlpha = 0.1;
pulsateAlphaSpeed = 0.1;

backgroundX_1 = 0;
backgroundX_1r = 1400;
backgroundX_2 = 0;
backgroundX_2r = 1400;
backgroundX_3 = 0;
backgroundX_3r = 1400;

fishCount = 0;

sharkCount = 0;
sharkSpeed = 1;
sharkWobble = 6;
sharkWobbleSpeed = 0.4;

fallingLetterCount = 1;
bombCount = 1;
bombTimer = 0;

explosionCount = 1;

spelPool = "blik,bloem,breuk,brief,bril,broek,broer,bron,brug,bruin,glas,greep,groen,groep,groet,klap,klok,knal,knie,knoop,knop,kraan,kreet,kruis,kruk,plan,plas,plus,prik,proef,traag,trap,troon";

spelWord = "";
ExtraSpelWord = "";
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
css["font_shark"] = "30px 'Roboto Condensed', sans-serif";
css["font_shark_color"] = "#FFFFFF";

// *** Translations
c_z_winnaar = "WINNAAR!";


// *** Spots
var spot = {


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

	"PLAYER_INFO" 		: { "x" : 1100,		"y" : 685, 	"r" : 0 },
	"LEVEL_TEXT" 		: { "x" : 700,		"y" : 350, 	"r" : 0 },
	"SOUND_ICON" 		: { "x" : 1400 - 70*2,	"y" : 5, 	"r" : 0 },
	"BUTTON_X" 		: { "x" : 1400 - 65,	"y" : 5, 	"r" : 0 },
	"FULLSCREEN_ICON" 	: { "x" : 1400 - 65*3 - 14,	"y" : 6 },
	
	"STAR_SOURCE"  		: { "x" : 700,		"y" : 650, 	"r" : 0 },
	"COIN_SOURCE" 		: { "x" : 1200,		"y" : 200, 	"r" : 0 },
	"SPELLEDWORD" 		: { "x" : 300,		"y" : 80, 	"r" : 0 },
	"SPELLEDWORD_KEYBOARD"	: { "x" : 700,		"y" : 370, 	"r" : 0 },
	"KEYBOARD_ICON" 	: { "x" : 1320 - 65*3,	"y" : 5, 	"r" : 0 },
	"MOUSE" 		: { "x" : 0,		"y" : 0, 	"r" : 0 },	
	
	
	"Q" 		: { "x" : 240,		"y" : 510, 	"r" : 0 },
	"W" 		: { "x" : 300,		"y" : 510, 	"r" : 0 },
	"E" 		: { "x" : 360,		"y" : 510, 	"r" : 0 },
	"R" 		: { "x" : 420,		"y" : 510, 	"r" : 0 },
	"T" 		: { "x" : 480,		"y" : 510, 	"r" : 0 },
	"Y" 		: { "x" : 540,		"y" : 510, 	"r" : 0 },
	"U" 		: { "x" : 600,		"y" : 510, 	"r" : 0 },
	"I" 		: { "x" : 660,		"y" : 510, 	"r" : 0 },
	"O" 		: { "x" : 720,		"y" : 510, 	"r" : 0 },
	"P" 		: { "x" : 780,		"y" : 510, 	"r" : 0 },
	
	"A" 		: { "x" : 280,		"y" : 570, 	"r" : 0 },
	"S" 		: { "x" : 340,		"y" : 570, 	"r" : 0 },
	"D" 		: { "x" : 400,		"y" : 570, 	"r" : 0 },
	"F" 		: { "x" : 460,		"y" : 570, 	"r" : 0 },
	"G" 		: { "x" : 520,		"y" : 570, 	"r" : 0 },
	"H" 		: { "x" : 580,		"y" : 570, 	"r" : 0 },
	"J" 		: { "x" : 640,		"y" : 570, 	"r" : 0 },
	"K" 		: { "x" : 700,		"y" : 570, 	"r" : 0 },
	"L" 		: { "x" : 760,		"y" : 570, 	"r" : 0 },
	
	"Z" 		: { "x" : 320,		"y" : 630, 	"r" : 0 },
	"X" 		: { "x" : 380,		"y" : 630, 	"r" : 0 },
	"C" 		: { "x" : 440,		"y" : 630, 	"r" : 0 },
	"V" 		: { "x" : 500,		"y" : 630, 	"r" : 0 },
	"B" 		: { "x" : 560,		"y" : 630, 	"r" : 0 },
	"N" 		: { "x" : 620,		"y" : 630, 	"r" : 0 },
	"M" 		: { "x" : 680,		"y" : 630, 	"r" : 0 },
	"Special" 		: { "x" : 820,		"y" : 570, 	"r" : 0 },
	"specialselected" 		: { "x" : 820,		"y" : 570, 	"r" : 0 },
	"Delete" 		: { "x" : 840,		"y" : 510, 	"r" : 0 },
	"ok" 		: { "x" : 820,		"y" : 670, 	"r" : 0 },
	"HoofdletterLeeg" 		: { "x" : 740,		"y" : 630, 	"r" : 0 },
	"HoofdletterVol" 		: { "x" : 740,		"y" : 630, 	"r" : 0 },
	"buttonleeg" 		: { "x" : 800,		"y" : 630, 	"r" : 0 },
	
	"eeen" 		: { "x" : 330,		"y" : 450, 	"r" : 0 },
	"eelf" 		: { "x" : 390,		"y" : 450, 	"r" : 0 },
	"etrema" 		: { "x" : 450,		"y" : 450, 	"r" : 0 },
	"atrema" 		: { "x" : 510,		"y" : 450, 	"r" : 0 },
	"itrema" 		: { "x" : 570,		"y" : 450, 	"r" : 0 },
	"apostrof" 		: { "x" : 630,		"y" : 450, 	"r" : 0 },
	"tussenstreepje" 		: { "x" : 690,		"y" : 450, 	"r" : 0 },
	
	
};

var coin = { }
var star = { }
var shark = { }
var fish = { }
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
		manifestSound("bloep", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/sound/bloep." + soundExtension);
		manifestSound("gunshot", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/sound/gunshot." + soundExtension);
		manifestSound("explosion_sound", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/sound/explosion." + soundExtension);
		manifestSound("sword", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/sound/sword." + soundExtension);
		manifestSound("error", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/sound/error." + soundExtension);
		manifestSound("falling", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/sound/falling." + soundExtension);
		manifestSound("cymbals", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/sound/cymbals." + soundExtension);
		manifestSound("phaser", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/sound/phaser." + soundExtension);
		manifestSound("danger", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/sound/danger." + soundExtension);
		manifestSound("klak", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/sound/klak." + soundExtension);
		manifestSound("tick", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/sound/tick." + soundExtension);
	}
	
	// *** Preload of images
	
	// *** Keyboard
	manifestImage("button_keyboard", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/keyboard_off.png");
	manifestImage("button_keyboard_2", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/keyboard_on.png");
	
	
	manifestImage("a", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/keyboard/A.png");
	manifestImage("b", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/keyboard/B.png");
	manifestImage("c", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/keyboard/C.png");
	manifestImage("d", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/keyboard/D.png");
	manifestImage("e", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/keyboard/E.png");
	manifestImage("f", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/keyboard/F.png");
	manifestImage("g", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/keyboard/G.png");
	manifestImage("h", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/keyboard/H.png");
	manifestImage("i", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/keyboard/I.png");
	manifestImage("j", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/keyboard/J.png");
	manifestImage("k", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/keyboard/K.png");
	manifestImage("l", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/keyboard/L.png");
	manifestImage("m", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/keyboard/M.png");
	manifestImage("n", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/keyboard/N.png");
	manifestImage("o", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/keyboard/O.png");
	manifestImage("p", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/keyboard/P.png");
	manifestImage("q", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/keyboard/Q.png");
	manifestImage("r", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/keyboard/R.png");
	manifestImage("s", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/keyboard/S.png");
	manifestImage("t", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/keyboard/T.png");
	manifestImage("u", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/keyboard/U.png");
	manifestImage("v", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/keyboard/V.png");
	manifestImage("w", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/keyboard/W.png");
	manifestImage("x", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/keyboard/X.png");
	manifestImage("y", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/keyboard/Y.png");
	manifestImage("z", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/keyboard/Z.png");
	manifestImage("special", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/keyboard/Special.png");
	manifestImage("delete", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/keyboard/Delete.png");
	manifestImage("ok", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/keyboard/OKbutton.png");	
	manifestImage("HoofdletterLeeg", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/keyboard/HoofdletterLeeg.png");
	manifestImage("HoofdletterVol", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/keyboard/HoofdletterVol.png");
	manifestImage("atrema", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/keyboard/Atrema.png");
	manifestImage("etrema", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/keyboard/Etrema.png");
	manifestImage("buttonleeg", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/keyboard/Buttonleeg.png");
	manifestImage("eeen", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/keyboard/Eeen.png");	
	manifestImage("apostrof", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/keyboard/apostrof.png");
	manifestImage("eelf", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/keyboard/Eelf.png");
	manifestImage("itrema", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/keyboard/Itrema.png");	
	manifestImage("specialselected", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/keyboard/SpecialSelected.png");
	manifestImage("tussenstreepje", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/keyboard/tussenstreepje.png");
	
	
	
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

	
	manifestImage("star", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/star.png");


	manifestImage("SharkSwim_1", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/SharkSwim_1.png");
	manifestImage("SharkSwim_2", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/SharkSwim_2.png");
	manifestImage("SharkSwim_3", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/SharkSwim_3.png");
	manifestImage("SharkSwim_4", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/SharkSwim_4.png");
	manifestImage("SharkSwim_5", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/SharkSwim_5.png");
	manifestImage("SharkSwim_6", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/SharkSwim_6.png");
	manifestImage("SharkSwim_7", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/SharkSwim_7.png");
	manifestImage("SharkSwim_8", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/SharkSwim_8.png");
	
	manifestImage("SharkSwim_1light", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/SharkSwim_1light.png");
	manifestImage("SharkSwim_2light", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/SharkSwim_2light.png");
	manifestImage("SharkSwim_3light", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/SharkSwim_3light.png");
	manifestImage("SharkSwim_4light", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/SharkSwim_4light.png");
	manifestImage("SharkSwim_5light", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/SharkSwim_5light.png");
	manifestImage("SharkSwim_6light", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/SharkSwim_6light.png");
	manifestImage("SharkSwim_7light", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/SharkSwim_7light.png");
	manifestImage("SharkSwim_8light", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/SharkSwim_8light.png");
	
	manifestImage("SharkSwimBack_1", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/SharkSwimBack_1.png");
	manifestImage("SharkSwimBack_2", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/SharkSwimBack_2.png");
	manifestImage("SharkSwimBack_3", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/SharkSwimBack_3.png");
	manifestImage("SharkSwimBack_4", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/SharkSwimBack_4.png");
	manifestImage("SharkSwimBack_5", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/SharkSwimBack_5.png");
	manifestImage("SharkSwimBack_6", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/SharkSwimBack_6.png");
	manifestImage("SharkSwimBack_7", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/SharkSwimBack_7.png");
	manifestImage("SharkSwimBack_8", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/SharkSwimBack_8.png");
	
	manifestImage("SharkTurn_1", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/SharkTurn_1.png");
	manifestImage("SharkTurn_2", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/SharkTurn_2.png");
	manifestImage("SharkTurn_3", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/SharkTurn_3.png");
	manifestImage("SharkTurn_4", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/SharkTurn_4.png");
	manifestImage("SharkTurn_5", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/SharkTurn_5.png");
	manifestImage("SharkTurn_6", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/SharkTurn_6.png");
	manifestImage("SharkTurn_7", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/SharkTurn_7.png");
	
	manifestImage("bg_dark", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/bg_dark.png");
	
	manifestImage("ocean1_layer_1", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/ocean1_layer_1.png");
	manifestImage("ocean1_layer_2", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/ocean1_layer_2.png");
	manifestImage("ocean1_layer_3", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/ocean1_layer_3.png");
	
	manifestImage("button2", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/button.png");
	
	for(i = 1; i <= 22; i++) manifestImage("sharkbite" + i, "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/shark_bite" + i + ".png");
	
	for(i = 1; i <= 22; i++) manifestImage("sharkbitelight" + i, "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/shark_bite" + i + "light" + ".png");
	
	for(i = 1; i <= 47; i++) manifestImage("larry" + i, "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/Larry/larry" + i + ".png");
	
	for(i = 1; i <= 23; i++) manifestImage("puffer" + i, "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/Puffer/puffed" + i + ".png");
	
	for(i = 1; i <= 12; i++) manifestImage("toonblue" + i, "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/Toon/blue/fish" + i + ".png");
	
	for(i = 1; i <= 12; i++) manifestImage("toongreen" + i, "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/Toon/green/fish" + i + ".png");
	
	for(i = 1; i <= 16; i++) manifestImage("sharkaway" + i, "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/sharkaway/sharkaway" + i + ".png");
	
	for(i = 1; i <= 16; i++) manifestImage("sharkawaylight" + i, "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/sharkattack/images/sharkaway/sharkaway" + i + "light" + ".png");
	
	
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