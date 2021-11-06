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
    },
    methods: {
      async reportHistoricalData(data) {
        await axios.post(`http://localhost:8080/data`, data);
        await updateHistoricalAndForecast();
      },
      async update() {
        await updateHistoricalAndForecast();
      },
      chooseCity(city) {
        model.setCity(city);
      },
      setFromForecast(from) {
        model.setForecastInterval(from, model.getForecastInterval()[1]);
      },
      setFromHistorical(from) {
        model.setHistoricalInterval(from, model.getHistoricalInterval()[1]);
      },
      setToForecast(to) {
        model.setForecastInterval(model.getForecastInterval()[0], to);
      },
      setToHistorical() {
        model.setHistoricalInterval(model.getHistoricalInterval()[0], to);
      },
    },
  };
};
