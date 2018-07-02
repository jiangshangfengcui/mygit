1、gulp安装
	
	npm install gulp-cli -g 		全局安装gulp-cli
	npm install gulp --save-dev 	本地安装gulp
	touch gulpfile.js 				创建gulpfile.js
	gulp --help						命令查看


2、安装插件
	
	npm install gulp-uglify
	npm install gulp-jshint jshint 
	npm install gulp-rename 
	npm install gulp-concat			参数配置 https://github.com/gulp-community/gulp-concat 
	
		gulp.task('javascript', function() {
		  return gulp.src('src/**/*.js')
		    .pipe(sourcemaps.init())
		    .pipe(concat('all.js', { newLine: ';' }))  或者 .pipe(concat({ path: 'all.js', stat: { mode: 0666 }}))
		    .pipe(sourcemaps.write())
		    .pipe(gulp.dest('dist'));
		});

		stat 设置生成文件的权限
		newLine 

		最后产生的文件路径：./dist/all.js

	npm install gulp-



3、插件API

3.1、node-glob
		
		Glob Primer

		* 							匹配所有的文件, 不会匹配'.'
		**							匹配0个或多个子文件夹
		{.., ..} 					匹配多个属性 {a, b}.js   .{jpg,pug,gif}
		!... 						排除
		? 							匹配一个或零个 							
		[...]、[!...]、[^...]		匹配内部内容
		!(pattern|pattern|pattern) 	不匹配pattern
		. 							普通字符

3.2、gulp-uglify
	
	command　line usage 
		uglify [input files] [options]


	uglify({
		mangle: true,												// 默认true, 是否修改变量名
		compress: {													// 压缩参数
			dead_code: true,
			toplevel: true
		}
	})

	参数详解地址：https://segmentfault.com/a/1190000008995453


3.3、gulp-jshint jshint
	
	usage 
		gulp.src('./*.js').pipe(jshint()).pipe(jshint.reporter('default'))  其中default是reporter的命名






