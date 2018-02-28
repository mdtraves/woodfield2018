var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var pump = require('pump');
var runSequence = require('run-sequence');
var htmlMin = require('gulp-htmlmin');



// ***** gulp tasks *****



gulp.task('sass' , function(){
    return gulp.src('app/scss/**/*.scss')
    .pipe(sass())  // ***** scss converted to css *****
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
        stream: true
    }))
});

gulp.task('browserSync', function(){
    browserSync.init({
        server: {
           baseDir: './dist/'
        },
    })
});

gulp.task('useref', function(){
    return gulp.src('app/*.html')
    .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({
            stream: true
        }))
});


gulp.task('html', function() {
    gulp.src(configuration.paths.src.html)
        .pipe(gulp.dest(configuration.paths.dist));
});


// ***** main gulp command *****


gulp.task('watch', ['browserSync', 'sass', 'useref'],function(){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/css/**/*.css',  ['useref']);
  gulp.watch('app/js/**/*.js',  ['useref']);
  gulp.watch('app/*.html',  ['useref']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
  gulp.watch('dist/*.html', browserSync.reload);

})

