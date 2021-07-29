import * as advancedDetermine from "@hugoalh/advanced-determine";
/**
 * @private
 * @function toObjectInternal
 * @param {*[]} item
 * @param {number} maximumDepth
 * @param {number} [currentDepth=0]
 * @returns {object}
 */
function toObjectInternal(item, maximumDepth, currentDepth = 0) {
	let result = {};
	item.forEach((element, index) => {
		if (advancedDetermine.isArray(element) === true && currentDepth < maximumDepth) {
			result[index] = toObjectInternal(element, maximumDepth, currentDepth + 1);
		} else {
			result[index] = element;
		};
	});
	return result;
};
/**
 * @function toObject
 * @alias toObj
 * @description Convert an array to an object.
 * @param {*[]} item Array that need to convert to object.
 * @param {number} [maximumDepth=Infinity] The maximum depth level specifying how deep a nested array structure should be convert.
 * @returns {object} An object with number-index key.
 */
function toObject(item, maximumDepth = Infinity) {
	if (advancedDetermine.isArray(item) === false) {
		throw new TypeError(`Argument \`item\` must be type of array!`);
	};
	if (maximumDepth !== Infinity && advancedDetermine.isNumberPositiveSafeInteger(maximumDepth) === false) {
		throw new TypeError(`Argument \`maximumDepth\` must be type of positive safe integer number!`);
	};
	return toObjectInternal(item, maximumDepth);
};
export default toObject;
