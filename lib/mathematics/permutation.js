const advancedDetermine = require("@hugoalh/advanced-determine"),
	factorial = require("./factorial.js");
/**
 * @function mathematics.permutation
 * @alias math.nPr
 * @alias math.permutation
 * @alias math.permute
 * @alias mathematics.nPr
 * @alias mathematics.permute
 * @param {number} n
 * @param {number} k
 * @returns {number}
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
	return (factorial(n) / factorial(n - k));
};
module.exports = mathematicsPermutation;
