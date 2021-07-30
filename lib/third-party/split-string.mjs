// $<Vendor>$ split-string (GitHub: https://github.com/jonschlinkert/split-string)(NPM: https://npmjs.com/package/split-string)
// $<Note>$ With optimization.
/**
 * @function splitString
 * @param {string} input
 * @param {object} [options={}]
 * @param {function} [fn]
 * @returns {string[]}
 */
function splitString(input, options = {}, fn) {
	if (typeof input !== "string") {
		throw new TypeError("expected a string");
	};
	if (typeof options === "function") {
		fn = options;
		options = {};
	};
	let separator = options.separator || ".";
	let ast = {
		type: "root",
		nodes: [],
		stash: [""]
	};
	let stack = [ast];
	let state = {
		input,
		separator,
		stack
	};
	let string = input;
	let value, node;
	let i = -1;
	state.bos = () => {
		return i === 0;
	};
	state.eos = () => {
		return i === string.length;
	};
	state.prev = () => {
		return string[i - 1];
	};
	state.next = () => {
		return string[i + 1];
	};
	let quotes = options.quotes || [];
	let openers = options.brackets || {};
	if (options.brackets === true) {
		openers = {
			"[": "]",
			"(": ")",
			"{": "}",
			"<": ">"
		};
	};
	if (options.quotes === true) {
		quotes = ["\"", "'", "`"];
	};
	let closers = invert(openers);
	let keep = options.keep || ((value) => {
		return value !== "\\";
	});

	const block = () => {
		return (state.block = stack[stack.length - 1]);
	};
	const peek = () => {
		return string[i + 1];
	};
	const next = () => {
		return string[++i];
	};
	const append = (value) => {
		state.value = value;
		if (value && keep(value, state) !== false) {
			state.block.stash[state.block.stash.length - 1] += value;
		};
	};
	const closeIndex = (value, startIdx) => {
		let idx = string.indexOf(value, startIdx);
		if (idx > -1 && string[idx - 1] === "\\") {
			idx = closeIndex(value, idx + 1);
		};
		return idx;
	};
	for (; i < string.length - 1;) {
		state.value = value = next();
		state.index = i;
		block();
		if (value === "\\") {
			if (peek() === "\\") {
				append(value + next());
			} else {
				append(value);
				append(next());
			};
			continue;
		};
		if (quotes.includes(value)) {
			let pos = i + 1;
			let idx = closeIndex(value, pos);
			if (idx > -1) {
				append(value);
				append(string.slice(pos, idx));
				append(string[idx]);
				i = idx;
				continue;
			};
			append(value);
			continue;
		};
		if (options.brackets !== false && openers[value]) {
			node = {
				type: "bracket",
				nodes: []
			};
			node.stash = (keep(value) !== false ? [value] : [""]);
			node.parent = state.block;
			state.block.nodes.push(node);
			stack.push(node);
			continue;
		};
		if (options.brackets !== false && closers[value]) {
			if (stack.length === 1) {
				append(value);
				continue;
			};
			append(value);
			node = stack.pop();
			block();
			append(node.stash.join(""));
			continue;
		};
		if (value === separator && state.block.type === "root") {
			if (typeof fn === "function" && fn(state) === false) {
				append(value);
				continue;
			};
			state.block.stash.push("");
			continue;
		};
		append(value);
	};
	node = stack.pop();
	while (node !== ast) {
		if (options.strict === true) {
			let column = i - node.stash.length + 1;
			throw new SyntaxError(`Unmatched: "${node.stash[0]}", at column ${column}`);
		};
		value = node.parent.stash.pop() + node.stash.join(".");
		node.parent.stash = node.parent.stash.concat(value.split("."));
		node = stack.pop();
	};
	return node.stash;
};
function invert(obj) {
	let inverted = {};
	for (const key of Object.keys(obj)) {
		inverted[obj[key]] = key;
	};
	return inverted;
};
export default splitString;
