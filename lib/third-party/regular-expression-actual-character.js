// $<Vendor>$ char-regex (GitHub: https://github.com/Richienb/char-regex)(NPM: https://npmjs.com/package/char-regex)
// $<Note>$ With optimization.
const astralRange = "\\ud800-\\udfff",
	blackFlag = "(?:\\ud83c\\udff4\\udb40\\udc67\\udb40\\udc62\\udb40(?:\\udc65|\\udc73|\\udc77)\\udb40(?:\\udc6e|\\udc63|\\udc6c)\\udb40(?:\\udc67|\\udc74|\\udc73)\\udb40\\udc7f)",
	comboHalfMarksRange = "\\ufe20-\\ufe2f",
	comboMarksExtendedRange = "\\u1ab0-\\u1aff",
	comboMarksRange = "\\u0300-\\u036f",
	comboMarksSupplementRange = "\\u1dc0-\\u1dff",
	comboSymbolsRange = "\\u20d0-\\u20ff",
	fitz = "\\ud83c[\\udffb-\\udfff]",
	regional = "(?:\\ud83c[\\udde6-\\uddff]){2}",
	surrogatePair = "[\\ud800-\\udbff][\\udc00-\\udfff]",
	varRange = "\\ufe0e\\ufe0f",
	zeroWidthJoiner = "\\u200d";
const astral = `[${astralRange}]`,
	comboRange = comboMarksRange + comboHalfMarksRange + comboSymbolsRange + comboMarksExtendedRange + comboMarksSupplementRange,
	nonAstral = `[^${astralRange}]`,
	optVar = `[${varRange}]?`;
const combo = `[${comboRange}]`;
const modifier = `(?:${combo}|${fitz})`,
	nonAstralCombo = `${nonAstral}${combo}?`;
const optModifier = `${modifier}?`,
	symbol = `(?:${[blackFlag, nonAstralCombo, combo, regional, surrogatePair, astral].join("|")})`;
const optJoin = `(?:${zeroWidthJoiner}(?:${[nonAstral, regional, surrogatePair].join("|")})${optVar + optModifier})*`;
const seq = optVar + optModifier + optJoin;
const regularExpressionActualCharacter = new RegExp(`${fitz}(?=${fitz})|${symbol + seq}`, "g");
module.exports = regularExpressionActualCharacter;
