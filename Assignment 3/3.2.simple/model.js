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
