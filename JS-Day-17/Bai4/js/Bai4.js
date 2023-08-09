function isPrime(number) {
  if (number % 1 === 0) {
    if (number < 2) {
      return false;
    }
    for (let i = 2; i <= Math.sqrt(number); i++) {
      if (number % i === 0) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
}

const n = 2.5;
console.log(isPrime(n));
