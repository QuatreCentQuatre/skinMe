/*
 * Import core dependencies
 */
import paths from "../../core/paths";

/*
 * Define vendors resources constant with:
 * - css resources
 * - js resources
 * - scss resources
 * - fonts resources
 * - images resources
 */
const resources = {};

// Define CSS vendors resources
resources.css = [
    // {
    //     name: 'headlinks',
    //     paths: {
    //         src: paths.resources.vendors.src,
    //         dist: paths.resources.vendors.dist
    //     },
    //     stream: [
    //         ''
    //     ]
    // }
];

// Define JS vendors resources
resources.js = [
    // {
    //     name: 'footerlinks',
    //     paths: {
    //         src: paths.resources.vendors.src,
    //         dist: paths.resources.vendors.dist
    //     },
    //     stream: [
    //         ''
    //     ],
    //     babelIgnore: [
    //         ''
    //     ]
    // }
];

// Define SCSS vendors resources
resources.scss = [
    // {
    //     name: 'headlinks',
    //     paths: {
    //         src: paths.resources.vendors.src,
    //         dist: paths.resources.vendors.dist
    //     },
    //     stream: [
    //         ''
    //     ],
    //     watch: ['**/*.scss']
    // }
];

// Define FONTS vendors resources
resources.fonts = [
    // {
    //     name: 'app',
    //     paths: {
    //         src: paths.resources.vendors.src,
    //         dist: paths.resources.vendors.dist
    //     },
    //     stream: [
    //         '**/*.+(eot|woff2|woff|ttf|otf|svg|css)'
    //     ]
    // }
];

// Define IMAGES vendors resources
resources.images = [
    // {
    //     name: 'app',
    //     paths: {
    //         src: paths.resources.vendors.src,
    //         dist: paths.resources.vendors.dist
    //     },
    //     stream: [
    //         '**/*.+(png|jpg|jpeg|gif|svg|ico|cur)'
    //     ]
    // }
];

export default resources;
