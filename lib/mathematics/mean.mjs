import * as advancedDetermine from "@hugoalh/advanced-determine";
/**
 * @function mathematics.mean
 * @alias math.average
 * @alias math.mean
 * @alias mathematics.average
 * @description Calculate the mean from values.
 * @param {(number[]|Set)} group
 * @returns {number} Value of the mean.
 */
function mathematicsMean(group) {
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
	if (group.length === 1) {
		return group[0];
	};
	let addition = 0;
	group.forEach((element) => {
		addition += element;
	});
	return (addition / group.length);
};
export default mathematicsMean;
