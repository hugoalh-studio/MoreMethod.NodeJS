// $<Note>$ This is a draft!
const advancedDetermine = require("@hugoalh/advanced-determine"),
	checkOption = require("./internal/check-option.js"),
	regularExpressionActualCharacter = require("./third-party/regular-expression-actual-character.js"),
	removeANSIEscapeCode = require("./remove-ansi-escape-code.js");
function length(item, option = {}) {
	let runtime = {
		allowANSIEscapeCode: false,
		method: "visual"
	};
	checkOption(option);
	if (advancedDetermine.isString(item) === false) {
		throw new TypeError(`Argument \`item\` must be type of string!`);
	};
	if (typeof option.allowANSIEscapeCode !== "undefined") {
		if (advancedDetermine.isBoolean(option.allowANSIEscapeCode) !== true) {
			throw new TypeError(`Argument \`option.allowANSIEscapeCode\` must be type of boolean!`);
		};
		runtime.allowANSIEscapeCode = option.allowANSIEscapeCode;
	};
	if (runtime.allowANSIEscapeCode === false) {
		item = removeANSIEscapeCode(item);
	};
	let result = item.match(regularExpressionActualCharacter);
	return ((result === null) ? 0 : result.length);
};
module.exports = length;
