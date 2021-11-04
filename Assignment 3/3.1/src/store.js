/* eslint-disable import/no-anonymous-default-export */
export default (init_model, view, renderer) => {
  let model = init_model;

  function reducer(action, model) {
    switch (action.type) {
      case "update":
        return model
          .setMeasurementsData(action.measurements)
          .setPredictionsData(action.predictions);

      case "choose_city":
        return model
          .setCity(action.city)
          .setMeasurementsData(action.measurements)
          .setPredictionsData(action.predictions);

      case "set_from_prediction":
        return model.setFromTime(action.from);

      case "set_to_prediction":
        return model.setToTime(action.to);

      default:
        return model;
    }
  }

  return (action) => {
    model = reducer(action, model);
    renderer(view(model));
  };
};
