/* Av Petra Ingemarsson*/

// Inkluderar paket
const { src, dest, parallel, series, watch } = require('gulp');
const ts = require('gulp-typescript');
const terser = require('gulp-terser');
const sass = require('gulp-sass')(require('node-sass'));
const browsersync = require('browser-sync').create();

// Skapar sökvägar för att hämta filer från kataloger
const files = {
    htmlPath: "src/**/*.html",
    imagePath: "src/images/*",
    tsPath: "src/ts/*.ts",
    sassPath: "src/sass/*.scss"
}

// HTML-task
function htmlTask() {

    // Läser in filer
    return src(files.htmlPath)

        // Kopierar filer till katalogen pub
        .pipe(dest('pub'));
}

// IMG-task
function imgTask() {

    // Läser in filer
    return src(files.imagePath)

        // Kopierar filer till pub/images
        .pipe(dest('pub/images'));
}

// TS-task
function tsTask() {

    // Läser in filer
    return src(files.tsPath)

        // Transpilerar kod
        .pipe(ts({
            outFile: 'main.js',
            target: "es5"
        }))

        // Minifierar kod
        .pipe(terser())

        // Kopierar filer till pub/js
        .pipe(dest('pub/js'));
}

// SASS-task
function sassTask() {

    // Läser in filer
    return src(files.sassPath)

        // Kompilerar
        .pipe(sass({ outputStyle: 'compressed' }).on("error", sass.logError))

        // Kopierar filer till pub/css
        .pipe(dest('pub/css'));
}

// Browsersync-task
function browsersyncServer(cb) {

    // Startar synkronisering
    browsersync.init({
        server: {
            baseDir: 'pub/'
        }
    });
    cb();
}

// Browsersync-task
function browsersyncReload(cb) {

    // Laddar om webbläsaren
    browsersync.reload();
    cb();
}

// Watch-task
function watchTask() {

    // Kör funktioner automatiskt vid förändring i källkodsfilerna
    watch([files.htmlPath, files.imagePath, files.sassPath, files.tsPath],
        series(parallel(htmlTask, imgTask, sassTask, tsTask), browsersyncReload));
}

// Exporterar funktioner
exports.default = series(
    parallel(htmlTask, imgTask, sassTask, tsTask),
    browsersyncServer,
    watchTask
);