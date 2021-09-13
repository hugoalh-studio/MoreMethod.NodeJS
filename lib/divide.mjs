import * as advancedDetermine from "@hugoalh/advanced-determine";
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
	if (advancedDetermine.isObjectPair(option) === false) {
		throw new TypeError(`Argument \`option\` must be type of object pair!`);
	};
	if (advancedDetermine.isArray(item) !== true) {
		throw new TypeError(`Argument \`item\` must be type of array (non-nullable)!`);
	};
	if (
		advancedDetermine.isNumber(piece, { finite: true, integer: true, positive: true, safe: true }) !== true ||
		piece < 1
	) {
		throw new TypeError(`Argument \`piece\` must be type of number (finite, integer, positive, and safe) and > 0!`);
	};
	option.method = ((typeof option.method === "undefined") ? "stack" : option.method);
	if (advancedDetermine.isString(option.method) !== true) {
		throw new TypeError(`Argument \`option.method\` must be type of string (non-nullable)!`);
	};
	let groupMinimum = Math.floor(item.length / piece);
	let remain = item.length % piece;
	let groupMaximum = ((remain > 0) ? groupMinimum + 1 : groupMinimum);
	let result = [];
	for (let index = 0; index < piece; index++) {
		result.push([]);
	};
	let column = 1;
	let row = 1;
	if (option.method.search(/^(?:cycle|round(?:-?bound)?)$/giu) === 0) {
		for (let index = 0; index < item.length; index++) {
			result[row - 1][column - 1] = item[index];
			row += 1;
			if (row > piece) {
				column += 1;
				row = 1;
			};
		};
	} else if (option.method.search(/^stack$/giu) === 0) {
		for (let index = 0; index < item.length; index++) {
			result[row - 1][column - 1] = item[index];
			column += 1;
			if (column > ((row <= remain) ? groupMaximum : groupMinimum)) {
				column = 1;
				row += 1;
			};
		};
	} else {
		throw new SyntaxError(`Argument \`option.method\`'s value is not in the list!`);
	};
	return result;
};
export default divide;
