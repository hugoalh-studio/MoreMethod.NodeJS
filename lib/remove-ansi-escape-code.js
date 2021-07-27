const regularExpressionANSIEscapeCode = require("./third-party/regular-expression-ansi-escape-code.js");
/**
 * @function removeANSIEscapeCode
 * @description Remove ANSI escape code from a string.
 * @param {string} item String that need to remove ANSI escape code.
 * @returns {string} A string that removed ANSI escape code.
 */
function removeANSIEscapeCode(item) {
	if (typeof item !== "string") {
		throw new TypeError(`Argument \`item\` must be type of string!`);
	};
	return item.replace(regularExpressionANSIEscapeCode, "");
};
module.exports = removeANSIEscapeCode;
