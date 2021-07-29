import * as advancedDetermine from "@hugoalh/advanced-determine";
import checkOption from "./internal/check-option.mjs";
import escapeRegularExpressionSpecialCharacter from "./escape-regular-expression-special-character.mjs";
class Replaceholder {
	#keyREFull;
	#keyREPart;
	#list;
	#prefixREEscape;
	#suffixREEscape;
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
		this.#prefixREEscape = escapeRegularExpressionSpecialCharacter(
			this.prefix,
			{
				forwardSlash: true,
				hyphen: true
			}
		);
		this.#suffixREEscape = escapeRegularExpressionSpecialCharacter(
			this.suffix,
			{
				forwardSlash: true,
				hyphen: true
			}
		);
		let keyMatrix = `${this.#prefixREEscape}.+?${this.#suffixREEscape}`;
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
		if (key.search(/\[\*\]|\.\*\.?/giu) === -1) {
			return eval(`this.#list${(key.search(/^\[/giu) === 0) ? "" : "."}${key.replace(/\[\\\*\]/giu, "[*]").replace(/\.\\\*/giu, ".*")}`);
		};
		// TODO
		return undefined;
	};
	/**
	 * @private
	 * @method replaceInternal
	 * @param {(*[]|boolean|null|number|object|string)} item
	 * @returns {*}
	 */
	#replaceInternal(item) {
		if (
			typeof item === "boolean" ||
			item === null ||
			advancedDetermine.isNumber(item) !== false
		) {
			return item;
		};
		if (Array.isArray(item) === true) {
			item.forEach((element, index) => {
				item[index] = this.#replaceInternal(element);
			});
			return item;
		};
		if (advancedDetermine.isJSON(item) !== false) {
			Object.keys(item).forEach((element) => {
				item[element] = this.#replaceInternal(item[element]);
			});
			return item;
		};
		if (item.search(this.#keyREFull) === 0) {
			let key = item.replace(this.prefix, "").replace(this.suffix, ""),
				value;
			if (key.search(/=>\{[^]+\}$/giu) === -1) {
				try {
					value = this.#getListValue(key);
				} catch (error) { };
				if (typeof value === "undefined") {
					value = (this.replaceUndefined === true) ? this.replaceUndefined : item;
				};
				if (typeof value !== "string" && this.typeTransform === false) {
					value = JSON.stringify(value);
				};
			} else {

			};
			item = value;
		} else {
			let itemMatchPart = item.match(this.#keyREPart) || [];
			for (let index = 0; index < itemMatchPart.length; index++) {
				let key = itemMatchPart[index].replace(this.prefix, "").replace(this.suffix, ""),
					value;
				try {
					value = this.#getListValue(key);
				} catch (error) { };
				if (typeof value === "undefined") {
					value = (this.replaceUndefined === true) ? this.replaceUndefined : itemMatchPart[index];
				};
				if (typeof value !== "string") {
					value = JSON.stringify(value);
				};
				item = item.replace(itemMatchPart[index], value);
			};
		};
		return item;
	};
	/**
	 * @method replace
	 * @param {(*[]|object|string)} item
	 * @returns {*}
	 */
	replace(item) {
		if (Array.isArray(item) === false && advancedDetermine.isJSON(item, { allowArrayRoot: false }) === false && typeof item !== "string") {
			throw new TypeError(`Argument \`item\` must be type of array, JSON, or string!`);
		};
		return this.#replaceInternal(item);
	};
};
export default Replaceholder;
