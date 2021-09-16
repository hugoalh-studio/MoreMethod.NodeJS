const advancedDetermine = require("@hugoalh/advanced-determine");
const removeDuplicate = require("./remove-duplicate.js");
/**
 * @private
 * @function concatenateMap
 * @param {Map} items
 * @returns {Map}
 */
function concatenateMap(...items) {
	let result = new Map();
	items.forEach((item) => {
		for (let [key, value] of item) {
			result.set(key, value);
		};
	});
	return result;
};
/**
 * @private
 * @function concatenateObjectPair
 * @param {object} items
 * @returns {object}
 */
function concatenateObjectPair(...items) {
	let result = {};
	items.forEach((item) => {
		Object.keys(item).forEach((element) => {
			if (advancedDetermine.isArray(item[element]) !== false) {
				result[element] = ((advancedDetermine.isArray(result[element]) === false) ? item[element] : removeDuplicate([].concat(result[element], item[element])));
			} else if (advancedDetermine.isObjectPair(item[element]) !== false) {
				result[element] = ((advancedDetermine.isObjectPair(result[element]) === false) ? item[element] : concatenateObjectPair(result[element], item[element]));
			} else {
				result[element] = item[element];
			};
		});
	});
	return result;
};
/**
 * @private
 * @function concatenateSet
 * @param {Set} items
 * @returns {Set}
 */
function concatenateSet(...items) {
	let result = new Set();
	items.forEach((item) => {
		for (let value of item) {
			result.add(value);
		};
	});
	return result;
};
/**
 * @function concatenate
 * @alias concat
 * @alias merge
 * @description Concatenate arrays, maps, object pairs, or sets into one.
 * @param {(any[]|Map|object|Set)} items Arrays, maps, object pairs, or sets that need to concatenate into one.
 * @returns {(any[]|Map|object|Set)} A concatenated array, map, object pair, or set.
 */
function concatenate(...items) {
	if (items.length === 0) {
		throw new Error(`Argument \`items\` is not defined!`);
	};
	if (items.every((element) => {
		return Array.isArray(element) === true;
	}) === true) {
		return [].concat(...items);
	};
	if (items.every((element) => {
		return element instanceof Map;
	}) === true) {
		return concatenateMap(...items);
	};
	if (items.every((element) => {
		return advancedDetermine.isObjectPair(element) !== false;
	}) === true) {
		return concatenateObjectPair(...items);
	};
	if (items.every((element) => {
		return element instanceof Set;
	}) === true) {
		return concatenateSet(...items);
	};
	throw new TypeError(`Argument \`items\` must be type of arrays, maps, object pairs, or sets!`);
};
module.exports = concatenate;
