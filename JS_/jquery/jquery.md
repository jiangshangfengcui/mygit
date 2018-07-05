1、$.data(document.body, "foo", "5555"); 

2、window = document.defaultView = window.document.defaultView;
	document = window.document = document.defaultView.document;

3、window.frameElement 返回嵌入当前窗口的frame对象
	
4、window.top 返回最顶级窗口window对象

5、window.parent 返回父级窗口的window对象

6、document.referrer 同一个窗口的上一页

7、1.5.0版本 $.ajax() 执行后返回的是 deferred 对象

8、$.when($.ajax('tesh.html'), $.ajax('text.html')).done(function () {alert('成功！')}).fail(function () { alert('失败！')});  when的参数必须是deferred

9、
	var deferred = $.Deferred(); 延时对象
	deferred.then(doneCallback, failCallback)
	deferred.always()
	deferred.done()
	deferred.fail()
	deferred.resolve()
	deferred.resolveWith(content[,args])  参数会传递到回调函数中 
	deferred.reject()
	deferred.rejectWith()
	deferred.pipe(doneFilterCallback , failFilterCallback)
	deferred.notify()
	deferred.notifyWith()
	deferred.progress()
	deferred.promise()
	deferred.state() 返回对象状态：pending、resolved、rejected

	var d = $.Deferred();
	var wait = function (d) {
		var task = function () {
			alert('wait函数执行完成！');
			d.resolve();
		}
		setInterval(task, 5000);

		return d;
	}
	$.when(wait(d)).done(function() {console.log('done回调函数执行！')}).fail(function () {console.log('fail回调函数执行！')})

	// 成功过滤
	var defer = $.Deferred(),
	    filter = defer.pipe(function (value) { return value*2; });
	defer.resolve(5);
	filter.done(function (result) { alert("value is " + result) });



