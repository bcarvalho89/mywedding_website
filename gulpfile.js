var gulp = require('gulp'),
sass = require('gulp-sass'),
browserSync = require('browser-sync'),
connect = require('gulp-connect-php'),
autoprefixer = require('gulp-autoprefixer'),
uglify = require('gulp-uglify'),
jshint = require('gulp-jshint'),
header  = require('gulp-header'),
rename = require('gulp-rename'),
cssnano = require('gulp-cssnano'),
size = require('gulp-size'),
gutil = require('gulp-util'),
notify = require('gulp-notify'),
plumber = require('gulp-plumber'),
package = require('./package.json');

var banner = [
'/*!\n' +
' * <%= package.name %>\n' +
' * <%= package.title %>\n' +
' * <%= package.url %>\n' +
' * @author <%= package.author %>\n' +
' * @version <%= package.version %>\n' +
' * Copyright ' + new Date().getFullYear() + '. <%= package.license %> licensed.\n' +
' */',
'\n'
].join('');


var onError = function (err) {
	gutil.beep();
	console.log(err);
	this.emit('end');
};

gulp.task('css', function () {
	return gulp.src('src/scss/style.scss')
	.pipe(plumber({ errorHandler: onError }))
	.pipe(sass({errLogToConsole: true}))
	.pipe(autoprefixer('last 4 version'))
	.pipe(gulp.dest('dist/assets/css'))
	.pipe(cssnano())
	.pipe(rename({ suffix: '.min' }))
	.pipe(header(banner, { package : package }))
	.pipe(gulp.dest('dist/assets/css'))
	.pipe(size({title: 'css'}))
	.pipe(notify({ message: 'Styles task complete' }))
	.pipe(browserSync.reload({stream:true, once: true}));
	});

gulp.task('js',function(){
	gulp.src('src/js/scripts.js')
	.pipe(jshint('.jshintrc'))
	.pipe(jshint.reporter('default'))
	.pipe(header(banner, { package : package }))
	.pipe(gulp.dest('dist/assets/js'))
	.pipe(uglify())
	.pipe(header(banner, { package : package }))
	.pipe(rename({ suffix: '.min' }))
	.pipe(gulp.dest('dist/assets/js'))
	.pipe(browserSync.reload({stream:true, once: true}));
	});

gulp.task('php', function() {
	connect.server({ base: 'dist', port: 8010, keepalive: true});
	});

gulp.task('browser-sync',['php'], function() {
	browserSync({
		proxy: '127.0.0.1:8010',
		port: 8080,
		open: true,
		notify: true
		});
	});

gulp.task('bs-reload', function () {
	browserSync.reload();
	});

gulp.task('default', ['css', 'js', 'browser-sync'], function () {
	gulp.watch(["src/scss/*/*.scss", "src/scss/*.scss"], ['css']);
	gulp.watch("src/js/*.js", ['js']);
	gulp.watch(["dist/*.php", "dist/inc/*.php", "dist/inc/*/*.php"], ['bs-reload']);
	});