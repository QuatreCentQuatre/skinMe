/*
 * Import node dependencies
 */
import ansiColors from "ansi-colors";
import del from "del";
import fancyLog from "fancy-log";
import path from "path";

/*
 * Import core dependencies
 */
import helpers from "../helpers";
import paths from "../paths";
import resources from "../resources";

/*
 * Clean dist path for each bundle of a resource given
 *
 * @param string taskName: name of the task executing the function
 * @param string categoryName: name of the resource's category processed (eg: npm || vendors || assets)
 * @param string typeName: name of the resource's type processed (eg: css || fonts || images || js || scss)
 * @param array bundles: resource's bundles to process
 */
const clean = (taskName, categoryName, typeName, bundles) => {
    let bundlesPaths = [];

    for (const bundleIndex in bundles) {
        const bundle = bundles[bundleIndex];

        if (bundlesPaths.includes(bundle.paths.dist)) {
            continue;
        }

        bundlesPaths.push(bundle.paths.dist);
    }

    return del(bundlesPaths).then((removedPaths) => {
        if (removedPaths.length >= 1) {
            for (const removedPathIndex in removedPaths) {
                const removedPath = removedPaths[removedPathIndex];

                fancyLog(ansiColors.blue(path.relative(paths.base, removedPath)) + " deleted");
            }
        } else {
            fancyLog("Files already deleted or nonexistent");
        }
    });
};

/*
 * Generate clean tasks
 */
helpers.generateRelatedTasks('clean', clean, resources);
