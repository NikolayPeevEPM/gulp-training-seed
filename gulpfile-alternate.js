var gulp = require('gulp');
var config = require('./gulp/config');
var inlinesource = require('gulp-inline-source');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var templateCache = require('gulp-angular-templatecache');
var rename = require('gulp-rename');

gulp.task('$ng-templates', function () {
    return gulp.src(config.ngtemplates.src)
        .pipe(templateCache(config.ngtemplates.settings))
        .pipe(gulp.dest(config.tempFolderPath));
});

gulp.task('$inlinesource', ['$concat'], function () {
    return gulp.src('index-inject-alternate.html')
        .pipe(rename('index.html'))
        .pipe(inlinesource())
        .pipe(gulp.dest('./.tmp'));
});

gulp.task('$concat', ['$ng-templates'], function() {
    return gulp.src(['./app/**/*.js','./.tmp/templates.js','!**/*.spec.js'])
        .pipe(ngAnnotate())
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('.tmp/'));
});

gulp.task('build', ['$inlinesource']);
