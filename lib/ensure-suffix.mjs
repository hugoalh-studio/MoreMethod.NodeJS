import * as advancedDetermine from "@hugoalh/advanced-determine";
/**
 * @function ensureSuffix
 * @description Ensure a string ends with suffix.
 * @param {string} item String that need to check.
 * @param {string} suffix Suffix.
 * @returns {string} A suffixed string.
 */
function ensureSuffix(item, suffix) {
	if (advancedDetermine.isString(item) !== true) {
		throw new TypeError(`Argument \`item\` must be type of string (non-nullable)!`);
	};
	if (advancedDetermine.isString(suffix) !== true) {
		throw new TypeError(`Argument \`suffix\` must be type of string (non-nullable)!`);
	};
	let phantomPosition = item.length - suffix.length;
	return ((item.indexOf(suffix, phantomPosition) === phantomPosition) ? item : `${item}${suffix}`);
};
export default ensureSuffix;
