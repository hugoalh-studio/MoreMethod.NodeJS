import * as advancedDetermine from "@hugoalh/advanced-determine";
/**
 * @private
 * @function flattenArrayInternal
 * @param {any[]} item
 * @param {object} option
 * @param {number} [currentDepth=0]
 * @returns {any[]}
 */
function flattenArrayInternal(item, option, currentDepth = 0) {
	let result = [];
	item.forEach((element) => {
		if (advancedDetermine.isArray(element) === true && currentDepth < option.maximumDepth) {
			result.push(...flattenArrayInternal(element, option, currentDepth + 1));
		} else {
			result.push(element);
		};
	});
	return result;
};
/**
 * @function flattenArray
 * @alias flatArr
 * @alias flatArray
 * @alias flattenArr
 * @description Cause all sub-array elements concatenated into it recursively up to the specified depth.
 * @param {any[]} item Array that need to flatten.
 * @param {object} [option={}] Option.
 * @param {number} [option.maximumDepth=Infinity] The maximum depth level specifying how deep a nested array structure should be flatten.
 * @returns {any[]} A flattened array.
 */
function flattenArray(item, option = {}) {
	if (advancedDetermine.isObjectPair(option) === false) {
		throw new TypeError(`Argument \`option\` must be type of object pair!`);
	};
	if (Array.isArray(item) === false) {
		throw new TypeError(`Argument \`item\` must be type of array!`);
	};
	option.maximumDepth = ((typeof option.maximumDepth === "undefined") ? Infinity : option.maximumDepth);
	if (option.maximumDepth !== Infinity && advancedDetermine.isNumber(option.maximumDepth, { finite: true, integer: true, positive: true, safe: true }) !== true) {
		throw new TypeError(`Argument \`option.maximumDepth\` must be type of number (finite, integer, positive, and safe)!`);
	};
	return flattenArrayInternal(item, option);
};
export default flattenArray;
