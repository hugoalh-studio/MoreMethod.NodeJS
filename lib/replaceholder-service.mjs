import * as advancedDetermine from "@hugoalh/advanced-determine";
import checkOption from "./internal/check-option.mjs";
import escapeRegularExpressionSpecialCharacter from "./escape-regular-expression-special-character.mjs";
/**
 * @description JSON query and transformation.
 */
class Replaceholder {
	#keyREFull;
	#keyREPart;
	#list;
	/**
	 * @constructor
	 * @param {object} list Placeholder list.
	 * @param {object} [option={}] Option.
	 * @param {string} [option.prefix="%"] Prefix of the placeholder.
	 * @param {string} [option.suffix="%"] Suffix of the placeholder.
	 * @param {boolean} [option.typeTransform=true] Transform placeholder to the target value's type.
	 * @param {(boolean|null|string)} [option.replaceUndefined=false] Replace undefined placeholder when placeholder is not in the list.
	 */
	constructor(list, option = {}) {
		checkOption(option);
		this.prefix = "%";
		this.suffix = "%";
		this.typeTransform = true;
		this.replaceUndefined = false;
		if (advancedDetermine.isJSON(list, { strictKey: true }) === false) {
			throw new TypeError(`Argument \`list\` must be type of JSON (no illegal namespace character(s))!`);
		};
		this.#list = list;
		if (typeof option.prefix !== "undefined") {
			if (advancedDetermine.isString(option.prefix) !== true) {
				throw new TypeError(`Argument \`option.prefix\` must be type of string (non-nullable)!`);
			};
			this.prefix = option.prefix;
		};
		if (typeof option.suffix !== "undefined") {
			if (advancedDetermine.isString(option.suffix) !== true) {
				throw new TypeError(`Argument \`option.suffix\` must be type of string (non-nullable)!`);
			};
			this.suffix = option.suffix;
		};
		if (typeof option.typeTransform !== "undefined") {
			if (typeof option.typeTransform !== "boolean") {
				throw new TypeError(`Argument \`option.typeTransform\` must be type of boolean!`);
			};
			this.typeTransform = option.typeTransform;
		};
		if (typeof option.replaceUndefined !== "undefined") {
			if (typeof option.replaceUndefined !== "boolean" && option.replaceUndefined !== null && typeof option.replaceUndefined !== "string") {
				throw new TypeError(`Argument \`option.replaceUndefined\` must be type of boolean, null, or string!`);
			};
			if (option.replaceUndefined === true) {
				this.replaceUndefined = "undefined";
			} else if (option.replaceUndefined === null) {
				this.replaceUndefined = "";
			} else {
				this.replaceUndefined = option.replaceUndefined;
			};
		};
		let keyMatrix = `${escapeRegularExpressionSpecialCharacter(this.prefix, { forwardSlash: true, hyphen: true })}(?:[$_a-z][$0-9_a-z]*?|\\*|\\[[0-9*]\\]|\\[[1-9][0-9]+?\\])(?:\\.[$_a-z][$0-9_a-z]*?|\\.\\*|\\[[0-9*]\\]|\\[[1-9][0-9]+?\\])*?${escapeRegularExpressionSpecialCharacter(this.suffix, { forwardSlash: true, hyphen: true })}`;
		this.#keyREFull = new RegExp(`^${keyMatrix}$`, "giu");
		this.#keyREPart = new RegExp(`${keyMatrix}`, "giu");
	};
	/**
	 * @private
	 * @method getListValue
	 * @param {string} key
	 * @returns {any}
	 */
	#getListValue(key) {
		let starMatch = key.match(/^\*\.?|\[\*\]\.?|\.\*\.?/giu) || [];
		if (starMatch.length === 0) {
			let data = this.#list,
				keyChain = key.split(/[.[\]]+/giu);
			while (keyChain.length > 0 && typeof data !== "undefined") {
				let keyCurrent = keyChain.shift();
				if (advancedDetermine.isString(keyCurrent) === null) {
					continue;
				};
				if (keyCurrent.search(/^(?:[0-9]|[1-9][0-9]+?)$/giu) === 0) {
					keyCurrent = Number(keyCurrent);
				};
				data = data[keyCurrent];
			};
			return data;
		} else if (starMatch.length === 1) {
			let [starFront, starBack] = key.split(/^\*\.?|\[\*\]\.?|\.\*\.?/giu);
			if (starBack.length === 0) {
				return undefined;
			};
			let dataFront = this.#list;
			if (starFront.length !== 0) {
				let keyChainFront = starFront.split(/[.[\]]+/giu);
				while (keyChainFront.length > 0 && typeof dataFront !== "undefined") {
					let keyCurrent = keyChainFront.shift();
					if (advancedDetermine.isString(keyCurrent) === null) {
						continue;
					};
					if (keyCurrent.search(/^(?:[0-9]|[1-9][0-9]+?)$/giu) === 0) {
						keyCurrent = Number(keyCurrent);
					};
					dataFront = dataFront[keyCurrent];
				};
			};
			if (advancedDetermine.isArray(dataFront) !== true) {
				return undefined;
			};
			let dataBack = [];
			for (let index = 0; index < dataFront.length; index++) {
				let element = dataFront[index],
					keyChainBack = starBack.split(/[.[\]]+/giu);
				while (keyChainBack.length > 0 && typeof element !== "undefined") {
					let keyCurrent = keyChainBack.shift();
					if (advancedDetermine.isString(keyCurrent) === null) {
						continue;
					};
					if (keyCurrent.search(/^(?:[0-9]|[1-9][0-9]+?)$/giu) === 0) {
						keyCurrent = Number(keyCurrent);
					};
					element = element[keyCurrent];
				};
				if (typeof element !== "undefined") {
					dataBack.push(element);
				};
			};
			return ((dataBack.length > 0) ? dataBack : undefined);
		};
		return undefined;
	};
	/**
	 * @private
	 * @method replaceInternal
	 * @param {(any[]|boolean|null|number|object|string)} item
	 * @returns {any}
	 */
	#replaceInternal(item) {
		if (Array.isArray(item) === true) {
			item.forEach((element, index) => {
				item[index] = this.#replaceInternal(element);
			});
			return item;
		};
		if (advancedDetermine.isJSON(item, { allowArrayRoot: false }) !== false) {
			Object.keys(item).forEach((element) => {
				item[element] = this.#replaceInternal(item[element]);
			});
			return item;
		};
		if (typeof item === "string") {
			if (item.search(this.#keyREFull) === 0) {
				let value = this.#getListValue(item.replace(this.prefix, "").replace(this.suffix, ""));
				if (typeof value === "undefined") {
					value = ((this.replaceUndefined === false) ? item : this.replaceUndefined);
				};
				if (typeof value !== "string" && this.typeTransform === false) {
					value = JSON.stringify(value);
				};
				return value;
			} else {
				let itemMatchPart = item.match(this.#keyREPart) || [];
				itemMatchPart.forEach((element) => {
					let value = this.#getListValue(element.replace(this.prefix, "").replace(this.suffix, ""));
					if (typeof value === "undefined") {
						value = ((this.replaceUndefined === false) ? element : this.replaceUndefined);
					};
					if (typeof value !== "string") {
						value = JSON.stringify(value);
					};
					item = item.replace(element, value);
				});
			};
		};
		return item;
	};
	/**
	 * @method replace
	 * @param {(any[]|object|string)} item Query.
	 * @returns {any} Result.
	 */
	replace(item) {
		if (advancedDetermine.isJSON(item) === false && typeof item !== "string") {
			throw new TypeError(`Argument \`item\` must be type of array, JSON, or string!`);
		};
		return this.#replaceInternal(item);
	};
};
export default Replaceholder;
