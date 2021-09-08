import * as advancedDetermine from "@hugoalh/advanced-determine";
import mathematicsPermutation from "./permutation.mjs";
/**
 * @function mathematics.cumulativePermutation
 * @alias math.cumulativePermutation
 * @alias math.cumulativePermute
 * @alias mathematics.cumulativePermute
 * @description Calculate the number of cumulative permutation groups.
 * @param {number} n Total number of elements.
 * @returns {number} Number of groups.
 */
function mathematicsCumulativePermutation(n) {
	if (advancedDetermine.isNumber(n, { finite: true, integer: true, positive: true, safe: true }) !== true) {
		throw new TypeError(`Argument \`n\` must be type of number (finite, integer, positive, and safe)!`);
	};
	let total = 0;
	for (let index = 1; index <= n; index++) {
		total += mathematicsPermutation(n, index);
	};
	return total;
};
export default mathematicsCumulativePermutation;
