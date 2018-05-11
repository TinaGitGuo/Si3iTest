/**
 * Webfonts Helper
 *
 * font smoothing detection, avoid font rendering fout bug in IE 6-9 and Firefox 3.x
 *
 * @author   Timo Mayer, Virtual Identity AG
 */


/*
* font smoothing detection based on a script by:
* Zoltan Hawryluk, Nov 24 2009.  
*
* Released under the MIT License. http://www.opensource.org/licenses/mit-license.php
*/

// we can not use siemens namespace because it is not yet initialized
webfontsHelper = {
	fontSmoothingEnabled: null,
	webfontsReady: false
};


webfontsHelper.webfontReadyEventHandler = function() {
	//name of the event
	this.eventName = arguments[0];
	var mEventName = this.eventName;

	//function to call on event fire
	var eventAction = new Array();

	//subscribe a function to the event
	this.subscribe = function(fn) {
		// if webfonts are ready when subscribed fire now
		if(webfontsHelper.webfontsReady == true) {
			fn();
		} else {
			eventAction.push(fn);
		}
	};

	//fire the events
	this.fire = function() {
		if(eventAction.length != 0) {
			for(var k = 0; k < eventAction.length; k ++) {
				eventAction[k]();
			}
		}
	};
};

webfontsHelper.webfontsReadyEvent = new webfontsHelper.webfontReadyEventHandler("ready");

webfontsHelper.fontSmoothingDetection = new function(){
	var fs = this;

	fs.hasSmoothing = function() {

		// IE has screen.fontSmoothingEnabled - sweet!      
		if (typeof(screen.fontSmoothingEnabled) != "undefined") {
			return screen.fontSmoothingEnabled;  
		} else {

			try {
				// Create a 35x35 Canvas block.
				var canvasNode = document.createElement("canvas");
				canvasNode.width = "35";
				canvasNode.height = "35";

				// We must put this node into the body, otherwise 
				// Safari Windows does not report correctly.
				canvasNode.style.display = "none";
				//document.body.appendChild(canvasNode);
				var ctx = canvasNode.getContext("2d");

				// draw a black letter "O", 32px Arial.
				ctx.textBaseline = "top";
				ctx.font = "32px Arial";
				ctx.fillStyle = "black";
				ctx.strokeStyle = "black";

				ctx.fillText("O", 0, 0);

				// start at (8,1) and search the canvas from left to right,
				// top to bottom to see if we can find a non-black pixel.  If
				// so we return true.
				for (var j = 8; j <= 32; j++) {
					for (var i = 1; i <= 32; i++) {

						var imageData = ctx.getImageData(i, j, 1, 1).data;
						var alpha = imageData[3];

						if (alpha != 255 && alpha != 0) {
							return true; // font-smoothing must be on.
						}
					}
				}

				// didn't find any non-black pixels - return false.
				return false;
			} 
			catch (ex) {
				// Something went wrong (for example, Opera cannot use the
				// canvas fillText() method.  Return null (unknown).
				return null;
			}
		}
	}

	fs.setHelperClasses = function() {
		var result = fs.hasSmoothing();
		webfontsHelper.fontSmoothingEnabled = result;

		var htmlNode = document.getElementsByTagName("html")[0];
		
		// we do not need fontSmoothing-true. we expect that because its default
		if (result == false) {
			htmlNode.className += " fontSmoothing-false wf-false";
		} else if (result == null) {
			htmlNode.className += " fontSmoothing-unknown";
		}
	}
};

webfontsHelper.fout = new function() {

	this.hideFOUT = function() {

		//browser-specific test because IE and Firefox 3.x are those w/ FOUT problem
		if (navigator.appName != 'Microsoft Internet Explorer' && !/Firefox\/3/.test(navigator.userAgent)) {
			return;
		}

		// skip FOUT Fix if fontSmoothing is disabled
		if(webfontsHelper.fontSmoothingEnabled === false) {
			return;
		}

		var htmlNode = document.getElementsByTagName("html")[0];
		htmlNode.className += " wf-loading";

		webfontsHelper.webfontsReadyEvent.subscribe(function() {
			var reg = new RegExp('(\\s|^)wf-loading(\\s|$)');
			htmlNode.className = htmlNode.className.replace(reg,' ');
		});
	};
}();

webfontsHelper.webFontsReadyCheck = function(font, delay) {

	var test_frequency = 20;		// how often (in ms) to check if test node has been styled with last custom font in list
	var giveup = 3210;				// number of ms before it stops checking (i.e., custom font style was not applied)
	var latency = 80;				// delay between test node being detected as styled and hidden nodes being exposed  

	delay = delay || latency;

	//create a span node to be used for measuring default-font-styled vs custom-font-styled
	//Note:  the span technique is modeled after code developed by Paul Irish (http://paulirish.com/2009/font-face-feature-detection)
	var body = document.body || document.documentElement;
	var spn = document.createElement('span');
	spn.innerHTML = 'Lorem ipsum dolor sit';
	spn.style.visibility = 'hidden';
	spn.style.position = 'absolute';
	spn.style.font = '48px serif';
	spn.style.top = '0';
	spn.style.whiteSpace = 'nowrap'; //iphone
	spn.id = 'webfonthelper-loadtest';

	if(navigator.appName != 'Microsoft Internet Explorer' || /MSIE 9/.test(navigator.userAgent)) {
		body.appendChild(spn);

		var wid = spn.offsetWidth; //at this time, tests in newer browsers (not IE7/IE8) show this as still the width of the original default-font
		if (wid) {
			spn.style.font = '48px ' + font + ',serif'; // set webfont for modern browsers, later for ie7/8
		}
	}

	// attach an window.load event which kills web-font testing if it is not set as ready yet
	//solution for browsers with deactivated font downloading and things like that
	var windowLoadReady = function() {
		setTimeout(function(){ giveup = 0; }, 100);
	}

	if(window.addEventListener) {
		window.addEventListener('load', windowLoadReady, false);
	}

	else if(window.attachEvent) {
		window.attachEvent('onload', windowLoadReady);
	}

	var freq = test_frequency;

	var startTesting = function() {
		var fnttest = setInterval(function() {
			//for the benefit of IE7 and IE8
			if (!wid && document.body) {
				document.body.appendChild(spn);
				wid = spn.offsetWidth;
				spn.style.font = '48px ' + font + ',serif';
			}

			var nu_wid = spn.offsetWidth;

			giveup -= freq;
			if((wid && wid != nu_wid) || giveup <= 0) {
				var giveupTrue = giveup;
				clearInterval(fnttest);

				setTimeout(function() {
					webfontsHelper.webfontsReady = true;
					webfontsHelper.webfontsReadyEvent.fire(null, {});
				}, delay);	//even 'asap' needs a small delay

				spn.parentNode.removeChild(spn);
				if(giveupTrue <= 0) {
					var htmlNode = document.getElementsByTagName("html")[0];
					htmlNode.className += " wf-false";
				}
			}
		}, freq);
	}

	startTesting();
};

//initialization
// if you do not want to use font smoothing detection for your website remove the follwing line of code
webfontsHelper.fontSmoothingDetection.setHelperClasses();

// hide FOUT is only executed for IE and FF3.5, 3,6 because this browsers have FOUT bug. hideFOUT needs webFontsReadyCheck
webfontsHelper.fout.hideFOUT();

//check for both, Siemens Webfont (SiemensSlab) and local installed font (Siemens Slab)
webfontsHelper.webFontsReadyCheck('"SiemensSlab", "Siemens Slab"');