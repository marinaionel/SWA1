const { test, expect } = require("@jest/globals");
const { f1, f2 } = require("./4.4");

test("f2", () => {
  let f = f2();
  expect(f(0)).toEqual([]);
  expect(f("abc")).toEqual([]);
  expect(f(undefined)).toEqual([]);
  expect(f(1)).toEqual([0]);
  expect(f(2)).toEqual([0, 1]);
  expect(f(9)).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21]);
});

test("f1", () => {
  expect(f1(2)(3)).toBe(3 ** 2);
  expect(f1(5)(10)).toBe(10 ** 5);
});
