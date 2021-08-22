const advancedDetermine = require("@hugoalh/advanced-determine");
const mathematicsPermutation = require("./permutation.js");
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
	if (advancedDetermine.isNumberPositiveSafeInteger(n) !== true) {
		throw new TypeError(`Argument \`n\` must be type of positive safe integer number!`);
	};
	let total = 0;
	for (let index = 1; index <= n; index++) {
		total += mathematicsPermutation(n, index);
	};
	return total;
};
module.exports = mathematicsCumulativePermutation;
