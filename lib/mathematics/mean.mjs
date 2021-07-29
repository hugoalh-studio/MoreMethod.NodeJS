import * as advancedDetermine from "@hugoalh/advanced-determine";
/**
 * @function mathematics.mean
 * @alias math.average
 * @alias math.mean
 * @alias mathematics.average
 * @description Calculate the mean from values.
 * @param {(number|number[])} items
 * @returns {number} Value of the mean.
 */
function mathematicsMean(...items) {
	if (items.length === 0) {
		throw new Error(`Argument \`items\` is not defined!`);
	};
	if (items.length === 1 && advancedDetermine.isArray(items[0]) !== false) {
		items = items[0];
	};
	if (items.every((element) => {
		return advancedDetermine.isNumber(element) !== false;
	}) !== true) {
		throw new TypeError(`Argument \`items\` must be type of numbers!`);
	};
	let addition = 0;
	items.forEach((element) => {
		addition += element;
	});
	return (addition / items.length);
};
export default mathematicsMean;
