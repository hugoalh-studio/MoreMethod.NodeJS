// $<Vendor>$ JMESPath (GitHub: https://github.com/jmespath/jmespath.js)(NPM: https://npmjs.com/package/jmespath)
// $<Note>$ (See ./CHANGELOG.md.)
// Type constants used to define functions.
class LexerError extends Error {
	constructor(message) {
		super(message);
		this.name = "LexerError";
	};
};
class ParserError extends Error {
	constructor(message) {
		super(message);
		this.name = "ParserError";
	};
};
class RuntimeError extends Error {
	constructor(message) {
		super(message);
		this.name = "RuntimeError";
	};
};
const TYPE_NUMBER = 0;
const TYPE_ANY = 1;
const TYPE_STRING = 2;
const TYPE_ARRAY = 3;
const TYPE_OBJECT = 4;
const TYPE_BOOLEAN = 5;
const TYPE_EXPREF = 6;
const TYPE_NULL = 7;
const TYPE_ARRAY_NUMBER = 8;
const TYPE_ARRAY_STRING = 9;
const TYPE_NAME_TABLE = {
	0: "number",
	1: "any",
	2: "string",
	3: "array",
	4: "object",
	5: "boolean",
	6: "expression",
	7: "null",
	8: "Array<number>",
	9: "Array<string>"
};
const TOK_AND = "And";
const TOK_COLON = "Colon";
const TOK_COMMA = "Comma";
const TOK_CURRENT = "Current";
const TOK_DOT = "Dot";
const TOK_EOF = "EOF";
const TOK_EQ = "EQ";
const TOK_EXPREF = "Expref";
const TOK_FILTER = "Filter";
const TOK_FLATTEN = "Flatten";
const TOK_GT = "GT";
const TOK_GTE = "GTE";
const TOK_LBRACE = "Lbrace";
const TOK_LBRACKET = "Lbracket";
const TOK_LITERAL = "Literal";
const TOK_LPAREN = "Lparen";
const TOK_LT = "LT";
const TOK_LTE = "LTE";
const TOK_NE = "NE";
const TOK_NOT = "Not";
const TOK_NUMBER = "Number";
const TOK_OR = "Or";
const TOK_PIPE = "Pipe";
const TOK_QUOTEDIDENTIFIER = "QuotedIdentifier";
const TOK_RBRACE = "Rbrace";
const TOK_RBRACKET = "Rbracket";
const TOK_ROOT = "Root";
const TOK_RPAREN = "Rparen";
const TOK_STAR = "Star";
const TOK_UNQUOTEDIDENTIFIER = "UnquotedIdentifier";
// The "&", "[", "<", ">" tokens are not in basicToken because there are two token variants ("&&", "[?", "<=", ">="). This is specially handled below.
const BASICTOKENS = {
	",": TOK_COMMA,
	":": TOK_COLON,
	".": TOK_DOT,
	"(": TOK_LPAREN,
	")": TOK_RPAREN,
	"]": TOK_RBRACKET,
	"{": TOK_LBRACE,
	"}": TOK_RBRACE,
	"@": TOK_CURRENT,
	"*": TOK_STAR,
	"$": TOK_ROOT
};
const OPERATORSTARTTOKEN = {
	"!": true,
	"<": true,
	"=": true,
	">": true
};
const SKIPCHARS = {
	" ": true,
	"\n": true,
	"\r": true,
	"\t": true
};
let bindingPower = {};
bindingPower[TOK_AND] = 3;
bindingPower[TOK_COMMA] = 0;
bindingPower[TOK_CURRENT] = 0;
bindingPower[TOK_DOT] = 40;
bindingPower[TOK_EOF] = 0;
bindingPower[TOK_EQ] = 5;
bindingPower[TOK_EXPREF] = 0;
bindingPower[TOK_FILTER] = 21;
bindingPower[TOK_FLATTEN] = 9;
bindingPower[TOK_GT] = 5;
bindingPower[TOK_GTE] = 5;
bindingPower[TOK_LBRACE] = 50;
bindingPower[TOK_LBRACKET] = 55;
bindingPower[TOK_LPAREN] = 60;
bindingPower[TOK_LT] = 5;
bindingPower[TOK_LTE] = 5;
bindingPower[TOK_NE] = 5;
bindingPower[TOK_NOT] = 45;
bindingPower[TOK_NUMBER] = 0;
bindingPower[TOK_OR] = 2;
bindingPower[TOK_PIPE] = 1;
bindingPower[TOK_QUOTEDIDENTIFIER] = 0;
bindingPower[TOK_RBRACE] = 0;
bindingPower[TOK_RBRACKET] = 0;
bindingPower[TOK_ROOT] = 0;
bindingPower[TOK_RPAREN] = 0;
bindingPower[TOK_STAR] = 20;
bindingPower[TOK_UNQUOTEDIDENTIFIER] = 0;
// ISSUE: Key "Not", "Star", "Flatten", "Expref", "Dot", "Pipe", "Or", "And", and "Filter" is called but missing at here and not assigned anywhere; Useless call or conventation issue???
function isObject(obj) {
	if (obj === null) {
		return false;
	};
	return Object.prototype.toString.call(obj) === "[object Object]";
};
function areEqual(first, second) {
	// Check the scalar case first.
	if (first === second) {
		return true;
	};
	// Check if they are the same type.
	if (Object.prototype.toString.call(first) !== Object.prototype.toString.call(second)) {
		return false;
	};
	// We know that first and second have the same type so we can just check the first type from now on.
	if (Array.isArray(first) === true) {
		// Short circuit if they're not the same length;
		if (first.length !== second.length) {
			return false;
		};
		for (let i = 0; i < first.length; i++) {
			if (areEqual(first[i], second[i]) === false) {
				return false;
			};
		};
		return true;
	};
	if (isObject(first) === true) {
		// An object is equal if it has the same key/value pairs.
		let keysSeen = {};
		for (let key in first) {
			if (Object.hasOwnProperty.call(first, key)) {
				if (areEqual(first[key], second[key]) === false) {
					return false;
				};
				keysSeen[key] = true;
			};
		};
		// Now check that there aren't any keys in second that weren't in first.
		for (let key2 in second) {
			if (Object.hasOwnProperty.call(second, key2)) {
				if (keysSeen[key2] !== true) {
					return false;
				};
			};
		};
		return true;
	};
	return false;
};
function isFalse(item) {
	// A false value corresponds to the following values: empty array, empty object, empty string, false boolean, null value; First check the scalar values.
	if (
		item === "" ||
		item === false ||
		item === null ||
		(Array.isArray(item) && item.length === 0)
	) {
		return true;
	};
	if (isObject(item)) {
		return (Object.keys(item).length === 0);
	};
	return false;
};
function looksLikeJSON(literalString) {
	let startingChars = "[{\"";
	let jsonLiterals = ["true", "false", "null"];
	let numberLooking = "-0123456789";
	if (literalString === "") {
		return false;
	};
	if (
		startingChars.indexOf(literalString[0]) >= 0 ||
		jsonLiterals.indexOf(literalString) >= 0
	) {
		return true;
	};
	if (numberLooking.indexOf(literalString[0]) >= 0) {
		try {
			JSON.parse(literalString);
			return true;
		} catch {
			return false;
		};
	};
	return false;
};
function errorToken(token) {
	throw new ParserError(`Invalid token (${token.type}): "${token.value}"`);
};
function capSliceRange(arrayLength, actualValue, step) {
	if (actualValue < 0) {
		actualValue += arrayLength;
		if (actualValue < 0) {
			actualValue = step < 0 ? -1 : 0;
		};
	} else if (actualValue >= arrayLength) {
		actualValue = step < 0 ? arrayLength - 1 : arrayLength;
	};
	return actualValue;
};
function computeSliceParams(arrayLength, sliceParams) {
	let start = sliceParams[0];
	let stop = sliceParams[1];
	let step = sliceParams[2];
	let computed = [null, null, null];
	if (step === null) {
		step = 1;
	} else if (step === 0) {
		throw new RuntimeError("Invalid slice, step cannot be 0");
	};
	let stepValueNegative = step < 0;
	if (start === null) {
		start = stepValueNegative ? arrayLength - 1 : 0;
	} else {
		start = capSliceRange(arrayLength, start, step);
	};
	if (stop === null) {
		stop = stepValueNegative ? -1 : arrayLength;
	} else {
		stop = capSliceRange(arrayLength, stop, step);
	};
	computed[0] = start;
	computed[1] = stop;
	computed[2] = step;
	return computed;
};
function isAlpha(character) {
	return (character.search(/^[A-Za-z_]$/gu) === 0);
};
function isNum(character) {
	return (character.search(/^[\d-]$/gu) === 0);
};
function isAlphaNum(character) {
	return (character.search(/^[\dA-Za-z_]$/gu) === 0);
};
function getTypeName(obj) {
	switch (Object.prototype.toString.call(obj)) {
		case "[object String]":
			return TYPE_STRING;
		case "[object Number]":
			return TYPE_NUMBER;
		case "[object Array]":
			return TYPE_ARRAY;
		case "[object Boolean]":
			return TYPE_BOOLEAN;
		case "[object Null]":
			return TYPE_NULL;
		case "[object Object]":
			// Check if it's an expref. If it has, it's been tagged with a jmespathType attr of 'Expref';
			if (obj.jmespathType === TOK_EXPREF) {
				return TYPE_EXPREF;
			};
			return TYPE_OBJECT;
		default:
			return undefined;
	};
};
function _functionStartsWith(resolvedArgs) {
	return resolvedArgs[0].startsWith(resolvedArgs[1]);
};
function _functionEndsWith(resolvedArgs) {
	let searchStr = resolvedArgs[0];
	let suffix = resolvedArgs[1];
	return searchStr.indexOf(suffix, searchStr.length - suffix.length) !== -1;
};
function _functionReverse(resolvedArgs) {
	if (getTypeName(resolvedArgs[0]) === TYPE_STRING) {
		let originalStr = resolvedArgs[0];
		let reversedStr = "";
		for (let i = originalStr.length - 1; i >= 0; i--) {
			reversedStr += originalStr[i];
		};
		return reversedStr;
	};
	return resolvedArgs[0].slice(0).reverse();
};
function _functionAbs(resolvedArgs) {
	return Math.abs(resolvedArgs[0]);
};
function _functionCeil(resolvedArgs) {
	return Math.ceil(resolvedArgs[0]);
};
function _functionAvg(resolvedArgs) {
	let sum = 0;
	let inputArray = resolvedArgs[0];
	for (let i = 0; i < inputArray.length; i++) {
		sum += inputArray[i];
	};
	return (sum / inputArray.length);
};
function _functionContains(resolvedArgs) {
	return resolvedArgs[0].indexOf(resolvedArgs[1]) >= 0;
};
function _functionFloor(resolvedArgs) {
	return Math.floor(resolvedArgs[0]);
};
function _functionLength(resolvedArgs) {
	if (!isObject(resolvedArgs[0])) {
		return resolvedArgs[0].length;
	};
	return Object.keys(resolvedArgs[0]).length;
};
function _functionMerge(resolvedArgs) {
	let merged = {};
	for (let i = 0; i < resolvedArgs.length; i++) {
		let current = resolvedArgs[i];
		for (let key in current) {
			merged[key] = current[key];
		};
	};
	return merged;
};
function _functionMax(resolvedArgs) {
	if (resolvedArgs[0].length > 0) {
		if (getTypeName(resolvedArgs[0][0]) === TYPE_NUMBER) {
			return Math.max.apply(Math, resolvedArgs[0]);
		};
		let elements = resolvedArgs[0];
		let maxElement = elements[0];
		for (let i = 1; i < elements.length; i++) {
			if (maxElement.localeCompare(elements[i]) < 0) {
				maxElement = elements[i];
			};
		};
		return maxElement;
	};
	return null;
};
function _functionMin(resolvedArgs) {
	if (resolvedArgs[0].length > 0) {
		if (getTypeName(resolvedArgs[0][0]) === TYPE_NUMBER) {
			return Math.min.apply(Math, resolvedArgs[0]);
		};
		let elements = resolvedArgs[0];
		let minElement = elements[0];
		for (let i = 1; i < elements.length; i++) {
			if (elements[i].localeCompare(minElement) < 0) {
				minElement = elements[i];
			};
		};
		return minElement;
	};
	return null;
};
function _functionSum(resolvedArgs) {
	let sum = 0;
	let listToSum = resolvedArgs[0];
	for (let i = 0; i < listToSum.length; i++) {
		sum += listToSum[i];
	};
	return sum;
};
function _functionType(resolvedArgs) {
	switch (getTypeName(resolvedArgs[0])) {
		case TYPE_NUMBER:
			return "number";
		case TYPE_STRING:
			return "string";
		case TYPE_ARRAY:
			return "array";
		case TYPE_OBJECT:
			return "object";
		case TYPE_BOOLEAN:
			return "boolean";
		case TYPE_EXPREF:
			return "expref";
		case TYPE_NULL:
			return "null";
	};
};
function _functionKeys(resolvedArgs) {
	return Object.keys(resolvedArgs[0]);
};
function _functionValues(resolvedArgs) {
	return Object.values(resolvedArgs[0]);
};
function _functionJoin(resolvedArgs) {
	return resolvedArgs[1].join(resolvedArgs[0]);
};
function _functionToArray(resolvedArgs) {
	if (getTypeName(resolvedArgs[0]) === TYPE_ARRAY) {
		return resolvedArgs[0];
	};
	return [resolvedArgs[0]];
};
function _functionToString(resolvedArgs) {
	if (getTypeName(resolvedArgs[0]) === TYPE_STRING) {
		return resolvedArgs[0];
	};
	return JSON.stringify(resolvedArgs[0]);
};
function _functionToNumber(resolvedArgs) {
	let typeName = getTypeName(resolvedArgs[0]);
	let convertedValue;
	if (typeName === TYPE_NUMBER) {
		return resolvedArgs[0];
	} else if (typeName === TYPE_STRING) {
		convertedValue = +resolvedArgs[0];
		if (!isNaN(convertedValue)) {
			return convertedValue;
		};
	};
	return null;
};
function _functionNotNull(resolvedArgs) {
	for (let i = 0; i < resolvedArgs.length; i++) {
		if (getTypeName(resolvedArgs[i]) !== TYPE_NULL) {
			return resolvedArgs[i];
		};
	};
	return null;
};
function _functionSort(resolvedArgs) {
	return resolvedArgs[0].slice(0).sort();
};
class JMESPath {
	constructor() {
		this._runtimeFunctionTable = {
			// name: [function, <signature>]
			// The <signature> can be: { args: [[type1, type2], [type1, type2]], variadic: true|false }
			// Each arg in the arg list is a list of valid types (if the function is overloaded and supports multiple types. If the type is "any" then no type checking occurs on the argument. Variadic is optional and if not provided is assumed to be false.
			"abs": {
				_func: _functionAbs,
				_signature: [{ types: [TYPE_NUMBER] }]
			},
			"avg": {
				_func: _functionAvg,
				_signature: [{ types: [TYPE_ARRAY_NUMBER] }]
			},
			"ceil": {
				_func: _functionCeil,
				_signature: [{ types: [TYPE_NUMBER] }]
			},
			"contains": {
				_func: _functionContains,
				_signature: [{ types: [TYPE_STRING, TYPE_ARRAY] }, { types: [TYPE_ANY] }]
			},
			"ends_with": {
				_func: _functionEndsWith,
				_signature: [{ types: [TYPE_STRING] }, { types: [TYPE_STRING] }]
			},
			"floor": {
				_func: _functionFloor,
				_signature: [{ types: [TYPE_NUMBER] }]
			},
			"length": {
				_func: _functionLength,
				_signature: [{ types: [TYPE_STRING, TYPE_ARRAY, TYPE_OBJECT] }]
			},
			"map": {
				_func: this._functionMap,
				_signature: [{ types: [TYPE_EXPREF] }, { types: [TYPE_ARRAY] }]
			},
			"max": {
				_func: _functionMax,
				_signature: [{ types: [TYPE_ARRAY_NUMBER, TYPE_ARRAY_STRING] }]
			},
			"merge": {
				_func: _functionMerge,
				_signature: [{ types: [TYPE_OBJECT], variadic: true }]
			},
			"max_by": {
				_func: this._functionMaxBy,
				_signature: [{ types: [TYPE_ARRAY] }, { types: [TYPE_EXPREF] }]
			},
			"sum": {
				_func: _functionSum,
				_signature: [{ types: [TYPE_ARRAY_NUMBER] }]
			},
			"starts_with": {
				_func: _functionStartsWith,
				_signature: [{ types: [TYPE_STRING] }, { types: [TYPE_STRING] }]
			},
			"min": {
				_func: _functionMin,
				_signature: [{ types: [TYPE_ARRAY_NUMBER, TYPE_ARRAY_STRING] }]
			},
			"min_by": {
				_func: this._functionMinBy,
				_signature: [{ types: [TYPE_ARRAY] }, { types: [TYPE_EXPREF] }]
			},
			"type": {
				_func: _functionType,
				_signature: [{ types: [TYPE_ANY] }]
			},
			"keys": {
				_func: _functionKeys,
				_signature: [{ types: [TYPE_OBJECT] }]
			},
			"values": {
				_func: _functionValues,
				_signature: [{ types: [TYPE_OBJECT] }]
			},
			"sort": {
				_func: _functionSort,
				_signature: [{ types: [TYPE_ARRAY_STRING, TYPE_ARRAY_NUMBER] }]
			},
			"sort_by": {
				_func: this._functionSortBy,
				_signature: [{ types: [TYPE_ARRAY] }, { types: [TYPE_EXPREF] }]
			},
			"join": {
				_func: _functionJoin,
				_signature: [{ types: [TYPE_STRING] }, { types: [TYPE_ARRAY_STRING] }]
			},
			"reverse": {
				_func: _functionReverse,
				_signature: [{ types: [TYPE_STRING, TYPE_ARRAY] }]
			},
			"to_array": {
				_func: _functionToArray,
				_signature: [{ types: [TYPE_ANY] }]
			},
			"to_string": {
				_func: _functionToString,
				_signature: [{ types: [TYPE_ANY] }]
			},
			"to_number": {
				_func: _functionToNumber,
				_signature: [{ types: [TYPE_ANY] }]
			},
			"not_null": {
				_func: _functionNotNull,
				_signature: [{ types: [TYPE_ANY], variadic: true }]
			}
		};
	};
	_tokenize(stream) {
		let tokens = [];
		this._lexerCurrent = 0;
		let start;
		let identifier;
		let token;
		while (this._lexerCurrent < stream.length) {
			if (isAlpha(stream[this._lexerCurrent])) {
				start = this._lexerCurrent;
				identifier = this._consumeUnquotedIdentifier(stream);
				tokens.push({
					type: TOK_UNQUOTEDIDENTIFIER,
					value: identifier,
					start: start
				});
			} else if (BASICTOKENS[stream[this._lexerCurrent]] !== undefined) {
				tokens.push({
					type: BASICTOKENS[stream[this._lexerCurrent]],
					value: stream[this._lexerCurrent],
					start: this._lexerCurrent
				});
				this._lexerCurrent++;
			} else if (isNum(stream[this._lexerCurrent])) {
				token = this._consumeNumber(stream);
				tokens.push(token);
			} else if (stream[this._lexerCurrent] === "[") {
				// No need to increment this._current. This happens in _consumeLBracket
				token = this._consumeLBracket(stream);
				tokens.push(token);
			} else if (stream[this._lexerCurrent] === "\"") {
				start = this._lexerCurrent;
				identifier = this._consumeQuotedIdentifier(stream);
				tokens.push({
					type: TOK_QUOTEDIDENTIFIER,
					value: identifier,
					start: start
				});
			} else if (stream[this._lexerCurrent] === "'") {
				start = this._lexerCurrent;
				identifier = this._consumeRawStringLiteral(stream);
				tokens.push({
					type: TOK_LITERAL,
					value: identifier,
					start: start
				});
			} else if (stream[this._lexerCurrent] === "`") {
				start = this._lexerCurrent;
				let literal = this._consumeLiteral(stream);
				tokens.push({
					type: TOK_LITERAL,
					value: literal,
					start: start
				});
			} else if (OPERATORSTARTTOKEN[stream[this._lexerCurrent]] !== undefined) {
				tokens.push(this._consumeOperator(stream));
			} else if (SKIPCHARS[stream[this._lexerCurrent]] !== undefined) {
				// Ignore whitespace.
				this._lexerCurrent++;
			} else if (stream[this._lexerCurrent] === "&") {
				start = this._lexerCurrent;
				this._lexerCurrent++;
				if (stream[this._lexerCurrent] === "&") {
					this._lexerCurrent++;
					tokens.push({
						type: TOK_AND,
						value: "&&",
						start: start
					});
				} else {
					tokens.push({
						type: TOK_EXPREF,
						value: "&",
						start: start
					});
				};
			} else if (stream[this._lexerCurrent] === "|") {
				start = this._lexerCurrent;
				this._lexerCurrent++;
				if (stream[this._lexerCurrent] === "|") {
					this._lexerCurrent++;
					tokens.push({
						type: TOK_OR,
						value: "||",
						start: start
					});
				} else {
					tokens.push({
						type: TOK_PIPE,
						value: "|",
						start: start
					});
				};
			} else {
				throw new LexerError(`Unknown character:${stream[this._lexerCurrent]}`);
			};
		};
		return tokens;
	};
	_consumeUnquotedIdentifier(stream) {
		let start = this._lexerCurrent;
		this._lexerCurrent++;
		while (this._lexerCurrent < stream.length && isAlphaNum(stream[this._lexerCurrent])) {
			this._lexerCurrent++;
		};
		return stream.slice(start, this._lexerCurrent);
	};
	_consumeQuotedIdentifier(stream) {
		let start = this._lexerCurrent;
		this._lexerCurrent++;
		let maxLength = stream.length;
		while (stream[this._lexerCurrent] !== "\"" && this._lexerCurrent < maxLength) {
			// You can escape a double quote and you can escape an escape.
			let current = this._lexerCurrent;
			if (stream[current] === "\\" && (stream[current + 1] === "\\" ||
				stream[current + 1] === "\"")) {
				current += 2;
			} else {
				current++;
			};
			this._lexerCurrent = current;
		};
		this._lexerCurrent++;
		return JSON.parse(stream.slice(start, this._lexerCurrent));
	};
	_consumeRawStringLiteral(stream) {
		let start = this._lexerCurrent;
		this._lexerCurrent++;
		let maxLength = stream.length;
		while (stream[this._lexerCurrent] !== "'" && this._lexerCurrent < maxLength) {
			// You can escape a single quote and you can escape an escape.
			let current = this._lexerCurrent;
			if (stream[current] === "\\" && (stream[current + 1] === "\\" ||
				stream[current + 1] === "'")) {
				current += 2;
			} else {
				current++;
			};
			this._lexerCurrent = current;
		};
		this._lexerCurrent++;
		let literal = stream.slice(start + 1, this._lexerCurrent - 1);
		return literal.replace("\\'", "'");
	};
	_consumeNumber(stream) {
		let start = this._lexerCurrent;
		this._lexerCurrent++;
		let maxLength = stream.length;
		while (isNum(stream[this._lexerCurrent]) && this._lexerCurrent < maxLength) {
			this._lexerCurrent++;
		};
		let value = parseInt(stream.slice(start, this._lexerCurrent));
		return {
			type: TOK_NUMBER,
			value: value,
			start: start
		};
	};
	_consumeLBracket(stream) {
		let start = this._lexerCurrent;
		this._lexerCurrent++;
		if (stream[this._lexerCurrent] === "?") {
			this._lexerCurrent++;
			return {
				type: TOK_FILTER,
				value: "[?",
				start: start
			};
		} else if (stream[this._lexerCurrent] === "]") {
			this._lexerCurrent++;
			return {
				type: TOK_FLATTEN,
				value: "[]",
				start: start
			};
		};
		return {
			type: TOK_LBRACKET,
			value: "[",
			start: start
		};
	};
	_consumeOperator(stream) {
		let start = this._lexerCurrent;
		let startingChar = stream[start];
		this._lexerCurrent++;
		if (startingChar === "!") {
			if (stream[this._lexerCurrent] === "=") {
				this._lexerCurrent++;
				return {
					type: TOK_NE,
					value: "!=",
					start: start
				};
			};
			return {
				type: TOK_NOT,
				value: "!",
				start: start
			};
		} else if (startingChar === "<") {
			if (stream[this._lexerCurrent] === "=") {
				this._lexerCurrent++;
				return {
					type: TOK_LTE,
					value: "<=",
					start: start
				};
			};
			return {
				type: TOK_LT,
				value: "<",
				start: start
			};
		} else if (startingChar === ">") {
			if (stream[this._lexerCurrent] === "=") {
				this._lexerCurrent++;
				return {
					type: TOK_GTE,
					value: ">=",
					start: start
				};
			};
			return {
				type: TOK_GT,
				value: ">",
				start: start
			};
		} else if (startingChar === "=") {
			if (stream[this._lexerCurrent] === "=") {
				this._lexerCurrent++;
				return {
					type: TOK_EQ,
					value: "==",
					start: start
				};
			};
		};
	};
	_consumeLiteral(stream) {
		this._lexerCurrent++;
		let start = this._lexerCurrent;
		let maxLength = stream.length;
		let literal;
		while (stream[this._lexerCurrent] !== "`" && this._lexerCurrent < maxLength) {
			// You can escape a literal char or you can escape the escape.
			let current = this._lexerCurrent;
			if (stream[current] === "\\" && (stream[current + 1] === "\\" ||
				stream[current + 1] === "`")) {
				current += 2;
			} else {
				current++;
			};
			this._lexerCurrent = current;
		};
		let literalString = stream.slice(start, this._lexerCurrent).trimStart();
		literalString = literalString.replace("\\`", "`");
		if (looksLikeJSON(literalString)) {
			literal = JSON.parse(literalString);
		} else {
			// Try to JSON parse it as "<literal>"
			literal = JSON.parse(`"${literalString}"`);
		};
		// +1 gets us to the ending "`", +1 to move on to the next char.
		this._lexerCurrent++;
		return literal;
	};
	_parse(expression) {
		this._loadTokens(expression);
		this._parserIndex = 0;
		let ast = this._expression(0);
		if (this._lookahead(0) !== TOK_EOF) {
			let t = this._lookaheadToken(0);
			throw new ParserError(`Unexpected token type: ${t.type}, value: ${t.value}`);
		};
		return ast;
	};
	_loadTokens(expression) {
		let tokens = this._tokenize(expression);
		tokens.push({
			type: TOK_EOF,
			value: "",
			start: expression.length
		});
		this._parserTokens = tokens;
	};
	_expression(rbp) {
		let leftToken = this._lookaheadToken(0);
		this._advance();
		let left = this._nud(leftToken);
		let currentToken = this._lookahead(0);
		while (rbp < bindingPower[currentToken]) {
			this._advance();
			left = this._led(currentToken, left);
			currentToken = this._lookahead(0);
		};
		return left;
	};
	_lookahead(number) {
		return this._parserTokens[this._parserIndex + number].type;
	};
	_lookaheadToken(number) {
		return this._parserTokens[this._parserIndex + number];
	};
	_advance() {
		this._parserIndex++;
	};
	_nud(token) {
		let expression;
		let left;
		let right;
		switch (token.type) {
			case TOK_LITERAL:
				return {
					type: "Literal",
					value: token.value
				};
			case TOK_UNQUOTEDIDENTIFIER:
				return {
					type: "Field",
					name: token.value
				};
			case TOK_QUOTEDIDENTIFIER:
				let node = {
					type: "Field",
					name: token.value
				};
				if (this._lookahead(0) === TOK_LPAREN) {
					throw new Error("Quoted identifier not allowed for function names.");
				};
				return node;
			case TOK_NOT:
				right = this._expression(bindingPower.Not);
				return {
					type: "NotExpression",
					children: [right]
				};
			case TOK_STAR:
				left = { type: "Identity" };
				right = null;
				if (this._lookahead(0) === TOK_RBRACKET) {
					// This can happen in a multiselect, [a, b, *]
					right = { type: "Identity" };
				} else {
					right = this._parseProjectionRHS(bindingPower.Star);
				};
				return {
					type: "ValueProjection",
					children: [left, right]
				};
			case TOK_FILTER:
				return this._led(token.type, { type: "Identity" });
			case TOK_LBRACE:
				return this._parseMultiselectHash();
			case TOK_FLATTEN:
				left = {
					type: TOK_FLATTEN,
					children: [{ type: "Identity" }]
				};
				right = this._parseProjectionRHS(bindingPower.Flatten);
				return {
					type: "Projection",
					children: [left, right]
				};
			case TOK_LBRACKET:
				if (this._lookahead(0) === TOK_NUMBER || this._lookahead(0) === TOK_COLON) {
					right = this._parseIndexExpression();
					return this._projectIfSlice({ type: "Identity" }, right);
				} else if (this._lookahead(0) === TOK_STAR &&
					this._lookahead(1) === TOK_RBRACKET) {
					this._advance();
					this._advance();
					right = this._parseProjectionRHS(bindingPower.Star);
					return {
						type: "Projection",
						children: [{ type: "Identity" }, right]
					};
				};
				return this._parseMultiselectList();
			case TOK_CURRENT:
				return { type: TOK_CURRENT };
			case TOK_EXPREF:
				expression = this._expression(bindingPower.Expref);
				return {
					type: "ExpressionReference",
					children: [expression]
				};
			case TOK_LPAREN:
				let args = [];
				while (this._lookahead(0) !== TOK_RPAREN) {
					if (this._lookahead(0) === TOK_CURRENT) {
						expression = { type: TOK_CURRENT };
						this._advance();
					} else {
						expression = this._expression(0);
					};
					args.push(expression);
				};
				this._match(TOK_RPAREN);
				return args[0];
			case TOK_ROOT:
				return { type: TOK_ROOT };
			default:
				errorToken(token);
		};
	};
	_led(tokenName, left) {
		let right;
		switch (tokenName) {
			case TOK_DOT:
				let rbp = bindingPower.Dot;
				if (this._lookahead(0) !== TOK_STAR) {
					right = this._parseDotRHS(rbp);
					return {
						type: "Subexpression",
						children: [left, right]
					};
				};
				// Creating a projection.
				this._advance();
				right = this._parseProjectionRHS(rbp);
				return {
					type: "ValueProjection",
					children: [left, right]
				};
			case TOK_PIPE:
				right = this._expression(bindingPower.Pipe);
				return {
					type: TOK_PIPE,
					children: [left, right]
				};
			case TOK_OR:
				right = this._expression(bindingPower.Or);
				return {
					type: "OrExpression",
					children: [left, right]
				};
			case TOK_AND:
				right = this._expression(bindingPower.And);
				return {
					type: "AndExpression",
					children: [left, right]
				};
			case TOK_LPAREN:
				let args = [];
				let expression;
				let name = left.name;
				let node;
				while (this._lookahead(0) !== TOK_RPAREN) {
					if (this._lookahead(0) === TOK_CURRENT) {
						expression = { type: TOK_CURRENT };
						this._advance();
					} else {
						expression = this._expression(0);
					};
					if (this._lookahead(0) === TOK_COMMA) {
						this._match(TOK_COMMA);
					};
					args.push(expression);
				};
				this._match(TOK_RPAREN);
				node = {
					type: "Function",
					name: name,
					children: args
				};
				return node;
			case TOK_FILTER:
				let condition = this._expression(0);
				this._match(TOK_RBRACKET);
				if (this._lookahead(0) === TOK_FLATTEN) {
					right = { type: "Identity" };
				} else {
					right = this._parseProjectionRHS(bindingPower.Filter);
				};
				return {
					type: "FilterProjection",
					children: [left, right, condition]
				};
			case TOK_FLATTEN:
				let leftNode = {
					type: TOK_FLATTEN,
					children: [left]
				};
				let rightNode = this._parseProjectionRHS(bindingPower.Flatten);
				return {
					type: "Projection",
					children: [leftNode, rightNode]
				};
			case TOK_EQ:
			case TOK_GT:
			case TOK_GTE:
			case TOK_LT:
			case TOK_LTE:
			case TOK_NE:
				return this._parseComparator(left, tokenName);
			case TOK_LBRACKET:
				let token = this._lookaheadToken(0);
				if (token.type === TOK_NUMBER || token.type === TOK_COLON) {
					right = this._parseIndexExpression();
					return this._projectIfSlice(left, right);
				};
				this._match(TOK_STAR);
				this._match(TOK_RBRACKET);
				right = this._parseProjectionRHS(bindingPower.Star);
				return {
					type: "Projection",
					children: [left, right]
				};
			default:
				errorToken(this._lookaheadToken(0));
		};
	};
	_match(tokenType) {
		if (this._lookahead(0) === tokenType) {
			this._advance();
		} else {
			let t = this._lookaheadToken(0);
			throw new ParserError(`Expected ${tokenType}, got: ${t.type}`);
		};
	};
	_parseIndexExpression() {
		if (this._lookahead(0) === TOK_COLON || this._lookahead(1) === TOK_COLON) {
			return this._parseSliceExpression();
		};
		let node = {
			type: "Index",
			value: this._lookaheadToken(0).value
		};
		this._advance();
		this._match(TOK_RBRACKET);
		return node;
	};
	_projectIfSlice(left, right) {
		let indexExpr = {
			type: "IndexExpression",
			children: [left, right]
		};
		if (right.type === "Slice") {
			return {
				type: "Projection",
				children: [indexExpr, this._parseProjectionRHS(bindingPower.Star)]
			};
		};
		return indexExpr;
	};
	_parseSliceExpression() {
		// [start:end:step] where each part is optional, as well as the last colon.
		let currentToken = this._lookahead(0);
		let index = 0;
		let parts = [null, null, null];
		while (currentToken !== TOK_RBRACKET && index < 3) {
			if (currentToken === TOK_COLON) {
				index++;
				this._advance();
			} else if (currentToken === TOK_NUMBER) {
				parts[index] = this._lookaheadToken(0).value;
				this._advance();
			} else {
				let t = this._lookahead(0);
				throw new ParserError(`Unexpected token: ${t.value}(${t.type})`);
			};
			currentToken = this._lookahead(0);
		};
		this._match(TOK_RBRACKET);
		return {
			type: "Slice",
			children: parts
		};
	};
	_parseComparator(left, comparator) {
		let right = this._expression(bindingPower[comparator]);
		return {
			type: "Comparator",
			name: comparator,
			children: [left, right]
		};
	};
	_parseDotRHS(rbp) {
		let lookahead = this._lookahead(0);
		let exprTokens = [TOK_UNQUOTEDIDENTIFIER, TOK_QUOTEDIDENTIFIER, TOK_STAR];
		if (exprTokens.indexOf(lookahead) >= 0) {
			return this._expression(rbp);
		} else if (lookahead === TOK_LBRACKET) {
			this._match(TOK_LBRACKET);
			return this._parseMultiselectList();
		} else if (lookahead === TOK_LBRACE) {
			this._match(TOK_LBRACE);
			return this._parseMultiselectHash();
		};
	};
	_parseProjectionRHS(rbp) {
		let right;
		if (bindingPower[this._lookahead(0)] < 10) {
			right = { type: "Identity" };
		} else if (this._lookahead(0) === TOK_LBRACKET) {
			right = this._expression(rbp);
		} else if (this._lookahead(0) === TOK_FILTER) {
			right = this._expression(rbp);
		} else if (this._lookahead(0) === TOK_DOT) {
			this._match(TOK_DOT);
			right = this._parseDotRHS(rbp);
		} else {
			let t = this._lookaheadToken(0);
			throw new ParserError(`Unexpected token: ${t.value}(${t.type})`);
		};
		return right;
	};
	_parseMultiselectList() {
		let expressions = [];
		while (this._lookahead(0) !== TOK_RBRACKET) {
			let expression = this._expression(0);
			expressions.push(expression);
			if (this._lookahead(0) === TOK_COMMA) {
				this._match(TOK_COMMA);
				if (this._lookahead(0) === TOK_RBRACKET) {
					throw new Error("Unexpected token Rbracket");
				};
			};
		};
		this._match(TOK_RBRACKET);
		return {
			type: "MultiSelectList",
			children: expressions
		};
	};
	_parseMultiselectHash() {
		let identifierTypes = [TOK_UNQUOTEDIDENTIFIER, TOK_QUOTEDIDENTIFIER];
		let keyName;
		let keyToken;
		let node;
		let pairs = [];
		let value;
		for (; ;) {
			keyToken = this._lookaheadToken(0);
			if (identifierTypes.indexOf(keyToken.type) < 0) {
				throw new Error(`Expecting an identifier token, got: ${keyToken.type}`);
			};
			keyName = keyToken.value;
			this._advance();
			this._match(TOK_COLON);
			value = this._expression(0);
			node = {
				type: "KeyValuePair",
				name: keyName,
				value: value
			};
			pairs.push(node);
			if (this._lookahead(0) === TOK_COMMA) {
				this._match(TOK_COMMA);
			} else if (this._lookahead(0) === TOK_RBRACE) {
				this._match(TOK_RBRACE);
				break;
			};
		};
		return {
			type: "MultiSelectHash",
			children: pairs
		};
	};
	search(data, expression) {
		this._rootValue = data;
		return this._visit(this._parse(expression), data);
	};
	_visit(node, value) {
		let base;
		let collected;
		let current;
		let field;
		let first;
		let i;
		let left;
		let matched;
		let result;
		let right;
		let second;
		switch (node.type) {
			case "Field":
				if (value !== null && isObject(value)) {
					field = value[node.name];
					if (field === undefined) {
						return null;
					};
					return field;
				};
				return null;
			case "Subexpression":
				result = this._visit(node.children[0], value);
				for (i = 1; i < node.children.length; i++) {
					result = this._visit(node.children[1], result);
					if (result === null) {
						return null;
					};
				};
				return result;
			case "IndexExpression":
				left = this._visit(node.children[0], value);
				right = this._visit(node.children[1], left);
				return right;
			case "Index":
				if (!Array.isArray(value)) {
					return null;
				};
				let index = node.value;
				if (index < 0) {
					index = value.length + index;
				};
				result = value[index];
				if (result === undefined) {
					result = null;
				};
				return result;
			case "Slice":
				if (!Array.isArray(value)) {
					return null;
				};
				let sliceParams = node.children.slice(0);
				let computed = computeSliceParams(value.length, sliceParams);
				let start = computed[0];
				let stop = computed[1];
				let step = computed[2];
				result = [];
				if (step > 0) {
					for (i = start; i < stop; i += step) {
						result.push(value[i]);
					};
				} else {
					for (i = start; i > stop; i += step) {
						result.push(value[i]);
					};
				};
				return result;
			case "Projection":
				// Evaluate left child.
				base = this._visit(node.children[0], value);
				if (!Array.isArray(base)) {
					return null;
				};
				collected = [];
				for (i = 0; i < base.length; i++) {
					current = this._visit(node.children[1], base[i]);
					if (current !== null) {
						collected.push(current);
					};
				};
				return collected;
			case "ValueProjection":
				// Evaluate left child.
				base = this._visit(node.children[0], value);
				if (!isObject(base)) {
					return null;
				};
				collected = [];
				let values = Object.values(base);
				for (i = 0; i < values.length; i++) {
					current = this._visit(node.children[1], values[i]);
					if (current !== null) {
						collected.push(current);
					};
				};
				return collected;
			case "FilterProjection":
				base = this._visit(node.children[0], value);
				if (!Array.isArray(base)) {
					return null;
				};
				let filtered = [];
				let finalResults = [];
				for (i = 0; i < base.length; i++) {
					matched = this._visit(node.children[2], base[i]);
					if (!isFalse(matched)) {
						filtered.push(base[i]);
					};
				};
				for (let j = 0; j < filtered.length; j++) {
					current = this._visit(node.children[1], filtered[j]);
					if (current !== null) {
						finalResults.push(current);
					};
				};
				return finalResults;
			case "Comparator":
				first = this._visit(node.children[0], value);
				second = this._visit(node.children[1], value);
				switch (node.name) {
					case TOK_EQ:
						result = areEqual(first, second);
						break;
					case TOK_NE:
						result = !areEqual(first, second);
						break;
					case TOK_GT:
						result = first > second;
						break;
					case TOK_GTE:
						result = first >= second;
						break;
					case TOK_LT:
						result = first < second;
						break;
					case TOK_LTE:
						result = first <= second;
						break;
					default:
						throw new Error(`Unknown comparator: ${node.name}`);
				};
				return result;
			case TOK_FLATTEN:
				let original = this._visit(node.children[0], value);
				if (!Array.isArray(original)) {
					return null;
				};
				let merged = [];
				for (i = 0; i < original.length; i++) {
					current = original[i];
					if (Array.isArray(current)) {
						merged.push.apply(merged, current);
					} else {
						merged.push(current);
					};
				};
				return merged;
			case TOK_ROOT:
				return this._rootValue;
			case "Identity":
				return value;
			case "MultiSelectList":
				if (value === null) {
					return null;
				};
				collected = [];
				for (i = 0; i < node.children.length; i++) {
					collected.push(this._visit(node.children[i], value));
				};
				return collected;
			case "MultiSelectHash":
				if (value === null) {
					return null;
				};
				collected = {};
				let child;
				for (i = 0; i < node.children.length; i++) {
					child = node.children[i];
					collected[child.name] = this._visit(child.value, value);
				};
				return collected;
			case "OrExpression":
				matched = this._visit(node.children[0], value);
				if (isFalse(matched)) {
					matched = this._visit(node.children[1], value);
				};
				return matched;
			case "AndExpression":
				first = this._visit(node.children[0], value);
				if (isFalse(first) === true) {
					return first;
				};
				return this._visit(node.children[1], value);
			case "NotExpression":
				first = this._visit(node.children[0], value);
				return isFalse(first);
			case "Literal":
				return node.value;
			case TOK_PIPE:
				left = this._visit(node.children[0], value);
				return this._visit(node.children[1], left);
			case TOK_CURRENT:
				return value;
			case "Function":
				let resolvedArgs = [];
				for (i = 0; i < node.children.length; i++) {
					resolvedArgs.push(this._visit(node.children[i], value));
				};
				return this._callFunction(node.name, resolvedArgs);
			case "ExpressionReference":
				let refNode = node.children[0];
				// Tag the node with a specific attribute so the type checker verify the type.
				refNode.jmespathType = TOK_EXPREF;
				return refNode;
			default:
				throw new Error(`Unknown node type: ${node.type}`);
		};
	};
	_callFunction(name, resolvedArgs) {
		let functionEntry = this._runtimeFunctionTable[name];
		if (functionEntry === undefined) {
			throw new Error(`Unknown function: ${name}()`);
		};
		this._validateArgs(name, resolvedArgs, functionEntry._signature);
		return functionEntry._func.call(this, resolvedArgs);
	};
	_validateArgs(name, args, signature) {
		// Validating the args requires validating the correct arity and the correct type of each arg. If the last argument is declared as variadic, then we need a minimum number of args to be required. Otherwise it has to be an exact amount.
		let pluralized;
		if (signature[signature.length - 1].variadic) {
			if (args.length < signature.length) {
				pluralized = signature.length === 1 ? " argument" : " arguments";
				throw new Error(`ArgumentError: ${name}() takes at least${signature.length}${pluralized} but received ${args.length}`);
			};
		} else if (args.length !== signature.length) {
			pluralized = signature.length === 1 ? " argument" : " arguments";
			throw new Error(`ArgumentError: ${name}() takes ${signature.length}${pluralized} but received ${args.length}`);
		};
		let actualType;
		let currentSpec;
		let typeMatched;
		for (let i = 0; i < signature.length; i++) {
			typeMatched = false;
			currentSpec = signature[i].types;
			actualType = getTypeName(args[i]);
			for (let j = 0; j < currentSpec.length; j++) {
				if (this._typeMatches(actualType, currentSpec[j], args[i])) {
					typeMatched = true;
					break;
				};
			};
			if (!typeMatched) {
				let expected = currentSpec.map((typeIdentifier) => {
					return TYPE_NAME_TABLE[typeIdentifier];
				}).join(",");
				throw new TypeError(`${name}() expected argument ${i + 1} to be type ${expected} but received type ${TYPE_NAME_TABLE[actualType]} instead.`);
			};
		};
	};
	_typeMatches(actual, expected, argValue) {
		if (expected === TYPE_ANY) {
			return true;
		};
		if (
			expected === TYPE_ARRAY_STRING ||
			expected === TYPE_ARRAY_NUMBER ||
			expected === TYPE_ARRAY
		) {
			// The expected type can either just be array, or it can require a specific subtype (array of numbers). The simplest case is if "array" with no subtype is specified.
			if (expected === TYPE_ARRAY) {
				return (actual === TYPE_ARRAY);
			} else if (actual === TYPE_ARRAY) {
				// Otherwise we need to check subtypes. I think this has potential to be improved.
				let subtype;
				if (expected === TYPE_ARRAY_NUMBER) {
					subtype = TYPE_NUMBER;
				} else if (expected === TYPE_ARRAY_STRING) {
					subtype = TYPE_STRING;
				};
				for (let i = 0; i < argValue.length; i++) {
					if (!this._typeMatches(getTypeName(argValue[i]), subtype, argValue[i])) {
						return false;
					};
				};
				return true;
			};
			// ISSUE: Need a return at here???
		} else {
			return (actual === expected);
		};
	};
	_functionMap(resolvedArgs) {
		let mapped = [];
		let exprefNode = resolvedArgs[0];
		let elements = resolvedArgs[1];
		for (let i = 0; i < elements.length; i++) {
			mapped.push(this._visit(exprefNode, elements[i]));
		};
		return mapped;
	};
	_functionSortBy(resolvedArgs) {
		let sortedArray = resolvedArgs[0].slice(0);
		if (sortedArray.length === 0) {
			return sortedArray;
		};
		let exprefNode = resolvedArgs[1];
		let requiredType = getTypeName(this._visit(exprefNode, sortedArray[0]));
		if ([TYPE_NUMBER, TYPE_STRING].indexOf(requiredType) < 0) {
			throw new Error("TypeError");
		};
		let decorated = [];
		for (let i = 0; i < sortedArray.length; i++) {
			decorated.push([i, sortedArray[i]]);
		};
		decorated.sort((a, b) => {
			let exprA = this._visit(exprefNode, a[1]);
			let exprB = this._visit(exprefNode, b[1]);
			if (getTypeName(exprA) !== requiredType) {
				throw new TypeError(`Expected ${requiredType}, received ${getTypeName(exprA)}`);
			};
			if (getTypeName(exprB) !== requiredType) {
				throw new TypeError(`Expected ${requiredType}, received ${getTypeName(exprB)}`);
			};
			if (exprA > exprB) {
				return 1;
			};
			if (exprA < exprB) {
				return -1;
			};
			// If they're equal compare the items by their order to maintain relative order of equal keys (i.e. to get a stable sort).
			return a[0] - b[0];
		});
		// Undecorate: extract out the original list elements.
		for (let j = 0; j < decorated.length; j++) {
			sortedArray[j] = decorated[j][1];
		};
		return sortedArray;
	};
	_functionMaxBy(resolvedArgs) {
		let exprefNode = resolvedArgs[1];
		let resolvedArray = resolvedArgs[0];
		let keyFunction = this._createKeyFunction(exprefNode, [TYPE_NUMBER, TYPE_STRING]);
		let maxNumber = -Infinity;
		let maxRecord;
		let current;
		for (let i = 0; i < resolvedArray.length; i++) {
			current = keyFunction(resolvedArray[i]);
			if (current > maxNumber) {
				maxNumber = current;
				maxRecord = resolvedArray[i];
			};
		};
		return maxRecord;
	};
	_functionMinBy(resolvedArgs) {
		let exprefNode = resolvedArgs[1];
		let resolvedArray = resolvedArgs[0];
		let keyFunction = this._createKeyFunction(exprefNode, [TYPE_NUMBER, TYPE_STRING]);
		let minNumber = Infinity;
		let minRecord;
		let current;
		for (let i = 0; i < resolvedArray.length; i++) {
			current = keyFunction(resolvedArray[i]);
			if (current < minNumber) {
				minNumber = current;
				minRecord = resolvedArray[i];
			};
		};
		return minRecord;
	};
	_createKeyFunction(exprefNode, allowedTypes) {
		return (x) => {
			let current = this._visit(exprefNode, x);
			if (allowedTypes.indexOf(getTypeName(current)) < 0) {
				throw new TypeError(`Expected one of ${allowedTypes}, received ${getTypeName(current)}`);
			};
			return current;
		};
	};
};
function main(data, expression) {
	return new JMESPath().search(data, expression);
};
module.exports = main;
