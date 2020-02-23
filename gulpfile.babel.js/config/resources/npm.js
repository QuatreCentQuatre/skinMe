/*
 * Import core dependencies
 */
import paths from "../../core/paths";

/*
 * Define NPM resources constant with:
 * - css resources
 * - js resources
 * - scss resources
 * - fonts resources
 * - images resources
 */
const resources = {};

// Define CSS NPM resources
resources.css = [
    // {
    //     name: 'headlinks',
    //     paths: {
    //         src: paths.resources.npm.src,
    //         dist: paths.resources.npm.dist
    //     },
    //     stream: [
    //         'normalize.css/normalize.css'
    //     ]
    // }
];

// Define JS NPM resources
resources.js = [
    // {
    //     name: 'footerlinks',
    //     paths: {
    //         src: paths.resources.npm.src,
    //         dist: paths.resources.npm.dist
    //     },
    //     stream: [
    //         'babel-polyfill/dist/polyfill.js',
    //         'jquery/dist/jquery.js',
    //         'underscore/underscore.js',
    //         'help-me/src/me.help.js',
    //         'help-me/src/me.help.*.js',
    //         'dispatch-me/src/me.dispatch.js',
    //         'detect-me/src/me.detect.js',
    //         'manage-me/src/me.manage.js',
    //         'manage-me/src/me.manage.view.js'
    //     ],
    //     babelIgnore: [
    //         ''
    //     ]
    // }
];

// Define SCSS NPM resources
resources.scss = [
    // {
    //     name: 'headlinks',
    //     paths: {
    //         src: paths.resources.npm.src,
    //         dist: paths.resources.npm.dist
    //     },
    //     stream: [
    //         ''
    //     ],
    //     watch: ['**/*.scss']
    // }
];

// Define FONTS NPM resources
resources.fonts = [
    // {
    //     name: 'app',
    //     paths: {
    //         src: paths.resources.npm.src,
    //         dist: paths.resources.npm.dist
    //     },
    //     stream: [
    //         '**/*.+(eot|woff2|woff|ttf|otf|svg|css)'
    //     ]
    // }
];

// Define IMAGES NPM resources
resources.images = [
    // {
    //     name: 'app',
    //     paths: {
    //         src: paths.resources.npm.src,
    //         dist: paths.resources.npm.dist
    //     },
    //     stream: [
    //         '**/*.+(png|jpg|jpeg|gif|svg|ico|cur)'
    //     ]
    // }
];

export default resources;
