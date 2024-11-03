// *** Taal configuratie (php config zal dit waarschijnlijk overschrijven; zoek op [js] in translations)
c_z_okee = 'okee';
c_z_annuleren = 'annuleren';
c_z_doorgaan = 'doorgaan';
c_z_het_volgende_is_nog_niet_correct = 'Het volgende is nog niet correct:';
c_z_geen_specificatie_gekozen = 'U heeft nog geen specificatie gekozen! Selecteer eerst één van de specificaties hierboven.';
c_z_u_heeft_geen_geldig_aantal_ingevuld = 'U heeft geen geldig aantal ingevuld!';
c_z_toevoeging_aan_winkelwagen_mislukt = 'Toevoeging aan winkelwagen mislukt!';
c_z_aantal_invoeren = 'Aantal invoeren';
c_z_vul_het_aantal_artikelen_in = 'Vul het aantal artikelen in dat u in uw winkelwagen wenst te hebben:';
c_z_product_verwijderen = 'Product verwijderen?';
c_z_weet_u_zeker_product_verwijderen_uit_winkelwagen = 'Weet u zeker dat u dit product wilt verwijderen uit uw winkelwagen?';
c_z_coupon_code = 'Coupon code';
c_z_voer_de_coupon_code_in = 'Voer de coupon code in:';
c_z_is_niet_gevinkt = 'is niet gevinkt!';
c_z_kies_een_optie_bij = 'Kies een optie bij';
c_z_is_niet_een_geldig_email_adres = 'is niet een geldig e-mail adres!';
c_z_is_niet_een_geldig_nummer = 'is niet een geldig nummer';
c_z_is_niet_een_geldig_jaar = 'is niet een geldig jaar (4 cijfers)';
c_z_is_niet_een_geldige_postcode = 'is niet een geldige postcode (alleen eerste 4 cijfers)';
c_z_is_niet_een_geldige_postcode_2_letters = 'is niet een geldige postcode (4 cijfers en 2 letters)';
c_z_is_niet_ingevuld = 'is niet ingevuld!';
c_z_product_toegevoegd_aan_winkelwagen = 'Product toegevoegd aan uw winkelwagen!';
c_z_het_product_is_toegevoegd = 'Het product is';
c_z_keer_toegevoegd = 'keer toegevoegd!';
c_z_verder_winkelen = 'verder winkelen';
c_z_winkelwagen = 'winkelwagen';
c_z_link_winkelwagen = '';


/* **** popupDiv callback *** */
showPopupForce = 0;
showPopupId = "";

function answerPopupDiv(answer)
{
	if(answer == 0 && (showPopupForce == 1 || showPopupForce == 3))
	{
		// *** Wegklikken mag niet!
	}
	else
	{	
		console.log("function answerPopupDiv: Op popupDiv " + showPopupId + " werd op button " + answer + " gedrukt!");
		
		// *** Msg van CheckForm
		if(showPopupId == "SEND_FORM_INCOMPLETE")
		{
			$('body,html').animate({"scrollTop":   $(CheckFormElem).offset().top - 100}, 450);
			
			CheckFormElem.focus();
			CheckFormElem.style.backgroundColor = "#ff9999";
			
			$( CheckFormElem ).animate({
			
		          marginLeft: "15px",
		          marginRight: "-15px"

		        }, 450 );
		        
			setTimeout(function() {

				setTimeout(function(){ CheckFormElem.style.backgroundColor = CheckFormBGcolor; }, 1000);
											
				$( CheckFormElem ).animate({
				
			          marginLeft: "0px",
			          marginRight: "0px"
	
			        }, {duration: 1000, easing: 'easeOutBounce'} );
			        
			}, 500);			        
			
		}



		// *** Winkelwagen: Toevoegen en naar winkelwagen
		if(showPopupId == "WINKELWAGEN_ADD" && answer == 2)
		{
			if(c_z_link_winkelwagen == '') scrollToMarker("winkelwagen"); else document.location = c_z_link_winkelwagen;
		}
		

		// *** Winkelwagen: Coupon code ingevoerd
		if(showPopupId == "WINKELWAGEN_COUPON_CODE" && answer == 1)
		{
			ge('coupon').value = ge('popup_input').value;
			updateWinkelwagen(0);
		}
		
		// *** Winkelwagen: Verwijderen
		if(showPopupId.substr(0, 19) == "WINKELWAGEN_DELETE:" && answer == 1)
		{
			winkelwagen_id = showPopupId.substr(19);
			console.log('Setting winkelwagen delete input dww_' + winkelwagen_id + ' naar waarde 1');
			
			ge('dww_' + winkelwagen_id).value = '1';
			updateWinkelwagen(0);
		}
				
		// *** Winkelwagen: Aantal wijzigen
		if(showPopupId.substr(0, 24) == "WINKELWAGEN_EDIT_AMOUNT:" && answer == 1)
		{
			winkelwagen_id = showPopupId.substr(24);
			winkelwagen_waarde = ge('popup_input').value;
			
			console.log('Setting winkelwagen amount input aww_' + winkelwagen_id + ' naar waarde ' + winkelwagen_waarde);
			
			ge('aww_' + winkelwagen_id).value = winkelwagen_waarde;
			updateWinkelwagen(0);
		}	
		
		// *** Redirect
		if(showPopupId.substr(0, 9) == "REDIRECT:" && answer == 1)
		{
			redirect = showPopupId.substr(9);
			document.location = redirect;
		}
		
				
		hidePopupDiv("");
	}
}





/*
Lightbox v2.51
by Lokesh Dhakar - http://www.lokeshdhakar.com

For more information, visit:
http://lokeshdhakar.com/projects/lightbox2/

Licensed under the Creative Commons Attribution 2.5 License - http://creativecommons.org/licenses/by/2.5/
- free for use in both personal and commercial projects
- attribution requires leaving author name, author link, and the license info intact
	
Thanks
- Scott Upton(uptonic.com), Peter-Paul Koch(quirksmode.com), and Thomas Fuchs(mir.aculo.us) for ideas, libs, and snippets.
- Artemy Tregubenko (arty.name) for cleanup and help in updating to latest proto-aculous in v2.05.


Table of Contents
=================
LightboxOptions

Lightbox
- constructor
- init
- enable
- build
- start
- changeImage
- sizeContainer
- showImage
- updateNav
- updateDetails
- preloadNeigbhoringImages
- enableKeyboardNav
- disableKeyboardNav
- keyboardAction
- end

options = new LightboxOptions
lightbox = new Lightbox options
*/

(function() {
  var $, Lightbox, LightboxOptions;

  $ = jQuery;

  LightboxOptions = (function() {

    function LightboxOptions() {
      this.fileLoadingImage = '/images/lightbox/loading.gif';
      this.fileCloseImage = '/images/lightbox/close.png';
      this.resizeDuration = 300;
      this.fadeDuration = 300;
      this.labelImage = "Image";
      this.labelOf = "of";
    }

    return LightboxOptions;

  })();

  Lightbox = (function() {

    function Lightbox(options) {
      this.options = options;
      this.album = [];
      this.currentImageIndex = void 0;
      this.init();
    }

    Lightbox.prototype.init = function() {
      this.enable();
      return this.build();
    };

    Lightbox.prototype.enable = function() {
      var _this = this;
      return $('body').on('click', 'a[rel^=lightbox], area[rel^=lightbox]', function(e) {
        _this.start($(e.currentTarget));
        return false;
      });
    };

    Lightbox.prototype.build = function() {
      var $lightbox,
        _this = this;
      $("<div>", {
        id: 'lightboxOverlay'
      }).after($('<div/>', {
        id: 'lightbox'
      }).append($('<div/>', {
        "class": 'lb-outerContainer'
      }).append($('<div/>', {
        "class": 'lb-container'
      }).append($('<img/>', {
        "class": 'lb-image'
      }), $('<div/>', {
        "class": 'lb-nav'
      }).append($('<a/>', {
        "class": 'lb-prev'
      }), $('<a/>', {
        "class": 'lb-next'
      })), $('<div/>', {
        "class": 'lb-loader'
      }).append($('<a/>', {
        "class": 'lb-cancel'
      }).append($('<img/>', {
        src: this.options.fileLoadingImage
      }))))), $('<div/>', {
        "class": 'lb-dataContainer'
      }).append($('<div/>', {
        "class": 'lb-data'
      }).append($('<div/>', {
        "class": 'lb-details'
      }).append($('<span/>', {
        "class": 'lb-caption'
      }), $('<span/>', {
        "class": 'lb-number'
      })), $('<div/>', {
        "class": 'lb-closeContainer'
      }).append($('<a/>', {
        "class": 'lb-close'
      }).append($('<img/>', {
        src: this.options.fileCloseImage
      }))))))).appendTo($('body'));
      $('#lightboxOverlay').hide().on('click', function(e) {
        _this.end();
        return false;
      });
      $lightbox = $('#lightbox');
      $lightbox.hide().on('click', function(e) {
        if ($(e.target).attr('id') === 'lightbox') _this.end();
        return false;
      });
      $lightbox.find('.lb-outerContainer').on('click', function(e) {
        if ($(e.target).attr('id') === 'lightbox') _this.end();
        return false;
      });
      $lightbox.find('.lb-prev').on('click', function(e) {
        _this.changeImage(_this.currentImageIndex - 1);
        return false;
      });
      $lightbox.find('.lb-next').on('click', function(e) {
        _this.changeImage(_this.currentImageIndex + 1);
        return false;
      });
      $lightbox.find('.lb-loader, .lb-close').on('click', function(e) {
        _this.end();
        return false;
      });
    };

    Lightbox.prototype.start = function($link) {
      var $lightbox, $window, a, i, imageNumber, left, top, _len, _ref;
      $(window).on("resize", this.sizeOverlay);
      $('select, object, embed').css({
        visibility: "hidden"
      });
      $('#lightboxOverlay').width($(document).width()).height($(document).height()).fadeIn(this.options.fadeDuration);
      this.album = [];
      imageNumber = 0;
      if ($link.attr('rel') === 'lightbox') {
        this.album.push({
          link: $link.attr('href'),
          title: $link.attr('title')
        });
      } else {
        _ref = $($link.prop("tagName") + '[rel="' + $link.attr('rel') + '"]');
        for (i = 0, _len = _ref.length; i < _len; i++) {
          a = _ref[i];
          this.album.push({
            link: $(a).attr('href'),
            title: $(a).attr('title')
          });
          if ($(a).attr('href') === $link.attr('href')) imageNumber = i;
        }
      }
      $window = $(window);
      top = $window.scrollTop() + $window.height() / 10;
      left = $window.scrollLeft();
      $lightbox = $('#lightbox');
      $lightbox.css({
        top: top + 'px',
        left: left + 'px'
      }).fadeIn(this.options.fadeDuration);
      this.changeImage(imageNumber);
    };

    Lightbox.prototype.changeImage = function(imageNumber) {
      var $image, $lightbox, preloader,
        _this = this;
      this.disableKeyboardNav();
      $lightbox = $('#lightbox');
      $image = $lightbox.find('.lb-image');
      this.sizeOverlay();
      $('#lightboxOverlay').fadeIn(this.options.fadeDuration);
      $('.loader').fadeIn('slow');
      $lightbox.find('.lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption').hide();
      $lightbox.find('.lb-outerContainer').addClass('animating');
      preloader = new Image;
      preloader.onload = function() {
        $image.attr('src', _this.album[imageNumber].link);
        $image.width = preloader.width;
        $image.height = preloader.height;
        return _this.sizeContainer(preloader.width, preloader.height);
      };
      preloader.src = this.album[imageNumber].link;
      this.currentImageIndex = imageNumber;
    };

    Lightbox.prototype.sizeOverlay = function() {
      return $('#lightboxOverlay').width($(document).width()).height($(document).height());
    };

    Lightbox.prototype.sizeContainer = function(imageWidth, imageHeight) {
      var $container, $lightbox, $outerContainer, containerBottomPadding, containerLeftPadding, containerRightPadding, containerTopPadding, newHeight, newWidth, oldHeight, oldWidth,
        _this = this;
      $lightbox = $('#lightbox');
      $outerContainer = $lightbox.find('.lb-outerContainer');
      oldWidth = $outerContainer.outerWidth();
      oldHeight = $outerContainer.outerHeight();
      $container = $lightbox.find('.lb-container');
      containerTopPadding = parseInt($container.css('padding-top'), 10);
      containerRightPadding = parseInt($container.css('padding-right'), 10);
      containerBottomPadding = parseInt($container.css('padding-bottom'), 10);
      containerLeftPadding = parseInt($container.css('padding-left'), 10);
      newWidth = imageWidth + containerLeftPadding + containerRightPadding;
      newHeight = imageHeight + containerTopPadding + containerBottomPadding;
      if (newWidth !== oldWidth && newHeight !== oldHeight) {
        $outerContainer.animate({
          width: newWidth,
          height: newHeight
        }, this.options.resizeDuration, 'swing');
      } else if (newWidth !== oldWidth) {
        $outerContainer.animate({
          width: newWidth
        }, this.options.resizeDuration, 'swing');
      } else if (newHeight !== oldHeight) {
        $outerContainer.animate({
          height: newHeight
        }, this.options.resizeDuration, 'swing');
      }
      setTimeout(function() {
        $lightbox.find('.lb-dataContainer').width(newWidth);
        $lightbox.find('.lb-prevLink').height(newHeight);
        $lightbox.find('.lb-nextLink').height(newHeight);
        _this.showImage();
      }, this.options.resizeDuration);
    };

    Lightbox.prototype.showImage = function() {
      var $lightbox;
      $lightbox = $('#lightbox');
      $lightbox.find('.lb-loader').hide();
      $lightbox.find('.lb-image').fadeIn('slow');
      this.updateNav();
      this.updateDetails();
      this.preloadNeighboringImages();
      this.enableKeyboardNav();
    };

    Lightbox.prototype.updateNav = function() {
      var $lightbox;
      $lightbox = $('#lightbox');
      $lightbox.find('.lb-nav').show();
      if (this.currentImageIndex > 0) $lightbox.find('.lb-prev').show();
      if (this.currentImageIndex < this.album.length - 1) {
        $lightbox.find('.lb-next').show();
      }
    };

    Lightbox.prototype.updateDetails = function() {
      var $lightbox,
        _this = this;
      $lightbox = $('#lightbox');
      if (typeof this.album[this.currentImageIndex].title !== 'undefined' && this.album[this.currentImageIndex].title !== "") {
        $lightbox.find('.lb-caption').html(this.album[this.currentImageIndex].title).fadeIn('fast');
      }
      if (this.album.length > 1) {
        $lightbox.find('.lb-number').html(this.options.labelImage + ' ' + (this.currentImageIndex + 1) + ' ' + this.options.labelOf + '  ' + this.album.length).fadeIn('fast');
      } else {
        $lightbox.find('.lb-number').hide();
      }
      $lightbox.find('.lb-outerContainer').removeClass('animating');
      $lightbox.find('.lb-dataContainer').fadeIn(this.resizeDuration, function() {
        return _this.sizeOverlay();
      });
    };

    Lightbox.prototype.preloadNeighboringImages = function() {
      var preloadNext, preloadPrev;
      if (this.album.length > this.currentImageIndex + 1) {
        preloadNext = new Image;
        preloadNext.src = this.album[this.currentImageIndex + 1].link;
      }
      if (this.currentImageIndex > 0) {
        preloadPrev = new Image;
        preloadPrev.src = this.album[this.currentImageIndex - 1].link;
      }
    };

    Lightbox.prototype.enableKeyboardNav = function() {
      $(document).on('keyup.keyboard', $.proxy(this.keyboardAction, this));
    };

    Lightbox.prototype.disableKeyboardNav = function() {
      $(document).off('.keyboard');
    };

    Lightbox.prototype.keyboardAction = function(event) {
      var KEYCODE_ESC, KEYCODE_LEFTARROW, KEYCODE_RIGHTARROW, key, keycode;
      KEYCODE_ESC = 27;
      KEYCODE_LEFTARROW = 37;
      KEYCODE_RIGHTARROW = 39;
      keycode = event.keyCode;
      key = String.fromCharCode(keycode).toLowerCase();
      if (keycode === KEYCODE_ESC || key.match(/x|o|c/)) {
        this.end();
      } else if (key === 'p' || keycode === KEYCODE_LEFTARROW) {
        if (this.currentImageIndex !== 0) {
          this.changeImage(this.currentImageIndex - 1);
        }
      } else if (key === 'n' || keycode === KEYCODE_RIGHTARROW) {
        if (this.currentImageIndex !== this.album.length - 1) {
          this.changeImage(this.currentImageIndex + 1);
        }
      }
    };

    Lightbox.prototype.end = function() {
      this.disableKeyboardNav();
      $(window).off("resize", this.sizeOverlay);
      $('#lightbox').fadeOut(this.options.fadeDuration);
      $('#lightboxOverlay').fadeOut(this.options.fadeDuration);
      return $('select, object, embed').css({
        visibility: "visible"
      });
    };

    return Lightbox;

  })();

  $(function() {
    var lightbox, options;
    options = new LightboxOptions;
    return lightbox = new Lightbox(options);
  });

}).call(this);










/* Ultimate Fade-in slideshow (v2.4)
* Last updated: May 24th, 2010. This notice must stay intact for usage 
* Author: Dynamic Drive at http://www.dynamicdrive.com/
* Visit http://www.dynamicdrive.com/ for full source code
*/

//Oct 6th, 09' (v2.1): Adds option to randomize display order of images, via new option displaymode.randomize
//May 24th, 10' (v2.4): Adds new "peakaboo" option to "descreveal" setting. oninit and onslide event handlers added.

var fadeSlideShow_descpanel={
	controls: [['x.png',7,7], ['restore.png',10,11], ['/images/lightbox/loading.gif',54,55]], //full URL and dimensions of close, restore, and loading images
	fontStyle: '', //font style for text descriptions
	slidespeed: 450 //speed of description panel animation (in millisec)
}

//No need to edit beyond here...

function fadeSlideShow(settingarg){
	this.setting=settingarg
	settingarg=null
	var setting=this.setting
	setting.fadeduration=setting.fadeduration? parseInt(setting.fadeduration) : 500
	setting.curimage=(setting.persist)? fadeSlideShow.routines.getCookie("gallery-"+setting.wrapperid) : 0
	setting.curimage=setting.curimage || 0 //account for curimage being null if cookie is empty
	setting.currentstep=0 //keep track of # of slides slideshow has gone through (applicable in displaymode='auto' only)
	setting.totalsteps=setting.imagearray.length*(setting.displaymode.cycles>0? setting.displaymode.cycles : Infinity) //Total steps limit (applicable in displaymode='auto' only w/ cycles>0)
	setting.fglayer=0, setting.bglayer=1 //index of active and background layer (switches after each change of slide)
	setting.oninit=setting.oninit || function(){}
	setting.onslide=setting.onslide || function(){}
	if (setting.displaymode.randomize) //randomly shuffle order of images?
		setting.imagearray.sort(function() {return 0.5 - Math.random()})
	var preloadimages=[] //preload images
	setting.longestdesc="" //get longest description of all slides. If no desciptions defined, variable contains ""
	for (var i=0; i<setting.imagearray.length; i++){ //preload images
		preloadimages[i]=new Image()
		preloadimages[i].src=setting.imagearray[i][0]
		if (setting.imagearray[i][3] && setting.imagearray[i][3].length>setting.longestdesc.length)
			setting.longestdesc=setting.imagearray[i][3]
	}
	var closebutt=fadeSlideShow_descpanel.controls[0] //add close button to "desc" panel if descreveal="always"
	setting.closebutton=(setting.descreveal=="always")? '<img class="close" src="'+closebutt[0]+'" style="float:right;cursor:hand;cursor:pointer;width:'+closebutt[1]+'px;height:'+closebutt[2]+'px;margin-left:2px" title="Hide Description" />' : ''
	var slideshow=this
	jQuery(document).ready(function($){ //fire on DOM ready
		var setting=slideshow.setting
		var fullhtml=fadeSlideShow.routines.getFullHTML(setting.imagearray) //get full HTML of entire slideshow
		setting.$wrapperdiv=$('#'+setting.wrapperid).css({position:'relative', visibility:'visible', overflow:'hidden', width:setting.dimensions[0], height:setting.dimensions[1]}).empty() //main slideshow DIV
		if (setting.$wrapperdiv.length==0){ //if no wrapper DIV found
			alert("Error: DIV with ID \""+setting.wrapperid+"\" not found on page.")
			return
		}
		setting.$gallerylayers=$('<div class="gallerylayer"></div><div class="gallerylayer"></div>') //two stacked DIVs to display the actual slide 
			.css({position:'absolute', left:0, top:0, width:'100%', height:'100%'})
			.appendTo(setting.$wrapperdiv)
		var $loadingimg=$('<img src="'+fadeSlideShow_descpanel.controls[2][0]+'" style="position:absolute;width:'+fadeSlideShow_descpanel.controls[2][1]+';height:'+fadeSlideShow_descpanel.controls[2][2]+'" />')
			.css({left:setting.dimensions[0]/2-fadeSlideShow_descpanel.controls[2][1]/2, top:setting.dimensions[1]/2-fadeSlideShow_descpanel.controls[2][2]}) //center loading gif
			.appendTo(setting.$wrapperdiv)
		var $curimage=setting.$gallerylayers.html(fullhtml).find('img').hide().eq(setting.curimage) //prefill both layers with entire slideshow content, hide all images, and return current image
		if (setting.longestdesc!="" && setting.descreveal!="none"){ //if at least one slide contains a description (versus feature is enabled but no descriptions defined) and descreveal not explicitly disabled
			fadeSlideShow.routines.adddescpanel($, setting)
			if (setting.descreveal=="always"){ //position desc panel so it's visible to begin with
				setting.$descpanel.css({top:setting.dimensions[1]-setting.panelheight})
				setting.$descinner.click(function(e){ //asign click behavior to "close" icon
					if (e.target.className=="close"){
						slideshow.showhidedescpanel('hide')
					}
				})
				setting.$restorebutton.click(function(e){ //asign click behavior to "restore" icon
					slideshow.showhidedescpanel('show')
					$(this).css({visibility:'hidden'})
				})
			}
			else if (setting.descreveal=="ondemand"){ //display desc panel on demand (mouseover)
				setting.$wrapperdiv.bind('mouseenter', function(){slideshow.showhidedescpanel('show')})
				setting.$wrapperdiv.bind('mouseleave', function(){slideshow.showhidedescpanel('hide')})
			}
		}
		setting.$wrapperdiv.bind('mouseenter', function(){setting.ismouseover=true}) //pause slideshow mouseover
		setting.$wrapperdiv.bind('mouseleave', function(){setting.ismouseover=false})
		if ($curimage.get(0).complete){ //accounf for IE not firing image.onload
			$loadingimg.hide()
			slideshow.paginateinit($)
			slideshow.showslide(setting.curimage)
		}
		else{ //initialize slideshow when first image has fully loaded
			$loadingimg.hide()
			slideshow.paginateinit($)
			$curimage.bind('load', function(){slideshow.showslide(setting.curimage)})
		}
		setting.oninit.call(slideshow) //trigger oninit() event
		$(window).bind('unload', function(){ //clean up and persist
			if (slideshow.setting.persist) //remember last shown image's index
				fadeSlideShow.routines.setCookie("gallery-"+setting.wrapperid, setting.curimage)
			jQuery.each(slideshow.setting, function(k){
				if (slideshow.setting[k] instanceof Array){
					for (var i=0; i<slideshow.setting[k].length; i++){
						if (slideshow.setting[k][i].tagName=="DIV") //catches 2 gallerylayer divs, gallerystatus div
							slideshow.setting[k][i].innerHTML=null
						slideshow.setting[k][i]=null
					}
				}
			})
			slideshow=slideshow.setting=null
		})
	})
}

fadeSlideShow.prototype={

	navigate:function(keyword){
		var setting=this.setting
		clearTimeout(setting.playtimer)
		if (setting.displaymode.type=="auto"){ //in auto mode
			setting.displaymode.type="manual" //switch to "manual" mode when nav buttons are clicked on
			setting.displaymode.wraparound=true //set wraparound option to true
		}
		if (!isNaN(parseInt(keyword))){ //go to specific slide?
			this.showslide(parseInt(keyword))
		}
		else if (/(prev)|(next)/i.test(keyword)){ //go back or forth inside slide?
			this.showslide(keyword.toLowerCase())
		}
	},

	showslide:function(keyword){
		var slideshow=this
		var setting=slideshow.setting
		if (setting.displaymode.type=="auto" && setting.ismouseover && setting.currentstep<=setting.totalsteps){ //if slideshow in autoplay mode and mouse is over it, pause it
			setting.playtimer=setTimeout(function(){slideshow.showslide('next')}, setting.displaymode.pause)
			return
		}
		var totalimages=setting.imagearray.length
		var imgindex=(keyword=="next")? (setting.curimage<totalimages-1? setting.curimage+1 : 0)
			: (keyword=="prev")? (setting.curimage>0? setting.curimage-1 : totalimages-1)
			: Math.min(keyword, totalimages-1)
		var $slideimage=setting.$gallerylayers.eq(setting.bglayer).find('img').hide().eq(imgindex).show() //hide all images except current one
		var imgdimensions=[$slideimage.width(), $slideimage.height()] //center align image
		$slideimage.css({marginLeft: (imgdimensions[0]>0 && imgdimensions[0]<setting.dimensions[0])? setting.dimensions[0]/2-imgdimensions[0]/2 : 0})
		$slideimage.css({marginTop: (imgdimensions[1]>0 && imgdimensions[1]<setting.dimensions[1])? setting.dimensions[1]/2-imgdimensions[1]/2 : 0})
		if (setting.descreveal=="peekaboo" && setting.longestdesc!=""){ //if descreveal is set to "peekaboo", make sure description panel is hidden before next slide is shown
			clearTimeout(setting.hidedesctimer) //clear hide desc panel timer
			slideshow.showhidedescpanel('hide', 0) //and hide it immediately
		}
		setting.$gallerylayers.eq(setting.bglayer).css({zIndex:1000, opacity:0}) //background layer becomes foreground
			.stop().css({opacity:0}).animate({opacity:1}, setting.fadeduration, function(){ //Callback function after fade animation is complete:
				clearTimeout(setting.playtimer)
				try{
					setting.onslide.call(slideshow, setting.$gallerylayers.eq(setting.fglayer).get(0), setting.curimage)
				}catch(e){
					alert("Fade In Slideshow error: An error has occured somwhere in your code attached to the \"onslide\" event: "+e)
				}
				if (setting.descreveal=="peekaboo" && setting.longestdesc!=""){
					slideshow.showhidedescpanel('show')
					setting.hidedesctimer=setTimeout(function(){slideshow.showhidedescpanel('hide')}, setting.displaymode.pause-fadeSlideShow_descpanel.slidespeed)
				}	
				setting.currentstep+=1
				if (setting.displaymode.type=="auto"){
					if (setting.currentstep<=setting.totalsteps || setting.displaymode.cycles==0)
						setting.playtimer=setTimeout(function(){slideshow.showslide('next')}, setting.displaymode.pause)
				}
			}) //end callback function
		setting.$gallerylayers.eq(setting.fglayer).css({zIndex:999}) //foreground layer becomes background
		setting.fglayer=setting.bglayer
		setting.bglayer=(setting.bglayer==0)? 1 : 0
		setting.curimage=imgindex
		if (setting.$descpanel){
			setting.$descpanel.css({visibility:(setting.imagearray[imgindex][3])? 'visible' : 'hidden'})
			if (setting.imagearray[imgindex][3]) //if this slide contains a description
				setting.$descinner.empty().html(setting.closebutton + setting.imagearray[imgindex][3])
		}
		if (setting.displaymode.type=="manual" && !setting.displaymode.wraparound){
			this.paginatecontrol()
		}
		if (setting.$status) //if status container defined
			setting.$status.html(setting.curimage+1 + "/" + totalimages)
	},

	showhidedescpanel:function(state, animateduration){
		var setting=this.setting
		var endpoint=(state=="show")? setting.dimensions[1]-setting.panelheight : this.setting.dimensions[1]
		setting.$descpanel.stop().animate({top:endpoint}, (typeof animateduration!="undefined"? animateduration : fadeSlideShow_descpanel.slidespeed), function(){
			if (setting.descreveal=="always" && state=="hide")
				setting.$restorebutton.css({visibility:'visible'}) //show restore button
		})
	},

	paginateinit:function($){
		var slideshow=this
		var setting=this.setting
		if (setting.togglerid){ //if toggler div defined
			setting.$togglerdiv=$("#"+setting.togglerid)
			setting.$prev=setting.$togglerdiv.find('.prev').data('action', 'prev')
			setting.$next=setting.$togglerdiv.find('.next').data('action', 'next')
			setting.$prev.add(setting.$next).click(function(e){ //assign click behavior to prev and next controls
				var $target=$(this)
				slideshow.navigate($target.data('action'))
				e.preventDefault()
			})
			setting.$status=setting.$togglerdiv.find('.status')
		}
	},

	paginatecontrol:function(){
		var setting=this.setting
			setting.$prev.css({opacity:(setting.curimage==0)? 0.4 : 1}).data('action', (setting.curimage==0)? 'none' : 'prev')
			setting.$next.css({opacity:(setting.curimage==setting.imagearray.length-1)? 0.4 : 1}).data('action', (setting.curimage==setting.imagearray.length-1)? 'none' : 'next')
			if (document.documentMode==8){ //in IE8 standards mode, apply opacity to inner image of link
				setting.$prev.find('img:eq(0)').css({opacity:(setting.curimage==0)? 0.4 : 1})
				setting.$next.find('img:eq(0)').css({opacity:(setting.curimage==setting.imagearray.length-1)? 0.4 : 1})
			}
	}

	
}

fadeSlideShow.routines={

	getSlideHTML:function(imgelement){
		var layerHTML=(imgelement[1])? '<a href="'+imgelement[1]+'" target="'+imgelement[2]+'">\n' : '' //hyperlink slide?
		layerHTML+='<img src="'+imgelement[0]+'" style="border-width:0;" />\n'
		layerHTML+=(imgelement[1])? '</a>\n' : ''
		return layerHTML //return HTML for this layer
	},

	getFullHTML:function(imagearray){
		var preloadhtml=''
		for (var i=0; i<imagearray.length; i++)
			preloadhtml+=this.getSlideHTML(imagearray[i])
		return preloadhtml
	},

	adddescpanel:function($, setting){
		setting.$descpanel=$('<div class="fadeslidedescdiv"></div>')
			.css({position:'absolute', visibility:'hidden', left:0, top:setting.dimensions[1], font:fadeSlideShow_descpanel.fontStyle, zIndex:'1001'})
			.appendTo(setting.$wrapperdiv)
		$('<div class="descpanelbg"></div><div class="descpanelfg"></div>') //create inner nav panel DIVs
			.css({position:'absolute', left:0, top:0, width:setting.$descpanel.width()-8})
			.eq(0).css({opacity:0.7}).end() //"descpanelbg" div
			.eq(1).css({}).html(setting.closebutton + setting.longestdesc).end() //"descpanelfg" div
			.appendTo(setting.$descpanel)
		setting.$descinner=setting.$descpanel.find('div.descpanelfg')
		setting.panelheight=setting.$descinner.outerHeight()
		setting.$descpanel.css({height:setting.panelheight}).find('div').css({height:'100%'})
		if (setting.descreveal=="always"){ //create restore button
			setting.$restorebutton=$('<img class="restore" title="Restore Description" src="' + fadeSlideShow_descpanel.controls[1][0] +'" style="position:absolute;visibility:hidden;right:0;bottom:0;z-index:1002;width:'+fadeSlideShow_descpanel.controls[1][1]+'px;height:'+fadeSlideShow_descpanel.controls[1][2]+'px;cursor:pointer;cursor:hand" />')
				.appendTo(setting.$wrapperdiv)


		}
	},


	getCookie:function(Name){ 
		var re=new RegExp(Name+"=[^;]+", "i"); //construct RE to search for target name/value pair
		if (document.cookie.match(re)) //if cookie found
			return document.cookie.match(re)[0].split("=")[1] //return its value
		return null
	},

	setCookie:function(name, value){
		document.cookie = name+"=" + value + ";path=/"
	}
}

/* **** /Slideshow *** */




// *** forceren: 0 = nee, 1 = ja, 2 = het is een input zonder forceren, 3 = het is een input met forceren, 2:Bla = input zonder forceren met vooringevuld in input "Bla"

function showPopupDiv(id, titel, beschrijving, button_1, button_2, forceren)
{
	inputValue = '';
	
	if(typeof forceren == "string" && forceren.indexOf(":"))
	{
		temp = forceren.split(":");
		forceren = parseInt(temp[0]);
		inputValue = temp[1];
	}
	
	showPopupId = id;
	
	ge("popup_div_titel").innerHTML = titel;
	ge("popup_div_text").innerHTML = beschrijving;
	
	if(button_1 == "")
	{
		ge("popup_div_button_1").style.display = "none";	
	}
	else
	{
		ge("popup_div_button_1").style.display = "inline-block";
		ge("popup_div_button_1").innerHTML = button_1;
	}
	
	if(button_2 == "")
	{
		ge("popup_div_button_2").style.display = "none";	
	}
	else
	{
		ge("popup_div_button_2").style.display = "inline-block";
		ge("popup_div_button_2").innerHTML = button_2;
	}
	
	showPopupForce = forceren;
	
	if(forceren == 1 || forceren == 3)
	{
		ge("popup_div_inner_x").style.display = "none";
	}
	else
	{
		ge("popup_div_inner_x").style.display = "inline-block";
	}

	ge('popup_input').value = inputValue;
	
	if(forceren == 2 || forceren == 3)
	{	
		ge('popup_div_input').style.display = 'block';
		ge('popup_input').focus();
	}
	else
	{	
		ge('popup_div_input').style.display = 'none';
	}
	
	DarkenPage();
	$("#popup_div").fadeIn(750);
	
}

function hidePopupDiv(whereClicked)
{
	var popupDiv = document.getElementById('popup_div');
	popupDiv.style.display = 'none';
	LightenPage();

}

function DarkenPage()
{
	var page_screen = document.getElementById('page_screen');
	page_screen.style.height = document.body.parentNode.scrollHeight + 'px';
    
	$("#page_screen").fadeIn(500);
    
}

function LightenPage()
{
	var page_screen = document.getElementById('page_screen');
	page_screen.style.display = 'none';
}
/* **** /popupDiv *** */




/* *** Dropdown menu *** */
var TimeOut         = 300;
var currentLayer    = null;
var currentitem     = null;
var currentLayerNum = 0;
var currentLayerClass = "";
var noClose         = 0;
var closeTimer      = null;

function mopen(n) 
{
	if(currentLayerNum > 0)
	{
		var mm = document.getElementById("mmenu"+currentLayerNum);
		mm.className = currentLayerClass;
	}
	
	var l  = document.getElementById("menu"+n);
	var mm = document.getElementById("mmenu"+n);
	currentLayerClass = mm.className;
	
	mm.className = "menu_item_sub_selected";
	
	if(l) 
	{
		mcancelclosetime();
		l.style.visibility='visible';
		if(currentLayer && (currentLayerNum != n))
		currentLayer.style.visibility='hidden';
		currentLayer = l;
		currentitem = mm;
		currentLayerNum = n;			
	} 
	else if(currentLayer) 
	{
		currentLayer.style.visibility='hidden';
		currentLayerNum = 0;
		currentitem = null;
		currentLayer = null;
	}
}

function mclosetime() {
  closeTimer = window.setTimeout(mclose, TimeOut);
}

function mcancelclosetime() {
  if(closeTimer) {
    window.clearTimeout(closeTimer);
    closeTimer = null;
  }
}

function mclose() {

  var mm = document.getElementById("mmenu"+currentLayerNum);
  
  if(currentLayerClass && mm) mm.className = currentLayerClass;
  
  if(currentLayer && noClose!=1)   {
    currentLayer.style.visibility='hidden';
    currentLayerNum = 0;
    currentLayer = null;
    currentitem = null;
  } else {
    noClose = 0;
  }
  currentLayer = null;
  currentitem = null;
}


document.onclick = mclose; 

var iOS = /iPad|iPhone|iPod/.test(navigator.platform);
if( iOS ) document.ontouchend = mclose; 

var originalContents = '';


function printDiv(divName) {
     var printContents = document.getElementById(divName).innerHTML;
  originalContents = document.body.innerHTML;

     document.body.innerHTML = printContents;

     window.print();

     console.log('De printpagina wordt opgesteld!');
     setTimeout("restorePrint()",1000);
	
     //document.body.innerHTML = originalContents;
}

function restorePrint()
{
	document.body.innerHTML = originalContents;

}

function toggleMe(a)
{
	var e = document.getElementById(a);
	
	if(!e)
	{
		console.error(a + " is geen bestaande div (js function toggleMe)!");
	}
	else
	{
		if(e.style.display=="none")
		{
			e.style.display = "block";
		}
		else
		{
			e.style.display = "none";
		}
	}

}


function toggleMe2(a, what)
{
	var e = document.getElementById(a);
	
	if(!e)
	{
		console.error(a + " is geen bestaande div (js function toggleMe2)!");
	}
	else
	{
		if(what == "1")
		{
			e.style.display = "block";
		}
		else
		{
			e.style.display = "none";
		}
	}

}


function hideMe(id)
{
	$("#" + id).slideUp(150);
}

function showMe(id)
{
	$("#" + id).slideDown(150);
}

function toggleMe(id)
{
	$("#" + id).slideToggle(150);
}





var CheckFormElem;
var CheckFormBGcolor;

function CheckForm(f, message)
{
	if(message != "") message += "\n\n";
	
	//alert(message);
	//alert(c_z_het_volgende_is_nog_niet_correct);
	
	var result = true;			
	var elem = f.elements; 
	var str = '';
	var alt = '';
	var checkresult  = true;

	for(var i = 0; i < elem.length; i++) 
	{ 
		if(elem[i].type != 'submit' && elem[i].type != 'hidden' && elem[i].type != 'button' && elem[i].type != 'reset' && !elem[i].disabled)
		{
			if(checkresult)
			{
				alt = elem[i].lang;
	
				if(alt.substr(0,9).toLowerCase() == "verplicht")
				{
					alt = alt.substr(9);
					if(alt.indexOf(":") < 0) alt += ":";

					temp = alt.split(":");
					
					checkmode    = temp[0].trim().toLowerCase();
					checkmessage = temp[1].trim();
	
					//str += "Check nodig! checkmode:" + checkmode + " en checkmessage:" + checkmessage + "\n";

					if(elem[i].type == "checkbox")
					{
						if(!elem[i].checked) checkresult = false;
					}
					else if(elem[i].type == "radio")
					{
						thislength = eval("f." + elem[i].name + ".length");

						optionselected = false;

						for (j = 0; j < thislength; j++)
						{
							thisoption = eval("f." + elem[i].name + "[" + j + "].checked");
							
							if(thisoption)
							{
								optionselected = true;
							}
							
						}
						
						if(!optionselected) checkresult = false;

					}
					else
					{		
						if(checkmode == "[email]")
						{
							if(elem[i].value.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/) == -1) checkresult = false;
						}
						else if(checkmode == "[number]")
						{
							if(isNaN(elem[i].value) || elem[i].value == "") checkresult = false;
						}
						else if(checkmode == "[year]")
						{
							if(isNaN(elem[i].value) || elem[i].value == "")
							{
								checkresult = false;
							}
							else
							{
								if(elem[i].value < 1900 || elem[i].value > 2100) checkresult = false;
							}
						}														
						else if(checkmode == "[postcode4]")
						{
							if(isNaN(elem[i].value) || elem[i].value == "")
							{
								checkresult = false;
							}
							else
							{
								if(elem[i].value < 1000 || elem[i].value > 9999) checkresult = false;
							}
						}
						else if(checkmode == "[postcode]")
						{
							if ((elem[i].value.search(/^\d{4}[\s-]?[a-zA-Z]{2}$/)) == -1) checkresult = false;
							
							
						}						
						else if(checkmode == "[thousand]")
						{
							if(isNaN(elem[i].value) || elem[i].value == "")
							{
								checkresult = false;
							}
							else
							{
								if(elem[i].value < 100 || elem[i].value > 999) checkresult = false;
							}
						}						
						else
						{
							if(elem[i].value == "") checkresult = false;
						}
					}


					if(!checkresult)
					{
						if(checkmessage == "")
						{
							if(elem[i].type == "checkbox")
							{
								checkmessage = "<b>" + textFormat(elem[i].name) + "</b> " + c_z_is_niet_gevinkt;
							}
							else if(elem[i].type == "radio")
							{
								checkmessage = c_z_kies_een_optie_bij + " <b>" + textFormat(elem[i].name) + "</b>!";
							}
							else
							{						
								
								if(checkmode == "[email]")
								{
									checkmessage = "<b>" + textFormat(elem[i].name) + "</b> " + c_z_is_niet_een_geldig_email_adres;
								}
								else if(checkmode == "[number]")
								{
									checkmessage = "<b>" + textFormat(elem[i].name) + "</b> " + c_z_is_niet_een_geldig_nummer;
								}
								else if(checkmode == "[year]")
								{
									checkmessage = "<b>" + textFormat(elem[i].name) + "</b> " + c_z_is_niet_een_geldig_jaar;
								}														
								else if(checkmode == "[postcode4]")
								{
									checkmessage = "<b>" + textFormat(elem[i].name) + "</b> " + c_z_is_niet_een_geldige_postcode;
								}
								else if(checkmode == "[postcode]")
								{
									checkmessage = "<b>" + textFormat(elem[i].name) + "</b> " + c_z_is_niet_een_geldige_postcode_2_letters;
								}																
								else
								{
									checkmessage = "<b>" + textFormat(elem[i].name) + "</b> " + c_z_is_niet_ingevuld;
								}
							}
						}

						//elem[i].focus();
						//window.scrollBy(0,-50); 
						
						var oldborder = elem[i].style.border;
						var borderwidth = "";
						var oldbgcolor = elem[i].style.backgroundColor;

						temp = oldborder.split(" ");

						for(j = 0; j < temp.length; j++)
						{
							temp[j] = temp[j].toLowerCase().trim();
							
							if((temp[j].indexOf("px") >= 0 || temp[j].indexOf("pt") >= 0 || temp[j].indexOf("em") >= 0)  && borderwidth == "")
							{
								borderwidth = temp[j];
							}
						}

						CheckFormElem = elem[i];
						CheckFormBGcolor = oldbgcolor;
						
						//if(borderwidth == "") borderwidth = "2px";
						
						//if(oldborder != "") elem[i].style.border = "#ff0000 " + borderwidth + " solid";

						//alert(message + checkmessage);
						showPopupDiv("SEND_FORM_INCOMPLETE", message, checkmessage, "Okee", "", 0);

						//if(oldborder == "")
						//{
						//	elem[i].style.borderColor = "";
						//	elem[i].style.borderWidth = "";
						//}
						//else elem[i].style.border = oldborder;

						//elem[i].style.backgroundColor = oldbgcolor;

						result = false;
					}

				}
	
				str += "\n";
			}
		}
	}


	if(typeof window.CustomCheckForm == 'function') 
	{
		if(result)
		{		
			// function exists, so we can now call it
			temp_result = CustomCheckForm();
			if(temp_result == false) result = false;
		}
	}	
	
	return result;

}

String.prototype.trim = function () 
{
	return this.replace(/^\s*/, "").replace(/\s*$/, "");
}



function submitenter(myfield,e)
{
	var keycode;
	
	if (window.event) keycode = window.event.keyCode;
	else if (e) keycode = e.which;
	else return true;
	
	if(keycode == 13)
	{
		
		if(myfield.id == "popup_input")
		{	
			answerPopupDiv(1);
		}
		else if(myfield.form)
		{
			//showPreloader();
			//myfield.form.submit();
			
			console.error("submitenter: " + myfield + " met form " + myfield.form + "");
			
			return false;
		}
		else 
		{
			console.error("function submitenter in global.js: " + myfield + " heeft geen form!");
		}
		
		return false;
	}
	else return true;
}

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

function textFormat(myString)
{
	myString = ucfirst(myString);
	
	myString = myString.split("_").join(" ");
	
	return(myString);
}

function ucfirst(myString)
{
	return(myString.charAt(0).toUpperCase() + myString.slice(1));
}

function showPreloader()
{
	$( "#preloader_img" ).stop();
	$( "#preloader_text" ).stop();
	$( "#preloader_subtext" ).stop();
	
	ge("preloader").style.display = "table";
	ge("preloader_text").style.opacity = 0;
	ge("preloader_text").style.marginBottom = "0px";
	ge("preloader_subtext").style.opacity = 0;
	ge("preloader_subtext").style.marginBottom = "0px";
}

var hidePreloaderBusy = 0;

function hidePreloader()
{
	ge("preloader").style.display = "none";
	ge("preloader_subtext").style.display = "none";

	/*
	hidePreloaderBusy = 1;
	
	$("#preloader").fadeOut(500);	

	setTimeout(function(){ 

		ge('preloader_subtext').style.display = 'none';		
		hidePreloaderBusy = 0;
	        
	}, 500);	
	*/
}

function enlargePreloader()
{
	if(hidePreloaderBusy == 0)
	{
		ge("preloader_img").style.width = "128px";
		ge("preloader_img").style.height = "128px";
		
		$( "#preloader_img" ).stop().animate({
		
	          width: "64px",
	          height: "64px",
	
	        }, {duration: 1000, easing: 'easeOutBounce'} );
	        
		setTimeout(function(){ 
			
			$( "#preloader_text" ).stop().animate({
			
		          opacity : "1",
		          marginBottom : "50px"
	
		        }, {duration: 1000} );
		        
		}, 1000);
		
		setTimeout(function(){ 
			
			ge('preloader_subtext').style.display = 'inline-block';
			
			$( "#preloader_subtext" ).stop().animate({
			
		          opacity : "1",
		          marginBottom : "50px"
	
		        }, {duration: 1000} );
		        	
		}, 12000);
	}	
		
}

function showFixedRightside()
{
	$( "#fixed_rightside" ).stop().animate({
	
          paddingRight: "30px",
          opacity: "1",

        }, {duration: 500, easing: 'easeOutQuad'} );
}

function hideFixedRightside()
{
	$( "#fixed_rightside" ).stop().animate({
	
          paddingRight: "15px",
          opacity: "0.5",

        }, {duration: 500, easing: 'easeOutQuad'} );
}



function addAmount(div, hoeveel)
{	
	newVal = parseInt(ge(div).value) + hoeveel;
	if(isNaN(newVal)) newVal = 1;
	if(newVal < 1) newVal = 1;

	ge(div).value = newVal;
}

function currency(amount)
{
	return("&euro;&nbsp;" + amount.formatMoney(2, ',', '.'));
}

Number.prototype.formatMoney = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

function scrollToMarker(marker)
{
	$('body,html').animate({"scrollTop":   $("#marker_" + marker).offset().top}, 500);
}

function comFrame(queryString)
{
	console.log("comFrame: request met querystring: \"" + queryString + "\"");
	ge("com_iframe").src = "/includes/com_frame.php?" + queryString;
	showMe('com_iframe');
}


//cartCount = 0;
//cartAmount = 0;

function addToCart(id, addButtonId, titel, img, prijs, aantal, specificatie)
{
	aantal = parseInt(aantal);

	console.log("Add product " + id + " to cart: " + aantal + " x " + prijs);
	prijsJS = parseFloat((prijs + "").split(",").join("."));
	//console.log("prijsJS: " + prijsJS);

	if(cartCount == 0) firstAdd = 1; else firstAdd = 0;


	// *** Add to cart communication here
	comFrame("a=ADD_TO_CART&id=" + id + "&aantal=" + aantal + "&specificatie=" + specificatie + "&taal=" + taal);


	// *** Add visually to cart
	ge("icon_cart").style.display = "block"; 
	ge("icon_cart_empty").style.display = "none"; 

	tempDestX = ge("icon_cart").getBoundingClientRect().left;
	tempDestY = ge("icon_cart").getBoundingClientRect().top;

	if(firstAdd == 1)
	{
		ge("icon_cart").style.display = "none"; 
		ge("icon_cart_empty").style.display = "block"; 
	}

	addToCartFly(1, img, addButtonId, tempDestX, tempDestY);
	if(aantal > 1) setTimeout(function(){ addToCartFly(2, img, addButtonId, tempDestX, tempDestY); }, 200);
	if(aantal > 2) setTimeout(function(){ addToCartFly(3, img, addButtonId, tempDestX, tempDestY); }, 400);
	if(aantal > 3) setTimeout(function(){ addToCartFly(4, img, addButtonId, tempDestX, tempDestY); }, 600);
	if(aantal > 4) setTimeout(function(){ addToCartFly(5, img, addButtonId, tempDestX, tempDestY); }, 800);

	extraTimeout = aantal * 200 - 200;
	if(extraTimeout > 800) extraTimeout = 800;


	// *** Update cart
	setTimeout(function(){ 

		if(firstAdd == 1)
		{	
			showMe("icon_cart"); 
			ge("icon_cart_empty").style.display = "none"; 
		}

		cartCount += aantal;
		cartAmount += (prijsJS * aantal);

		ge("icon_cart").innerHTML = "<span>" + cartCount + "</span>" + currency(cartAmount);

	}, 1200 + extraTimeout);


	// *** Add to cart popup
	setTimeout(function(){ 

		showPopupDiv("WINKELWAGEN_ADD", c_z_product_toegevoegd_aan_winkelwagen, "<img src='" + img + "' style='float: right; max-width: 75px; max-height: 75px;'>" + c_z_het_product_is_toegevoegd + " " + aantal + " " + c_z_keer_toegevoegd, c_z_verder_winkelen, c_z_winkelwagen, 0);

	}, 1600 + extraTimeout);

}



function addToCartFly(thisImg, img, addButtonId, tempDestX, tempDestY)
{
	ge("cart_flying_img_" + thisImg).style.opacity = 1;
	ge("cart_flying_img_" + thisImg).style.display = "block";
	ge("cart_flying_img_" + thisImg).src = img;

	ge("cart_flying_img_" + thisImg).style.left = ge(addButtonId).getBoundingClientRect().left + "px";
	ge("cart_flying_img_" + thisImg).style.top = ge(addButtonId).getBoundingClientRect().top + "px";

	$('#cart_flying_img_' + thisImg).animate({"left" : tempDestX, "top" : tempDestY }, {duration: 799, easing: 'easeOutQuad'});

	setTimeout(function(){ 

		$('#cart_flying_img_' + thisImg).animate({"opacity" : 0 }, {duration: 399, easing: 'easeOutQuad'});

	}, 400);


	setTimeout(function(){ 

		ge('cart_flying_img_' + thisImg).style.display = "none";

	}, 900);		
}


function getOffsetTop( elem )
{
    var offsetTop = 0;

    do {
      if ( !isNaN( elem.offsetTop ) )
      {
          offsetTop += elem.offsetTop;
      }
    } while( elem = elem.offsetParent );
    return offsetTop;
}


function myEventHandler(e)
{
	if (!e) e = window.event;
	
	if (e.stopPropagation) 
	{
		e.stopPropagation(); //IE9 & Other Browsers
	}
	else 
	{
		e.cancelBubble = true; //IE8 and Lower
	}
}






// *** Console messages
//console.info('global.js loaded (The AdminTools.nl global page system and admin is copyright protected. All rights reserved.)');
//console.log('The AdminTools global page system and admin is copyright protected. All rights reserved. Please contact us on admintools.nl for more information.');
//console.log('global.js was succesfully loaded. Besides normal messages, this console may have:');
//console.info('Info messages');
//console.warn('Warning messages');
//console.error('Error messages');
//console.groupEnd();
