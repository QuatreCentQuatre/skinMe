/*
 * Import node dependencies
 */
import path from "path";

/*
 * Import core dependencies
 */
import paths from "../../core/paths";

/*
 * Define assets resources constant with:
 * - js resources
 * - scss resources
 * - fonts resources
 * - images resources
 */
const resources = {};

// Define JS assets resources
resources.js = [
    {
        name: 'footerlinks',
        paths: {
            src: path.join(paths.resources.src, ''),
            dist: path.join(paths.resources.dist, '')
        },
        stream: [
            '*.js',
        ],
        babelIgnore: [
            ''
        ]
    }
];

// Define SCSS assets resources
resources.scss = [
    // {
    //     name: 'headlinks',
    //     paths: {
    //         src: path.join(paths.resources.assets.src, 'scss/'),
    //         dist: path.join(paths.resources.assets.dist, 'css/')
    //     },
    //     stream: [
    //         'app.reset.scss',
    //         'app.helpers.scss',
    //         'app.base.scss',
    //         'app.ui.scss',
    //         'partials/svg/**/*.scss',
    //         'partials/modules/**/*.scss',
    //         'partials/sections/**/*.scss',
    //         'layouts/**/*.scss',
    //         'templates/**/*.scss',
    //         'pages/**/*.scss',
    //         'app.print.scss'
    //     ],
    //     watch: ['**/*.scss']
    // }
];

// Define FONTS assets resources
resources.fonts = [
    // {
    //     name: 'app',
    //     paths: {
    //         src: path.join(paths.resources.assets.src, 'fonts/'),
    //         dist: path.join(paths.resources.assets.dist, 'fonts/')
    //     },
    //     stream: ['**/*.+(eot|woff2|woff|ttf|otf|svg|css)']
    // }
];

// Define IMAGES assets resources
resources.images = [
    // {
    //     name: 'app',
    //     paths: {
    //         src: path.join(paths.resources.assets.src, 'images/'),
    //         dist: path.join(paths.resources.assets.dist, 'images/')
    //     },
    //     stream: ['**/*.+(png|jpg|jpeg|gif|svg|ico|cur)']
    // }
];

export default resources;
