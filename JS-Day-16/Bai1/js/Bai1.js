function swapNumber(a, b) {
    a = a + b;
    b = a - b;
    a = a - b;
    console.log(a, b );
}

swapNumber(10,20);