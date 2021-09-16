// for 'person' it is not necessary to handle overloading since it will just mean that age would be undefined
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.getName = function () {
  return this.name;
};

Person.prototype.setName = function (_name) {
  this.name = _name;
};

Person.prototype.getAge = function () {
  return this.age;
};

Person.prototype.setAge = function (_age) {
  this.age = _age;
};

Person.prototype.toString = function () {
  return `person [name=${this.name},age=${this.age}]`;
};

Person.prototype.equals = function (obj) {
  if (typeof obj != "Person") return false;
  for (var property in this) {
    if (!Object.is(obj[property], this[property])) return false;
  }
  return true;
};

// here overloading needs to be addressed because salary could be arg 2 or 3
function Employee(arg1, arg2, arg3) {
  if (arg3 == undefined) {
    Person.call(this, arg1);
    this.salary = arg2;
  } else {
    Person.call(this, arg1, arg2);
    this.salary = arg3;
  }
}

Object.setPrototypeOf(Employee.prototype, Person.prototype);

Employee.prototype.getSalary = function () {
  return this.salary;
};

Employee.prototype.setSalary = function (_salary) {
  this.salary = _salary;
};

Employee.prototype.toString = function () {
  return `Employee [name=${this.name},age=${this.age},salary=${this.salary}]`;
};

Employee.prototype.equals = function (obj) {
  if (typeof obj != "Employee") return false;
  for (var property in this) {
    if (!Object.is(obj[property], this[property])) return false;
  }
  return true;
};

module.exports = { Person, Employee };
