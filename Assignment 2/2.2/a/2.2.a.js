const BASE_URL_WEATHER = "http://localhost:8080";
const GET_DATA_BY_PLACE = (place) => `${BASE_URL_WEATHER}/data/${place}/`;
const GET_FORECAST_BY_PLACE = (place) =>
  `${BASE_URL_WEATHER}/forecast/${place}`;

const PRECIPITATION = "precipitation";
const TEMPERATURE = "temperature";
const WIND_SPEED = "wind speed";
const GET = "GET";
const LOAD = "load";

const addValue = (selector, value) =>
  (document.querySelector(selector).innerHTML += value);

const allDataForTheLatestMeasurementOfEachKind = (place) => {
  let req = new XMLHttpRequest();
  req.addEventListener(LOAD, function () {
    let data = JSON.parse(this.responseText)
      .slice(-5)
      .map((data) => `${data.type}: ${data.value} ${data.unit}`)
      .join("<br>");
    addValue(
      "#a",
      '<div> <h3 class="title is-4">' +
        place +
        " weather</h3> " +
        data +
        "</div>"
    );
  });
  req.open(GET, GET_DATA_BY_PLACE(place));
  req.send();
};
const minimumTemperatureForTheLast5Days = (place) => {
  const now = new Date();
  const fiveDaysAgo = new Date(now);
  fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
  let req = new XMLHttpRequest();
  req.addEventListener(LOAD, function () {
    let min = Math.min(
      ...JSON.parse(this.responseText)
        .filter((d) => {
          let thisDate = Date.parse(d.time);
          return fiveDaysAgo <= thisDate && thisDate <= now;
        })
        .filter((d) => d.type == TEMPERATURE)
        .map((d) => d.value)
        .map(Number)
    );
    addValue("#b", `<div> ${place}: ${min} C</div>`);
  });
  req.open(GET, GET_DATA_BY_PLACE(place));
  req.send();
};
const maximumTemperatureForTheLast5Days = (place) => {
  const now = new Date();
  const fiveDaysAgo = new Date(now);
  fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
  let req = new XMLHttpRequest();
  req.addEventListener(LOAD, function () {
    let max = Math.max(
      ...JSON.parse(this.responseText)
        .filter((d) => {
          let thisDate = Date.parse(d.time);
          return fiveDaysAgo <= thisDate && thisDate <= now;
        })
        .filter((data) => data.type == "temperature")
        .map((data) => data.value)
        .map(Number)
    );
    addValue("#c", `<div> ${place}: ${max} C</div>`);
  });
  req.open(GET, GET_DATA_BY_PLACE(place));
  req.send();
};
const totalPrecipitationForTheLast5Days = (place) => {
  const now = new Date();
  const fiveDaysAgo = new Date(now);
  fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
  let req = new XMLHttpRequest();
  req.addEventListener(LOAD, function () {
    let total = JSON.parse(this.responseText)
      .filter((d) => {
        let thisDate = Date.parse(d.time);
        return fiveDaysAgo <= thisDate && thisDate <= now;
      })
      .filter((d) => d.type == PRECIPITATION)
      .map((d) => d.value)
      .map(Number)
      .reduce((sum, current) => sum + current);
    addValue("#d", `<div> ${place}: ${total.toFixed(2)} mm</div>`);
  });
  req.open(GET, GET_DATA_BY_PLACE(place));
  req.send();
};
const averageWindSpeedForTheLast5Days = (place) => {
  const now = new Date();
  const fiveDaysAgo = new Date(now);
  fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
  let req = new XMLHttpRequest();
  req.addEventListener(LOAD, function () {
    let averageSpeed = JSON.parse(this.responseText)
      .filter((d) => {
        let thisDate = Date.parse(d.time);
        return fiveDaysAgo <= thisDate && thisDate <= now;
      })
      .filter((d) => d.type == WIND_SPEED)
      .map((d) => d.value)
      .map(Number)
      .reduce((a, v, i) => (a * i + v) / (i + 1));
    addValue("#e", `<div> ${place}: ${averageSpeed.toFixed(2)} m/s</div>`);
  });
  req.open(GET, GET_DATA_BY_PLACE(place));
  req.send();
};
const hourlyPredictionsForTheNext24Hours = (place) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  let req = new XMLHttpRequest();
  req.addEventListener(LOAD, function () {
    let forecast = JSON.parse(this.responseText).filter((d) => {
      let thisDate = Date.parse(d.time);
      return today <= thisDate && thisDate <= tomorrow;
    });
    addValue("#f", `<h4 class="title is-5">${place}</h4>`);
    forecast.forEach((d) => {
      let date = new Date(d.time);
      addValue(
        "#f",
        `<div>${date.getHours()}:00 ${d.type}: ${d.from}-${d.to} ${
          d.unit
        }</div>`
      );
    });
  });
  req.open(GET, GET_FORECAST_BY_PLACE(place));
  req.send();
};
