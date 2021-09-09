# JMESPath Modification Changelog

## Preface

This modification changelog is provided specially due to the requirement from Apache License 2.0 used by JMESPath.

## Change

> For planned change(s), it is marked as task list:
> - [ ] Example

- Convert to modern format
  - Convert single quote string `'XXXX'` to double quote string `"XXXX"`
  - Convert string operate (`"XX" + YYYY + "XX"`) to template literals (template strings) (<code>\`XX${YYYY}XX\`</code>)
  - Convert `new Error("TypeError: XXXX")` to `new TypeError("XXXX")`
- Convert UMD to NodeJS export
- Convert `XXXX.prototype.XXXX` to type of class
  - Convert class method without usage of `this` as function (maybe also optimize):
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
- Optimize functions:
  - `isAlpha`
  - `isAlphaNum`
  - `isFalse`
  - `isNum`
- Remove `else { return XXXX }`
- Remove polyfill functions:
  - `isArray`
  - `objValues`
  - `trimLeft`
- Remove unreachable/useless code(s)
- Rename function `strictDeepEqual` to `areEqual`
- Replace `var` with `const`/`let`
  - Fix `switch case XXXX: { let }` cause error
- [ ] Change to return `undefined` instead of `null` when nothing is match
- [ ] Convert `this._XXXX` to private
- [ ] Convert `XXXX++` which outside `for-loop` to `XXXX += 1`
- [ ] Format as CommonJS and ModuleJS
