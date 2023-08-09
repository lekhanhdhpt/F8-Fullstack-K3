function NumberTriangle(rows) {
  let number = 1;
  let output = "";

  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= i; j++) {
      output += number + " ";
      number++;
    }
    output += "\n";
  }

  return output;
}

const rows = 5; // Số hàng của tam giác số
const triangle = NumberTriangle(rows);
console.log(triangle);
