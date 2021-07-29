import * as advancedDetermine from "@hugoalh/advanced-determine";
import splitString from "split-string";
/**
 * @function split
 * @description Split a string with command line style.
 * @param {string} item String that need to split.
 * @returns {string[]} A splitted string.
 */
function split(item) {
	if (advancedDetermine.isString(item) !== true) {
		throw new TypeError(`Argument \`item\` must be type of string (non-nullable)!`);
	};
	item = item.replace(/\r?\n/giu, " ").replace(/\s+/giu, " ").trim();
	if (advancedDetermine.isString(item) !== true) {
		throw new TypeError(`Argument \`item\` must be type of string (non-nullable)!`);
	};
	return splitString(item, {
		brackets: true,
		quotes: [
			"\"",
			"'",
			"`"
		],
		separator: " "
	});
};
export default split;
