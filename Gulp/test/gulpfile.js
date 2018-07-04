var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var jshint = require('gulp-jshint');
var minifyCss = require('gulp-minify-css');
var less = require('gulp-less');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');// 压缩html, 包括页面js、css，去除空格注释删除多余属性
var imagemin = require('gulp-imagemin');


var stream = gulp.src('../api', {buffer: false, read: false});

gulp.task('minify_layer', ['del'], function () {
	return gulp.src('./{layer,common}.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(sourcemaps.init())
		.pipe(uglify({ mangle: true, compress: {dead_code: true, toplevel: true}}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dest')); // 相对当前文件目录
});

gulp.task('style', function () {
	return gulp.src('./assets/*.css')
		.pipe(less())
		.pipe(minifyCss())
		.pipe(concat('style.min.js'))  // 参数是合并后的文件名
		.pipe(gulp.dest('style'));
});

gulp.task('html', () =>
	gulp.src('./assets/*.html')
		.pipe(htmlmin())
		.pipe(gulp.dest('html'));
);

gulp.task('image', () =>
	gulp.src('./assets/*.{jpg,jpeg}')
		.pipe(imagemin())
		.pipe(gulp.dest('images'));
);

gulp.task('del', function () {
	return del(['dest', 'style', 'images']);
});



gulp.task('default', ['minify_layer', 'style', 'image'], function () {
	// console.log(typeof stream, stream);
	// stream.pipe(gulp.dest('dest.js'))
	
})