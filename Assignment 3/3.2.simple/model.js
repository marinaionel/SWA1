const PRECIPITATION = "precipitation";
const TEMPERATURE = "temperature";
const WIND_SPEED = "wind speed";

const model = (
  city,
  historicalData,
  forecastData,
  forecastInterval,
  historicalInterval
) => {
  const setForecastInterval = (from, to) =>
    model(
      city,
      [...historicalData],
      [...forecastData],
      [from, to],
      [...historicalInterval]
    );
  const setHistoricalInterval = (from, to) =>
    model(
      city,
      [...historicalData],
      [...forecastData],
      [...forecastInterval],
      [from, to]
    );
  const setCity = (_city) =>
    model(
      _city,
      [...historicalData],
      [...forecastData],
      [...forecastInterval],
      [...historicalInterval]
    );
  const setHistoricalData = (_historicalData) =>
    model(
      city,
      _historicalData,
      [...forecastData],
      [...forecastInterval],
      [...historicalInterval]
    );
  const setForecastData = (_predictionsData) =>
    model(
      city,
      [...historicalData],
      _predictionsData,
      [...forecastInterval],
      [...historicalInterval]
    );

  const getLatestMeasurements = () => getHistoricalData().slice(-4);
  const getForecastInterval = () => [...forecastInterval];
  const getHistoricalInterval = () => [...historicalInterval];
  const getCity = () => city;
  const getCities = () =>
    historicalData
      .map((data) => data.place)
      .filter((value, index, self) => self.indexOf(value) === index);
  const getHistoricalData = () =>
    historicalData.filter((data) => data.place === city);

  const minimumTemperature = () => {
    if (
      getHistoricalInterval()[0] != undefined &&
      getHistoricalInterval()[1] != undefined
    )
      return Math.min(
        ...getHistoricalData()
          .filter((d) =>
            moment(d.time).isBetween(
              moment(getHistoricalInterval()[0]),
              moment(getHistoricalInterval()[1]),
              undefined,
              "[]"
            )
          )
          .filter((d) => d.type === TEMPERATURE)
          .map((d) => d.value)
          .map(Number)
      );
  };

  const maximumTemperature = () => {
    return Math.max(
      ...getHistoricalData()
        .filter((d) =>
          moment(d.time).isBetween(
            moment(getHistoricalInterval()[0]),
            moment(getHistoricalInterval()[1]),
            undefined,
            "[]"
          )
        )
        .filter((data) => data.type === TEMPERATURE)
        .map((data) => data.value)
        .map(Number)
    );
  };

  const totalPrecipitation = () => {
    return getHistoricalData()
      .filter((d) =>
        moment(d.time).isBetween(
          moment(getHistoricalInterval()[0]),
          moment(getHistoricalInterval()[1]),
          undefined,
          "[]"
        )
      )
      .filter((d) => d.type === PRECIPITATION)
      .map((d) => d.value)
      .map(Number)
      .reduce((sum, current) => sum + current, 0);
  };

  const averageWindSpeed = () => {
    let values = getHistoricalData()
      .filter((d) =>
        moment(d.time).isBetween(
          moment(getHistoricalInterval()[0]),
          moment(getHistoricalInterval()[1]),
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
  };

  const forecast = () => {
    let [from, to] = forecastInterval;
    from = moment(from);
    to = moment(to);
    return forecastData
      .filter((d) => d.place === getCity())
      .filter((d) => moment(d.time).isBetween(from, to, "hours", "[]"));
  };

  const historical = () => {
    let [from, to] = historicalInterval;
    from = moment(from);
    to = moment(to);
    return getHistoricalData().filter((d) =>
      moment(d.time).isBetween(from, to, "hours", "[]")
    );
  };

  return {
    getCities,
    setHistoricalInterval,
    getHistoricalInterval,
    setForecastInterval,
    getForecastInterval,
    getCity,
    setCity,
    setHistoricalData,
    setForecastData,
    getLatestMeasurements,
    minimumTemperature,
    maximumTemperature,
    totalPrecipitation,
    averageWindSpeed,
    forecast,
    historical,
  };
};
