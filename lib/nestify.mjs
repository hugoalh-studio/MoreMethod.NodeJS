import * as advancedDetermine from "@hugoalh/advanced-determine";
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
		resultIsArray = (element.search(/^\[/giu) === 0);
	});
	let itemList = Object.keys(item),
		result = (resultIsArray === true ? "[]" : "{}");
	for (let indexItemList = 0; indexItemList < itemList.length; indexItemList++) {
		let element = itemList[indexItemList];
		if (
			(resultIsArray === true && element.search(/^\[/giu) === 0) ||
			(resultIsArray === false && element.search(/^\[/giu) === -1)
		) {
			let chainList = [],
				chainSplit = element.split(".");
			while (chainSplit.length > 0) {
				let current = chainSplit.shift();
				if (typeof current === "number") {
					chainList.push(current);
				} else {
					let currentDelta = current.match(/\[\d+\]/giu) || [];
					if (currentDelta.length === 1 && current.search(/\[\d+\]$/giu) !== -1) {
						let index = current.replace(/^.*\[(?<index>\d+)\]/giu, "$<index>");
						current = current.replace(`[${index}]`, "");
						chainSplit.unshift(Number(index));
					};
					chainList.push(`"${current}"`);
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
export default nestify;
