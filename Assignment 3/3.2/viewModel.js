const viewModel = (el, init_model) => {
  const now = moment().toDate();
  const past = moment().add(-2, "day").toDate();
  const future = moment().add(2, "day").toDate();

  return {
    el,
    data: {
      moment: moment,
      city: "Horsens",
      cities: [],
      historicalAll: [],
      forcastAll: [],
      fromHistorical: past,
      toHistorical: now,
      fromForecast: now,
      toForecast: future,
      // report data
      rCity: "",
      rUnit: "",
      rValue: "",
      rType: "",
      rDate: new Date(),
      rExtra: "",
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
        cache: false,
        get() {
          return this.historicalAll
            .filter((e) => e.place == this.city)
            .filter((e) =>
              moment(e.time).isBetween(
                this.fromHistorical,
                this.toHistorical,
                undefined,
                "[]"
              )
            );
        },
      },
      forecast: {
        cache: false,
        get() {
          return this.forcastAll
            .filter((e) => e.place == this.city)
            .filter((d) =>
              moment(d.time).isBetween(
                this.fromForecast,
                this.toForecast,
                "hours",
                "[]"
              )
            );
        },
      },
    },
    methods: {
      async update() {
        this.historicalAll = await fetch(`http://localhost:8080/data`)
          .then((res) => res.json())
          .catch((error) => console.log(error));
        this.forcastAll = await fetch(`http://localhost:8080/forecast`)
          .then((res) => res.json())
          .catch((error) => console.log(error));
        this.cities = this.historicalAll
          .map((data) => data.place)
          .filter((value, index, self) => self.indexOf(value) === index);
      },
      async submitFunc() {
        let data = {
          type: this.rType,
          time: this.rDate,
          place: this.rCity,
          value: this.rValue,
          unit: this.rUnit,
        };
        if (data.type === "precipitation") data.precipitationType = this.rExtra;
        if (data.type === "wind speed") data.direction = this.rExtra;

        await fetch(`http://localhost:8080/data`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        this.historicalAll = await fetch(`http://localhost:8080/data`)
          .then((res) => res.json())
          .catch((error) => console.log(error));
        this.forcastAll = await fetch(`http://localhost:8080/forecast`)
          .then((res) => res.json())
          .catch((error) => console.log(error));
        this.cities = this.historicalAll
          .map((data) => data.place)
          .filter((value, index, self) => self.indexOf(value) === index);
      },
      minimumTemperature() {
        if (this.fromHistorical != undefined && this.toHistorical != undefined)
          return Math.min(
            ...this.historical
              .filter((d) =>
                moment(d.time).isBetween(
                  moment(this.fromHistorical),
                  moment(this.toHistorical),
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
                moment(this.fromHistorical),
                moment(this.toHistorical),
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
              moment(this.fromHistorical),
              moment(this.toHistorical),
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
              moment(this.fromHistorical),
              moment(this.toHistorical),
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
    watch: {
      // these watchers are required because the html datepickers send the date here as string
      fromForecast: function (v) {
        return new Date(v);
      },
      toForecast: function (v) {
        return new Date(v);
      },
      fromHistorical: function (v) {
        return new Date(v);
      },
      toHistorical: function (v) {
        console.log(v);
        return new Date(v);
      },
    },
  };
};
