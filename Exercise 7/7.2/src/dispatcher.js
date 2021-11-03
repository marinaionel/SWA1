/* eslint-disable import/no-anonymous-default-export */
const axios = require("axios").default;

export default (store) => async (action) => {
  switch (action.type) {
    case "choose_city":
      console.log(action.city);
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

    default:
  }
};
