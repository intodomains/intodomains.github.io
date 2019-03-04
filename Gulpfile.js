var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var prettify = require('gulp-prettify');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
    browserSync.init(["css/*.css", "js/*.js", "jade/**/*.jade"], {
        server: {
            // baseDir: "./"
            proxy: "local.dev"
        }
    });
});

gulp.task('jade', function() {
    gulp.src(['jade/**/!(_)*.jade'])
        .pipe(jade({
                pretty: true
            }).on('error', function(error){
                    console.error('' + error);
                }
        ))
        .pipe(prettify({
              unformatted: []
        }))
        .pipe(gulp.dest('./'))
});

gulp.task('sass', function() {
    gulp.src('sass/**/*.s*ss')
        .pipe(sass().on('error', sass.logError)
        )
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest('css/'))
});

gulp.task('watch1', ['browser-sync'], function() {
    gulp.watch('sass/**/*.s*ss', ['sass']);
});

gulp.task('watch2', ['browser-sync'], function() {
    gulp.watch('jade/**/*.jade', ['jade']);
});

gulp.task('default', ['jade','sass','watch1','watch2']);
