function sortNumber(a, b, c) {
  if (a > b) [a, b] = [b, a];
  if (a > c) [a, c] = [c, a];
  if (b > c) [b, c] = [c, b];
  console.log("Thứ tự tăng dần của 3 số: " + a, b, c);
}

sortNumber(3, 10, 6);
