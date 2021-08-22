const advancedDetermine = require("@hugoalh/advanced-determine");
const checkOption = require("./internal/check-option.js");
/**
 * @function divide
 * @description Divide an array.
 * @param {any[]} item Array that need to divide.
 * @param {number} piece Divide to number of piece(s).
 * @param {object} [option={}] Option.
 * @param {string} [option.method="stack"] Method to divide.
 * @returns {any[][]} A divided array.
 */
function divide(item, piece, option = {}) {
	checkOption(option);
	let runtime = {
		method: "stack"
	};
	if (advancedDetermine.isArray(item) !== true) {
		throw new TypeError(`Argument \`item\` must be type of array (non-nullable)!`);
	};
	if (advancedDetermine.isNumberPositiveSafeInteger(piece) !== true) {
		throw new TypeError(`Argument \`piece\` must be type of positive safe integer number!`);
	};
	if (piece < 1) {
		throw new RangeError(`Argument \`piece\` must be >= 1!`);
	};
	if (typeof option.method !== "undefined") {
		if (advancedDetermine.isString(option.method) !== true) {
			throw new TypeError(`Argument \`option.method\` must be type of string (non-nullable)!`);
		};
		runtime.method = option.method;
	};
	let countGroupMin = Math.floor(item.length / piece);
	let countRemain = item.length % piece;
	let countGroupMax = ((countRemain > 0) ? countGroupMin + 1 : countGroupMin);
	let result = [];
	for (let index = 0; index < piece; index++) {
		result.push([]);
	};
	let column = 1;
	let row = 1;
	if (runtime.method.search(/^(?:cycle|round(?:-?bound)?)$/giu) === 0) {
		for (let index = 0; index < item.length; index++) {
			result[row - 1][column - 1] = item[index];
			row += 1;
			if (row > piece) {
				column += 1;
				row = 1;
			};
		};
	} else if (runtime.method.search(/^stack$/giu) === 0) {
		for (let index = 0; index < item.length; index++) {
			result[row - 1][column - 1] = item[index];
			column += 1;
			if (column > ((row <= countRemain) ? countGroupMax : countGroupMin)) {
				column = 1;
				row += 1;
			};
		};
	} else {
		throw new SyntaxError(`Argument \`option.method\`'s value is not in the list!`);
	};
	return result;
};
module.exports = divide;
