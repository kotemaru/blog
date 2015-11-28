/**
 * カレンダー部品
 * TODO: document.
 */
function Calendar(){this.initialize.apply(this, arguments)};
(function(Class){
	var This = Class.prototype;
	
	var TEMPL      = $.jqmdp.absPath("Calendar.html");
	var CL_BASE    = "dp-calendar";
	var CL_SELECT  = "dp-calendar-select";
	var CL_DIALOG  = "dp-calendar-dialog";
	var OPTS = {
		dialog: false
	};
	This.initialize = function($this, opts) {
		this.$this = $this;
		this.opts = $.extend({}, OPTS, opts);

		this.table = [new Array(5),new Array(5),new Array(5),new Array(5),new Array(5),new Array(5),new Array(5),new Array(5)];
		this.setDate(new Date());
		$.jqmdp.template($this, TEMPL, function($this, $src){
			$this.jqmdp().refresh();
		});

		$this.addClass(CL_BASE);
		if (this.opts.dialog) {
			$this.addClass(CL_DIALOG);
			$this.hide();
		}
	}
	This.open = function() {
		var $this = this.$this;
		var offset = $this.parent().jqmdp(this.opts.target).offset();
		$this.css(offset);
		$this.fadeIn(200);
		$this.show();
	}
	This.close = function() {
		var self = this;
		this.$this.fadeOut(400, function(){
			self.$this.hide();
		});
	}

	This.setDate = function(date){
		this.date = date;
		this.refresh();
	}
	This.refresh = function(){
		var date = new Date(this.date);
		for (var x=0; x<7; x++) {
			this.table[x][0] = "";
			this.table[x][4] = "";
			this.table[x][5] = "";
		}
		
		var y = 0;
		for (var i=1; i<=31; i++) {
			date.setDate(i);
			if (date.getDate() != i) break;
			var x = date.getDay();
			this.table[x][y] = i;
			if (x == 6) y++;
		};

		$.jqmdp.refresh(this.$this);
	}
	This.next = function(delta){
		var date = this.date;
		
		var d = date.getDate();		
		date.setDate(1);
		date.setMonth(date.getMonth()+delta);
		var m = date.getMonth();
		date.setDate(d);
		while (date.getMonth() != m) {
			date.setDate(--d);
			date.setMonth(m);
		}
		this.refresh();
	}
	This.yyyy_mm_dd = function(){
		var d = this.date;
		return d.getFullYear()+"-"+to0n(d.getMonth()+1)+"-"+to0n(d.getDate());
	}
	This.yyyy_mm = function(){
		var d = this.date;
		return d.getFullYear()+"/"+to0n(d.getMonth()+1);
	}
	function to0n(n) {
		var str = "0"+n;
		return str.substr(str.length-2);
	}

	This.today = function($td, x,y){
		$td.toggleClass(CL_SELECT, (this.date.getDate() == this.table[x][y]));
		return this.table[x][y];
	}
	This.click = function(x,y){
		if (this.table[x][y] != "") {
			this.date.setDate(this.table[x][y]);
		}
		$.jqmdp.refresh(this.$this);
		if (this.opts.target) {
			$.jqmdp(this.$this, this.opts.target).refresh();
		}
		if (this.opts.dialog) this.close();
	}

})(Calendar);
