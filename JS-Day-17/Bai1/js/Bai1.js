let cost = 0,
  discount;
function calculateTaxiFare(distance) {
  let taxifare = 0;
  if (distance <= 1) {
    taxifare = 15000;
    cost = taxifare * distance;
  } else if (distance > 1 && distance <= 5) {
    taxifare = 13500;
    cost = 15000 + taxifare * (distance - 1);
  } else {
    taxifare = 11000;
    cost = 15000 + 13500 * 4 + taxifare * (distance - 5);
    if (distance > 120) {
      discount = 0.1;
      cost = cost - cost * discount;
    }
  }

  return cost;
}

const distance = 10;
const fare = calculateTaxiFare(distance);
console.log(` Giá tiền quãng đường đi ${distance}km là: ${fare} đồng`);
