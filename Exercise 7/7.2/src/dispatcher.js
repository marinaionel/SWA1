/* eslint-disable import/no-anonymous-default-export */
const axios = require("axios").default;

export default (store) => async (action) => {
  switch (action.type) {
    case "update":
      let measurements = await axios
        .get(`http://localhost:8080/data/${action.city}`)
        .then((res) => res.data)
        .catch((error) => console.log(error));
      let predictions = await axios
        .get(`http://localhost:8080/forecast/${action.city}`)
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
        .get(`http://localhost:8080/data/${action.city}`)
        .then((res) => res.data)
        .catch((error) => console.log(error));
      let newPredictions = await axios
        .get(`http://localhost:8080/forecast/${action.city}`)
        .then((res) => res.data)
        .catch((error) => console.log(error));
      store({
        type: action.type,
        city: action.city,
        measurements: newMeasurements,
        predictions: newPredictions,
      });
      break;

    case "set_from_prediction":
      store({
        type: action.type,
        from: action.from,
      });
      break;

    case "set_to_prediction":
      store({
        type: action.type,
        to: action.to,
      });
      break;

    default:
  }
};
