var a = [1, 2, 3, 5, 8];

//a.
console.log("a[5]=" + a[5]);
//b.
for (let i = 0; i < a.length; i++) {
  console.log("a[" + i + "]=" + a[i]);
}
//c.
let sum = 0;
for (let value of a) {
  sum += value;
}
console.log("sum of a is " + sum);
//d.
const sumOfArr = (arr) => {
  let sum = 0;
  for (let v of arr) sum += v;
  return sum;
};

console.log("sum of a is " + sumOfArr(a));
//e.
a[8] = 55;
//f.
console.log("a[8]=" + a[8]);
//g.
console.log("length of a is " + a.length);
//h.
console.log(a);
//i.
let sum1 = 0;
for (let v of a) {
  sum1 += v;
}
console.log("sum of a is " + sum1);
//sum is NaN because of the empty items
