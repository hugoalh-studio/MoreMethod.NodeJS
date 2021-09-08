const advancedDetermine = require("@hugoalh/advanced-determine");
/**
 * @private
 * @function changeCaseSwap
 * @param {string} item
 * @returns {string}
 */
function changeCaseSwap(item) {
	let itemArray = item.split("");
	let resultObject = {};
	Promise.allSettled(
		itemArray.map((element, index) => {
			new Promise(() => {
				if (advancedDetermine.isString(element, { lowerCase: true }) === true) {
					resultObject[index] = element.toUpperCase();
				} else if (advancedDetermine.isString(element, { upperCase: true }) === true) {
					resultObject[index] = element.toLowerCase();
				} else {
					resultObject[index] = element;
				};
			}).catch();
		})
	);
	return Object.values(resultObject).join("");
};
/**
 * @function changeCase
 * @description Change string case.
 * @param {string} item String that need to change case.
 * @param {object} [option={}] Option.
 * @param {boolean} [option.allowNonAlphabetCharacter=false] Allow non alphabet character(s).
 * @param {string} [option.case] Preset of case style.
 * @param {string} [option.delimiter="-"] Delimiter between word(s).
 * @param {boolean} [option.upperCaseFirstWordFirstCharacter=false] Change the first word first character to upper case or not.
 * @param {boolean} [option.upperCaseFirstWordOtherCharacter=false] Change the first word other character to upper case or not.
 * @param {boolean} [option.upperCaseOtherWordFirstCharacter=false] Change the other word first character to upper case or not.
 * @param {boolean} [option.upperCaseOtherWordOtherCharacter=false] Change the other word other character to upper case or not.
 * @returns {string} A case-changed string.
 */
function changeCase(item, option = {}) {
	if (advancedDetermine.isObjectPair(option) === false) {
		throw new TypeError(`Argument \`option\` must be type of object pair!`);
	};
	if (advancedDetermine.isString(item, { allowWhitespace: false }) !== true) {
		throw new TypeError(`Argument \`item\` must be type of string (non-nullable)!`);
	};
	option.allowNonAlphabetCharacter = ((typeof option.allowNonAlphabetCharacter === "undefined") ? false : option.allowNonAlphabetCharacter);
	if (typeof option.allowNonAlphabetCharacter !== "boolean") {
		throw new TypeError(`Argument \`option.allowNonAlphabetCharacter\` must be type of boolean!`);
	};
	if (option.allowNonAlphabetCharacter === true && item.search(/[a-z]/giu) !== -1) {
		console.warn(`Function \`changeCase\` is not fully supported non alphabet character(s), and maybe return an unexpected result!`);
	};
	if (typeof option.case === "undefined") {
		option.delimiter = ((typeof option.delimiter === "undefined") ? "-" : option.delimiter);
		if (advancedDetermine.isString(option.delimiter) !== true) {
			throw new TypeError(`Argument \`option.delimiter\` must be type of string (non-nullable)!`);
		};
		option.upperCaseFirstWordFirstCharacter = ((typeof option.upperCaseFirstWordFirstCharacter === "undefined") ? false : option.upperCaseFirstWordFirstCharacter);
		if (typeof option.upperCaseFirstWordFirstCharacter !== "boolean") {
			throw new TypeError(`Argument \`option.upperCaseFirstWordFirstCharacter\` must be type of boolean!`);
		};
		option.upperCaseFirstWordOtherCharacter = ((typeof option.upperCaseFirstWordOtherCharacter === "undefined") ? false : option.upperCaseFirstWordOtherCharacter);
		if (typeof option.upperCaseFirstWordOtherCharacter !== "boolean") {
			throw new TypeError(`Argument \`option.upperCaseFirstWordOtherCharacter\` must be type of boolean!`);
		};
		option.upperCaseOtherWordFirstCharacter = ((typeof option.upperCaseOtherWordFirstCharacter === "undefined") ? false : option.upperCaseOtherWordFirstCharacter);
		if (typeof option.upperCaseOtherWordFirstCharacter !== "boolean") {
			throw new TypeError(`Argument \`option.upperCaseOtherWordFirstCharacter\` must be type of boolean!`);
		};
		option.upperCaseOtherWordOtherCharacter = ((typeof option.upperCaseOtherWordOtherCharacter === "undefined") ? false : option.upperCaseOtherWordOtherCharacter);
		if (typeof option.upperCaseOtherWordOtherCharacter !== "boolean") {
			throw new TypeError(`Argument \`option.upperCaseOtherWordOtherCharacter\` must be type of boolean!`);
		};
	} else {
		if (advancedDetermine.isString(option.case) !== true) {
			throw new TypeError(`Argument \`option.case\` must be type of string (non-nullable)!`);
		};
		if (option.case.search(/^capital(?:-?case)?$/giu) === 0) {
			option.delimiter = " ";
			option.upperCaseFirstWordFirstCharacter = true;
			option.upperCaseFirstWordOtherCharacter = false;
			option.upperCaseOtherWordFirstCharacter = true;
			option.upperCaseOtherWordOtherCharacter = false;
		} else if (option.case.search(/^const(?:ant)?(?:-?case)?$/giu) === 0) {
			option.delimiter = "_";
			option.upperCaseFirstWordFirstCharacter = true;
			option.upperCaseFirstWordOtherCharacter = true;
			option.upperCaseOtherWordFirstCharacter = true;
			option.upperCaseOtherWordOtherCharacter = true;
		} else if (option.case.search(/^(?:dash|hyphen)(?:-?case)?$/giu) === 0) {
			option.delimiter = "-";
			option.upperCaseFirstWordFirstCharacter = false;
			option.upperCaseFirstWordOtherCharacter = false;
			option.upperCaseOtherWordFirstCharacter = false;
			option.upperCaseOtherWordOtherCharacter = false;
		} else if (option.case.search(/^(?:dromedary|(?:low(?:er)?-?)?camel)(?:-?case)?$/giu) === 0) {
			option.delimiter = "";
			option.upperCaseFirstWordFirstCharacter = false;
			option.upperCaseFirstWordOtherCharacter = false;
			option.upperCaseOtherWordFirstCharacter = true;
			option.upperCaseOtherWordOtherCharacter = false;
		} else if (option.case.search(/^(?:pascal|up(?:per)?-?camel)(?:-?case)?$/giu) === 0) {
			option.delimiter = "";
			option.upperCaseFirstWordFirstCharacter = true;
			option.upperCaseFirstWordOtherCharacter = false;
			option.upperCaseOtherWordFirstCharacter = true;
			option.upperCaseOtherWordOtherCharacter = false;
		} else if (option.case.search(/^(?:snak|underscor)e(?:-?case)?$/giu) === 0) {
			option.delimiter = "_";
			option.upperCaseFirstWordFirstCharacter = false;
			option.upperCaseFirstWordOtherCharacter = false;
			option.upperCaseOtherWordFirstCharacter = false;
			option.upperCaseOtherWordOtherCharacter = false;
		} else if (option.case.search(/^swap(?:-?case)?$/giu) === 0) {
			return changeCaseSwap(item);
		} else {
			throw new SyntaxError(`Argument \`option.case\`'s value is not in the list!`);
		};
	}
	let itemArray = item.replace(/(?<upper>[A-Z])/gu, " $<upper>").replace(((option.allowNonAlphabetCharacter === false) ? /(?:[^a-z]+)/giu : /[-_\n\r\s]+/giu), " ").trim().split(" ");
	itemArray.forEach((element, index) => {
		itemArray[index] = element.toLowerCase();
	});
	let resultObject = {};
	Promise.allSettled(
		itemArray.map((element, index) => {
			new Promise(() => {
				let first = element.charAt(0);
				let other = element.slice(1);
				if (index === 0) {
					resultObject[index] = `${(option.upperCaseFirstWordFirstCharacter === true) ? first.toUpperCase() : first.toLowerCase()}${(option.upperCaseFirstWordOtherCharacter === true) ? other.toUpperCase() : other.toLowerCase()}`;
				} else {
					resultObject[index] = `${(option.upperCaseOtherWordFirstCharacter === true) ? first.toUpperCase() : first.toLowerCase()}${(option.upperCaseOtherWordOtherCharacter === true) ? other.toUpperCase() : other.toLowerCase()}`;
				}
			}).catch();
		})
	);
	let result = Object.values(resultObject).join(option.delimiter);
	while (option.delimiter.length > 0 && result.search(`${option.delimiter}${option.delimiter}`) !== -1) {
		result = result.replace(`${option.delimiter}${option.delimiter}`, option.delimiter);
	};
	return result;
};
module.exports = changeCase;
