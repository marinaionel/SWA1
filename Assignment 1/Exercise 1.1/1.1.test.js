const { test, expect } = require("@jest/globals");
// prettier-ignore
const { PRECIPITATION, WIND, TEMPERATURE, CLOUD_COVERAGE, RAIN, SNOW, EAST, WEST, NORTH, SOUTH, OKTA, MPH, MS, MM, INCHES, CELSIUS, FAHRENHEIT, LONDON, VEJLE, STILLING, ODENSE, HORSENS } = require("../../constants");
// prettier-ignore
const { Event_, DataType, WeatherData, WeatherPrediction, Temperature, Wind, Precipitation, CloudCoverage, TemperaturePrediction, PrecipitationPrediction, WindPrediction, CloudCoveragePrediction, DateInterval, WeatherForecast, WeatherHistory } = require("./1.1");

test("Event creation", () => {
  let e = Event_(Date(2021, 1, 1, 0, 0, 0), LONDON);
  expect(e.getPlace()).toBe(LONDON);
  expect(e.getTime()).toBe(Date(2021, 1, 1, 0, 0, 0));
});

test("DataType creation", () => {
  let d = DataType(PRECIPITATION, MM);
  expect(d.getType()).toBe(PRECIPITATION);
  expect(d.getUnit()).toBe(MM);
  d.setUnit(FAHRENHEIT);
  expect(d.getUnit()).toBe(FAHRENHEIT);
});

test("WeatherData creation", () => {
  let wd = WeatherData(
    Date(2020, 3, 3, 0, 0, 0),
    HORSENS,
    PRECIPITATION,
    MM,
    67
  );
  expect(wd.getPlace()).toBe(HORSENS);
  expect(wd.getTime()).toBe(Date(2020, 3, 3, 0, 0, 0));
  expect(wd.getType()).toBe(PRECIPITATION);
  expect(wd.getUnit()).toBe(MM);
  expect(wd.getValue()).toBe(67);
  wd.setUnit(INCHES);
  expect(wd.getUnit()).toBe(INCHES);
  wd.setValue(33);
  expect(wd.getValue()).toBe(33);
});

test("WeatherPrediction creation", () => {
  let wp = WeatherPrediction(
    Date(2020, 1, 1, 0, 0, 0),
    VEJLE,
    WIND,
    MPH,
    0,
    100
  );
  expect(wp.getMax()).toBe(100);
  expect(wp.getMin()).toBe(0);
  expect(wp.getPlace()).toBe(VEJLE);
  expect(wp.getTime()).toBe(Date(2020, 1, 1, 0, 0, 0));
});

test("WeatherPrediction matches", () => {
  let wp = WeatherPrediction(Date(2020, 1, 1), VEJLE, WIND, MPH, 0, 100);

  let wd1 = WeatherData(Date(2020, 1, 1, 0, 0, 0), VEJLE, WIND, MPH, 34);
  expect(wp.matches(wd1)).toBe(true);
  wd1 = WeatherData(Date(2020, 1, 1, 0, 0, 0), VEJLE, WIND, MPH, 101);
  expect(wp.matches(wd1)).toBe(false);
  wd1 = WeatherData(Date(2020, 1, 1, 0, 0, 0), LONDON, WIND, MPH, 10);
  expect(wp.matches(wd1)).toBe(false);
  wd1 = WeatherData(Date(2020, 1, 1, 0, 0, 0), VEJLE, PRECIPITATION, MPH, 10);
  expect(wp.matches(wd1)).toBe(false);
  wd1 = WeatherData(Date(2020, 1, 1, 0, 0, 0), VEJLE, WIND, MS, 34);
  expect(wp.matches(wd1)).toBe(false);
});

test(TEMPERATURE + " creation", () => {
  let t = Temperature(
    Date(2020, 2, 5, 0, 0, 0),
    VEJLE,
    TEMPERATURE,
    CELSIUS,
    23
  );
  expect(t.getPlace()).toBe(VEJLE);
  expect(t.getTime()).toBe(Date(2020, 2, 5, 0, 0, 0));
});

test(TEMPERATURE + " convertion 1", () => {
  let t = Temperature(
    Date(2020, 2, 5, 0, 0, 0),
    VEJLE,
    TEMPERATURE,
    CELSIUS,
    23
  );
  t.convertToC();
  expect(t.getUnit()).toBe(CELSIUS);
  expect(t.getValue()).toBe(23);
});

test(TEMPERATURE + " convertion 2", () => {
  let t = Temperature(
    Date(2020, 2, 5, 0, 0, 0),
    VEJLE,
    TEMPERATURE,
    CELSIUS,
    23
  );
  t.convertToF();
  expect(t.getUnit()).toBe("F");
  expect(t.getValue()).toBe(73.4);
});

test(PRECIPITATION + " creation", () => {
  let p = Precipitation(
    Date(2020, 3, 4, 0, 0, 0),
    STILLING,
    PRECIPITATION,
    MM,
    55,
    RAIN
  );
  expect(p.getPrecipitationType()).toBe(RAIN);
  expect(p.getPlace()).toBe(STILLING);
  expect(p.getTime()).toBe(Date(2020, 3, 4, 0, 0, 0));
  expect(p.getType()).toBe(PRECIPITATION);
});

test(PRECIPITATION + " conversion 1", () => {
  let p = Precipitation(
    Date(2020, 3, 4, 0, 0, 0),
    STILLING,
    PRECIPITATION,
    MM,
    55,
    RAIN
  );
  p.convertToMM();
  expect(p.getUnit()).toBe(MM);
  expect(p.getValue()).toBe(55);
});

test(PRECIPITATION + " conversion 2", () => {
  let p = Precipitation(
    Date(2020, 3, 4, 0, 0, 0),
    STILLING,
    PRECIPITATION,
    MM,
    55,
    RAIN
  );
  p.convertToInches();
  expect(p.getUnit()).toBe(INCHES);
  expect(p.getValue()).toBeCloseTo(2.16535);
});

test(WIND + " creation", () => {
  let w = Wind(Date(2020, 3, 3, 0, 0, 0), VEJLE, WIND, MPH, 10, EAST);
  expect(w.getDirection()).toEqual("E");
  expect(w.getPlace()).toEqual(VEJLE);
  expect(w.getType()).toEqual(WIND);
  expect(w.getUnit()).toEqual(MPH);
});

test(WIND + " convertion 1", () => {
  let w = Wind(Date(2020, 3, 3, 0, 0, 0), VEJLE, WIND, MPH, 10, EAST);
  w.convertToMPH();
  expect(w.getUnit()).toEqual(MPH);
  expect(w.getValue()).toEqual(10);
});

test(WIND + " convertion 2", () => {
  let w = Wind(Date(2020, 3, 3, 0, 0, 0), VEJLE, WIND, MPH, 10, EAST);
  w.convertToMS();
  expect(w.getUnit()).toEqual(MS);
  expect(w.getValue()).toBeCloseTo(4.4704);
});

test(WIND + " convertion 3", () => {
  let w = Wind(Date(2020, 3, 3, 0, 0, 0), VEJLE, WIND, "jsfh", 10, EAST);
  w.convertToMS();
  expect(w.getUnit()).toEqual("jsfh");
  expect(w.getValue()).toEqual(10);
});

test(CLOUD_COVERAGE, () => {
  let cc = CloudCoverage(
    Date(2020, 2, 3, 0, 0, 0),
    ODENSE,
    CLOUD_COVERAGE,
    OKTA
  );
  expect(cc.getUnit()).toEqual(OKTA);
});

test("TemperaturePrediction test", () => {
  let tp = TemperaturePrediction(
    Date(2020, 2, 3, 0, 0, 0),
    LONDON,
    TEMPERATURE,
    CELSIUS,
    20,
    23
  );
  tp.convertToC();
  expect(tp.getUnit()).toEqual(CELSIUS);
  expect(tp.getMax()).toEqual(23);
  expect(tp.getMin()).toEqual(20);

  tp.convertToF();
  expect(tp.getUnit()).toEqual(FAHRENHEIT);
  expect(tp.getMax()).toEqual(73.4);
  expect(tp.getMin()).toEqual(68);

  tp.convertToC();
  expect(tp.getUnit()).toEqual(CELSIUS);
  expect(tp.getMax()).toEqual(23);
  expect(tp.getMin()).toEqual(20);

  let data = Temperature(
    Date(2020, 2, 3, 0, 0, 0),
    LONDON,
    TEMPERATURE,
    FAHRENHEIT,
    70.6
  );
  expect(tp.matches(data)).toEqual(false);
  data.convertToC();
  expect(tp.matches(data)).toEqual(true);
});

test("PrecipitationPrediction test", () => {
  let pp = PrecipitationPrediction(
    Date(2020, 5, 4, 0, 0, 0),
    VEJLE,
    PRECIPITATION,
    MM,
    10,
    13,
    RAIN
  );

  pp.convertToMM();
  expect(pp.getUnit()).toEqual(MM);
  expect(pp.getMax()).toEqual(13);
  expect(pp.getMin()).toEqual(10);

  pp.convertToInches();
  expect(pp.getUnit()).toEqual(INCHES);
  expect(pp.getMax()).toBeCloseTo(0.511811);
  expect(pp.getMin()).toBeCloseTo(0.393701);

  let data = Precipitation(
    Date(2020, 5, 4, 0, 0, 0),
    VEJLE,
    PRECIPITATION,
    INCHES,
    0.4387,
    RAIN
  );
  expect(pp.matches(data)).toEqual(true);
  data.convertToMM();
  expect(pp.matches(data)).toEqual(false);
  expect(data.getUnit()).toEqual(MM);

  data = Precipitation(
    Date(2020, 5, 4, 0, 0, 0),
    VEJLE,
    PRECIPITATION,
    INCHES,
    0.4387,
    SNOW
  );
  expect(pp.matches(data)).toEqual(false);
});

test("WindPrediction test", () => {
  let wp = WindPrediction(
    Date(2020, 3, 3, 0, 0, 0),
    LONDON,
    WIND,
    MS,
    10,
    13,
    EAST,
    SOUTH
  );
  wp.convertToMPH();
  expect(wp.getUnit()).toEqual(MPH);
  expect(wp.getMax()).toBeCloseTo(29.0802);
  expect(wp.getMin()).toBeCloseTo(22.3694);

  wp.convertToMS();
  expect(wp.getUnit()).toEqual(MS);
  expect(wp.getMax()).toBeCloseTo(13);
  expect(wp.getMin()).toBeCloseTo(10);

  let data = Wind(Date(2020, 5, 4, 0, 0, 0), LONDON, WIND, MS, 11.231, SOUTH);
  expect(wp.matches(data)).toEqual(true);

  data = Wind(Date(2020, 5, 4, 0, 0, 0), LONDON, WIND, MS, 11.231, NORTH);
  expect(wp.matches(data)).toEqual(false);
});

test("CloudCoveragePrediction test", () => {
  let cp = CloudCoveragePrediction(
    Date(2020, 8, 10, 0, 0, 0),
    VEJLE,
    CLOUD_COVERAGE,
    OKTA,
    3,
    4
  );
  let data = CloudCoverage(
    Date(2020, 8, 10, 0, 0, 0),
    VEJLE,
    CLOUD_COVERAGE,
    OKTA,
    3
  );
  expect(cp.matches(data)).toBe(true);
  data.setValue(5);
  expect(cp.matches(data)).toBe(false);
});

test("WeatherHistory lowestValue test", () => {
  let t1 = Temperature(
    Date(2020, 9, 9, 0, 0, 0),
    LONDON,
    TEMPERATURE,
    CELSIUS,
    19.3
  );
  let t2 = Temperature(
    Date(2020, 9, 4, 0, 0, 0),
    LONDON,
    TEMPERATURE,
    CELSIUS,
    20.3
  );
  let t3 = Temperature(
    Date(2020, 9, 1, 0, 0, 0),
    LONDON,
    TEMPERATURE,
    CELSIUS,
    15.3
  );

  wh = WeatherHistory([t1, t2, t3]);
  expect(wh.lowestValue()).toBe(15.3);
});

test("WeatherHistory lowestValue different types", () => {
  let t1 = Temperature(
    Date(2020, 9, 9, 0, 0, 0),
    LONDON,
    TEMPERATURE,
    CELSIUS,
    19.3
  );
  let t2 = Temperature(
    Date(2020, 9, 4, 0, 0, 0),
    LONDON,
    TEMPERATURE,
    CELSIUS,
    20.3
  );
  let t3 = Wind(Date(2020, 9, 1), LONDON, WIND, MS, 15.3);

  wh = WeatherHistory([t1, t2, t3]);
  expect(wh.lowestValue()).toBe(undefined);
});

test("WeatherForecast averageMinValue test", () => {
  let t1 = TemperaturePrediction(
    Date(2020, 9, 9, 0, 0, 0),
    LONDON,
    TEMPERATURE,
    CELSIUS,
    19,
    21
  );
  let t2 = TemperaturePrediction(
    Date(2020, 9, 4, 0, 0, 0),
    LONDON,
    TEMPERATURE,
    CELSIUS,
    20,
    21
  );
  let t3 = TemperaturePrediction(
    Date(2020, 9, 1, 0, 0, 0),
    LONDON,
    TEMPERATURE,
    CELSIUS,
    17,
    19
  );

  let wh = WeatherForecast([t1, t2, t3]);
  expect(wh.getAverageMinValue()).toBe((19 + 20 + 17) / 3);
});

test("WeatherForecast averageMaxValue test", () => {
  let t1 = TemperaturePrediction(
    Date(2020, 9, 9, 0, 0, 0),
    LONDON,
    TEMPERATURE,
    CELSIUS,
    19,
    21
  );
  let t2 = TemperaturePrediction(
    Date(2020, 9, 4, 0, 0, 0),
    LONDON,
    TEMPERATURE,
    CELSIUS,
    20,
    21
  );
  let t3 = TemperaturePrediction(
    Date(2020, 9, 1, 0, 0, 0),
    LONDON,
    TEMPERATURE,
    CELSIUS,
    17,
    19
  );

  let wh = WeatherForecast([t1, t2, t3]);
  expect(wh.getAverageMaxValue()).toBe((21 + 21 + 19) / 3);
});
