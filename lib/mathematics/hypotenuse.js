const advancedDetermine = require("@hugoalh/advanced-determine");
/**
 * @function mathematics.hypotenuse
 * @alias math.hypot
 * @alias math.hypotenuse
 * @alias mathematics.hypot
 * @param {number} item1
 * @param {number} item2
 * @param {boolean} antiHypotenuse
 * @returns {number}
 */
function mathematicsHypotenuse(item1, item2, antiHypotenuse = false) {
	if (advancedDetermine.isNumber(item1) !== true) {
		throw new TypeError(`Argument \`item1\` must be type of number!`);
	};
	if (advancedDetermine.isNumber(item2) !== true) {
		throw new TypeError(`Argument \`item2\` must be type of number!`);
	};
	if (advancedDetermine.isBoolean(antiHypotenuse) !== true) {
		throw new TypeError(`Argument \`antiHypotenuse\` must be type of boolean!`);
	};
	return (antiHypotenuse === false) ? Math.sqrt((item1 * item1) + (item2 * item2)) : Math.sqrt((item1 * item1) - (item2 * item2));
};
module.exports = mathematicsHypotenuse;
