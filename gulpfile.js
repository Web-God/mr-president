// Sass configuration
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function (cb) {
  gulp
    .src('assets/css/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(sass())
    .pipe(
      gulp.dest(function (f) {
        return f.base;
      })
    );
  cb();
});

gulp.task(
  'default',
  gulp.series('sass', function (cb) {
    gulp.watch('assets/css/styles.css', gulp.series('sass'));
    cb();
  })
);

// gulp.task('styles', function () {
//   gulp.src('wp-content/themes/themename/assets/sass/style.scss')
//     .pipe(sass().on('error', sass.logError))
//     .pipe(cleanCSS())
//     .pipe(gulp.dest('wp-content/themes/themename/assets/css/'));
// });
