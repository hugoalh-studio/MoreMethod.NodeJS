import * as advancedDetermine from "@hugoalh/advanced-determine";
import checkOption from "./internal/check-option.mjs";
import removeANSIEscapeCode from "./remove-ansi-escape-code.mjs";
// Use Native Service
import charRegex from "char-regex";
const regularExpressionActualCharacter = charRegex();
import isFullWidthCodePoint from "is-fullwidth-code-point";
// Use Rework Service
import regularExpressionEmoji from "./third-party/emoji-regex.mjs";
/**
 * @function length
 * @description Count the length of a string in a better way.
 * @param {string} item String that need to count the length.
 * @param {object} [option={}] Option.
 * @param {boolean} [option.allowANSIEscapeCode=false] Allow to count ANSI escape code; WARNING: Allow this will majorly affect the result!
 * @param {string} [option.method="visual"] Method to count the length.
 * @returns {number} Length of the string.
 */
function length(item, option = {}) {
	checkOption(option);
	let runtime = {
		allowANSIEscapeCode: false,
		method: "visual"
	};
	if (typeof item !== "string") {
		throw new TypeError(`Argument \`item\` must be type of string!`);
	};
	if (advancedDetermine.isStringSingleLine(item) !== true) {
		console.warn(`Function \`length\` is not fully supported multiple line of string, and maybe return an unexpected result!`);
	};
	if (typeof option.allowANSIEscapeCode !== "undefined") {
		if (typeof option.allowANSIEscapeCode !== "boolean") {
			throw new TypeError(`Argument \`option.allowANSIEscapeCode\` must be type of boolean!`);
		};
		runtime.allowANSIEscapeCode = option.allowANSIEscapeCode;
	};
	if (typeof option.method !== "undefined") {
		if (advancedDetermine.isString(option.method) !== true) {
			throw new TypeError(`Argument \`option.method\` must be type of string (non-nullable)!`);
		};
		runtime.method = option.method;
	};
	if (runtime.allowANSIEscapeCode === false) {
		item = removeANSIEscapeCode(item);
	} else {
		console.warn(`Function \`length\` is not fully supported ANSI escape code, and maybe return an unexpected result!`);
	};
	if (runtime.method.search(/^(?:console|width)$/giu) === 0) {
		let result = item.replace(regularExpressionEmoji, "  ");
		let width = 0;
		for (let index = 0; index < result.length; index++) {
			let codePoint = result.codePointAt(index);
			if (
				codePoint <= 0x1F ||
				(codePoint >= 0x7F && codePoint <= 0x9F) ||
				(codePoint >= 0x300 && codePoint <= 0x36F)
			) {
				continue;
			};
			if (codePoint > 0xFFFF) {
				index += 1;
			};
			width += (isFullWidthCodePoint(codePoint) ? 2 : 1);
		};
		return width;
	};
	if (runtime.method.search(/^visual$/giu) === 0) {
		let result = item.match(regularExpressionActualCharacter);
		return ((result === null) ? 0 : result.length);
	};
	throw new SyntaxError(`Argument \`option.method\`'s value is not in the list!`);
};
export default length;
