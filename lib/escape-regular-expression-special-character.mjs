import checkOption from "./internal/check-option.mjs";
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
	if (typeof item !== "string") {
		throw new TypeError(`Argument \`item\` must be type of string!`);
	};
	if (typeof option.forwardSlash !== "undefined") {
		if (typeof option.forwardSlash !== "boolean") {
			throw new TypeError(`Argument \`option.forwardSlash\` must be type of boolean!`);
		};
		runtime.forwardSlash = option.forwardSlash;
	};
	if (typeof option.hyphen !== "undefined") {
		if (typeof option.hyphen !== "boolean") {
			throw new TypeError(`Argument \`option.hyphen\` must be type of boolean!`);
		};
		runtime.hyphen = option.hyphen;
	};
	let result = item.replace(/([.^$()[\]{}*+?|\\])/giu, "\\$1");
	if (runtime.forwardSlash === true) {
		result = result.replace(/([/])/giu, "\\$1");
	};
	if (runtime.hyphen === true) {
		result = result.replace(/(-)/giu, "\\$1");
	};
	return result;
};
export default escapeRegularExpressionSpecialCharacter;
