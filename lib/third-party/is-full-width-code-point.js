// $<Vendor>$ is-fullwidth-code-point (GitHub: https://github.com/sindresorhus/is-fullwidth-code-point)(NPM: https://npmjs.com/package/is-fullwidth-code-point)
// $<Note>$ With optimization.
const advancedDetermine = require("@hugoalh/advanced-determine");
/**
 * @function isFullWidthCodePoint
 * @param {number} codePoint
 * @returns {boolean}
 */
function isFullWidthCodePoint(codePoint) {
	if (advancedDetermine.isNumberPositiveInteger(codePoint) !== true) {
		throw new TypeError(`Argument \`codepoint\` must be type of positive integer number!`);
	};
	return codePoint >= 0x1100 && (
		codePoint <= 0x115F ||
		codePoint === 0x2329 ||
		codePoint === 0x232A ||
		(codePoint >= 0x2E80 && codePoint <= 0x3247 && codePoint !== 0x303F) ||
		(codePoint >= 0x3250 && codePoint <= 0x4DBF) ||
		(codePoint >= 0x4E00 && codePoint <= 0xA4C6) ||
		(codePoint >= 0xA960 && codePoint <= 0xA97C) ||
		(codePoint >= 0xAC00 && codePoint <= 0xD7A3) ||
		(codePoint >= 0xF900 && codePoint <= 0xFAFF) ||
		(codePoint >= 0xFE10 && codePoint <= 0xFE19) ||
		(codePoint >= 0xFE30 && codePoint <= 0xFE6B) ||
		(codePoint >= 0xFF01 && codePoint <= 0xFF60) ||
		(codePoint >= 0xFFE0 && codePoint <= 0xFFE6) ||
		(codePoint >= 0x1B000 && codePoint <= 0x1B001) ||
		(codePoint >= 0x1F200 && codePoint <= 0x1F251) ||
		(codePoint >= 0x20000 && codePoint <= 0x3FFFD)
	);
};
module.exports = isFullWidthCodePoint;
