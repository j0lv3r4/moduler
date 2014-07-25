;(function(d, w) {
  'use strict';

  function defineModuler() {
    /** @namespace */
    var Moduler = {};

    /**
     * Add styles to a selected DOM element.
     *
     * @param {object} the styles represented in an Object.
     * @param {dom} target where we want to apply the styles.
     */
    var _addStyles = function(stylesObj, target) {
      var styles = stylesObj || {};

      for (var i in styles) {
        target.style[i] = styles[i];
      }
    };

    /**
     * fadeIn & fadeOut animation
     *
     * @param {string} "in" or "out".
     * @param {int} Time in microseconds.
     * @param {DOM} Element to apply the animation.
     * @param {boolean} Check if browser is IE.
     */
    var _fade = function(type, ms, el, IE) {
      // TODO: add callback when finished
      var isIn = type === 'in',
      opacity = isIn ? 0 : 1,
      interval = 50,
      gap = interval / ms;
	        
	    if (isIn) {
	        el.style.display = 'block';
			el.style.opacity = opacity;
 
        	if(IE) {
            	el.style.filter = 'alpha(opacity=' + opacity + ')';
	            el.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + opacity + ')';
	        }
	    }
	    
	    function func() {
	        opacity = isIn ? opacity + gap : opacity - gap; 
	        el.style.opacity = opacity;
 
	        if(IE) {
	            el.style.filter = 'alpha(opacity=' + opacity * 100 + ')';
	            el.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + opacity * 100 + ')';
	        }
	        
	        if(opacity <= 0 || opacity >= 1) window.clearInterval(fading);
	        if(opacity <= 0) el.style.display = 'none';
	    }
	    
	    var fading = window.setInterval(func, interval);
    };


    /**
     * Initialize the library and add the needed event listeners.
     * @param {object} Object containing the options.
     */
    Moduler.init = function(options) {
      this.options = options || {};

      var self = this,
        trigger = self.options.trigger;

      trigger.addEventListener('click', self.showBackground);
    };

    /**
     * Create a div element as a background and append it to the body
     */
    Moduler.showBackground = function() {
      var el = document.createElement('div'),
        styles = {
          display: "none",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)"
        };

      el.className = "_popup-background";
      _addStyles(styles, el);
      document.body.appendChild(el);
      el.style.display = "block";
      Moduler.showPopup();
    };

    /**
     *
     */
    Moduler.showPopup = function() {
      var self = this,
        popup = this.options.popup,
        closeButton = this.options.closeButton;

      var styles = {
        position: "absolute",
        top: "50%",
        left: "50%",
        webkitTransform: "translate(-50%, -50%)",
        MozTransform: "translate(-50%, -50%)",
        msTransform: "translate(-50%, -50%)",
        OTransform: "translate(-50%, -50%)",
        Transform: "translate(-50%, -50%)",
        zIndex: "9999",
        display: "block"
      };

      _addStyles(styles, popup);
      closeButton.addEventListener('click', self.hidePopup);
    };

    /**
     *
     */
    Moduler.hidePopup = function() {
      var bg = document.getElementsByClassName('_popup-background')[0];

      Moduler.options.popup.style.display = "none";
      Moduler.options.closeButton.removeEventListener('click', Moduler.hidePopup);
      document.body.removeChild(bg);
    };

    return Moduler;
  };

  // define globally if it doesn't already exist
  if (typeof(Moduler) === 'undefined') {
    w.Moduler = defineModuler();
  } else {
    console.log("Moduler already defined.");
  }
})(document, window);
