const crypto = require("crypto");
/**
 * @function randomIndex
 * @description Random index of an array.
 * @param {any[]} item Array that need to random index.
 * @returns {any[]} An index randomed array.
 */
function randomIndex(item) {
	if (Array.isArray(item) === false) {
		throw new TypeError(`Argument \`item\` must be type of array!`);
	};
	if (item.length <= 1) {
		return item;
	};
	let itemClone = [...item],
		result = [];
	while (itemClone.length > 1) {
		let index = crypto.randomInt(0, itemClone.length);
		result.push(itemClone[index]);
		itemClone.splice(index, 1);
	};
	result.push(itemClone[0]);
	return result;
};
module.exports = randomIndex;
