(function(){
	var Package = window;
	var Class = function Map(){this.initialize.apply(this, arguments)};
	var This = Class.prototype;
	Package[Class.name] = Class;

	var LatLng = google.maps.LatLng;

	var DEFAULT_CENTER = new google.maps.LatLng(35.684699,139.753897);
	var OPTIONS = {
		zoom: 14,
		center: DEFAULT_CENTER ,
		scaleControl: true,
		mapTypeControl: true,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	This.initialize = function($page, opts) {
		var $canvas = $page.find("div[data-role='content']");
		$canvas.css("padding","0");
		var _opts = $.extend({},OPTIONS,opts);
	
		this.page = $page.get(0);
		this.canvas = $canvas.get(0);
		this.map = new google.maps.Map(this.canvas, _opts);
	}
	
	This.onShow = function (ev, $this) {
		this.updateSize();
	}

	This.updateSize = function() {
		var h = window.innerHeight;
		var h1 = $(this.page).find("div[data-role='header']").height();
		$(this.canvas).height(h - h1);
	}
	
	This.setCenterFromGPS = function() {
		var self = this;
		navigator.geolocation.getCurrentPosition(function(position){
			var lat = position.coords.latitude;
			var lng = position.coords.longitude;
			var center = new LatLng(lat, lng);
			self.map.setCenter(center);
		}, function(e){
			alert(e.message);
		});
	}
	
	This.getPlaces = function() {
		var self = this;
		var pos = this.map.getCenter();
		GPlace.getPlaces({
			location: pos.lat()+","+pos.lng(),
			radius: 300,
		},function(json, status) {
			GPlace.checkError(json, status);
			for (var i=0; i<json.results.length; i++) {
				makeMarker(self, json.results[i]);
			};
		});
	}

	function makeMarker(self, data) {
		var loc = data.geometry.location;
		var pos =  new LatLng(loc.lat, loc.lng);
		var marker = new google.maps.Marker({position:pos, map:self.map});
		google.maps.event.addListener(marker, 'click', function(ev){
			$("#Place").jqmdp("scope").setPlace(data);
			$.mobile.changePage("#Place");
		});
	}

})();