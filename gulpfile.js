const { src, dest, task, series, watch, parallel } = require("gulp");
const rm = require("gulp-rm");
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
// const px2rem = require('gulp-smile-px2rem');
// const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

task("clean", () => {
  return src("dist/**/*", { read: false }).pipe(rm());
});

task('copy:html', () => {
  return src('src/*.html')
    .pipe(dest('dist'))
    .pipe(reload({ stream: true }));
 });

const styles = [
  "node_modules/normalize.css/normalize.css",
  "src/css/components/main.scss"
]

task('styles', () => {
  return src(styles)
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat("main.min.scss"))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    // .pipe(px2rem())
    .pipe(gulpif(env === 'prod', autoprefixer({
      cascade: false
    })))
    // .pipe(gulpif(env === 'prod', gcmq()))
    .pipe(gulpif(env === 'prod', cleanCSS()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest('dist'))
    .pipe(reload({ stream: true }));
 });

 const libs = [
  // 'node_modules/jquery/dist/jquery.js',
  'src/script/*.js'
 ];

 task('scripts', () => {
  return src(libs)
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.js', {newLine: ';'}))
    .pipe(gulpif(env === 'prod', uglify()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest('dist'))
    .pipe(reload({ stream: true }));
 });

 task('icons', () => {
  return src('src/img/icons/*.svg')
    .pipe(svgo({
      plugins: [
        {
          removeAttrs: {
            attrs: '(fill|stroke|style|width|height|data.*)'
          }
        }
      ]
    }))
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest('dist/img/icons'));
 });

 task('server', () => {
  browserSync.init({
      server: {
          baseDir: "./dist"
      },
      open: false
  });
});

task('watch', () => {
  watch('./src/css/**/*.scss', series('styles'));
  watch('./src/*.html', series('copy:html'));
  watch('./src/script/*.js', series('scripts'));
  watch('./src/img/icons/*.svg', series('icons'));
 });
  
 task('default',
  series(
    'clean',
    parallel('copy:html', 'styles', 'scripts', 'icons'),
    parallel('watch', 'server')
  )
 );
  
 task('build',
  series(
    'clean',
    parallel('copy:html', 'styles', 'scripts', 'icons'))
 );
