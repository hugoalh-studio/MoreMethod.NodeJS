const advancedDetermine = require("@hugoalh/advanced-determine"),
	checkOption = require("./internal/check-option.js"),
	isJSONXChain = require("./internal/is-json-x-chain.js");
/**
 * @private
 * @function nestifyInternal
 * @param {any} item
 * @param {object} runtime
 * @returns {any}
 */
function nestifyInternal(item, runtime) {
	if (Array.isArray(item) === true) {
		item.forEach((element, index) => {
			item[index] = nestifyInternal(element);
		});
		return item;
	};
	if (advancedDetermine.isObjectPair(item) !== false) {
		let itemKeys = Object.keys(item),
			queueArrayChain = [],
			queueArrayOnly = [],
			queueFault = [],
			queueObjectPairChain = [],
			queueObjectPairOnly = [],
			result;
		itemKeys.forEach((key) => {
			if (key.search(/^\[(?:[0-9]|[1-9][0-9]+?)\]$/giu) === 0) {
				queueArrayOnly.push(key);
			} else if (key.search(/^\[(?:[0-9]|[1-9][0-9]+?)\](?:\.[$_a-z][$0-9_a-z]*?|\[[0-9]\]|\[[1-9][0-9]+?\])*?$/giu) === 0) {
				queueArrayChain.push(key);
			} else if (key.search(/^[$_a-z][$0-9_a-z]*?$/giu) === 0) {
				queueObjectPairOnly.push(key);
			} else if (key.search(/^[$_a-z][$0-9_a-z]*?(?:\.[$_a-z][$0-9_a-z]*?|\[[0-9]\]|\[[1-9][0-9]+?\])*?$/giu) === 0) {
				queueObjectPairChain.push(key);
			} else {
				queueFault.push(key);
			};
		});
		while (queueFault.length > 0) {
			let keyCurrent = queueFault.shift();
			if (typeof result === "undefined") {
				result = {};
			};
			result[keyCurrent] = ((runtime.recursively === true) ? nestifyInternal(item[keyCurrent], runtime) : item[keyCurrent]);
		};
		while (queueObjectPairOnly.length > 0) {
			let keyCurrent = queueObjectPairOnly.shift();
			if (typeof result === "undefined") {
				result = {};
			};
			result[keyCurrent] = ((runtime.recursively === true) ? nestifyInternal(item[keyCurrent], runtime) : item[keyCurrent]);
		};
		while (queueObjectPairChain.length > 0) {
			let keyCurrent = queueObjectPairChain.shift();
			if (typeof result === "undefined") {
				result = {};
			};
			let keyCurrentFront = keyCurrent.match(/^[$_a-z][$0-9_a-z]*?(?=[.[])/giu)[0];
			if (advancedDetermine.isObjectPair(result[keyCurrentFront]) === false) {
				result[keyCurrentFront] = {};
			};
			let delta = {},
				keySet = [];
			delta[keyCurrent.replace(keyCurrentFront, "").replace(/^\./giu, "")] = item[keyCurrent];
			queueObjectPairChain.forEach((element) => {
				if (element.startsWith(keyCurrentFront) === true) {
					keySet.push(element);
				};
			});
			keySet.forEach((element) => {
				delta[element.replace(keyCurrentFront, "").replace(/^\./giu, "")] = item[element];
				queueObjectPairChain.splice(queueObjectPairChain.indexOf(element), 1);
			});
			result[keyCurrentFront] = nestifyInternal(delta, runtime);
		};
		while (queueArrayOnly.length > 0) {
			let keyCurrent = queueArrayOnly.shift();
			if (advancedDetermine.isObjectPair(result) === false) {
				if (typeof result === "undefined") {
					result = [];
				};
				result[Number(keyCurrent.replace(/^\[(?<index>[0-9]|[1-9][0-9]+?)\]$/giu, "$<index>"))] = ((runtime.recursively === true) ? nestifyInternal(item[keyCurrent], runtime) : item[keyCurrent]);
			} else {
				result[keyCurrent] = item[keyCurrent];
			};
		};
		while (queueArrayChain.length > 0) {
			let keyCurrent = queueArrayChain.shift();
			if (advancedDetermine.isObjectPair(result) === false) {
				if (typeof result === "undefined") {
					result = [];
				};
				let keyCurrentFront = keyCurrent.match(/^\[(?:[0-9]|[1-9][0-9]+?)\](?=\.[$_a-z][$0-9_a-z]*?|\[[0-9]\]|\[[1-9][0-9]+?\])/giu)[0];
				let keyCurrentFrontIndex = Number(keyCurrentFront.replace(/^\[(?<index>[0-9]|[1-9][0-9]+?)\]$/giu, "$<index>"));
				if (advancedDetermine.isObjectPair(result[keyCurrentFrontIndex]) === false) {
					result[keyCurrentFrontIndex] = {};
				};
				let delta = {},
					keySet = [];
				delta[keyCurrent.replace(keyCurrentFront, "").replace(/^\./giu, "")] = item[keyCurrent];
				queueArrayChain.forEach((element) => {
					if (element.startsWith(keyCurrentFront) === true) {
						keySet.push(element);
					};
				});
				keySet.forEach((element) => {
					delta[element.replace(keyCurrentFront, "").replace(/^\./giu, "")] = item[element];
					queueArrayChain.splice(queueArrayChain.indexOf(element), 1);
				});
				result[keyCurrentFront] = nestifyInternal(delta, runtime);
			} else {
				result[keyCurrent] = item[keyCurrent];
			};
		};
		return result;
	};
	return item;
};
/**
 * @function nestify
 * @description Cause all sub-JSON keys splitted into it recursively down.
 * @param {(any[]|object)} item JSON that need to nestify.
 * @param {object} [option={}] Option.
 * @param {boolean} [option.recursively=true] Recursively nestify.
 * @returns {(any[]|object)} A nestified JSON.
 */
function nestify(item, option = {}) {
	checkOption(option);
	let runtime = {
		recursively: true
	};
	if (isJSONXChain(item) === false) {
		if (Array.isArray(item) === false && advancedDetermine.isObjectPair(item) === false) {
			throw new TypeError(`Argument \`item\` must be type of JSON!`);
		};
		console.warn(`Function \`nestify\` is not fully supported illegal namespace character(s) in the key(s) and/or non-JSON value(s) in the value(s), and maybe return an unexpected result!`);
	};
	if (typeof option.recursively !== "undefined") {
		if (typeof option.recursively !== "boolean") {
			throw new TypeError(`Argument \`option.recursively\` must be type of boolean!`);
		};
		runtime.recursively = option.recursively;
	};
	return nestifyInternal(item, runtime);
};
module.exports = nestify;
