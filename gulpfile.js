const { src, dest, series } = require('gulp');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const gulpBabel = require('gulp-babel');
const gulpConcat = require('gulp-concat');
const gulpPostcss = require('gulp-postcss');
const gulpRename = require('gulp-rename');
const gulpSass = require('gulp-sass');
const gulpUglify = require('gulp-uglify');

gulpSass.compiler = require('node-sass');

const sourceFiles = {
    js: [
        'src/js/me-skin-manage.js',
        'src/js/me-skin-field.js',
        'src/js/*.js',
    ],
    scss: [
        'src/scss/plugin-me-skin.scss',
        'src/scss/*.scss',
    ]
};
const distPath = 'dist/';

function js() {
    return src(sourceFiles.js)
        .pipe(gulpConcat('me-skin.js'))
        .pipe(gulpBabel())
        .pipe(dest(distPath))
        .pipe(gulpUglify())
        .pipe(gulpRename({ suffix: '.min' }))
        .pipe(dest(distPath));
}

function scss() {
    return src(sourceFiles.scss)
        .pipe(gulpSass.sync({ indentWidth: 4, outputStyle: 'expanded' }))
        .pipe(gulpPostcss([ autoprefixer() ]))
        .pipe(gulpConcat('me-skin.css'))
        .pipe(dest(distPath))
        .pipe(gulpPostcss([ cssnano() ]))
        .pipe(gulpRename({ suffix: '.min' }))
        .pipe(dest(distPath));
}

exports.build = series(js, scss);