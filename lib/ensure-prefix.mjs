import * as advancedDetermine from "@hugoalh/advanced-determine";
/**
 * @function ensurePrefix
 * @description Ensure a string starts with prefix.
 * @param {string} item String that need to check.
 * @param {string} prefix Prefix.
 * @returns {string} A prefixed string.
 */
function ensurePrefix(item, prefix) {
	if (advancedDetermine.isString(item) !== true) {
		throw new TypeError(`Argument \`item\` must be type of string (non-nullable)!`);
	};
	if (advancedDetermine.isString(prefix) !== true) {
		throw new TypeError(`Argument \`prefix\` must be type of string (non-nullable)!`);
	};
	return ((item.indexOf(prefix) === 0) ? item : `${prefix}${item}`);
};
export default ensurePrefix;
