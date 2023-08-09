const n = 4;
function sum(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i * (i + 1);
  }
  return sum;
}
console.log(` Giá trị của biểu thức trên là: ${sum(n)}`);