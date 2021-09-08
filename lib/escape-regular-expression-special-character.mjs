import * as advancedDetermine from "@hugoalh/advanced-determine";
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
	if (advancedDetermine.isObjectPair(option) === false) {
		throw new TypeError(`Argument \`option\` must be type of object pair!`);
	};
	if (typeof item !== "string") {
		throw new TypeError(`Argument \`item\` must be type of string!`);
	};
	option.forwardSlash = ((typeof option.forwardSlash === "undefined") ? false : option.forwardSlash);
	if (typeof option.forwardSlash !== "boolean") {
		throw new TypeError(`Argument \`option.forwardSlash\` must be type of boolean!`);
	};
	option.hyphen = ((typeof option.hyphen === "undefined") ? false : option.hyphen);
	if (typeof option.hyphen !== "boolean") {
		throw new TypeError(`Argument \`option.hyphen\` must be type of boolean!`);
	};
	let result = item.replace(/(?<symbol>[.^$()[\]{}*+?|\\])/giu, "\\$<symbol>");
	if (option.forwardSlash === true) {
		result = result.replace(/(?<forwardSlash>[/])/giu, "\\$<forwardSlash>");
	};
	if (option.hyphen === true) {
		result = result.replace(/(?<hyphen>-)/giu, "\\$<hyphen>");
	};
	return result;
};
export default escapeRegularExpressionSpecialCharacter;
