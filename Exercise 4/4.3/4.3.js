// Rewrite the following functions using map, filter and reduce.
// function names(persons) {
//   let ns = []
//   for(let i = 0; i < persons.length; i++) {
//     ns.push(person[i].name)
//   }
//   return ns
// }
const names = (persons) => persons.map((p) => p.name);

// function adults(persons) {
//   let as = []
//   for(let i = 0; i < persons.length; i++) {
//     if (persons[i].age >= 18) {
//       as.push(persons[i])
//     }
//   }
//   return as
// }
const adults = (persons) => persons.filter((p) => p.age >= 18);

// function oldest_person(persons) {
//   let oldest = null
//   for(let i = 0; i < persons.length; i++) {
//     if (!oldest || persons[i].age > oldest.age) {
//       oldest = person[i]
//     }
//   }
//   return oldest
// }

// using sort
//const oldest_person = (persons) => persons.sort((p1, p2) => p2.age - p1.age)[0];

// using reduce
const oldest_person = (persons) =>
  persons.reduce((oldest, person) => {
    if (!oldest || person.age > oldest.age) {
      return person;
    } else return oldest;
  }, undefined);

// function total_salaries_of_seniors(employees) {
//   let total = 0
//   for(let i = 0; i < persons.length; i++) {
//     if (persons[i].age >= 60) {
//       total += persons[i].salary
//     }
//   }
//   return total
// }
const total_salaries_of_seniors = (employees) =>
  employees
    .filter((e) => e.age >= 60)
    .reduce((total, employee) => (total += employee.salary), 0); // also can be done with sum

module.exports = {
  names,
  adults,
  oldest_person,
  total_salaries_of_seniors,
};
