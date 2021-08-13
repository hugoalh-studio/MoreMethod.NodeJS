// $<Vendor>$ @hugoalh/advanced-determine (GitHub: https://github.com/hugoalh-studio/advanced-determine-nodejs)(NPM: https://npmjs.com/package/@hugoalh/advanced-determine)
// $<Note>$ A special edition for function `nestify`.
import * as advancedDetermine from "@hugoalh/advanced-determine";
/**
 * @private
 * @function checkJSONElement
 * @param {any} item
 * @returns {boolean}
 */
function checkJSONElement(item) {
	if (
		typeof item === "boolean" ||
		isJSONSpecialInternal(item) !== false ||
		item === null ||
		advancedDetermine.isNumber(item) !== false ||
		typeof item === "string"
	) {
		return true;
	};
	return false;
};
/**
 * @private
 * @function isJSONSpecialInternal
 * @param {any} item
 * @returns {(boolean|null)}
 */
function isJSONSpecialInternal(item) {
	if (Array.isArray(item) === true) {
		if (item.length === 0) {
			return null;
		};
		for (let index = 0; index < item.length; index++) {
			if (checkJSONElement(item[index]) === false) {
				return false;
			};
		};
		return true;
	};
	if (advancedDetermine.isObjectPair(item) !== false) {
		let itemKeys = Object.keys(item),
			itemStringify;
		try {
			itemStringify = JSON.stringify(item);
		} catch (error) {
			return false;
		};
		if (
			itemKeys.length === 0 ||
			itemStringify === "{}"
		) {
			return null;
		};
		for (let index = 0; index < itemKeys.length; index++) {
			let key = itemKeys[index];
			if (key.search(/^(?:[$_a-z][$0-9_a-z]*?|\[[0-9]\]|\[[1-9][0-9]+?\])(?:\.[$_a-z][$0-9_a-z]*?|\[[0-9]\]|\[[1-9][0-9]+?\])*?$/giu) !== 0) {
				return false;
			};
			if (checkJSONElement(item[key]) === false) {
				return false;
			};
		};
		return true;
	};
	return false;
};
/**
 * @function isJSONSpecial
 * @param {any} item
 * @returns {(boolean|null)}
 */
function isJSONSpecial(item) {
	if (Array.isArray(item) === true) {
		return false;
	};
	return isJSONSpecialInternal(item);
};
export default isJSONSpecial;
