var amount = 300,
  cost,
  bill;

if (amount >= 0 && amount <= 50) {
  cost = 1678;
  bill = cost * amount;
} else if (amount >= 51 && amount <= 100) {
  cost = 1734;
  bill = 1678 * 50 + cost * (amount - 50);
} else if (amount >= 101 && amount <= 200) {
  cost = 2014;
  bill = 1678 * 50 + 1734 * 50 + cost * (amount - 100);
} else if (amount >= 201 && amount <= 300) {
  cost = 2536;
  bill = 1678 * 50 + 1734 * 50 + 2014 * 100 + cost * (amount - 200);
} else if (amount >= 301 && amount <= 400) {
  cost = 2834;
  bill =
    1678 * 50 + 1734 * 50 + 2014 * 100 + 2536 * 100 + cost * (amount - 300);
} else {
  cost = 2927;
  bill =
    1678 * 50 +
    1734 * 50 +
    2014 * 100 +
    2536 * 100 +
    2834 * 100 +
    cost * (amount - 400);
}

console.log(`Giá tiền điện phải thanh toán là: ${bill} Đồng`);
