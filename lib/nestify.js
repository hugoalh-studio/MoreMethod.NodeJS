const advancedDetermine = require("@hugoalh/advanced-determine");
/**
 * @function nestify
 * @description Cause all sub-JSON keys splitted into it recursively down.
 * @param {object} item JSON that need to nestify.
 * @returns {object} A nestified JSON.
 */
function nestify(item) {
	if (advancedDetermine.isJSON(item, { allowArrayRoot: false }) === false) {
		throw new TypeError(`Argument \`item\` must be type of JSON (non-array-root)!`);
	};
	let resultIsArray = false;
	Object.keys(item).forEach((element) => {
		if (element.search(/[-\s]/giu) !== -1) {
			throw new SyntaxError(`Function \`nestify\` is not supported object key(s) with hyphen and/or spacing character(s)!`);
		};
		resultIsArray = (element.search(/^\[\d+\]/giu) === 0);
	});
	let itemList = Object.keys(item).sort(),
		result = (resultIsArray === true ? "[]" : "{}");
	for (let indexItemList = 0; indexItemList < itemList.length; indexItemList++) {
		let key = itemList[indexItemList];
		if (
			(resultIsArray === true && key.search(/^\[\d+\]/giu) === 0) ||
			(resultIsArray === false && key.search(/^\[\d+\]/giu) === -1)
		) {
			let chainList = [],
				chainSplit = key.split(".");
			while (chainSplit.length > 0) {
				let current = chainSplit.shift();
				if (typeof current === "number") {
					chainList.push(current);
				} else if (current.search(/^\[\d+\]$/giu) === 0) {
					chainList.push(Number(current.replace("[", "").replace("]", "")));
				} else {
					let currentDelta = current.match(/\[\d+\]/giu) || [];
					if (currentDelta.length > 1 && current.search(/\[\d+\]+$/giu) !== -1) {
						chainSplit.unshift(...currentDelta.map((element) => {
							return Number(element.replace("[", "").replace("]", ""));
						}));
						continue;
					} else if (currentDelta.length === 1 && current.search(/\[\d+\]$/giu) !== -1) {
						let index = current.replace(/^.*\[(?<index>\d+)\]/giu, "$<index>");
						chainList.push(`"${current.replace(`[${index}]`, "")}"`);
						chainSplit.unshift(Number(index));
					} else {
						chainList.push(`"${current}"`);
					};
				};
				let data;
				if (chainSplit.length > 0) {
					data = (typeof chainSplit[0] === "number") ? "[]" : "{}";
				} else {
					data = JSON.stringify(item[itemList[indexItemList]]);
				};
				result = eval(`let data = ${result}; if (typeof data[${chainList.join("][")}] === "undefined") { data[${chainList.join("][")}] = ${data} }; JSON.stringify(data);`);
			};
		};
	};
	return JSON.parse(result);
};
module.exports = nestify;
