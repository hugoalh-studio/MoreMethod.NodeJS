const advancedDetermine = require("@hugoalh/advanced-determine"),
	checkOption = require("./internal/check-option.js");
/**
 * @private
 * @function flattenArrayInternal
 * @param {*[]} item
 * @param {object} option
 * @param {number} option.currentDepth
 * @param {number} option.maximumDepth
 * @returns {*[]}
 */
function flattenArrayInternal(item, option) {
	let result = [];
	item.forEach((element) => {
		if (advancedDetermine.isArray(element) === true && option.currentDepth < option.maximumDepth) {
			result.push(...flattenArrayInternal(
				element,
				{
					currentDepth: option.currentDepth + 1,
					maximumDepth: option.maximumDepth
				}
			));
		} else {
			result.push(element);
		};
	});
	return result;
};
/**
 * @private
 * @function flattenArray
 * @param {*[]} item
 * @param {object} [option]
 * @param {number} [option.maximumDepth=Infinity]
 * @returns {*[]}
 */
function flattenArray(item, option) {
	let runtime = {
		currentDepth: 0,
		maximumDepth: Infinity
	};
	if (typeof option.maximumDepth !== "undefined") {
		if (option.maximumDepth !== Infinity && advancedDetermine.isNumberPositiveSafeInteger(option.maximumDepth) !== true) {
			throw new TypeError(`Argument \`option.maximumDepth\` must be type of positive safe integer number!`);
		};
		runtime.maximumDepth = option.maximumDepth;
	};
	return flattenArrayInternal(item, runtime);
};
/**
 * @private
 * @function flattenObjectPairInternal
 * @param {*} item
 * @param {object} option
 * @param {number} option.currentDepth
 * @param {string} option.currentKey
 * @param {string} option.delimiter
 * @param {boolean} option.keepArray
 * @param {number} option.maximumDepth
 * @returns {object}
 */
function flattenObjectPairInternal(item, option) {
	let result = {};
	if (advancedDetermine.isArray(item) === true) {
		item.forEach((element, index) => {
			if (option.keepArray === false && option.currentDepth < option.maximumDepth) {
				let data = flattenObjectPairInternal(
					element,
					{
						currentDepth: option.currentDepth + 1,
						currentKey: `${option.currentKey}${(option.currentKey.length === 0) ? "" : option.delimiter}${index}`,
						delimiter: option.delimiter,
						keepArray: option.keepArray,
						maximumDepth: option.maximumDepth
					}
				);
				Object.keys(data).forEach((keyData) => {
					result[keyData] = data[keyData];
				});
			} else {
				result[`${option.currentKey}${(option.currentKey.length === 0) ? "" : option.delimiter}${index}`] = element;
			};
		});
	} else if (advancedDetermine.isObjectPair(item) === true) {
		Object.keys(item).forEach((keyObject) => {
			if (option.currentDepth < option.maximumDepth) {
				let data = flattenObjectPairInternal(
					item[keyObject],
					{
						currentDepth: option.currentDepth + 1,
						currentKey: `${option.currentKey}${(option.currentKey.length === 0) ? "" : option.delimiter}${keyObject}`,
						delimiter: option.delimiter,
						keepArray: option.keepArray,
						maximumDepth: option.maximumDepth
					}
				);
				Object.keys(data).forEach((keyData) => {
					result[keyData] = data[keyData];
				});
			} else {
				result[`${option.currentKey}${(option.currentKey.length === 0) ? "" : option.delimiter}${keyObject}`] = item[keyObject];
			};
		});
	} else {
		result[option.currentKey] = item;
	};
	return result;
};
/**
 * @private
 * @function flattenObjectPair
 * @param {object} item
 * @param {object} [option]
 * @param {string} [option.delimiter="."]
 * @param {boolean} [option.keepArray=false]
 * @param {number} [option.maximumDepth=Infinity]
 * @returns {object}
 */
function flattenObjectPair(item, option) {
	let runtime = {
		currentDepth: 0,
		currentKey: "",
		delimiter: ".",
		keepArray: false,
		maximumDepth: Infinity
	};
	if (typeof option.delimiter !== "undefined") {
		if (advancedDetermine.isString(option.delimiter) !== true) {
			throw new TypeError(`Argument \`option.delimiter\` must be type of string (non-nullable)!`);
		};
		runtime.delimiter = option.delimiter;
	};
	if (typeof option.keepArray !== "undefined") {
		if (typeof option.keepArray !== "boolean") {
			throw new TypeError(`Argument \`option.keepArray\` must be type of boolean!`);
		};
		runtime.keepArray = option.keepArray;
	};
	if (typeof option.maximumDepth !== "undefined") {
		if (option.maximumDepth !== Infinity && advancedDetermine.isNumberPositiveSafeInteger(option.maximumDepth) !== true) {
			throw new TypeError(`Argument \`option.maximumDepth\` must be type of positive safe integer number!`);
		};
		runtime.maximumDepth = option.maximumDepth;
	};
	return flattenObjectPairInternal(item, runtime);
};
/**
 * @function flatten
 * @alias flat
 * @description Cause all sub-array elements or sub-object pairs concatenated into it recursively up to the specified depth.
 * @param {(*[]|object)} item Array or object pair that need to flatten.
 * @param {object} [option={}] Option.
 * @param {string} [option.delimiter="."] Key delimiter for sub-object pairs' keys.
 * @param {boolean} [option.keepArray=false] Keep array not to flatten in the object-pair.
 * @param {number} [option.maximumDepth=Infinity] The maximum depth level specifying how deep a nested array or object structure should be flatten.
 * @returns {(*[]|object)} A flattened array or object pair.
 */
function flatten(item, option = {}) {
	checkOption(option);
	if (advancedDetermine.isArray(item) !== false) {
		return flattenArray(item, option);
	};
	if (advancedDetermine.isObjectPair(item) !== false) {
		return flattenObjectPair(item, option);
	};
	throw new TypeError(`Argument \`item\` must be type of array or object pair!`);
};
module.exports = flatten;
