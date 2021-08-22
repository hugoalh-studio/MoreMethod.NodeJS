import * as advancedDetermine from "@hugoalh/advanced-determine";
/**
 * @private
 * @function checkJSONXChainElement
 * @param {any} item
 * @returns {boolean}
 */
function checkJSONXChainElement(item) {
	if (
		typeof item === "boolean" ||
		isJSONXChainInternal(item) !== false ||
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
 * @function isJSONXChainInternal
 * @param {any} item
 * @returns {(boolean|null)}
 */
function isJSONXChainInternal(item) {
	if (Array.isArray(item) === true) {
		if (item.length === 0) {
			return null;
		};
		for (let index = 0; index < item.length; index++) {
			if (checkJSONXChainElement(item[index]) === false) {
				return false;
			};
		};
		return true;
	};
	if (advancedDetermine.isObjectPair(item) !== false) {
		let itemKeys = Object.keys(item);
		let itemStringify;
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
			if (checkJSONXChainElement(item[key]) === false) {
				return false;
			};
		};
		return true;
	};
	return false;
};
/**
 * @private
 * @function isJSONXChain
 * @param {any} item
 * @returns {(boolean|null)}
 */
function isJSONXChain(item) {
	return isJSONXChainInternal(item);
};
export default isJSONXChain;
