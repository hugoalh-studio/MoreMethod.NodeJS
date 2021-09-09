// $<Vendor>$ Char RegEx (GitHub: https://github.com/Richienb/char-regex)(NPM: https://npmjs.com/package/char-regex)
// $<Note>$ With optimization.
const astralRange = "\\ud800-\\udfff";
const blackFlag = "(?:\\ud83c\\udff4\\udb40\\udc67\\udb40\\udc62\\udb40(?:\\udc65|\\udc73|\\udc77)\\udb40(?:\\udc6e|\\udc63|\\udc6c)\\udb40(?:\\udc67|\\udc74|\\udc73)\\udb40\\udc7f)";
const comboHalfMarksRange = "\\ufe20-\\ufe2f";
const comboMarksExtendedRange = "\\u1ab0-\\u1aff";
const comboMarksRange = "\\u0300-\\u036f";
const comboMarksSupplementRange = "\\u1dc0-\\u1dff";
const comboSymbolsRange = "\\u20d0-\\u20ff";
const fitz = "\\ud83c[\\udffb-\\udfff]";
const regional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
const surrogatePair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
const varRange = "\\ufe0e\\ufe0f";
const zeroWidthJoiner = "\\u200d";
const astral = `[${astralRange}]`;
const comboRange = comboMarksRange + comboHalfMarksRange + comboSymbolsRange + comboMarksExtendedRange + comboMarksSupplementRange;
const nonAstral = `[^${astralRange}]`;
const optVar = `[${varRange}]?`;
const combo = `[${comboRange}]`;
const modifier = `(?:${combo}|${fitz})`;
const nonAstralCombo = `${nonAstral}${combo}?`;
const optModifier = `${modifier}?`;
const symbol = `(?:${[blackFlag, nonAstralCombo, combo, regional, surrogatePair, astral].join("|")})`;
const optJoin = `(?:${zeroWidthJoiner}(?:${[nonAstral, regional, surrogatePair].join("|")})${optVar + optModifier})*`;
const seq = optVar + optModifier + optJoin;
const charRegex = new RegExp(`${fitz}(?=${fitz})|${symbol + seq}`, "g");
module.exports = charRegex;
