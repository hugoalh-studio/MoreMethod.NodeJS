const combination = require("./mathematics/combination.js");
const cumulativeCombination = require("./mathematics/cumulative-combination.js");
const cumulativePermutation = require("./mathematics/cumulative-permutation.js");
const factorial = require("./mathematics/factorial.js");
const greatestCommonDivisor = require("./mathematics/greatest-common-divisor.js");
const hypotenuse = require("./mathematics/hypotenuse.js");
const invertHypotenuse = require("./mathematics/invert-hypotenuse.js");
const leastCommonMultiple = require("./mathematics/least-common-multiple.js");
const mean = require("./mathematics/mean.js");
const permutation = require("./mathematics/permutation.js");
module.exports = {
	average: mean,
	combination: combination,
	combine: combination,
	cumulativeCombination: cumulativeCombination,
	cumulativeCombine: cumulativeCombination,
	cumulativePermutation: cumulativePermutation,
	cumulativePermute: cumulativePermutation,
	factor: factorial,
	factorial: factorial,
	gcd: greatestCommonDivisor,
	gcf: greatestCommonDivisor,
	gcm: greatestCommonDivisor,
	greatestCommonDivisor: greatestCommonDivisor,
	greatestCommonFactor: greatestCommonDivisor,
	greatestCommonMeasure: greatestCommonDivisor,
	hcd: greatestCommonDivisor,
	hcf: greatestCommonDivisor,
	highestCommonDivisor: greatestCommonDivisor,
	highestCommonFactor: greatestCommonDivisor,
	hypot: hypotenuse,
	hypotenuse: hypotenuse,
	invertHypot: invertHypotenuse,
	invertHypotenuse: invertHypotenuse,
	lcm: leastCommonMultiple,
	leastCommonMultiple: leastCommonMultiple,
	lowestCommonMultiple: leastCommonMultiple,
	mean: mean,
	median: require("./mathematics/median.js"),
	nCr: combination,
	nPr: permutation,
	permutation: permutation,
	permute: permutation,
	ratio: require("./mathematics/ratio.js"),
	scm: leastCommonMultiple,
	smallestCommonMultiple: leastCommonMultiple
};
