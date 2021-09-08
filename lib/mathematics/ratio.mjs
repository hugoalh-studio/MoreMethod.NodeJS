import * as advancedDetermine from "@hugoalh/advanced-determine";
import mathematicsGreatestCommonDivisor from "./greatest-common-divisor.mjs";
/**
 * @function mathematics.ratio
 * @alias math.ratio
 * @description Calculate the ratio from values.
 * @param {(number[]|Set)} group
 * @returns {number[]} Values of the ratio.
 */
function mathematicsRatio(group) {
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
		throw new Error(`Function \`mathematics.ratio\` only works when argument \`items\` has 2 or more values!`);
	};
	let gcd = mathematicsGreatestCommonDivisor(...group);
	return group.map((element) => {
		return (element / gcd);
	});
};
export default mathematicsRatio;
