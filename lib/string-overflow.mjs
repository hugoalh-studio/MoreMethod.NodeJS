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
 * @param {string} [option.position="end"] Ellipsis position.
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
	option.position = ((typeof option.position === "undefined") ? "end" : option.position);
	if (typeof option.position !== "string") {
		throw new TypeError(`Argument \`option.position\` must be type of string!`);
	};
	if (item.length <= maximumLength) {
		return item;
	};
	let resultItemLengthMaximum = maximumLength - option.ellipsis.length;
	let resultItemLengthLeft;
	let resultItemLengthRight;
	if (option.position.search(/^(?:e(?:nd)?|r(?:ight)?)$/giu) === 0) {
		resultItemLengthLeft = resultItemLengthMaximum;
		resultItemLengthRight = 0;
	} else if (option.position.search(/^(?:c(?:enter)?|m(?:iddle)?)$/giu) === 0) {
		let targetLengthHalf = Math.floor(resultItemLengthMaximum / 2);
		resultItemLengthLeft = targetLengthHalf;
		resultItemLengthRight = targetLengthHalf;
	} else if (option.position.search(/^(?:l(?:eft)?|s(?:tart)?)$/giu) === 0) {
		resultItemLengthLeft = 0;
		resultItemLengthRight = resultItemLengthMaximum;
	} else {
		throw new SyntaxError(`Argument \`option.position\`'s value is not in the list!`);
	};
	let itemVisual = item.match(regularExpressionActualCharacter) || [];
	let resultItemLeft = "";
	for (let index = 0; index < itemVisual.length; index++) {
		let key = itemVisual[index];
		if ((resultItemLeft.length + key.length) > resultItemLengthLeft) {
			break;
		};
		resultItemLeft = `${resultItemLeft}${key}`;
	};
	let resultItemRight = "";
	for (let index = itemVisual.length - 1; index >= 0; index--) {
		let key = itemVisual[index];
		if ((resultItemRight.length + key.length) > resultItemLengthRight) {
			break;
		};
		resultItemRight = `${key}${resultItemRight}`;
	};
	return `${resultItemLeft}${option.ellipsis}${resultItemRight}`;
};
export default stringOverflow;
