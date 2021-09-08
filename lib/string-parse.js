const advancedDetermine = require("@hugoalh/advanced-determine");
/**
 * @function stringParse
 * @description Parse a string to a possible type.
 * @param {string} item String that need to parse.
 * @param {object} [option={}] Option.
 * @param {boolean} [option.booleanExtend=false] Allow to extend determine type of boolean.
 * @param {boolean} [option.nullExtend=false] Allow to extend determine type of null.
 * @returns {any} Parse result.
 */
function stringParse(item, option = {}) {
	if (advancedDetermine.isObjectPair(option) === false) {
		throw new TypeError(`Argument \`option\` must be type of object pair!`);
	};
	if (typeof item !== "string") {
		throw new TypeError(`Argument \`item\` must be type of string!`);
	};
	option.booleanExtend = ((typeof option.booleanExtend === "undefined") ? false : option.booleanExtend);
	if (typeof option.booleanExtend !== "boolean") {
		throw new TypeError(`Argument \`option.booleanExtend\` must be type of boolean!`);
	};
	option.nullExtend = ((typeof option.nullExtend === "undefined") ? false : option.nullExtend);
	if (typeof option.nullExtend !== "boolean") {
		throw new TypeError(`Argument \`option.nullExtend\` must be type of boolean!`);
	};
	if (item.search(/^-?(?:[0-9]|[1-9][0-9]+?)n$/gu) === 0) {
		return BigInt(item.replace(/n$/gu, ""));
	};
	if (
		item.search(/^false$/gu) === 0 ||
		(option.booleanExtend === true && item.search(/^false$/giu) === 0)
	) {
		return false;
	};
	if (
		item.search(/^true$/gu) === 0 ||
		(option.booleanExtend === true && item.search(/^true$/giu) === 0)
	) {
		return true;
	};
	if (item.search(/^NaN$/gu) === 0) {
		return NaN;
	};
	if (
		item.search(/^null$/gu) === 0 ||
		(option.nullExtend === true && item.search(/^n(?:i|ul?)l$/giu) === 0)
	) {
		return null;
	};
	if (item.search(/^-?(?:[0-9]|[1-9][0-9]+?)(?:\.[0-9]+?)?$/gu) === 0) {
		return Number(item);
	};
	if (item.search(/^\/.+\/[dgimsuy]*$/gu) === 0) {
		let source = item.replace(/^\/(?<source>.+)\/[dgimsuy]*$/gu, "$<source>");
		let flag = item.replace(/^\/.+\/(?<flag>[dgimsuy]*)$/gu, "$<flag>");
		try {
			return new RegExp(source, flag);
		} catch { };
	};
	if (item.search(/^undefined$/gu) === 0) {
		return undefined;
	};
	if (advancedDetermine.isStringifyJSON(item) !== false) {
		return JSON.parse(item);
	};
	return item;
};
module.exports = stringParse;
