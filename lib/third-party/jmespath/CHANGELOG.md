# JMESPath Modification Changelog

## Preface

This modification changelog is provided specially due to the requirement from Apache License 2.0 used by JMESPath.

## Change

> For planned change(s), it is marked as task list:
> - [ ] Example

- Convert function prototype (`XXXX.prototype.XXXX`) to type of class
- Convert `if (XXXX) { return XXXX } else { return XXXX }` to `if (XXXX) { return XXXX } return XXXX`
- Convert `new Error("TypeError: XXXX")` to `new TypeError("XXXX")`
- Convert single quote string (`'XXXX'`) to double quote string (`"XXXX"`)
- Convert string operates (`"XX" + YYYY + "XX"`) to template literals (template strings) (<code>\`XX${YYYY}XX\`</code>)
- Convert UMD export to NodeJS export
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
- Fix typo "Sytanx"
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
- Remove unreachable/useless code(s)
- Rename function `strictDeepEqual` to `areEqual`
- Replace `var` with `const`/`let`
  - Fix `switch case XXXX: { let }` cause error
- [ ] Change to return `undefined` instead of `null` when nothing is match
- [ ] Convert class property `this._XXXX` (public) to `this.#XXXX` (private)
- [ ] Convert `XXXX++` which outside `for-loop` to `XXXX += 1`
- [ ] Format as CommonJS and ModuleJS
- [ ] Merge to Replaceholder
- [ ] Resolve the interpreter (`TreeInterpreter`) and runtime (`Runtime`) depend on each other to avoid the cyclic dependency
- [ ] Use @hugoalh/advanced-determine to replace some situration(s)
- [ ] ? Convert class `Parser` to function `parse`
- [ ] ? Merge fork https://github.com/jmespath/jmespath.js/compare/master...alexander-gush:master
- [ ] ? Merge fork https://github.com/jmespath/jmespath.js/compare/master...daz-is:master
- [ ] ? Merge fork https://github.com/jmespath/jmespath.js/compare/master...MarkSwanson:master
- [ ] ? Merge fork https://github.com/jmespath/jmespath.js/compare/master...Svjard:master
- [ ] ? Merge fork https://github.com/jmespath/jmespath.js/compare/master...TraxTechnologies:master
