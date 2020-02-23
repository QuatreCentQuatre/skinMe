/*
 * Import node dependencies
 */
import gulp from "gulp";
import runSequence from "run-sequence";

/*
 * Import core dependencies
 */
import config from "../config";

/*
 * Defining the 'build' task
 *
 * What the 'build' task must do ?
 * - clean the dist folder (that process is executed by the 'process' task since the 'clean' task is a dependency)
 * - process source files to compile them into the dist folder, taking into account the destination environment
 * - if 'inject' is set to true into 'gulp/config/options.js': inject path to dist files into dedicated views
 */

// So, first of all, we define a main tasks sequence to be executed by adding the 'process' task
let mainSequence = ['process'];

// Next, if 'inject' is set to true, we add the 'inject' task into the main tasks sequence
if (config.options.inject) {
    mainSequence.push('inject');
}

// Finally, we register the 'build' task which will execute the main tasks sequence in the specified order
gulp.task('build', (cb) => {
    runSequence.apply(null, [].concat(mainSequence, cb));
});
