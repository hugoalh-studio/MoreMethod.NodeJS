const advancedDetermine = require("@hugoalh/advanced-determine");
/**
 * @private
 * @function depthInternal
 * @param {(any[]|object)} item
 * @param {number} depthCount
 * @returns {number}
 */
function depthInternal(item, depthCount = -1) {
	let result = depthCount;
	if (advancedDetermine.isArray(item) === true) {
		item.forEach((element) => {
			let newDepth = depthInternal(element, depthCount + 1);
			result = ((newDepth > result) ? newDepth : result);
		});
	} else if (advancedDetermine.isObjectPair(item) === true) {
		Object.keys(item).forEach((keyObject) => {
			let newDepth = depthInternal(item[keyObject], depthCount + 1);
			result = ((newDepth > result) ? newDepth : result);
		});
	};
	return ((result < 0) ? 0 : result);
};
/**
 * @function depth
 * @description Count the depth of an array or an object pair.
 * @param {(any[]|object)} item Array or object pair that need to count the depth.
 * @returns {number} Depth of the array or object pair.
 */
function depth(item) {
	if (Array.isArray(item) === false && advancedDetermine.isObjectPair(item) === false) {
		throw new TypeError(`Argument \`item\` must be type of array or object pair!`);
	};
	return depthInternal(item);
};
module.exports = depth;
