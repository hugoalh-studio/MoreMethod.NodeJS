const advancedDetermine = require("@hugoalh/advanced-determine");
/**
 * @function mathematics.root
 * @alias math.root
 * @param {number} base
 * @param {number} root
 * @returns {number}
 */
function mathematicsRoot(base, root) {
	if (advancedDetermine.isNumber(base) !== true) {
		throw new TypeError(`Argument \`base\` must be type of number!`);
	};
	if (advancedDetermine.isNumber(root) !== true) {
		throw new TypeError(`Argument \`root\` must be type of number!`);
	};
	return Math.pow(base, (1 / root));
};
module.exports = mathematicsRoot;
