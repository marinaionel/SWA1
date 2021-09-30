const BASE_URL_WEATHER = "http://localhost:8080/";
const GET_DATA = BASE_URL_WEATHER + "data";
const GET_FORECAST = BASE_URL_WEATHER + "forecast";
const GET_WARNINGS = BASE_URL_WEATHER + "warnings";

function getUsingXMLHttpRequest() {
  let req = new XMLHttpRequest();
  req.addEventListener("load", function () {
    setValue("#data", this.responseText);
  });
  req.open("GET", GET_DATA);
  req.send();
}

function getUsingFetch() {
  fetch(GET_DATA)
    .then((response) => response.json())
    .then((data) => setValue("#data", JSON.stringify(data)));
}

function setValue(selector, value) {
  document.querySelector(selector).innerHTML = value;
}
