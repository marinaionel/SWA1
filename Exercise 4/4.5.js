// Write curried versions of the following functions
// function add(n, m) {
//   return n + m
// }
const add = (n) => (m) => n + m;
// function greater(n, m) {
//   return n > m
// }
const greater = (n) => (m) => n > m;
// function get(attr, o) {
//   return o[attr]
// }
const get = (attr) => (o) => o[attr];
// function pipe(f, g) {
//   return function(x) {
//     let r = f(x)
//     return g(r)
//   }
// }
const pipe = (f) => (g) => (x) => {
  let r = f(x);
  return g(r);
};

// Rewrite your solution to names(), adults() and total_salariesof_seniors() using these functions.
