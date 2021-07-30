import * as advancedDetermine from "@hugoalh/advanced-determine";
import flattenArray from "./flatten-array.mjs";
import flattenJSON from "./flatten-json.mjs";
/**
 * @function flatten
 * @alias flat
 * @description Cause all sub-array elements or sub-JSON elements concatenated into it recursively up to the specified depth.
 * @param {(*[]|object)} item Array or JSON that need to flatten.
 * @param {object} [option={}] Option.
 * @param {boolean} [option.keepArray=false] Keep array not to flatten in the JSON.
 * @param {number} [option.maximumDepth=Infinity] The maximum depth level specifying how deep a nested array or JSON structure should be flatten.
 * @returns {(*[]|object)} A flattened array or JSON.
 */
function flatten(item, option = {}) {
	if (advancedDetermine.isArray(item) !== false) {
		return flattenArray(item, option);
	};
	if (advancedDetermine.isObjectPair(item) !== false) {
		return flattenJSON(item, option);
	};
	throw new TypeError(`Argument \`item\` must be type of array or JSON!`);
};
export default flatten;
