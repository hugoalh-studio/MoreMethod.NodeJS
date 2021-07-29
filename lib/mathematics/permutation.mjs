import * as advancedDetermine from "@hugoalh/advanced-determine";
import mathematicsFactorial from "./factorial.mjs";
/**
 * @function mathematics.permutation
 * @alias math.nPr
 * @alias math.permutation
 * @alias math.permute
 * @alias mathematics.nPr
 * @alias mathematics.permute
 * @description Calculate the number of permutation groups.
 * @param {number} n Total number of elements.
 * @param {number} k Size of the set.
 * @returns {number} Number of groups.
 */
function mathematicsPermutation(n, k) {
	if (advancedDetermine.isNumberPositiveSafeInteger(n) !== true) {
		throw new TypeError(`Argument \`n\` must be type of positive safe integer number!`);
	};
	if (advancedDetermine.isNumberPositiveSafeInteger(k) !== true) {
		throw new TypeError(`Argument \`k\` must be type of positive safe integer number!`);
	};
	if (n < k) {
		throw new RangeError(`Argument \`n\` must be >= \`k\` (illogical permutation)!`);
	};
	return (mathematicsFactorial(n) / mathematicsFactorial(n - k));
};
export default mathematicsPermutation;
