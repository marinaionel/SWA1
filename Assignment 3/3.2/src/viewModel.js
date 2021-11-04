export default (el, init_model) => {
  let model = init_model;

  return {
    el,
    data: {
      salary: 0,
      personData: model.personData(),
    },
    methods: {
      async hire(id) {
        if (this.salary > 0) {
          const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
          };
          const employee_res = await fetch("http://localhost:9090/employees", {
            method: "POST",
            body: JSON.stringify({ salary: this.salary, manager: false }),
            headers,
          });
          const employee = await employee_res.json();
          const { employeeId } = employee;
          const person_res = await fetch(
            "http://localhost:9090/persons/" + id,
            { method: "PATCH", body: JSON.stringify({ employeeId }), headers }
          );
          const person = await person_res.json();
          model = model.addEmployee(employee).updatePerson(person);
          this.personData = model.personData();
          this.salary = 0;
        }
      },
    },
  };
};
