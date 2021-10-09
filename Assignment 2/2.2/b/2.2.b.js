// if window is undefined then it is node
if (typeof window === "undefined")
  fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));

const BASE_URL_WEATHER = "http://localhost:8080";
const GET_DATA_BY_PLACE = (place) => `${BASE_URL_WEATHER}/data/${place}/`;
const GET_FORECAST_BY_PLACE = (place) =>
  `${BASE_URL_WEATHER}/forecast/${place}`;

const PRECIPITATION = "precipitation";
const TEMPERATURE = "temperature";
const WIND_SPEED = "wind speed";

const allDataForTheLatestMeasurementOfEachKind = (place) => {
  fetch(GET_DATA_BY_PLACE(place))
    .then((response) => response.json())
    .then((json) =>
      json
        .slice(-5)
        .map((data) => `${data.type}: ${data.value} ${data.unit}`)
        .join("<br>")
    )
    .then(
      (data) =>
        (document.querySelector("#a").innerHTML +=
          '<div> <h3 class="title is-4">' +
          place +
          " weather</h3> " +
          data +
          "</div>")
    );
};
const minimumTemperatureForTheLast5Days = (place) => {
  const now = new Date();
  const fiveDaysAgo = new Date(now);
  fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

  fetch(GET_DATA_BY_PLACE(place))
    .then((response) => response.json())
    .then((json) =>
      Math.min(
        ...json
          .filter((data) => {
            let thisDate = Date.parse(data.time);
            return fiveDaysAgo <= thisDate && thisDate <= now;
          })
          .filter((data) => data.type == TEMPERATURE)
          .map((data) => data.value)
          .map(Number)
      )
    )
    .then(
      (temp) =>
        (document.querySelector(
          "#b"
        ).innerHTML += `<div> ${place}: ${temp} C</div>`)
    );
};
const maximumTemperatureForTheLast5Days = (place) => {
  const now = new Date();
  const fiveDaysAgo = new Date(now);
  fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

  fetch(GET_DATA_BY_PLACE(place))
    .then((response) => response.json())
    .then((json) =>
      Math.max(
        ...json
          .filter((d) => {
            let thisDate = Date.parse(d.time);
            return fiveDaysAgo <= thisDate && thisDate <= now;
          })
          .filter((data) => data.type == "temperature")
          .map((data) => data.value)
          .map(Number)
      )
    )
    .then(
      (temp) =>
        (document.querySelector(
          "#c"
        ).innerHTML += `<div> ${place}: ${temp} C</div>`)
    );
};
const totalPrecipitationForTheLast5Days = (place) => {
  const now = new Date();
  const fiveDaysAgo = new Date(now);
  fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

  fetch(GET_DATA_BY_PLACE(place))
    .then((response) => response.json())
    .then((json) =>
      json
        .filter((d) => {
          let thisDate = Date.parse(d.time);
          return fiveDaysAgo <= thisDate && thisDate <= now;
        })
        .filter((d) => d.type == PRECIPITATION)
        .map((d) => d.value)
        .map(Number)
        .reduce((sum, current) => sum + current)
    )
    .then(
      (temp) =>
        (document.querySelector(
          "#d"
        ).innerHTML += `<div> ${place}: ${temp.toFixed(2)} mm</div>`)
    );
};
const averageWindSpeedForTheLast5Days = (place) => {
  const now = new Date();
  const fiveDaysAgo = new Date(now);
  fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

  fetch(GET_DATA_BY_PLACE(place))
    .then((response) => response.json())
    .then((json) =>
      json
        .filter((d) => {
          let thisDate = Date.parse(d.time);
          return fiveDaysAgo <= thisDate && thisDate <= now;
        })
        .filter((d) => d.type == WIND_SPEED)
        .map((d) => d.value)
        .map(Number)
        .reduce((a, v, i) => (a * i + v) / (i + 1))
    )
    .then(
      (averageSpeed) =>
        (document.querySelector(
          "#e"
        ).innerHTML += `<div> ${place}: ${averageSpeed.toFixed(2)} m/s</div>`)
    );
};
const hourlyPredictionsForTheNext24Hours = (place) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  fetch(GET_FORECAST_BY_PLACE(place))
    .then((response) => response.json())
    .then((json) =>
      json.filter((d) => {
        let thisDate = Date.parse(d.time);
        return today <= thisDate && thisDate <= tomorrow;
      })
    )
    .then((forecast) => {
      document.querySelector(
        "#f"
      ).innerHTML += `<h4 class="title is-5">${place}</h4>`;
      forecast.forEach((d) => {
        let date = new Date(d.time);
        document.querySelector("#f").innerHTML += `<div>${date.getHours()}:00 ${
          d.type
        }: ${d.from}-${d.to} ${d.unit}</div>`;
      });
    });
};
