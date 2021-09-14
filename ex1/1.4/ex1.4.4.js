//a.
const factorial = (n) => {
  let prod = 1;
  for (i = 1; i <= n; i++) prod *= i;
  return prod;
};

console.log(factorial(0));
console.log(factorial(1));
console.log(factorial(2));

//b.
const power = (m, n) => {
  let prod = 1;
  for (let i = 1; i <= Math.abs(n); i++) prod *= m;
  return n >= 0 ? prod : 1 / prod;
};

console.log("1^4=" + power(1, 4));
console.log("0^4=" + power(0, 4));
console.log("0^0=" + power(0, 0));
console.log("2^-1=" + power(2, -1));
