/*
 * Import node dependencies
 */
import ansiColors from "ansi-colors";
import del from "del";
import fancyLog from "fancy-log";
import gulp from "gulp";
import path from "path";
import runSequence from "run-sequence";

/*
 * Import core dependencies
 */
import config from "../config";
import helpers from "../helpers";
import paths from "../paths";
import resources from "../resources";

/*
 * Create watcher for each bundle of a resource given
 *
 * @param string taskName: name of the task executing the function
 * @param string categoryName: name of the resource's category processed (eg: npm || vendors || assets)
 * @param string typeName: name of the resource's type processed (eg: css || fonts || images || js || scss)
 * @param array bundles: resource's bundles to process
 */
const watch = (taskName, categoryName, typeName, bundles) => {
    // Define the related process task
    const processTaskName = taskName.replace('watch', 'process');
    const injectTaskName = taskName.replace('watch', 'inject');

    const isInjectable = (config.options.inject && config.inject.allowedResourcesTypes.includes(typeName));

    // For each bundle, we are going to start a watcher
    for (const bundleIndex in bundles) {
        // Get bundle data
        const bundle = bundles[bundleIndex];

        // Define sources to watch
        const sources = (bundle.hasOwnProperty('watch')) ? bundle.watch : bundle.stream;

        // Start watcher
        gulp.watch(sources, { cwd: bundle.paths.src }).on('change', (event) => {
            fancyLog(ansiColors.blue(event.path.replace(paths.base + '/', '')) + ' has been ' + event.type);

            let sequence = [];

            if (event.type === 'added') {
                sequence.push(processTaskName);
                if (isInjectable) sequence.push(injectTaskName);

                runSequence.apply(null, [].concat(sequence));
            } else if (event.type === 'deleted') {
                let filePath = path.relative(bundle.paths.src, event.path);

                if (typeName === 'scss') {
                    filePath = filePath.replace(/\.scss/g, '.css');
                }

                const distPath = path.join(bundle.paths.dist, filePath);

                // Remove distPath
                del([distPath]).then(removedPaths => {
                    if (removedPaths.length >= 1) {
                        for (const removedPathIndex in removedPaths) {
                            const removedPath = removedPaths[removedPathIndex];

                            fancyLog(ansiColors.blue(path.relative(paths.base, removedPath)) + " deleted");
                        }
                    } else {
                        fancyLog("Files already deleted or nonexistent");
                    }

                    if (isInjectable) runSequence(injectTaskName);
                });
            } else if (event.type === 'renamed') {
                sequence.push(processTaskName);
                if (isInjectable) sequence.push(injectTaskName);

                runSequence.apply(null, [].concat(sequence));
            } else {
                sequence.push(processTaskName);

                runSequence.apply(null, [].concat(sequence));
            }
        });
    }
};

/*
 * Define pre tasks sequence for watch task
 */
let preTasksSequence = ['build'];

/*
 * Generate watch tasks
 */
helpers.generateRelatedTasks('watch', watch, resources, preTasksSequence);
