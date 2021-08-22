const advancedDetermine = require("@hugoalh/advanced-determine");
const checkOption = require("./internal/check-option.js");
/**
 * @private
 * @function flattenJSONInternal
 * @param {any} item
 * @param {object} runtime
 * @returns {object}
 */
function flattenJSONInternal(item, runtime) {
	let itemIsArray = advancedDetermine.isArray(item);
	let itemIsObjectPair = advancedDetermine.isObjectPair(item);
	let result = {};
	if (itemIsArray === true) {
		if (runtime.stopAtArray === true) {
			return item;
		};
		item.forEach((element, index) => {
			if (runtime.currentDepth < runtime.maximumDepth) {
				if (runtime.keepArray === true) {
					let data = flattenJSONInternal(
						element,
						{
							...runtime,
							currentDepth: runtime.currentDepth + 1,
							currentKey: ""
						}
					);
					if (Array.isArray(result[runtime.currentKey]) === false) {
						result[runtime.currentKey] = [];
					};
					result[runtime.currentKey][index] = data;
				} else {
					let data = flattenJSONInternal(
						element,
						{
							...runtime,
							currentDepth: runtime.currentDepth + 1,
							currentKey: `${runtime.currentKey}[${index}]`
						}
					);
					Object.keys(data).forEach((keyData) => {
						result[keyData] = data[keyData];
					});
				};
			} else {
				if (runtime.keepArray === true) {
					if (Array.isArray(result[runtime.currentKey]) === false) {
						result[runtime.currentKey] = [];
					};
					result[runtime.currentKey][index] = element;
				} else {
					result[`${runtime.currentKey}[${index}]`] = element;
				};
			};
		});
	} else if (itemIsObjectPair === true) {
		Object.keys(item).forEach((element) => {
			if (runtime.currentDepth < runtime.maximumDepth) {
				let data = flattenJSONInternal(
					item[element],
					{
						...runtime,
						currentDepth: runtime.currentDepth + 1,
						currentKey: `${runtime.currentKey}${(runtime.currentKey.length === 0) ? "" : "."}${element}`
					}
				);
				Object.keys(data).forEach((keyData) => {
					result[keyData] = data[keyData];
				});
			} else {
				result[`${runtime.currentKey}${(runtime.currentKey.length === 0) ? "" : "."}${element}`] = item[element];
			};
		});
	} else if (
		itemIsArray === null ||
		itemIsObjectPair === null
	) {
		// Nothing to do!
	} else {
		if (runtime.currentKey.length === 0) {
			return item;
		};
		result[runtime.currentKey] = item;
	};
	return result;
};
/**
 * @function flattenJSON
 * @alias flatJSON
 * @description Cause all sub-JSON elements concatenated into it recursively up to the specified depth.
 * @param {(any[]|object)} item JSON that need to flatten.
 * @param {object} [option={}] Option.
 * @param {boolean} [option.keepArray=false] Keep array not to flatten in the JSON.
 * @param {number} [option.maximumDepth=Infinity] The maximum depth level specifying how deep a nested JSON structure should be flatten.
 * @param {boolean} [option.stopAtArray=false] Keep array and it's elements not to flatten in the JSON.
 * @returns {object} A flattened JSON.
 */
function flattenJSON(item, option = {}) {
	checkOption(option);
	let runtime = {
		currentDepth: 0,
		currentKey: "",
		keepArray: false,
		maximumDepth: Infinity,
		stopAtArray: false
	};
	if (advancedDetermine.isJSON(item, { strictKey: true }) === false) {
		if (Array.isArray(item) === false && advancedDetermine.isObjectPair(item) === false) {
			throw new TypeError(`Argument \`item\` must be type of JSON!`);
		};
		console.warn(`Function \`flattenJSON\` is not fully supported illegal namespace character(s) in the key(s) and/or non-JSON value(s) in the value(s), and maybe return an unexpected result!`);
	};
	if (typeof option.stopAtArray === "undefined") {
		if (typeof option.keepArray !== "undefined") {
			if (typeof option.keepArray !== "boolean") {
				throw new TypeError(`Argument \`option.keepArray\` must be type of boolean!`);
			};
			runtime.keepArray = option.keepArray;
		};
	} else {
		if (typeof option.stopAtArray !== "boolean") {
			throw new TypeError(`Argument \`option.stopAtArray\` must be type of boolean!`);
		};
		runtime.stopAtArray = option.stopAtArray;
	};
	if (typeof option.maximumDepth !== "undefined") {
		if (option.maximumDepth !== Infinity && advancedDetermine.isNumberPositiveSafeInteger(option.maximumDepth) !== true) {
			throw new TypeError(`Argument \`option.maximumDepth\` must be type of positive safe integer number!`);
		};
		runtime.maximumDepth = option.maximumDepth;
	};
	return flattenJSONInternal(item, runtime);
};
module.exports = flattenJSON;
