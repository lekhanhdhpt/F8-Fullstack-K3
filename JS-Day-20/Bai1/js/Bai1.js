function check (arr1, arr2) {
    var result = [];
    for (var i = 0 ; i < arr1.length ; i++) {
        if (arr2.indexOf(arr1[i]) > -1)   {
            result.push(arr1[i]);
        }
    }
    return result;
}

var arrA = [1, 4, 3, 2];
var arrB = [5, 2, 6, 7, 1];
console.log(` Mảng sau khi lọc là: ${check(arrA, arrB)}`);