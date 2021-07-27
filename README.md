# More Method (NodeJS Edition)

[`MoreMethod.NodeJS`](https://github.com/hugoalh-studio/more-method-nodejs) - A NodeJS module to provide more method.

[![GitHub Contributors](https://img.shields.io/github/contributors/hugoalh-studio/more-method-nodejs?label=Contributors&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh-studio/more-method-nodejs/graphs/contributors)
[![GitHub Issues](https://img.shields.io/github/issues-raw/hugoalh-studio/more-method-nodejs?label=Issues&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh-studio/more-method-nodejs/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr-raw/hugoalh-studio/more-method-nodejs?label=Pull%20Requests&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh-studio/more-method-nodejs/pulls)
[![GitHub Discussions](https://img.shields.io/github/discussions/hugoalh-studio/more-method-nodejs?label=Discussions&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh-studio/more-method-nodejs/discussions)
[![GitHub Stars](https://img.shields.io/github/stars/hugoalh-studio/more-method-nodejs?label=Stars&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh-studio/more-method-nodejs/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/hugoalh-studio/more-method-nodejs?label=Forks&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh-studio/more-method-nodejs/network/members)
![GitHub Languages](https://img.shields.io/github/languages/count/hugoalh-studio/more-method-nodejs?label=Languages&logo=github&logoColor=ffffff&style=flat-square)
[![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/hugoalh-studio/more-method-nodejs?label=Grade&logo=codefactor&logoColor=ffffff&style=flat-square)](https://www.codefactor.io/repository/github/hugoalh-studio/more-method-nodejs)
[![LGTM Alerts](https://img.shields.io/lgtm/alerts/g/hugoalh-studio/more-method-nodejs?label=Alerts&logo=lgtm&logoColor=ffffff&style=flat-square)
![LGTM Grade](https://img.shields.io/lgtm/grade/javascript/g/hugoalh-studio/more-method-nodejs?label=Grade&logo=lgtm&logoColor=ffffff&style=flat-square)](https://lgtm.com/projects/g/hugoalh-studio/more-method-nodejs)
[![License](https://img.shields.io/static/v1?label=License&message=MIT&color=brightgreen&style=flat-square)](./LICENSE.md)

| **Release** | **Latest** | **Pre** |
|:-:|:-:|:-:|
| [**GitHub**](https://github.com/hugoalh-studio/more-method-nodejs/releases) ![GitHub Total Downloads](https://img.shields.io/github/downloads/hugoalh-studio/more-method-nodejs/total?label=%20&style=flat-square) | ![GitHub Latest Release Version](https://img.shields.io/github/release/hugoalh-studio/more-method-nodejs?sort=semver&label=%20&style=flat-square) (![GitHub Latest Release Date](https://img.shields.io/github/release-date/hugoalh-studio/more-method-nodejs?label=%20&style=flat-square)) | ![GitHub Latest Pre-Release Version](https://img.shields.io/github/release/hugoalh-studio/more-method-nodejs?include_prereleases&sort=semver&label=%20&style=flat-square) (![GitHub Latest Pre-Release Date](https://img.shields.io/github/release-date-pre/hugoalh-studio/more-method-nodejs?label=%20&style=flat-square)) |
| [**NPM**](https://www.npmjs.com/package/@hugoalh/more-method) ![NPM Total Downloads](https://img.shields.io/npm/dt/@hugoalh/more-method?label=%20&style=flat-square) | ![NPM Latest Release Version](https://img.shields.io/npm/v/@hugoalh/more-method/latest?label=%20&style=flat-square) | ![NPM Latest Pre-Release Version](https://img.shields.io/npm/v/@hugoalh/more-method/pre?label=%20&style=flat-square) |

## 📝 Description

### 🌟 Feature

- Provide missed method(s).
- Native support for CommonJS and ECMAScript.

## 📄 Documentation

*For the official documentation, please visit [GitHub Repository Wiki](https://github.com/hugoalh-studio/more-method-nodejs/wiki).*

### Getting Started (Excerpt)

NodeJS (>= v14.15.0) & NPM (>= v6.14.8):

```sh
npm install @hugoalh/more-method
```

### API (Excerpt)

> | **Legend** | **Description** |
> |:-:|:--|
> | 🧪 | **Experimental:** This is in testing, may not available in the latest version, also may change or remove in the future version. |

- `changeCase(item, option?)`
- `concatenate(...items)`
- `depth(item)`
- `divide(item, piece, option?)`
- `ensurePrefix(item, prefix)`
- `ensureSuffix(item, suffix)`
- `escapeRegularExpressionSpecialCharacter(item)`
- `flatten(item, option?)`
- `length(item, option?)`
- `mathematics.combination(n, k)`
- `mathematics.cumulativeCombination(n)`
- `mathematics.cumulativePermutation(n)`
- `mathematics.factorial(n)`
- `mathematics.greatestCommonDivisor(...items)`
- `mathematics.hypotenuse(item1, item2, invertHypotenuse?)`
- `mathematics.leastCommonMultiple(...items)`
- `mathematics.mean(...items)`
- `mathematics.median(...items)`
- `mathematics.permutation(n, k)`
- `parallelProcess(...items)` 🧪
- `removeANSIEscapeCode(item)`
- `removeDuplicate(item)`
- `reverseIndex(item)`
- `split(item)`
- `toObject(item)`

### Example (Excerpt)

```js
const moreMethod = require("@hugoalh/more-method");

let array1 = ["one", "two", "three"];
let array2 = ["one", "two", "three"];
console.log(Array.reverse(array1));// ["three", "two", "one"]
console.log(array1);// ["three", "two", "one"]
console.log(moreMethod.reverseIndex(array2));// ["three", "two", "one"]
console.log(array2);// ["one", "two", "three"]
let array3 = moreMethod.concatenate(array1, array2);
console.log(array3);// ["three", "two", "one", "one", "two", "three"]
console.log(moreMethod.removeDuplicate(array3));// ["three", "two", "one"]
```
