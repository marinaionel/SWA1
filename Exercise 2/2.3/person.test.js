const { test, expect } = require("@jest/globals");
const { Person, Employee } = require("./person");

test("Person equals", () => {
  let p = new Person("Pete Smith", 29);
  let obj = undefined;
  expect(p.equals(obj)).toBe(false);
  obj = new Employee("JJ", 9, 0);
  expect(p.equals(obj)).toBe(false);
  obj = null;
  expect(p.equals(obj)).toBe(false);
  obj = Person("JJ", 9);
  expect(p.equals(obj)).toBe(false);
  obj = new Person("Pete Smith", 29);
  expect(p.equals(obj)).toBe(false);
});

test("Employee equals", () => {
  let p = new Employee("Pete Smith", 29, 9000);
  let obj = undefined;
  expect(p.equals(obj)).toBe(false);
  obj = new Person("JJ", 9);
  expect(p.equals(obj)).toBe(false);
  obj = null;
  expect(p.equals(obj)).toBe(false);
  obj = Employee("JJ", 9);
  expect(p.equals(obj)).toBe(false);
  obj = new Employee("Pete Smith", 9000);
  expect(p.equals(obj)).toBe(false);
});

test("Employee test", () => {
  let p = new Employee("Pete Smith", 9000);
  expect(p.getSalary()).toBe(9000);
  expect(p.getAge()).toBe(undefined);
});

test("Person test", () => {
  let p = new Person("Pete Smith");
  expect(p.getName()).toBe("Pete Smith");
  expect(p.getAge()).toBe(undefined);
});
