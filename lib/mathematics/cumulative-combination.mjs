import * as advancedDetermine from "@hugoalh/advanced-determine";
import mathematicsCombination from "./combination.mjs";
/**
 * @function mathematics.cumulativeCombination
 * @alias math.cumulativeCombination
 * @alias math.cumulativeCombine
 * @alias mathematics.cumulativeCombine
 * @description Calculate the number of cumulative combination groups.
 * @param {number} n Total number of elements.
 * @returns {number} Number of groups.
 */
function mathematicsCumulativeCombination(n) {
	if (advancedDetermine.isNumber(n, { finite: true, integer: true, positive: true, safe: true }) !== true) {
		throw new TypeError(`Argument \`n\` must be type of number (finite, integer, positive, and safe)!`);
	};
	let total = 0;
	for (let index = 1; index <= n; index++) {
		total += mathematicsCombination(n, index);
	};
	return total;
};
export default mathematicsCumulativeCombination;
