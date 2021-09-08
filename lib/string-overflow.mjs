import * as advancedDetermine from "@hugoalh/advanced-determine";
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
	if (advancedDetermine.isObjectPair(option) === false) {
		throw new TypeError(`Argument \`option\` must be type of object pair!`);
	};
	if (typeof item !== "string") {
		throw new TypeError(`Argument \`item\` must be type of string!`);
	};
	if (advancedDetermine.isNumber(maximumLength, { finite: true, integer: true, positive: true, safe: true }) !== true) {
		throw new TypeError(`Argument \`maximumLength\` must be type of number (finite, integer, positive, and safe)!`);
	};
	option.ellipsis = ((typeof option.ellipsis === "undefined") ? "..." : option.ellipsis);
	if (typeof option.ellipsis !== "string") {
		throw new TypeError(`Argument \`option.ellipsis\` must be type of string!`);
	};
	if (option.ellipsis.length >= maximumLength) {
		throw new ReferenceError(`Ellipsis also overflow!`);
	};
	if (item.length <= maximumLength) {
		return item;
	};
	let itemVisual = item.match(regularExpressionActualCharacter) || [];
	let maximumItemLength = maximumLength - option.ellipsis.length;
	let result = "";
	for (let index = 0; index < itemVisual.length; index++) {
		let key = itemVisual[index];
		if ((result.length + key.length) > maximumItemLength) {
			break;
		};
		result += key;
	};
	result += option.ellipsis;
	return result;
};
export default stringOverflow;
