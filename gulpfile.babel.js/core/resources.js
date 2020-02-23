/*
 * Import node dependencies
 */
import ansiColors from "ansi-colors";

/*
 * Import project dependencies
 */
import assets from '../config/resources/assets';
import npm from '../config/resources/npm';
import vendors from '../config/resources/vendors';

// Project declared resources from gulp/config/resources/
const declaredResources = {
    npm,
    vendors,
    assets
};

// All valid resources will be store in a new constant to keep only valid one
const resources = {};

// To get valid resources we have to verify each resources categories
for (const [categoryName, category] of Object.entries(declaredResources)) {
    // on vérifie que la catégorie est bien un object et qu'elle n'est pas vide
    if (category.constructor !== Object) {
        throw new Error(ansiColors.blue("gulp/config/resources/" + categoryName + ".js") + ansiColors.red(" - export default must be an object"));
    } else if (Object.keys(category).length === 0) {
        throw new Error(ansiColors.blue("gulp/config/resources/" + categoryName + ".js") + ansiColors.red(" - export default must be a non-empty object"));
    }

    // If resource category data is valid, we have to verify each resources types
    for (const [typeName, type] of Object.entries(category)) {
        // on vérifie que le type est bien un array
        if (type.constructor !== Array) {
            throw new Error(ansiColors.blue("gulp/config/resources/" + categoryName + ".js") + " - " + ansiColors.red("property 'resources." + typeName + "' is not an array"));
        }

        // Si le type est vide, ce n'est pas une erreur mais on l'enlève des ressources à traiter car il n'y aura rien à faire
        if (type.length === 0) {
            continue;
        }

        // If resource type data is valid, we have to verify each bundles
        for (const [bundleIndex, bundle] of Object.entries(type)) {
            // on vérifie que le bundle a bien une propriété 'name', que c'est un string et qu'elle n'est pas vide
            if (!bundle.hasOwnProperty('name')) {
                throw new Error(ansiColors.blue("gulp/config/resources/" + categoryName + ".js") + " - " + ansiColors.red("property 'resources." + typeName + "[" + bundleIndex + "].name' is not defined"));
            } else if (bundle.name.constructor !== String) {
                throw new Error(ansiColors.blue("gulp/config/resources/" + categoryName + ".js") + " - " + ansiColors.red("property 'resources." + typeName + "[" + bundleIndex + "].name' is not a string"));
            } else if (bundle.name.length === 0) {
                throw new Error(ansiColors.blue("gulp/config/resources/" + categoryName + ".js") + " - " + ansiColors.red("property 'resources." + typeName + "[" + bundleIndex + "].name' is empty"));
            }

            // on vérifie que le bundle a bien une propriété 'paths', que c'est un object et qu'elle n'est pas vide
            if (!bundle.hasOwnProperty('paths')) {
                throw new Error(ansiColors.blue("gulp/config/resources/" + categoryName + ".js") + " - " + ansiColors.red("property 'paths' of bundle '" + bundle.name + "' into 'resources." + typeName + "' is not defined"));
            } else if (bundle.paths.constructor !== Object) {
                throw new Error(ansiColors.blue("gulp/config/resources/" + categoryName + ".js") + " - " + ansiColors.red("property 'paths' of bundle '" + bundle.name + "' into 'resources." + typeName + "' is not an object"));
            } else if (Object.keys(bundle.paths).length === 0) {
                throw new Error(ansiColors.blue("gulp/config/resources/" + categoryName + ".js") + " - " + ansiColors.red("property 'paths' of bundle '" + bundle.name + "' into 'resources." + typeName + "' is empty"));
            } else {
                // on vérifie que le bundle a bien une propriété 'paths.src', que c'est un string et qu'elle n'est pas vide
                if (!bundle.paths.hasOwnProperty('src')) {
                    throw new Error(ansiColors.blue("gulp/config/resources/" + categoryName + ".js") + " - " + ansiColors.red("property 'paths.src' of bundle '" + bundle.name + "' into 'resources." + typeName + "' is not defined"));
                } else if (bundle.paths.src.constructor !== String) {
                    throw new Error(ansiColors.blue("gulp/config/resources/" + categoryName + ".js") + " - " + ansiColors.red("property 'paths.src' of bundle '" + bundle.name + "' into 'resources." + typeName + "' is not a string"));
                } else if (bundle.paths.src.length === 0) {
                    throw new Error(ansiColors.blue("gulp/config/resources/" + categoryName + ".js") + " - " + ansiColors.red("property 'paths.src' of bundle '" + bundle.name + "' into 'resources." + typeName + "' is empty"));
                }

                // on vérifie que le bundle a bien une propriété 'paths.dist', que c'est un string et qu'elle n'est pas vide
                if (!bundle.paths.hasOwnProperty('dist')) {
                    throw new Error(ansiColors.blue("gulp/config/resources/" + categoryName + ".js") + " - " + ansiColors.red("property 'paths.dist' of bundle '" + bundle.name + "' into 'resources." + typeName + "' is not defined"));
                } else if (bundle.paths.dist.constructor !== String) {
                    throw new Error(ansiColors.blue("gulp/config/resources/" + categoryName + ".js") + " - " + ansiColors.red("property 'paths.dist' of bundle '" + bundle.name + "' into 'resources." + typeName + "' is not a string"));
                } else if (bundle.paths.dist.length === 0) {
                    throw new Error(ansiColors.blue("gulp/config/resources/" + categoryName + ".js") + " - " + ansiColors.red("property 'paths.dist' of bundle '" + bundle.name + "' into 'resources." + typeName + "' is empty"));
                }
            }

            // on vérifie que le bundle a bien une propriété 'stream', que c'est un array et qu'elle n'est pas vide
            if (!bundle.hasOwnProperty('stream')) {
                throw new Error(ansiColors.blue("gulp/config/resources/" + categoryName + ".js") + " - " + ansiColors.red("property 'stream' of bundle '" + bundle.name + "' into 'resources." + typeName + "' is not defined"));
            } else if (bundle.stream.constructor !== Array) {
                throw new Error(ansiColors.blue("gulp/config/resources/" + categoryName + ".js") + " - " + ansiColors.red("property 'stream' of bundle '" + bundle.name + "' into 'resources." + typeName + "' is not an array"));
            } else if (bundle.stream.length === 0) {
                throw new Error(ansiColors.blue("gulp/config/resources/" + categoryName + ".js") + " - " + ansiColors.red("property 'stream' of bundle '" + bundle.name + "' into 'resources." + typeName + "' is empty"));
            }

            // si le bundle a une propriété 'babelIgnore', on vérifie que c'est un array
            if (bundle.hasOwnProperty('babelIgnore')) {
                if (bundle.babelIgnore.constructor !== Array) {
                    throw new Error(ansiColors.blue("gulp/config/resources/" + categoryName + ".js") + " - " + ansiColors.red("property 'babelIgnore' of bundle '" + bundle.name + "' into 'resources." + typeName + "' is not an array"));
                }
            }

            // si le bundle a une propriété 'watch', on vérifie que c'est un array et qu'elle n'est pas vide
            if (bundle.hasOwnProperty('watch')) {
                if (bundle.watch.constructor !== Array) {
                    throw new Error(ansiColors.blue("gulp/config/resources/" + categoryName + ".js") + " - " + ansiColors.red("property 'watch' of bundle '" + bundle.name + "' into 'resources." + typeName + "' is not an array"));
                } else if (bundle.watch.length === 0) {
                    throw new Error(ansiColors.blue("gulp/config/resources/" + categoryName + ".js") + " - " + ansiColors.red("property 'watch' of bundle '" + bundle.name + "' into 'resources." + typeName + "' is empty"));
                }
            }

            // When we find the first valid bundle of a resource category, we store the category into the valid resources
            if (!resources.hasOwnProperty(categoryName)) {
                resources[categoryName] = {};
            }

            // When we find the first valid bundle of a resource type, we store the type into the valid resources
            if (!resources[categoryName].hasOwnProperty(typeName)) {
                resources[categoryName][typeName] = {};
            }

            // We store the bundle into the valid resources
            resources[categoryName][typeName][bundleIndex] = bundle;
        }
    }
}

export default resources;
