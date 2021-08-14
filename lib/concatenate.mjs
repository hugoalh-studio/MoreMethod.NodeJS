import * as advancedDetermine from "@hugoalh/advanced-determine";
import removeDuplicate from "./remove-duplicate.mjs";
/**
 * @private
 * @function concatenateObjectPair
 * @param {object} result
 * @param {object} items
 * @returns {object}
 */
function concatenateObjectPair(result, ...items) {
	items.forEach((item) => {
		Object.keys(item).forEach((element) => {
			if (advancedDetermine.isArray(item[element]) !== false) {
				result[element] = ((advancedDetermine.isArray(result[element]) === false) ? item[element] : removeDuplicate([].concat(result[element], item[element])));
			} else if (advancedDetermine.isObjectPair(item[element]) !== false) {
				result[element] = ((advancedDetermine.isObjectPair(result[element]) === false) ? item[element] : concatenateObjectPair(result[element], item[element]));
			} else {
				result[element] = item[element];
			};
		});
	});
	return result;
};
/**
 * @function concatenate
 * @alias concat
 * @alias merge
 * @description Concatenate arrays or object pairs into one.
 * @param {(*[]|object)} items Arrays or object pairs that need to concatenate into one.
 * @returns {(*[]|object)} A concatenated array or object pair.
 */
function concatenate(...items) {
	if (items.length === 0) {
		throw new Error(`Argument \`items\` is not defined!`);
	};
	if (items.every((element) => {
		return Array.isArray(element) === true;
	}) === true) {
		return [].concat(...items);
	};
	if (items.every((element) => {
		return advancedDetermine.isObjectPair(element) !== false;
	}) === true) {
		return concatenateObjectPair({}, ...items);
	};
	throw new TypeError(`Argument \`items\` must be type of arrays or object pairs!`);
};
export default concatenate;
