function isSameSign(a, b) {
  return (a < 0 && b < 0) || (a >= 0 && b >= 0);
}

function displayResult(a, b) {
  if (isSameSign(a, b)) {
    console.log("Hai số có cùng dấu.");
  } else {
    console.log("Hai số không có cùng dấu.");
  }
}

displayResult(-1, -2); // Hai số có cùng dấu.
displayResult(-1, 2); // Hai số không  cùng dấu.
