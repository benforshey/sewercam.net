const fs = require("fs");
const gulp = require("gulp");
const minify = require("gulp-minify");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const babel = require("gulp-babel");
const replace = require("gulp-replace");

function getCSS(base) {
  return fs.readFileSync(`${base}../public/styles/styles.css`, (err, data) => {
    if (err) console.error(err);

    return data;
  });
}

gulp.task("js", () =>
  gulp
    .src("./src/scripts/main.js")
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
    .pipe(gulp.dest("./public/scripts/"))
);

gulp.task("css", () => {
  const plugins = [autoprefixer({ browsers: ["last 3 versions"] }), cssnano()];

  return gulp
    .src("./src/styles/*.css")
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./public/styles/"));
});

gulp.task("inline-css", () => {
  return gulp
    .src("./src/*.html")
    .pipe(
      replace("/* {% include styles.min.css %} */", function () {
        const css = getCSS(this.file.base).toString();

        return css;
      })
    )
    .pipe(gulp.dest("./public"));
});

gulp.task("default", ["js", "css", "inline-css"]);
