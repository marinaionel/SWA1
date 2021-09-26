const { test, expect } = require("@jest/globals");
const {
  names,
  adults,
  oldest_person,
  total_salaries_of_seniors,
} = require("./4.3");

let p = [
  { name: "Mary", age: 12 },
  { name: "John", age: 25 },
  { name: "Daisy", age: 28 },
  { name: "Willy", age: 48 },
];

test("names", () => {
  expect(names(p)).toEqual(["Mary", "John", "Daisy", "Willy"]);
});

test("adults", () => {
  expect(adults(p)).toEqual([
    { name: "John", age: 25 },
    { name: "Daisy", age: 28 },
    { name: "Willy", age: 48 },
  ]);
});

test("oldest_person", () => {
  expect(oldest_person(p)).toEqual({ name: "Willy", age: 48 });
});

test("total_salaries_of_seniors", () => {
  let employees = [
    { name: "Jimmy", age: 58, salary: 24783 },
    { name: "Cony", age: 61, salary: 38249 },
    { name: "Jessy", age: 63, salary: 47692 },
    { name: "Nelly", age: 30, salary: 18639 },
  ];
  expect(total_salaries_of_seniors(employees)).toBe(38249 + 47692);
});
