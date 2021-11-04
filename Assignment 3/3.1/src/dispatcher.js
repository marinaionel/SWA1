/* eslint-disable import/no-anonymous-default-export */
const axios = require("axios").default;

export default (store) => async (action) => {
  switch (action.type) {
    case "report_historical_data":
      let data = {
        type: action.type.toLowerCase().trim(),
        time: action.date,
        place: action.city.trim(),
        value: action.value,
        unit: action.unit,
      };
      if (data.type === "precipitation") data.precipitationType = action.extra;
      if (data.type === "wind speed") data.direction = action.extra;

      await axios.post(`http://localhost:8080/data`, data);

      let hist = await axios
        .get(`http://localhost:8080/data`)
        .then((res) => res.data)
        .catch((error) => console.log(error));
      let forc = await axios
        .get(`http://localhost:8080/forecast`)
        .then((res) => res.data)
        .catch((error) => console.log(error));

      store({
        type: "update",
        measurements: hist,
        predictions: forc,
      });
      break;

    case "update":
      let measurements = await axios
        .get(`http://localhost:8080/data`)
        .then((res) => res.data)
        .catch((error) => console.log(error));
      let predictions = await axios
        .get(`http://localhost:8080/forecast`)
        .then((res) => res.data)
        .catch((error) => console.log(error));
      store({
        type: action.type,
        measurements: measurements,
        predictions: predictions,
      });
      break;

    case "choose_city":
      let newMeasurements = await axios
        .get(`http://localhost:8080/data`)
        .then((res) => res.data)
        .catch((error) => console.log(error));
      let newPredictions = await axios
        .get(`http://localhost:8080/forecast`)
        .then((res) => res.data)
        .catch((error) => console.log(error));
      store({
        type: action.type,
        city: action.city,
        measurements: newMeasurements,
        predictions: newPredictions,
      });
      break;

    case "set_from_forecast":
    case "set_from_historical":
      store({
        type: action.type,
        from: action.from,
      });
      break;

    case "set_to_forecast":
    case "set_to_historical":
      store({
        type: action.type,
        to: action.to,
      });
      break;

    default:
  }
};
