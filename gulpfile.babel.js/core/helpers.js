/*
 * Import node dependencies
 */
import fancyLog from "fancy-log";
import gulp from "gulp";
import runSequence from "run-sequence";

/*
 * Import core dependencies
 */
import config from "./config";

/*
 * Define helpers functions:
 * - generateRelatedTasks
 * - getRelatedStreamFunction
 */
const helpers = {};

/*
 * Generate tasks
 *
 * @param string taskType
 * @param object resources
 * @param function taskFunction
 */
helpers.generateRelatedTasks = (taskType, taskFunction, resources, preTasksSequence = []) => {
    // Defining the main task name
    const mainTaskName = taskType;

    // Defining the main sequence to be executed by the main task
    let mainSequence = [];

    // resources may be constituted by several categories (eg: npm, vendors, assets)
    // for each category, we have to generate related tasks
    for (const [categoryName, category] of Object.entries(resources)) {
        // define the category task name
        const categoryTaskName = '_' + mainTaskName + ':' + categoryName;

        // define the category sequence to be executed by the category task
        let categorySequence = [];

        // category may be constituted by several types (eg: css, fonts, images, js, scss)
        // for each type, we have to generate related task
        for (const [typeName, type] of Object.entries(category)) {
            if (
                (taskType === 'inject' && !config.inject.allowedResourcesTypes.includes(typeName))
                || (taskType === 'lint' && (!config.lint.allowedResourcesCategories.includes(categoryName) || !config.lint.allowedResourcesTypes.includes(typeName)))
            ) {
                continue;
            }

            // define the type task name
            const typeTaskName = categoryTaskName + ':' + typeName;

            gulp.task(typeTaskName, () => taskFunction(typeTaskName, categoryName, typeName, type));

            // store the type task name into the category sequence to be executed by the category task
            categorySequence.push(typeTaskName);
        }

        // on vérifie si une séquence de types est vide car si oui, il n'y a pas besoin de définir de task pour cette catégorie
        if (categorySequence.length === 0) {
            continue;
        }

        // define the category task using the category sequence to be executed
        gulp.task(categoryTaskName, (cb) => {
            runSequence.apply(null, [].concat(categorySequence, cb));
        });

        // store the category task name into the main sequence to be executed by the main task
        mainSequence.push(categoryTaskName);
    }

    // Defining the main task
    gulp.task(mainTaskName, (cb) => {
        if (mainSequence.length !== 0) {
            runSequence.apply(null, [].concat(preTasksSequence, mainSequence, cb));
        } else {
            fancyLog("Nothing to do here");
            cb();
        }
    });
};

/*
 * Get the related stream function if is defined
 *
 * @param string categoryName
 * @param string typeName
 * @param object functions
 * @return null || function
 */
helpers.getRelatedStreamFunction = (categoryName, typeName, streamFunctions) => {
    let relatedStreamFunction = null;

    if (streamFunctions.hasOwnProperty(categoryName) && streamFunctions[categoryName].hasOwnProperty(typeName)) {
        relatedStreamFunction = streamFunctions[categoryName][typeName];
    } else if (streamFunctions.hasOwnProperty(typeName)) {
        relatedStreamFunction = streamFunctions[typeName];
    } else if (streamFunctions.hasOwnProperty('default')) {
        relatedStreamFunction = streamFunctions.default;
    }

    return relatedStreamFunction;
};

export default helpers;
