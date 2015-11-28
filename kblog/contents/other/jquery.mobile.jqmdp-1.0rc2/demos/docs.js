
var Docs = {};

Docs.trimHtml = function(str) {
	return str.replace(/^\s*/,"").replace(/\s*$/,"")
		.replace(/\t/g,"  ")
		.replace(/<head>([\r\n]|.)*<\/head>/,"<head>...</head>")
		.replace(/&/g,"&amp;")
		.replace(/</g,"&lt;")
		.replace(/(data-dp-[a-z]+="[^"]*")/g,"<b>$1</b>")
		.replace(/(on[a-z]+="[^"]*[$][.]jqmdp[.(][^"]*")/g,"<b>$1</b>")
		.replace(/(on[a-z]+="[^"]*[$][.]scope[.(][^"]*")/g,"<b>$1</b>")
		.replace(/&lt;!--(.*)-->/g,"&lt;!--<i>$1</i>-->")
		.replace(/\n/gm,"<br/>")
		.replace(/[ ]/g,"&nbsp;")
	;
}

Docs.trimJs = function(str) {
	return str.replace(/\t/g,"  ")
		.replace(/&/g,"&amp;")
		.replace(/</g,"&lt;")
		.replace(/\/\/(.*)$/mg,"//<i>$1</i>")
		.replace(/\/\*\/?(([\r\n]|[^\/]|[^*]\/)*)\*\//mg,"/*<i>$1</i>*/")
		.replace(/\n/gm,"<br/>")
		.replace(/[ ]/g,"&nbsp;")
	;
}

Docs.datas = {};

Docs.getSrc = function(tgt, url) {
	if (Docs.datas[url]) return Docs.datas[url];

	$.ajax({
		url: url,
		cache: false,
		dataType: "text",
		success: function(data){
			Docs.datas[url] = url.match(/[.]html$/) 
				? Docs.trimHtml(data)
				: Docs.trimJs(data);
			$.jqmdp(tgt).refresh();
		},
		error: function(xreq,stat,err) {
			alert(err+" "+url);
		}
	});
	return "";
}

