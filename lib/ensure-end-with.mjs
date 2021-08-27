import * as advancedDetermine from "@hugoalh/advanced-determine";
/**
 * @function ensureEndWith
 * @alias ensureSuffix
 * @description Ensure a string ends with the specified character(s).
 * @param {string} item String that need to ensure ends with the specified character(s).
 * @param {string} endWith Character(s) that need to be at the end of the string.
 * @returns {string} A suffixed string.
 */
function ensureEndWith(item, endWith) {
	if (advancedDetermine.isString(item) !== true) {
		throw new TypeError(`Argument \`item\` must be type of string (non-nullable)!`);
	};
	if (advancedDetermine.isString(endWith) !== true) {
		throw new TypeError(`Argument \`endWith\` must be type of string (non-nullable)!`);
	};
	return ((item.endsWith(endWith) === true) ? item : `${item}${endWith}`);
};
export default ensureEndWith;
