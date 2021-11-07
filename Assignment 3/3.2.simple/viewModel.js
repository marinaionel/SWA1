const viewModel = (el, init_model) => {
  const now = moment().toDate();
  const past = moment().add(-2, "day").toDate();
  const future = moment().add(2, "day").toDate();

  return {
    el,
    components: { DatePicker },

    data: {
      moment: moment,
      city: "Horsens",
      cities: [],
      historicalAll: [],
      forcastAll: [],
      historicalInterval: [past, now],
      forecastInterval: [now, future],

      //cities: model.getCities(),
      // historicalData: model.historical(),
      // forecast: model.forecast(),
      // averageWindSpeed: model.averageWindSpeed()?.toFixed(2),
      // totalPrecipitations: model.totalPrecipitation()?.toFixed(2),
      // maximumTemperature: model.maximumTemperature(),
      // minimumTemperature: model.minimumTemperature(),
    },
    created: async function () {
      const city = "Horsens";
      this.historicalAll = await fetch(`http://localhost:8080/data`)
        .then((res) => res.json())
        .catch((error) => console.log(error));
      this.forcastAll = await fetch(`http://localhost:8080/forecast`)
        .then((res) => res.json())
        .catch((error) => console.log(error));
      this.cities = this.historicalAll
        .map((data) => data.place)
        .filter((value, index, self) => self.indexOf(value) === index);
      this.dataReady = true;
    },
    computed: {
      latestMeasurements: {
        get() {
          return this.historicalAll
            .filter((e) => e.place == this.city)
            .slice(-4);
        },
      },
      historical: {
        get() {
          return this.historicalAll.filter((e) => e.place == this.city);
        },
      },
      forecast: {
        get() {
          return this.forcastAll.filter((e) => e.place == this.city);
        },
      },
      fromForecast: {
        get() {
          console.log(this.fromForecast)
          return this.forecastInterval[0];
        },
        set(v) {
          this.forecastInterval[0] = v;
        },
      },
      toForecast: {
        get() {
          console.log(this.toForecast)
          return this.forecastInterval[1];
        },
        set(v) {
          this.forecastInterval[1] = v;
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
      // setCity(city) {
      //   model = model.setCity(v);
      //   this.city = model.getCity();
      // },
      async reportHistoricalData(data) {
        await axios.post(`http://localhost:8080/data`, data);
        await updateHistoricalAndForecast();
      },
      async update() {
        await updateHistoricalAndForecast();
      },

      minimumTemperature() {
        if (
          this.historicalInterval[0] != undefined &&
          this.historicalInterval[1] != undefined
        )
          return Math.min(
            ...this.historical
              .filter((d) =>
                moment(d.time).isBetween(
                  moment(this.historicalInterval[0]),
                  moment(this.historicalInterval[1]),
                  undefined,
                  "[]"
                )
              )
              .filter((d) => d.type === TEMPERATURE)
              .map((d) => d.value)
              .map(Number)
          );
      },

      maximumTemperature() {
        return Math.max(
          ...this.historical
            .filter((d) =>
              moment(d.time).isBetween(
                moment(this.historicalInterval[0]),
                moment(this.historicalInterval[1]),
                undefined,
                "[]"
              )
            )
            .filter((data) => data.type === TEMPERATURE)
            .map((data) => data.value)
            .map(Number)
        );
      },

      totalPrecipitations() {
        return this.historical
          .filter((d) =>
            moment(d.time).isBetween(
              moment(this.historicalInterval[0]),
              moment(this.historicalInterval[1]),
              undefined,
              "[]"
            )
          )
          .filter((d) => d.type === PRECIPITATION)
          .map((d) => d.value)
          .map(Number)
          .reduce((sum, current) => sum + current, 0);
      },

      averageWindSpeed() {
        let values = this.historical
          .filter((d) =>
            moment(d.time).isBetween(
              moment(this.historicalInterval[0]),
              moment(this.historicalInterval[1]),
              undefined,
              "[]"
            )
          )
          .filter((d) => d.type === WIND_SPEED)
          .map((d) => d.value)
          .map(Number);
        return values.length > 0
          ? values.reduce((a, v, i) => (a * i + v) / (i + 1), 0)
          : NaN;
      },
    },
  };
};
