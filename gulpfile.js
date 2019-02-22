const gulp = require('gulp');
const minify = require('gulp-minify');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');

gulp.task('js', () =>
  gulp.src('./scripts/main.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(minify({
      ext: {
        src: '.js',
        min: '-min.js',
      },
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./scripts/dist/')));

gulp.task('css', () => {
  const plugins = [
    autoprefixer({ browsers: ['last 3 versions'] }),
    cssnano(),
  ];
  return gulp.src('./css/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./css/dist/'));
});

gulp.task('default', ['js', 'css']);
