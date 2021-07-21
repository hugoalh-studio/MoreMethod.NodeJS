const advancedDetermine = require("@hugoalh/advanced-determine");
/**
 * @function mathematics.factorial
 * @alias math.factor
 * @alias math.factorial
 * @alias mathematics.factor
 * @param {number} n
 * @returns {number}
 */
function mathematicsFactorial(n) {
	if (advancedDetermine.isNumberPositiveSafeInteger(n) !== true) {
		throw new TypeError(`Argument \`n\` must be type of positive safe integer number!`);
	};
	if (n === 0) {
		return 1;
	};
	let total = n;
	while (n > 1) {
		n -= 1;
		total *= n;
	};
	return total;
};
module.exports = mathematicsFactorial;
