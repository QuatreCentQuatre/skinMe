/*
 * Import core dependencies
 */
import inject from "./config/inject";
import lint from "./config/lint";
import plugins from "./config/plugins";

/*
 * Import project dependencies
 */
import folders from "../config/folders";
import options from "../config/options";

export default {
    folders,
    inject,
    lint,
    options,
    plugins
}
