(function() {
  'use strict';

  function defineModuler() {
    /** @namespace */
    var Moduler = {};

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
      Moduler.addStyles(styles, el);
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

      this.addStyles(styles, popup);
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
    },

    /**
     * Add styles to a selected DOM element.
     *
     * @param {object} the styles represented in an Object.
     * @param {dom} target where we want to apply the styles.
     */
    Moduler.addStyles = function(stylesObj, target) {
      var styles = stylesObj || {};

      for (var i in styles) {
        target.style[i] = styles[i];
      }
    };
        
    return Moduler;
  }

  // define globally if it doesn't already exist
  if (typeof(Moduler) === 'undefined') {
    window.Moduler = defineModuler();
  } else {
    console.log("Moduler already defined.");
  }
})(window);
