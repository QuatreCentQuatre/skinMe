/*
 * Import node dependencies
 */
import requireDir from "require-dir";

/*
 * Require tasks defined into ./core/tasks/
 */
requireDir('./core/tasks', { recurse: true });
