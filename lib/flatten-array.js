const advancedDetermine = require("@hugoalh/advanced-determine");
const checkOption = require("./internal/check-option.js");
/**
 * @private
 * @function flattenArrayInternal
 * @param {any[]} item
 * @param {object} runtime
 * @returns {any[]}
 */
function flattenArrayInternal(item, runtime) {
	let result = [];
	item.forEach((element) => {
		if (advancedDetermine.isArray(element) === true && runtime.currentDepth < runtime.maximumDepth) {
			result.push(...flattenArrayInternal(
				element,
				{
					...runtime,
					currentDepth: runtime.currentDepth + 1
				}
			));
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
	checkOption(option);
	let runtime = {
		currentDepth: 0,
		maximumDepth: Infinity
	};
	if (Array.isArray(item) === false) {
		throw new TypeError(`Argument \`item\` must be type of array!`);
	};
	if (typeof option.maximumDepth !== "undefined") {
		if (option.maximumDepth !== Infinity && advancedDetermine.isNumberPositiveSafeInteger(option.maximumDepth) !== true) {
			throw new TypeError(`Argument \`option.maximumDepth\` must be type of positive safe integer number!`);
		};
		runtime.maximumDepth = option.maximumDepth;
	};
	return flattenArrayInternal(item, runtime);
};
module.exports = flattenArray;
