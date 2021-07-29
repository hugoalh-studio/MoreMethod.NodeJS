import * as advancedDetermine from "@hugoalh/advanced-determine";
/**
 * @private
 * @function mathematicsGreatestCommonDivisorInternal
 * @param {(number|number[])} items
 * @returns {number}
 */
function mathematicsGreatestCommonDivisorInternal(...items) {
	if (items.length === 2) {
		if (items[1] === 0) {
			return items[0];
		};
		return mathematicsGreatestCommonDivisorInternal(items[1], (items[0] % items[1]));
	} else if (items.length > 2) {
		let result = mathematicsGreatestCommonDivisorInternal(items[0], items[1]);
		for (let index = 2; index < items.length; index++) {
			result = mathematicsGreatestCommonDivisorInternal(result, items[index]);
		};
		return result;
	};
	return items[0];
};
/**
 * @function mathematics.greatestCommonDivisor
 * @alias math.gcd
 * @alias math.gcf
 * @alias math.gcm
 * @alias math.greatestCommonDivisor
 * @alias math.greatestCommonFactor
 * @alias math.greatestCommonMeasure
 * @alias math.hcd
 * @alias math.hcf
 * @alias math.highestCommonDivisor
 * @alias math.highestCommonFactor
 * @alias mathematics.gcd
 * @alias mathematics.gcf
 * @alias mathematics.gcm
 * @alias mathematics.greatestCommonFactor
 * @alias mathematics.greatestCommonMeasure
 * @alias mathematics.hcd
 * @alias mathematics.hcf
 * @alias mathematics.highestCommonDivisor
 * @alias mathematics.highestCommonFactor
 * @description Calculate the greatest common divisor from values.
 * @param {(number|number[])} items
 * @returns {number} Value of the greatest common divisor.
 */
function mathematicsGreatestCommonDivisor(...items) {
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
	return mathematicsGreatestCommonDivisorInternal(...items);
};
export default mathematicsGreatestCommonDivisor;
