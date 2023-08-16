const numbers = [5, 1, 9, 8, 10];
const addElement = 4;

const sortedArray = numbers.sort((a, b) => a - b);

let newElement = 0;
for (let i = 0; i < sortedArray.length; i++) {
  if (sortedArray[i] > addElement) {
    newElement = i;
    break;
  }
}

const insertedArray = Array.prototype.concat(
  sortedArray.slice(0, newElement),
  [addElement],
  sortedArray.slice(newElement)
);

console.log(`Mảng sau khi thay đổi là: ${insertedArray}`);
