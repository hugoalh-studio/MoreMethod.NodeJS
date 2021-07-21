const advancedDetermine = require("@hugoalh/advanced-determine"),
	permutation = require("./permutation.js");
/**
 * @function mathematics.cumulativePermutation
 * @alias math.cumulativePermutation
 * @alias math.cumulativePermute
 * @alias mathematics.cumulativePermute
 * @param {number} n
 * @returns {number}
 */
function mathematicsCumulativePermutation(n) {
	if (advancedDetermine.isNumberPositiveSafeInteger(n) !== true) {
		throw new TypeError(`Argument \`n\` must be type of positive safe integer number!`);
	};
	let total = 0;
	for (let index = 1; index <= n; index++) {
		total += permutation(n, index);
	};
	return total;
};
module.exports = mathematicsCumulativePermutation;
