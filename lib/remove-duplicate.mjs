import * as advancedDetermine from "@hugoalh/advanced-determine";
/**
 * @function removeDuplicate
 * @alias uniq
 * @alias unique
 * @description Remove all of the duplicated elements in the array.
 * @param {*[]} item Array that need to remove duplicated elements.
 * @returns {*[]} An array with unique elements.
 */
function removeDuplicate(item) {
	if (advancedDetermine.isArray(item) === false) {
		throw new TypeError(`Argument \`item\` must be type of array!`);
	};
	let result = [];
	item.forEach((element) => {
		let duplicated = false;
		for (let index = 0; index < result.length; index++) {
			if (advancedDetermine.areEqual(element, result[index]) === true) {
				duplicated = true;
				break;
			};
		};
		if (duplicated === false) {
			result.push(element);
		};
	});
	return result;
};
export default removeDuplicate;
