import * as advancedDetermine from "@hugoalh/advanced-determine";
import checkOption from "./internal/check-option.mjs";
// Use Native Service
import charRegex from "char-regex";
const regularExpressionActualCharacter = charRegex();
/**
 * @function stringOverflow
 * @description Clip the string when longer than maximum length with ellipsis.
 * @param {string} item String that need to clip.
 * @param {number} maximumLength Maximum length of the target string.
 * @param {object} [option={}] Option.
 * @param {string} [option.ellipsis="..."] Ellipsis.
 * @returns {string} A clipped string.
 */
function stringOverflow(item, maximumLength, option = {}) {
	checkOption(option);
	let runtime = {
		ellipsis: "..."
	};
	if (typeof item !== "string") {
		throw new TypeError(`Argument \`item\` must be type of string!`);
	};
	if (advancedDetermine.isNumberPositiveSafeInteger(maximumLength) !== true) {
		throw new TypeError(`Argument \`maximumLength\` must be type of positive safe integer number!`);
	};
	if (typeof option.ellipsis !== "undefined") {
		if (typeof option.ellipsis !== "string") {
			throw new TypeError(`Argument \`option.ellipsis\` must be type of string!`);
		};
		runtime.ellipsis = option.ellipsis;
	};
	if (runtime.ellipsis.length >= maximumLength) {
		throw new ReferenceError(`Ellipsis also overflow!`);
	};
	if (item.length <= maximumLength) {
		return item;
	};
	let itemVisual = item.match(regularExpressionActualCharacter) || [];
	let maximumItemLength = maximumLength - runtime.ellipsis.length;
	let result = "";
	for (let index = 0; index < itemVisual.length; index++) {
		let key = itemVisual[index];
		if ((result.length + key.length) <= maximumItemLength) {
			result += key;
		} else {
			break;
		};
	};
	result += runtime.ellipsis;
	return result;
};
export default stringOverflow;
