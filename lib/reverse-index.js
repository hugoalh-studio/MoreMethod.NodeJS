/**
 * @private
 * @function reverseIndexArray
 * @param {any[]} item
 * @returns {any[]}
 */
function reverseIndexArray(item) {
	let resultObject = {};
	Promise.allSettled(
		item.map((element, index) => {
			new Promise(() => {
				resultObject[(item.length - 1) - index] = element;
			}).catch();
		})
	);
	return Object.values(resultObject);
};
/**
 * @function reverseIndex
 * @description Reverse index of an array or a string.
 * @param {(*[]|string)} item Array or string that need to reverse index.
 * @returns {(*[]|string)} An index reversed array or string.
 */
function reverseIndex(item) {
	if (Array.isArray(item) !== false) {
		return reverseIndexArray(item);
	};
	if (typeof item === "string") {
		return reverseIndexArray(item.split("")).join("");
	};
	throw new TypeError(`Argument \`item\` must be type of array or string!`);
};
module.exports = reverseIndex;
