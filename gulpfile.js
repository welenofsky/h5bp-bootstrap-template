var gulp = require('gulp');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var del = require('del');
var runSequence = require('run-sequence');
var less = require('gulp-less');
var path = require('path');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');


// Clean
gulp.task('clean', [
	'clean:js',
	'clean:css',
	'clean:fonts',
]);

gulp.task('clean:js', function(){
	return del(['./js/vendor', './js/main.*js']);
});

gulp.task('clean:fonts', function(){
	return del(['./fonts']);
});

gulp.task('clean:css', function(){
	return del(['./css']);
});

gulp.task('default', function(callback) {
	// run-sequence is temporary solution.
	// Going to be irrelevant with gulp 4.*
	runSequence('clean',
		['scripts', 'styles'],
		'compress',
		callback);
});

gulp.task('styles', [
	'styles:fonts',
	'styles:less'
]);

gulp.task('styles:fonts', function() {
	// place code for your default task here
	return gulp.src('./bower_components/fontawesome/fonts/*')
		.pipe(gulp.dest('fonts'))
});

gulp.task('styles:less', function () {
  return gulp.src('./less/__main.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))   
    .on('error', notify.onError(function (error) {
        return 'LESS compilation failed: ' + error.message;
	}))
    .pipe(rename('main.css'))
    .pipe(gulp.dest('./css'))
    .pipe(notify('LESS compiled successfully!'));
});

gulp.task('scripts', [
	'scripts:jquery',
	'scripts:bootstrap',
]);

gulp.task('scripts:jquery', function() {
	// place code for your default task here
	return gulp.src('./bower_components/jquery/dist/jquery.min.js')
		.pipe(gulp.dest('js/vendor'))
  		// .pipe(notify('Copied <%= file.relative %>!'));
});

gulp.task('scripts:bootstrap', function(){
	return gulp.src([
	    'js/plugins.js',
	    'bower_components/bootstrap/js/transition.js',
	    'bower_components/bootstrap/js/alert.js',
	    'bower_components/bootstrap/js/button.js',
	    'bower_components/bootstrap/js/carousel.js',
	    'bower_components/bootstrap/js/collapse.js',
	    'bower_components/bootstrap/js/dropdown.js',
	    'bower_components/bootstrap/js/modal.js',
	    'bower_components/bootstrap/js/tooltip.js',
	    'bower_components/bootstrap/js/popover.js',
	    'bower_components/bootstrap/js/scrollspy.js',
	    'bower_components/bootstrap/js/tab.js',
	    'bower_components/bootstrap/js/affix.js'])
		.pipe(concat({ path: 'main.js'}))
		.pipe(gulp.dest('./js'));
});

gulp.task('compress', [
	'compress:css',
	'compress:js'
]);

gulp.task('compress:js', function(){
	return gulp.src('./js/main.js')
		.pipe(uglify())
	    .on('error', notify.onError(function (error) {
	        return 'Uglifying failed: ' + error.message;
		}))
		.pipe(rename('main.min.js'))
		.pipe(gulp.dest('./js'))
});

gulp.task('compress:css', function(){
	return gulp.src('css/*.css')
		.pipe(cleanCSS())
	    .on('error', notify.onError(function (error) {
	        return 'CSS Minification failed: ' + error.message;
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('./css'))
});

gulp.task('watch', function(callback) {

	// Watch .less files
	gulp.watch('less/*.less', ['default']);

	// Watch .js files
	// gulp.watch('src/scripts/**/*.js', ['scripts']);

});
