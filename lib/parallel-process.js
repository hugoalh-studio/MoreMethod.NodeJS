const advancedDetermine = require("@hugoalh/advanced-determine");
/**
 * @function parallelProcess
 * @param {(function|function[])} items
 * @returns {*[]}
 */
function parallelProcess(...items) {
	if (items.length === 0) {
		throw new Error(`Argument \`items\` is not defined!`);
	};
	if (items.length === 1 && advancedDetermine.isArray(items[0]) !== false) {
		items = items[0];
	};
	if (advancedDetermine.allIs("function", ...items) === false) {
		throw new TypeError(`Argument \`items\` must be type of functions!`);
	};
	let resultObject = {};
	Promise.allSettled(
		items.map((element, index) => {
			new Promise(() => {
				resultObject[index] = element();
			});
		})
	);
	return Object.values(resultObject);
};
module.exports = parallelProcess;
