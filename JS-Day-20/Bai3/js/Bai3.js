const arr = [
  ["a", 1, true],
  ["b", 2, false],
];

const strings = arr.map((x) => x[0]);
const numbers = arr.map((x) => x[1]);
const booleans = arr.map((x) => x[2]);

const twoDimensionalArray = [strings, numbers, booleans];

console.log(twoDimensionalArray); // [["a", "b"], [1, 2], [true, false]]


