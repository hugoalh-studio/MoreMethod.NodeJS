const advancedDetermine = require("@hugoalh/advanced-determine"),
	checkOption = require("./internal/check-option.js");
/**
 * @private
 * @function flattenJSONInternal
 * @param {any} item
 * @param {object} runtime
 * @returns {object}
 */
function flattenJSONInternal(item, runtime) {
	let itemIsArray = advancedDetermine.isArray(item),
		itemIsObjectPair = advancedDetermine.isObjectPair(item),
		result = {};
	if (itemIsArray === true) {
		item.forEach((element, index) => {
			if (runtime.keepArray === false && runtime.currentDepth < runtime.maximumDepth) {
				let data = flattenJSONInternal(
					element,
					{
						currentDepth: runtime.currentDepth + 1,
						currentKey: `${runtime.currentKey}[${index}]`,
						keepArray: runtime.keepArray,
						maximumDepth: runtime.maximumDepth
					}
				);
				Object.keys(data).forEach((keyData) => {
					result[keyData] = data[keyData];
				});
			} else {
				result[`${runtime.currentKey}[${index}]`] = element;
			};
		});
	} else if (itemIsObjectPair === true) {
		Object.keys(item).forEach((element) => {
			if (runtime.currentDepth < runtime.maximumDepth) {
				let data = flattenJSONInternal(
					item[element],
					{
						currentDepth: runtime.currentDepth + 1,
						currentKey: `${runtime.currentKey}${(runtime.currentKey.length === 0) ? "" : "."}${element}`,
						keepArray: runtime.keepArray,
						maximumDepth: runtime.maximumDepth
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
		result[runtime.currentKey] = item;
	};
	return result;
};
/**
 * @function flattenJSON
 * @alias flatJSON
 * @description Cause all sub-JSON elements concatenated into it recursively up to the specified depth.
 * @param {object} item JSON that need to flatten.
 * @param {object} [option={}] Option.
 * @param {boolean} [option.keepArray=false] Keep array not to flatten in the JSON.
 * @param {number} [option.maximumDepth=Infinity] The maximum depth level specifying how deep a nested JSON structure should be flatten.
 * @returns {object} A flattened JSON.
 */
function flattenJSON(item, option = {}) {
	checkOption(option);
	let runtime = {
		currentDepth: 0,
		currentKey: "",
		keepArray: false,
		maximumDepth: Infinity
	};
	if (advancedDetermine.isJSON(item, { strictKey: true }) === false) {
		if (advancedDetermine.isObjectPair(item) === false) {
			throw new TypeError(`Argument \`item\` must be type of JSON!`);
		};
		console.warn(`Function \`flattenJSON\` is not fully supported illegal namespace character(s) in the key(s), and maybe return an unexpected result!`);
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
	return flattenJSONInternal(item, runtime);
};
module.exports = flattenJSON;
