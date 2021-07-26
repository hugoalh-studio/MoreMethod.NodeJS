const advancedDetermine = require("@hugoalh/advanced-determine"),
	mathematicsMean = require("./mean.js");
/**
 * @function mathematics.median
 * @alias math.median
 * @description Calculate the median from values.
 * @param {(number|number[])} items
 * @returns {number} Value of the median.
 */
function mathematicsMedian(...items) {
	if (items.length === 0) {
		throw new Error(`Argument \`items\` is not defined!`);
	};
	if (items.length === 1 && advancedDetermine.isArray(items[0]) !== false) {
		items = items[0];
	};
	if (advancedDetermine.allIs("number", ...items) === false) {
		throw new TypeError(`Argument \`items\` must be type of numbers!`);
	};
	items.sort((a, b) => {
		return a - b;
	});
	let itemsLength = items.length;
	return ((itemsLength % 2 === 0) ? mathematicsMean(items[itemsLength / 2 - 1], items[itemsLength / 2]) : items[itemsLength / 2 - 0.5]);
};
module.exports = mathematicsMedian;
