const advancedDetermine = require("@hugoalh/advanced-determine"),
	mathematicsCombination = require("./combination.js");
/**
 * @function mathematics.cumulativeCombination
 * @alias math.cumulativeCombination
 * @alias math.cumulativeCombine
 * @alias mathematics.cumulativeCombine
 * @param {number} n
 * @returns {number}
 */
function mathematicsCumulativeCombination(n) {
	if (advancedDetermine.isNumberPositiveSafeInteger(n) !== true) {
		throw new TypeError(`Argument \`n\` must be type of positive safe integer number!`);
	};
	let total = 0;
	for (let index = 1; index <= n; index++) {
		total += mathematicsCombination(n, index);
	};
	return total;
};
module.exports = mathematicsCumulativeCombination;
