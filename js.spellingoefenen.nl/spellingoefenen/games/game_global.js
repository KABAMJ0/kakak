// *** Get Element
function ge(elementId)
{
	if(document.getElementById(elementId))
	{	
		return(document.getElementById(elementId));
	}
	else
	{
		console.warn("A div with id " + elementId + " could not be found!");
		return(false);
	}
}

function gec(elementId)
{
	if(document.getElementById(elementId))
	{	
		return(true);
	}
	else
	{
		return(false);
	}
}


// *** Device checks and hacks
function deviceChecksPreInit()
{
	message = "";
	
	// *** Windows phone: no audio
	if(isWindowsPhone)
	{
		globalAudio = false;
		globalAudioDisabled = true;
		message += "Voor prestatiedoeleinden, is geluid uitgeschakeld op Windows Phone.<br>";
	}
	
	// *** Android tip
	if(isAndroid) message += "Speel fullscreen voor een betere ervaring!<br>";

	// *** iPhone tip: Add to homescreen for fullscreen
	if(isIphone)
	{
		globalFullscreenDisabled = true;			
		message += "Voeg het spel toe aan het startscherm en speel fullscreen!<br>";
	}
	
	return(message);
}

function deviceChecksPostInit()
{
	// *** Downscaling for iPhones (addresbars take up height)
	if(isIphone)
	{
		if(window.navigator.standalone == true)
		{
			// *** Web app view on iPhone
		}
		else
		{
			// *** Browser view on iPhone
			percentage = 80;
			console.log("iPhone downscaling percentage: " + percentage + " and vertical align applied");
			
			ge("myCanvas").style.width = percentage + "%";					
			ge("myCanvasTd").style.verticalAlign = "top";	
			
			$('body,html').animate({"scrollTop": 0}, 100);
		}
	}
	
	// *** Android must be in fullscreen as navigation bars are too big
	if(isAndroid) ge("fullscreen_phone").style.display = "table";
		
}

function toggleFullScreen()
{
	if(globalFullscreen) globalFullscreen = false; else globalFullscreen = true;
	
	var doc = window.document;
	var docEl = doc.documentElement;
	
	var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
	var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
	
	if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement)
	{
		requestFullScreen.call(docEl);
	}
	else
	{
		cancelFullScreen.call(doc);
	}	
}



// *** Sound playback and buffering / preloading images
function playSound(thisSound)
{
	if(globalAudio)
	{
		if(!userInteractionOccured && iOS)
		{
			console.log("Could not play sound because no user interaction has yet occured on iOS");
		}
		else
		{
			if(typeof manifest[thisSound] != 'undefined')
			{
				if(!window.AudioContext || audioNoBuffer)
				{
					//console.log("IE playSound: " + thisSound);
					if(manifest[thisSound].currentTime) manifest[thisSound].currentTime = 0;
					manifest[thisSound].play();
				}
				else
				{
					var source = soundContext.createBufferSource();
					source.buffer = soudBufferList[manifest[thisSound]];
					source.connect(soundContext.destination);
					source.start(0);
				}
			}
			else
			{
				console.log("playSound: " + thisSound + " undefined!");
			}
		}
	}
}

function switchSound()
{	
	if(globalAudio)
	{				
		globalAudio = false;
	}
	else
	{		
		globalAudio = true;
		playSound("sword");
	}
	
	console.log("switchSound to " + globalAudio);	
}

function getSoundExtension()
{
	if((new Audio()).canPlayType("audio/mpeg")) extension = "mp3"; else extension = "wav";	
	return(extension);
}

function manifestSound(soundName, soundFile)
{
	manifest_total++;
	
	if(!window.AudioContext || audioNoBuffer)
	{
		manifest[soundName] = new Audio();
		manifest[soundName].src = soundFile;

		manifest[soundName].onloadeddata = function() // onloadeddata
		{
			manifest_count++;
			updatePreloader();
		}		
	}
	else
	{
		//console.log("Adding to buffer: " + soundName + " -> " + soundFile);
		manifest[soundName] = "BUFFER:" + soundFile;
	}
}

function manifestImage(imageName, imageFile)
{
	manifest_total++;

	manifest[imageName] = new Image(); 
	manifest[imageName].src = imageFile;
	
	manifest[imageName].onload = function()
	{
		manifest_count++;
		//console.log(manifest_count + " / " + manifest_total + " loaded");

		updatePreloader();
	}	
}

function finishedLoading(bufferList)
{
	soudBufferList = bufferList;
	
	thisSoundCount = 0;
	
	for(key in manifest)
	{
		if(manifest[key].toString().substr(0, 7) == "BUFFER:")
		{
			//console.log(key + ": " + thisSoundCount);
			manifest[key] = thisSoundCount;
			thisSoundCount++;
		}
	}
}

// *** Sound bufferloader class
function bufferSound()
{
	if(!window.AudioContext || audioNoBuffer)
	{
		console.log("bufferSound: webAudioAPI is not supported by your browser (buffering not possible on IE / local)");
	}
	else
	{
		console.log("bufferSound: Buffering sound...");
			
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		soundContext = new AudioContext();
		
		tempSoundArray = new Array();
		
		for(key in manifest)
		{
			if(manifest[key].toString().substr(0, 7) == "BUFFER:")
			{
				source = manifest[key].toString().substr(7);
				tempSoundArray.push(source);
			}
		}
				
		soundBufferLoader = new BufferLoader(
		soundContext,
		tempSoundArray,
		finishedLoading
		);
		
		soundBufferLoader.load();	
	}
}

function BufferLoader(soundContext, urlList, callback)
{
	this.soundContext = soundContext;
	this.urlList = urlList;
	this.onload = callback;
	this.bufferList = new Array();
	this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function(url, index) 
{
	// Load buffer asynchronously
	var request = new XMLHttpRequest();
	request.open("GET", url, true);
	request.responseType = "arraybuffer";
	
	var loader = this;
	
	request.onload = function()
	{
		// Asynchronously decode the audio file data in request.response
		//alert(manifest_count + " / " + manifest_total + " loaded");
		
		loader.soundContext.decodeAudioData(
		
		request.response,
		
		function(buffer) 
		{
			if (!buffer) 
			{
				alert('error decoding file data: ' + url);
				return;
			}
			
			loader.bufferList[index] = buffer;
			
			if (++loader.loadCount == loader.urlList.length) loader.onload(loader.bufferList);
		
			manifest_count++;
			updatePreloader();		
		},
		
		function(error)
		{
			console.error('decodeAudioData error', error);
		}
		
		);
	
	}
	
	request.onerror = function()
	{
		alert('BufferLoader: XHR error');
	}
	
	request.send();
}

BufferLoader.prototype.load = function()
{
	for (var i = 0; i < this.urlList.length; ++i)
	{
		this.loadBuffer(this.urlList[i], i);
	}
}

// *** Start a potential drag in game (mouse position must move a certain distance before actual drag starts)
function startDrag(thisX, thisY)
{
	//console.log("----startDrag: " + thisX + ", " + thisY);

	if(!isNaN(thisX) && !isNaN(thisY) && thisX != 0 && thisY != 0)
	{
		thisX = scaleX(thisX);
		thisY = scaleY(thisY);
		
		//console.log("startDrag: " + thisX + ", " + thisY + " | " + dragging_x + "," + dragging_y);
		
		if(dragging_x == 0 && dragging_y == 0)
		{
			//console.log("startDrag: dragging anticipated at " + thisX + ", " + thisY);
			
			dragging_x = thisX;
			dragging_y = thisY;
			
			dragging_check = true;
		}
	}	
}

function getMousePos(canvas, evt)
{
	var rect = canvas.getBoundingClientRect();

	if(evt.type == 'touchstart' || evt.type == 'touchmove' || evt.type == 'touchend' || evt.type == 'touchcancel')
	{
        	var touch = evt.touches[0] || evt.changedTouches[0];
        
		mouse_x = touch.pageX - rect.left;
		mouse_y = touch.pageY - rect.top;        	
        }
        else
        {
		mouse_x = evt.clientX - rect.left;
		mouse_y = evt.clientY - rect.top;
	}
	
	mouse_x = scaleX(mouse_x);
	mouse_y = scaleY(mouse_y);
	
	spot["MOUSE"].x = mouse_x;
	spot["MOUSE"].y = mouse_y;

	//console.log("getMousePos: " + mouse_x + "," + mouse_y);

	if(dragging_check)
	{
		/*
		drag(dragging_x, dragging_y);
		dragging_check = false;		
		dragging = true;
		*/
					
		snapArea = 10;
		
		if(mouse_x > dragging_x - snapArea && mouse_x < dragging_x + snapArea && mouse_y > dragging_y - snapArea && mouse_y < dragging_y + snapArea)
		{
			
		}
		else
		{
			//console.log("getMousePos: Drag snap area reached: " + mouse_x + " / " + dragging_x);
			
			drag(dragging_x, dragging_y);
			dragging_check = false;		
			dragging = true;
		}
	}
}

// *** Doubleclick in game (no use is preferable)
function doubleClick(thisX, thisY)
{
	thisX = scaleX(thisX);
	thisY = scaleY(thisY);
	
	console.log("doubleClick: " + Math.ceil(thisX) + ", " + Math.ceil(thisY));

	// *** Game actions here
	addCoins(50, "MOUSE", "STAR_SOURCE", "BOUNCE LEFT EYES");
	
	endDrag();
}

function scaleX(x)
{
	scale = 1400 / canvas.offsetWidth;
	x *= scale;
	return(x);
}

function scaleY(y)
{
	scale = 700 / canvas.offsetHeight;
	y *= scale;
	return(y);
}

function setPlay(thisPlay)
{
	play = thisPlay;
}

function dump(thisDump)
{
	console.log("DUMPING \"" + thisDump.toUpperCase() + "\":");
	
	if(thisDump == "spot")
	{
		for(key in spot)
		{
			console.log(key + ": " + spot[key].x + ", " + spot[key].y + " (rotation: " + spot[key].r + ")");
		}
	}	
}

function getParameterByName(name, url) 
{
	if (!url) url = window.location.href;
	url = url; // This is just to avoid case sensitiveness  
	name = name.replace(/[\[\]]/g, "\\$&");// This is just to avoid case sensitiveness for query parameter name
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function currency_noentities(amount)
{
	amount = currency(amount);
	amount = amount.split("&nbsp;").join(" ");
	amount = amount.split("&euro;").join("€");

	return(amount);
}

function setFramerate(thisFramerate)
{
	framerate = thisFramerate; // *** 40/1000 sec
	framerate_recalculations = Math.ceil(framerate / 40); // *** Hercalculaties per frame

	x_per_sec = (1000 / framerate) * 10; // *** 10 sec
	player_progressbar_speed = (1 / x_per_sec) * 100; // *** 100 procent
	
	//console.log("Animation speed: " + framerate);
}

function drawImage(img, x, y, width, height, deg, flip, flop, center)
{
	context.save();

	if(typeof width === "undefined") width = img.width;
	if(typeof height === "undefined") height = img.height;
	if(typeof center === "undefined") center = false;

	// Set rotation point to center of image, instead of top/left
	if(center)
	{
		x -= width/2;
		y -= height/2;
	}
	
	// Set the origin to the center of the image
	context.translate(x + width/2, y + height/2);
	
	// Rotate the canvas around the origin
	var rad = 2 * Math.PI - deg * Math.PI / 180;	
	context.rotate(rad);
	
	// Flip/flop the canvas
	if(flip) flipScale = -1; else flipScale = 1;
	if(flop) flopScale = -1; else flopScale = 1;
	context.scale(flipScale, flopScale);
	
	// Draw the image    
	context.drawImage(img, -width/2, -height/2, width, height);
	
	context.restore();
}

function updatePreloader(thisBody)
{
	//console.log("updatePreloader: " + manifest_count + " / " + manifest_total + "");
	
	if(preloadStarted)
	{
		preloaderWidth = ((manifest_count / manifest_total) * 300);
		if(preloaderWidth < 1) preloaderWidth = 1;
		
		ge("my_preloader_bar").style.width = preloaderWidth + "px";
	
		
		if(manifest_count >= manifest_total && preloadMinTimeDone)
		{
			init();
			
			setTimeout(function(){ ge('my_preloader').style.opacity = 0.80; }, 50);
			setTimeout(function(){ ge('my_preloader').style.opacity = 0.60; }, 100);
			setTimeout(function(){ ge('my_preloader').style.opacity = 0.40; }, 150);
			setTimeout(function(){ ge('my_preloader').style.opacity = 0.20; }, 200);
			setTimeout(function(){ ge('my_preloader').style.display = "none"; }, 250);
		}
	}
}

function bodyLoaded()
{
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

function startPreload()
{
	preloadStarted = true;
	ge("my_preloader_message").innerHTML = preloadMessage;
}

function ellipse(context, cx, cy, rx, ry, fillColor)
{
	context.save(); // save state
	context.beginPath();
	
	
	context.translate(cx-rx, cy-ry);
	context.scale(rx, ry);
	context.arc(1, 1, 1, 0, 2 * Math.PI, false);
	context.fillStyle = fillColor;
	context.fill();
	
	context.restore(); // restore to original state
	// context.stroke();
}

function hitTest(thisX, thisY, thisSpot, thisManifest)
{
	if(thisX >= spot[thisSpot].x && thisY >= spot[thisSpot].y && thisX <= spot[thisSpot].x + manifest[thisManifest].width && thisY <= spot[thisSpot].y + manifest[thisManifest].height)
	{
		return(true);
	}
	else
	{
		return(false);
	}
}

function hitSpot(thisX, thisY, thisSpot)
{
	if(thisX >= spot[thisSpot].x && thisY >= spot[thisSpot].y && thisX <= spot[thisSpot].x + spot[thisSpot].width && thisY <= spot[thisSpot].y + spot[thisSpot].height)
	{
		return(true);
	}
	else
	{
		return(false);
	}
}

function drawSpot(thisSpot)
{
	context.strokeStyle="red";
	context.rect(spot[thisSpot].x, spot[thisSpot].y, spot[thisSpot].width, spot[thisSpot].height);
	context.stroke();
}


// *** Converts seconds to a 0:00 format
function stopwatch(thisSeconds)
{
	var minutes = Math.floor(thisSeconds / 60);
	var seconds = thisSeconds - minutes * 60;
	
	if(seconds < 10) extraZero = "0"; else extraZero = "";
	
	timerShow = minutes + ":" + extraZero + seconds;
	
	return(timerShow);
}


function textMultipleLines(thisText, thisTextX, thisTextY, thisTextLineheight)
{
	temp = thisText.split("/");

	
	for(ii = 0; ii < temp.length; ii++)
	{
		context.fillText(temp[ii], thisTextX, thisTextY);
		thisTextY += thisTextLineheight;
	}
}



function sha1 (str) {
  //  discuss at: http://locutus.io/php/sha1/
  // original by: Webtoolkit.info (http://www.webtoolkit.info/)
  // improved by: Michael White (http://getsprink.com)
  // improved by: Kevin van Zonneveld (http://kvz.io)
  //    input by: Brett Zamir (http://brett-zamir.me)
  //      note 1: Keep in mind that in accordance with PHP, the whole string is buffered and then
  //      note 1: hashed. If available, we'd recommend using Node's native crypto modules directly
  //      note 1: in a steaming fashion for faster and more efficient hashing
  //   example 1: sha1('Kevin van Zonneveld')
  //   returns 1: '54916d2e62f65b3afa6e192e6a601cdbe5cb5897'

  var hash
  try {
    var crypto = require('crypto')
    var sha1sum = crypto.createHash('sha1')
    sha1sum.update(str)
    hash = sha1sum.digest('hex')
  } catch (e) {
    hash = undefined
  }

  if (hash !== undefined) {
    return hash
  }

  var _rotLeft = function (n, s) {
    var t4 = (n << s) | (n >>> (32 - s))
    return t4
  }

  var _cvtHex = function (val) {
    var str = ''
    var i
    var v

    for (i = 7; i >= 0; i--) {
      v = (val >>> (i * 4)) & 0x0f
      str += v.toString(16)
    }
    return str
  }

  var blockstart
  var i, j
  var W = new Array(80)
  var H0 = 0x67452301
  var H1 = 0xEFCDAB89
  var H2 = 0x98BADCFE
  var H3 = 0x10325476
  var H4 = 0xC3D2E1F0
  var A, B, C, D, E
  var temp

  // utf8_encode
  str = unescape(encodeURIComponent(str))
  var strLen = str.length

  var wordArray = []
  for (i = 0; i < strLen - 3; i += 4) {
    j = str.charCodeAt(i) << 24 |
      str.charCodeAt(i + 1) << 16 |
      str.charCodeAt(i + 2) << 8 |
      str.charCodeAt(i + 3)
    wordArray.push(j)
  }

  switch (strLen % 4) {
    case 0:
      i = 0x080000000
      break
    case 1:
      i = str.charCodeAt(strLen - 1) << 24 | 0x0800000
      break
    case 2:
      i = str.charCodeAt(strLen - 2) << 24 | str.charCodeAt(strLen - 1) << 16 | 0x08000
      break
    case 3:
      i = str.charCodeAt(strLen - 3) << 24 |
        str.charCodeAt(strLen - 2) << 16 |
        str.charCodeAt(strLen - 1) <<
      8 | 0x80
      break
  }

  wordArray.push(i)

  while ((wordArray.length % 16) !== 14) {
    wordArray.push(0)
  }

  wordArray.push(strLen >>> 29)
  wordArray.push((strLen << 3) & 0x0ffffffff)

  for (blockstart = 0; blockstart < wordArray.length; blockstart += 16) {
    for (i = 0; i < 16; i++) {
      W[i] = wordArray[blockstart + i]
    }
    for (i = 16; i <= 79; i++) {
      W[i] = _rotLeft(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1)
    }

    A = H0
    B = H1
    C = H2
    D = H3
    E = H4

    for (i = 0; i <= 19; i++) {
      temp = (_rotLeft(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff
      E = D
      D = C
      C = _rotLeft(B, 30)
      B = A
      A = temp
    }

    for (i = 20; i <= 39; i++) {
      temp = (_rotLeft(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff
      E = D
      D = C
      C = _rotLeft(B, 30)
      B = A
      A = temp
    }

    for (i = 40; i <= 59; i++) {
      temp = (_rotLeft(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff
      E = D
      D = C
      C = _rotLeft(B, 30)
      B = A
      A = temp
    }

    for (i = 60; i <= 79; i++) {
      temp = (_rotLeft(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff
      E = D
      D = C
      C = _rotLeft(B, 30)
      B = A
      A = temp
    }

    H0 = (H0 + A) & 0x0ffffffff
    H1 = (H1 + B) & 0x0ffffffff
    H2 = (H2 + C) & 0x0ffffffff
    H3 = (H3 + D) & 0x0ffffffff
    H4 = (H4 + E) & 0x0ffffffff
  }

  temp = _cvtHex(H0) + _cvtHex(H1) + _cvtHex(H2) + _cvtHex(H3) + _cvtHex(H4)
  return temp.toLowerCase()
}

function hideMe(id) { $("#" + id).fadeOut(250); }
function showMe(id) { $("#" + id).fadeIn(250); }
function toggleMe(id) { $("#" + id).fadeToggle(250); }


function validateEmail(email)
{
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

function logGamePlay(thisGamePlay)
{
	var currentdate = new Date();
	var datetime = currentdate.getFullYear() + "-" + (((currentdate.getMonth()+1) < 10)?"0":"") + (currentdate.getMonth()+1) + "-" + ((currentdate.getDate() < 10)?"0":"") + currentdate.getDate() + " " + currentdate.getHours() + ":" + ((currentdate.getMinutes() < 10)?"0":"") + currentdate.getMinutes() + ":" + ((currentdate.getSeconds() < 10)?"0":"") + currentdate.getSeconds();

	highscore_game_play += datetime + ": " + thisGamePlay + "\n";
	
	//console.log(highscore_game_play);
}

// *** Highscore related functions
function highscoreOpen()
{
	console.log("highscoreOpen");
	
	ge("submit_highscore_naam").value = highscore_name;
	ge("submit_highscore_email").value = highscore_email;
	if(highscore_agreed_terms == 1) ge("submit_highscore_algemene_voorwaarden").checked = true; else ge("submit_highscore_algemene_voorwaarden").checked = false;
	if(highscore_newsletter == 1) ge("submit_highscore_nieuwsbrief").checked = true; else ge("submit_highscore_nieuwsbrief").checked = false;
	
	showMe("popup_submit_highscore");
}


function highscoreSubmitForm()
{		
	highscore_agreed_terms = 0;	
	if(document.getElementById("submit_highscore_algemene_voorwaarden")) { if(ge("submit_highscore_algemene_voorwaarden").checked) highscore_agreed_terms = 1; }

	highscore_newsletter = 0;	
	if(document.getElementById("submit_highscore_nieuwsbrief")) { if(ge("submit_highscore_nieuwsbrief").checked) highscore_newsletter = 1; }

	highscore_name = ge("submit_highscore_naam").value;
	highscore_email = ge("submit_highscore_email").value;
	
	hideMe("popup_share");
	
	highscoreSubmit();
	
}

function highscoreSubmit()
{
	//if(typeof score === "undefined") this_score = spelledWordsCorrect; else this_score = score;
	
	this_score = score;
	
	sha_js = sha1(this_score + "a" + sha_pw + "bc" + highscore_name);
	
	setCookie("highscore_name", highscore_name);
	setCookie("highscore_email", highscore_email);
	setCookie("highscore_agreed_terms", highscore_agreed_terms);
	setCookie("highscore_newsletter", highscore_newsletter);
	
	ajaxUpdate("a=highscoreSubmit&name=" + highscore_name + "&email=" + highscore_email + "&agreed_terms=" + highscore_agreed_terms + "&newsletter=" + highscore_newsletter + "&score=" + this_score + "&sha=" + sha_js + "&game_play=" + highscore_game_play);

	highscore_game_play = "";
	submitted = true;

}

function highscoreView()
{
	console.log("highscoreView: " + highscore_email + " / score: " + score);
	
	game_status = "HIGHSCORES";
	
	//highscore_email = ""; score = 78;
	
	ajaxUpdate("a=highscoreView&email=" + highscore_email + "&score=" + score + "&highscore_list_size=" + highscore_list_size); 
	
}


// *** Ajax comm
function ajaxUpdate(dataString)
{
	console.log("ajaxUpdate: " + dataString);

	$.ajax({

		type: 'POST',
		data: dataString,
		url: ajaxComm,
	
		success:function(data){ ajaxReturn(data); }
		
	});
}

function ajaxReturn(data)
{
	var answer = $.parseJSON(data);
	
	console.log("ajaxReturn: " + answer["a"]);
	console.log(answer);
	
	if(answer["a"] == "highscoreView" && answer["status"] == "OK")
	{
		highscore_list = answer;
	}
	
	if(answer["a"] == "highscoreSubmit" && answer["status"] == "OK")
	{
		highscoreView();
	}


	if(answer["a"] == "getTaak" && answer["status"] == "OK")
	{
		console.log("ajaxReturn>getTaak");
		startWLTaakReturn(answer);
	}	
}


function drawButton(thisSpot, thisText)
{
	thisButton = manifest["button"];
	
	if(mouse_x > thisSpot.x && mouse_x < thisSpot.x + manifest["button"].width && mouse_y > thisSpot.y && mouse_y < thisSpot.y + manifest["button"].height)
	{
		if(typeof manifest["button_hover"] !== "undefined") thisButton = manifest["button_hover"];
	}
	
	drawImage(thisButton, thisSpot.x, thisSpot.y);

	context.textAlign = "center"; 
	context.fillText(thisText, thisSpot.x + manifest["button"].width / 2, thisSpot.y + manifest["button"].height - thisSpot.paddingBottom);	
}

function setCookie(cname, cvalue, exdays) {

	if(typeof exdays === "undefined") exdays = 30;
	
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}