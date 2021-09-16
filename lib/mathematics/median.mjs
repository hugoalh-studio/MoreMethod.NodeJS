import * as advancedDetermine from "@hugoalh/advanced-determine";
/**
 * @function mathematics.median
 * @alias math.median
 * @description Calculate the median from values.
 * @param {(number[]|Set)} group
 * @returns {number} Value of the median.
 */
function mathematicsMedian(group) {
	if (advancedDetermine.isArray(group) === true) {
		// Nothing to do!
	} else if (group instanceof Set && group.size > 0) {
		group = Array.from(group);
	} else {
		throw new TypeError(`Argument \`group\` must be type of array (non-nullable) or set (non-nullable)!`);
	};
	if (group.every((element) => {
		return advancedDetermine.isNumber(element, { finite: true, safe: true }) !== false;
	}) !== true) {
		throw new TypeError(`Argument \`elements\` must be type of numbers (finite and safe)!`);
	};
	if (group.length === 1) {
		return group[0];
	};
	group.sort((a, b) => {
		return a - b;
	});
	let itemsLength = group.length;
	return ((itemsLength % 2 === 0) ? ((group[itemsLength / 2 - 1] + group[itemsLength / 2]) / 2) : group[itemsLength / 2 - 0.5]);
};
export default mathematicsMedian;
