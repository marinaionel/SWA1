const Person = (name, age) => ({
  getName() {
    return name;
  },
  getAge() {
    return age;
  },
});

let p1 = Person("John", 30);
console.log(p1);
console.log(Person.__proto__); //ƒ () { [native code] }

class Person_ {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  getName() {
    return this.name;
  }
  getAge() {
    return this.age;
  }
}

let p2 = new Person_("Mary", 20);
console.log(p2); // Person_ {name: 'Mary', age: 20}
console.log(Person_.__proto__); // ƒ () { [native code] }