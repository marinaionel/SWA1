const PRECIPITATION = "precipitation";
const TEMPERATURE = "temperature";
const WIND_SPEED = "wind speed";

const model = (city, measurementsData, predictionsData) => {
  const getCity = () => city;
  const setCity = (_city) => model(_city, measurementsData, predictionsData);
  const setMeasurementsData = (_measurementsData) =>
    model(city, _measurementsData, predictionsData);
  const setPredictionsData = (_predictionsData) =>
    model(city, measurementsData, _predictionsData);
  const getLatestMeasurements = () => measurementsData.slice(-4);
  const minimumTemperatureForTheLast5Days = () => {
    const now = new Date();
    const fiveDaysAgo = new Date(now);
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
    return Math.min(
      ...measurementsData
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
      ...measurementsData
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
    return measurementsData
      .filter((d) => {
        let thisDate = Date.parse(d.time);
        return fiveDaysAgo <= thisDate && thisDate <= now;
      })
      .filter((d) => d.type === PRECIPITATION)
      .map((d) => d.value)
      .map(Number)
      .reduce((sum, current) => sum + current);
  };
  const averageWindSpeedForTheLast5Days = () => {
    const now = new Date();
    const fiveDaysAgo = new Date(now);
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
    return measurementsData
      .filter((d) => {
        let thisDate = Date.parse(d.time);
        return fiveDaysAgo <= thisDate && thisDate <= now;
      })
      .filter((d) => d.type === WIND_SPEED)
      .map((d) => d.value)
      .map(Number)
      .reduce((a, v, i) => (a * i + v) / (i + 1));
  };
  const hourlyPredictionsForTheNext24Hours = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return predictionsData.filter((d) => {
      let thisDate = Date.parse(d.time);
      return today <= thisDate && thisDate <= tomorrow;
    });
  };
  return {
    getCity,
    setCity,
    setMeasurementsData,
    setPredictionsData,
    getLatestMeasurements,
    minimumTemperatureForTheLast5Days,
    maximumTemperatureForTheLast5Days,
    totalPrecipitationForTheLast5Days,
    averageWindSpeedForTheLast5Days,
    hourlyPredictionsForTheNext24Hours,
  };
};
export default model;
