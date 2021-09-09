# JMESPath Modification Changelog

## Preface

This modification changelog is provided specially due to the requirement from Apache License 2.0 used by JMESPath.

## Change

> For planned change(s), it is marked as task list:
> - [ ] Example

- Convert `XXXX.prototype.XXXX` to type of class
- Convert to modern format
  - Convert string operate (`"XX" + YYYY + "XX"`) to template literals (template strings) (<code>\`XX${YYYY}XX\`</code>)
  - Convert `new Error("TypeError: XXXX")` to `new TypeError("XXXX")`
- Convert UMD to NodeJS export
- Remove `else { return XXXX }`
- Remove polyfill function(s):
  - `isArray`
  - `trimLeft`
- Remove unreachable/useless code(s)
- Replace `var` with `const` or `let`
  - Fix `switch case XXXX: { let }` cause error
- [ ] Change to return `undefined` instead of `null` when nothing is match
- [ ] Convert `this._XXXX` to private
- [ ] Convert `XXXX++` which outside `for-loop` to `XXXX += 1`
- [ ] Format as CommonJS and ModuleJS
