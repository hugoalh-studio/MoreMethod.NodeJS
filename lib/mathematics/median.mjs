import * as advancedDetermine from "@hugoalh/advanced-determine";
import mathematicsMean from "./mean.mjs";
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
		let delta = [];
		group.forEach((element) => {
			delta.push(element);
		});
		group = delta;
	} else {
		throw new TypeError(`Argument \`group\` must be type of array (non-nullable) or set (non-nullable)!`);
	};
	if (group.every((element) => {
		return advancedDetermine.isNumber(element, { finite: true, safe: true }) !== false;
	}) !== true) {
		throw new TypeError(`Argument \`elements\` must be type of numbers (finite and safe)!`);
	};
	if (group.length < 2) {
		throw new Error(`Function \`mathematics.median\` only works when argument \`items\` has 2 or more values!`);
	};
	group.sort((a, b) => {
		return a - b;
	});
	let itemsLength = group.length;
	return ((itemsLength % 2 === 0) ? mathematicsMean(group[itemsLength / 2 - 1], group[itemsLength / 2]) : group[itemsLength / 2 - 0.5]);
};
export default mathematicsMedian;
