import * as advancedDetermine from "@hugoalh/advanced-determine";
import mathematicsGreatestCommonDivisor from "./greatest-common-divisor.mjs";
/**
 * @function mathematics.ratio
 * @alias math.ratio
 * @description Calculate the ratio from values.
 * @param {(number|number[])} items
 * @returns {number[]} Values of the ratio.
 */
function mathematicsRatio(...items) {
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
	if (items.length < 2) {
		throw new Error(`Function \`mathematics.ratio\` only works when argument \`items\` has 2 or more values!`);
	};
	let gcd = mathematicsGreatestCommonDivisor(...items);
	return items.map((element) => {
		return (element / gcd);
	});
};
export default mathematicsRatio;
