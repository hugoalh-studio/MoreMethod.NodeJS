const ReplaceholderService = require("./replaceholder-service.js");
/**
 * @function replaceholder
 * @description JSON query and transformation.
 * @param {object} list Placeholder list.
 * @param {(any[]|object|string)} item Query.
 * @param {object} [option={}] Option.
 * @param {string} [option.prefix="%"] Prefix of the placeholder.
 * @param {string} [option.suffix="%"] Suffix of the placeholder.
 * @param {boolean} [option.typeTransform=true] Transform placeholder to the target value's type.
 * @param {(boolean|null|string)} [option.replaceUndefined=false] Replace undefined placeholder when placeholder is not in the list.
 * @returns {any} Result.
 */
function replaceholder(list, item, option = {}) {
	return new ReplaceholderService(list, option).replace(item);
};
module.exports = replaceholder;
