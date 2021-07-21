const advancedDetermine = require("@hugoalh/advanced-determine");
/**
 * @function mathematics.mean
 * @alias math.average
 * @alias math.mean
 * @alias mathematics.average
 * @param {(number|number[])} items
 * @returns {number}
 */
function mathematicsMean(...items) {
	if (items.length === 0) {
		throw new Error(`Argument \`items\` is not defined!`);
	};
	if (items.length === 1 && advancedDetermine.isArray(items[0]) !== false) {
		items = items[0];
	};
	if (advancedDetermine.allIs("number", ...items) === false) {
		throw new TypeError(`Argument \`items\` must be type of numbers!`);
	};
	let addition = 0;
	items.forEach((element) => {
		addition += element;
	});
	return (addition / items.length);
};
module.exports = mathematicsMean;
