/*
 * Import node dependencies
 */
import ansiColors from "ansi-colors";
import gulp from "gulp";
import gulpStylelint from "gulp-stylelint";
import mergeStream from "merge-stream";

/*
 * Import core dependencies
 */
import config from "../config";
import helpers from "../helpers";
import resources from "../resources";

/*
 * Define functions executed by bundles for linting according to the bundle resource's category and/or the bundle resource's type
 * - scss
 */
const streamFunctions = {};

/*
 * Create a scss stream for a bundle of a resource given
 *
 * @param string taskName: name of the task executing the function
 * @param string categoryName: name of the resource's category processed (eg: npm || vendors || assets)
 * @param string typeName: name of the resource's type processed (eg: css || fonts || images || js || scss)
 * @param object bundle: resource's bundle to process
 */
streamFunctions.scss = (taskName, categoryName, typeName, bundle) => {
    const sources = (bundle.hasOwnProperty('lint')) ? bundle.lint : bundle.stream;

    return gulp.src(sources, { base: bundle.paths.src, cwd: bundle.paths.src })
        .pipe(gulpStylelint(config.plugins.gulpStylelint));
};

/*
 * Create lint's stream for each bundle of a resource given
 *
 * @param string taskName: name of the task executing the function
 * @param string categoryName: name of the resource's category processed (eg: npm || vendors || assets)
 * @param string typeName: name of the resource's type processed (eg: css || fonts || images || js || scss)
 * @param array bundles: resource's bundles to process
 */
const lint = (taskName, categoryName, typeName, bundles) => {
    // Get resource's related function to be executed by each bundle
    const relatedStreamFunction = helpers.getRelatedStreamFunction(categoryName, typeName, streamFunctions);

    // If no related function, we can't lint the bundles
    if (!relatedStreamFunction) {
        throw new Error(ansiColors.red("No lint stream function to execute for '" + typeName + "' resource type"));
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
 * Generate lint tasks
 */
helpers.generateRelatedTasks('lint', lint, resources);
