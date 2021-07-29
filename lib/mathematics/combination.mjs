import * as advancedDetermine from "@hugoalh/advanced-determine";
import mathematicsFactorial from "./factorial.mjs";
/**
 * @function mathematics.combination
 * @alias math.combination
 * @alias math.combine
 * @alias math.nCr
 * @alias mathematics.combine
 * @alias mathematics.nCr
 * @description Calculate the number of combination groups.
 * @param {number} n Total number of elements.
 * @param {number} k Size of the set.
 * @returns {number} Number of groups.
 */
function mathematicsCombination(n, k) {
	if (advancedDetermine.isNumberPositiveSafeInteger(n) !== true) {
		throw new TypeError(`Argument \`n\` must be type of positive safe integer number!`);
	};
	if (advancedDetermine.isNumberPositiveSafeInteger(k) !== true) {
		throw new TypeError(`Argument \`k\` must be type of positive safe integer number!`);
	};
	if (n < k) {
		throw new RangeError(`Argument \`n\` must be >= \`k\` (illogical combination)!`);
	};
	return (mathematicsFactorial(n) / (mathematicsFactorial(k) * mathematicsFactorial(n - k)));
};
export default mathematicsCombination;
