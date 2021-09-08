const advancedDetermine = require("@hugoalh/advanced-determine");
const removeANSIEscapeCode = require("./remove-ansi-escape-code.js");
// Use Native Service
const emojiRegex = require("emoji-regex");
const regularExpressionEmoji = emojiRegex();
// Use Rework Service
const isFullWidthCodePoint = require("./third-party/is-fullwidth-code-point.js");
const regularExpressionActualCharacter = require("./third-party/char-regex.js");
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
	if (advancedDetermine.isObjectPair(option) === false) {
		throw new TypeError(`Argument \`option\` must be type of object pair!`);
	};
	if (typeof item !== "string") {
		throw new TypeError(`Argument \`item\` must be type of string!`);
	};
	if (advancedDetermine.isString(item, { singleLine: true }) !== true) {
		console.warn(`Function \`length\` is not fully supported multiple line of string, and maybe return an unexpected result!`);
	};
	option.allowANSIEscapeCode = ((typeof option.allowANSIEscapeCode === "undefined") ? false : option.allowANSIEscapeCode);
	if (typeof option.allowANSIEscapeCode !== "boolean") {
		throw new TypeError(`Argument \`option.allowANSIEscapeCode\` must be type of boolean!`);
	};
	option.method = ((typeof option.method === "undefined") ? "visual" : option.method);
	if (advancedDetermine.isString(option.method) !== true) {
		throw new TypeError(`Argument \`option.method\` must be type of string (non-nullable)!`);
	};
	if (option.allowANSIEscapeCode === false) {
		item = removeANSIEscapeCode(item);
	} else {
		console.warn(`Function \`length\` is not fully supported ANSI escape code, and maybe return an unexpected result!`);
	};
	if (option.method.search(/^(?:console|width)$/giu) === 0) {
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
	if (option.method.search(/^visual$/giu) === 0) {
		let result = item.match(regularExpressionActualCharacter);
		return ((result === null) ? 0 : result.length);
	};
	throw new SyntaxError(`Argument \`option.method\`'s value is not in the list!`);
};
module.exports = length;
