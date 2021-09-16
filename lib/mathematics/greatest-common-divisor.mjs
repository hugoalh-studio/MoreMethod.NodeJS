import * as advancedDetermine from "@hugoalh/advanced-determine";
/**
 * @private
 * @function mathematicsGreatestCommonDivisorInternal
 * @param {number[]} items
 * @returns {number}
 */
function mathematicsGreatestCommonDivisorInternal(items) {
	if (items.length === 2) {
		if (items[1] === 0) {
			return items[0];
		};
		return mathematicsGreatestCommonDivisorInternal([items[1], (items[0] % items[1])]);
	} else if (items.length > 2) {
		let result = mathematicsGreatestCommonDivisorInternal([items[0], items[1]]);
		for (let index = 2; index < items.length; index++) {
			result = mathematicsGreatestCommonDivisorInternal([result, items[index]]);
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
 * @param {(number[]|Set)} group
 * @returns {number} Value of the greatest common divisor.
 */
function mathematicsGreatestCommonDivisor(group) {
	if (advancedDetermine.isArray(group) === true) {
		// Nothing to do!
	} else if (group instanceof Set && group.size > 0) {
		group = Array.from(group);
	} else {
		throw new TypeError(`Argument \`group\` must be type of array (non-nullable) or set (non-nullable)!`);
	};
	if (group.every((element) => {
		return advancedDetermine.isNumber(element, { finite: true, safe: true }) !== false;
	}) !== true) {
		throw new TypeError(`Argument \`elements\` must be type of numbers (finite and safe)!`);
	};
	if (group.length === 1) {
		return group[0];
	};
	return mathematicsGreatestCommonDivisorInternal(group);
};
export default mathematicsGreatestCommonDivisor;
