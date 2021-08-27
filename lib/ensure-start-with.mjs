import * as advancedDetermine from "@hugoalh/advanced-determine";
/**
 * @function ensureStartWith
 * @alias ensureBeginWith
 * @alias ensurePrefix
 * @description Ensure a string starts with the specified character(s).
 * @param {string} item String that need to ensure starts with the specified character(s).
 * @param {string} startWith Character(s) that need to be at the start of the string.
 * @returns {string} A prefixed string.
 */
function ensureStartWith(item, startWith) {
	if (advancedDetermine.isString(item) !== true) {
		throw new TypeError(`Argument \`item\` must be type of string (non-nullable)!`);
	};
	if (advancedDetermine.isString(startWith) !== true) {
		throw new TypeError(`Argument \`startWith\` must be type of string (non-nullable)!`);
	};
	return ((item.startsWith(startWith) === true) ? item : `${startWith}${item}`);
};
export default ensureStartWith;
