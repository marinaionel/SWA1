/* eslint-disable import/no-anonymous-default-export */
export default (init_model, view, renderer) => {
  let model = init_model;

  function reducer(action, model) {
    switch (action.type) {
      case "update":
        return model
          .setHistoricalData(action.measurements)
          .setForecastData(action.predictions);

      case "choose_city":
        return model
          .setCity(action.city)
          .setHistoricalData(action.measurements)
          .setForecastData(action.predictions);

      case "set_from_forecast":
        return model.setForecastInterval(
          action.from,
          model.getForecastInterval()[1]
        );

      case "set_from_historical":
        return model.setHistoricalInterval([
          action.from,
          model.getHistoricalInterval()[1],
        ]);

      case "set_to_forecast":
        return model.setForecastInterval([
          model.getForecastInterval()[0],
          action.to,
        ]);

      case "set_to_historical":
        return model.setHistoricalInterval(
          model.getHistoricalInterval()[0],
          action.to
        );

      default:
        return model;
    }
  }

  return (action) => {
    model = reducer(action, model);
    renderer(view(model));
  };
};
