export default (el, init_model) => {
  let model = init_model;

  async function updateHistoricalAndForecast() {
    let h = await axios
      .get(`http://localhost:8080/data`)
      .then((res) => res.data)
      .catch((error) => console.log(error));
    let f = await axios
      .get(`http://localhost:8080/forecast`)
      .then((res) => res.data)
      .catch((error) => console.log(error));

    model.setHistoricalData(h).setForecastData(f);
  }

  return {
    el,
    data: {
      cities: model.getCities(),
      historicalData: model.historical(),
      forecast: model.forecast(),
      averageWindSpeed: model.averageWindSpeed()?.toFixed(2),
      totalPrecipitations: model.totalPrecipitation()?.toFixed(2),
      latestMeasurements: model.getLatestMeasurements(),
      maximumTemperature: model.maximumTemperature(),
      minimumTemperature: model.minimumTemperature(),
    },
    computed: {
      city: {
        get() {
          return model.getCity();
        },
        set(v) {
          model.setCity(v);
        },
      },
      fromForecast: {
        get() {
          return model.getForecastInterval()[0];
        },
        set(v) {
          model.setForecastInterval(v, model.getForecastInterval()[1]);
        },
      },
      toForecast: {
        get() {
          return model.getForecastInterval()[1];
        },
        set(v) {
          model.setForecastInterval(model.getForecastInterval()[0], v);
        },
      },
      fromHistorical: {
        get() {
          return model.getHistoricalInterval()[0];
        },
        set(v) {
          model.setHistoricalInterval(v, model.getHistoricalInterval()[1]);
        },
      },
      toHistorical: {
        get() {
          return model.getHistoricalInterval()[1];
        },
        set(v) {
          model.setHistoricalInterval(model.getHistoricalInterval()[0], v);
        },
      },
    },
    methods: {
      async reportHistoricalData(data) {
        await axios.post(`http://localhost:8080/data`, data);
        await updateHistoricalAndForecast();
      },
      async update() {
        await updateHistoricalAndForecast();
      },
    },
  };
};
