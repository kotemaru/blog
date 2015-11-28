
/**
 * ローダ。
 * - バージョン切替え用ローダ
 * - デバッグできなくなるので注意。
 */
(function (version) {
	var JQMDP = "jquery.mobile.jqmdp-1.0rc2.js";
	var FILE_SETS = {
		"1.0": [
			 "jqm/jquery.mobile-1.0.css"
			,"jquery-1.6.4.js"
			,JQMDP
			,"jqm/jquery.mobile-1.0.js"
		],
		"1.0.1": [
			 "jqm/jquery.mobile-1.0.1.css"
			,"jquery-1.6.4.js"
			,JQMDP
			,"jqm/jquery.mobile-1.0.1.js"
		],
		"1.1.0": [
			 "jqm11/jquery.mobile-1.1.0.min.css"
			,"jquery-1.7.1.js"
			,JQMDP
			,"jqm11/jquery.mobile-1.1.0.js"
		],
	};

	/**
	 * The relative path from a JavaScript source file is converted into an absolute path.
	 * @param path relative path
	 */
	function absPath(path) {
		if (!(path.match(/^\//) || path.match(/^https?:/i))) {
			var scripts = document.getElementsByTagName("script");
			path = (scripts[scripts.length-1].src).replace(/[^\/]*$/,path);
		}
		return path;
	}
	
	function loads(fnames) {
		for (var i=0; i<fnames.length; i++) {
			load_1(BASE_PATH+fnames[i]);
		}
	}

	function load_1(fname) {
		var head = document.lastChild;
		if (fname.match(/[.]js$/)) {
			var xreq = new XMLHttpRequest();
			xreq.open("GET", fname, false);
			xreq.send();
			eval(xreq.responseText);
		} else if (fname.match(/[.]css$/)) {
			var elem = document.createElement("link");
			elem.href = fname;
			elem.rel = "stylesheet";
			elem.type = "text/css";
			head.appendChild(elem);
		}
	}

	var BASE_PATH = absPath("");
	loads(FILE_SETS[version]);

})("1.1.0");
