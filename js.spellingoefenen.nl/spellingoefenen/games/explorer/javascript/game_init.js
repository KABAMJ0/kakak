// *** Spelled word
// *** Spelled word
gameType = getParameterByName("gameType");
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
		console.log("Init game with Gamedesign.nl HTML5 game engine " + gameEngine["version"] + " (versionHTML: " + versionHTML + "): all rights reserved");console.log("---");

		// *** Device related checks and hacks
		deviceChecksPostInit();
				
		ge('myCanvasGamedesign').style.display = 'none';

		//completeWL = "a,b";
		wlInit(completeWL);
				
		startGame();			
		//showIntro();	
		
		setInterval(function(){ defenseTick(); }, 1000);
	}
}


// *** Create begin of manifest for showing of preload screen only (NO PRELOADING OF SOUND!)
function loadPreloadManifest()
{	
	// *** Preload of images	
	manifestImage("playbutton", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/playbutton.png"); 	manifestImage("playbutton_hover", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/playbutton_hover.png");		manifestImage("alert_bg", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/alert_bg.png"); 				manifestImage("ios_startscreen", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/ios_startscreen.png");		manifestImage("bg_maneuvre", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/bg_maneuvre.png"); 	manifestImage("icon_phone", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/icon_phone.png");
	manifestImage("progressbar", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/progressbar.png");	manifestImage("progressbar_bg", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/progressbar_bg.png");		manifestImage("progressbar_fg", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/progressbar_fg.png");		manifestImage("close", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/close.png");
	manifestImage("sound_on", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/sound_on.png");		manifestImage("sound_off", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/sound_off.png");			manifestImage("fullscreen_on", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/fullscreen_on.png");		manifestImage("fullscreen_off", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/fullscreen_off.png");
	manifestImage("keyboard_on", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/keyboard_on.png");	manifestImage("keyboard_off", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/keyboard_off.png");			manifestImage("sunbeam", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/sunbeam.png");
	manifestImage("bg_intro", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/bg/intro.jpg");									
	manifestImage("particle", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/particle.png");			manifestImage("particle_black", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/particle_black.png");				manifestImage("particle_yellow", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/particle_yellow.png");				manifestImage("particle_heart", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/particle_heart.png");
	manifestImage("keyboard_key", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/keyboard/key.png");	manifestImage("keyboard_key_hover", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/keyboard/key_hover.png");		manifestImage("keyboard_key_pushed", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/keyboard/key_pushed.png");	manifestImage("keyboard_key_long", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/keyboard/key_long.png");	manifestImage("keyboard_key_long_hover", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/keyboard/key_long_hover.png");	manifestImage("keyboard_key_long_pushed", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/keyboard/key_long_pushed.png");	manifestImage("keyboard_key_alt", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/keyboard/key_alt.png");	manifestImage("keyboard_key_alt_pushed", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/keyboard/key_alt_pushed.png");	manifestImage("keyboard_key_long_alt", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/keyboard/key_long_alt.png");	manifestImage("keyboard_key_long_alt_pushed", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/keyboard/key_long_alt_pushed.png");				
	manifestImage("highscore_bg", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global//highscore/bg.png");	manifestImage("highscore_selected", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/selected.png");		manifestImage("highscore_between", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/between.png");		manifestImage("highscore_top", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/top.png");		manifestImage("highscore_top_hover", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/top_hover.png");	manifestImage("highscore_up", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/up.png");		manifestImage("highscore_up_hover", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/up_hover.png");		manifestImage("highscore_user", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/user.png");		manifestImage("highscore_user_hover", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/user_hover.png");	manifestImage("highscore_down", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/down.png");		manifestImage("highscore_down_hover", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/down_hover.png");	manifestImage("highscore_bottom", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/bottom.png");	manifestImage("highscore_bottom_hover", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/highscore/bottom_hover.png");		
	startPreload();
}

// *** Create manifest (collection of images/sounds) for preloading and use in game
function loadManifest()
{
	// *** Preload of sounds
	if(!gameEngine["globalAudioDisabled"])
	{	
		manifestSound("sword", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/sound/sword.mp3");

		manifestSound("wrong", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/sound/wrong.mp3");
		manifestSound("error", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/sound/error.mp3");
		manifestSound("bell_chord", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/sound/bell_chord.mp3");
		manifestSound("sound_shot_1", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/sound/sound_shot_1.mp3");
		manifestSound("sound_shot_2", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/sound/sound_shot_2.mp3");
		manifestSound("sound_shot_3", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/sound/sound_shot_3.mp3");
		manifestSound("sound_shot_4", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/sound/sound_shot_4.mp3");
		manifestSound("sound_shot_6", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/sound/sound_shot_6.mp3");
		manifestSound("sound_shot_7", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/sound/sound_shot_7.mp3");
		
		manifestSound("sound_tower_shot_7", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/sound/sound_tower_shot_7.mp3");
		manifestSound("sound_shot_1_hit", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/sound/sound_shot_1_hit.mp3");
		manifestSound("sound_shot_3_hit", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/sound/sound_shot_3_hit.mp3");
		manifestSound("sound_shot_6_hit", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/sound/sound_shot_6_hit.mp3");
		manifestSound("burn", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/sound/burn.mp3");
		manifestSound("flash", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/sound/flash.mp3");
		manifestSound("sound_blob_1", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/sound/sound_blob_1.mp3");
		manifestSound("sound_blob_2", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/sound/sound_blob_2.mp3");
		manifestSound("sound_blob_3", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/sound/sound_blob_3.mp3");
		manifestSound("stone_door", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/sound/stone_door.mp3");
		manifestSound("argh", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/sound/argh.mp3");
		manifestSound("weapon_drop", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/sound/weapon_drop.mp3");
		manifestSound("beam_up", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/sound/beam_up.mp3");
		manifestSound("music", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/sound/music4.mp3");
		manifestSound("music3", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/sound/music3.mp3");
		manifestSound("music5", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/sound/music5.mp3");
		manifestSound("discover", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/sound/discover.mp3");
		manifestSound("explosion", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/sound/explosion.mp3");

		manifestSound("hurt1", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/sound/hurt1.mp3");
		manifestSound("hurt2", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/sound/hurt2.mp3");
		manifestSound("hurt3", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/sound/hurt3.mp3");

		manifestSound("select", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/sound/select.mp3");
		manifestSound("select2", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/sound/select2.mp3");
		manifestSound("select3", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/sound/select3.mp3");
		manifestSound("select4", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/sound/select4.mp3");

	}
		
	manifestImage("button", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/button.png"); manifestImage("button_hover", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/button_hover.png");
	//manifestImage("bg", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/bg_landscape.jpg");
	
	// *** Level
	manifestImage("map_bg", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/map/bg.png");
	manifestImage("map_darkness_r", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/map/darkness_r.png");
	manifestImage("map_darkness_c", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/map/darkness_c.png");
	manifestImage("map_button", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/map/button.png");
	
	// *** Castle
	manifestImage("castle_static", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/castle/static.png");
	manifestImage("castle_damage", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/castle/damage.png");
	for(i = 1; i <= 9; i++) manifestImage("castle_open_" + i, "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/castle/open_" + i + ".png");

	// *** Archer
	manifestImage("archer_static", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/archer/static.png");
	manifestImage("archer_hay", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/archer/hay.png");
	for(i = 1; i <= 5; i++) manifestImage("archer_shoot_" + i, "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/archer/shoot_" + i + ".png");
	
	// *** Hero
	manifestImage("hero_static", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/hero/static.png");
	manifestImage("hero_damage", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/hero/damage.png");
	manifestImage("hero_shadow", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/hero/shadow.png");
	for(i = 1; i <= 4; i++) manifestImage("hero_walk_" + i, "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/hero/walk_" + i + ".png");
	for(i = 1; i <= 6; i++) manifestImage("hero_shoot_" + i, "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/hero/shoot_" + i + ".png");
	for(i = 1; i <= 33; i++) manifestImage("hero_dead_" + i, "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/hero/dead_" + i + ".png");

	manifestImage("hero_marker", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/hero/marker.png");
	manifestImage("hero_marker_shadow", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/hero/marker_shadow.png");

	manifestImage("arrow", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/arrow.png");

	// *** Shots
	for(i = 1; i <= 8; i++) manifestImage("shot_" + i, "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/shot/" + i + ".png");
	
	// *** Resources
	for(i = 1; i <= 10; i++) manifestImage("resource_" + i, "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/resource/" + i + ".png");
	
	
	// *** UI
	manifestImage("ui_button_build", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/ui/button_build.png");		manifestImage("ui_button_build_selected", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/ui/button_build_selected.png");
	manifestImage("ui_button_castle", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/ui/button_castle.png");	
	manifestImage("ui_button_discover", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/ui/button_discover.png");	manifestImage("ui_button_discover_selected", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/ui/button_discover_selected.png");
	manifestImage("ui_button_hero", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/ui/button_hero.png");		manifestImage("ui_button_stop", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/ui/button_stop.png");		manifestImage("ui_button_pause", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/ui/button_pause.png");		manifestImage("ui_button_bomb", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/ui/button_bomb.png");
	manifestImage("ui_wave_bg", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/ui/wave_bg.png");			manifestImage("ui_wave_bar", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/ui/wave_bar.png");
	manifestImage("ui_wave_bg_2", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/ui/wave_bg_2.png");		manifestImage("ui_wave_bar_2", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/ui/wave_bar_2.png");
	manifestImage("ui_wave_quick", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/ui/wave_quick.png");

	manifestImage("ui_bar", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/ui/bar.png");
	manifestImage("ui_x", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/ui/x.png");
	manifestImage("ui_lock", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/ui/lock.png");
	manifestImage("ui_hero_select_lock", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/ui/hero_select_lock.png");

	manifestImage("bg_building", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/bg/building.png");
	//manifestImage("bg_discover", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/bg_discover.png");
	manifestImage("bg_hero_select", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/bg/hero_select.png");
	manifestImage("bg_end", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/bg/end.png");
	manifestImage("bg_game_over", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/bg/game_over.png");
	manifestImage("bg_spelling", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/bg/spelling.jpg");

	manifestImage("healthbar_bg", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/healthbar_bg.png");
	manifestImage("healthbar_bar", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/healthbar_bar.png");
	manifestImage("healthbar_heart", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/healthbar_heart.png");

	// *** Icons
	manifestImage("icon_resource_1", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/icon/resource_1.png");
	manifestImage("icon_resource_2", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/icon/resource_2.png");
	manifestImage("icon_resource_3", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/icon/resource_3.png");
	manifestImage("icon_resource_4", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/icon/resource_4.png");
	manifestImage("icon_heart", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/icon/heart.png");
	manifestImage("icon_damage", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/icon/damage.png");
	manifestImage("icon_fire", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/icon/fire.png");
	manifestImage("icon_lightning", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/icon/lightning.png");
	manifestImage("icon_x", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/icon/x.png");
	manifestImage("icon_archer", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/icon/archer.png");
	manifestImage("icon_arrow", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/icon/arrow.png");
	manifestImage("icon_research", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/icon/research.png");
	manifestImage("icon_upgrade", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/icon/upgrade.png");
	manifestImage("icon_radius", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/icon/radius.png");
	manifestImage("icon_hourglass", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/icon/hourglass.png");
	manifestImage("icon_enhancement", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/icon/enhancement.png");
	manifestImage("icon_shot_5", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/icon/shot_5.png");
	manifestImage("icon_shot_6", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/icon/shot_6.png");
	manifestImage("icon_shot_7", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/icon/shot_7.png");
	manifestImage("icon_hero", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/icon/hero.png");
	
	
	// *** Upgrade
	manifestImage("upgrade_bg", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/upgrade/bg.png");
	manifestImage("upgrade_1", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/upgrade/1.png");
	manifestImage("upgrade_2", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/upgrade/2.png");
	manifestImage("upgrade_3", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/upgrade/3.png");
	manifestImage("upgrade_4", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/upgrade/4.png");
	manifestImage("upgrade_flash", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/upgrade/flash.png");


	// *** Tower
	for(i = 1; i <= 7; i++)
	{
		manifestImage("tower_" + i + "_static", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/tower/" + i + "/static.png");	
		manifestImage("tower_" + i + "_damage", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/tower/" + i + "/damage.png");	
	} 
	
	for(i = 1; i <= 9; i++) manifestImage("tower_2_shoot_" + i, "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/tower/2/shoot_" + i + ".png");
	for(i = 1; i <= 9; i++) manifestImage("tower_2_impact_" + i, "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/tower/2/impact_" + i + ".png");

	for(i = 1; i <= 13; i++) manifestImage("tower_3_shoot_" + i, "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/tower/3/shoot_" + i + ".png");
	for(i = 1; i <= 4; i++) manifestImage("tower_3_impact_" + i, "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/tower/3/impact_" + i + ".png");
	
	for(i = 1; i <= 4; i++) manifestImage("tower_6_shoot_" + i, "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/tower/6/shoot_" + i + ".png");

	for(i = 1; i <= 12; i++) manifestImage("tower_7_shoot_" + i, "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/tower/7/shoot_" + i + ".png");
	for(i = 1; i <= 7; i++) manifestImage("tower_7_impact_" + i, "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/tower/7/impact_" + i + ".png");
	
	// *** Blob
	for(i = 1; i <= 13; i++)
	{
		manifestImage("blob_" + i, "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/blob/" + i + ".png");	
		manifestImage("blob_" + i + "_shadow", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/blob/" + i + "_shadow.png");	
		manifestImage("blob_" + i + "_particle", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/blob/" + i + "_particle.png");	
		manifestImage("blob_" + i + "_cold", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/blob/" + i + "_cold.png");	
	}	

	manifestImage("blob_13_alt", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/blob/13_alt.png");		
	// manifestImage("blob_cold", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/explorer/images/blob/cold.png");	


	// *** Spelling Word
	manifestImage("voice", "https://afbeeldingen.spellingoefenen.nl/oefenen/images/ui/voice.png");
	manifestImage("voice_sentence", "https://afbeeldingen.spellingoefenen.nl/oefenen/images/ui/voice_sentence.png");
	manifestImage("letter", "https://afbeeldingen.spellingoefenen.nl/oefenen/images/letter.png");
	manifestImage("letter_empty", "https://afbeeldingen.spellingoefenen.nl/oefenen/images/letter_empty.png");
	
	
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
	"music" : "",	"loopingMusic" : 1,
	"mouseX" : 0, 	"mouseY" : 0, // *** Mouse position is untrustworthy as touch-devices don't support this
	"dragging" : false,	"draggingCheck" : false,	"draggingX" : 0,	"draggingY" : 0,	
	"keyCount" : 0,
	"gravity" : 1, // *** Gravity to make objects fall
	"bouncyness" : 0.5, // *** How high does objects bounce back up
	"pulsate" : 0, "pulsateCos" : 0, "pulsateX" : 0, "pulsateSpeed" : 0.2,

	"highscoreName" : getCookie("highscoreName"),	"highscoreEmail" : getCookie("highscoreEmail"),		"highscoreAgreedTerms" : getCookie("highscoreAgreedTerms"),	"highscoreNewsletter" : getCookie("highscoreNewsletter"),	
	"highscoreGamePlay" : "", "highscoreListSize" : 11, "highscoreListLineheight" : 47, "highscoreListScroll" : 0, "highscoreListBusy" : false,
	"highscoreList" : new Array(),
	
	"music" : "", "loopingMusic" : 1,
	
	"word" : "",
	"wordTyped" : "",
	"wordSyllable" : {},
	"wordSyllableCount" : 0,
	"wordCount" : 0,
	"wordFrequency" : 50,
	
	"scrollXsrc" : 0,	"scrollX" : 0,
	"scrollYsrc" : 0,	"scrollY" : 0,

	"resource1" : 100,	"resource2" : 0,	"resource3" : 0,	"resource4" : 0,

	"upgradeFlash1" : 0,	"upgradeFlash2" : 0,	"upgradeFlash3" : 0,	"upgradeFlash4" : 0,
	
	"showDiscover" : false,
	"showBuilding" : false,
	"showHeroSelect" : true,


	"placeBuilding" : 0,
	"subInfoText" : "",

	"canBuildTower1" : false,
	"canBuildTower2" : false,
	"canBuildTower3" : false,
	"canBuildTower4" : false,
	"canBuildTower5" : false,
	"canBuildTower6" : false,
	"canBuildTower7" : false,

	"playerSelected" : 0,
	"playerMirrored" : false,
	"playerUpgradeLevel" : 1,
	"playerResearchLevel" : 0,

	"messageCount" : 0,
	"messageText" : "",
	
	"levelBlobRandomChance" : 1.000, // *** Change that a random blob occurs in between waves
	"levelWave" : 0,
	"levelWaveStatus" : "COUNTDOWN", // *** COUNTDOWN (count down to wave start), WAVE (Wave is occuring)
	"levelWaveCount" : 0,
	"levelWaveCountMax" : 30*40, // *** Waiting for wave phase
	"levelWaveCountMaxWave" : 10*40, // *** Wave phase
	"levelWaveBlobTypes" : 0,
	"levelWaveBlobTypeFocus" : 0,
	"levelOccasionalBlobType" : 0,
	
	"levelWaveAmount" : 3,
	"levelHurryWaveReward" : 0,

	"gameFinished" : false,
	"gameFinishedScreen" : false,
	"gameGameOverScreen" : false,
	"gameFinishedCount" : 0,

	"debugShow" : false,
	"debugInfo" : false,

	"gamePaused" : true,
	"bombCount" : 5,

	"heroesUnlocked" : 2,

	"spellingAmount" : 0,
	"spellingAmountCount" : 0,
	"spellingType" : "",
	"spellingVar" : "",


	// *** Spelling word
	"showSpellingWord" : false,
	"ShowVoiceButton" : false,
	"ShowVoiceButtonSentences" : false,
	
	
};

var tile = { 

	1 : {1 : {}, 2 : {}, 3 : {}, 4 : {}, 5 : {}, 6 : {}, 7 : {}, 8 : {}, 9 : {}, 10 : {}, 11 : {}, 12 : {}, 13 : {}, 14 : {}, 15 : {},}, 
	2 : {1 : {}, 2 : {}, 3 : {}, 4 : {}, 5 : {}, 6 : {}, 7 : {}, 8 : {}, 9 : {}, 10 : {}, 11 : {}, 12 : {}, 13 : {}, 14 : {}, 15 : {},}, 
	3 : {1 : {}, 2 : {}, 3 : {}, 4 : {}, 5 : {}, 6 : {}, 7 : {}, 8 : {}, 9 : {}, 10 : {}, 11 : {}, 12 : {}, 13 : {}, 14 : {}, 15 : {},}, 
	4 : {1 : {}, 2 : {}, 3 : {}, 4 : {}, 5 : {}, 6 : {}, 7 : {}, 8 : {}, 9 : {}, 10 : {}, 11 : {}, 12 : {}, 13 : {}, 14 : {}, 15 : {},}, 
	5 : {1 : {}, 2 : {}, 3 : {}, 4 : {}, 5 : {}, 6 : {}, 7 : {}, 8 : {}, 9 : {}, 10 : {}, 11 : {}, 12 : {}, 13 : {}, 14 : {}, 15 : {},}, 
	6 : {1 : {}, 2 : {}, 3 : {}, 4 : {}, 5 : {}, 6 : {}, 7 : {}, 8 : {}, 9 : {}, 10 : {}, 11 : {}, 12 : {}, 13 : {}, 14 : {}, 15 : {},}, 
	7 : {1 : {}, 2 : {}, 3 : {}, 4 : {}, 5 : {}, 6 : {}, 7 : {}, 8 : {}, 9 : {}, 10 : {}, 11 : {}, 12 : {}, 13 : {}, 14 : {}, 15 : {},}, 
	8 : {1 : {}, 2 : {}, 3 : {}, 4 : {}, 5 : {}, 6 : {}, 7 : {}, 8 : {}, 9 : {}, 10 : {}, 11 : {}, 12 : {}, 13 : {}, 14 : {}, 15 : {},}, 
	9 : {1 : {}, 2 : {}, 3 : {}, 4 : {}, 5 : {}, 6 : {}, 7 : {}, 8 : {}, 9 : {}, 10 : {}, 11 : {}, 12 : {}, 13 : {}, 14 : {}, 15 : {},}, 
	10 : {1 : {}, 2 : {}, 3 : {}, 4 : {}, 5 : {}, 6 : {}, 7 : {}, 8 : {}, 9 : {}, 10 : {}, 11 : {}, 12 : {}, 13 : {}, 14 : {}, 15 : {},}, 
	11 : {1 : {}, 2 : {}, 3 : {}, 4 : {}, 5 : {}, 6 : {}, 7 : {}, 8 : {}, 9 : {}, 10 : {}, 11 : {}, 12 : {}, 13 : {}, 14 : {}, 15 : {},}, 
	12 : {1 : {}, 2 : {}, 3 : {}, 4 : {}, 5 : {}, 6 : {}, 7 : {}, 8 : {}, 9 : {}, 10 : {}, 11 : {}, 12 : {}, 13 : {}, 14 : {}, 15 : {},}, 
	13 : {1 : {}, 2 : {}, 3 : {}, 4 : {}, 5 : {}, 6 : {}, 7 : {}, 8 : {}, 9 : {}, 10 : {}, 11 : {}, 12 : {}, 13 : {}, 14 : {}, 15 : {},}, 
	14 : {1 : {}, 2 : {}, 3 : {}, 4 : {}, 5 : {}, 6 : {}, 7 : {}, 8 : {}, 9 : {}, 10 : {}, 11 : {}, 12 : {}, 13 : {}, 14 : {}, 15 : {},}, 
	15 : {1 : {}, 2 : {}, 3 : {}, 4 : {}, 5 : {}, 6 : {}, 7 : {}, 8 : {}, 9 : {}, 10 : {}, 11 : {}, 12 : {}, 13 : {}, 14 : {}, 15 : {},}, 
};

// *** Passive multiplayer highscore list
var passiveMultiplayerList = { };

// *** Spots (locations in game; capitalized for recognition)
var spot = {

	// *** UI
	"WINDOW_BUTTONS"	: { "x" : game["width"] - 75,	"y" : 2,	"margin" : 10 },
	"CLOSE_ICON" 		: { "x" : 10000,		"y" : 2,	"width" : 60,	"height" : 60 }, // *** x gets recalculated according to visible icons
	"FULLSCREEN_ICON" 	: { "x" : 10000,		"y" : 2,	"width" : 60,	"height" : 60 }, // *** x gets recalculated according to visible icons
	"SOUND_ICON" 		: { "x" : 10000,		"y" : 2,	"width" : 60,	"height" : 60 }, // *** x gets recalculated according to visible icons
	"KEYBOARD_ICON"		: { "x" : 10000,		"y" : 2,	"width" : 60,	"height" : 60 }, // *** x gets recalculated according to visible icons	
	"BUTTON" 		: { "paddingBottom" : 36, 	"font" : "32px 'Caveat Brush', cursive",		"color" : "#FFFFFF",	"shadow" : true,	"paddingBottomHover" : 33, 	"fontHover" : "32px 'Caveat Brush', cursive",	"colorHover" : "#FFFFFF",	"shadowHover" : true, },

	// *** Intro / playbutton / preload
	"INTRO" 		: { "x" : 0,				"y" : 0 },
	"INTRO_LOGO"	 	: { "x" : game["width"]/2,		"y" : game["height"]/2 - 230 },
	"INTRO_PLAYBUTTON" 	: { "x" : game["width"]/2 - 230/2,	"y" : game["height"]/2 - 230/2, 	"width" : 230, 		"height" : 230 },
	"INTRO_PRELOADER"	: { "x" : game["width"]/2 - 476/2,	"y" : 310, 				"width" : 475, 		"height" : 70,		"paddingLeft" : 13,	"paddingTop" : 9,	"preloaderWidth" : 448,		"preloaderHeight" : 50, },
	"INTRO_PRELOAD_MESSAGE"	: { "x" : game["width"]/2,		"y" : game["height"]/2 + 150,		"font" : "bold 20px 'Caveat Brush', cursive", 	"color" : "#000000", 	"textAlign" : "center",	"shadow" : false,	"lineHeight" : 24  },

	"INTRO_MANEUVRE" 	: { "x" : game["width"]/2,		"y" : game["height"]/2,			"font" : "bold 46px 'Caveat Brush', cursive", 	"color" : "#FFFFFF", 	"textAlign" : "center",		"shadow" : true,	"lineHeight" : 50,	"paddingTop" : 230 },

	"INTRO_VERSION" 	: { "x" : game["width"] - 20,		"y" : game["height"] - 20,		"font" : "12px 'Caveat Brush', cursive", 	"color" : "#FFFFFF", 	"textAlign" : "right",	"shadow" : true },
	"INTRO_IOS_ALERT"	: { "x" : game["width"]/2 - 400/2-4,	"y" : game["height"]/2-125, 		"font" : "bold 22px 'Caveat Brush', cursive", 	"color" : "#000000", 	"textAlign" : "center",	"shadow" : false,	"lineHeight" : 24 }, 
	"INTRO_IOS_BUTTON"	: { "x" : game["width"]/2 - 200/2,	"y" : game["height"]/2-125+177 }, 
	"INTRO_NINJA"		: { "x" : game["width"]/2 - 600/2,	"y" : game["height"]/2-150 }, 
	"INTRO_PLAY_BUTTON"	: { "x" : game["width"]/2 - 210,	"y" : game["height"]/2+230 }, 
	"INTRO_HIGHSCORE_BUTTON": { "x" : game["width"]/2 + 10,		"y" : game["height"]/2+230 }, 


	// *** Game
	"BG"	: { "x" : 0,		"y" : 0, }, 

	"WORD_COUNT_TEXT"	: { "x" : 775,		"y" : 140, 	"font" : "26px 'Caveat Brush', cursive", 	"color" : "#FFFFFF", 	"textAlign" : "center",	"shadow" : true,	"lineHeight" : 24,	"maxWidth" : 700 }, 
	
	
	
	"UI_BUTTON_STOP"	: { "x" : 0,		"y" : 3,	"width" : 114, 		"height" : 60 }, 
	"UI_BUTTON_PAUSE"	: { "x" : 113,		"y" : 3,	"width" : 61, 		"height" : 60 }, 
	"UI_BUTTON_CASTLE"	: { "x" : 113+60,	"y" : 3,	"width" : 61, 		"height" : 60 }, 
	"UI_BUTTON_HERO"	: { "x" : 113+60*2,	"y" : 3,	"width" : 61, 		"height" : 60 }, 
	"UI_BUTTON_BOMB"	: { "x" : 113+60*3,	"y" : 3,	"width" : 61, 		"height" : 60 }, 
	"UI_BUTTON_BOMB_TEXT"	: { "x" : 0,		"y" : 0, 	"font" : "18px 'Caveat Brush', cursive", 	"color" : "#FFFFFF", 	"textAlign" : "center",	"shadow" : true,	"lineHeight" : 24,	"maxWidth" : 358 }, 
	"UI_BUTTON_DISCOVER"	: { "x" : 113+60*4,	"y" : 3,	"width" : 114, 		"height" : 60 }, 
	"UI_BUTTON_BUILD"	: { "x" : 938,		"y" : 3,	"width" : 114, 		"height" : 60 }, 
	"UI_BUTTON_PAUSE_TEXT"	: { "x" : 159+30,	"y" : 3+40, 	"font" : "bold 36px 'Caveat Brush', cursive", 	"color" : "#ff9c01", 	"textAlign" : "left",	"shadow" : true,	"lineHeight" : 24,	"maxWidth" : 358 }, 
	
	"RESOURCE_1"		: { "x" : 526,		"y" : 39, 	"font" : "bold 36px 'Caveat Brush', cursive", 	"color" : "#ff9c01", 	"textAlign" : "left",	"shadow" : true,	"lineHeight" : 24,	"maxWidth" : 58 }, 
	"RESOURCE_2"		: { "x" : 662-20,	"y" : 39, 	"font" : "bold 36px 'Caveat Brush', cursive", 	"color" : "#bc7a5c", 	"textAlign" : "left",	"shadow" : true,	"lineHeight" : 24,	"maxWidth" : 58 }, 
	"RESOURCE_3"		: { "x" : 771-20,	"y" : 39, 	"font" : "bold 36px 'Caveat Brush', cursive", 	"color" : "#c2c1be", 	"textAlign" : "left",	"shadow" : true,	"lineHeight" : 24,	"maxWidth" : 58 }, 
	"RESOURCE_4"		: { "x" : 880-20,	"y" : 39, 	"font" : "bold 36px 'Caveat Brush', cursive", 	"color" : "#f40033", 	"textAlign" : "left",	"shadow" : true,	"lineHeight" : 24,	"maxWidth" : 58 }, 
	
	"RESOURCE_1_SMALL"	: { "x" : 0,	"y" : 0, 	"font" : "18px 'Caveat Brush', cursive", 	"color" : "#ff9c01", 	"textAlign" : "center",	"shadow" : true,	"lineHeight" : 24,	"maxWidth" : 54 }, 
	"RESOURCE_2_SMALL"	: { "x" : 0,	"y" : 0, 	"font" : "18px 'Caveat Brush', cursive", 	"color" : "#bc7a5c", 	"textAlign" : "center",	"shadow" : true,	"lineHeight" : 24,	"maxWidth" : 54 }, 
	"RESOURCE_3_SMALL"	: { "x" : 0,	"y" : 0, 	"font" : "18px 'Caveat Brush', cursive", 	"color" : "#c2c1be", 	"textAlign" : "center",	"shadow" : true,	"lineHeight" : 24,	"maxWidth" : 54 }, 
	"RESOURCE_4_SMALL"	: { "x" : 0,	"y" : 0, 	"font" : "18px 'Caveat Brush', cursive", 	"color" : "#f40033", 	"textAlign" : "center",	"shadow" : true,	"lineHeight" : 24,	"maxWidth" : 54 }, 

	"RESOURCE_1_MEDIUM"	: { "x" : 0,	"y" : 0, 	"font" : "24px 'Caveat Brush', cursive", 	"color" : "#ff9c01", 	"textAlign" : "left",	"shadow" : true,	"lineHeight" : 24,	"maxWidth" : 54 }, 
	"RESOURCE_2_MEDIUM"	: { "x" : 0,	"y" : 0, 	"font" : "24px 'Caveat Brush', cursive", 	"color" : "#bc7a5c", 	"textAlign" : "left",	"shadow" : true,	"lineHeight" : 24,	"maxWidth" : 54 }, 
	"RESOURCE_3_MEDIUM"	: { "x" : 0,	"y" : 0, 	"font" : "24px 'Caveat Brush', cursive", 	"color" : "#c2c1be", 	"textAlign" : "left",	"shadow" : true,	"lineHeight" : 24,	"maxWidth" : 54 }, 
	"RESOURCE_4_MEDIUM"	: { "x" : 0,	"y" : 0, 	"font" : "24px 'Caveat Brush', cursive", 	"color" : "#f40033", 	"textAlign" : "left",	"shadow" : true,	"lineHeight" : 24,	"maxWidth" : 54 }, 

	"UPGRADE_1_DESC"	: { "x" : 0,	"y" : 0, 	"font" : "20px 'Caveat Brush', cursive", 	"color" : "#ff9c01", 	"textAlign" : "right",	"shadow" : true,	"lineHeight" : 24,	"maxWidth" : 200,	"extraX" : -50,	"extraY" : 5 }, 
	"UPGRADE_2_DESC"	: { "x" : 0,	"y" : 0, 	"font" : "20px 'Caveat Brush', cursive", 	"color" : "#ff9c01", 	"textAlign" : "left",	"shadow" : true,	"lineHeight" : 24,	"maxWidth" : 200,	"extraX" : 42,	"extraY" : 5 }, 
	"UPGRADE_3_DESC"	: { "x" : 0,	"y" : 0, 	"font" : "20px 'Caveat Brush', cursive", 	"color" : "#ff9c01", 	"textAlign" : "right",	"shadow" : true,	"lineHeight" : 24,	"maxWidth" : 200,	"extraX" : -50,	"extraY" : 5 }, 
	"UPGRADE_4_DESC"	: { "x" : 0,	"y" : 0, 	"font" : "20px 'Caveat Brush', cursive", 	"color" : "#ff9c01", 	"textAlign" : "left",	"shadow" : true,	"lineHeight" : 24,	"maxWidth" : 200,	"extraX" : 42,	"extraY" : 5 }, 

	
	"DISCOVER_BUTTON_TEXT"	: { "x" : 0,	"y" : 0, 	"font" : "bold 66px 'Caveat Brush', cursive", 	"color" : "#ff9c01", 	"textAlign" : "center",	"shadow" : true,	"lineHeight" : 24,	"maxWidth" : 170 }, 

	"MESSAGE"	: { "x" : 0,	"y" : 0, 	"font" : "36px 'Caveat Brush', cursive", 	"color" : "#FFFFFF", 	"textAlign" : "center",	"shadow" : true,	"lineHeight" : 24,	"maxWidth" : 1300 }, 

	"BUILD_CLOSE"		: { "x" : 1284,	"y" : 74,	"width" : 86, 		"height" : 80 }, 

	"BUILD_TOWER_1"		: { "x" : 133 + 170*0,	"y" : 541,	"width" : 122, 		"height" : 66 }, 
	"BUILD_TOWER_2"		: { "x" : 133 + 170*1,	"y" : 541,	"width" : 122, 		"height" : 66 }, 
	"BUILD_TOWER_3"		: { "x" : 133 + 170*2,	"y" : 541,	"width" : 122, 		"height" : 66 }, 
	"BUILD_TOWER_4"		: { "x" : 133 + 170*3,	"y" : 541,	"width" : 122, 		"height" : 66 }, 
	"BUILD_TOWER_5"		: { "x" : 133 + 170*4,	"y" : 541,	"width" : 122, 		"height" : 66 }, 
	"BUILD_TOWER_6"		: { "x" : 133 + 170*5,	"y" : 541,	"width" : 122, 		"height" : 66 }, 
	"BUILD_TOWER_7"		: { "x" : 133 + 170*6,	"y" : 541,	"width" : 122, 		"height" : 66 }, 

	"BUILD_TOWER_AREA_1"		: { "x" : 133 + 170*0,	"y" : 541-340,	"width" : 122, 		"height" : 66+340 }, 
	"BUILD_TOWER_AREA_2"		: { "x" : 133 + 170*1,	"y" : 541-340,	"width" : 122, 		"height" : 66+340 }, 
	"BUILD_TOWER_AREA_3"		: { "x" : 133 + 170*2,	"y" : 541-340,	"width" : 122, 		"height" : 66+340 }, 
	"BUILD_TOWER_AREA_4"		: { "x" : 133 + 170*3,	"y" : 541-340,	"width" : 122, 		"height" : 66+340 }, 
	"BUILD_TOWER_AREA_5"		: { "x" : 133 + 170*4,	"y" : 541-340,	"width" : 122, 		"height" : 66+340 }, 
	"BUILD_TOWER_AREA_6"		: { "x" : 133 + 170*5,	"y" : 541-340,	"width" : 122, 		"height" : 66+340 }, 
	"BUILD_TOWER_AREA_7"		: { "x" : 133 + 170*6,	"y" : 541-340,	"width" : 122, 		"height" : 66+340 }, 

	"SUB_INFO_TEXT"		: { "x" : 700,	"y" : 650, 	"font" : "46px 'Caveat Brush', cursive", 	"color" : "#FFFFFF", 	"textAlign" : "center",	"shadow" : true,	"lineHeight" : 40,	"maxWidth" : 1300 }, 

	"WAVE_TEXT"		: { "x" : 700,	"y" : 650, 	"font" : "14px 'Caveat Brush', cursive", 	"color" : "#afef59", 	"textAlign" : "left",	"shadow" : true,	"lineHeight" : 40,	"maxWidth" : 300 }, 
	"WAVE_TEXT_2"		: { "x" : 700,	"y" : 650, 	"font" : "14px 'Caveat Brush', cursive", 	"color" : "#ef55e0", 	"textAlign" : "left",	"shadow" : true,	"lineHeight" : 40,	"maxWidth" : 300 }, 
	"WAVE_QUICK"		: { "x" : 905,	"y" : 655,	"width" : 50, 		"height" : 50 }, 

	"END_BUTTON_1"		: { "x" : 519,	"y" : 459,	"width" : 220, 		"height" : 116 }, 
	"END_BUTTON_2"		: { "x" : 743,	"y" : 459,	"width" : 220, 		"height" : 116 }, 
	"END_BUTTON_3"		: { "x" : 519 + 110,	"y" : 459,	"width" : 220, 		"height" : 116 }, 

	"HERO_SELECT_BUTTON_1"	: { "x" : 100+247*0,	"y" : 214,	"width" : 236, 		"height" : 412 }, 
	"HERO_SELECT_BUTTON_2"	: { "x" : 100+247*1,	"y" : 214,	"width" : 236, 		"height" : 412 }, 
	"HERO_SELECT_BUTTON_3"	: { "x" : 100+247*2,	"y" : 214,	"width" : 236, 		"height" : 412 }, 
	"HERO_SELECT_BUTTON_4"	: { "x" : 100+247*3,	"y" : 214,	"width" : 236, 		"height" : 412 }, 
	"HERO_SELECT_BUTTON_5"	: { "x" : 100+247*4,	"y" : 214,	"width" : 236, 		"height" : 412 }, 

	"HERO_SELECT_LOCK_TEXT"	: { "x" : 0,	"y" : 0, 	"font" : "21px 'Caveat Brush', cursive", 	"color" : "#ff9c01", 	"textAlign" : "left",	"shadow" : true,	"lineHeight" : 20,	"maxWidth" : 155 }, 


	"DEBUG_TEXT"		: { "x" : 1200 + 15-60,		"y" : 590, 	"font" : "bold 12px Arial", 	"color" : "#FFFFFF", 	"textAlign" : "left",	"shadow" : true,	"lineHeight" : 14,	"maxWidth" : 1000 }, 
	"DEBUG_BUTTON_1"	: { "x" : 1200 + 10+60*0-60,	"y" : 640,	"width" : 61, 		"height" : 60 }, 
	"DEBUG_BUTTON_2"	: { "x" : 1200 + 10+60*1-60,	"y" : 640,	"width" : 61, 		"height" : 60 }, 
	"DEBUG_BUTTON_3"	: { "x" : 1200 + 10+60*2-60,	"y" : 640,	"width" : 61, 		"height" : 60 }, 
	"DEBUG_BUTTON_4"	: { "x" : 1200 + 10+60*3-60,	"y" : 640,	"width" : 61, 		"height" : 60 }, 
	"DEBUG_BUTTON_5"	: { "x" : 1200 + 10+60*4-60,	"y" : 640,	"width" : 61, 		"height" : 60 }, 


	"PASSIVE_MULTIPLAYER_LIST_YOU"		: { "x" : 15,		"y" : 660, 	"font" : "18px 'Caveat Brush', cursive", 	"color" : "#ff9c01", 	"textAlign" : "left",	"shadow" : true,	"lineHeight" : 14,	"maxWidth" : 100 }, 
	"PASSIVE_MULTIPLAYER_LIST_YOU_SCORE"	: { "x" : 160,		"y" : 660, 	"font" : "18px 'Caveat Brush', cursive", 	"color" : "#ff9c01", 	"textAlign" : "right",	"shadow" : true,	"lineHeight" : 14,	"maxWidth" : 50 },
	"PASSIVE_MULTIPLAYER_LIST_NEXT"		: { "x" : 15,		"y" : 660-22, 	"font" : "18px 'Caveat Brush', cursive", 	"color" : "#bc7a5c", 	"textAlign" : "left",	"shadow" : true,	"lineHeight" : 14,	"maxWidth" : 100 }, 
	"PASSIVE_MULTIPLAYER_LIST_NEXT_SCORE"	: { "x" : 160,		"y" : 660-22, 	"font" : "18px 'Caveat Brush', cursive", 	"color" : "#bc7a5c", 	"textAlign" : "right",	"shadow" : true,	"lineHeight" : 14,	"maxWidth" : 50 }, 
	"PASSIVE_MULTIPLAYER_LIST_PREV"		: { "x" : 15,		"y" : 660+22, 	"font" : "18px 'Caveat Brush', cursive", 	"color" : "#bc7a5c", 	"textAlign" : "left",	"shadow" : true,	"lineHeight" : 14,	"maxWidth" : 100 }, 
	"PASSIVE_MULTIPLAYER_LIST_PREV_SCORE"	: { "x" : 160,		"y" : 660+22, 	"font" : "18px 'Caveat Brush', cursive", 	"color" : "#bc7a5c", 	"textAlign" : "right",	"shadow" : true,	"lineHeight" : 14,	"maxWidth" : 50 }, 


	// *** Spelling word
	"VOICE"			: { "x" : 30,		"y" : 130,	"width" : 85,	"height" : 78  },	
	"VOICE_SENTENCE"	: { "x" : 30,		"y" : 220,	"width" : 85,	"height" : 78  },
	"WORD"			: { "x" : 180,		"y" : 160,	"interval" : 114  },
	
	
	// *** Highscore	
	"HIGHSCORE_AREA"	: { "x" : game["width"]/2 - 400,		"y" : 20, 	"width" : 795, 		"height" : 670,		"font" : "28px 'Caveat Brush', cursive", 	"color" : "#21170e",  	"textAlign" : "center" },
	"HIGHSCORE_POSITIONS"	: { "x" : game["width"]/2 - 400 + 190,		"y" : 80,	"paddingLeft" : -125, 	"paddingTop" : -11,	"font" : "28px 'Caveat Brush', cursive", 	"color" : "#21170e", 	"colorAlt" : "#fdd086", 	"textAlign" : "right" },
	"HIGHSCORE_NAMES"	: { "x" : game["width"]/2 - 400 + 210,		"y" : 80,							"font" : "28px 'Caveat Brush', cursive", 	"color" : "#21170e", 	"colorAlt" : "#fdd086", 	"textAlign" : "left" },
	"HIGHSCORE_SCORES"	: { "x" : game["width"]/2 - 400 + 630,		"y" : 80,							"font" : "28px 'Caveat Brush', cursive", 	"color" : "#21170e", 	"colorAlt" : "#fdd086", 	"textAlign" : "right" },
	"HIGHSCORE_TEXT_SCORE"	: { "x" : game["width"]/2 - 400 + 866,		"y" : 300,	"font" : "32px 'Caveat Brush', cursive",	"color" : "#fffabc",	"textAlign" : "center" },
	"HIGHSCORE_TEXT_POS"	: { "x" : game["width"]/2 - 400 + 866,		"y" : 300 + 46,	"font" : "32px 'Caveat Brush', cursive",	"color" : "#fffabc",	"textAlign" : "center" },
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

	"CASTLE" : { "category" : "castles", "map" : true, "clickareaX" : -70, "clickareaY" : -61, "clickareaWidth" : 139, "clickareaHeight" : 61, "manifest" : "castle_static", "width" : 192, "height" : 294, "aniFrame" : 0, "aniFrameCount" : 0, "status" : "WALK_OUT", 

		"hp" : 250, "hpMax" : 250, "hpDecreaseAni" : 0,
	
		"shootDistance" : 250,
		
		"upgrade1" : 1, "upgrade2" : 1, "upgrade3" : 1, "upgrade4" : 1, "mapUpgradeExtraY" : -45,
		
		"upgrade" : {
		
			1 : { 	1 : { "icon" : "icon_hero", "upgradeLevel" : 0, "resource" : 1, "price" : 2000, "reward" : "ADD_HERO", "rewardAmount" : 25, "description" : "Extra held\n+~VAL~ exta held", },
				2 : { "icon" : "icon_hero", "upgradeLevel" : 0, "resource" : 1, "price" : 2000, "reward" : "ADD_HERO", "rewardAmount" : 35, "description" : "Extra held\n+~VAL~ exta held", },
				3 : { "icon" : "icon_hero", "upgradeLevel" : 0, "resource" : 1, "price" : 2000, "reward" : "ADD_HERO", "rewardAmount" : 35, "description" : "Extra held\n+~VAL~ exta held", },
			},	
	
			2 : { 	1 : { "icon" : "icon_archer", "upgradeLevel" : 0, "resource" : 1, "price" : 100, "reward" : "ADD_ARCHER_CASTLE", "rewardAmount" : 1, "description" : "Extra pijl- en boog\nschutter", },
				2 : { "icon" : "icon_archer", "upgradeLevel" : 0, "resource" : 1, "price" : 150, "reward" : "ADD_ARCHER_CASTLE", "rewardAmount" : 1, "description" : "Extra pijl- en boog\nschutter", },
				3 : { "icon" : "icon_archer", "upgradeLevel" : 1, "resource" : 1, "price" : 250, "reward" : "ADD_ARCHER_CASTLE", "rewardAmount" : 1, "description" : "Extra pijl- en boog\nschutter", },
				4 : { "icon" : "icon_archer", "upgradeLevel" : 1, "resource" : 1, "price" : 350, "reward" : "ADD_ARCHER_CASTLE", "rewardAmount" : 1, "description" : "Extra pijl- en boog\nschutter", },
			},	
	
			3 : { 	1 : { "icon" : "icon_upgrade", "upgradeLevel" : 0, "resource" : 4, "price" : 1, "reward" : "INCREASE_UPGRADE_LEVEL", "rewardAmount" : 1, "description" : "Torens en held\nhoger upgraden", },
				2 : { "icon" : "icon_upgrade", "upgradeLevel" : 0, "resource" : 4, "price" : 1, "reward" : "INCREASE_UPGRADE_LEVEL", "rewardAmount" : 1, "description" : "Torens en held\nhoger upgraden", },
				3 : { "icon" : "icon_upgrade", "upgradeLevel" : 0, "resource" : 4, "price" : 2, "reward" : "INCREASE_UPGRADE_LEVEL", "rewardAmount" : 1, "description" : "Torens en held\nhoger upgraden", },
				4 : { "icon" : "icon_upgrade", "upgradeLevel" : 0, "resource" : 4, "price" : 3, "reward" : "INCREASE_UPGRADE_LEVEL", "rewardAmount" : 1, "description" : "Torens en held\nhoger upgraden", },
			},	
	
			4 : { 	1 : { "icon" : "icon_research", "upgradeLevel" : 0, "resource" : 4, "price" : 1, "reward" : "INCREASE_RESEARCH_LEVEL", "rewardAmount" : 1, "description" : "Onderzoek\nnieuwe torens", },
				2 : { "icon" : "icon_research", "upgradeLevel" : 0, "resource" : 4, "price" : 2, "reward" : "INCREASE_RESEARCH_LEVEL", "rewardAmount" : 1, "description" : "Onderzoek\nnieuwe torens", },
			},	
		},
			
	},
	
	"HERO" : { "category" : "heroes",  "map" : true, "clickareaX" : -24, "clickareaY" : -53,  "clickareaWidth" : 54,  "clickareaHeight" : 57,  "manifest" : "hero_static",   "width" : 60,  "height" : 106, "xDest" : 0, "yDest" : 0, "aniFrame" : 0, "aniFrameCount" : 0, "status" : "", 
	
		"shot" : 1, "shootXspeed" : 0, "shootYspeed" : 0, "shootDistance" : 250, "shootStartY" : -31,
	
		"hp" : 100, "hpMax" : 100, "hpDecreaseAni" : 0,
		"damage" : 7, "damageBurn" : 0,
		"speed" : 4, 
		"lightningChance" : 0,
	
		"upgrade1" : 1, "upgrade2" : 1, "upgrade3" : 1, "upgrade4" : 1, "mapUpgradeExtraY" : -20,
		
		"upgrade" : {
		
			1 : { 	1 : { "icon" : "icon_heart", "upgradeLevel" : 0, "resource" : 1, "price" : 25, "reward" : "GAIN_HEALTH", "rewardAmount" : 25, "description" : "Gezondheid verhogen\n+~VAL~ leven", },
				2 : { "icon" : "icon_heart", "upgradeLevel" : 0, "resource" : 1, "price" : 50, "reward" : "GAIN_HEALTH", "rewardAmount" : 35, "description" : "Gezondheid verhogen\n+~VAL~ leven", },
				3 : { "icon" : "icon_heart", "upgradeLevel" : 0, "resource" : 1, "price" : 75, "reward" : "GAIN_HEALTH", "rewardAmount" : 45, "description" : "Gezondheid verhogen\n+~VAL~ leven", },
				4 : { "icon" : "icon_heart", "upgradeLevel" : 0, "resource" : 1, "price" : 100, "reward" : "GAIN_HEALTH", "rewardAmount" : 55, "description" : "Gezondheid verhogen\n+~VAL~ leven", },
				5 : { "icon" : "icon_heart", "upgradeLevel" : 0, "resource" : 1, "price" : 125, "reward" : "GAIN_HEALTH", "rewardAmount" : 65, "description" : "Gezondheid verhogen\n+~VAL~ leven", },
			},	
	
			2 : { 	1 : { "icon" : "icon_damage", "upgradeLevel" : 0, "resource" : 1, "price" : 75,  "reward" : "GAIN_DAMAGE", "rewardAmount" : 3, "description" : "Kracht verhogen\n+~VAL~ kracht", },
				2 : { "icon" : "icon_damage", "upgradeLevel" : 1, "resource" : 1, "price" : 125, "reward" : "GAIN_DAMAGE", "rewardAmount" : 3, "description" : "Kracht verhogen\n+~VAL~ kracht", },
				3 : { "icon" : "icon_damage", "upgradeLevel" : 2, "resource" : 1, "price" : 175, "reward" : "GAIN_DAMAGE", "rewardAmount" : 3, "description" : "Kracht verhogen\n+~VAL~ kracht", },
				4 : { "icon" : "icon_damage", "upgradeLevel" : 3, "resource" : 1, "price" : 225, "reward" : "GAIN_DAMAGE", "rewardAmount" : 3, "description" : "Kracht verhogen\n+~VAL~ kracht", },
				5 : { "icon" : "icon_damage", "upgradeLevel" : 4, "resource" : 1, "price" : 275, "reward" : "GAIN_DAMAGE", "rewardAmount" : 3, "description" : "Kracht verhogen\n+~VAL~ kracht", },
			},	
	
			3 : { 	1 : { "icon" : "icon_fire", "upgradeLevel" : 1, "resource" : 1, "price" : 350, "reward" : "GAIN_FIRE_DAMAGE", "rewardAmount" : 1.0, "description" : "Vuurpijlen\n+~VAL~ brandschade", },
				2 : { "icon" : "icon_fire", "upgradeLevel" : 2, "resource" : 1, "price" : 450, "reward" : "GAIN_FIRE_DAMAGE", "rewardAmount" : 1.5, "description" : "Vuurpijlen\n+~VAL~ brandschade", },
				3 : { "icon" : "icon_fire", "upgradeLevel" : 2, "resource" : 1, "price" : 550, "reward" : "GAIN_FIRE_DAMAGE", "rewardAmount" : 2.0, "description" : "Vuurpijlen\n+~VAL~ brandschade", },
				4 : { "icon" : "icon_fire", "upgradeLevel" : 3, "resource" : 1, "price" : 650, "reward" : "GAIN_FIRE_DAMAGE", "rewardAmount" : 2.5, "description" : "Vuurpijlen\n+~VAL~ brandschade", },
				5 : { "icon" : "icon_fire", "upgradeLevel" : 4, "resource" : 1, "price" : 750, "reward" : "GAIN_FIRE_DAMAGE", "rewardAmount" : 3.0, "description" : "Vuurpijlen\n+~VAL~ brandschade", },
			},	
	
			4 : { 	1 : { "icon" : "icon_lightning", "upgradeLevel" : 1, "resource" : 1, "price" : 350, "reward" : "GAIN_LIGHTNING_CHANCE", "rewardAmount" : 5, "description" : "Bliksem\n+~VAL~% kans op bliksem", },
				2 : { "icon" : "icon_lightning", "upgradeLevel" : 2, "resource" : 1, "price" : 450, "reward" : "GAIN_LIGHTNING_CHANCE", "rewardAmount" : 10, "description" : "Bliksem\n+~VAL~% kans op bliksem", },
				3 : { "icon" : "icon_lightning", "upgradeLevel" : 2, "resource" : 1, "price" : 550, "reward" : "GAIN_LIGHTNING_CHANCE", "rewardAmount" : 15, "description" : "Bliksem\n+~VAL~% kans op bliksem", },
				4 : { "icon" : "icon_lightning", "upgradeLevel" : 3, "resource" : 1, "price" : 650, "reward" : "GAIN_LIGHTNING_CHANCE", "rewardAmount" : 20, "description" : "Bliksem\n+~VAL~% kans op bliksem", },
				5 : { "icon" : "icon_lightning", "upgradeLevel" : 4, "resource" : 1, "price" : 750, "reward" : "GAIN_LIGHTNING_CHANCE", "rewardAmount" : 25, "description" : "Bliksem\n+~VAL~% kans op bliksem", },
			},	
		},	
	},

	"ARCHER" : { "category" : "archers", "map" : true, "manifest" : "archer_static", "width" : 26, "height" : 26, "aniFrame" : 0, "aniFrameCount" : 0, "status" : "", "mirrored" : false,

		"shot" : 2, "shootXspeed" : 0, "shootYspeed" : 0, "shootDistance" : 250, "shootStartY" : -12, "extraY" : -12,

		"hp" : 25, "hpMax" : 25,
		"damage" : 20, "damageBurn" : 0,
		"speed" : 12, 
			
		"relatedTo" : 0,
	},

	"ARCHER_2" : { "category" : "archers", "map" : true, "manifest" : "archer_static", "width" : 26, "height" : 26, "aniFrame" : 0, "aniFrameCount" : 0, "status" : "", "mirrored" : false,

		"shot" : 2, "shootXspeed" : 0, "shootYspeed" : 0, "shootDistance" : 250, "shootStartY" : -64, "extraY" : -64,

		"hp" : 25, "hpMax" : 25,
		"damage" : 20, "damageBurn" : 0,
		"speed" : 12, 
		
		"relatedTo" : 0, 
	},

	/* *** Pijlentoren *** */
	"TOWER_1" : { "category" : "towers", "map" : true, "towerID" : 1, "manifest" : "tower_1_static", "width" : 92, "height" : 160, "aniFrame" : 0, "aniFrameCount" : 0, "status" : "", "clickareaX" : -39, "clickareaY" : -80,  "clickareaWidth" : 75,  "clickareaHeight" : 85,
	
		"researchLevel" : 0, "shoots" : false, "shootDistance" : 250,
		
		"hp" : 175, "hpMax" : 175, "hpDecreaseAni" : 0,
		"damage" : 3, "damageBurn" : 0, "lightningChance" : 0,
		"speed" : 12, 	
		
		"priceResource1" : 100, "priceResource2" : 25, "priceResource3" : 0, "priceResource4" : 0,

		"upgrade1" : 1, "upgrade2" : 1, "upgrade3" : 1, "upgrade4" : 1, "mapUpgradeExtraY" : -35,
		
		"upgrade" : {
		
			1 : { 	1 : { "icon" : "icon_heart", "upgradeLevel" : 0, "resource" : 1, "price" : 50, "reward" : "GAIN_HEALTH", "rewardAmount" : 25, "description" : "Gezondheid verhogen\n+~VAL~ leven", },
				2 : { "icon" : "icon_heart", "upgradeLevel" : 0, "resource" : 1, "price" : 75, "reward" : "GAIN_HEALTH", "rewardAmount" : 35, "description" : "Gezondheid verhogen\n+~VAL~ leven", },
				3 : { "icon" : "icon_heart", "upgradeLevel" : 0, "resource" : 1, "price" : 100, "reward" : "GAIN_HEALTH", "rewardAmount" : 45, "description" : "Gezondheid verhogen\n+~VAL~ leven", },
				4 : { "icon" : "icon_heart", "upgradeLevel" : 0, "resource" : 1, "price" : 125, "reward" : "GAIN_HEALTH", "rewardAmount" : 55, "description" : "Gezondheid verhogen\n+~VAL~ leven", },
				5 : { "icon" : "icon_heart", "upgradeLevel" : 0, "resource" : 1, "price" : 150, "reward" : "GAIN_HEALTH", "rewardAmount" : 65, "description" : "Gezondheid verhogen\n+~VAL~ leven", },
			},	
	
			2 : { 	1 : { "icon" : "icon_damage", "upgradeLevel" : 0, "resource" : 1, "price" : 100, "reward" : "GAIN_ARCHER_DAMAGE", "rewardAmount" : 12, "description" : "Kracht verhogen\nTotaal ~VAL~ kracht", },
				2 : { "icon" : "icon_damage", "upgradeLevel" : 1, "resource" : 1, "price" : 150, "reward" : "GAIN_ARCHER_DAMAGE", "rewardAmount" : 16, "description" : "Kracht verhogen\nTotaal ~VAL~ kracht", },
				3 : { "icon" : "icon_damage", "upgradeLevel" : 2, "resource" : 1, "price" : 250, "reward" : "GAIN_ARCHER_DAMAGE", "rewardAmount" : 20, "description" : "Kracht verhogen\nTotaal ~VAL~ kracht", },
				4 : { "icon" : "icon_damage", "upgradeLevel" : 3, "resource" : 1, "price" : 350, "reward" : "GAIN_ARCHER_DAMAGE", "rewardAmount" : 24, "description" : "Kracht verhogen\nTotaal ~VAL~ kracht", },
				5 : { "icon" : "icon_damage", "upgradeLevel" : 4, "resource" : 1, "price" : 450, "reward" : "GAIN_ARCHER_DAMAGE", "rewardAmount" : 28, "description" : "Kracht verhogen\nTotaal ~VAL~ kracht", },
			},	
	
			3 : { 	1 : { "icon" : "icon_archer", "upgradeLevel" : 0, "resource" : 1, "price" : 200, "reward" : "ADD_ARCHER_TOWER", "rewardAmount" : 5, "description" : "Extra pijl- en boog\nschutter", },
				2 : { "icon" : "icon_archer", "upgradeLevel" : 1, "resource" : 1, "price" : 300, "reward" : "ADD_ARCHER_TOWER", "rewardAmount" : 8, "description" : "Extra pijl- en boog\nschutter", },
			},	
	
			4 : { 	1 : { "icon" : "icon_hourglass", "upgradeLevel" : 0, "resource" : 1, "price" : 350, "reward" : "GAIN_ARCHER_SHOOT_SPEED", "rewardAmount" : 9, "description" : "Schietsnelheid\n+25% sneller", },
				2 : { "icon" : "icon_hourglass", "upgradeLevel" : 1, "resource" : 1, "price" : 400, "reward" : "GAIN_ARCHER_SHOOT_SPEED", "rewardAmount" : 6, "description" : "Schietsnelheid\n+25% sneller", },
				3 : { "icon" : "icon_hourglass", "upgradeLevel" : 2, "resource" : 1, "price" : 450, "reward" : "GAIN_ARCHER_SHOOT_SPEED", "rewardAmount" : 3, "description" : "Schietsnelheid\n+25% sneller", },
			},	
		},		
	},

	/* *** Catapult *** */
	"TOWER_2" : { "category" : "towers", "map" : true, "towerID" : 2, "manifest" : "tower_2_static", "width" : 110, "height" : 242, "aniFrame" : 0, "aniFrameCount" : 0, "status" : "", "clickareaX" : -24, "clickareaY" : -53,  "clickareaWidth" : 54,  "clickareaHeight" : 57,
	
		"researchLevel" : 0, 
		"shootXspeed" : 0, "shootYspeed" : 0, "shootDistance" : 300, "shootStartY" : -16, "extraY" : -16, "shoots" : true, "shootsAniFrames" : 9, "shootsOnFrame" : 1, "shot" : 3, "shotSplashRadius" : 100,

		"hp" : 400, "hpMax" : 400, "hpDecreaseAni" : 0,
		"damage" : 5, "damageBurn" : 1, "lightningChance" : 0,
		"speed" : 40, 
	
		"priceResource1" : 300, "priceResource2" : 0, "priceResource3" : 35, "priceResource4" : 0,

		"upgrade1" : 1, "upgrade2" : 1, "upgrade3" : 1, "upgrade4" : 1, "mapUpgradeExtraY" : -35,
		
		"upgrade" : {
		
			1 : { 	1 : { "icon" : "icon_heart", "upgradeLevel" : 0, "resource" : 1, "price" : 50, "reward" : "GAIN_HEALTH", "rewardAmount" : 25, "description" : "Gezondheid verhogen\n+~VAL~ leven", },
				2 : { "icon" : "icon_heart", "upgradeLevel" : 0, "resource" : 1, "price" : 75, "reward" : "GAIN_HEALTH", "rewardAmount" : 35, "description" : "Gezondheid verhogen\n+~VAL~ leven", },
				3 : { "icon" : "icon_heart", "upgradeLevel" : 0, "resource" : 1, "price" : 100, "reward" : "GAIN_HEALTH", "rewardAmount" : 45, "description" : "Gezondheid verhogen\n+~VAL~ leven", },
				4 : { "icon" : "icon_heart", "upgradeLevel" : 0, "resource" : 1, "price" : 125, "reward" : "GAIN_HEALTH", "rewardAmount" : 55, "description" : "Gezondheid verhogen\n+~VAL~ leven", },
				5 : { "icon" : "icon_heart", "upgradeLevel" : 0, "resource" : 1, "price" : 150, "reward" : "GAIN_HEALTH", "rewardAmount" : 65, "description" : "Gezondheid verhogen\n+~VAL~ leven", },
			},	
		
			2 : { 	1 : { "icon" : "icon_damage", "upgradeLevel" : 0, "resource" : 1, "price" : 100, "reward" : "GAIN_DAMAGE", "rewardAmount" : 5, "description" : "Kracht verhogen\n+~VAL~ kracht", },
				2 : { "icon" : "icon_damage", "upgradeLevel" : 1, "resource" : 1, "price" : 150, "reward" : "GAIN_DAMAGE", "rewardAmount" : 5, "description" : "Kracht verhogen\n+~VAL~ kracht", },
				3 : { "icon" : "icon_damage", "upgradeLevel" : 2, "resource" : 1, "price" : 200, "reward" : "GAIN_DAMAGE", "rewardAmount" : 5, "description" : "Kracht verhogen\n+~VAL~ kracht", },
				4 : { "icon" : "icon_damage", "upgradeLevel" : 3, "resource" : 1, "price" : 250, "reward" : "GAIN_DAMAGE", "rewardAmount" : 5, "description" : "Kracht verhogen\n+~VAL~ kracht", },
				5 : { "icon" : "icon_damage", "upgradeLevel" : 4, "resource" : 1, "price" : 300, "reward" : "GAIN_DAMAGE", "rewardAmount" : 5, "description" : "Kracht verhogen\n+~VAL~ kracht", },
			},	
	
			3 : { 	1 : { "icon" : "icon_fire", "upgradeLevel" : 0, "resource" : 1, "price" : 200, "reward" : "GAIN_FIRE_DAMAGE", "rewardAmount" : 1, "description" : "Vuurpijlen\n+~VAL~ brandschade", },
				2 : { "icon" : "icon_fire", "upgradeLevel" : 0, "resource" : 1, "price" : 250, "reward" : "GAIN_FIRE_DAMAGE", "rewardAmount" : 1, "description" : "Vuurpijlen\n+~VAL~ brandschade", },
				3 : { "icon" : "icon_fire", "upgradeLevel" : 1, "resource" : 1, "price" : 300, "reward" : "GAIN_FIRE_DAMAGE", "rewardAmount" : 1, "description" : "Vuurpijlen\n+~VAL~ brandschade", },
				4 : { "icon" : "icon_fire", "upgradeLevel" : 2, "resource" : 1, "price" : 350, "reward" : "GAIN_FIRE_DAMAGE", "rewardAmount" : 1, "description" : "Vuurpijlen\n+~VAL~ brandschade", },
				5 : { "icon" : "icon_fire", "upgradeLevel" : 3, "resource" : 1, "price" : 400, "reward" : "GAIN_FIRE_DAMAGE", "rewardAmount" : 1, "description" : "Vuurpijlen\n+~VAL~ brandschade", },
			},	
	
			4 : { 	1 : { "icon" : "icon_radius", "upgradeLevel" : 0, "resource" : 1, "price" : 300, "reward" : "GAIN_SPLASH_RADIUS", "rewardAmount" : 10, "description" : "Vergroot brandgebied\n+~VAL~ brand radius", },
				2 : { "icon" : "icon_radius", "upgradeLevel" : 1, "resource" : 1, "price" : 400, "reward" : "GAIN_SPLASH_RADIUS", "rewardAmount" : 10, "description" : "Vergroot brandgebied\n+~VAL~ brand radius", },
				3 : { "icon" : "icon_radius", "upgradeLevel" : 2, "resource" : 1, "price" : 500, "reward" : "GAIN_SPLASH_RADIUS", "rewardAmount" : 10, "description" : "Vergroot brandgebied\n+~VAL~ brand radius", },
				4 : { "icon" : "icon_radius", "upgradeLevel" : 3, "resource" : 1, "price" : 600, "reward" : "GAIN_SPLASH_RADIUS", "rewardAmount" : 10, "description" : "Vergroot brandgebied\n+~VAL~ brand radius", },
				5 : { "icon" : "icon_radius", "upgradeLevel" : 4, "resource" : 1, "price" : 700, "reward" : "GAIN_SPLASH_RADIUS", "rewardAmount" : 10, "description" : "Vergroot brandgebied\n+~VAL~ brand radius", },
			},	
		},		
	},

	/* *** Balista *** */
	"TOWER_3" : { "category" : "towers", "map" : true, "towerID" : 3, "manifest" : "tower_3_static", "width" : 76, "height" : 150, "aniFrame" : 0, "aniFrameCount" : 0, "status" : "", "clickareaX" : -31, "clickareaY" : -75,  "clickareaWidth" : 62,  "clickareaHeight" : 78,
	
		"researchLevel" : 1, 
		"shootXspeed" : 0, "shootYspeed" : 0, "shootDistance" : 400, "shootStartY" : 0, "extraY" : 0, "shoots" : true, "shootsAniFrames" : 13, "shootsOnFrame" : 6, "shot" : 4,
		"targets" : "MOST_HP", 
		
		"hp" : 225, "hpMax" : 225, "hpDecreaseAni" : 0,
		"damage" : 30, "damageBurn" : 0, "lightningChance" : 0,
		"speed" : 40, 
	
		"priceResource1" : 400, "priceResource2" : 50, "priceResource3" : 20, "priceResource4" : 0,

		"upgrade1" : 1, "upgrade2" : 1, "upgrade3" : 1, "upgrade4" : 1, "mapUpgradeExtraY" : -35,
		
		"upgrade" : {
		
			1 : { 	1 : { "icon" : "icon_heart", "upgradeLevel" : 0, "resource" : 1, "price" : 50, "reward" : "GAIN_HEALTH", "rewardAmount" : 25, "description" : "Gezondheid verhogen\n+~VAL~ leven", },
				2 : { "icon" : "icon_heart", "upgradeLevel" : 0, "resource" : 1, "price" : 75, "reward" : "GAIN_HEALTH", "rewardAmount" : 35, "description" : "Gezondheid verhogen\n+~VAL~ leven", },
				3 : { "icon" : "icon_heart", "upgradeLevel" : 0, "resource" : 1, "price" : 100, "reward" : "GAIN_HEALTH", "rewardAmount" : 45, "description" : "Gezondheid verhogen\n+~VAL~ leven", },
				4 : { "icon" : "icon_heart", "upgradeLevel" : 0, "resource" : 1, "price" : 125, "reward" : "GAIN_HEALTH", "rewardAmount" : 55, "description" : "Gezondheid verhogen\n+~VAL~ leven", },
				5 : { "icon" : "icon_heart", "upgradeLevel" : 0, "resource" : 1, "price" : 150, "reward" : "GAIN_HEALTH", "rewardAmount" : 65, "description" : "Gezondheid verhogen\n+~VAL~ leven", },
			},	
		
			2 : { 	1 : { "icon" : "icon_damage", "upgradeLevel" : 0, "resource" : 1, "price" : 100, "reward" : "GAIN_DAMAGE", "rewardAmount" : 10, "description" : "Kracht verhogen\n+~VAL~ kracht", },
				2 : { "icon" : "icon_damage", "upgradeLevel" : 1, "resource" : 1, "price" : 150, "reward" : "GAIN_DAMAGE", "rewardAmount" : 10, "description" : "Kracht verhogen\n+~VAL~ kracht", },
				3 : { "icon" : "icon_damage", "upgradeLevel" : 2, "resource" : 1, "price" : 200, "reward" : "GAIN_DAMAGE", "rewardAmount" : 10, "description" : "Kracht verhogen\n+~VAL~ kracht", },
				4 : { "icon" : "icon_damage", "upgradeLevel" : 3, "resource" : 1, "price" : 250, "reward" : "GAIN_DAMAGE", "rewardAmount" : 10, "description" : "Kracht verhogen\n+~VAL~ kracht", },
				5 : { "icon" : "icon_damage", "upgradeLevel" : 4, "resource" : 1, "price" : 300, "reward" : "GAIN_DAMAGE", "rewardAmount" : 10, "description" : "Kracht verhogen\n+~VAL~ kracht", },
			},	
			
			3 : { 	1 : { "icon" : "icon_lightning", "upgradeLevel" : 0, "resource" : 1, "price" : 400, "reward" : "GAIN_LIGHTNING_CHANCE", "rewardAmount" : 5, "description" : "Bliksem\n+~VAL~% kans op bliksem", },
				2 : { "icon" : "icon_lightning", "upgradeLevel" : 1, "resource" : 1, "price" : 450, "reward" : "GAIN_LIGHTNING_CHANCE", "rewardAmount" : 10, "description" : "Bliksem\n+~VAL~% kans op bliksem", },
				3 : { "icon" : "icon_lightning", "upgradeLevel" : 2, "resource" : 1, "price" : 500, "reward" : "GAIN_LIGHTNING_CHANCE", "rewardAmount" : 15, "description" : "Bliksem\n+~VAL~% kans op bliksem", },
				4 : { "icon" : "icon_lightning", "upgradeLevel" : 2, "resource" : 1, "price" : 550, "reward" : "GAIN_LIGHTNING_CHANCE", "rewardAmount" : 20, "description" : "Bliksem\n+~VAL~% kans op bliksem", },
				5 : { "icon" : "icon_lightning", "upgradeLevel" : 2, "resource" : 1, "price" : 600, "reward" : "GAIN_LIGHTNING_CHANCE", "rewardAmount" : 25, "description" : "Bliksem\n+~VAL~% kans op bliksem", },
			},	
			
			4 : { 	1 : { "icon" : "icon_hourglass", "upgradeLevel" : 0, "resource" : 1, "price" : 500, "reward" : "GAIN_SHOOT_SPEED", "rewardAmount" : 30, "description" : "Schietsnelheid\n+25% sneller", },
				2 : { "icon" : "icon_hourglass", "upgradeLevel" : 1, "resource" : 1, "price" : 650, "reward" : "GAIN_SHOOT_SPEED", "rewardAmount" : 20, "description" : "Schietsnelheid\n+25% sneller", },
				3 : { "icon" : "icon_hourglass", "upgradeLevel" : 2, "resource" : 1, "price" : 750, "reward" : "GAIN_SHOOT_SPEED", "rewardAmount" : 10, "description" : "Schietsnelheid\n+25% sneller", },
			},				
		},		
	},

	/* *** Versterker *** */
	"TOWER_4" : { "category" : "towers", "map" : true, "towerID" : 4, "manifest" : "tower_4_static", "width" : 50, "height" : 88, "aniFrame" : 0, "aniFrameCount" : 0, "status" : "", "clickareaX" : -23, "clickareaY" : -41,  "clickareaWidth" : 46,  "clickareaHeight" : 43,
	
		"researchLevel" : 1, 
		"shootXspeed" : 0, "shootYspeed" : 0, "shootDistance" : 200, "shootStartY" : 0, "extraY" : 0, "shoots" : false, "shootsAniFrames" : 13, "shootsOnFrame" : 6, "shot" : 4,
		"targets" : "", 
		
		"hp" : 200, "hpMax" : 200, "hpDecreaseAni" : 0,
		"damage" : 0.1, "damageBurn" : 0, "lightningChance" : 0,
		"speed" : 40, 
	
		"priceResource1" : 450, "priceResource2" : 35, "priceResource3" : 15, "priceResource4" : 0,

		"upgrade1" : 1, "upgrade2" : 1, "upgrade3" : 1, "upgrade4" : 1, "mapUpgradeExtraY" : -20,
		
		"upgrade" : {
		
			1 : { 	1 : { "icon" : "icon_heart", "upgradeLevel" : 0, "resource" : 1, "price" : 50, "reward" : "GAIN_HEALTH", "rewardAmount" : 25, "description" : "Gezondheid verhogen\n+~VAL~ leven", },
				2 : { "icon" : "icon_heart", "upgradeLevel" : 0, "resource" : 1, "price" : 75, "reward" : "GAIN_HEALTH", "rewardAmount" : 35, "description" : "Gezondheid verhogen\n+~VAL~ leven", },
				3 : { "icon" : "icon_heart", "upgradeLevel" : 0, "resource" : 1, "price" : 100, "reward" : "GAIN_HEALTH", "rewardAmount" : 45, "description" : "Gezondheid verhogen\n+~VAL~ leven", },
				4 : { "icon" : "icon_heart", "upgradeLevel" : 0, "resource" : 1, "price" : 125, "reward" : "GAIN_HEALTH", "rewardAmount" : 55, "description" : "Gezondheid verhogen\n+~VAL~ leven", },
				5 : { "icon" : "icon_heart", "upgradeLevel" : 0, "resource" : 1, "price" : 150, "reward" : "GAIN_HEALTH", "rewardAmount" : 65, "description" : "Gezondheid verhogen\n+~VAL~ leven", },
			},	
		
			2 : { 	1 : { "icon" : "icon_enhancement", "upgradeLevel" : 0, "resource" : 1, "price" : 100, "reward" : "GAIN_DAMAGE", "rewardAmount" : 0.1, "description" : "Versterking verhogen\n+~VAL~ versterking", },
				2 : { "icon" : "icon_enhancement", "upgradeLevel" : 1, "resource" : 1, "price" : 150, "reward" : "GAIN_DAMAGE", "rewardAmount" : 0.1, "description" : "Versterking verhogen\n+~VAL~ versterking", },
				3 : { "icon" : "icon_enhancement", "upgradeLevel" : 1, "resource" : 1, "price" : 150, "reward" : "GAIN_DAMAGE", "rewardAmount" : 0.1, "description" : "Versterking verhogen\n+~VAL~ versterking", },
				4 : { "icon" : "icon_enhancement", "upgradeLevel" : 1, "resource" : 1, "price" : 150, "reward" : "GAIN_DAMAGE", "rewardAmount" : 0.1, "description" : "Versterking verhogen\n+~VAL~ versterking", },
				5 : { "icon" : "icon_enhancement", "upgradeLevel" : 1, "resource" : 1, "price" : 150, "reward" : "GAIN_DAMAGE", "rewardAmount" : 0.1, "description" : "Versterking verhogen\n+~VAL~ versterking", },
			},	
	
			3 : { 	1 : { "icon" : "icon_radius", "upgradeLevel" : 0, "resource" : 1, "price" : 250, "reward" : "GAIN_SHOOT_DISTANCE", "rewardAmount" : 50, "description" : "Vergroot invloedsgebied\n+~VAL~ groter", },
				2 : { "icon" : "icon_radius", "upgradeLevel" : 1, "resource" : 1, "price" : 350, "reward" : "GAIN_SHOOT_DISTANCE", "rewardAmount" : 50, "description" : "Vergroot invloedsgebied\n+~VAL~ groter", },
				3 : { "icon" : "icon_radius", "upgradeLevel" : 2, "resource" : 1, "price" : 450, "reward" : "GAIN_SHOOT_DISTANCE", "rewardAmount" : 50, "description" : "Vergroot invloedsgebied\n+~VAL~ groter", },
				4 : { "icon" : "icon_radius", "upgradeLevel" : 2, "resource" : 1, "price" : 550, "reward" : "GAIN_SHOOT_DISTANCE", "rewardAmount" : 50, "description" : "Vergroot invloedsgebied\n+~VAL~ groter", },
				5 : { "icon" : "icon_radius", "upgradeLevel" : 3, "resource" : 1, "price" : 650, "reward" : "GAIN_SHOOT_DISTANCE", "rewardAmount" : 50, "description" : "Vergroot invloedsgebied\n+~VAL~ groter", },
			},	
	
			4 : { },	
		},		
	},
	
	/* *** Genezer *** */
	"TOWER_5" : { "category" : "towers", "map" : true, "towerID" : 5, "manifest" : "tower_5_static", "width" : 50, "height" : 88, "aniFrame" : 0, "aniFrameCount" : 0, "status" : "", "clickareaX" : -23, "clickareaY" : -41,  "clickareaWidth" : 46,  "clickareaHeight" : 43,
	
		"researchLevel" : 1, 
		"shootXspeed" : 0, "shootYspeed" : 0, "shootDistance" : 200, "shootStartY" : 0, "extraY" : 0, "shoots" : false, "shootsAniFrames" : 13, "shootsOnFrame" : 6, "shot" : 4,
		"targets" : "", 
		
		"hp" : 250, "hpMax" : 250, "hpDecreaseAni" : 0,
		"damage" : 1, "damageBurn" : 0, "lightningChance" : 0,
		"speed" : 40, 
	
		"priceResource1" : 450, "priceResource2" : 15, "priceResource3" : 35, "priceResource4" : 0,

		"upgrade1" : 1, "upgrade2" : 1, "upgrade3" : 1, "upgrade4" : 1, "mapUpgradeExtraY" : -20,
		
		"upgrade" : {
		
			1 : { 	1 : { "icon" : "icon_heart", "upgradeLevel" : 0, "resource" : 1, "price" : 50, "reward" : "GAIN_HEALTH", "rewardAmount" : 25, "description" : "Gezondheid verhogen\n+~VAL~ leven", },
				2 : { "icon" : "icon_heart", "upgradeLevel" : 0, "resource" : 1, "price" : 75, "reward" : "GAIN_HEALTH", "rewardAmount" : 35, "description" : "Gezondheid verhogen\n+~VAL~ leven", },
				3 : { "icon" : "icon_heart", "upgradeLevel" : 0, "resource" : 1, "price" : 100, "reward" : "GAIN_HEALTH", "rewardAmount" : 45, "description" : "Gezondheid verhogen\n+~VAL~ leven", },
				4 : { "icon" : "icon_heart", "upgradeLevel" : 0, "resource" : 1, "price" : 125, "reward" : "GAIN_HEALTH", "rewardAmount" : 55, "description" : "Gezondheid verhogen\n+~VAL~ leven", },
				5 : { "icon" : "icon_heart", "upgradeLevel" : 0, "resource" : 1, "price" : 150, "reward" : "GAIN_HEALTH", "rewardAmount" : 65, "description" : "Gezondheid verhogen\n+~VAL~ leven", },
			},	
		
			2 : { 	1 : { "icon" : "icon_enhancement", "upgradeLevel" : 0, "resource" : 1, "price" : 100, "reward" : "GAIN_DAMAGE", "rewardAmount" : 1, "description" : "Versterking verhogen\n+~VAL~ versterking", },
				2 : { "icon" : "icon_enhancement", "upgradeLevel" : 1, "resource" : 1, "price" : 150, "reward" : "GAIN_DAMAGE", "rewardAmount" : 1, "description" : "Versterking verhogen\n+~VAL~ versterking", },
				3 : { "icon" : "icon_enhancement", "upgradeLevel" : 1, "resource" : 1, "price" : 150, "reward" : "GAIN_DAMAGE", "rewardAmount" : 1, "description" : "Versterking verhogen\n+~VAL~ versterking", },
				4 : { "icon" : "icon_enhancement", "upgradeLevel" : 1, "resource" : 1, "price" : 150, "reward" : "GAIN_DAMAGE", "rewardAmount" : 1, "description" : "Versterking verhogen\n+~VAL~ versterking", },
				5 : { "icon" : "icon_enhancement", "upgradeLevel" : 1, "resource" : 1, "price" : 150, "reward" : "GAIN_DAMAGE", "rewardAmount" : 1, "description" : "Versterking verhogen\n+~VAL~ versterking", },
			},	
	
			3 : { 	1 : { "icon" : "icon_radius", "upgradeLevel" : 0, "resource" : 1, "price" : 250, "reward" : "GAIN_SHOOT_DISTANCE", "rewardAmount" : 50, "description" : "Vergroot invloedsgebied\n+~VAL~ groter", },
				2 : { "icon" : "icon_radius", "upgradeLevel" : 1, "resource" : 1, "price" : 350, "reward" : "GAIN_SHOOT_DISTANCE", "rewardAmount" : 50, "description" : "Vergroot invloedsgebied\n+~VAL~ groter", },
				3 : { "icon" : "icon_radius", "upgradeLevel" : 2, "resource" : 1, "price" : 450, "reward" : "GAIN_SHOOT_DISTANCE", "rewardAmount" : 50, "description" : "Vergroot invloedsgebied\n+~VAL~ groter", },
				4 : { "icon" : "icon_radius", "upgradeLevel" : 2, "resource" : 1, "price" : 550, "reward" : "GAIN_SHOOT_DISTANCE", "rewardAmount" : 50, "description" : "Vergroot invloedsgebied\n+~VAL~ groter", },
				5 : { "icon" : "icon_radius", "upgradeLevel" : 3, "resource" : 1, "price" : 650, "reward" : "GAIN_SHOOT_DISTANCE", "rewardAmount" : 50, "description" : "Vergroot invloedsgebied\n+~VAL~ groter", },
			},	
	
			4 : { },	
		},		
	},

	/* *** Manatoren *** */
	"TOWER_6" : { "category" : "towers", "map" : true, "towerID" : 6, "manifest" : "tower_6_static", "width" : 108, "height" : 228, "aniFrame" : 0, "aniFrameCount" : 0, "status" : "", "clickareaX" : -47, "clickareaY" : -113,  "clickareaWidth" : 93,  "clickareaHeight" : 116,
	
		"researchLevel" : 2, 
		"shootXspeed" : 0, "shootYspeed" : 0, "shootDistance" : 350, "shootStartY" : -105, "extraY" : -105, "shoots" : true, "shootsAniFrames" : 4, "shootsOnFrame" : 4, "shot" : 5, "shotSplashRadius" : 100,
		"targets" : "", 
		
		"hp" : 350, "hpMax" : 350, "hpDecreaseAni" : 0,
		"damage" : 10, "damageShotBurn" : 5, "damageShotCold" : 90, "lightningChance" : 0,
		"speed" : 40, 
	
		"chanceShot5" : 25, 
		"chanceShot6" : 25, 
		"chanceShot7" : 25,
		
		"priceResource1" : 650, "priceResource2" : 0, "priceResource3" : 65, "priceResource4" : 0,

		"upgrade1" : 1, "upgrade2" : 1, "upgrade3" : 1, "upgrade4" : 1, "mapUpgradeExtraY" : -45,
		
		"upgrade" : {
		
			1 : { 	1 : { "icon" : "icon_hourglass", "upgradeLevel" : 0, "resource" : 1, "price" : 500, "reward" : "GAIN_SHOOT_SPEED", "rewardAmount" : 30, "description" : "Schietsnelheid\n+25% sneller", },
				2 : { "icon" : "icon_hourglass", "upgradeLevel" : 1, "resource" : 1, "price" : 650, "reward" : "GAIN_SHOOT_SPEED", "rewardAmount" : 20, "description" : "Schietsnelheid\n+25% sneller", },
				3 : { "icon" : "icon_hourglass", "upgradeLevel" : 2, "resource" : 1, "price" : 750, "reward" : "GAIN_SHOOT_SPEED", "rewardAmount" : 10, "description" : "Schietsnelheid\n+25% sneller", },
			},				
	
	
			2 : { 	1 : { "icon" : "icon_shot_5", "upgradeLevel" : 0, "resource" : 1, "price" : 100, "reward" : "GAIN_CHANCE_SHOT_5", "rewardAmount" : 15, "description" : "Kans op bliksembal\n+~VAL~% kans", },
				2 : { "icon" : "icon_shot_5", "upgradeLevel" : 0, "resource" : 1, "price" : 100, "reward" : "GAIN_CHANCE_SHOT_5", "rewardAmount" : 15, "description" : "Kans op bliksembal\n+~VAL~% kans", },
				3 : { "icon" : "icon_shot_5", "upgradeLevel" : 0, "resource" : 1, "price" : 100, "reward" : "GAIN_CHANCE_SHOT_5", "rewardAmount" : 15, "description" : "Kans op bliksembal\n+~VAL~% kans", },
				4 : { "icon" : "icon_shot_5", "upgradeLevel" : 0, "resource" : 1, "price" : 100, "reward" : "GAIN_CHANCE_SHOT_5", "rewardAmount" : 15, "description" : "Kans op bliksembal\n+~VAL~% kans", },
				5 : { "icon" : "icon_shot_5", "upgradeLevel" : 0, "resource" : 1, "price" : 100, "reward" : "GAIN_CHANCE_SHOT_5", "rewardAmount" : 15, "description" : "Kans op bliksembal\n+~VAL~% kans", },
			},	
	
			3 : { 	1 : { "icon" : "icon_shot_6", "upgradeLevel" : 0, "resource" : 1, "price" : 100, "reward" : "GAIN_CHANCE_SHOT_6", "rewardAmount" : 15, "description" : "Kans op ijsbal\n+~VAL~% kans", },
				2 : { "icon" : "icon_shot_6", "upgradeLevel" : 0, "resource" : 1, "price" : 100, "reward" : "GAIN_CHANCE_SHOT_6", "rewardAmount" : 15, "description" : "Kans op ijsbal\n+~VAL~% kans", },
				3 : { "icon" : "icon_shot_6", "upgradeLevel" : 0, "resource" : 1, "price" : 100, "reward" : "GAIN_CHANCE_SHOT_6", "rewardAmount" : 15, "description" : "Kans op ijsbal\n+~VAL~% kans", },
				4 : { "icon" : "icon_shot_6", "upgradeLevel" : 0, "resource" : 1, "price" : 100, "reward" : "GAIN_CHANCE_SHOT_6", "rewardAmount" : 15, "description" : "Kans op ijsbal\n+~VAL~% kans", },
				5 : { "icon" : "icon_shot_6", "upgradeLevel" : 0, "resource" : 1, "price" : 100, "reward" : "GAIN_CHANCE_SHOT_6", "rewardAmount" : 15, "description" : "Kans op ijsbal\n+~VAL~% kans", },
			},	
	
			4 : { 	1 : { "icon" : "icon_shot_7", "upgradeLevel" : 0, "resource" : 1, "price" : 100, "reward" : "GAIN_CHANCE_SHOT_7", "rewardAmount" : 15, "description" : "Kans op vuurbal\n+~VAL~% kans", },
				2 : { "icon" : "icon_shot_7", "upgradeLevel" : 0, "resource" : 1, "price" : 100, "reward" : "GAIN_CHANCE_SHOT_7", "rewardAmount" : 15, "description" : "Kans op vuurbal\n+~VAL~% kans", },
				3 : { "icon" : "icon_shot_7", "upgradeLevel" : 0, "resource" : 1, "price" : 100, "reward" : "GAIN_CHANCE_SHOT_7", "rewardAmount" : 15, "description" : "Kans op vuurbal\n+~VAL~% kans", },
				4 : { "icon" : "icon_shot_7", "upgradeLevel" : 0, "resource" : 1, "price" : 100, "reward" : "GAIN_CHANCE_SHOT_7", "rewardAmount" : 15, "description" : "Kans op vuurbal\n+~VAL~% kans", },
				5 : { "icon" : "icon_shot_7", "upgradeLevel" : 0, "resource" : 1, "price" : 100, "reward" : "GAIN_CHANCE_SHOT_7", "rewardAmount" : 15, "description" : "Kans op vuurbal\n+~VAL~% kans", },
			},	
	
		},		
	},

	/* *** Obelisk *** */
	"TOWER_7" : { "category" : "towers", "map" : true, "towerID" : 7, "manifest" : "tower_7_static", "width" : 130, "height" : 252, "aniFrame" : 0, "aniFrameCount" : 0, "status" : "", "clickareaX" : -41, "clickareaY" : -66,  "clickareaWidth" : 66,  "clickareaHeight" : 76,
	
		"researchLevel" : 2, 
		"shootXspeed" : 0, "shootYspeed" : 0, "shootDistance" : 2000, "shootStartY" : -123, "extraY" : -123, "shoots" : true, "shootsAniFrames" : 12, "shootsOnFrame" : 8, "shot" : 8, "shotSound" : "sound_tower_shot_7",
		"targets" : "CLOSE_TO_HERO", 
		
		"hp" : 1000, "hpMax" : 1000, "hpDecreaseAni" : 0,
		"damage" : 30, "damageBurn" : 0, "lightningChance" : 0,
		"speed" : 40, 
	
		"priceResource1" : 1200, "priceResource2" : 0, "priceResource3" : 100, "priceResource4" : 1,

		"upgrade1" : 1, "upgrade2" : 1, "upgrade3" : 1, "upgrade4" : 1, "mapUpgradeExtraY" : -45,
		
		"upgrade" : {
		
			1 : { 	1 : { "icon" : "icon_heart", "upgradeLevel" : 0, "resource" : 1, "price" : 50, "reward" : "GAIN_HEALTH", "rewardAmount" : 25, "description" : "Gezondheid verhogen\n+~VAL~ leven", },
				2 : { "icon" : "icon_heart", "upgradeLevel" : 0, "resource" : 1, "price" : 75, "reward" : "GAIN_HEALTH", "rewardAmount" : 35, "description" : "Gezondheid verhogen\n+~VAL~ leven", },
				3 : { "icon" : "icon_heart", "upgradeLevel" : 0, "resource" : 1, "price" : 100, "reward" : "GAIN_HEALTH", "rewardAmount" : 45, "description" : "Gezondheid verhogen\n+~VAL~ leven", },
				4 : { "icon" : "icon_heart", "upgradeLevel" : 0, "resource" : 1, "price" : 125, "reward" : "GAIN_HEALTH", "rewardAmount" : 55, "description" : "Gezondheid verhogen\n+~VAL~ leven", },
				5 : { "icon" : "icon_heart", "upgradeLevel" : 0, "resource" : 1, "price" : 150, "reward" : "GAIN_HEALTH", "rewardAmount" : 65, "description" : "Gezondheid verhogen\n+~VAL~ leven", },
			},	
	
			2 : { 	1 : { "icon" : "icon_damage", "upgradeLevel" : 0, "resource" : 1, "price" : 250, "reward" : "GAIN_DAMAGE", "rewardAmount" : 10, "description" : "Kracht verhogen\n+~VAL~ kracht", },
				2 : { "icon" : "icon_damage", "upgradeLevel" : 1, "resource" : 1, "price" : 300, "reward" : "GAIN_DAMAGE", "rewardAmount" : 10, "description" : "Kracht verhogen\n+~VAL~ kracht", },
				3 : { "icon" : "icon_damage", "upgradeLevel" : 2, "resource" : 1, "price" : 350, "reward" : "GAIN_DAMAGE", "rewardAmount" : 10, "description" : "Kracht verhogen\n+~VAL~ kracht", },
				4 : { "icon" : "icon_damage", "upgradeLevel" : 3, "resource" : 1, "price" : 400, "reward" : "GAIN_DAMAGE", "rewardAmount" : 10, "description" : "Kracht verhogen\n+~VAL~ kracht", },
				5 : { "icon" : "icon_damage", "upgradeLevel" : 4, "resource" : 1, "price" : 450, "reward" : "GAIN_DAMAGE", "rewardAmount" : 10, "description" : "Kracht verhogen\n+~VAL~ kracht", },
			},	
			
			3 : { 	1 : { "icon" : "icon_lightning", "upgradeLevel" : 0, "resource" : 1, "price" : 400, "reward" : "GAIN_LIGHTNING_CHANCE", "rewardAmount" : 20, "description" : "Bliksem\n+~VAL~% kans op bliksem", },
				2 : { "icon" : "icon_lightning", "upgradeLevel" : 1, "resource" : 1, "price" : 450, "reward" : "GAIN_LIGHTNING_CHANCE", "rewardAmount" : 40, "description" : "Bliksem\n+~VAL~% kans op bliksem", },
				3 : { "icon" : "icon_lightning", "upgradeLevel" : 2, "resource" : 1, "price" : 500, "reward" : "GAIN_LIGHTNING_CHANCE", "rewardAmount" : 60, "description" : "Bliksem\n+~VAL~% kans op bliksem", },
				4 : { "icon" : "icon_lightning", "upgradeLevel" : 2, "resource" : 1, "price" : 550, "reward" : "GAIN_LIGHTNING_CHANCE", "rewardAmount" : 80, "description" : "Bliksem\n+~VAL~% kans op bliksem", },
				5 : { "icon" : "icon_lightning", "upgradeLevel" : 2, "resource" : 1, "price" : 600, "reward" : "GAIN_LIGHTNING_CHANCE", "rewardAmount" : 100, "description" : "Bliksem\n+~VAL~% kans op bliksem", },
			},	
			
			4 : { 	1 : { "icon" : "icon_hourglass", "upgradeLevel" : 0, "resource" : 1, "price" : 500, "reward" : "GAIN_SHOOT_SPEED", "rewardAmount" : 30, "description" : "Schietsnelheid\n+25% sneller", },
				2 : { "icon" : "icon_hourglass", "upgradeLevel" : 1, "resource" : 1, "price" : 650, "reward" : "GAIN_SHOOT_SPEED", "rewardAmount" : 20, "description" : "Schietsnelheid\n+25% sneller", },
				3 : { "icon" : "icon_hourglass", "upgradeLevel" : 2, "resource" : 1, "price" : 750, "reward" : "GAIN_SHOOT_SPEED", "rewardAmount" : 10, "description" : "Schietsnelheid\n+25% sneller", },
			},		
		},		
	},



	/* Small blue */              "BLOB_1"  : { "score" : 1,   "category" : "blobs", "map" : true, "manifest" : "blob_1",  "size" : 1.0, "speed" : 0.50, "resource" : 1, "resourceAmount" : 30, "hp" : 120,   "hpMax" : 50,   "damage" : 1, "width" : 20,  "height" : 24,  "aniFrame" : 0, "aniFrameCount" : 0, "status" : "", "jumpY" : 0, "jumpYspeed" : 0, "hitareaX" : -10, "hitareaY" : -12,  "hitareaWidth" : 20,  "hitareaHeight" : 20,  "xSpeed" : 0, "ySpeed" : 0, "hpBurn" : 0, "hpCold" : 0, "showHealthBar" : false, "showHealthBarY" : -40, },
	/* Pink, much hp */           "BLOB_2"  : { "score" : 10,  "category" : "blobs", "map" : true, "manifest" : "blob_2",  "size" : 1.0, "speed" : 0.50, "resource" : 1, "resourceAmount" : 54, "hp" : 360,  "hpMax" : 150,  "damage" : 2, "width" : 36,  "height" : 44,  "aniFrame" : 0, "aniFrameCount" : 0, "status" : "", "jumpY" : 0, "jumpYspeed" : 0, "hitareaX" : -20, "hitareaY" : -24,  "hitareaWidth" : 40,  "hitareaHeight" : 30,  "xSpeed" : 0, "ySpeed" : 0, "hpBurn" : 0, "hpCold" : 0, "showHealthBar" : false, "showHealthBarY" : -40, },
	/* Yellow, fast */            "BLOB_3"  : { "score" : 5,   "category" : "blobs", "map" : true, "manifest" : "blob_3",  "size" : 1.0, "speed" : 1.00, "resource" : 1, "resourceAmount" : 30, "hp" : 120,   "hpMax" : 50,   "damage" : 1, "width" : 36,  "height" : 44,  "aniFrame" : 0, "aniFrameCount" : 0, "status" : "", "jumpY" : 0, "jumpYspeed" : 0, "hitareaX" : -20, "hitareaY" : -24,  "hitareaWidth" : 40,  "hitareaHeight" : 30,  "xSpeed" : 0, "ySpeed" : 0, "hpBurn" : 0, "hpCold" : 0, "showHealthBar" : false, "showHealthBarY" : -40, },
	/* Horns, boss 1 */           "BLOB_4"  : { "score" : 50,  "category" : "blobs", "map" : true, "manifest" : "blob_4",  "size" : 1.0, "speed" : 0.25, "resource" : 1, "resourceAmount" : 225, "hp" : 2400, "hpMax" : 1000, "damage" : 5, "width" : 60,  "height" : 84,  "aniFrame" : 0, "aniFrameCount" : 0, "status" : "", "jumpY" : 0, "jumpYspeed" : 0, "hitareaX" : -22, "hitareaY" : -31,  "hitareaWidth" : 44,  "hitareaHeight" : 36,  "xSpeed" : 0, "ySpeed" : 0, "hpBurn" : 0, "hpCold" : 0, "showHealthBar" : true,  "showHealthBarY" : -50, },
	/* Blue, splits in 2*/        "BLOB_5"  : { "score" : 5,   "category" : "blobs", "map" : true, "manifest" : "blob_5",  "size" : 1.0, "speed" : 0.50, "resource" : 1, "resourceAmount" : 42, "hp" : 240,  "hpMax" : 100,  "damage" : 1, "width" : 36,  "height" : 44,  "aniFrame" : 0, "aniFrameCount" : 0, "status" : "", "jumpY" : 0, "jumpYspeed" : 0, "hitareaX" : -20, "hitareaY" : -24,  "hitareaWidth" : 40,  "hitareaHeight" : 30,  "xSpeed" : 0, "ySpeed" : 0, "hpBurn" : 0, "hpCold" : 0, "showHealthBar" : false, "showHealthBarY" : -40,  "splits" : true,  "splitsAmount" : 2, "splitsTo" : "BLOB_1", },
	/* Horns, not-boss */         "BLOB_6"  : { "score" : 15,  "category" : "blobs", "map" : true, "manifest" : "blob_4",  "size" : 1.0, "speed" : 0.50, "resource" : 1, "resourceAmount" : 60, "hp" : 1560,  "hpMax" : 650,  "damage" : 2, "width" : 60,  "height" : 84,  "aniFrame" : 0, "aniFrameCount" : 0, "status" : "", "jumpY" : 0, "jumpYspeed" : 0, "hitareaX" : -22, "hitareaY" : -31,  "hitareaWidth" : 44,  "hitareaHeight" : 36,  "xSpeed" : 0, "ySpeed" : 0, "hpBurn" : 0, "hpCold" : 0, "showHealthBar" : false, "showHealthBarY" : -50, },
	/* Pink cat, much hp */       "BLOB_7"  : { "score" : 25,  "category" : "blobs", "map" : true, "manifest" : "blob_6",  "size" : 0.5, "speed" : 0.50, "resource" : 1, "resourceAmount" : 90, "hp" : 1200,  "hpMax" : 500,  "damage" : 2, "width" : 108, "height" : 182, "aniFrame" : 0, "aniFrameCount" : 0, "status" : "", "jumpY" : 0, "jumpYspeed" : 0, "hitareaX" : -53, "hitareaY" : -40,  "hitareaWidth" : 106, "hitareaHeight" : 40,  "xSpeed" : 0, "ySpeed" : 0, "hpBurn" : 0, "hpCold" : 0, "showHealthBar" : false, "showHealthBarY" : -50, },
	/* Big pink cat split */      "BLOB_8"  : { "score" : 10,  "category" : "blobs", "map" : true, "manifest" : "blob_6",  "size" : 1.0, "speed" : 0.50, "resource" : 1, "resourceAmount" : 120, "hp" : 1800,  "hpMax" : 750,  "damage" : 2, "width" : 108, "height" : 182, "aniFrame" : 0, "aniFrameCount" : 0, "status" : "", "jumpY" : 0, "jumpYspeed" : 0, "hitareaX" : -53, "hitareaY" : -40,  "hitareaWidth" : 106, "hitareaHeight" : 40,  "xSpeed" : 0, "ySpeed" : 0, "hpBurn" : 0, "hpCold" : 0, "showHealthBar" : true,  "showHealthBarY" : -50,  "splits" : true, "splitsAmount" : 2, "splitsTo" : "BLOB_7", },
	/* Yellow boss 2 */ 	      "BLOB_9"  : { "score" : 75,  "category" : "blobs", "map" : true, "manifest" : "blob_7",  "size" : 1.0, "speed" : 0.40, "resource" : 1, "resourceAmount" : 330,"hp" : 3600, "hpMax" : 1500, "damage" : 5, "width" : 148, "height" : 230, "aniFrame" : 0, "aniFrameCount" : 0, "status" : "", "jumpY" : 0, "jumpYspeed" : 0, "hitareaX" : -73, "hitareaY" : -52,  "hitareaWidth" : 146, "hitareaHeight" : 52,  "xSpeed" : 0, "ySpeed" : 0, "hpBurn" : 0, "hpCold" : 0, "showHealthBar" : true,  "showHealthBarY" : -140, "splits" : true, "splitsAmount" : 3, "splitsTo" : "BLOB_10", },
	/* Yellow boss split */       "BLOB_10" : { "score" : 33,  "category" : "blobs", "map" : true, "manifest" : "blob_7",  "size" : 0.5, "speed" : 0.50, "resource" : 1, "resourceAmount" : 120, "hp" : 1200,  "hpMax" : 500,  "damage" : 2, "width" : 148, "height" : 230, "aniFrame" : 0, "aniFrameCount" : 0, "status" : "", "jumpY" : 0, "jumpYspeed" : 0, "hitareaX" : -73, "hitareaY" : -52,  "hitareaWidth" : 146, "hitareaHeight" : 52,  "xSpeed" : 0, "ySpeed" : 0, "hpBurn" : 0, "hpCold" : 0, "showHealthBar" : true,  "showHealthBarY" : -80,  "splits" : true, "splitsAmount" : 2, "splitsTo" : "BLOB_3", },
	/* Purple fast one */         "BLOB_11" : { "score" : 20,  "category" : "blobs", "map" : true, "manifest" : "blob_8",  "size" : 1.0, "speed" : 1.50, "resource" : 1, "resourceAmount" : 75, "hp" : 180,   "hpMax" : 75,   "damage" : 1, "width" : 36,  "height" : 44,  "aniFrame" : 0, "aniFrameCount" : 0, "status" : "", "jumpY" : 0, "jumpYspeed" : 0, "hitareaX" : -20, "hitareaY" : -24,  "hitareaWidth" : 40,  "hitareaHeight" : 30,  "xSpeed" : 0, "ySpeed" : 0, "hpBurn" : 0, "hpCold" : 0, "showHealthBar" : false, "showHealthBarY" : -40, },
	/* Purple super fast one */   "BLOB_12" : { "score" : 22,  "category" : "blobs", "map" : true, "manifest" : "blob_8",  "size" : 1.0, "speed" : 2.00, "resource" : 1, "resourceAmount" : 75, "hp" : 200,   "hpMax" : 75,   "damage" : 1, "width" : 36,  "height" : 44,  "aniFrame" : 0, "aniFrameCount" : 0, "status" : "", "jumpY" : 0, "jumpYspeed" : 0, "hitareaX" : -20, "hitareaY" : -24,  "hitareaWidth" : 40,  "hitareaHeight" : 30,  "xSpeed" : 0, "ySpeed" : 0, "hpBurn" : 0, "hpCold" : 0, "showHealthBar" : false, "showHealthBarY" : -40, },
	/* Purple ultra fast one */   "BLOB_13" : { "score" : 24,  "category" : "blobs", "map" : true, "manifest" : "blob_8",  "size" : 1.0, "speed" : 2.50, "resource" : 1, "resourceAmount" : 75, "hp" : 200,   "hpMax" : 75,   "damage" : 1, "width" : 36,  "height" : 44,  "aniFrame" : 0, "aniFrameCount" : 0, "status" : "", "jumpY" : 0, "jumpYspeed" : 0, "hitareaX" : -20, "hitareaY" : -24,  "hitareaWidth" : 40,  "hitareaHeight" : 30,  "xSpeed" : 0, "ySpeed" : 0, "hpBurn" : 0, "hpCold" : 0, "showHealthBar" : false, "showHealthBarY" : -40, },
	/* Grey, much hp */           "BLOB_14" : { "score" : 30,  "category" : "blobs", "map" : true, "manifest" : "blob_9",  "size" : 1.0, "speed" : 0.50, "resource" : 1, "resourceAmount" : 90, "hp" : 400,  "hpMax" : 500,  "damage" : 2, "width" : 36,  "height" : 44,  "aniFrame" : 0, "aniFrameCount" : 0, "status" : "", "jumpY" : 0, "jumpYspeed" : 0, "hitareaX" : -20, "hitareaY" : -24,  "hitareaWidth" : 40,  "hitareaHeight" : 30,  "xSpeed" : 0, "ySpeed" : 0, "hpBurn" : 0, "hpCold" : 0, "showHealthBar" : false, "showHealthBarY" : -40, },
	/* Holey boss 3 */            "BLOB_15" : { "score" : 100, "category" : "blobs", "map" : true, "manifest" : "blob_10", "size" : 1.0, "speed" : 0.50, "resource" : 1, "resourceAmount" : 1500,"hp" : 12000, "hpMax" : 5000, "damage" : 5, "width" : 112, "height" : 180, "aniFrame" : 0, "aniFrameCount" : 0, "status" : "", "jumpY" : 0, "jumpYspeed" : 0, "hitareaX" : -56, "hitareaY" : -45,  "hitareaWidth" : 112, "hitareaHeight" : 45,  "xSpeed" : 0, "ySpeed" : 0, "hpBurn" : 0, "hpCold" : 0, "showHealthBar" : true,  "showHealthBarY" : -100, "spawns" : true, "spawnsBlob" : "BLOB_16", "spawnsCount" : 0, "spawnsCountMax" : 500,},
	/* Holey small one */         "BLOB_16" : { "score" : 50,  "category" : "blobs", "map" : true, "manifest" : "blob_10", "size" : 0.5, "speed" : 0.40, "resource" : 1, "resourceAmount" : 150, "hp" : 1200,  "hpMax" : 500,  "damage" : 1, "width" : 112, "height" : 180, "aniFrame" : 0, "aniFrameCount" : 0, "status" : "", "jumpY" : 0, "jumpYspeed" : 0, "hitareaX" : -56, "hitareaY" : -45,  "hitareaWidth" : 112, "hitareaHeight" : 45,  "xSpeed" : 0, "ySpeed" : 0, "hpBurn" : 0, "hpCold" : 0, "showHealthBar" : true,  "showHealthBarY" : -50,  "spawns" : true, "spawnsBlob" : "BLOB_17", "spawnsCount" : 0, "spawnsCountMax" : 250,},
	/* Holey very small one */    "BLOB_17" : { "score" : 25,  "category" : "blobs", "map" : true, "manifest" : "blob_10", "size" : 0.25,"speed" : 0.30, "resource" : 1, "resourceAmount" : 75, "hp" : 600,  "hpMax" : 280,  "damage" : 1, "width" : 112, "height" : 180, "aniFrame" : 0, "aniFrameCount" : 0, "status" : "", "jumpY" : 0, "jumpYspeed" : 0, "hitareaX" : -56, "hitareaY" : -45,  "hitareaWidth" : 112, "hitareaHeight" : 45,  "xSpeed" : 0, "ySpeed" : 0, "hpBurn" : 0, "hpCold" : 0, "showHealthBar" : false, "showHealthBarY" : -100, },
	/* Blue, fast, splits in 10*/ "BLOB_18" : { "score" : 25,  "category" : "blobs", "map" : true, "manifest" : "blob_5",  "size" : 1.0, "speed" : 3.00, "resource" : 1, "resourceAmount" : 150, "hp" : 150,   "hpMax" : 50,   "damage" : 1, "width" : 36,  "height" : 44,  "aniFrame" : 0, "aniFrameCount" : 0, "status" : "", "jumpY" : 0, "jumpYspeed" : 0, "hitareaX" : -20, "hitareaY" : -24,  "hitareaWidth" : 40,  "hitareaHeight" : 30,  "xSpeed" : 0, "ySpeed" : 0, "hpBurn" : 0, "hpCold" : 0, "showHealthBar" : false, "showHealthBarY" : -40,  "splits" : true,  "splitsAmount" : 10, "splitsTo" : "BLOB_1", },
	/* Rabbit ear boss 4 */       "BLOB_19" : { "score" : 200, "category" : "blobs", "map" : true, "manifest" : "blob_11", "size" : 8.0, "speed" : 0.50, "resource" : 1, "resourceAmount" : 2500,"hp" : 27000,"hpMax" : 10000,"damage" : 4, "width" : 120, "height" : 220, "aniFrame" : 0, "aniFrameCount" : 0, "status" : "", "jumpY" : 0, "jumpYspeed" : 0, "hitareaX" : -58, "hitareaY" : -87,  "hitareaWidth" : 112, "hitareaHeight" : 92,  "xSpeed" : 0, "ySpeed" : 0, "hpBurn" : 0, "hpCold" : 0, "showHealthBar" : true,  "showHealthBarY" : -115, "damageReducesSize" : true, },
	/* Rabbit ear small one */    "BLOB_20" : { "score" : 75,  "category" : "blobs", "map" : true, "manifest" : "blob_11", "size" : 0.25,"speed" : 1.00, "resource" : 1, "resourceAmount" : 120, "hp" : 750,  "hpMax" : 250,  "damage" : 2, "width" : 120, "height" : 220, "aniFrame" : 0, "aniFrameCount" : 0, "status" : "", "jumpY" : 0, "jumpYspeed" : 0, "hitareaX" : -58, "hitareaY" : -87,  "hitareaWidth" : 112, "hitareaHeight" : 92,  "xSpeed" : 0, "ySpeed" : 0, "hpBurn" : 0, "hpCold" : 0, "showHealthBar" : false, "showHealthBarY" : -115, },
	/* Pink that shoots */        "BLOB_21" : { "score" : 75,  "category" : "blobs", "map" : true, "manifest" : "blob_12", "size" : 1.0, "speed" : 2.00, "resource" : 1, "resourceAmount" : 120, "hp" : 1500,  "hpMax" : 500,  "damage" : 1, "width" : 36,  "height" : 44,  "aniFrame" : 0, "aniFrameCount" : 0, "status" : "", "jumpY" : 0, "jumpYspeed" : 0, "hitareaX" : -20, "hitareaY" : -24,  "hitareaWidth" : 40,  "hitareaHeight" : 30,  "xSpeed" : 0, "ySpeed" : 0, "hpBurn" : 0, "hpCold" : 0, "showHealthBar" : true,  "showHealthBarY" : -40,  "slowsDown" : true, "spawns" : true, "spawnsBlob" : "BLOB_22", "spawnsCount" : 0, "spawnsCountMax" : 100, },
	/* Shot of pink one */        "BLOB_22" : { "score" : 1,   "category" : "blobs", "map" : true, "manifest" : "blob_12", "size" : 0.35,"speed" : 10.00,"resource" : 1, "resourceAmount" : 0,  "hp" : 48,   "hpMax" : 23,   "damage" : 10, "width" : 36,  "height" : 44,  "aniFrame" : 0, "aniFrameCount" : 0, "status" : "", "jumpY" : 0, "jumpYspeed" : 0, "hitareaX" : -20, "hitareaY" : -24,  "hitareaWidth" : 40,  "hitareaHeight" : 30,  "xSpeed" : 0, "ySpeed" : 0, "hpBurn" : 0, "hpCold" : 0, "showHealthBar" : true,  "showHealthBarY" : -40, },
	/* Flowery boss 5 */ 	      "BLOB_23" : { "score" : 350, "category" : "blobs", "map" : true, "manifest" : "blob_13", "size" : 0.5, "speed" : 0.50, "resource" : 1, "resourceAmount" : 6000,"hp" : 100000, "hpMax" : 50000, "damage" : 10, "width" : 160, "height" : 208, "aniFrame" : 0, "aniFrameCount" : 0, "status" : "", "jumpY" : 0, "jumpYspeed" : 0, "hitareaX" : -74, "hitareaY" : -59,  "hitareaWidth" : 146, "hitareaHeight" : 85,  "xSpeed" : 0, "ySpeed" : 0, "hpBurn" : 0, "hpCold" : 0, "showHealthBar" : true,  "showHealthBarY" : -65, "altAppearance" : true, },




	/* *** Shots and impacts of shots *** */
	"SHOT_1" : { "sound" : "sound_shot_1", "soundHit" : "sound_shot_1_hit",	"category" : "shots", "map" : true, "manifest" : "shot_1", "origin" : "", "width" : 31, "height" : 10, "speed" : 26, "xSpeed" : 0, "ySpeed" : 0, "lifetime" : 10, "damage" : 1, "rotatesTowardsTarget" : true, "hasImpactAni" : false, "shotHasSetTarget" : false, "shotHasSetTargetX" : 0, "shotHasSetTargetY" : 0, "shotHasSetTargetKey" : 0, "shotFocusOnTarget" : false, },	
	"SHOT_2" : { "sound" : "sound_shot_2", 					"category" : "shots", "map" : true, "manifest" : "shot_2", "origin" : "", "width" : 15, "height" : 5, "speed" : 15, "xSpeed" : 0, "ySpeed" : 0, "lifetime" : 27, "damage" : 1, "rotatesTowardsTarget" : true, "hasImpactAni" : false,  "shotHasSetTarget" : false, "shotHasSetTargetX" : 0, "shotHasSetTargetY" : 0, "shotHasSetTargetKey" : 0, "shotFocusOnTarget" : false, },	
	"SHOT_3" : { "sound" : "sound_shot_3", "soundHit" : "sound_shot_3_hit", "category" : "shots", "map" : true, "manifest" : "shot_3", "origin" : "", "width" : 16, "height" : 24, "speed" : 6, "xSpeed" : 0, "ySpeed" : 0, "lifetime" : 80, "damage" : 1, "rotatesTowardsTarget" : false, "hasImpactAni" : true, "shotHasSetTarget" : false,  "shotHasSetTargetX" : 0, "shotHasSetTargetY" : 0, "shotHasSetTargetKey" : 0, "shotFocusOnTarget" : false, },	
	"SHOT_4" : { "sound" : "sound_shot_4", "soundHit" : "sound_shot_3_hit",	"category" : "shots", "map" : true, "manifest" : "shot_4", "origin" : "", "width" : 50, "height" : 10, "speed" : 8, "xSpeed" : 0, "ySpeed" : 0, "lifetime" : 170, "damage" : 1, "rotatesTowardsTarget" : true, "hasImpactAni" : true, "shotHasSetTarget" : true,  "shotHasSetTargetX" : 0, "shotHasSetTargetY" : 0, "shotHasSetTargetKey" : 0, "shotFocusOnTarget" : true, },
	"SHOT_5" : { "sound" : "sound_shot_6", "soundHit" : "sound_shot_6_hit",	"category" : "shots", "map" : true, "manifest" : "shot_5", "origin" : "", "width" : 40, "height" : 40, "speed" : 20, "xSpeed" : 0, "ySpeed" : 0, "lifetime" : 24, "damage" : 1, "rotatesTowardsTarget" : false, "hasImpactAni" : false, "shotHasSetTarget" : false, "shotHasSetTargetX" : 0, "shotHasSetTargetY" : 0, "shotHasSetTargetKey" : 0, "shotFocusOnTarget" : false, },	
	"SHOT_6" : { "sound" : "sound_shot_6", "soundHit" : "sound_shot_6_hit",	"category" : "shots", "map" : true, "manifest" : "shot_6", "origin" : "", "width" : 40, "height" : 40, "speed" : 20, "xSpeed" : 0, "ySpeed" : 0, "lifetime" : 24, "damage" : 1, "rotatesTowardsTarget" : false, "hasImpactAni" : false, "shotHasSetTarget" : false, "shotHasSetTargetX" : 0, "shotHasSetTargetY" : 0, "shotHasSetTargetKey" : 0, "shotFocusOnTarget" : false, },	
	"SHOT_7" : { "sound" : "sound_shot_6", "soundHit" : "sound_shot_6_hit",	"category" : "shots", "map" : true, "manifest" : "shot_7", "origin" : "", "width" : 40, "height" : 40, "speed" : 20, "xSpeed" : 0, "ySpeed" : 0, "lifetime" : 24, "damage" : 1, "rotatesTowardsTarget" : false, "hasImpactAni" : false, "shotHasSetTarget" : false, "shotHasSetTargetX" : 0, "shotHasSetTargetY" : 0, "shotHasSetTargetKey" : 0, "shotFocusOnTarget" : false, },	
	"SHOT_8" : { "sound" : "sound_shot_7", 	"category" : "shots", "map" : true, "manifest" : "shot_8", "origin" : "", "width" : 50, "height" : 10, "speed" : 8, "xSpeed" : 0, "ySpeed" : 0, "lifetime" : 170, "damage" : 1, "rotatesTowardsTarget" : true, "hasImpactAni" : true, "shotHasSetTarget" : true,  "shotHasSetTargetX" : 0, "shotHasSetTargetY" : 0, "shotHasSetTargetKey" : 0, "shotFocusOnTarget" : true, },

	"IMPACT_SHOT_3" : { "category" : "impacts", "map" : true, "manifest" : "tower_2_impact_1", "manifestBase" : "tower_2_impact_", "width" : 120, "height" : 180, "aniFrame" : 0, "aniFrameCount" : 0, "aniFrames" : 9,  },	
	"IMPACT_SHOT_4" : { "category" : "impacts", "map" : true, "manifest" : "tower_3_impact_1", "manifestBase" : "tower_3_impact_", "width" : 34, "height" : 270, "aniFrame" : 0, "aniFrameCount" : 0, "aniFrames" : 4,  },	
	"IMPACT_SHOT_8" : { "category" : "impacts", "map" : true, "manifest" : "tower_7_impact_1", "manifestBase" : "tower_7_impact_", "width" : 60, "height" : 500, "aniFrame" : 0, "aniFrameCount" : 0, "aniFrames" : 7,  },	
		
	/* Vegetation*/
	"RESOURCE_1" : { "score" : 10, "category" : "resources", "map" : true, "manifest" : "resource_1", "width" : 48, "height" : 40,  "hitareaX" : -21, "hitareaY" : -20,  "hitareaWidth" : 41,  "hitareaHeight" : 33, "hp" : 5, "resource" : 2, "resourceAmount" : 3,  "shake" : 0, },	
	"RESOURCE_2" : { "score" : 12, "category" : "resources", "map" : true, "manifest" : "resource_2", "width" : 68, "height" : 68,  "hitareaX" : -29, "hitareaY" : -34,  "hitareaWidth" : 58,  "hitareaHeight" : 60, "hp" : 10, "resource" : 2, "resourceAmount" : 6,  "shake" : 0, },	
	"RESOURCE_3" : { "score" : 18, "category" : "resources", "map" : true, "manifest" : "resource_3", "width" : 84, "height" : 200, "hitareaX" : -26, "hitareaY" : -31,  "hitareaWidth" : 50,  "hitareaHeight" : 50, "hp" : 25, "resource" : 2, "resourceAmount" : 30, "shake" : 0, },	

	/* Stones */
	"RESOURCE_4" : { "score" : 10, "category" : "resources", "map" : true, "manifest" : "resource_4", "width" : 44, "height" : 42, "hitareaX" : -22,  "hitareaY" : -21, "hitareaWidth" : 44,  "hitareaHeight" : 23, "hp" : 10,  "resource" : 3, "resourceAmount" : 6, "shake" : 0, },	
	"RESOURCE_5" : { "score" : 10, "category" : "resources", "map" : true, "manifest" : "resource_5", "width" : 40, "height" : 60, "hitareaX" : -20,  "hitareaY" : -30, "hitareaWidth" : 40,  "hitareaHeight" : 32, "hp" : 10,  "resource" : 3, "resourceAmount" : 9, "shake" : 0, },	
	"RESOURCE_6" : { "score" : 18, "category" : "resources", "map" : true, "manifest" : "resource_6", "width" : 92, "height" : 100, "hitareaX" : -46, "hitareaY" : -50, "hitareaWidth" : 92,  "hitareaHeight" : 55, "hp" : 50, "resource" : 3, "resourceAmount" : 30, "shake" : 0, },	
	"RESOURCE_7" : { "score" : 16, "category" : "resources", "map" : true, "manifest" : "resource_7", "width" : 72, "height" : 160, "hitareaX" : -36, "hitareaY" : -80, "hitareaWidth" : 72,  "hitareaHeight" : 84, "hp" : 35, "resource" : 3, "resourceAmount" : 21, "shake" : 0, },	

	/* Diamonds */
	"RESOURCE_8" : { "score" : 55, "category" : "resources", "map" : true, "manifest" : "resource_8", "width" : 100, "height" : 200, "hitareaX" : -26, "hitareaY" : -98, "hitareaWidth" : 42,  "hitareaHeight" : 104, "hp" : 50,  "resource" : 4, "resourceAmount" : 1, "shake" : 0, },	

	/* Resources further away on map */
	"RESOURCE_9" :  { "score" : 22, "category" : "resources", "map" : true, "manifest" : "resource_9", "width" : 94, "height" : 222, "hitareaX" : -21, "hitareaY" : -29, "hitareaWidth" : 37,  "hitareaHeight" : 31, "hp" : 50,  "resource" : 2, "resourceAmount" : 45, "shake" : 0, },	
	"RESOURCE_10" : { "score" : 22, "category" : "resources", "map" : true, "manifest" : "resource_10", "width" : 70, "height" : 216, "hitareaX" : -30, "hitareaY" : -23, "hitareaWidth" : 57,  "hitareaHeight" : 33, "hp" : 50,  "resource" : 2, "resourceAmount" : 45, "shake" : 0, },	


	"GLITTERCIRCLE" : {  "category" : "particles", "width" : 200, "height" : 150, "speed" : 0.12, "particle" : 3, "count" : 0, "mirrored" : true, },
	"SUNBEAM" : { "category" : "sunbeam", "radius" : 400, "initialize" : true, },	
};


// *** Game engine
var gameEngine = {

	"version" : "v2.25.1",
	// *** Use the last digit (1) for verion updates of your game: increase it here AND increase versionHTML in index.html in the same way. This will eliminate cache problems.
	// *** v2.25 : changed mysql to pdo for php7 compatibility

	"testing" : true,
	"globalAudio" : true,
	"ajaxComm" : "https://www.spellingoefenen.nl/games/explorer/game_comm.php", "shaPW" : "great",	
	"iOS" : false, "isIphone" : false, "isAndroid" : false,	"isWindowsPhone" : false, "isSmartphone" : false, "isTopWindow" : false, "iPhoneScrollCheck" : false, "iPhoneMaxScroll" : 0, "globalFullscreenDisabled" : false, "globalFullscreen" : false, "userInteractionOccured" : false,	
	"framerate" : 40, "framerateRecalculations" : 1, "framerateStats" : new Stats(),	
	"preloadStarted" : false, "preloadPreloadManifestCount" : 0, "preloadMessage" : "",	
	"play" : true, "playButtonIntroMessage" : true, "playButtonCount" : 0, "playButtonStatus" : "INIT",
	"globalAudioDisabled" : false,	
	"audioNoBuffer" : false, // *** Buffering audio is way better but NOT possible in IE and not LOCAL	
	"initDone" 	: false,	
	"manifestTotal" : 0, "manifestCount" : 0,
};


// *** Particles
var particle = { }; 

var particlePrototype = {

	1 : { 	"name" : "(map) Smoke",	"manifest" : "particle",	"manifestVariation" : 0.25,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -1,		"xSpeedVariation" : 1,		"xSpeedChange" : 0.01,		"xSpeedChangeVariation" : 0.01,
		"ySpeed" : 0,		"ySpeedVariation" : 0,		"ySpeedChange" : -0.1,		"ySpeedChangeVariation" : -0.1,
		"size"   : 4,		"sizeVariation"   : 4,		"sizeChange"   : 1,		"sizeChangeVariation"   : 1,
		"alpha"  : 0.5,		"alphaVariation"  : 0.5,	"alphaChange"  : -0.04,		"alphaChangeVariation"  : 0,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	

	2 : { 	"name" : "(map) Black Smoke",	"manifest" : "particle",	"manifestVariation" : 1,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -2,		"xSpeedVariation" : 2,		"xSpeedChange" : 0.1,		"xSpeedChangeVariation" : 0.1,
		"ySpeed" : -1,		"ySpeedVariation" : 0,		"ySpeedChange" : -0.1,		"ySpeedChangeVariation" : -0.1,
		"size"   : 5,		"sizeVariation"   : 30,		"sizeChange"   : 3,		"sizeChangeVariation"   : 3,
		"alpha"  : 0.5,		"alphaVariation"  : 0.3,	"alphaChange"  : -0.03,		"alphaChangeVariation"  : 0,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	

	3 : { 	"name" : "(map) Glitter",	"manifest" : "particle",	"manifestVariation" : 0,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -1,		"xSpeedVariation" : 1,		"xSpeedChange" : 0.01,		"xSpeedChangeVariation" : 0,
		"ySpeed" : 1,		"ySpeedVariation" : -2,		"ySpeedChange" : -0.1,		"ySpeedChangeVariation" : 0,
		"size"   : 50,		"sizeVariation"   : 50,		"sizeChange"   : -3,		"sizeChangeVariation"   : -4,
		"alpha"  : 1,		"alphaVariation"  : 0,		"alphaChange"  : -0.02,		"alphaChangeVariation"  : -0.02,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0.01,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	

	4 : { 	"name" : "(map) Lightning",	"manifest" : "particle",	"manifestVariation" : 0,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : 0,		"xSpeedVariation" : 0,		"xSpeedChange" : 0.01,		"xSpeedChangeVariation" : 0.01,
		"ySpeed" : 0,		"ySpeedVariation" : 0,		"ySpeedChange" : -0.1,		"ySpeedChangeVariation" : -0.1,
		"size"   : 0,		"sizeVariation"   : 50,		"sizeChange"   : -5,		"sizeChangeVariation"   : -5,
		"alpha"  : 0.75,	"alphaVariation"  : 0.25,	"alphaChange"  : -0.1,		"alphaChangeVariation"  : 0.1,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0.5,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	

	5 : { 	"name" : "(map) Blob blood",	"manifest" : "particle",	"manifestVariation" : 0,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -5,		"xSpeedVariation" : 10,		"xSpeedChange" : 0,		"xSpeedChangeVariation" : 0,
		"ySpeed" : -5,		"ySpeedVariation" : -5,		"ySpeedChange" : 0.5,		"ySpeedChangeVariation" : 0.5,
		"size"   : 5,		"sizeVariation"   : 10,		"sizeChange"   : -0.35,		"sizeChangeVariation"   : -0.35,
		"alpha"  : 1,		"alphaVariation"  : 0,		"alphaChange"  : 0,		"alphaChangeVariation"  : 0,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0,	"flashSizeMultiplier" : 2,	"destructionChance" : 0.015,
	},	

	6 : { 	"name" : "(map) Fire",	"manifest" : "particle_yellow",	"manifestVariation" : 0,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -5,		"xSpeedVariation" : 10,		"xSpeedChange" : 0,		"xSpeedChangeVariation" : 0,
		"ySpeed" : -5,		"ySpeedVariation" : -5,		"ySpeedChange" : 1,		"ySpeedChangeVariation" : 0.5,
		"size"   : 15,		"sizeVariation"   : 10,		"sizeChange"   : -0.75,		"sizeChangeVariation"   : -0.75,
		"alpha"  : 1,		"alphaVariation"  : 0,		"alphaChange"  : 0,		"alphaChangeVariation"  : 0,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	


	7 : { 	"name" : "(map) Lightning",	"manifest" : "particle",	"manifestVariation" : 0,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : 0,		"xSpeedVariation" : 0,		"xSpeedChange" : 0.0,		"xSpeedChangeVariation" : 0.0,
		"ySpeed" : 0,		"ySpeedVariation" : 0,		"ySpeedChange" : 0,		"ySpeedChangeVariation" : 0,
		"size"   : 50,		"sizeVariation"   : 50,		"sizeChange"   : -5,		"sizeChangeVariation"   : -5,
		"alpha"  : 0.75,	"alphaVariation"  : 0.25,	"alphaChange"  : -0.1,		"alphaChangeVariation"  : 0.1,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	

	8 : { 	"name" : "(map) Heart Glitter",	"manifest" : "particle_heart",	"manifestVariation" : 0,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -1,		"xSpeedVariation" : 1,		"xSpeedChange" : 0.01,		"xSpeedChangeVariation" : 0,
		"ySpeed" : 1,		"ySpeedVariation" : -2,		"ySpeedChange" : -0.1,		"ySpeedChangeVariation" : 0,
		"size"   : 8,		"sizeVariation"   : 0,		"sizeChange"   : -0.1,		"sizeChangeVariation"   : -0.2,
		"alpha"  : 1,		"alphaVariation"  : 0,		"alphaChange"  : -0.02,		"alphaChangeVariation"  : -0.02,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	
	
	9 : { 	"name" : "(map) Mini Glitter",	"manifest" : "particle",	"manifestVariation" : 0,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -1,		"xSpeedVariation" : 1,		"xSpeedChange" : 0.01,		"xSpeedChangeVariation" : 0,
		"ySpeed" : 1,		"ySpeedVariation" : -2,		"ySpeedChange" : -0.1,		"ySpeedChangeVariation" : 0,
		"size"   : 25,		"sizeVariation"   : 0,		"sizeChange"   : -1,		"sizeChangeVariation"   : -2,
		"alpha"  : 1,		"alphaVariation"  : 0,		"alphaChange"  : -0.02,		"alphaChangeVariation"  : -0.02,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	
	
	10 : { 	"name" : "Mini Glitter",	"manifest" : "particle",	"manifestVariation" : 0,	"manifestVariationManifest" : "particle_black",		
	
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
		
		//"ç" : { x : 0.5, 	y : 100, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		//"ñ" : { x : 1.5, 	y : 100, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		//"í" : { x : 2.5, 	y : 100, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		//"ú" : { x : 3.5, 	y : 100, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		//"ù" : { x : 4.5, 	y : 100, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		//"ó" : { x : 5.5, 	y : 100, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		//"ò" : { x : 6.5, 	y : 100, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		//"á" : { x : 7.5, 	y : 100, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
	
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
		"'" : { x : 12.5, 	y : 3-1, 		pushed : 0, 	type : "extra", 	opacity : 0.35 },
		"?" : { x : 13.5, 	y : 3-1, 		pushed : 0, 	type : "extra", 	opacity : 0.35 },	
		" " : { x : 14.5, 	y : 3-1, 		pushed : 0, 	type : "extra", 	opacity : 0.35, 	extraLength : 2 }
	},

	"keyWidth"		: 70,			"keyWidthPortrait"	: 42,
	"keyHeight"		: 50,
	"keyLineheight"		: 34,
	"keyPadding"		: 6,
	"font"			: "bold 32px 'Caveat Brush', cursive",
	
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