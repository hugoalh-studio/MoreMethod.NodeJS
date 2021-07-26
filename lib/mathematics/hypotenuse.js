const advancedDetermine = require("@hugoalh/advanced-determine");
/**
 * @function mathematics.hypotenuse
 * @alias math.hypot
 * @alias math.hypotenuse
 * @alias mathematics.hypot
 * @description Calculate the hypotenusa with 2 of the values.
 * @param {number} item1
 * @param {number} item2
 * @param {boolean} [invertHypotenuse=false] Invert hypothenusa.
 * @returns {number} Value of the hypothenusa.
 */
function mathematicsHypotenuse(item1, item2, invertHypotenuse = false) {
	if (advancedDetermine.isNumber(item1) !== true) {
		throw new TypeError(`Argument \`item1\` must be type of number!`);
	};
	if (advancedDetermine.isNumber(item2) !== true) {
		throw new TypeError(`Argument \`item2\` must be type of number!`);
	};
	if (advancedDetermine.isBoolean(invertHypotenuse) !== true) {
		throw new TypeError(`Argument \`invertHypotenuse\` must be type of boolean!`);
	};
	return (invertHypotenuse === false) ? Math.sqrt((item1 * item1) + (item2 * item2)) : Math.sqrt((item1 * item1) - (item2 * item2));
};
module.exports = mathematicsHypotenuse;
