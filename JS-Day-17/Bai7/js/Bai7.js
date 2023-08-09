function drawMultiplicationTable() {
  let table = "";

  for (let i = 1; i <= 9; i++) {
    for (let j = 1; j <= 9; j++) {
      table += `${i} x ${j} = ${i * j}\t`;
    }
    table += "\n";
  }

  return table;
}

const multiplicationTable = drawMultiplicationTable();
console.log(multiplicationTable);
