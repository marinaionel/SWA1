function f1(n) {
  return function pow(m) {
    return m ** n;
  };
}

function f2() {
  return function fib(n) {
    if (n == undefined || typeof n != "number" || n == 0) return [];
    let n1 = 0,
      n2 = 1,
      next = 0;
    let elements = [];
    for (let i = 0; i < n; i++) {
      elements.push(next);
      n1 = n2;
      n2 = next;
      next = n1 + n2;
    }
    return elements.slice(0, n);
  };
}

module.exports = { f1, f2 };
