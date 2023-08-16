const array = [1, 6, 8, 3, 9];

// Khởi tạo giá trị lớn nhất và nhỏ nhất
let max = array[0];
let min = array[0];

// Duyệt qua mảng
for (let i = 1; i < array.length; i++) {
  // So sánh từng phần tử với giá trị lớn nhất và nhỏ nhất hiện tại
  if (array[i] > max) {
    max = array[i];
  }

  if (array[i] < min) {
    min = array[i];
  }
}

// Tìm vị trí của số lớn nhất và nhỏ nhất
const maxIndex = array.indexOf(max);
const minIndex = array.indexOf(min);

console.log("Số lớn nhất là: " + max);
console.log("Số nhỏ nhất là: " + min);
console.log("Vị trí của số lớn nhất là: " + maxIndex);
console.log("Vị trí của số nhỏ nhất là: " + minIndex);
