const advancedDetermine = require("@hugoalh/advanced-determine"),
	greatestCommonDivisor = require("./greatest-common-divisor.js");
/**
 * @function mathematics.leastCommonMultiple
 * @alias math.lcm
 * @alias math.leastCommonMultiple
 * @alias math.lowestCommonMultiple
 * @alias math.scm
 * @alias math.smallestCommonMultiple
 * @alias mathematics.lcm
 * @alias mathematics.lowestCommonMultiple
 * @alias mathematics.scm
 * @alias mathematics.smallestCommonMultiple
 * @param {(number|number[])} items
 * @returns {number}
 */
function mathematicsLeastCommonMultiple(...items) {
	if (items.length === 0) {
		throw new Error(`Argument \`items\` is not defined!`);
	};
	if (items.length === 1 && advancedDetermine.isArray(items[0]) !== false) {
		items = items[0];
	};
	if (advancedDetermine.allIs("number", ...items) === false) {
		throw new TypeError(`Argument \`items\` must be type of numbers!`);
	};
	if (items.length === 1) {
		return items[0];
	};
	let multiplication = 1;
	items.forEach((element) => {
		multiplication *= element;
	});
	return (Math.abs(multiplication) / greatestCommonDivisor(...items));
};
module.exports = mathematicsLeastCommonMultiple;
