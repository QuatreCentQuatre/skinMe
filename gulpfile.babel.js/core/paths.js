/*
 * Import node dependencies
 */
import path from "path";

/*
 * Import core dependencies
 */
import config from "./config";

/*
 * Define paths constant with:
 * - base path
 * - server's root
 * - resources paths:
 * - - npm paths
 * - - vendors paths
 * - - assets paths
 * - views path
 */
const paths = {};

// Define base path
paths.base = path.normalize(path.resolve(__filename, path.dirname(path.relative(__filename, 'gulpfile.babel.json'))));

// Define server's root
paths.serverRoot = path.join(paths.base, config.folders.serverRoot);

// Define resources paths
paths.resources = {};
paths.resources.src = path.join(paths.base, config.folders.resources.src);
paths.resources.dist = path.join(paths.base, config.folders.resources.dist);

// Define npm resources paths
paths.resources.npm = {};
paths.resources.npm.src = path.join(paths.base, 'node_modules/');
paths.resources.npm.dist = path.join(paths.resources.dist, 'npm/');

// Define vendors resources paths
paths.resources.vendors = {};
paths.resources.vendors.src = path.join(paths.resources.src, 'vendors/');
paths.resources.vendors.dist = path.join(paths.resources.dist, 'vendors/');

// Define assets resources paths
paths.resources.assets = {};
paths.resources.assets.src = path.join(paths.resources.src, 'assets/');
paths.resources.assets.dist = path.join(paths.resources.dist, 'assets/');

// Define views path
paths.views = path.join(paths.base, config.folders.views);

export default paths;
