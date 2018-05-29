// 缓冲动画式回到顶部效果
module.exports = {
	dom: null,
	options: {	
		ratio: 0.5,
	},
	GoBack: function (el, options) {
		this.dom = typeof el == "object" ? el : document.getElementById(dom);
		for(i in options) this.options[i] = options[i];
		this.bindEvent(dom);
	},
	bindEvent: function (dom) {
		window.addEventListener('scroll', scrollHandler.bind(this), false);
		this.dom.addEventListener('click', clickHandler, false);
	},
	scrollHandler: function () {
		this.dom.style.display = window.scrollY >= window.innerHeight ? "block" : "none"; 
	},
	clickHandler: function () {
		var scrollTop = window.scrollY;
		if(scrollTop > 0) setInterval(timer, 1000);
		function Timer () {
			if(scrollTop > 0){
				scrollTop = scrollTop - this.ratio * scrollTop;
				window.scrollTo(scrollTop);
				if(scrollTop < 5)
				window.scrollTo(0);
				clearInterval(timer);
			}
		}
	}
}