/*
 * Import node dependencies
 */
import { argv } from "yargs";
import ansiColors from "ansi-colors";
import autoprefixer from "autoprefixer";
import fancyLog from "fancy-log";
import gulp from "gulp";
import gulpBabel from "gulp-babel";
import gulpCached from "gulp-cached";
import gulpChanged from "gulp-changed";
import gulpCleanCss from "gulp-clean-css";
import gulpConcat from "gulp-concat";
import gulpIf from "gulp-if";
import gulpImagemin from "gulp-imagemin";
import gulpPlumber from "gulp-plumber";
import gulpPostcss from "gulp-postcss";
import gulpRename from "gulp-rename";
import gulpSass from "gulp-sass";
import gulpSourcemaps from "gulp-sourcemaps";
import gulpStylelint from "gulp-stylelint";
import gulpUglify from "gulp-uglify";
import mergeStream from "merge-stream";
import path from "path";

/*
 * Import core dependencies
 */
import config from "../config";
import environment from "../environment";
import helpers from "../helpers";
import resources from "../resources";

/*
 * Define functions executed by bundles for processing according to the bundle resource's category and/or the bundle resource's type
 * - default
 * - css
 * - images
 * - js
 * - scss
 */
const streamFunctions = {};

/*
 * Create a default stream for a bundle of a resource given
 *
 * @param string taskName: name of the task executing the function
 * @param string categoryName: name of the resource's category processed (eg: npm || vendors || assets)
 * @param string typeName: name of the resource's type processed (eg: css || fonts || images || js || scss)
 * @param object bundle: resource's bundle to process
 */
streamFunctions.default = (taskName, categoryName, typeName, bundle) => {
    let nSrc = 0;
    let nDest = 0;

    return gulp.src(bundle.stream, { base: bundle.paths.src, cwd: bundle.paths.src })
        .pipe(gulpIf((argv._[0] === 'watch'), gulpPlumber()))
        .pipe(gulpIf((argv._[0] === 'watch'), gulpChanged(bundle.paths.dist)))
        .on('data', () => { nSrc += 1; })
        .pipe(gulp.dest(bundle.paths.dist))
        .on('data', () => { nDest += 1; })
        .on('finish', () => {
            fancyLog("Bundle " + ansiColors.blue(bundle.name) + ": " + ansiColors.cyan(nSrc) + " source files / " + ansiColors.cyan(nDest) + " public files generated");
        });
};

/*
 * Create a css stream for a bundle of a resource given
 *
 * @param string taskName: name of the task executing the function
 * @param string categoryName: name of the resource's category processed (eg: npm || vendors || assets)
 * @param string typeName: name of the resource's type processed (eg: css || fonts || images || js || scss)
 * @param object bundle: resource's bundle to process
 */
streamFunctions.css = (taskName, categoryName, typeName, bundle) => {
    let nSrc = 0;
    let nDest = 0;

    return gulp.src(bundle.stream, { base: bundle.paths.src, cwd: bundle.paths.src })
        .pipe(gulpIf((argv._[0] === 'watch'), gulpPlumber()))
        .pipe(gulpIf((argv._[0] === 'watch'), gulpCached(taskName + ':' + bundle.name)))
        .on('data', () => { nSrc += 1; })
        .pipe(gulpIf(environment.settings.minify, gulpCleanCss()))
        .pipe(gulpIf(environment.settings.combine, gulpConcat('combined.' + bundle.name + '.css')))
        .pipe(gulpIf(environment.settings.minify, gulpRename({ suffix: '.min' })))
        .pipe(gulp.dest(bundle.paths.dist))
        .on('data', () => { nDest += 1; })
        .on('finish', () => {
            fancyLog("Bundle " + ansiColors.blue(bundle.name) + ": " + ansiColors.cyan(nSrc) + " source files / " + ansiColors.cyan(nDest) + " public files generated");
        });
};

/*
 * Create an images stream for a bundle of a resource given
 *
 * @param string taskName: name of the task executing the function
 * @param string categoryName: name of the resource's category processed (eg: npm || vendors || assets)
 * @param string typeName: name of the resource's type processed (eg: css || fonts || images || js || scss)
 * @param object bundle: resource's bundle to process
 */
streamFunctions.images = (taskName, categoryName, typeName, bundle) => {
    let nSrc = 0;
    let nDest = 0;

    return gulp.src(bundle.stream, { base: bundle.paths.src, cwd: bundle.paths.src })
        .pipe(gulpIf((argv._[0] === 'watch'), gulpPlumber()))
        .pipe(gulpIf((argv._[0] === 'watch'), gulpChanged(bundle.paths.dist)))
        .on('data', () => { nSrc += 1; })
        .pipe(gulpImagemin(config.plugins.gulpImagemin))
        .pipe(gulp.dest(bundle.paths.dist))
        .on('data', () => { nDest += 1; })
        .on('finish', () => {
            fancyLog("Bundle " + ansiColors.blue(bundle.name) + ": " + ansiColors.cyan(nSrc) + " source files / " + ansiColors.cyan(nDest) + " public files generated");
        });
};

/*
 * Create a js stream for a bundle of a resource given
 *
 * @param string taskName: name of the task executing the function
 * @param string categoryName: name of the resource's category processed (eg: npm || vendors || assets)
 * @param string typeName: name of the resource's type processed (eg: css || fonts || images || js || scss)
 * @param object bundle: resource's bundle to process
 */
streamFunctions.js = (taskName, categoryName, typeName, bundle) => {
    let nSrc = 0;
    let nDest = 0;

    return gulp.src(bundle.stream, { base: bundle.paths.src, cwd: bundle.paths.src })
        .pipe(gulpIf((argv._[0] === 'watch'), gulpPlumber()))
        .pipe(gulpIf((argv._[0] === 'watch'), gulpCached(taskName + ':' + bundle.name)))
        .on('data', () => { nSrc += 1; })
        .pipe(gulpIf(environment.settings.sourcemaps && categoryName === 'assets', gulpSourcemaps.init()))
		.pipe(gulpBabel({
            ignore: (bundle.hasOwnProperty('babelIgnore') ? bundle.babelIgnore : [])
        }))
        .pipe(gulpIf(environment.settings.minify, gulpUglify(config.plugins.gulpUglify)))
        .pipe(gulpIf(environment.settings.combine, gulpConcat('combined.' + bundle.name + '.js')))
        .pipe(gulpIf(environment.settings.minify, gulpRename({ suffix: '.min' })))
        .pipe(gulpIf(environment.settings.sourcemaps && categoryName === 'assets', gulpSourcemaps.write('.', { sourceRoot: path.relative(bundle.paths.dist, bundle.paths.src) })))
        .pipe(gulp.dest(bundle.paths.dist))
        .on('data', () => { nDest += 1; })
        .on('finish', () => {
            fancyLog("Bundle " + ansiColors.blue(bundle.name) + ": " + ansiColors.cyan(nSrc) + " source files / " + ansiColors.cyan(nDest) + " public files generated");
        });
};

/*
 * Create a scss stream for a bundle of a resource given
 *
 * @param string taskName: name of the task executing the function
 * @param string categoryName: name of the resource's category processed (eg: npm || vendors || assets)
 * @param string typeName: name of the resource's type processed (eg: css || fonts || images || js || scss)
 * @param object bundle: resource's bundle to process
 */
streamFunctions.scss = (taskName, categoryName, typeName, bundle) => {
    let nSrc = 0;
    let nDest = 0;

    return gulp.src(bundle.stream, { base: bundle.paths.src, cwd: bundle.paths.src })
        .pipe(gulpIf((argv._[0] === 'watch'), gulpPlumber({
            errorHandler: (error) => {
                fancyLog(ansiColors.magenta('gulp-plumber') + " " + ansiColors.red('found unhandled error') + "\n" + ansiColors.red(error.name) + " in " + ansiColors.magenta(error.plugin) + "\n\n" + error.message.toString());
            }
        })))
        .pipe(gulpIf((argv._[0] === 'watch'), gulpCached(taskName + ':' + bundle.name)))
        .on('data', () => { nSrc += 1; })
        .pipe(gulpIf(environment.settings.sourcemaps && categoryName === 'assets', gulpSourcemaps.init()))
        .pipe(gulpIf(config.options.lint && config.lint.allowedResourcesCategories.includes(categoryName), gulpStylelint(config.plugins.gulpStylelint)))
        .pipe(gulpSass.sync(config.plugins.gulpSass))
        .pipe(gulpPostcss([ autoprefixer() ]))
        .pipe(gulpIf(environment.settings.minify, gulpCleanCss()))
        .pipe(gulpIf(environment.settings.combine, gulpConcat('combined.' + bundle.name + '.css')))
        .pipe(gulpIf(environment.settings.minify, gulpRename({ suffix: '.min' })))
        .pipe(gulpIf(environment.settings.sourcemaps && categoryName === 'assets', gulpSourcemaps.write('.', { sourceRoot: path.relative(bundle.paths.dist, bundle.paths.src) })))
        .pipe(gulp.dest(bundle.paths.dist))
        .on('data', () => { nDest += 1; })
        .on('finish', () => {
            fancyLog("Bundle " + ansiColors.blue(bundle.name) + ": " + ansiColors.cyan(nSrc) + " source files / " + ansiColors.cyan(nDest) + " public files generated");
        });
};

/*
 * Create process's stream for each bundle of a resource given
 *
 * @param string taskName: name of the task executing the function
 * @param string categoryName: name of the resource's category processed (eg: npm || vendors || assets)
 * @param string typeName: name of the resource's type processed (eg: css || fonts || images || js || scss)
 * @param array bundles: resource's bundles to process
 */
const process = (taskName, categoryName, typeName, bundles) => {
    // Get resource's related function to be executed by each bundle
    const relatedStreamFunction = helpers.getRelatedStreamFunction(categoryName, typeName, streamFunctions);

    // If no related function, we can't process the bundles
    if (!relatedStreamFunction) {
        throw new Error(ansiColors.red("No process stream function to execute for '" + typeName + "' resource type"));
    }

    // Store all bundle's stream
    let streams = mergeStream();

    // For each bundle, we are going to execute the related function to get the related stream
    for (const bundleIndex in bundles) {
        // Get bundle data
        const bundle = bundles[bundleIndex];

        // Get related stream
        const stream = relatedStreamFunction(taskName, categoryName, typeName, bundle);

        // Store stream
        streams.add(stream);
    }

    return streams;
};

/*
 * Define pre tasks sequence for process task
 */
let preTasksSequence = ['clean'];

/*
 * Generate process tasks
 */
helpers.generateRelatedTasks('process', process, resources, preTasksSequence);
