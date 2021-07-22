const advancedDetermine = require("@hugoalh/advanced-determine"),
	regularExpressionANSIEscapeCode = require("./third-party/regular-expression-ansi-escape-code.js");
/**
 * @function removeANSIEscapeCode
 * @description
 * @param {string} item
 * @returns {string}
 */
function removeANSIEscapeCode(item) {
	if (advancedDetermine.isString(item) === false) {
		throw new TypeError(`Argument \`item\` must be type of string!`);
	};
	return item.replace(regularExpressionANSIEscapeCode, "");
};
module.exports = removeANSIEscapeCode;
