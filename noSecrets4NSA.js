/**
* noSecrets4NSA.js
* a jquery plugin that hides your deepest darkest secrets from the NSA
* by jenn schiffer
*/
 
(function($) {
 
  	var pluginName = 'noSecrets4NSA';
 	
	var defaults = {
		alertMessage : 'Click OK if you are NSA.',
		nsaMessage : '<h1>No, NSA!</h1><h3>You won\'t be reading MY secrets today!',
	};

	var classes = {
		nsaMessage : 'noSecrets4NSA-message',
		secret : 'noSecrets4NSA-secret'
	}
 
  	var areYouNSA = window.confirm(defaults.alertMessage);

	var methods = {
 
		init : function (opts) {
			return this.each(function() {	  
				var $this = $(this).addClass(pluginName);
				var options = $.extend(defaults, opts);
				var data = {
					$this : $this,
					alertMessage : options.alertMessage,
					nsaMessage : options.nsaMessage,
					secrets : $this.html(),
				};

				$this.data(pluginName, data);
				$this.html('');
				methods.manageSecrets.call($this, areYouNSA);
			}); 
		},
 
		manageSecrets : function ( wellAreYou ) {
			var $this = $(this);
			var data = $this.data(pluginName);

			if ( wellAreYou ) {
				$this.html(data.nsaMessage).addClass(classes.nsaMessage);
			}
			else {
				$this.html(data.secrets).addClass(classes.secret);
			}
		},
 
	};
 
    $.fn[pluginName] = function (method) {
        if ( methods[method] ) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this,arguments);
        } else {
            $.error('Method ' + method + ' does not exist');
        }
    };	
 
})( jQuery );