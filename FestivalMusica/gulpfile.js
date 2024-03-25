const{ src, dest, watch, parallel} = require("gulp");
const sass = require("gulp-sass")(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');

//imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

//javascript
const terser = require('gulp-terser-js');


function css(done){
    
    //Almacenarlo en el disco duro
    src('src/scss/**/*.scss')//Identificar el archivo SASS
    .pipe(plumber())
    .pipe(sass())//Compilarlo
    .pipe(postcss([autoprefixer(),cssnano()]))
    .pipe(dest('build/css')); //Almacenarlo en el disco duro

    done(); // Callback que avisa a gulp cuando llegaos al final
}

function dev(done){
    
    watch("src/scss/**/*.scss", css);
    watch("src/js/**/*.js", javascript);
    done();
}

function imagenes(done){
    const opciones = {
        optimationLevel:3
    }
    src('src/img/**/*.{png,jpg}')
    .pipe(cache(imagemin(opciones)))
    .pipe(dest('build/img'))
    done();
}

function versionWebp(done){
    const opciones={
        quality: 60
    };

    src('src/img/**/*.{png,jpg}')
    .pipe(webp(opciones))
    .pipe(dest('build/img'))
    done();
}

function versionAvif(done){
    const opciones={
        quality: 60
    };

    src('src/img/**/*.{png,jpg}')
    .pipe(avif(opciones))
    .pipe(dest('build/img'))
    done();
}

function javascript(done){
    
    src('src/js/**/*.js')
    .pipe(terser())
    .pipe(dest('build/js'))
    done();
}

exports.css = css;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.js=javascript;
exports.dev = parallel(imagenes,versionWebp, versionAvif, javascript,dev);