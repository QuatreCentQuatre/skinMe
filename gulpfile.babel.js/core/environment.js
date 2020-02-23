/*
 * Import node dependencies
 */
import { argv } from "yargs";

/*
 * Define targeted environment to use based on --env param or task type
 */
const targetedEnv = (argv.env ? argv.env : (argv._[0] !== 'build' ? 'local' : 'production'));

/*
 * Define environment
 */
const environment = require('./config/environments/' + targetedEnv + '.js').default;

export default environment;
