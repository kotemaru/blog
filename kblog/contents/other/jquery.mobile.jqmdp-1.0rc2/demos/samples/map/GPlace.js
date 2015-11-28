(function(){
	var Class = function GPlace(){this.initialize.apply(this, arguments)};
	window[Class.name] = Class;
	var This = Class.prototype;
	This.initialize = function() {}

	var URL_SEARCH = "place-list.ssjs";
	var URL_DETAIL = "place-detail.ssjs";
	var cache = {};
	
	Class.getPlaces = function (params, callback) {
		params.sensor = false;
		$.getJSON(URL_SEARCH, params, callback);
	}

	Class.getDetail = function (listItem, callback) {
		if (cache[listItem.id]) {
			callback(cache[listItem.id], "success");
			return;
		}
		var params = {};
		params.sensor = true;
		params.reference = listItem.reference;
		$.getJSON(URL_DETAIL, params, function(json,status){
			callback(json, status);
			cache[json.result.id] = json;
		});
	}

	Class.checkError = function (json, status) {
		if (status != "success" || json.status != "OK") {
			alert("Google place error. "+json.status);
			throw "Google place error. "+json.status;
		}
	}
})();
