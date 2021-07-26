const advancedDetermine = require("@hugoalh/advanced-determine"),
	checkOption = require("./internal/check-option.js"),
	concatenate = require("./concatenate.js"),
	depth = require("./depth.js"),
	flatten = require("./flatten.js");
/**
 * @function cumulativeFlatten
 * @description Cumulative flatten all sub-object pairs concatenated into it recursively.
 * @param {object} item Object pair that need to cumulative flatten.
 * @param {object} [option={}] Option.
 * @param {string} [option.delimiter="."] Key delimiter for sub-object pairs' keys.
 * @returns {object} A cumulative flattened object pair.
 */
function cumulativeFlatten(item, option = {}) {
	checkOption(option);
	let runtime = {
		delimiter: "."
	};
	if (advancedDetermine.isObjectPair(item) === false) {
		throw new TypeError(`Argument \`item\` must be type of object pair!`);
	};
	if (typeof option.delimiter !== "undefined") {
		if (advancedDetermine.isString(option.delimiter) !== true) {
			throw new TypeError(`Argument \`option.delimiter\` must be type of string (non-nullable)!`);
		};
		runtime.delimiter = option.delimiter;
	};
	let result = [];
	for (let index = 0; index <= depth(item); index++) {
		result.push(flatten(item, {
			delimiter: runtime.delimiter,
			maximumDepth: index
		}));
	};
	return concatenate(...result);
};
module.exports = cumulativeFlatten;
