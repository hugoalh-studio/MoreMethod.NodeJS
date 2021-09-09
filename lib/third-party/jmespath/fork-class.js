// $<Note>$ This file is use to help for merge different class in ./main.js, do not use in any environment!
class JMESPath {
	constructor() {
		this.functionTable = {
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
	search(node, value) {
		return this.visit(node, value);
	};
	visit(node, value) {
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
				result = this.visit(node.children[0], value);
				for (i = 1; i < node.children.length; i++) {
					result = this.visit(node.children[1], result);
					if (result === null) {
						return null;
					};
				};
				return result;
			case "IndexExpression":
				left = this.visit(node.children[0], value);
				right = this.visit(node.children[1], left);
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
				base = this.visit(node.children[0], value);
				if (!Array.isArray(base)) {
					return null;
				};
				collected = [];
				for (i = 0; i < base.length; i++) {
					current = this.visit(node.children[1], base[i]);
					if (current !== null) {
						collected.push(current);
					};
				};
				return collected;
			case "ValueProjection":
				// Evaluate left child.
				base = this.visit(node.children[0], value);
				if (!isObject(base)) {
					return null;
				};
				collected = [];
				let values = Object.values(base);
				for (i = 0; i < values.length; i++) {
					current = this.visit(node.children[1], values[i]);
					if (current !== null) {
						collected.push(current);
					};
				};
				return collected;
			case "FilterProjection":
				base = this.visit(node.children[0], value);
				if (!Array.isArray(base)) {
					return null;
				};
				let filtered = [];
				let finalResults = [];
				for (i = 0; i < base.length; i++) {
					matched = this.visit(node.children[2], base[i]);
					if (!isFalse(matched)) {
						filtered.push(base[i]);
					};
				};
				for (let j = 0; j < filtered.length; j++) {
					current = this.visit(node.children[1], filtered[j]);
					if (current !== null) {
						finalResults.push(current);
					};
				};
				return finalResults;
			case "Comparator":
				first = this.visit(node.children[0], value);
				second = this.visit(node.children[1], value);
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
				let original = this.visit(node.children[0], value);
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
			case "Identity":
				return value;
			case "MultiSelectList":
				if (value === null) {
					return null;
				};
				collected = [];
				for (i = 0; i < node.children.length; i++) {
					collected.push(this.visit(node.children[i], value));
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
					collected[child.name] = this.visit(child.value, value);
				};
				return collected;
			case "OrExpression":
				matched = this.visit(node.children[0], value);
				if (isFalse(matched)) {
					matched = this.visit(node.children[1], value);
				};
				return matched;
			case "AndExpression":
				first = this.visit(node.children[0], value);
				if (isFalse(first) === true) {
					return first;
				};
				return this.visit(node.children[1], value);
			case "NotExpression":
				first = this.visit(node.children[0], value);
				return isFalse(first);
			case "Literal":
				return node.value;
			case TOK_PIPE:
				left = this.visit(node.children[0], value);
				return this.visit(node.children[1], left);
			case TOK_CURRENT:
				return value;
			case "Function":
				let resolvedArgs = [];
				for (i = 0; i < node.children.length; i++) {
					resolvedArgs.push(this.visit(node.children[i], value));
				};
				return this.callFunction(node.name, resolvedArgs);
			case "ExpressionReference":
				let refNode = node.children[0];
				// Tag the node with a specific attribute so the type checker verify the type.
				refNode.jmespathType = TOK_EXPREF;
				return refNode;
			default:
				throw new Error(`Unknown node type: ${node.type}`);
		};
	};
	callFunction(name, resolvedArgs) {
		let functionEntry = this.functionTable[name];
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
			mapped.push(this.visit(exprefNode, elements[i]));
		};
		return mapped;
	};
	_functionSortBy(resolvedArgs) {
		let sortedArray = resolvedArgs[0].slice(0);
		if (sortedArray.length === 0) {
			return sortedArray;
		};
		let exprefNode = resolvedArgs[1];
		let requiredType = getTypeName(this.visit(exprefNode, sortedArray[0]));
		if ([TYPE_NUMBER, TYPE_STRING].indexOf(requiredType) < 0) {
			throw new Error("TypeError");
		};
		let decorated = [];
		for (let i = 0; i < sortedArray.length; i++) {
			decorated.push([i, sortedArray[i]]);
		};
		decorated.sort((a, b) => {
			let exprA = this.visit(exprefNode, a[1]);
			let exprB = this.visit(exprefNode, b[1]);
			if (getTypeName(exprA) !== requiredType) {
				throw new TypeError(`expected ${requiredType}, received ${getTypeName(exprA)}`);
			} else if (getTypeName(exprB) !== requiredType) {
				throw new TypeError(`TypeError: expected ${requiredType}, received ${getTypeName(exprB)}`);
			};
			if (exprA > exprB) {
				return 1;
			} else if (exprA < exprB) {
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
		let keyFunction = this.createKeyFunction(exprefNode, [TYPE_NUMBER, TYPE_STRING]);
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
		let keyFunction = this.createKeyFunction(exprefNode, [TYPE_NUMBER, TYPE_STRING]);
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
	createKeyFunction(exprefNode, allowedTypes) {
		return (x) => {
			let current = this.visit(exprefNode, x);
			if (allowedTypes.indexOf(getTypeName(current)) < 0) {
				throw new TypeError(`expected one of ${allowedTypes}, received ${getTypeName(current)}`);
			};
			return current;
		};
	};
};
