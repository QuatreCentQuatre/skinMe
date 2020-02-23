/*
 * Import node dependencies
 */
import gulpImagemin from "gulp-imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";

/*
 * Import core dependencies
 */
import environment from "../environment";

/*
 * Define plugins config for:
 * - gulp-imagemin
 * - gulp-sass
 * - gulp-stylelint
 * - gulp-uglify
 */
const plugins = {};

// Define gulp-imagemin config
plugins.gulpImagemin = [
    imageminMozjpeg({ quality: 80, progressive: true }),
    imageminPngquant({ strip: true, quality: [0.65, 0.80] }),
    gulpImagemin.svgo({ plugins: [{ removeViewBox: false }, { cleanupIDs: false }] })
];

// Define gulp-sass config
plugins.gulpSass = {
    indentWidth: 4,
    outputStyle: (environment.settings.minify) ? 'compressed' : (environment.settings.combine) ? 'compact' : 'expanded',
    includePaths: ['node_modules'],
    errLogToConsole: true
};

// Define gulp-styling config
plugins.gulpStylelint = {
    failAfterError: false,
    reporters: [
        { formatter: 'string', console: true }
    ]
};

// Define gulp-uglify config
plugins.gulpUglify = {
    mangle: false,
    compress: {
        sequences: false,
        properties: false,
        dead_code: false,
        drop_debugger: false,
        conditionals: false,
        comparisons: false,
        evaluate: false,
        booleans: false,
        loops: false,
        unused: false,
        hoist_funs: false,
        if_return: false,
        join_vars: false,
        cascade: false,
        side_effects: false,
        warnings: false
    }
};

export default plugins;
