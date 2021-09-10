# JMESPath Modification Changelog

## Preface

This modification changelog is provided specially due to the requirement from Apache License 2.0 used by JMESPath.

## Change

> For planned change(s), it is marked as task list:
> - [ ] Example

- Add access to root value via `$` (from fork @daz-is)
- Convert class method without usage of `this` to type of function (maybe also optimize and/or rename):
  - `_functionAbs`
  - `_functionAvg`
  - `_functionCeil`
  - `_functionContains`
  - `_functionEndsWith`
  - `_functionFloor`
  - `_functionJoin`
  - `_functionKeys`
  - `_functionLength`
  - `_functionMax`
  - `_functionMerge`
  - `_functionMin`
  - `_functionNotNull`
  - `_functionReverse`
  - `_functionSort`
  - `_functionStartsWith`
  - `_functionSum`
  - `_functionToArray`
  - `_functionToNumber`
  - `_functionToString`
  - `_functionType`
  - `_functionValues`
  - `capSliceRange`
  - `computeSliceParams`
  - `errorToken`
  - `getTypeName`
  - `looksLikeJSON`
- Convert function prototype (`XXXX.prototype.XXXX`) to type of class
- Convert `if (XXXX) { return XXXX } else { return XXXX }` to `if (XXXX) { return XXXX } return XXXX`
- Convert `new Error("TypeError: XXXX")` to `new TypeError("XXXX")`
- Convert single quote string (`'XXXX'`) to double quote string (`"XXXX"`)
- Convert string operates (`"XX" + YYYY + "XX"`) to template literals (template strings) (<code>\`XX${YYYY}XX\`</code>)
- Convert UMD export to NodeJS export
- Fix typo "Sytanx"
- Format as CommonJS and ModuleJS
- Include fork works:
  - https://github.com/alexander-gush/jmespath.js
  - https://github.com/daz-is/jmespath.js
- Merge class `Lexer`, `Parser`, `Runtime` and `TreeInterpreter`
- Optimize functions:
  - `isAlpha`
  - `isAlphaNum`
  - `isFalse`
  - `isNum`
- Reduce file size
- Remove polyfill functions:
  - `isArray`
  - `objValues`
  - `trimLeft`
- Remove unreachable/useless functions:
  - `compile`
  - `merge`
  - `tokenize`
- Rename function `strictDeepEqual` to `areEqual`
- Resolve class `Runtime` and `TreeInterpreter` no longer depend on each other to avoid the cyclic dependency
- Replace `var` with `const`/`let`
  - Fix `switch (XXXX) { case XXXX: let XXXX }` cause error
- [ ] Change to return `undefined` instead of `null` when nothing is match
- [ ] Convert class property `this._XXXX` (public) to `this.#XXXX` (private)
- [ ] Convert `XXXX++` which outside `for-loop` to `XXXX += 1`
- [ ] Merge to Replaceholder
- [ ] Replace function(s) to @hugoalh/advanced-determine function(s) to improve efficiency and performance
