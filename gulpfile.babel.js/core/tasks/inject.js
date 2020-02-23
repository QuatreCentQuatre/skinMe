/*
 * Import node dependencies
 */
import { argv } from "yargs";
import ansiColors from "ansi-colors";
import fs from "fs";
import gulp from "gulp";
import gulpIf from "gulp-if";
import gulpInject from "gulp-inject";
import gulpPlumber from "gulp-plumber";
import mergeStream from "merge-stream";
import path from "path";

/*
 * Import core dependencies
 */
import config from "../config";
import environment from "../environment";
import helpers from "../helpers";
import paths from "../paths";
import resources from "../resources";
import templateEngine from "../template-engine";

/*
 * Define functions executed by bundles for injection according to the bundle resource's category and/or the bundle resource's type
 * - css
 * - js
 * - scss
 */
const streamFunctions = {};

/*
 * Create a css stream for a bundle of a resource given
 *
 * @param string taskName: name of the task executing the function
 * @param string categoryName: name of the resource's category processed (eg: npm || vendors || assets)
 * @param string typeName: name of the resource's type processed (eg: css || fonts || images || js || scss)
 * @param object bundle: resource's bundle to process
 */
streamFunctions.css = (taskName, categoryName, typeName, bundle) => {
    // Define source files according to environment configs
    let sourceFiles;

    if (environment.settings.combine && environment.settings.minify) {
        sourceFiles = 'combined.' + bundle.name + '.min.css';
    } else if (environment.settings.combine) {
        sourceFiles = 'combined.' + bundle.name + '.css';
    } else if (environment.settings.minify) {
        sourceFiles = [];

        for (const sourcePath of bundle.stream) {
            sourceFiles.push(sourcePath.replace(/\.css$/g, '.min.css'));
        }
    } else {
        sourceFiles = bundle.stream;
    }

    const sources = gulp.src(sourceFiles, { base: bundle.paths.dist, cwd: bundle.paths.dist, read: false });

    // Define injection target file
    const resourceFilePath = path.join(paths.views, 'commons/inject/' + categoryName + '-' + typeName + '-' + bundle.name + templateEngine.fileExtension);

    // Prepare injection target file
    fs.writeFileSync(resourceFilePath, templateEngine.commentDelimiters.start + ' inject:' + categoryName + ':' + typeName + ':' + bundle.name + ' ' + templateEngine.commentDelimiters.end + '\n' + templateEngine.commentDelimiters.start + ' endinject ' + templateEngine.commentDelimiters.end, { mode: '0644' });

    // Define gulp-inject options
    const gulpInjectOptions = {
        starttag: templateEngine.commentDelimiters.start + ' inject:' + categoryName + ':' + typeName + ':' + bundle.name + ' ' + templateEngine.commentDelimiters.end,
        endtag: templateEngine.commentDelimiters.start + ' endinject ' + templateEngine.commentDelimiters.end,
        transform: (filepath) => {
            filepath = path.normalize(path.join(bundle.paths.dist, filepath));

            // Define the source file path to use for stats
            let sourcePath;

            if (!environment.settings.combine && !environment.settings.minify) {
                sourcePath = path.join(paths.resources[categoryName].src, path.relative(path.join(paths.resources.dist, categoryName), filepath));
            } else {
                sourcePath = filepath;
            }

            // Get file stats
            const stats = fs.statSync(sourcePath);

            // Set the absolute file path to inject
            filepath = '/' + path.relative(paths.serverRoot, filepath);

            // We add versioning if we are not on local environment
            if (environment.name !== 'local') {
                filepath += '?v=' + new Date(stats.mtime).getTime();
            }

            return '<link rel="stylesheet" type="text/css" href="{{ asset(\'' + filepath + '\') }}">';
        }
    };

    return gulp.src(resourceFilePath)
        .pipe(gulpIf((argv._[0] === 'watch'), gulpPlumber()))
        .pipe(gulpInject(sources, gulpInjectOptions))
        .pipe(gulp.dest(path.dirname(resourceFilePath)));
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
    // Define source files according to environment configs
    let sourceFiles;

    if (environment.settings.combine && environment.settings.minify) {
        sourceFiles = 'combined.' + bundle.name + '.min.js';
    } else if (environment.settings.combine) {
        sourceFiles = 'combined.' + bundle.name + '.js';
    } else if (environment.settings.minify) {
        sourceFiles = [];

        for (let sourcePath of bundle.stream) {
            sourceFiles.push(sourcePath.replace(/\.js$/g, '.min.js'));
        }
    } else {
        sourceFiles = bundle.stream;
    }

    const sources = gulp.src(sourceFiles, { cwd: bundle.paths.dist, read: false });

    // Define injection target file
    const resourceFilePath = path.join(paths.views, 'commons/inject/' + categoryName + '-' + typeName + '-' + bundle.name + templateEngine.fileExtension);

    // Prepare injection target file
    fs.writeFileSync(resourceFilePath, templateEngine.commentDelimiters.start + ' inject:' + categoryName + ':' + typeName + ':' + bundle.name + ' ' + templateEngine.commentDelimiters.end + '\n' + templateEngine.commentDelimiters.start + ' endinject ' + templateEngine.commentDelimiters.end, { mode: '0644' });

    // Define gulp-inject options
    const gulpInjectOptions = {
        starttag: templateEngine.commentDelimiters.start + ' inject:' + categoryName + ':' + typeName + ':' + bundle.name + ' ' + templateEngine.commentDelimiters.end,
        endtag: templateEngine.commentDelimiters.start + ' endinject ' + templateEngine.commentDelimiters.end,
        transform: (filepath) => {
            filepath = path.normalize(path.join(bundle.paths.dist, filepath));

            // Define the source file path to use for stats
            let sourcePath;

            if (!environment.settings.combine && !environment.settings.minify) {
                sourcePath = path.join(paths.resources[categoryName].src, path.relative(path.join(paths.resources.dist, categoryName), filepath));
            } else {
                sourcePath = filepath;
            }

            // Get file stats
            const stats = fs.statSync(sourcePath);

            // Set the absolute file path to inject
            filepath = '/' + path.relative(paths.serverRoot, filepath);

            // We add versioning if we are not on local environment
            if (environment.name !== 'local') {
                filepath += '?v=' + new Date(stats.mtime).getTime();
            }

            return '<script type="text/javascript" src="{{ asset(\'' + filepath + '\') }}"></script>';
        }
    };

    return gulp.src(resourceFilePath)
        .pipe(gulpIf((argv._[0] === 'watch'), gulpPlumber()))
        .pipe(gulpInject(sources, gulpInjectOptions))
        .pipe(gulp.dest(path.dirname(resourceFilePath)));
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
    // Define source files according to environment configs
    let sourceFiles;

    if (environment.settings.combine && environment.settings.minify) {
        sourceFiles = 'combined.' + bundle.name + '.min.css';
    } else if (environment.settings.combine) {
        sourceFiles = 'combined.' + bundle.name + '.css';
    } else if (environment.settings.minify) {
        sourceFiles = [];

        for (const sourcePath of bundle.stream) {
            sourceFiles.push(sourcePath.replace(/\.scss$/g, '.min.css'));
        }
    } else {
        sourceFiles = [];

        for (const sourcePath of bundle.stream) {
            sourceFiles.push(sourcePath.replace(/\.scss$/g, '.css'));
        }
    }

    const sources = gulp.src(sourceFiles, { cwd: bundle.paths.dist, read: false });

    // Define injection target file
    const resourceFilePath = path.join(paths.views, 'commons/inject/' + categoryName + '-' + typeName + '-' + bundle.name + templateEngine.fileExtension);

    // Prepare injection target file
    fs.writeFileSync(resourceFilePath, templateEngine.commentDelimiters.start + ' inject:' + categoryName + ':' + typeName + ':' + bundle.name + ' ' + templateEngine.commentDelimiters.end + '\n' + templateEngine.commentDelimiters.start + ' endinject ' + templateEngine.commentDelimiters.end, { mode: '0644' });

    // Define gulp-inject options
    const gulpInjectOptions = {
        starttag: templateEngine.commentDelimiters.start + ' inject:' + categoryName + ':' + typeName + ':' + bundle.name + ' ' + templateEngine.commentDelimiters.end,
        endtag: templateEngine.commentDelimiters.start + ' endinject ' + templateEngine.commentDelimiters.end,
        transform: (filepath) => {
            filepath = path.normalize(path.join(bundle.paths.dist, filepath));

            // Define the source file path to use for stats
            let sourcePath;

            if (!environment.settings.combine && !environment.settings.minify) {
                sourcePath = path.join(paths.resources[categoryName].src, path.relative(path.join(paths.resources.dist, categoryName), filepath)).replace(/\/css\//g, '/scss/').replace(/\.css$/g, '.scss');
            } else {
                sourcePath = filepath;
            }

            // Get file stats
            const stats = fs.statSync(sourcePath);

            // Set the absolute file path to inject
            filepath = '/' + path.relative(paths.serverRoot, filepath);

            // We add versioning if we are not on local environment
            if (environment.name !== 'local') {
                filepath += '?v=' + new Date(stats.mtime).getTime();
            }

            return '<link rel="stylesheet" type="text/css" href="{{ asset(\'' + filepath + '\') }}">';
        }
    };

    return gulp.src(resourceFilePath)
        .pipe(gulpIf((argv._[0] === 'watch'), gulpPlumber()))
        .pipe(gulpInject(sources, gulpInjectOptions))
        .pipe(gulp.dest(path.dirname(resourceFilePath)));
};

/*
 * Create inject stream from bundles of a resource type given
 *
 * @param string taskName
 * @param string categoryName
 * @param string typeName
 * @param array bundles
 */
const inject = (taskName, categoryName, typeName, bundles) => {
    // Get related function to be executed by bundles
    const relatedStreamFunction = helpers.getRelatedStreamFunction(categoryName, typeName, streamFunctions);

    // If no related function, we can't inject the bundles
    if (!relatedStreamFunction) {
        throw new Error(ansiColors.red("No inject stream function to execute for '" + typeName + "' resource type"));
    }

    // Store all bundle's stream
    let streams = mergeStream();

    // For each bundle, we are going to execute the related function to get the related stream
    for (const bundleIndex in bundles) {
        const bundle = bundles[bundleIndex];

        // Get related stream
        const stream = relatedStreamFunction(taskName, categoryName, typeName, bundle);

        // Store stream
        streams.add(stream);
    }

    return streams;
};

/*
 * Generate inject tasks if enabled
 */
if (config.options.inject) {
    helpers.generateRelatedTasks('inject', inject, resources);
}
