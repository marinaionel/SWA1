import * as moment from "moment";

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

  const minimumTemperatureForTheLast5Days = () => {
    const now = new Date();
    const fiveDaysAgo = new Date(now);
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
    return Math.min(
      ...getHistoricalData()
        .filter((d) => {
          let thisDate = Date.parse(d.time);
          return fiveDaysAgo <= thisDate && thisDate <= now;
        })
        .filter((d) => d.type === TEMPERATURE)
        .map((d) => d.value)
        .map(Number)
    );
  };

  const maximumTemperatureForTheLast5Days = () => {
    const now = new Date();
    const fiveDaysAgo = new Date(now);
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
    return Math.max(
      ...getHistoricalData()
        .filter((d) => {
          let thisDate = Date.parse(d.time);
          return fiveDaysAgo <= thisDate && thisDate <= now;
        })
        .filter((data) => data.type === TEMPERATURE)
        .map((data) => data.value)
        .map(Number)
    );
  };

  const totalPrecipitationForTheLast5Days = () => {
    const now = new Date();
    const fiveDaysAgo = new Date(now);
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
    return getHistoricalData()
      .filter((d) => {
        let thisDate = Date.parse(d.time);
        return fiveDaysAgo <= thisDate && thisDate <= now;
      })
      .filter((d) => d.type === PRECIPITATION)
      .map((d) => d.value)
      .map(Number)
      .reduce((sum, current) => sum + current, 0);
  };

  const averageWindSpeedForTheLast5Days = () => {
    const now = moment();
    const fiveDaysAgo = moment();
    fiveDaysAgo.add(-5, "d");
    let values = getHistoricalData()
      .filter((d) => moment(d.time).isBetween(fiveDaysAgo, now, null, "[]"))
      .filter((d) => d.type === WIND_SPEED)
      .map((d) => d.value)
      .map(Number);
    return values.length > 0
      ? values.reduce((a, v, i) => (a * i + v) / (i + 1), 0)
      : NaN;
  };

  const forecast = () => {
    let [from, to] = forecastInterval;
    return forecastData
      .filter((d) => d.place === getCity())
      .filter((d) => {
        let thisDate = new Date(Date.parse(d.time));
        return (
          moment(from)
            .set("minute", 0)
            .set("second", 0)
            .set("millisecond", 0)
            .toDate() <= thisDate && thisDate <= to
        );
      });
  };

  const historical = () => {
    let [from, to] = historicalInterval;

    return {};
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
    minimumTemperatureForTheLast5Days,
    maximumTemperatureForTheLast5Days,
    totalPrecipitationForTheLast5Days,
    averageWindSpeedForTheLast5Days,
    forecast,
    historical,
  };
};

export default model;
