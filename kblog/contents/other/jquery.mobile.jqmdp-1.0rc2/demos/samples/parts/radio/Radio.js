/**
 * Radio/Selector Plugin.
 * Todo: document.
  */
function Radio(){this.initialize.apply(this, arguments)};
(function(Class){
	var This = Class.prototype;

	var XP_DP_ARGS = "a[data-dp-args]";
	var OPTS = {
		multi: false,
		callback: null,
		value: null,
		values: null
	};
	
	This.initialize = function($this, opts) {
		this.$this = $this;
		this.values = [];
		this.opts = $.extend({}, OPTS, opts);

		$this.attr({
			"data-role":"controlgroup", 
			"data-type":"horizontal"
		});

		var self = this;
		var $items = $this.find(XP_DP_ARGS);
		$items.attr({
			href:"#", "data-role":"button",
			"data-dp-class":"([isActive($this),'ui-btn-active'])", 
			onclick: "$.scope(this).onChange(this)"
		});
		// Note: bind/live in this timing becomes invalid. Move to onclick attribute.

		// markup() is necessary to apply added JQM attribute.
		$.jqmdp.markup($this, true);
	}
	This.onPageInit = function(ev, $this){
		if (this.opts.value) {
			this.setValues([this.opts.value]);
		} else if (this.opts.values) {
			this.setValues(this.opts.values);
		} else if (this.opts.multi != true) {
			$this.jqmdp().refresh(); // initialize data-dp-args attr.
			var $items = $this.find(XP_DP_ARGS);
			this.setValues([$($items[0]).jqmdp().args()]);
		}
	}

	This.onChange = function(a) {
		var v = $(a).jqmdp().args();
		this.opts.multi ? this.toggleValue(v) : this.setValue(v);
	}

	This.isActive = function($a){
		var v = $a.jqmdp().args();
		return (this.values.indexOf(v)>=0);
	}

	This.setValue = function(v) {
		this.values[0] = v;
		if (this.opts.callback) this.opts.callback.call(this, v);
		$.jqmdp.refresh(this.$this);
	}
	
	This.toggleValue = function(v) {
		var idx = this.values.indexOf(v);
		(idx >= 0) ? this.values.splice(idx,1) : this.values.push(v);
		if (this.opts.callback) this.opts.callback.call(this, v);
		$.jqmdp.refresh(this.$this);
	}
	
	This.setValues = function(vs) {
		this.values = vs;
		if (this.opts.callback) this.opts.callback.call(this, vs);
		$.jqmdp.refresh(this.$this);
	}
	
	This.getValue = function() {
		return this.values[0];
	}
	This.getValues = function() {
		return this.values;
	}
})(Radio);
