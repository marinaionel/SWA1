// controlling the context

// with bind
// The bind() method creates a new function that, when called, has its this keyword set to the provided value,
// with a given sequence of arguments preceding any provided when the new function is called.

const person = {
  age: 32,
  getAge: function () {
    return this.age;
  },
};

const unboundGetAge = person.getAge;
console.log(unboundGetAge()); // The function gets invoked at the global scope
// expected output: undefined

const boundGetAge = unboundGetAge.bind(person);
console.log(boundGetAge());
// expected output: 32

const sum = (a, b) => a + b;

sum1 = sum.bind(this, 1);
sum1(10);
// expected output: 11

// because there is no this usage in the function we can pass null
sum1 = sum.bind(null, 1);
sum1(10);
// expected output: 11

// with anonymous functions
const Person_ = (age) => ({
  _age: age,
  getAge() {
    return this._age;
  },
});

console.log(Person_(15).getAge()); // expected output: 15

// with call
function Person(name, age) {
  this.name = name;
  this.age = age;
}

function Employee(name, age, salary) {
  Person.call(this, name, age);
  this.salary = salary;
}

console.log(new Employee("Mary", 20, 1000).salary);
// expected output: 1000
