function isPrime(n) {
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return n > 1;
}

function getAverage(arr) {
  let sum = 0;
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (isPrime(arr[i])) {
      sum += arr[i];
      count++;
    }
  }
  if (count === 0) {
    return "Không có số nguyên tố";
  } else {
    return sum / count;
  }
}

const arr1 = [2, 3, 5, 7, 11];
console.log(getAverage(arr1)); // 5

const arr2 = [1, 4, 6, 8, 10];
console.log(getAverage(arr2)); // Không có số nguyên tố
