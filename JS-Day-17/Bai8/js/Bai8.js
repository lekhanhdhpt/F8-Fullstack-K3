function calculateExpression(N) {
  if (N === 1) {
    return 1;
  } else {
    return 1 / N + calculateExpression(N - 1);
  }
}

const N = 10; // Giá trị của N
const result = calculateExpression(N);
console.log(result);
