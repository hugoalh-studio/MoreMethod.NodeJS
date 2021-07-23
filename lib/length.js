// $<Note>$ This is a draft!
const advancedDetermine = require("@hugoalh/advanced-determine"),
	checkOption = require("./internal/check-option.js"),
	isFullWidthCodePoint = require("./third-party/is-full-width-code-point.js"),
	regularExpressionActualCharacter = require("./third-party/regular-expression-actual-character.js"),
	regularExpressionEmoji = require("./internal/regular-expression-emoji.js"),
	removeANSIEscapeCode = require("./remove-ansi-escape-code.js");
/**
 * @function length
 * @param {string} item
 * @param {object} [option={}]
 * @returns {number}
 */
function length(item, option = {}) {
	checkOption(option);
	let runtime = {
		allowANSIEscapeCode: false,
		method: "visual"
	};
	if (advancedDetermine.isString(item) === false) {
		throw new TypeError(`Argument \`item\` must be type of string!`);
	};
	if (advancedDetermine.isStringSingleLine(item) !== true) {
		console.warn(`Function \`length\` is not fully supported multiple line of string!`);
	};
	if (typeof option.allowANSIEscapeCode !== "undefined") {
		if (advancedDetermine.isBoolean(option.allowANSIEscapeCode) !== true) {
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
		console.warn(`Function \`length\` is not fully supported ANSI escape code!`);
	};
	if (runtime.method.search(/^(?:(?:console)|(?:width))$/giu) === 0) {
		let result = item.replace(regularExpressionEmoji, "  "),
			width = 0;
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
	throw new SyntaxError(`Argument \`option.method\`'s value does not match any pattern!`);
};
module.exports = length;
