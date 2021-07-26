const advancedDetermine = require("@hugoalh/advanced-determine"),
	checkOption = require("./internal/check-option.js");
/**
 * @function escapeRegularExpressionSpecialCharacter
 * @description Escape regular expression special character from a string.
 * @param {string} item String that need to escape regular expression special character.
 * @param {object} [option={}] Option.
 * @param {boolean} [option.forwardSlash=false] Also escape forward slash (`/`).
 * @param {boolean} [option.hyphen=false] Also escape hyphen (`-`).
 * @returns {string} A string that escaped regular expression special character.
 */
function escapeRegularExpressionSpecialCharacter(item, option = {}) {
	checkOption(option);
	let runtime = {
		forwardSlash: false,
		hyphen: false
	};
	if (advancedDetermine.isString(item) === false) {
		throw new TypeError(`Argument \`item\` must be type of string!`);
	};
	if (typeof option.forwardSlash !== "undefined") {
		if (advancedDetermine.isBoolean(option.forwardSlash) !== true) {
			throw new TypeError(`Argument \`option.forwardSlash\` must be type of boolean!`);
		};
		runtime.forwardSlash = option.forwardSlash;
	};
	if (typeof option.hyphen !== "undefined") {
		if (advancedDetermine.isBoolean(option.hyphen) !== true) {
			throw new TypeError(`Argument \`option.hyphen\` must be type of boolean!`);
		};
		runtime.hyphen = option.hyphen;
	};
	let result = item.replace(/([.^$()[\]{}*+?|\\])/gu, "\\$1");
	if (runtime.forwardSlash === true) {
		result = result.replace(/([/])/gu, "\\$1");
	};
	if (runtime.hyphen === true) {
		result = result.replace(/(-)/gu, "\\$1");
	};
	return result;
};
module.exports = escapeRegularExpressionSpecialCharacter;
