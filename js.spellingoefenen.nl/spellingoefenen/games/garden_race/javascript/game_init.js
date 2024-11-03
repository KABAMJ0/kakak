// *** Initialize game after html body has been loaded


var images_from_server = "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/garden_race/images";
var sounds_from_server = "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/garden_race/sound";
var global_images_from_server = "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/garden_race/global";

function init()
{
	if(!gameEngine["initDone"])
	{
		gameEngine["initDone"] = true;
		console.log("Init game with Gamedesign.nl HTML5 game engine " + gameEngine["version"] + " (versionHTML: " + versionHTML + "): all rights reserved");console.log("---");

		// *** Device related checks and hacks
		deviceChecksPostInit();
				
		ge('myCanvasGamedesign').style.display = 'none';
	
		startGame();			
		//showIntro();	
	}
}
 

// *** Create begin of manifest for showing of preload screen only (NO PRELOADING OF SOUND!)
function loadPreloadManifest()
{
	// *** Preload of images	
	manifestImage("playbutton", global_images_from_server + "/global/ui/playbutton.png"); 	manifestImage("playbutton_hover", global_images_from_server + "/global/ui/playbutton_hover.png");		manifestImage("alert_bg", global_images_from_server + "/global/ui/alert_bg.png"); 				manifestImage("ios_startscreen", global_images_from_server + "/global/ui/ios_startscreen.png");		manifestImage("bg_maneuvre", global_images_from_server + "/global/ui/bg_maneuvre.png"); 	manifestImage("icon_phone", global_images_from_server + "/global/ui/icon_phone.png");
	manifestImage("progressbar", global_images_from_server + "/global/ui/progressbar.png");	manifestImage("progressbar_bg", global_images_from_server + "/global/ui/progressbar_bg.png");		manifestImage("progressbar_fg", global_images_from_server + "/global/ui/progressbar_fg.png");		manifestImage("close", global_images_from_server + "/global/ui/close.png");
	manifestImage("sound_on", global_images_from_server + "/global/ui/sound_on.png");		manifestImage("sound_off", global_images_from_server + "/global/ui/sound_off.png");			manifestImage("fullscreen_on", global_images_from_server + "/global/ui/fullscreen_on.png");		manifestImage("fullscreen_off", global_images_from_server + "/global/ui/fullscreen_off.png");
	manifestImage("keyboard_on", global_images_from_server + "/global/ui/keyboard_on.png");	manifestImage("keyboard_off", global_images_from_server + "/global/ui/keyboard_off.png");			manifestImage("sunbeam", images_from_server + "/sunbeam.png");
	manifestImage("particle", images_from_server + "/particle.png");			manifestImage("particle_black", images_from_server + "/particle_black.png");				manifestImage("particle_yellow", images_from_server + "/particle_yellow.png");				manifestImage("particle_red", images_from_server + "/particle_red.png");
	manifestImage("keyboard_key", global_images_from_server + "/global/keyboard/key.png");	manifestImage("keyboard_key_hover", global_images_from_server + "/global/keyboard/key_hover.png");		manifestImage("keyboard_key_pushed", global_images_from_server + "/global/keyboard/key_pushed.png");	manifestImage("keyboard_key_long", global_images_from_server + "/global/keyboard/key_long.png");	manifestImage("keyboard_key_long_hover", global_images_from_server + "/global/keyboard/key_long_hover.png");	manifestImage("keyboard_key_long_pushed", global_images_from_server + "/global/keyboard/key_long_pushed.png");	manifestImage("keyboard_key_alt", global_images_from_server + "/global/keyboard/key_alt.png");	manifestImage("keyboard_key_alt_pushed", global_images_from_server + "/global/keyboard/key_alt_pushed.png");	manifestImage("keyboard_key_long_alt", global_images_from_server + "/global/keyboard/key_long_alt.png");	manifestImage("keyboard_key_long_alt_pushed", global_images_from_server + "/global/keyboard/key_long_alt_pushed.png");				
	manifestImage("highscore_bg", global_images_from_server + "/global/highscore/bg.png");	manifestImage("highscore_selected", global_images_from_server + "/global/highscore/selected.png");		manifestImage("highscore_between", global_images_from_server + "/global/highscore/between.png");		manifestImage("highscore_top", global_images_from_server + "/global/highscore/top.png");		manifestImage("highscore_top_hover", global_images_from_server + "/global/highscore/top_hover.png");	manifestImage("highscore_up", global_images_from_server + "/global/highscore/up.png");		manifestImage("highscore_up_hover", global_images_from_server + "/global/highscore/up_hover.png");		manifestImage("highscore_user", global_images_from_server + "/global/highscore/user.png");		manifestImage("highscore_user_hover", global_images_from_server + "/global/highscore/user_hover.png");	manifestImage("highscore_down", global_images_from_server + "/global/highscore/down.png");		manifestImage("highscore_down_hover", global_images_from_server + "/global/highscore/down_hover.png");	manifestImage("highscore_bottom", global_images_from_server + "/global/highscore/bottom.png");	manifestImage("highscore_bottom_hover", global_images_from_server + "/global/highscore/bottom_hover.png");		

	manifestImage("button", images_from_server + "/button.png"); 
	manifestImage("button_hover", images_from_server + "/button_hover.png");
	manifestImage("keyboard", images_from_server + "/keyboard.png");
	manifestImage("main_menu", images_from_server + "/main_menu.png");

	manifestImage("logo", images_from_server + "/logo.png");
	//manifestImage("bg_intro", images_from_server + "/bg_intro.png");	
	//manifestImage("bg_1_docentendeel", images_from_server + "/bg_1_docentendeel.jpg");
	//manifestImage("progress_0", images_from_server + "/progress_0.png");

	//manifestImage("background_bg", images_from_server + "/background/" + wl_kind + "/bg.png");
	//manifestImage("background_sky", images_from_server + "/background/" + wl_kind + "/sky.png");
	//manifestImage("background_decoration", images_from_server + "/background/" + wl_kind + "/decoration.png");
	//manifestImage("background_watersurface", images_from_server + "/background/" + wl_kind + "/watersurface.png");
	//manifestImage("background_bottom", images_from_server + "/background/" + wl_kind + "/bottom.png");

	manifestImage("bg", images_from_server + "/bg.jpg");	
	//manifestImage("bg_wave_1", images_from_server + "/bg_wave_1.png");	
	//manifestImage("bg_wave_2", images_from_server + "/bg_wave_2.png");	
	//manifestImage("bg_wave_3", images_from_server + "/bg_wave_3.png");	
	//manifestImage("bg_islands", images_from_server + "/bg_islands.png");	

	//manifestImage("bg_ocean", images_from_server + "/bg_ocean.png");
	//manifestImage("bg_ocean_glare", images_from_server + "/bg_ocean_glare.png");

	manifestImage("bg_cutscene", images_from_server + "/bg_cutscene.png");
	
	
	// *** wl (woordenlijst)
	// wlPreload();
	
	startPreload();
}

// *** Create manifest (collection of images/sounds) for preloading and use in game
function loadManifest()
{
	// *** Preload of sounds
	if(!gameEngine["globalAudioDisabled"])
	{	
		manifestSound("sword", sounds_from_server + "/sword.mp3");
		// manifestSound("gunshot", sounds_from_server + "/gunshot.mp3");
		//manifestSound("menu_select", sounds_from_server + "/menu_select.mp3");
		//manifestSound("menu_unselect", sounds_from_server + "/menu_unselect.mp3");
		manifestSound("start_game", sounds_from_server + "/start_game.mp3");

		//manifestSound("underwater", sounds_from_server + "/underwater.mp3");
		manifestSound("correct", sounds_from_server + "/correct.mp3");
		manifestSound("wrong", sounds_from_server + "/wrong.mp3");

		manifestSound("woohoo", sounds_from_server + "/woohoo.mp3");
		manifestSound("oops", sounds_from_server + "/oops.mp3");
		manifestSound("music_2", sounds_from_server + "/music_new.mp3");
		manifestSound("music_1", sounds_from_server + "/music_new_2.mp3");
		manifestSound("music_3", sounds_from_server + "/music_new_3.mp3");
		//manifestSound("step_1", sounds_from_server + "/step_1.mp3");
		//manifestSound("step_2", sounds_from_server + "/step_2.mp3");
		//manifestSound("whoop", sounds_from_server + "/whoop.mp3");
		//manifestSound("coin", sounds_from_server + "/coin.mp3");

		//manifestSound("bubbling", sounds_from_server + "/bubbling.mp3");
		//manifestSound("bubble_heavy", sounds_from_server + "/bubble_heavy.mp3");
		//manifestSound("bubble_light", sounds_from_server + "/bubble_light.mp3");

		//manifestSound("watergun", sounds_from_server + "/watergun.mp3");
		//manifestSound("fish_end", sounds_from_server + "/fish_end.mp3");
		//manifestSound("bad", sounds_from_server + "/bad.mp3");

		//manifestSound("pok", sounds_from_server + "/pok.mp3");
		//manifestSound("pok2", sounds_from_server + "/pok2.mp3");
		//manifestSound("rocketlaunch", sounds_from_server + "/rocketlaunch.mp3");
		//manifestSound("rocketstart", sounds_from_server + "/rocketstart.mp3");
		manifestSound("fanfare", sounds_from_server + "/fanfare.mp3");
		
		//manifestSound("hit", sounds_from_server + "/hit.mp3");
		manifestSound("metal_hit", sounds_from_server + "/metal_hit.mp3");
		//manifestSound("pok_hat", sounds_from_server + "/pok_hat.mp3");
		//manifestSound("splash", sounds_from_server + "/splash.mp3");
		//manifestSound("bomb_falls", sounds_from_server + "/bomb_falls.mp3");
		//manifestSound("explosion2", sounds_from_server + "/explosion2.mp3");
		//manifestSound("aaugh", sounds_from_server + "/aaugh.mp3");
		manifestSound("notification", sounds_from_server + "/notification.mp3");

		manifestSound("mouse_click", sounds_from_server + "/mouse_click.mp3");
		manifestSound("mouse_click_2", sounds_from_server + "/mouse_click_3.mp3");
		manifestSound("mouse_error", sounds_from_server + "/mouse_error.mp3");
		manifestSound("mouse_succes", sounds_from_server + "/mouse_succes.mp3");

		manifestSound("coins", sounds_from_server + "/coins.mp3");
		manifestSound("doppler", sounds_from_server + "/doppler.mp3");
		manifestSound("cymbal", sounds_from_server + "/cymbal.mp3");

		manifestSound("thud", sounds_from_server + "/thud.mp3");
		manifestSound("ting", sounds_from_server + "/ting.mp3");

		//manifestSound("boat_engine", sounds_from_server + "/boat_engine.mp3");
		//manifestSound("swirl", sounds_from_server + "/swirl_4.mp3");

		manifestSound("applaude", sounds_from_server + "/applaude.mp3");

		manifestSound("music_during_game", sounds_from_server + "/music_during_game_4.mp3");
		
		//manifestSound("boom", sounds_from_server + "/boom.mp3");
		manifestSound("success", sounds_from_server + "/success.mp3");

		//manifestSound("voice_3_2_1_go", sounds_from_server + "/voice/3_2_1_go.mp3");
		manifestSound("voice_awesome", sounds_from_server + "/voice/awesome.mp3");
		manifestSound("voice_cool", sounds_from_server + "/voice/cool.mp3");
		manifestSound("voice_final_lap", sounds_from_server + "/voice/final_lap.mp3");
		manifestSound("voice_lap_three", sounds_from_server + "/voice/lap_three.mp3");
		manifestSound("voice_lap_two", sounds_from_server + "/voice/lap_two.mp3");
		manifestSound("voice_nice", sounds_from_server + "/voice/nice.mp3");
		manifestSound("voice_wicked", sounds_from_server + "/voice/wicked.mp3");
		manifestSound("voice_you_rock", sounds_from_server + "/voice/you_rock.mp3");
		manifestSound("voice_3", sounds_from_server + "/voice/3.mp3");
		manifestSound("voice_2", sounds_from_server + "/voice/2.mp3");
		manifestSound("voice_1", sounds_from_server + "/voice/1.mp3");
		manifestSound("voice_go", sounds_from_server + "/voice/go.mp3");

		manifestSound("car_crash_1", sounds_from_server + "/car_crash_1.mp3"); manifestSound("car_crash_1_muffled", sounds_from_server + "/car_crash_1_muffled.mp3");
		manifestSound("car_crash_2", sounds_from_server + "/car_crash_2.mp3"); manifestSound("car_crash_2_muffled", sounds_from_server + "/car_crash_2_muffled.mp3");
		manifestSound("car_crash_3", sounds_from_server + "/car_crash_3.mp3"); manifestSound("car_crash_3_muffled", sounds_from_server + "/car_crash_3_muffled.mp3");

		manifestSound("whipbong", sounds_from_server + "/whipbong.mp3");

		manifestSound("engine_1", sounds_from_server + "/engine_1.mp3");
		manifestSound("engine_2", sounds_from_server + "/engine_2.mp3");
		manifestSound("engine_3", sounds_from_server + "/engine_3.mp3");
		manifestSound("engine_4", sounds_from_server + "/engine_4.mp3");
		
	}
	
	//manifestImage("fg_1", images_from_server + "/fg_1.png");

	//manifestImage("bg_result", images_from_server + "/bg_result.png");
	//manifestImage("bg_score_1", images_from_server + "/bg_score_1.png");
	//manifestImage("bg_score_2", images_from_server + "/bg_score_2.png");
	//manifestImage("bg_score_3", images_from_server + "/bg_score_3.png");
	//manifestImage("bg_score_4", images_from_server + "/bg_score_4.png");
	//manifestImage("bg_explanation", images_from_server + "/bg_explanation.png");

	manifestImage("check", images_from_server + "/check.png");
	manifestImage("cross", images_from_server + "/cross.png");

	//manifestImage("progress_1", images_from_server + "/progress_1.png");
	//manifestImage("progress_2", images_from_server + "/progress_2.png");
	//manifestImage("progress_3", images_from_server + "/progress_3.png");
	//manifestImage("progress_big", images_from_server + "/progress_big.png");
	//manifestImage("progress_shadow", images_from_server + "/progress_shadow.png");

	manifestImage("answer", images_from_server + "/answer.png");
	manifestImage("answer_hover", images_from_server + "/answer_hover.png");
	manifestImage("answer_correct", images_from_server + "/answer_correct.png");
	manifestImage("answer_false", images_from_server + "/answer_false.png");

	//manifestImage("octopus_blink_1", images_from_server + "/octopus/blink_1.png");
	//manifestImage("octopus_blink_2", images_from_server + "/octopus/blink_2.png");
	//manifestImage("octopus_body", images_from_server + "/octopus/body.png");
	//manifestImage("octopus_smile_1", images_from_server + "/octopus/smile_1.png");
	//manifestImage("octopus_smile_2", images_from_server + "/octopus/smile_2.png");
	//manifestImage("octopus_tentacle_left", images_from_server + "/octopus/tentacle_left.png");
	//manifestImage("octopus_tentacle_right", images_from_server + "/octopus/tentacle_right.png");

	//manifestImage("bullet", images_from_server + "/bullet.png");
	//manifestImage("bullet_empty", images_from_server + "/bullet_empty.png");
	//manifestImage("heart_bg", images_from_server + "/heart_bg.png");
	//manifestImage("heart", images_from_server + "/heart.png");
	//manifestImage("heart_empty", images_from_server + "/heart_empty.png");

	//manifestImage("fg", images_from_server + "/fg.png");

	//manifestImage("player", images_from_server + "/player.png");
	//manifestImage("player_arrow", images_from_server + "/player_arrow.png");
	
	//manifestImage("visor", images_from_server + "/visor.png");
	manifestImage("finger", images_from_server + "/finger.png");
	manifestImage("finger_good", images_from_server + "/finger_good.png");

	manifestImage("level_editor_marker", images_from_server + "/level_editor_marker.png");


	// *** Cars
	for(i = 1; i <= 5; i++)
	{
		manifestImage("boat_" + i + "_large", images_from_server + "/boat/" + i + "/large.png");
		manifestImage("boat_" + i + "_large_shadow", images_from_server + "/boat/" + i + "/large_shadow.png");
		for(j = 1; j <= 5; j++) manifestImage("boat_" + i + "_large_upgrade_" + j, images_from_server + "/boat/" + i + "/large_upgrade_" + j + ".png");

		manifestImage("boat_" + i + "_small", images_from_server + "/boat/" + i + "/small.png");
		manifestImage("boat_" + i + "_small_shadow", images_from_server + "/boat/" + i + "/small_shadow.png");
		for(j = 1; j <= 5; j++) manifestImage("boat_" + i + "_small_upgrade_" + j, images_from_server + "/boat/" + i + "/small_upgrade_" + j + ".png");
		//for(j = 1; j <= 6; j++) manifestImage("boat_" + i + "_small_shadow_" + j, images_from_server + "/boat/" + i + "/small_shadow_" + j + ".png");
		
		manifestImage("boat_" + i + "_gloss_b", images_from_server + "/boat/" + i + "/gloss_b.png");
		manifestImage("boat_" + i + "_gloss_f", images_from_server + "/boat/" + i + "/gloss_f.png");
		manifestImage("boat_" + i + "_gloss_l", images_from_server + "/boat/" + i + "/gloss_l.png");
		manifestImage("boat_" + i + "_gloss_r", images_from_server + "/boat/" + i + "/gloss_r.png");

		manifestImage("boat_" + i + "_shade_b", images_from_server + "/boat/" + i + "/shade_b.png");
		manifestImage("boat_" + i + "_shade_f", images_from_server + "/boat/" + i + "/shade_f.png");
		manifestImage("boat_" + i + "_shade_l", images_from_server + "/boat/" + i + "/shade_l.png");
		manifestImage("boat_" + i + "_shade_r", images_from_server + "/boat/" + i + "/shade_r.png");		
	}

	for(j = 1; j <= 4; j++)
	{
		for(i = 2; i <= 10; i++)
		{
			manifestImage("boat_" + j + "_small_v" + i, images_from_server + "/boat/" + j + "/small_v" + i + ".png");
		}
	}
		
	for(i = 1; i <= 5; i++)
	{
		manifestImage("boat_5_small_v" + i, images_from_server + "/boat/5/small_v" + i + ".png");
	}	
	

	// *** Avatars	
	for(i = 1; i <= 56; i++) manifestImage("avatar_" + i, images_from_server + "/avatar/" + i + ".png");

	
	// *** Level
	for(i = 13; i <= 20; i++) manifestImage("level_object_" + i, images_from_server + "/level_object/" + i + ".png");
	//for(i = 1; i <= 7; i++) manifestImage("arrow_ocean_ripple_" + i, images_from_server + "/arrow_ocean_ripple/" + i + ".png");
	//for(i = 1; i <= 7; i++) manifestImage("arrow_right_ocean_ripple_" + i, images_from_server + "/arrow_right_ocean_ripple/" + i + ".png");
	//for(i = 1; i <= 9; i++) manifestImage("finishline_" + i, images_from_server + "/finishline/" + i + ".png");

	manifestImage("checkpoint", images_from_server + "/checkpoint.png");
	manifestImage("checkpoint_word", images_from_server + "/checkpoint_word.png");

	manifestImage("level_1", images_from_server + "/level/1.jpg");	
	manifestImage("level_2", images_from_server + "/level/2.jpg");	
	manifestImage("level_3", images_from_server + "/level/3.jpg");	
	

	// *** Select screen & UI
	manifestImage("bg_select", images_from_server + "/bg_select.png");
	
	for(i = 1; i <= 5; i++) { manifestImage("track_" + i, images_from_server + "/track/" + i + ".png"); manifestImage("track_" + i + "_select", images_from_server + "/track/" + i + "_select.png"); }
	

	manifestImage("game_ui_bg_avatar", images_from_server + "/game_ui/bg_avatar.png");
	manifestImage("game_ui_arrow_left", images_from_server + "/game_ui/arrow_left.png");
	manifestImage("game_ui_arrow_right", images_from_server + "/game_ui/arrow_right.png");
	manifestImage("game_ui_button", images_from_server + "/game_ui/button.png");				manifestImage("game_ui_button_hover", images_from_server + "/game_ui/button_hover.png");
	manifestImage("game_ui_button_add", images_from_server + "/game_ui/button_add.png");			manifestImage("game_ui_button_add_hover", images_from_server + "/game_ui/button_add_hover.png");
	manifestImage("game_ui_button_big", images_from_server + "/game_ui/button_big.png");			manifestImage("game_ui_button_big_hover", images_from_server + "/game_ui/button_big_hover.png");
	manifestImage("game_ui_button_boat", images_from_server + "/game_ui/button_boat.png");			manifestImage("game_ui_button_boat_hover", images_from_server + "/game_ui/button_boat_hover.png");	manifestImage("game_ui_button_boat_selected", images_from_server + "/game_ui/button_boat_selected.png");
	manifestImage("game_ui_button_small", images_from_server + "/game_ui/button_small.png");		manifestImage("game_ui_button_small_hover", images_from_server + "/game_ui/button_small_hover.png");
	manifestImage("game_ui_button_name", images_from_server + "/game_ui/button_name.png");			manifestImage("game_ui_button_name_hover", images_from_server + "/game_ui/button_name_hover.png");
	manifestImage("game_ui_star", images_from_server + "/game_ui/star.png");				manifestImage("game_ui_star_empty", images_from_server + "/game_ui/star_empty.png");
	manifestImage("game_ui_coin_big", images_from_server + "/game_ui/coin_big.png");			manifestImage("game_ui_coin_medium", images_from_server + "/game_ui/coin_medium.png");			manifestImage("game_ui_coin_small", images_from_server + "/game_ui/coin_small.png");
	manifestImage("game_ui_plus", images_from_server + "/game_ui/plus.png");
	manifestImage("game_ui_position_opponent", images_from_server + "/game_ui/position_opponent.png");	manifestImage("game_ui_position_player", images_from_server + "/game_ui/position_player.png");		manifestImage("game_ui_position_finished", images_from_server + "/game_ui/position_finished.png");
	manifestImage("game_ui_button_tiny", images_from_server + "/game_ui/button_tiny.png");

	manifestImage("game_ui_button_overlay", images_from_server + "/game_ui/button_overlay.png");		manifestImage("game_ui_button_overlay_modest", images_from_server + "/game_ui/button_overlay_modest.png");
	manifestImage("game_ui_button_overlay_selected", images_from_server + "/game_ui/button_overlay_selected.png");
	
	//manifestImage("steering_bg", images_from_server + "/steering_bg.png");
	//manifestImage("steering_ball", images_from_server + "/steering_ball.png");

	manifestImage("speedometer_bg", images_from_server + "/speedometer/bg.png");
	for(i = 1; i <= 14; i++) manifestImage("speedometer_" + i, images_from_server + "/speedometer/" + i + ".png");

	manifestImage("minimap_marker_editor", images_from_server + "/minimap/marker_editor.png");
	manifestImage("minimap_marker_opponent", images_from_server + "/minimap/marker_opponent.png");
	manifestImage("minimap_marker_player", images_from_server + "/minimap/marker_player.png");

	manifestImage("pointer", images_from_server + "/pointer.png");

	manifestImage("ranking_bg", images_from_server + "/ranking/bg.png");
	manifestImage("ranking_box", images_from_server + "/ranking/box.png");
	manifestImage("ranking_top", images_from_server + "/ranking/top.png");

		
	bufferSound();
	startPreload();

}

var wl = { };

// *** Game and gameplay
var game = {

	"orientation" : "landscape", // *** landscape or portrait. Also change the class/dimensions in the canvas-tag in the index-file
	"width" : 1400,  // *** Landscape: 1400, Portrait: 640
	"height" : 700, // *** Landscape: 700,  Portrait: 920
	
	"gamePreloaded" : false,
		
	"identifier" : "boat_race",
			
	"backButton" : "", // *** URL backbutton (X) leads to, leave empty for history.go(-1)
	"status" : "", // *** General game status: "" (playing), INTRO (startscreen), HIGHSCORES (after play)
	"score" : 0, // *** Score of player
	"music" : "",	"loopingMusic" : 1,
	"mouseX" : 0, 	"mouseY" : 0, // *** Mouse position is untrustworthy as touch-devices don't support this
	"dragging" : false,	"draggingCheck" : false,	"draggingX" : 0,	"draggingY" : 0,	
	"keyCount" : 0,
	"gravity" : 1, // *** Gravity to make objects fall
	"bouncyness" : 0.5, // *** How high does objects bounce back up
	"pulsate" : 0, "pulsateCos" : 0, "pulsateX" : 0, "pulsateSpeed" : 0.25,
	"pulsateFish" : 0, "pulsateFishCos" : 0, "pulsateFishX" : 0, "pulsateFishSpeed" : 0.05,
	
	"highscoreName" : getCookie("highscoreName"),	"highscoreEmail" : getCookie("highscoreEmail"),		"highscoreAgreedTerms" : getCookie("highscoreAgreedTerms"),	"highscoreNewsletter" : getCookie("highscoreNewsletter"),	
	"highscoreGamePlay" : "", "highscoreListSize" : 11, "highscoreListLineheight" : 47, "highscoreListScroll" : 0, "highscoreListBusy" : false,
	"highscoreList" : new Array(),

	"count" : 0,
	"statusAni" : "",

	"round" : 0,	"rounds" : 10,
	
	"question" : 0,		"questions" : 15,	"questionShowProgress" : true,		"questionShowProgressAmount" : 5,	
	"clickedAnswer" : 0,

	"try" : 0,
	"answer" : { 1 : {}, 2 : {}, 3 : {}, },	
	"wl" : -1,	"wordTyped" : "",	"wordSyllable" : {},	"wordSyllableCount" : 0,	"wordCount" : 0,	"wordFrequency" : 50,


	"boat" : 
	{
		1 : { /* *** Orange car *** */
		
			"bought" : true,
			"price" : 1000,
			"engineAngle1" : 170, 	"engineDistance1" : 46,		"engineAngle2" : 170, 	"engineDistance2" : 40,
			"collisionPoint1" : { "angle" : 0, "distance" : 42 },		"collisionPoint2" : { "angle" : -22, "distance" : 43 },		"collisionPoint3" : { "angle" : 22, "distance" : 43 },		"collisionPoint4" : { "angle" : 158, "distance" : 43 },		"collisionPoint5" : { "angle" : -158, "distance" : 43 },	"collisionPoint6" : { "angle" : 180, "distance" : 42 },
			"collisionDetectorLength" : 44, "collisionCircleWidth" : 18, "collitionCircleDistance" : 27,
			
			"upgrade1" : { "title" : "Acceleratie", "desc" : "Trek sneller op!", "upgradesDone" : 0,
				
				0 : { "cost" : 0,   "value" : 0.40 },
				1 : { "cost" : 200, "value" : 0.55 },
				2 : { "cost" : 250, "value" : 0.70 },
				3 : { "cost" : 300, "value" : 0.85 },
				4 : { "cost" : 350, "value" : 1.00 },
				5 : { "cost" : 400, "value" : 1.15 },
			},

			"upgrade2" : { "title" : "Manouvreren", "desc" : "Draai sneller naar links en rechts!", "upgradesDone" : 0,
				
				0 : { "cost" : 0,   "value" : 0.90 },
				1 : { "cost" : 200, "value" : 1.00 },
				2 : { "cost" : 350, "value" : 1.10 },
				3 : { "cost" : 500, "value" : 1.20 },
				4 : { "cost" : 650, "value" : 1.30 },
				5 : { "cost" : 800, "value" : 1.40 },
			},
								
			"upgrade3" : { "title" : "Topsnelheid", "desc" : "Ga harder en harder!", "upgradesDone" : 0,
				
				0 : { "cost" : 0,   	  "value" : 10 + 2 },
				1 : { "cost" : 300 + 150, "value" : 11 + 2 },
				2 : { "cost" : 500 + 150, "value" : 12 + 2 },
				3 : { "cost" : 700 + 150, "value" : 13 + 2 },
				4 : { "cost" : 900 + 150, "value" : 14 + 2 },
				5 : { "cost" : 1100 + 150, "value" : 15 + 2 },
			},

			"upgrade4" : { "title" : "Geldverdiener", "desc" : "Meer coins als je 1e, 2e of 3e wordt!", "upgradesDone" : 0,
				
				0 : { "cost" : 0,   "value" : 1.0 },
				1 : { "cost" : 225, "value" : 1.2 },
				2 : { "cost" : 325, "value" : 1.4 },
				3 : { "cost" : 425, "value" : 1.6 },
				4 : { "cost" : 525, "value" : 1.8 },
				5 : { "cost" : 625, "value" : 2.0 },
			},
				
			"upgrade5" : { "title" : "Startboost", "desc" : "Scheur weg als je start!", "upgradesDone" : 0,
				
				0 : { "cost" : 0,   "value" : 0 },
				1 : { "cost" : 100, "value" : 25 },
				2 : { "cost" : 125, "value" : 50 },
				3 : { "cost" : 150, "value" : 75 },
				4 : { "cost" : 175, "value" : 100 },
				5 : { "cost" : 200, "value" : 125 },
			},
		
		},

		2 : {
			"bought" : false,
			"price" : 995,
			"engineAngle1" : 180, 	"engineDistance1" : 40,		"engineAngle2" : 0, 	"engineDistance2" : 0,
			"collisionPoint1" : { "angle" : 0, "distance" : 52 },	"collisionPoint2" : { "angle" : -21, "distance" : 48 },		"collisionPoint3" : { "angle" : 21, "distance" : 48 },	"collisionPoint4" : { "angle" : 159, "distance" : 48 },		"collisionPoint5" : { "angle" : -159, "distance" : 48 },			"collisionPoint6" : { "angle" : 180, "distance" : 54 },
			"collisionDetectorLength" : 50, "collisionCircleWidth" : 19, "collitionCircleDistance" : 31,
			
			"upgrade1" : { "title" : "Acceleratie", "desc" : "Trek sneller op!", "upgradesDone" : 0,
				
				0 : { "cost" : 0,   "value" : 0.40 + 0.40 },
				1 : { "cost" : 200, "value" : 0.55 + 0.40 },
				2 : { "cost" : 250, "value" : 0.70 + 0.40 },
				3 : { "cost" : 300, "value" : 0.85 + 0.40 },
				4 : { "cost" : 350, "value" : 1.00 + 0.40 },
				5 : { "cost" : 400, "value" : 1.15 + 0.40 },

			},

			"upgrade2" : { "title" : "Manouvreren", "desc" : "Draai sneller naar links en rechts!", "upgradesDone" : 0,	
							
				0 : { "cost" : 0,   "value" : 0.90 + 0.20 },
				1 : { "cost" : 200, "value" : 1.00 + 0.20 },
				2 : { "cost" : 350, "value" : 1.10 + 0.20 },
				3 : { "cost" : 500, "value" : 1.20 + 0.20 },
				4 : { "cost" : 650, "value" : 1.30 + 0.20 },
				5 : { "cost" : 800, "value" : 1.40 + 0.20 },
				
			},
								
			"upgrade3" : { "title" : "Topsnelheid", "desc" : "Ga harder en harder!", "upgradesDone" : 0,
				
				0 : { "cost" : 0,   "value" : 10 + 6 },
				1 : { "cost" : 300 + 150, "value" : 11 + 6 },
				2 : { "cost" : 500 + 150, "value" : 12 + 6 },
				3 : { "cost" : 700 + 150, "value" : 13 + 6 },
				4 : { "cost" : 900 + 150, "value" : 14 + 6 },
				5 : { "cost" : 1100 + 150, "value" : 15 + 6 },

			},

			"upgrade4" : { "title" : "Geldverdiener", "desc" : "Meer coins als je 1e, 2e of 3e wordt!", "upgradesDone" : 0,
				
				0 : { "cost" : 0,   "value" : 1.0 },
				1 : { "cost" : 225, "value" : 1.2 },
				2 : { "cost" : 325, "value" : 1.4 },
				3 : { "cost" : 425, "value" : 1.6 },
				4 : { "cost" : 525, "value" : 1.8 },
				5 : { "cost" : 625, "value" : 2.0 },
			},
			
			"upgrade5" : { "title" : "Startboost", "desc" : "Scheur weg als je start!", "upgradesDone" : 0,
				
				0 : { "cost" : 0,   "value" : 0 },
				1 : { "cost" : 100, "value" : 25 },
				2 : { "cost" : 125, "value" : 50 },
				3 : { "cost" : 150, "value" : 75 },
				4 : { "cost" : 175, "value" : 100 },
				5 : { "cost" : 200, "value" : 125 },
			},		
		},
	
		3 : {
			"bought" : false,
			"price" : 1995,
			"engineAngle1" : 175, 	"engineDistance1" : 40,		"engineAngle2" : 185, 	"engineDistance2" : 40,
			"collisionPoint1" : { "angle" : 0, "distance" : 43 },		"collisionPoint2" : { "angle" : -24, "distance" : 40 },		"collisionPoint3" : { "angle" : 24, "distance" : 40 },		"collisionPoint4" : { "angle" : 156, "distance" : 40 },		"collisionPoint5" : { "angle" : -156, "distance" : 40 },		"collisionPoint6" : { "angle" : 180, "distance" : 43 },
			"collisionDetectorLength" : 43, "collisionCircleWidth" : 18, "collitionCircleDistance" : 25,
			
			"upgrade1" : { "title" : "Acceleratie", "desc" : "Trek sneller op!", "upgradesDone" : 0,
				
				0 : { "cost" : 0,   "value" : 0.40 + 0.60 },
				1 : { "cost" : 200, "value" : 0.55 + 0.60 },
				2 : { "cost" : 250, "value" : 0.70 + 0.60 },
				3 : { "cost" : 300, "value" : 0.85 + 0.60 },
				4 : { "cost" : 350, "value" : 1.00 + 0.60 },
				5 : { "cost" : 400, "value" : 1.15 + 0.60 },

			},

			"upgrade2" : { "title" : "Manouvreren", "desc" : "Draai sneller naar links en rechts!", "upgradesDone" : 0,
								
				0 : { "cost" : 0,   "value" : 0.90 + 0.30 },
				1 : { "cost" : 200, "value" : 1.00 + 0.30 },
				2 : { "cost" : 350, "value" : 1.10 + 0.30 },
				3 : { "cost" : 500, "value" : 1.20 + 0.30 },
				4 : { "cost" : 650, "value" : 1.30 + 0.30 },
				5 : { "cost" : 800, "value" : 1.40 + 0.30 },
			},
								
			"upgrade3" : { "title" : "Topsnelheid", "desc" : "Ga harder en harder!", "upgradesDone" : 0,
				
				0 : { "cost" : 0,   "value" : 10 + 10 },
				1 : { "cost" : 300 + 150, "value" : 11 + 10 },
				2 : { "cost" : 500 + 150, "value" : 12 + 10 },
				3 : { "cost" : 700 + 150, "value" : 13 + 10 },
				4 : { "cost" : 900 + 150, "value" : 14 + 10 },
				5 : { "cost" : 1100 + 150, "value" : 15 + 10 },
			},

			"upgrade4" : { "title" : "Geldverdiener", "desc" : "Meer coins als je 1e, 2e of 3e wordt!", "upgradesDone" : 0,
				
				0 : { "cost" : 0,   "value" : 1.0 },
				1 : { "cost" : 225, "value" : 1.2 },
				2 : { "cost" : 325, "value" : 1.4 },
				3 : { "cost" : 425, "value" : 1.6 },
				4 : { "cost" : 525, "value" : 1.8 },
				5 : { "cost" : 625, "value" : 2.0 },
			},
			
			"upgrade5" : { "title" : "Startboost", "desc" : "Scheur weg als je start!", "upgradesDone" : 0,
				
				0 : { "cost" : 0,   "value" : 0 },
				1 : { "cost" : 100, "value" : 25 },
				2 : { "cost" : 125, "value" : 50 },
				3 : { "cost" : 150, "value" : 75 },
				4 : { "cost" : 175, "value" : 100 },
				5 : { "cost" : 200, "value" : 125 },
			},		
		},
	
		4 : {
			"bought" : false,
			"price" : 2995,
			"engineAngle1" : 170, 	"engineDistance1" : 45,			"engineAngle2" : 190, 	"engineDistance2" : 45,
			"collisionPoint1" : { "angle" : 0, "distance" : 50 },		"collisionPoint2" : { "angle" : -21, "distance" : 48 },		"collisionPoint3" : { "angle" : 21, "distance" : 48 },		"collisionPoint4" : { "angle" : 159, "distance" : 48 },		"collisionPoint5" : { "angle" : -159, "distance" : 48 },		"collisionPoint6" : { "angle" : 180, "distance" : 51 },		
			"collisionDetectorLength" : 50, "collisionCircleWidth" : 19, "collitionCircleDistance" : 31,
			
			
			"upgrade1" : { "title" : "Acceleratie", "desc" : "Trek sneller op!", "upgradesDone" : 0,
				
				0 : { "cost" : 0,   "value" : 0.40 + 0.80 },
				1 : { "cost" : 200, "value" : 0.55 + 0.80 },
				2 : { "cost" : 250, "value" : 0.70 + 0.80 },
				3 : { "cost" : 300, "value" : 0.85 + 0.80 },
				4 : { "cost" : 350, "value" : 1.00 + 0.80 },
				5 : { "cost" : 400, "value" : 1.15 + 0.80 },

			},

			"upgrade2" : { "title" : "Manouvreren", "desc" : "Draai sneller naar links en rechts!", "upgradesDone" : 0,
								
				0 : { "cost" : 0,   "value" : 0.90 + 0.40 },
				1 : { "cost" : 200, "value" : 1.00 + 0.40 },
				2 : { "cost" : 350, "value" : 1.10 + 0.40 },
				3 : { "cost" : 500, "value" : 1.20 + 0.40 },
				4 : { "cost" : 650, "value" : 1.30 + 0.40 },
				5 : { "cost" : 800, "value" : 1.40 + 0.40 },
			},
								
			"upgrade3" : { "title" : "Topsnelheid", "desc" : "Ga harder en harder!", "upgradesDone" : 0,
				
				0 : { "cost" : 0,   "value" : 10 + 14 },
				1 : { "cost" : 300 + 150, "value" : 11 + 14 },
				2 : { "cost" : 500 + 150, "value" : 12 + 14 },
				3 : { "cost" : 700 + 150, "value" : 13 + 14 },
				4 : { "cost" : 900 + 150, "value" : 14 + 14 },
				5 : { "cost" : 1100 + 150, "value" : 15 + 14 },

			},

			"upgrade4" : { "title" : "Geldverdiener", "desc" : "Meer coins als je 1e, 2e of 3e wordt!", "upgradesDone" : 0,
				
				0 : { "cost" : 0,   "value" : 1.0 },
				1 : { "cost" : 225, "value" : 1.2 },
				2 : { "cost" : 325, "value" : 1.4 },
				3 : { "cost" : 425, "value" : 1.6 },
				4 : { "cost" : 525, "value" : 1.8 },
				5 : { "cost" : 625, "value" : 2.0 },
			},
				
			"upgrade5" : { "title" : "Startboost", "desc" : "Scheur weg als je start!", "upgradesDone" : 0,
				
				0 : { "cost" : 0,   "value" : 0 },
				1 : { "cost" : 100, "value" : 25 },
				2 : { "cost" : 125, "value" : 50 },
				3 : { "cost" : 150, "value" : 75 },
				4 : { "cost" : 175, "value" : 100 },
				5 : { "cost" : 200, "value" : 125 },
			},		
		},
		
		5 : { /* *** Slow truck *** */
		
			"bought" : true,
			"price" : 1000,
			"engineAngle1" : 170, 	"engineDistance1" : 46,		"engineAngle2" : 170, 	"engineDistance2" : 40,
			"collisionPoint1" : { "angle" : 0, "distance" : 50 },		"collisionPoint2" : { "angle" : -22, "distance" : 46 },		"collisionPoint3" : { "angle" : 22, "distance" : 46 },		"collisionPoint4" : { "angle" : 158, "distance" : 46 },		"collisionPoint5" : { "angle" : -158, "distance" : 46 },	"collisionPoint6" : { "angle" : 180, "distance" : 50 },
			"collisionDetectorLength" : 49, "collisionCircleWidth" : 19, "collitionCircleDistance" : 31,
			
			"upgrade1" : { "title" : "Acceleratie", "desc" : "Trek sneller op!", "upgradesDone" : 0,
				
				0 : { "cost" : 0,   "value" : 0.40 },
				1 : { "cost" : 200, "value" : 0.55 },
				2 : { "cost" : 250, "value" : 0.70 },
				3 : { "cost" : 300, "value" : 0.85 },
				4 : { "cost" : 350, "value" : 1.00 },
				5 : { "cost" : 400, "value" : 1.15 },
			},

			"upgrade2" : { "title" : "Manouvreren", "desc" : "Draai sneller naar links en rechts!", "upgradesDone" : 0,
				
				0 : { "cost" : 0,   "value" : 0.90 },
				1 : { "cost" : 200, "value" : 1.00 },
				2 : { "cost" : 350, "value" : 1.10 },
				3 : { "cost" : 500, "value" : 1.20 },
				4 : { "cost" : 650, "value" : 1.30 },
				5 : { "cost" : 800, "value" : 1.40 },
			},
								
			"upgrade3" : { "title" : "Topsnelheid", "desc" : "Ga harder en harder!", "upgradesDone" : 0,
				
				0 : { "cost" : 0,   "value" : 8 },
				1 : { "cost" : 300 + 150, "value" : 10 },
				2 : { "cost" : 500 + 150, "value" : 12 },
				3 : { "cost" : 700 + 150, "value" : 14 },
				4 : { "cost" : 900 + 150, "value" : 16 },
				5 : { "cost" : 1100 + 150, "value" : 18 },
			},

			"upgrade4" : { "title" : "Geldverdiener", "desc" : "Meer coins als je 1e, 2e of 3e wordt!", "upgradesDone" : 0,
				
				0 : { "cost" : 0,   "value" : 1.0 },
				1 : { "cost" : 225, "value" : 1.4 },
				2 : { "cost" : 325, "value" : 1.8 },
				3 : { "cost" : 425, "value" : 2.2 },
				4 : { "cost" : 525, "value" : 2.6 },
				5 : { "cost" : 625, "value" : 3.0 },
			},
				
			"upgrade5" : { "title" : "Startboost", "desc" : "Scheur weg als je start!", "upgradesDone" : 0,
				
				0 : { "cost" : 0,   "value" : 0 },
				1 : { "cost" : 100, "value" : 25 },
				2 : { "cost" : 125, "value" : 50 },
				3 : { "cost" : 150, "value" : 75 },
				4 : { "cost" : 175, "value" : 100 },
				5 : { "cost" : 200, "value" : 125 },
			},
		
		},
		
	},
		
	"logoFlash" : 0,

	"collectable" : 1,	"collectableX" : 0,	"collectableY" : 0,	"collectableDestX" : 0,		"collectableDestY" : 0,		"collectableXspeed" : 0,	"collectableYspeed" : 0,	"collectableYjump" : 0,		"collectableYjumpGravity" : 0,	"collectableR" : 0,	"collectableSnap" : false,

	"sentenceGlitterBox" : "",	"reshowKeyboard" : false,	"FeedbackText" : "",	"wrongWords" : {},	"octopusBlink" : 0,	"octopusSmile" : 0,	"collectableFish" : {  },
	"backgroundSpeed" : -2,		"backgroundBg" : 0,	"backgroundDecoration" : 0,	"backgroundWatersurface" : 0,		"backgroundBottom" : 0,
	"playerExtraY" : 0,	"playerExtraSpeed" : 0,		"playerExtraSpeedCount" : 0,		"playerMultiplier" : 1,		"playerMultiplierCount" : 0,		"playerArrow" : 0,	"playerArrowCount" : 0,		"playerBaseY" : 365,	"playerR" : 0,	"playerFin" : 0,		"playerBlink" : 0,	
	"playerBullets" : 30,	"playerBulletsMax" : 30,	"playerLevel" : 1,	"playerLevelCurr" : 1,	"playerFetches" : false,	"playerFetchesCount" : 0,	"playerNextLevel" : false,
	"freeze" : false,	"questionsCorrect" : 0,		"sentenceExtraY" : 0,
	
	"playerHearts" : 10,	"playerHeartsMax" : 10,	"playerDead" : false, "playerDeadYspeed" : 0,
		
	"noAutoStartMusic" : true,
	
	"bgOceanX" : 0,		"bgOceanY" : 0,

	"selectScreenFirstTime" : true,

	"avatar" : Math.ceil(Math.random()*56),
	"avatarName" : "Speler " + Math.ceil(Math.random()*100000),
	"coins" : 0,
	"raceCost" : 25,

	"trackCurrent" : 1,
	"trackWin1" : 500,
	"trackWin2" : 250,
	"trackWin3" : 125,

	"track" : 
	{	
		1 : { "name" : "Backyard Bash", 	"best" : 0.00,	"bestCompare" : 167.00, },
		2 : { "name" : "Desert Derby", 		"best" : 0.00,	"bestCompare" : 190.00, },
		3 : { "name" : "Stonehill Stampede",	"best" : 0.00,	"bestCompare" : 180.00, },
		4 : { "name" : "", 			"best" : 0.00,	"bestCompare" : 190.00, },
		5 : { "name" : "", 			"best" : 0.00,	"bestCompare" : 210.00, },
	},
	
	"lap" : 1,
	"checkpoint" : 1,
	"checkpointCount" : 0,
	"position" : 0, "positionY" : 0, 
	"positionFinish" : 0,
		
	"finished" : false, 	
	"raceStarted" : false,
	"raceCountdown" : 0,
	"raceEnded" : false,
	"raceEndedTime" : 0,
	"raceCounter" : 0,
	"raceOpponents" : 4,
	"raceProgress" : 0,
	"raceTime" : 0,
	"raceTimeMilli" : 0,
	"racesFinished" : 0,

	"playerAcceleration" : 1, // 0.6 - 2.0 (acceleratie)
	"playerMaxspeed" : 20, // 10 - 30 (topsnelheid)
	"playerRotationSpeed" : 1, // 0.5 - 1.0 (manouvreren)
	"playerStartBoost" : 100, // 0.5 - 1.0 (manouvreren)

	"playerX" : 0,
	"playerY" : 0,
	"playerR" : 0,
	"playerSpeed" : 0,	
	"playerXspeed" : 0,
	"playerYspeed" : 0,
	"playerRspeed" : 0,
	"playerRextra" : 0, // drift illusion
	"playerWord" : "",
	"playerWordSpelled" : "",

	"selectedBoat" : 1,

	"playerShadowAni" : 1,
	"playerShadowAniCount" : 1,

	"levelcreator" : false,
	"levelcreatorItem" : 1,
	"levelcreatorLastItem" : 0,
	"levelcreatorMinimapMarkers" : 0,
		
	"driverKeys" : false,
	"driverSpeed" : 0,
	"driverTurnSpeed" : 0,
	"driverR" : 0,
	"driverAcceleration" : 0,
	
	"touchAction" : "",
	"touchSpeed" : 0,

	"showCutscene" : 0,
	"endedRaceManually" : false,

	"cookie" : "",
	
	"carCrashSoundCounter" : 0,
	
	"opponent" : {
	
		/* Orange */ 1 : { "car" : 1, "carVariation" : 1, "x" : -80, "y" : -120, "r" : 180, "position" : 0, "positionY" : 0, "raceProgress" : 0, "checkpointProgress" : 1, "checkpoint" : 5, "speed" : 20 - 0, "speedCur" : 0, "speedAcceleration" : 0.45, "rSpeed" : 0.50, "rSpeedCur" : 0, "trackManipulation" : 0, "name" : "Orange", "avatar" : 1 },
		/* White */  2 : { "car" : 2, "carVariation" : 1, "x" : 0,   "y" : -120, "r" : 180, "position" : 0, "positionY" : 0, "raceProgress" : 0, "checkpointProgress" : 1, "checkpoint" : 5, "speed" : 21 - 0, "speedCur" : 0, "speedAcceleration" : 0.50, "rSpeed" : 0.55, "rSpeedCur" : 0, "trackManipulation" : 0, "name" : "White", "avatar" : 2 },
		/* Blue */   3 : { "car" : 3, "carVariation" : 1, "x" : 80,  "y" : -120, "r" : 180, "position" : 0, "positionY" : 0, "raceProgress" : 0, "checkpointProgress" : 1, "checkpoint" : 5, "speed" : 22 - 0, "speedCur" : 0, "speedAcceleration" : 0.60, "rSpeed" : 0.60, "rSpeedCur" : 0, "trackManipulation" : 0, "name" : "Blue", "avatar" : 3 },
		/* Black */  4 : { "car" : 4, "carVariation" : 1, "x" : -80, "y" : 0,    "r" : 180, "position" : 0, "positionY" : 0, "raceProgress" : 0, "checkpointProgress" : 1, "checkpoint" : 5, "speed" : 23 - 0, "speedCur" : 0, "speedAcceleration" : 0.70, "rSpeed" : 0.65, "rSpeedCur" : 0, "trackManipulation" : 0, "name" : "Black1", "avatar" : 4 },
		/* Black */  5 : { "car" : 4, "carVariation" : 1, "x" : 80,  "y" : 0,    "r" : 180, "position" : 0, "positionY" : 0, "raceProgress" : 0, "checkpointProgress" : 1, "checkpoint" : 5, "speed" : 24 - 0, "speedCur" : 0, "speedAcceleration" : 0.70, "rSpeed" : 0.65, "rSpeedCur" : 0, "trackManipulation" : 0, "name" : "Black2", "avatar" : 5 },

	},
	
	/* Speed tot 24. Acceleration tot wellicht 0.70. rSpeed wellicht 0.65 */
	"opponentCheckpointCount" : 1,
	
	"opponentCheckpoint" : {
	
		1 : { "x" : 600, "y" : 250 },
		2 : { "x" : 400, "y" : 250 },
		3 : { "x" : 300, "y" : 350 },
		4 : { "x" : 250, "y" : 550 },
		5 : { "x" : 350, "y" : 650 },
		6 : { "x" : 550, "y" : 600 },
		7 : { "x" : 700, "y" : 450 },
		8 : { "x" : 900, "y" : 200 },
		9 : { "x" : 1100, "y" : 200 },
		10 : { "x" : 1200, "y" : 350 },
		11 : { "x" : 1200, "y" : 500 },
		12 : { "x" : 1100, "y" : 600 },
		13 : { "x" : 900, "y" : 600 },
		14 : { "x" : 800, "y" : 500 },
		15 : { "x" : 700, "y" : 400 },
		
	},
	
	"countCheckpoint" : 0,

	"pickWordCounter" : 0,


	"rankingPos" : 100,
	"rankingPosPrev" : 100,
	"rankingY" : 0,
		
	// *** wl
	"wlSelect" : 
	{
		1 : { 0 : { "name" : "Groep 4", "id" : 4 }, 1 : { "name" : "Groep 5", "id" : 5 }, 2 : { "name" : "Groep 6", "id" : 6 }, 3 : { "name" : "Groep 7", "id" : 7 }, 4 : { "name" : "Groep 8", "id" : 8 }, }, 
		2 : { }, 	
		3 : { }, 	
		4 : { }, 
		"selected" : { 1 : { 0 : false, }, 2 : { 0 : false, }, 3 : { 0 : false, }, 4 : { 0 : false, }, }, 
		"page" : { 1 : 0, 2 : 0, 3 : 0, 4 : 0, }, 
		"hasAllAsFistOption" : { 1 : false, 2 : true, 3 : true, 4 : true, }, 		
		"hasPagination" : { 1 : false, 2 : true, 3 : true, 4 : true, }, 		
		"multipleSelect" : { 1 : false, 2 : false, 3 : true, 4 : true, }, 
		"busy" : false,
		"amount" : 0,
		"amountShow" : 0,
	},	
		
};

var opponent = { };

var opponentInfo = {

	1  : { "avatar" : 1,  "car" : 4, "carVariation" : 10, "speed" : 27, "speedAcceleration" : 1.10, "rSpeed" : 0.80, "name" : "Troy Turbo Turner" },
	2  : { "avatar" : 2,  "car" : 4, "carVariation" : 9,  "speed" : 26, "speedAcceleration" : 1.05, "rSpeed" : 0.78, "name" : "Roxy Racer Rivers" },
	3  : { "avatar" : 3,  "car" : 4, "carVariation" : 8,  "speed" : 26, "speedAcceleration" : 1.00, "rSpeed" : 0.76, "name" : "Knox Kinetics Knight" },
	4  : { "avatar" : 4,  "car" : 4, "carVariation" : 7,  "speed" : 26, "speedAcceleration" : 1.00, "rSpeed" : 0.76, "name" : "Chase Charge Carter" },
	5  : { "avatar" : 5,  "car" : 3, "carVariation" : 10, "speed" : 25, "speedAcceleration" : 0.95, "rSpeed" : 0.74, "name" : "Jace Jet Jones" },
	6  : { "avatar" : 6,  "car" : 4, "carVariation" : 6,  "speed" : 25, "speedAcceleration" : 0.95, "rSpeed" : 0.74, "name" : "Nash Nitrous Novak" },
	7  : { "avatar" : 7,  "car" : 3, "carVariation" : 9,  "speed" : 25, "speedAcceleration" : 0.95, "rSpeed" : 0.74, "name" : "Mira Motion Mason" },
	8  : { "avatar" : 8,  "car" : 3, "carVariation" : 8,  "speed" : 25, "speedAcceleration" : 0.95, "rSpeed" : 0.74, "name" : "Leila Laps Lewis" },
	9  : { "avatar" : 9,  "car" : 2, "carVariation" : 10, "speed" : 25, "speedAcceleration" : 0.95, "rSpeed" : 0.74, "name" : "Zane Zephyr Ziegler" },
	10 : { "avatar" : 10, "car" : 4, "carVariation" : 5,  "speed" : 25, "speedAcceleration" : 0.95, "rSpeed" : 0.74, "name" : "Blake Boost Bennett" },
	11 : { "avatar" : 11, "car" : 3, "carVariation" : 7,  "speed" : 24, "speedAcceleration" : 0.95, "rSpeed" : 0.74, "name" : "Willow Whirlwind Walters" },
	12 : { "avatar" : 12, "car" : 1, "carVariation" : 2,  "speed" : 24, "speedAcceleration" : 0.95, "rSpeed" : 0.74, "name" : "Isla Ignition Ingram" },
	13 : { "avatar" : 13, "car" : 4, "carVariation" : 4,  "speed" : 24, "speedAcceleration" : 0.90, "rSpeed" : 0.72, "name" : "Levi Lightning Long" },
	14 : { "avatar" : 14, "car" : 4, "carVariation" : 3,  "speed" : 24, "speedAcceleration" : 0.90, "rSpeed" : 0.72, "name" : "Kiera Kicker Kennedy" },
	15 : { "avatar" : 15, "car" : 4, "carVariation" : 2,  "speed" : 24, "speedAcceleration" : 0.90, "rSpeed" : 0.72, "name" : "Ruby Rev Reynolds" },
	16 : { "avatar" : 16, "car" : 3, "carVariation" : 6,  "speed" : 24, "speedAcceleration" : 0.90, "rSpeed" : 0.72, "name" : "Finn Flyer Foster" },
	17 : { "avatar" : 17, "car" : 4, "carVariation" : 3,  "speed" : 23, "speedAcceleration" : 0.90, "rSpeed" : 0.72, "name" : "Sadie Speedster Sullivan" },
	18 : { "avatar" : 18, "car" : 3, "carVariation" : 5,  "speed" : 23, "speedAcceleration" : 0.90, "rSpeed" : 0.72, "name" : "Cole Cruiser Carter" },
	19 : { "avatar" : 19, "car" : 4, "carVariation" : 4,  "speed" : 23, "speedAcceleration" : 0.90, "rSpeed" : 0.72, "name" : "Briar Blitz Blake" },
	20 : { "avatar" : 20, "car" : 4, "carVariation" : 5,  "speed" : 23, "speedAcceleration" : 0.90, "rSpeed" : 0.72, "name" : "Logan Lancer Lane" },
	21 : { "avatar" : 21, "car" : 4, "carVariation" : 6,  "speed" : 23, "speedAcceleration" : 0.85, "rSpeed" : 0.70, "name" : "Mira Mach McCarthy" },
	22 : { "avatar" : 22, "car" : 4, "carVariation" : 7,  "speed" : 23, "speedAcceleration" : 0.85, "rSpeed" : 0.70, "name" : "Reed Racer Reynolds" },
	23 : { "avatar" : 23, "car" : 3, "carVariation" : 4,  "speed" : 22, "speedAcceleration" : 0.85, "rSpeed" : 0.70, "name" : "Skye Streak Simmons" },
	24 : { "avatar" : 24, "car" : 4, "carVariation" : 2,  "speed" : 22, "speedAcceleration" : 0.85, "rSpeed" : 0.70, "name" : "Piper Piston Perry" },
	25 : { "avatar" : 25, "car" : 4, "carVariation" : 3,  "speed" : 22, "speedAcceleration" : 0.85, "rSpeed" : 0.70, "name" : "Ryker Rush Reed" },
	26 : { "avatar" : 26, "car" : 4, "carVariation" : 4,  "speed" : 22, "speedAcceleration" : 0.85, "rSpeed" : 0.70, "name" : "Zara Zippy Zane" },
	27 : { "avatar" : 27, "car" : 3, "carVariation" : 3,  "speed" : 22, "speedAcceleration" : 0.85, "rSpeed" : 0.70, "name" : "Theo Throttle Thompson" },
	28 : { "avatar" : 28, "car" : 4, "carVariation" : 5,  "speed" : 22, "speedAcceleration" : 0.85, "rSpeed" : 0.70, "name" : "Kara Kicker Kline" },
	29 : { "avatar" : 29, "car" : 3, "carVariation" : 2,  "speed" : 21, "speedAcceleration" : 0.80, "rSpeed" : 0.66, "name" : "Dean Drift Daniels" },
	30 : { "avatar" : 30, "car" : 4, "carVariation" : 6,  "speed" : 21, "speedAcceleration" : 0.80, "rSpeed" : 0.66, "name" : "Myla Momentum Martin" },
	31 : { "avatar" : 31, "car" : 3, "carVariation" : 10, "speed" : 21, "speedAcceleration" : 0.80, "rSpeed" : 0.66, "name" : "Bryce Boost Brooks" },
	32 : { "avatar" : 32, "car" : 3, "carVariation" : 9,  "speed" : 21, "speedAcceleration" : 0.80, "rSpeed" : 0.66, "name" : "Tessa Turbo Thomas" },
	33 : { "avatar" : 33, "car" : 3, "carVariation" : 8,  "speed" : 21, "speedAcceleration" : 0.80, "rSpeed" : 0.66, "name" : "Seth Speed Saunders" },
	34 : { "avatar" : 34, "car" : 3, "carVariation" : 7,  "speed" : 21, "speedAcceleration" : 0.80, "rSpeed" : 0.66, "name" : "Isla Ignition Irvine" },
	35 : { "avatar" : 35, "car" : 4, "carVariation" : 3,  "speed" : 20, "speedAcceleration" : 0.80, "rSpeed" : 0.66, "name" : "Gage Gearshift Grant" },
	36 : { "avatar" : 36, "car" : 4, "carVariation" : 2,  "speed" : 20, "speedAcceleration" : 0.80, "rSpeed" : 0.66, "name" : "Liv Laps Larson" },
	37 : { "avatar" : 37, "car" : 3, "carVariation" : 6,  "speed" : 20, "speedAcceleration" : 0.75, "rSpeed" : 0.64, "name" : "Reid Rev Reynolds" },
	38 : { "avatar" : 38, "car" : 3, "carVariation" : 5,  "speed" : 20, "speedAcceleration" : 0.75, "rSpeed" : 0.64, "name" : "Piper Pitstop Price" },
	39 : { "avatar" : 39, "car" : 4, "carVariation" : 6,  "speed" : 20, "speedAcceleration" : 0.75, "rSpeed" : 0.64, "name" : "Blaze Burnout Brooks" },
	40 : { "avatar" : 40, "car" : 3, "carVariation" : 4,  "speed" : 20, "speedAcceleration" : 0.75, "rSpeed" : 0.64, "name" : "Elle Engine Evans" },
	41 : { "avatar" : 41, "car" : 3, "carVariation" : 3,  "speed" : 19, "speedAcceleration" : 0.75, "rSpeed" : 0.64, "name" : "Dane Dash Davis" },
	42 : { "avatar" : 42, "car" : 3, "carVariation" : 2,  "speed" : 19, "speedAcceleration" : 0.75, "rSpeed" : 0.64, "name" : "Sasha Speedster Simmons" },
	43 : { "avatar" : 43, "car" : 3, "carVariation" : 10, "speed" : 19, "speedAcceleration" : 0.75, "rSpeed" : 0.64, "name" : "Cole Crusher Collins" },
	44 : { "avatar" : 44, "car" : 2, "carVariation" : 9,  "speed" : 19, "speedAcceleration" : 0.75, "rSpeed" : 0.64, "name" : "Quicksilver" },
	45 : { "avatar" : 45, "car" : 2, "carVariation" : 8,  "speed" : 19, "speedAcceleration" : 0.70, "rSpeed" : 0.62, "name" : "Jade Jet Jensen" },
	46 : { "avatar" : 46, "car" : 3, "carVariation" : 2,  "speed" : 19, "speedAcceleration" : 0.70, "rSpeed" : 0.62, "name" : "Nick Nitro Nolan" },
	47 : { "avatar" : 47, "car" : 3, "carVariation" : 3,  "speed" : 18, "speedAcceleration" : 0.70, "rSpeed" : 0.62, "name" : "Ivy Ignition Irwin" },
	48 : { "avatar" : 48, "car" : 2, "carVariation" : 7,  "speed" : 18, "speedAcceleration" : 0.70, "rSpeed" : 0.62, "name" : "Trent Trailblazer Thompson" },
	49 : { "avatar" : 49, "car" : 3, "carVariation" : 4,  "speed" : 28, "speedAcceleration" : 0.70, "rSpeed" : 0.62, "name" : "Lana Laps Lawson" },
	50 : { "avatar" : 50, "car" : 2, "carVariation" : 6,  "speed" : 18, "speedAcceleration" : 0.70, "rSpeed" : 0.62, "name" : "Wyatt Warp Wilson" },
	51 : { "avatar" : 51, "car" : 3, "carVariation" : 5,  "speed" : 18, "speedAcceleration" : 0.70, "rSpeed" : 0.62, "name" : "Paige Pitstop Palmer" },
	52 : { "avatar" : 52, "car" : 3, "carVariation" : 6,  "speed" : 18, "speedAcceleration" : 0.70, "rSpeed" : 0.62, "name" : "Zeke Zoom Zimmerman" },
	53 : { "avatar" : 53, "car" : 3, "carVariation" : 7,  "speed" : 17, "speedAcceleration" : 0.65, "rSpeed" : 0.60, "name" : "Fiona Fastlane Ford" },
	54 : { "avatar" : 54, "car" : 3, "carVariation" : 8,  "speed" : 17, "speedAcceleration" : 0.65, "rSpeed" : 0.60, "name" : "Leo Lightning Logan" },
	55 : { "avatar" : 55, "car" : 3, "carVariation" : 9,  "speed" : 17, "speedAcceleration" : 0.65, "rSpeed" : 0.60, "name" : "Ember Engine Ellis" },
	56 : { "avatar" : 56, "car" : 2, "carVariation" : 5,  "speed" : 17, "speedAcceleration" : 0.65, "rSpeed" : 0.60, "name" : "Riley Rocket" },
	57 : { "avatar" : 1,  "car" : 3, "carVariation" : 10, "speed" : 17, "speedAcceleration" : 0.65, "rSpeed" : 0.60, "name" : "Troy Torque Taylor" },
	58 : { "avatar" : 2,  "car" : 3, "carVariation" : 5,  "speed" : 17, "speedAcceleration" : 0.65, "rSpeed" : 0.60, "name" : "Bella Boost Bryant" },
	59 : { "avatar" : 3,  "car" : 3, "carVariation" : 3,  "speed" : 16, "speedAcceleration" : 0.65, "rSpeed" : 0.60, "name" : "Colton Crash Cruz" },
	60 : { "avatar" : 4,  "car" : 3, "carVariation" : 2,  "speed" : 16, "speedAcceleration" : 0.65, "rSpeed" : 0.60, "name" : "Nina Nitrous Novak" },
	61 : { "avatar" : 5,  "car" : 1, "carVariation" : 7,  "speed" : 16, "speedAcceleration" : 0.60, "rSpeed" : 0.58, "name" : "Rocco Racer Riley" },
	62 : { "avatar" : 6,  "car" : 3, "carVariation" : 7,  "speed" : 16, "speedAcceleration" : 0.60, "rSpeed" : 0.58, "name" : "Haley Hurricane Hayes" },
	63 : { "avatar" : 7,  "car" : 3, "carVariation" : 8,  "speed" : 16, "speedAcceleration" : 0.60, "rSpeed" : 0.58, "name" : "Aiden Ace Allen" },
	64 : { "avatar" : 8,  "car" : 2, "carVariation" : 4,  "speed" : 16, "speedAcceleration" : 0.60, "rSpeed" : 0.58, "name" : "Skye Skid Summers" },
	65 : { "avatar" : 9,  "car" : 2, "carVariation" : 3,  "speed" : 15, "speedAcceleration" : 0.60, "rSpeed" : 0.58, "name" : "Finn Flash Fisher" },
	66 : { "avatar" : 10, "car" : 2, "carVariation" : 2,  "speed" : 15, "speedAcceleration" : 0.60, "rSpeed" : 0.58, "name" : "Scarlett Scorch Scott" },
	67 : { "avatar" : 11, "car" : 3, "carVariation" : 4,  "speed" : 15, "speedAcceleration" : 0.60, "rSpeed" : 0.58, "name" : "Jett Jetstream Jackson" },
	68 : { "avatar" : 12, "car" : 2, "carVariation" : 5,  "speed" : 15, "speedAcceleration" : 0.60, "rSpeed" : 0.58, "name" : "Nova Nitro Nelson" },
	69 : { "avatar" : 13, "car" : 2, "carVariation" : 8,  "speed" : 15, "speedAcceleration" : 0.55, "rSpeed" : 0.56, "name" : "Quinn Quick Quinn" },
	70 : { "avatar" : 14, "car" : 2, "carVariation" : 3,  "speed" : 15, "speedAcceleration" : 0.55, "rSpeed" : 0.56, "name" : "Trent Turbo" },
	71 : { "avatar" : 15, "car" : 2, "carVariation" : 4,  "speed" : 14, "speedAcceleration" : 0.55, "rSpeed" : 0.56, "name" : "Zane Zoomer Ziegler" },
	72 : { "avatar" : 16, "car" : 2, "carVariation" : 9,  "speed" : 14, "speedAcceleration" : 0.55, "rSpeed" : 0.56, "name" : "Lila Leopard Lane" },
	73 : { "avatar" : 17, "car" : 1, "carVariation" : 9,  "speed" : 14, "speedAcceleration" : 0.55, "rSpeed" : 0.56, "name" : "Chase Thunderbolt" },
	74 : { "avatar" : 18, "car" : 2, "carVariation" : 2,  "speed" : 14, "speedAcceleration" : 0.55, "rSpeed" : 0.56, "name" : "Blake Blaze Brooks" },
	75 : { "avatar" : 19, "car" : 2, "carVariation" : 4,  "speed" : 14, "speedAcceleration" : 0.55, "rSpeed" : 0.56, "name" : "Jade Jet Jordan" },
	76 : { "avatar" : 20, "car" : 3, "carVariation" : 2,  "speed" : 14, "speedAcceleration" : 0.55, "rSpeed" : 0.56, "name" : "Ryder Phoenix" },
	77 : { "avatar" : 21, "car" : 2, "carVariation" : 6,  "speed" : 13, "speedAcceleration" : 0.50, "rSpeed" : 0.54, "name" : "Ava Apex Archer" },
	78 : { "avatar" : 22, "car" : 2, "carVariation" : 4,  "speed" : 13, "speedAcceleration" : 0.50, "rSpeed" : 0.54, "name" : "Logan Laps Lynch" },
	79 : { "avatar" : 23, "car" : 2, "carVariation" : 5,  "speed" : 13, "speedAcceleration" : 0.50, "rSpeed" : 0.54, "name" : "Nash Nitro" },
	80 : { "avatar" : 24, "car" : 2, "carVariation" : 3,  "speed" : 13, "speedAcceleration" : 0.50, "rSpeed" : 0.54, "name" : "Zara Rocket" },
	81 : { "avatar" : 25, "car" : 2, "carVariation" : 8,  "speed" : 13, "speedAcceleration" : 0.50, "rSpeed" : 0.54, "name" : "Ty Torque Tanner" },
	82 : { "avatar" : 26, "car" : 2, "carVariation" : 10, "speed" : 13, "speedAcceleration" : 0.50, "rSpeed" : 0.54, "name" : "Brooke Boost Bennett" },
	83 : { "avatar" : 27, "car" : 2, "carVariation" : 9,  "speed" : 12, "speedAcceleration" : 0.50, "rSpeed" : 0.54, "name" : "Cole Crush Carter" },
	84 : { "avatar" : 28, "car" : 1, "carVariation" : 2,  "speed" : 12, "speedAcceleration" : 0.50, "rSpeed" : 0.54, "name" : "Ivy Ignition Irwin" },
	85 : { "avatar" : 29, "car" : 2, "carVariation" : 7,  "speed" : 12, "speedAcceleration" : 0.45, "rSpeed" : 0.52, "name" : "Orion Thunder" },
	86 : { "avatar" : 30, "car" : 2, "carVariation" : 4,  "speed" : 12, "speedAcceleration" : 0.45, "rSpeed" : 0.52, "name" : "Kayla Kinetic Knight" },
	87 : { "avatar" : 31, "car" : 1, "carVariation" : 4,  "speed" : 12, "speedAcceleration" : 0.45, "rSpeed" : 0.52, "name" : "Flynn Flash Foster" },
	88 : { "avatar" : 32, "car" : 2, "carVariation" : 6,  "speed" : 12, "speedAcceleration" : 0.45, "rSpeed" : 0.52, "name" : "Dakota Drift" },
	89 : { "avatar" : 33, "car" : 1, "carVariation" : 7,  "speed" : 11, "speedAcceleration" : 0.45, "rSpeed" : 0.52, "name" : "Hunter Blaze" },
	90 : { "avatar" : 34, "car" : 1, "carVariation" : 4,  "speed" : 11, "speedAcceleration" : 0.45, "rSpeed" : 0.52, "name" : "Sierra Skid Sanchez" },
	91 : { "avatar" : 35, "car" : 1, "carVariation" : 2,  "speed" : 11, "speedAcceleration" : 0.45, "rSpeed" : 0.52, "name" : "Jaxon Velocity" },
	92 : { "avatar" : 36, "car" : 1, "carVariation" : 10, "speed" : 11, "speedAcceleration" : 0.45, "rSpeed" : 0.52, "name" : "Zara Zoom Zane" },
	93 : { "avatar" : 37, "car" : 2, "carVariation" : 9,  "speed" : 11, "speedAcceleration" : 0.40, "rSpeed" : 0.50, "name" : "Maverick Storm" },
	94 : { "avatar" : 38, "car" : 1, "carVariation" : 8,  "speed" : 11, "speedAcceleration" : 0.40, "rSpeed" : 0.50, "name" : "Quinn Quicksilver" },
	95 : { "avatar" : 39, "car" : 1, "carVariation" : 7,  "speed" : 10, "speedAcceleration" : 0.40, "rSpeed" : 0.50, "name" : "Ryker Nitro" },
	96 : { "avatar" : 40, "car" : 1, "carVariation" : 6,  "speed" : 10, "speedAcceleration" : 0.40, "rSpeed" : 0.50, "name" : "Sasha Speedster Sato" },
	97 : { "avatar" : 41, "car" : 1, "carVariation" : 5,  "speed" : 10, "speedAcceleration" : 0.40, "rSpeed" : 0.50, "name" : "Blaze Falcon" },
	98 : { "avatar" : 42, "car" : 1, "carVariation" : 4,  "speed" : 10, "speedAcceleration" : 0.40, "rSpeed" : 0.50, "name" : "Axel Vortex" },
	99 : { "avatar" : 43, "car" : 1, "carVariation" : 3,  "speed" : 10, "speedAcceleration" : 0.40, "rSpeed" : 0.50, "name" : "Lena Lightning Lewis" },
	100: { "avatar" : 44, "car" : 1, "carVariation" : 2,  "speed" : 10, "speedAcceleration" : 0.40, "rSpeed" : 0.50, "name" : "Max Turbo Thompson" },
	
};	


currentRace = "";


//setInterval(function(){ tick(); }, 1000);


// *** Spots (locations in game; capitalized for recognition)
// "debugDraw" : true 
var spot = {

	// *** UI
	"WINDOW_BUTTONS"	: { "x" : game["width"] - 75,	"y" : 15,	"margin" : 10 },
	"CLOSE_ICON" 		: { "x" : 10000,		"y" : 15,	"width" : 60,	"height" : 60 }, // *** x gets recalculated according to visible icons
	"FULLSCREEN_ICON" 	: { "x" : 10000,		"y" : 15,	"width" : 60,	"height" : 60 }, // *** x gets recalculated according to visible icons
	"SOUND_ICON" 		: { "x" : 10000,		"y" : 15,	"width" : 60,	"height" : 60 }, // *** x gets recalculated according to visible icons
	"KEYBOARD_ICON"		: { "x" : 1305,			"y" : 610,	"width" : 85,	"height" : 78 }, 
	"MAIN_MENU_ICON"	: { "x" : 10,			"y" : 610+39,	"width" : 42,	"height" : 39 },
	"BUTTON" 		: { "paddingBottom" : 36, 	"font" : "bold 22px Arial",		"color" : "#FFFFFF",	"shadow" : true,	"paddingBottomHover" : 33, 	"fontHover" : "bold 22px Arial",	"colorHover" : "#FFFFFF",	"shadowHover" : true, },

	// *** Intro / playbutton / preload
	"INTRO" 		: { "x" : 0,				"y" : 0 },
	"INTRO_LOGO"	 	: { "x" : game["width"]/2,		"y" : game["height"]/2 - 230 },
	"INTRO_PLAYBUTTON_2" 	: { "x" : game["width"]/2-100,		"y" : 523 },
	"INTRO_PLAYBUTTON_TEXT"	: { "x" : game["width"]/2,		"y" : 280,		"font" : "bold 60px Arial", 	"color" : "#FFFFFF", 	"textAlign" : "center",	"shadow" : false,	"lineHeight" : 24  },	
	"INTRO_PRELOADER"	: { "x" : game["width"]/2 - 476/2,	"y" : 310, 				"width" : 475, 		"height" : 70,		"paddingLeft" : 13,	"paddingTop" : 9,	"preloaderWidth" : 448,		"preloaderHeight" : 50, },
	"INTRO_PRELOAD_MESSAGE"	: { "x" : game["width"]/2,		"y" : game["height"]/2 + 150,		"font" : "bold 20px Arial", 	"color" : "#000000", 	"textAlign" : "center",	"shadow" : false,	"lineHeight" : 24  },
	"INTRO_MANEUVRE" 	: { "x" : game["width"]/2,		"y" : game["height"]/2,			"font" : "bold 46px Arial", 	"color" : "#FFFFFF", 	"textAlign" : "center",		"shadow" : true,	"lineHeight" : 50,	"paddingTop" : 230 },
	"INTRO_VERSION" 	: { "x" : game["width"] - 20,		"y" : game["height"] - 20,		"font" : "12px Arial", 	"color" : "#FFFFFF", 	"textAlign" : "right",	"shadow" : true },
	"INTRO_IOS_ALERT"	: { "x" : game["width"]/2 - 400/2-4,	"y" : game["height"]/2-125, 		"font" : "bold 22px Arial", 	"color" : "#000000", 	"textAlign" : "center",	"shadow" : false,	"lineHeight" : 24 }, 
	"INTRO_IOS_BUTTON"	: { "x" : game["width"]/2 - 200/2,	"y" : game["height"]/2-125+177 }, 
	"INTRO_PLAY_BUTTON"	: { "x" : game["width"]/2 - 210,	"y" : game["height"]/2+230 }, 
	"INTRO_HIGHSCORE_BUTTON": { "x" : game["width"]/2 + 10,		"y" : game["height"]/2+230 }, 

	"INTRO_CONTINUE"	: { "x" : game["width"]/2 - 400/2-4,	"y" : game["height"]/2-125, 		"font" : "28px Arial", 	"color" : "#ffffff", 	"textAlign" : "center",	"shadow" : false,	"lineHeight" : 24 }, 
	
	
	// *** Game
	"BG"			: { "x" : 0,		"y" : 0, }, 	
	"PROGRESS"		: { "x" : 75,		"y" : 315, 	"font" : "bold 30px Arial",	"color" : "#000000",	"textAlign" : "center" }, 
	
	"SENTENCE"		: { "x" : 700,		"y" : 110, 	"font" : "bold 48px Arial",	"color" : "#653088",	"maxWidth" : 1300,	"textAlign" : "center" }, 
	"SENTENCE_ACCENT"	: { "x" : 700,		"y" : 110, 	"font" : "bold 48px Arial",	"color" : "#C65F40",	"maxWidth" : 1300 }, 
	"ANSWER1"		: { "x" : 60 + 320*0,	"y" : 168,		"width" : 308,	"height" : 72, },
	"ANSWER2"		: { "x" : 60 + 320*1,	"y" : 168,		"width" : 308,	"height" : 72, },
	"ANSWER3"		: { "x" : 60 + 320*2,	"y" : 168,		"width" : 308,	"height" : 72, },
	"ANSWER4"		: { "x" : 60 + 320*3,	"y" : 168,		"width" : 308,	"height" : 72, },
	"ANSWER_TEXT"		: { "x" : 0,	"y" : 0,		"font" : "bold 48px Arial",	"color" : "#FFFFFF",	"maxWidth" : 288,	"textAlign" : "center" },

	"OCTOPUS"		: { "x" : 125+200,	"y" : 428+200,		"width" : 395,	"height" : 400, },

	"EXPLANATION_WRONG"		: { "x" : 85,		"y" : 120, 	"font" : "bold 36px Arial",	"color" : "#000000",	"textAlign" : "left",	"maxWidth" : 1130 }, 
	"EXPLANATION_WRONG_ACCENT"	: { "x" : 85,		"y" : 120, 	"font" : "bold 36px Arial",	"color" : "#ff0000",	"textAlign" : "left",	"maxWidth" : 1130 },
	"EXPLANATION_RIGHT"		: { "x" : 85,		"y" : 120+100, 	"font" : "bold 36px Arial",	"color" : "#000000",	"textAlign" : "left",	"maxWidth" : 1130 }, 
	"EXPLANATION_RIGHT_ACCENT"	: { "x" : 85,		"y" : 120+100, 	"font" : "bold 36px Arial",	"color" : "#58ac00",	"textAlign" : "left",	"maxWidth" : 1130 },
	"EXPLANATION_TEXT"		: { "x" : 85,		"y" : 120+260, 	"font" : "bold 22px Arial",	"color" : "#000000",	"textAlign" : "left",	"maxWidth" : 1200,	"lineHeight" : 28 }, 
	"EXPLANATION_TEXT_ACCENT"	: { "x" : 85,		"y" : 120+260, 	"font" : "bold 26px Arial",	"color" : "#58ac00",	"textAlign" : "left",	"maxWidth" : 1200,	"lineHeight" : 28 }, 
	"EXPLANATION_TEXT_RED"		: { "x" : 85,		"y" : 120+260, 	"font" : "bold 26px Arial",	"color" : "#ff0000",	"textAlign" : "left",	"maxWidth" : 1200,	"lineHeight" : 28 },
	
	"EXPLANATION_BUTTON"	: { "x" : 700-100,	"y" : 500 }, 	

	"CACTUS_1"	: { "x" : 867,		"y" : 306,	"width" : 86,	"height" : 95 },
	"CACTUS_2"	: { "x" : 1312,		"y" : 211,	"width" : 86,	"height" : 95 },

	"RESULT"	: { "x" : 80,		"y" : 115, 	"font" : "bold 30px Arial",	"color" : "#000000",	"textAlign" : "left",	"maxWidth" : 290 }, 
	"RESULT_CORRECT": { "x" : 0,		"y" : 0, 	"font" : "bold 30px Arial",	"color" : "#58ac00",	"textAlign" : "left",	"maxWidth" : 290 }, 
	"RESULT_WRONG"	: { "x" : 0,		"y" : 0, 	"font" : "bold 30px Arial",	"color" : "#ff0000",	"textAlign" : "left",	"maxWidth" : 290 }, 
	"RESULT_BUTTON"	: { "x" : 700-100,	"y" : 615 }, 

	"SCORE_BUTTON"	: { "x" : 700-100,	"y" : 615 }, 
	"SCORE_HEADER"	: { "x" : 700,		"y" : 180, 	"font" : "bold 30px Arial",	"color" : "#000000",	"textAlign" : "center" }, 
	"SCORE_SCORE"	: { "x" : 700,		"y" : 340, 	"font" : "bold 170px Arial",	"color" : "#000000",	"textAlign" : "center" }, 
	"SCORE_TEXT"	: { "x" : 700,		"y" : 410, 	"font" : "bold 30px Arial",	"color" : "#000000",	"textAlign" : "center" }, 

	"COLLECTABLE_1"	: { "x" : 235 + 118*0,	"y" : 435 }, 
	"COLLECTABLE_2"	: { "x" : 235 + 118*1,	"y" : 435 }, 
	"COLLECTABLE_3"	: { "x" : 235 + 118*2,	"y" : 435 }, 
	"COLLECTABLE_4"	: { "x" : 235 + 118*3,	"y" : 435 }, 
	"COLLECTABLE_5"	: { "x" : 235 + 118*4,	"y" : 435 }, 
	"COLLECTABLE_6"	: { "x" : 235 + 118*5,	"y" : 435 }, 
	"COLLECTABLE_7"	: { "x" : 235 + 118*6,	"y" : 435 }, 
	"COLLECTABLE_8"	: { "x" : 235 + 118*7,	"y" : 435 }, 
	"COLLECTABLE_9"	: { "x" : 235 + 118*8,	"y" : 435 }, 

	"SCORE"			: { "x" : 40,		"y" : 80,		"font" : "bold 48px Arial", 	"color" : "#FFFFFF", 	"textAlign" : "center",	"shadow" : true,	"lineHeight" : 24  },	
	"SCORE_MULTIPLIER"	: { "x" : 1280,		"y" : 190,		"font" : "bold 38px Arial", 	"color" : "#FFFF00", 	"textAlign" : "center",	"shadow" : true,	"lineHeight" : 24  },	

	"LEVEL"			: { "x" : 70,		"y" : 130,		"font" : "bold 48px Arial", 	"color" : "#FFFFFF", 	"textAlign" : "center",	"shadow" : true,	"lineHeight" : 24  },	

	"BULLETS"		: { "x" : 250,		"y" : 640,	"width" : 30,	"height" : 46 },
	"HEARTS"		: { "x" : 1040,		"y" : 655,	"width" : 50,	"height" : 37 },

	"BULLETS_QUESTION"	: { "x" : 90,		"y" : 380,	"width" : 40,	"height" : 46 },

	"UI_TEXT"		: { "x" : 0,		"y" : 0, 	"font" : "bold 24px Arial", 	"color" : "#FFFFFF",  	"textAlign" : "left" },

	"PEARL_DEBUG"		: { "x" : 0,		"y" : 0, 	"font" : "14px Arial", 	"color" : "#000000",  	"textAlign" : "left" },

	"O_TEXT"		: { "x" : 0,		"y" : 0, 	"font" : "bold 26px Arial",	"color" : "#FFFFFF",	"textAlign" : "center",	"maxWidth" : 1300,	"shadow" : true,	"lineHeight" : 28 },
	"O_TEXT_BIG"		: { "x" : 0,		"y" : 0, 	"font" : "bold 30px Arial",	"color" : "#FFFF00",	"textAlign" : "center",	"maxWidth" : 1300,	"shadow" : true,	"lineHeight" : 28 },

	"MISSION_TEXT"		: { "x" : 0,		"y" : 0, 	"font" : "18px Arial", 	"color" : "#FFFFFF",  	"textAlign" : "center" },
	"MISSION_TEXT_SUB"	: { "x" : 0,		"y" : 0, 	"font" : "bold 24px Arial", 	"color" : "#FFFF00",  	"textAlign" : "center" },
	"FINGER_TEXT"		: { "x" : 0,		"y" : 0, 	"font" : "bold 24px Arial", 	"color" : "#000000",  	"textAlign" : "right" },

	"TEXT_HUGE_LEFT"		: { "x" : 0,		"y" : 0, 	"font" : "72px 'Asap Condensed', sans-serif", 	"color" : "#FFFFFF",  	"textAlign" : "left",	"shadow" : true },

	"TEXT_LARGE_LEFT_BOLD"		: { "x" : 0,		"y" : 0, 	"font" : "bold 52px 'Asap Condensed', sans-serif", 	"color" : "#fdec00",  	"textAlign" : "left",	"shadow" : true },
	"TEXT_LARGE_LEFT"		: { "x" : 0,		"y" : 0, 	"font" : "36px 'Asap Condensed', sans-serif", 	"color" : "#FFFFFF",  	"textAlign" : "left",	"shadow" : true },
	"TEXT_LARGE_CENTER"		: { "x" : 0,		"y" : 0, 	"font" : "36px 'Asap Condensed', sans-serif", 	"color" : "#FFFFFF",  	"textAlign" : "center",	"shadow" : true },
	"TEXT_LARGE_CENTER_BROWN"	: { "x" : 0,		"y" : 0, 	"font" : "36px 'Asap Condensed', sans-serif", 	"color" : "#2c2f09",  	"textAlign" : "center",	"shadow" : false },

	"TEXT_MEDIUM_LEFT"		: { "x" : 0,		"y" : 0, 	"font" : "24px 'Asap Condensed', sans-serif", 	"color" : "#FFFFFF",  	"textAlign" : "left",	"shadow" : true },
	"TEXT_MEDIUM_CENTER"		: { "x" : 0,		"y" : 0, 	"font" : "24px 'Asap Condensed', sans-serif", 	"color" : "#FFFFFF",  	"textAlign" : "center",	"shadow" : true },
	"TEXT_MEDIUM_LEFT_BOLD"		: { "x" : 0,		"y" : 0, 	"font" : "bold 28px 'Asap Condensed', sans-serif", 	"color" : "#fdec00",  	"textAlign" : "left",	"shadow" : true },

	"TEXT_SMALL_LEFT"		: { "x" : 0,		"y" : 0, 	"font" : "18px 'Asap Condensed', sans-serif", 	"color" : "#FFFFFF",  	"textAlign" : "left",	"shadow" : true },
	"TEXT_SMALL_LEFT_BOLD"		: { "x" : 0,		"y" : 0, 	"font" : "bold 18px 'Asap Condensed', sans-serif", 	"color" : "#fdec00",  	"textAlign" : "left",	"shadow" : true },
	"TEXT_RACE_AVATAR_PLAYER"	: { "x" : 0,		"y" : 0, 	"font" : "18px 'Asap Condensed', sans-serif", 	"color" : "#2c2f09",  	"textAlign" : "left", "shadow" : false, "maxWidth" : 110, },
	"TEXT_RACE_AVATAR_OPPONENT"	: { "x" : 0,		"y" : 0, 	"font" : "18px 'Asap Condensed', sans-serif", 	"color" : "#FFFFFF",  	"textAlign" : "left", "shadow" : false, "maxWidth" : 110, },

	"TEXT_COUNTDOWN"		: { "x" : 0,		"y" : 0, 	"font" : "bold 120px 'Asap Condensed', sans-serif", 	"color" : "#FFFFFF",  	"textAlign" : "center", "shadow" : true },

	"SELECT_BUTTON_AVATAR_NAME"	: { "x" : 16,		"y" : 168,	"width" : 285,	"height" : 37 },
	"SELECT_BUTTON_AVATAR_LEFT"	: { "x" : 61-4,		"y" : 99-4,	"width" : 48,	"height" : 48 },
	"SELECT_BUTTON_AVATAR_RIGHT"	: { "x" : 214-4,	"y" : 99-4,	"width" : 48,	"height" : 48 },
	"SELECT_BUTTON_RACE"		: { "x" : 1174-3,	"y" : 601-4,	"width" : 186,	"height" : 83 },
	"SELECT_BUTTON_BOAT_1"		: { "x" : 317,	"y" : 60,	"width" : 285,	"height" : 145 },
	"SELECT_BUTTON_BOAT_2"		: { "x" : 317,	"y" : 219,	"width" : 285,	"height" : 145 },
	"SELECT_BUTTON_BOAT_3"		: { "x" : 317,	"y" : 379,	"width" : 285,	"height" : 145 },
	"SELECT_BUTTON_BOAT_4"		: { "x" : 317,	"y" : 539,	"width" : 285,	"height" : 145 },

	"SELECT_UPGRADE_1"		: { "x" : 1130 - 1,	"y" : 471 - 2,	"width" : 159,	"height" : 44 },
	"SELECT_UPGRADE_2"		: { "x" : 636 - 1,	"y" : 395 - 2,	"width" : 159,	"height" : 44 },
	"SELECT_UPGRADE_3"		: { "x" : 698 - 1,	"y" : 190 - 2,	"width" : 159,	"height" : 44 },
	"SELECT_UPGRADE_5"		: { "x" : 702 - 1,	"y" : 592 - 2,	"width" : 159,	"height" : 44 },
	"SELECT_UPGRADE_4"		: { "x" : 1107 - 1,	"y" : 227 - 2,	"width" : 159,	"height" : 44 },

	"BUTTON_END_RACE"		: { "x" : 1235,	"y" : 85,	"width" : 148,	"height" : 36 },
	"BUTTON_END_RACE_TEXT"		: { "x" : 0,	"y" : 0, 	"font" : "18px 'Asap Condensed', sans-serif", 	"color" : "#FFFFFF",  	"textAlign" : "center", "shadow" : false, "maxWidth" : 94, },

	"DEBUGTEXT"	: { "x" : 0,		"y" : 0, 	"font" : "18px 'Asap Condensed', sans-serif", 	"color" : "#FFFFFF",  	"textAlign" : "left", "shadow" : false, "maxWidth" : 1400, },

	
	"PLAYER_WORD"	: { "x" : 700,	"y" : 60, 	"font" : "60px 'Asap Condensed', sans-serif", 	"color" : "#FFFFFF",  	"textAlign" : "left", "shadow" : true, "maxWidth" : 800, },
	"PLAYER_WORD_2"	: { "x" : 700,	"y" : 60, 	"font" : "60px 'Asap Condensed', sans-serif", 	"color" : "#FFFFFF",  	"textAlign" : "center", "shadow" : true, "maxWidth" : 1300, },
	"PLAYER_LETTER"	: { "x" : 0,	"y" : 0, 	"font" : "60px 'Asap Condensed', sans-serif", 	"color" : "#FFFFFF",  	"textAlign" : "center", "shadow" : true, "maxWidth" : 90, },

	"RANKING_TEXT"		: { "x" : 0,	"y" : 0, 	"font" : "36px 'Asap Condensed', sans-serif", 	"color" : "#FFFFFF",  	"textAlign" : "left", "shadow" : false, "maxWidth" : 1000, },
	"RANKING_TEXT_BLACK"	: { "x" : 0,	"y" : 0, 	"font" : "36px 'Asap Condensed', sans-serif", 	"color" : "#000000",  	"textAlign" : "left", "shadow" : false, "maxWidth" : 1000, },
	"RANKING_TEXT_HUGE"	: { "x" : 0,	"y" : 0, 	"font" : "160px 'Asap Condensed', sans-serif", 	"color" : "#fc6300",  	"textAlign" : "left", "shadow" : false, "maxWidth" : 1000, },
	"RANKING_TEXT_HUGE_2"	: { "x" : 0,	"y" : 0, 	"font" : "110px 'Asap Condensed', sans-serif", 	"color" : "#fc6300",  	"textAlign" : "left", "shadow" : false, "maxWidth" : 1000, },
	"RANKING_TEXT_HUGE_3"	: { "x" : 0,	"y" : 0, 	"font" : "110px 'Asap Condensed', sans-serif", 	"color" : "#FFFFFF",  	"textAlign" : "left", "shadow" : false, "maxWidth" : 1000, },
	
	
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

// Object.assign(spot, wlAddSpots());


// *** Objects
var o = { }; 

var oPrototype = {


	"LEVEL_OBJECT_1" : { /* Opponent tack marker */
	
		"category" : "level_objects", "z" : "GAME", "manifest" : "",
		
		"width" : 1, "height" : 1, "letter" : "", "letterCount" : 0,

		"collisionArea1" :  { "x" : 0, "y" : 0, "size" : 0/2 },
		"collisionArea2" :  { "x" : 0, "y" : 0, "size" : 0/2 },
		"collisionArea3" :  { "x" : 0, "y" : 0, "size" : 0/2 },
		"collisionArea4" :  { "x" : 0, "y" : 0, "size" : 0/2 },
		"collisionArea5" :  { "x" : 0, "y" : 0, "size" : 0/2 },
		"collisionArea6" :  { "x" : 0, "y" : 0, "size" : 0/2 },
		"collisionArea7" :  { "x" : 0, "y" : 0, "size" : 0/2 },
		"collisionArea8" :  { "x" : 0, "y" : 0, "size" : 0/2 },
		"collisionArea9" :  { "x" : 0, "y" : 0, "size" : 0/2 },
		"collisionArea10" : { "x" : 0, "y" : 0, "size" : 0/2 },
	},
	
	"LEVEL_OBJECT_2" : { /* Checkpoint: not in use */
	
		"category" : "level_objects", "z" : "GAME", "manifest" : "",
		
		"width" : 40, "height" : 40,

		"wobble" : 0,
		"unhittable" : 0,

		"collisionArea1" :  { "x" : 0, "y" : 0, "size" : 0/2 },
		"collisionArea2" :  { "x" : 0, "y" : 0, "size" : 0/2 },
		"collisionArea3" :  { "x" : 0, "y" : 0, "size" : 0/2 },
		"collisionArea4" :  { "x" : 0, "y" : 0, "size" : 0/2 },
		"collisionArea5" :  { "x" : 0, "y" : 0, "size" : 0/2 },
		"collisionArea6" :  { "x" : 0, "y" : 0, "size" : 0/2 },
		"collisionArea7" :  { "x" : 0, "y" : 0, "size" : 0/2 },
		"collisionArea8" :  { "x" : 0, "y" : 0, "size" : 0/2 },
		"collisionArea9" :  { "x" : 0, "y" : 0, "size" : 0/2 },
		"collisionArea10" : { "x" : 0, "y" : 0, "size" : 0/2 },
	},
	
	/* Hitarea's */
	"LEVEL_OBJECT_3"  : { "category" : "level_objects", "z" : "GAME", "manifest" : "", "width" : 26, "height" : 26, "collisionArea1" :  { "x" : 0, "y" : 0, "size" : 26/2 },	"collisionArea2" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea3" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea4" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea5" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea6" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea7" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea8" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea9" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea10" : { "x" : 0, "y" : 0, "size" : 0/2 },	},
	"LEVEL_OBJECT_4"  : { "category" : "level_objects", "z" : "GAME", "manifest" : "", "width" : 30, "height" : 30, "collisionArea1" :  { "x" : 0, "y" : 0, "size" : 30/2 },	"collisionArea2" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea3" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea4" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea5" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea6" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea7" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea8" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea9" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea10" : { "x" : 0, "y" : 0, "size" : 0/2 },	},
	"LEVEL_OBJECT_5"  : { "category" : "level_objects", "z" : "GAME", "manifest" : "", "width" : 40, "height" : 40, "collisionArea1" :  { "x" : 0, "y" : 0, "size" : 40/2 },	"collisionArea2" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea3" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea4" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea5" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea6" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea7" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea8" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea9" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea10" : { "x" : 0, "y" : 0, "size" : 0/2 },	},
	"LEVEL_OBJECT_6"  : { "category" : "level_objects", "z" : "GAME", "manifest" : "", "width" : 60, "height" : 60, "collisionArea1" :  { "x" : 0, "y" : 0, "size" : 60/2 },	"collisionArea2" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea3" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea4" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea5" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea6" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea7" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea8" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea9" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea10" : { "x" : 0, "y" : 0, "size" : 0/2 },	},
	"LEVEL_OBJECT_7"  : { "category" : "level_objects", "z" : "GAME", "manifest" : "", "width" : 100, "height" : 100, "collisionArea1" :  { "x" : 0, "y" : 0, "size" : 100/2 },	"collisionArea2" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea3" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea4" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea5" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea6" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea7" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea8" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea9" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea10" : { "x" : 0, "y" : 0, "size" : 0/2 },	},
	"LEVEL_OBJECT_8"  : { "category" : "level_objects", "z" : "GAME", "manifest" : "", "width" : 150, "height" : 150, "collisionArea1" :  { "x" : 0, "y" : 0, "size" : 150/2 },	"collisionArea2" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea3" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea4" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea5" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea6" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea7" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea8" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea9" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea10" : { "x" : 0, "y" : 0, "size" : 0/2 },	},
	"LEVEL_OBJECT_9"  : { "category" : "level_objects", "z" : "GAME", "manifest" : "", "width" : 200, "height" : 200, "collisionArea1" :  { "x" : 0, "y" : 0, "size" : 200/2 },	"collisionArea2" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea3" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea4" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea5" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea6" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea7" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea8" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea9" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea10" : { "x" : 0, "y" : 0, "size" : 0/2 },	},
	"LEVEL_OBJECT_10" : { "category" : "level_objects", "z" : "GAME", "manifest" : "", "width" : 300, "height" : 300, "collisionArea1" :  { "x" : 0, "y" : 0, "size" : 300/2 },	"collisionArea2" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea3" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea4" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea5" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea6" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea7" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea8" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea9" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea10" : { "x" : 0, "y" : 0, "size" : 0/2 },	},
	"LEVEL_OBJECT_11" : { "category" : "level_objects", "z" : "GAME", "manifest" : "", "width" : 500, "height" : 500, "collisionArea1" :  { "x" : 0, "y" : 0, "size" : 500/2 },	"collisionArea2" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea3" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea4" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea5" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea6" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea7" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea8" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea9" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea10" : { "x" : 0, "y" : 0, "size" : 0/2 },	},
	"LEVEL_OBJECT_12" : { "category" : "level_objects", "z" : "GAME", "manifest" : "", "width" : 800, "height" : 800, "collisionArea1" :  { "x" : 0, "y" : 0, "size" : 800/2 },	"collisionArea2" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea3" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea4" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea5" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea6" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea7" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea8" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea9" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea10" : { "x" : 0, "y" : 0, "size" : 0/2 },	},

	/* Level items */
	"LEVEL_OBJECT_13" : { "category" : "level_objects", "z" : "GAME_ON_TOP", "manifest" : "level_object_13", "width" : 534, "height" : 800, "parallax" : true, "collisionArea1" :  { "x" : -62, "y" : 6, "size" : 166/2 },	"collisionArea2" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea3" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea4" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea5" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea6" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea7" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea8" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea9" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea10" : { "x" : 0, "y" : 0, "size" : 0/2 },	},
	"LEVEL_OBJECT_14" : { "category" : "level_objects", "z" : "GAME_ON_TOP", "manifest" : "level_object_14", "width" : 929, "height" : 876, "parallax" : true, "collisionArea1" :  { "x" : 28, "y" : 137, "size" : 338/2 },	"collisionArea2" :  { "x" : 64, "y" : 95, "size" : 338/2 },	"collisionArea3" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea4" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea5" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea6" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea7" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea8" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea9" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea10" : { "x" : 0, "y" : 0, "size" : 0/2 },	},
	"LEVEL_OBJECT_15" : { "category" : "level_objects", "z" : "GAME_ON_TOP", "manifest" : "level_object_15", "width" : 744, "height" : 745, "parallax" : true, "collisionArea1" :  { "x" : 41, "y" : 10, "size" : 56/2 },	"collisionArea2" :  { "x" : -179, "y" : -142, "size" : 56/2 },	"collisionArea3" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea4" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea5" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea6" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea7" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea8" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea9" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea10" : { "x" : 0, "y" : 0, "size" : 0/2 },	},
	"LEVEL_OBJECT_16" : { "category" : "level_objects", "z" : "GAME_ON_TOP", "manifest" : "level_object_16", "width" : 173, "height" : 171, "parallax" : false, "collisionArea1" :  { "x" : -64, "y" : 65, "size" : 24/2 },	"collisionArea2" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea3" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea4" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea5" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea6" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea7" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea8" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea9" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea10" : { "x" : 0, "y" : 0, "size" : 0/2 },	},
	"LEVEL_OBJECT_17" : { "category" : "level_objects", "z" : "GAME_ON_TOP", "manifest" : "level_object_17", "width" : 173, "height" : 171, "parallax" : false, "collisionArea1" :  { "x" : 64, "y" : 65, "size" : 24/2 },	"collisionArea2" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea3" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea4" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea5" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea6" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea7" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea8" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea9" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea10" : { "x" : 0, "y" : 0, "size" : 0/2 },	},
	"LEVEL_OBJECT_18" : { "category" : "level_objects", "z" : "GAME_ON_TOP", "manifest" : "level_object_18", "width" : 1065, "height" : 804, "parallax" : false, "collisionArea1" :  { "x" : -1, "y" : -33, "size" : 338/2 },	"collisionArea2" :  { "x" : 93, "y" : -8, "size" : 310/2 },	"collisionArea3" :  { "x" : -216, "y" : -113, "size" : 170/2 },		"collisionArea4" :  { "x" : 248, "y" : 117, "size" : 170/2 },		"collisionArea5" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea6" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea7" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea8" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea9" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea10" : { "x" : 0, "y" : 0, "size" : 0/2 },	},
	"LEVEL_OBJECT_19" : { "category" : "level_objects", "z" : "GAME_ON_TOP", "manifest" : "level_object_19", "width" : 567, "height" : 537, "parallax" : true, "collisionArea1" :  { "x" : 0, "y" : 0, "size" : 214/2 },	"collisionArea2" :  { "x" : 0, "y" : 0, "size" : 0/2 },	"collisionArea3" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea4" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea5" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea6" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea7" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea8" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea9" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea10" : { "x" : 0, "y" : 0, "size" : 0/2 },	},
	"LEVEL_OBJECT_20" : { "category" : "level_objects", "z" : "GAME_ON_TOP", "manifest" : "level_object_20", "width" : 830, "height" : 900, "parallax" : false, "collisionArea1" :  { "x" : -285, "y" : -126, "size" : 226/2 },	"collisionArea2" :  { "x" : 272, "y" : 14, "size" : 226/2 },	"collisionArea3" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea4" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea5" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea6" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea7" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea8" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea9" :  { "x" : 0, "y" : 0, "size" : 0/2 },		"collisionArea10" : { "x" : 0, "y" : 0, "size" : 0/2 },	},

	
	
	
	"LEVEL_DECORATION_1" : {
	
		"category" : "level_decorations",
		"manifest" : "arrow_ocean_ripple_",
		
		"width" : 114,
		"height" : 192,

		"alpha" : 0.25,

		"aniFrame" : 1,
		"aniFrameCount" : 1,
		"aniFrameMax" : 7,
	},
	
	"LEVEL_DECORATION_2" : {
	
		"category" : "level_decorations",
		"manifest" : "arrow_right_ocean_ripple_",
		
		"width" : 114,
		"height" : 192,

		"alpha" : 0.25,

		"aniFrame" : 1,
		"aniFrameCount" : 1,
		"aniFrameMax" : 7,
	},
	
	
	"LEVEL_DECORATION_3" : {
	
		"category" : "level_decorations",
		"manifest" : "finishline_",
		
		"width" : 172,
		"height" : 50,

		"alpha" : 1,

		"aniFrame" : 1,
		"aniFrameCount" : 1,
		"aniFrameMax" : 9,
	},
	
	"MINIMAP_MARKER_EDITOR" : {
	
		"category" : "minimap_markers",
		"manifest" : "minimap_marker_editor",
		
		"width" : 16,
		"height" : 16,
	},
	
	"CHECKPOINT" : {
	
		"category" : "checkpoints",
		"manifest" : "checkpoint",
		
		"width" : 176,
		"height" : 176,

		"sequence" : 1,

	},
	
	"TEXT" : {
	
		"category" : "texts",
		"manifest" : "",
		
		"width" : 0,
		"height" : 0,

		"xSpeed" : 0,
		"ySpeed" : 0,

		"text" : "TEST",
		"count" : 0,
	},	

	"TEXT_BIG" : {
	
		"category" : "texts_big",
		"manifest" : "",
		
		"width" : 0,
		"height" : 0,

		"xSpeed" : 0,
		"ySpeed" : 0,

		"text" : "TEST",
		"count" : 0,
		"sizeCount" : 0,
	},	



	"GLITTERCIRCLE" : {  "category" : "particles", "width" : 200, "height" : 150, "speed" : 0.12, "particle" : 3, "count" : 0, "mirrored" : true, },
	"SUNBEAM" : { "category" : "sunbeam", "radius" : 400, "initialize" : true, },	
};


// *** Game engine
var gameEngine = {

	"version" : "v2.25.1",
	// *** Use the last digit (1) for verion updates of your game: increase it here AND increase versionHTML in index.html in the same way. This will eliminate cache problems.
	// *** v2.25 : changed mysql to pdo for php7 compatibility

	"highscoreDatabase" : 5,
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

	1 : { 	"name" : "Smoke",	"manifest" : "particle",	"manifestVariation" : 0.25,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -3,		"xSpeedVariation" : 3,		"xSpeedChange" : 0.1,		"xSpeedChangeVariation" : 0.1,
		"ySpeed" : 0,		"ySpeedVariation" : 0,		"ySpeedChange" : -0.2,		"ySpeedChangeVariation" : -0.4,
		"size"   : 2,		"sizeVariation"   : 20,		"sizeChange"   : 6,		"sizeChangeVariation"   : 6,
		"alpha"  : 0.5,		"alphaVariation"  : 0.5,	"alphaChange"  : -0.02,		"alphaChangeVariation"  : 0,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	

	2 : { 	"name" : "Black Smoke",	"manifest" : "particle",	"manifestVariation" : 1,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : 4,		"xSpeedVariation" : 4,		"xSpeedChange" : -0.4,		"xSpeedChangeVariation" : -0.4,
		"ySpeed" : 0,		"ySpeedVariation" : 0,		"ySpeedChange" : 0,		"ySpeedChangeVariation" : 0,
		"size"   : 10,		"sizeVariation"   : 30,		"sizeChange"   : 3,		"sizeChangeVariation"   : 6,
		"alpha"  : 0.5,		"alphaVariation"  : 0.5,	"alphaChange"  : -0.02,		"alphaChangeVariation"  : -0.02,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	

	3 : { 	"name" : "Glitter",	"manifest" : "particle",	"manifestVariation" : 0,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -1,		"xSpeedVariation" : 1,		"xSpeedChange" : 0.01,		"xSpeedChangeVariation" : 0,
		"ySpeed" : 1,		"ySpeedVariation" : -2,		"ySpeedChange" : -0.1,		"ySpeedChangeVariation" : 0,
		"size"   : 50,		"sizeVariation"   : 50,		"sizeChange"   : -3,		"sizeChangeVariation"   : -4,
		"alpha"  : 1,		"alphaVariation"  : 0,		"alphaChange"  : -0.1,		"alphaChangeVariation"  : -0.02,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0.005,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	

	4 : { 	"name" : "Up flash",	"manifest" : "particle",	"manifestVariation" : 0.01,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -2,		"xSpeedVariation" : 4,		"xSpeedChange" : 0,		"xSpeedChangeVariation" : 0,
		"ySpeed" : -2,		"ySpeedVariation" : -4,		"ySpeedChange" : 1,		"ySpeedChangeVariation" : 1,
		"size"   : 10,		"sizeVariation"   : 10,		"sizeChange"   : 10,		"sizeChangeVariation"   : 10,
		"alpha"  : 0.5,		"alphaVariation"  : 0.5,	"alphaChange"  : -0.1,		"alphaChangeVariation"  : 0,

		"bounces" : true,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : false,		"bouncesRight" : false,
	
		"flashChance" : 0.01,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	

	5 : { 	"name" : "BounceBalls",	"manifest" : "crab_pearl_splash",	"manifestVariation" : 0,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -3,		"xSpeedVariation" : 6,		"xSpeedChange" : 0,		"xSpeedChangeVariation" : 0,
		"ySpeed" : -5,		"ySpeedVariation" : -5,		"ySpeedChange" : 0.5,		"ySpeedChangeVariation" : 0.5,
		"size"   : 10,		"sizeVariation"   : 0,		"sizeChange"   : 0,		"sizeChangeVariation"   : 0,
		"alpha"  : 1,		"alphaVariation"  : 0,		"alphaChange"  : -0.04,		"alphaChangeVariation"  : -0.04,

		"bounces" : false,	"bouncesTop" : false,		"bouncesBottom" : false,	"bouncesLeft" : false,		"bouncesRight" : false,
	
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
		"size"   : 25,		"sizeVariation"   : 25,		"sizeChange"   : -1,		"sizeChangeVariation"   : -2,
		"alpha"  : 1,		"alphaVariation"  : 0,		"alphaChange"  : -0.02,		"alphaChangeVariation"  : -0.02,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	

	10 : { 	"name" : "Up flash 2",	"manifest" : "particle",	"manifestVariation" : 0.01,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -2,		"xSpeedVariation" : 4,		"xSpeedChange" : 0,		"xSpeedChangeVariation" : 0,
		"ySpeed" : -2,		"ySpeedVariation" : -2,		"ySpeedChange" : 1,		"ySpeedChangeVariation" : 1,
		"size"   : 5,		"sizeVariation"   : 5,		"sizeChange"   : 5,		"sizeChangeVariation"   : 5,
		"alpha"  : 0.5,		"alphaVariation"  : 0.5,	"alphaChange"  : -0.1,		"alphaChangeVariation"  : 0,

		"bounces" : true,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : false,		"bouncesRight" : false,
	
		"flashChance" : 0.01,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	
	
	11 : { 	"name" : "Flashy",	"manifest" : "particle",	"manifestVariation" : 0.01,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -1,		"xSpeedVariation" : 2,		"xSpeedChange" : 0,		"xSpeedChangeVariation" : 0,
		"ySpeed" : -1,		"ySpeedVariation" : 2,		"ySpeedChange" : 0,		"ySpeedChangeVariation" : 0,
		"size"   : 250,		"sizeVariation"   : 250,	"sizeChange"   : -10,		"sizeChangeVariation"   : -10,
		"alpha"  : 0.25,	"alphaVariation"  : 0.25,	"alphaChange"  : -0.01,		"alphaChangeVariation"  : 0,

		"bounces" : true,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : false,		"bouncesRight" : false,
	
		"flashChance" : 0.005,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	
	
	12 : { 	"name" : "Bubble",	"manifest" : "progress_0",	"manifestVariation" : 0,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : 0,		"xSpeedVariation" : 0,		"xSpeedChange" : 0,		"xSpeedChangeVariation" : 0,
		"ySpeed" : -2,		"ySpeedVariation" : -2,		"ySpeedChange" : 0,		"ySpeedChangeVariation" : 0,
		"size"   : 5,		"sizeVariation"   : 15,		"sizeChange"   : 0,		"sizeChangeVariation"   : 0,
		"alpha"  : 0.5,		"alphaVariation"  : 0.5,	"alphaChange"  : 0,		"alphaChangeVariation"  : 0,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : false,		"bouncesRight" : false,
	
		"flashChance" : 0,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	
	
	13 : { 	"name" : "Bubble up",	"manifest" : "progress_0",	"manifestVariation" : 0,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : 0,		"xSpeedVariation" : 0,		"xSpeedChange" : 0,		"xSpeedChangeVariation" : 0,
		"ySpeed" : -2,		"ySpeedVariation" : -2,		"ySpeedChange" : 0,		"ySpeedChangeVariation" : 0,
		"size"   : 5,		"sizeVariation"   : 15,		"sizeChange"   : 0,		"sizeChangeVariation"   : 0,
		"alpha"  : 0.5,		"alphaVariation"  : 0.5,	"alphaChange"  : 0,		"alphaChangeVariation"  : 0,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : false,		"bouncesRight" : false,
	
		"flashChance" : 0,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	

	14 : { 	"name" : "Mini Glitter yellow/red",	"manifest" : "particle_yellow",	"manifestVariation" : 0.5,	"manifestVariationManifest" : "particle_red",		
	
		"xSpeed" : -1,		"xSpeedVariation" : 1,		"xSpeedChange" : 0.01,		"xSpeedChangeVariation" : 0,
		"ySpeed" : 1,		"ySpeedVariation" : -2,		"ySpeedChange" : -0.1,		"ySpeedChangeVariation" : 0,
		"size"   : 25,		"sizeVariation"   : 25,		"sizeChange"   : -1,		"sizeChangeVariation"   : -2,
		"alpha"  : 1,		"alphaVariation"  : 0,		"alphaChange"  : -0.02,		"alphaChangeVariation"  : -0.02,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	


	15 : { 	"name" : "Bubble big",	"manifest" : "progress_0",	"manifestVariation" : 0,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : 0,		"xSpeedVariation" : 0,		"xSpeedChange" : 0,		"xSpeedChangeVariation" : 0,
		"ySpeed" : -1,		"ySpeedVariation" : -1,		"ySpeedChange" : -0.05,		"ySpeedChangeVariation" : -0.05,
		"size"   : 10,		"sizeVariation"   : 50,		"sizeChange"   : 0,		"sizeChangeVariation"   : 0,
		"alpha"  : 0.25,	"alphaVariation"  : 0.75,	"alphaChange"  : -0.05,		"alphaChangeVariation"  : -0.05,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : false,		"bouncesRight" : false,
	
		"flashChance" : 0,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	

	16 : { 	"name" : "Black Smoke exhaust",	"manifest" : "particle",	"manifestVariation" : 1,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : 0,		"xSpeedVariation" : 0,		"xSpeedChange" : 0.1,		"xSpeedChangeVariation" : 0.1,
		"ySpeed" : 2,		"ySpeedVariation" : 2,		"ySpeedChange" : -0.0,		"ySpeedChangeVariation" : -0.0,
		"size"   : 10,		"sizeVariation"   : 10,		"sizeChange"   : 2,		"sizeChangeVariation"   : 2,
		"alpha"  : 0.6,		"alphaVariation"  : 0.5,	"alphaChange"  : -0.02,		"alphaChangeVariation"  : -0.02,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	

	17 : { 	"name" : "Motor foam",	"manifest" : "particle",	"manifestVariation" : 0.75,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : 0,		"xSpeedVariation" : 0,		"xSpeedChange" : 0,		"xSpeedChangeVariation" : 0,
		"ySpeed" : 0,		"ySpeedVariation" : 0,		"ySpeedChange" : 0,		"ySpeedChangeVariation" : 0,
		"size"   : 1,		"sizeVariation"   : 10,		"sizeChange"   : 5,		"sizeChangeVariation"   : 5,
		"alpha"  : 0.08,	"alphaVariation"  : 0.1,	"alphaChange"  : -0.003,	"alphaChangeVariation"  : -0.002,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	
	
	18 : { 	"name" : "Motor foam opponent",	"manifest" : "particle",	"manifestVariation" : 0,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : 0,		"xSpeedVariation" : 0,		"xSpeedChange" : 0,		"xSpeedChangeVariation" : 0,
		"ySpeed" : 0,		"ySpeedVariation" : 0,		"ySpeedChange" : 0,		"ySpeedChangeVariation" : 0,
		"size"   : 1,		"sizeVariation"   : 50,		"sizeChange"   : 1,		"sizeChangeVariation"   : 10,
		"alpha"  : 0.020,	"alphaVariation"  : 0.015,	"alphaChange"  : -0.005,	"alphaChangeVariation"  : -0.001,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	
	
	19 : { 	"name" : "Firework",	"manifest" : "particle",	"manifestVariation" : 0,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -2,		"xSpeedVariation" : 4,		"xSpeedChange" : 0,		"xSpeedChangeVariation" : 0,
		"ySpeed" : -5,		"ySpeedVariation" : -5,		"ySpeedChange" : 0.10,		"ySpeedChangeVariation" : 0,
		"size"   : 10,		"sizeVariation"   : 10,		"sizeChange"   : 0,		"sizeChangeVariation"   : 0,
		"alpha"  : 1,		"alphaVariation"  : 0,		"alphaChange"  : -0.005,		"alphaChangeVariation"  : -0.005,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	
	
	
	20 : { 	"name" : "Firework explosion",	"manifest" : "particle",	"manifestVariation" : 0,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -5,		"xSpeedVariation" : 10,		"xSpeedChange" : 0,		"xSpeedChangeVariation" : 0,
		"ySpeed" : -5,		"ySpeedVariation" : 10,		"ySpeedChange" : 0.30,		"ySpeedChangeVariation" : 0,
		"size"   : 5,		"sizeVariation"   : 25,		"sizeChange"   : -1,		"sizeChangeVariation"   : 0,
		"alpha"  : 0.50,	"alphaVariation"  : 0.50,	"alphaChange"  : -0.01,		"alphaChangeVariation"  : -0.01,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0.1,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	


	21 : { 	"name" : "Static Glitter",	"manifest" : "particle",	"manifestVariation" : 0,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -1,		"xSpeedVariation" : 1,		"xSpeedChange" : 0.01,		"xSpeedChangeVariation" : 0,
		"ySpeed" : 1,		"ySpeedVariation" : -2,		"ySpeedChange" : -0.1,		"ySpeedChangeVariation" : 0,
		"size"   : 25,		"sizeVariation"   : 25,		"sizeChange"   : -1,		"sizeChangeVariation"   : -2,
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