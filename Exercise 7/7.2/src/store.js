/* eslint-disable import/no-anonymous-default-export */
export default (init_model, view, renderer) => {
  let model = init_model;

  function reducer(action, model) {
    switch (action.type) {
      case "choose_city":
        return model
          .setCity(action.city)
          .setMeasurementsData(action.measurements)
          .setPredictionsData(action.predictions);

      default:
        return model;
    }
  }

  return (action) => {
    model = reducer(action, model);
    renderer(view(model));
  };
};
