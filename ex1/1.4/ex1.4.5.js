const FactorialOrPower = (m, n) => {
  if (n == undefined) {
    const factorial = (n) => {
      let prod = 1;
      for (i = 1; i <= n; i++) prod *= i;
      return prod;
    };
    return factorial(m);
  } else {
    let prod = 1;
    for (let i = 1; i <= Math.abs(n); i++) prod *= m;
    return n >= 0 ? prod : 1 / prod;
  }
};

console.log(FactorialOrPower(2));
console.log(FactorialOrPower(3));
console.log(FactorialOrPower(4));
console.log(FactorialOrPower(1, 2));
console.log(FactorialOrPower(2, 2));
console.log(FactorialOrPower(2, 8));
