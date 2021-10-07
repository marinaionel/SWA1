const axios = require("axios").default;

const BASE_URL = "http://localhost:9090/";
const GET_PERSONS = BASE_URL + "persons/";
const GET_PERSON = (id) => GET_PERSONS + id;
const PATCH_PERSON = (id) => GET_PERSONS + id;
const GET_EMPLOYEES = BASE_URL + "employees/";
const POST_EMPLOYEE = GET_EMPLOYEES;
const GET_EMPLOYEE = (employeeId) => GET_EMPLOYEES + employeeId + "/";
const GET_SUBORDINATES = (employeeId) =>
  GET_EMPLOYEE(employeeId) + "subordinates";
const POST_SUBORDINATE = (employeeId) => GET_SUBORDINATES(employeeId);

const setValue = (selector, value) =>
  (document.querySelector(selector).innerHTML = value);

function getPersons() {
  fetch(GET_PERSONS)
    .then((response) => response.json())
    .then((data) => setValue("#persons", JSON.stringify(data)))
    .catch((error) => alert(`Error: ${error}`));
}
function getPerson(id) {
  fetch(GET_PERSON(id))
    .then((response) => response.json())
    .then((data) => setValue("#person", JSON.stringify(data)))
    .catch((error) => alert(`Error: ${error}`));
}
function patchPerson(id, name, employeeId) {
  var xhttp = new XMLHttpRequest();
  xhttp.open("PATCH", PATCH_PERSON(id), true);
  xhttp.onload = () => {
    if (xhttp.status == 200) {
      setValue("#result", xhttp.responseText);
    }
    if (xhttp.status == 404) {
      alert("404 Not Found: " + PATCH_PERSON(id));
    }
  };
  xhttp.onerror = (error) => alert(`Error: ${error}`);
  xhttp.send({ id, name, employeeId });
}
function getEmployees() {
  const response = await axios.get(GET_EMPLOYEES);
  setValue("#employees", response.data);
}
