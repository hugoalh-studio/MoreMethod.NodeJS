const advancedDetermine = require("@hugoalh/advanced-determine"),
	mathematicsFactorial = require("./factorial.js");
/**
 * @function mathematics.combination
 * @alias math.combination
 * @alias math.combine
 * @alias math.nCr
 * @alias mathematics.combine
 * @alias mathematics.nCr
 * @param {number} n
 * @param {number} k
 * @returns {number}
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
module.exports = mathematicsCombination;
