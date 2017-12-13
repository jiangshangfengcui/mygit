/**
* 动态加载js文件代码片段
* 技术点：原生ajax请求json文件、原生创建script并监听load事件
*
*/


var loadScript = function(list, callback) {
	var load = 0;
	var loadNext = function() {
		loadSingleScript(list[load], function () {
			load++;
			if(load >= list.length) {
				callback();
			}else {
				loadNext();
			}
		})
	}
	loadNext();
};

var loadSingleScript = function(src, callback) {
	var s = document.createElement('script');
	s.type = "text/javascript";
	s.src = src;
	s.addListerEvent('load', function() {
		s.removeEventLisenter('load', argument.callee, false);
		s.parentNode.removeChild(s);
		callback();
	}, false);
	document.body.appendChild(s);
};

var xhr = new XHRHttpRequest();
xhr.open('get', './manifest.json?v=' + Math.random(), true);
xhr.addLisenterEvent('load', function () {
	var manifest = JSON.parse(xhr.response);
	var list = manifest.initial.concat(manifest.game);
	loadScript(list, function () {
		// 处理别的业务
	})
});
xhr.send(null);