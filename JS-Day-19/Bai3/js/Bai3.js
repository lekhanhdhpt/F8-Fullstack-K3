const arr = [1, 3, 2, 3, 5, 6, 7, 4, 2, 4, 5];
const newArr = [];
for (var i = 0 ; i < arr.length ; i++) {
    if (!newArr.includes(arr[i])) {
        newArr.push(arr[i]);
    }
}

console.log(`Mảng sau khi lọc là: ${newArr}`);