const mathematicshypotenuse = require("./hypotenuse.js");
/**
 * @function mathematics.invertHypotenuse
 * @alias math.invertHypot
 * @alias math.invertHypotenuse
 * @alias mathematics.invertHypot
 * @description Calculate the invert hypotenusa with 2 of the values.
 * @param {number} item1
 * @param {number} item2
 * @returns {number} Value of the invert hypothenusa.
 */
function mathematicsInvertHypotenuse(item1, item2) {
	return mathematicshypotenuse(item1, item2, true);
};
module.exports = mathematicsInvertHypotenuse;
