/*
 * Import core dependencies
 */
import config from "./config";

/*
 * Define templateEngine
 */
const templateEngine = require('./config/template-engines/' + config.options.templateEngine + '.js').default;

export default templateEngine;
