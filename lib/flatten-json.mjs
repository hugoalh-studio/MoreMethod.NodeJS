import * as advancedDetermine from "@hugoalh/advanced-determine";
import checkOption from "./internal/check-option.mjs";
/**
 * @private
 * @function flattenJSONInternal
 * @param {*} item
 * @param {object} option
 * @param {number} option.currentDepth
 * @param {string} option.currentKey
 * @param {boolean} option.keepArray
 * @param {number} option.maximumDepth
 * @returns {object}
 */
function flattenJSONInternal(item, option) {
	let result = {};
	if (advancedDetermine.isArray(item) === true) {
		item.forEach((element, index) => {
			if (option.keepArray === false && option.currentDepth < option.maximumDepth) {
				let data = flattenJSONInternal(
					element,
					{
						currentDepth: option.currentDepth + 1,
						currentKey: `${option.currentKey}[${index}]`,
						keepArray: option.keepArray,
						maximumDepth: option.maximumDepth
					}
				);
				Object.keys(data).forEach((keyData) => {
					result[keyData] = data[keyData];
				});
			} else {
				result[`${option.currentKey}[${index}]`] = element;
			};
		});
	} else if (advancedDetermine.isObjectPair(item) === true) {
		Object.keys(item).forEach((keyObject) => {
			if (option.currentDepth < option.maximumDepth) {
				let data = flattenJSONInternal(
					item[keyObject],
					{
						currentDepth: option.currentDepth + 1,
						currentKey: `${option.currentKey}${(option.currentKey.length === 0) ? "" : "."}${keyObject}`,
						keepArray: option.keepArray,
						maximumDepth: option.maximumDepth
					}
				);
				Object.keys(data).forEach((keyData) => {
					result[keyData] = data[keyData];
				});
			} else {
				result[`${option.currentKey}${(option.currentKey.length === 0) ? "" : "."}${keyObject}`] = item[keyObject];
			};
		});
	} else {
		result[option.currentKey] = item;
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
	if (advancedDetermine.isJSON(item) === false && advancedDetermine.isObjectPair(item) === false) {
		throw new TypeError(`Argument \`item\` must be type of JSON!`);
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
export default flattenJSON;
