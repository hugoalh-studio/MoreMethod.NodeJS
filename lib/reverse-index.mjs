/**
 * @private
 * @function reverseIndexArray
 * @param {*[]} item
 * @returns {*[]}
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
 * @private
 * @function reverseIndexString
 * @param {string} item
 * @returns {string}
 */
function reverseIndexString(item) {
	let itemArray = item.split("");
	let resultObject = {};
	Promise.allSettled(
		itemArray.map((character, index) => {
			new Promise(() => {
				resultObject[(itemArray.length - 1) - index] = character;
			}).catch();
		})
	);
	return Object.values(resultObject).join("");
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
		return reverseIndexString(item);
	};
	throw new TypeError(`Argument \`item\` must be type of array or string!`);
};
module.exports = reverseIndex;
