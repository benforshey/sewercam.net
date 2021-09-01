const fs = require("fs");
const gulp = require("gulp");
const minify = require("gulp-minify");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const babel = require("gulp-babel");
const replace = require("gulp-replace");
const { series, src, dest } = gulp;

function getCSS(base) {
  return fs.readFileSync(`${base}/public/styles/styles.css`, (err, data) => {
    if (err) console.error(err);

    return data;
  });
}

function js() {
  return src("./src/scripts/main.js")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(
      minify({
        ext: {
          src: ".js",
          min: "-min.js",
        },
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(dest("./public/scripts/"));
}

function css() {
  const plugins = [autoprefixer(), cssnano()];

  return src("./src/styles/*.css")
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write("./"))
    .pipe(dest("./public/styles/"));
}

function inlineCSS() {
  return src("./src/*.html")
    .pipe(
      replace("/* {% include styles.min.css %} */", function () {
        const css = getCSS(__dirname).toString();

        return css;
      })
    )
    .pipe(dest("./public"));
}

exports.default = series(js, css, inlineCSS);
