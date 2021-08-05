const advancedDetermine = require("@hugoalh/advanced-determine"),
	checkOption = require("./internal/check-option.js"),
	escapeRegularExpressionSpecialCharacter = require("./escape-regular-expression-special-character.js");
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
		if (advancedDetermine.isJSON(list) !== true) {
			throw new TypeError(`Argument \`list\` must be type of JSON (non-nullable)!`);
		};
		this.#list = JSON.stringify(list);
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
		let keyMatrix = `${escapeRegularExpressionSpecialCharacter(this.prefix, { forwardSlash: true, hyphen: true })}.+?${escapeRegularExpressionSpecialCharacter(this.suffix, { forwardSlash: true, hyphen: true })}`;
		this.#keyREFull = new RegExp(`^${keyMatrix}$`, "giu");
		this.#keyREPart = new RegExp(`${keyMatrix}`, "giu");
	};
	/**
	 * @private
	 * @method getListValue
	 * @param {string} key
	 * @returns {(*[]|boolean|null|number|object|string|undefined)}
	 */
	#getListValue(key) {
		if (key.search(/[=>{}]/giu) !== -1) {
			throw new EvalError(`Eval hazard!`);
		};
		if (key.search(/\.$/giu) !== -1) {
			return undefined;
		};
		let starMatch = key.match(/^\*\.?|\[\*\]|\.\*\.?/giu) || [];
		if (starMatch.length === 0) {
			try {
				return eval(`let data = ${this.#list}; data${(key.search(/^\[/giu) === 0) ? "" : "."}${key}`);
			} catch (error) { };
		} else if (starMatch.length === 1) {
			let [starFront, starBack] = key.split(/^\*\.?|\[\*\]|\.\*\.?/giu);
			if (starBack.length === 0) {
				return undefined;
			};
			try {
				let dataFront;
				if (starFront.length === 0) {
					dataFront = JSON.parse(this.#list);
				} else {
					dataFront = eval(`let data = ${this.#list}; data${(starFront.search(/^\[/giu) === 0) ? "" : "."}${starFront};`);
				};
				if (advancedDetermine.isArray(dataFront) !== true) {
					return undefined;
				};
				let dataBack = [];
				for (let index = 0; index < dataFront.length; index++) {
					let element = dataFront[index];
					if (advancedDetermine.isJSON(element) !== true) {
						return undefined;
					};
					let result = eval(`let data = ${JSON.stringify(element)}; data${(starBack.search(/^\[/giu) === 0) ? "" : "."}${starBack};`);
					if (typeof result !== "undefined") {
						dataBack.push(result);
					};
				};
				return ((dataBack.length > 0) ? dataBack : undefined);
			} catch (error) { };
		};
		return undefined;
	};
	/**
	 * @private
	 * @method replaceInternal
	 * @param {(*[]|boolean|null|number|object|string)} item
	 * @returns {*}
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
				let key = item.replace(this.prefix, "").replace(this.suffix, ""),
					value;
				try {
					value = this.#getListValue(key);
				} catch (error) { };
				if (typeof value === "undefined") {
					value = (this.replaceUndefined === false) ? item : this.replaceUndefined;
				};
				if (typeof value !== "string" && this.typeTransform === false) {
					value = JSON.stringify(value);
				};
				return value;
			} else {
				let itemMatchPart = item.match(this.#keyREPart) || [];
				for (let index = 0; index < itemMatchPart.length; index++) {
					let value;
					try {
						value = this.#getListValue(itemMatchPart[index].replace(this.prefix, "").replace(this.suffix, ""));
					} catch (error) { };
					if (typeof value === "undefined") {
						value = (this.replaceUndefined === false) ? itemMatchPart[index] : this.replaceUndefined;
					};
					if (typeof value !== "string") {
						value = JSON.stringify(value);
					};
					item = item.replace(itemMatchPart[index], value);
				};
			};
		};
		return item;
	};
	/**
	 * @method replace
	 * @param {(*[]|object|string)} item Query.
	 * @returns {*} Result.
	 */
	replace(item) {
		if (advancedDetermine.isJSON(item) === false && typeof item !== "string") {
			throw new TypeError(`Argument \`item\` must be type of array, JSON, or string!`);
		};
		return this.#replaceInternal(item);
	};
};
module.exports = Replaceholder;
