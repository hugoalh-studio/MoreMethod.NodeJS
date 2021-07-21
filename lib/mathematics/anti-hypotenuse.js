const hypotenuse = require("./hypotenuse.js");
/**
 * @function mathematics.antiHypotenuse
 * @alias math.antiHypot
 * @alias math.antiHypotenuse
 * @alias mathematics.antiHypot
 * @param {number} item1
 * @param {number} item2
 * @returns {number}
 */
function mathematicsAntiHypotenuse(item1, item2) {
	return hypotenuse(item1, item2, true);
};
module.exports = mathematicsAntiHypotenuse;
