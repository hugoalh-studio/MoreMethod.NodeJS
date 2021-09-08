const advancedDetermine = require("@hugoalh/advanced-determine");
const mathematicsGreatestCommonDivisor = require("./greatest-common-divisor.js");
/**
 * @function mathematics.leastCommonMultiple
 * @alias math.lcm
 * @alias math.leastCommonMultiple
 * @alias math.lowestCommonMultiple
 * @alias math.scm
 * @alias math.smallestCommonMultiple
 * @alias mathematics.lcm
 * @alias mathematics.lowestCommonMultiple
 * @alias mathematics.scm
 * @alias mathematics.smallestCommonMultiple
 * @description Calculate the least common multiple from values.
 * @param {(number[]|Set)} group
 * @returns {number} Value of the least common multiple.
 */
function mathematicsLeastCommonMultiple(group) {
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
	let multiplication = 1;
	group.forEach((element) => {
		multiplication *= element;
	});
	return (Math.abs(multiplication) / mathematicsGreatestCommonDivisor(...group));
};
module.exports = mathematicsLeastCommonMultiple;
