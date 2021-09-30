const { test, expect } = require("@jest/globals");
// prettier-ignore
const { PRECIPITATION, WIND, TEMPERATURE, CLOUD_COVERAGE, RAIN, SNOW, EAST, WEST, NORTH, SOUTH, OKTA, MPH, MS, MM, INCHES, CELSIUS, FAHRENHEIT, LONDON, VEJLE, STILLING, ODENSE, HORSENS } = require("../../constants");
// prettier-ignore
const { Event_, DataType, WeatherData, WeatherPrediction, Temperature, Wind, Precipitation, CloudCoverage, TemperaturePrediction, PrecipitationPrediction, WindPrediction, CloudCoveragePrediction, } = require("./4.2");

test("Event creation", () => {
  let e = new Event_(Date(2021, 1, 1), LONDON);
  expect(e.getPlace()).toBe(LONDON);
  expect(e.getTime()).toBe(Date(2021, 1, 1));
});

test("DataType creation", () => {
  let d = new DataType(PRECIPITATION, MM);
  expect(d.getType()).toBe(PRECIPITATION);
  expect(d.getUnit()).toBe(MM);
  let d1 = d.setUnit(FAHRENHEIT);
  expect(d1.getUnit()).toBe(FAHRENHEIT);
  let d2 = d1.setUnit(CELSIUS);
  // expect(d2).not.toEqual(d);
  expect(d2).not.toBe(d);
  expect(d2.getUnit()).not.toEqual(d.getUnit());
});

test("WeatherData creation", () => {
  let wd = new WeatherData(Date(2020, 3, 3), HORSENS, PRECIPITATION, MM, 67);
  expect(wd.getPlace()).toBe(HORSENS);
  expect(wd.getTime()).toBe(Date(2020, 3, 3));
  expect(wd.getType()).toBe(PRECIPITATION);
  expect(wd.getUnit()).toBe(MM);
  expect(wd.getValue()).toBe(67);
  let wd1 = wd.setUnit(INCHES);
  expect(wd1.getUnit()).toBe(INCHES);
  let wd2 = wd.setValue(33);
  expect(wd2.getValue()).toBe(33);
  expect(wd2).not.toBe(wd);
  // expect(wd2).not.toEqual(wd);
});

test("WeatherPrediction creation", () => {
  let wp = new WeatherPrediction(Date(2020, 1, 1), VEJLE, WIND, MPH, 0, 100);
  expect(wp.getMax()).toBe(100);
  expect(wp.getMin()).toBe(0);
  expect(wp.getPlace()).toBe(VEJLE);
  expect(wp.getTime()).toBe(Date(2020, 1, 1));

  let wp1 = wp.setMin(50);
  expect(wp1.getMin()).toBe(50);
  expect(wp1.getMax()).toBe(100);
  expect(wp1).not.toBe(wp);
  // expect(wp1).not.toEqual(wp);

  let wp2 = wp.setMax(60);
  expect(wp2.getMax()).toBe(60);
  expect(wp2.getMin()).toBe(0);
  expect(wp2).not.toBe(wp);
  // expect(wp2).not.toEqual(wp);
});

test("WeatherPrediction matches", () => {
  let wp = new WeatherPrediction(Date(2020, 1, 1), VEJLE, WIND, MPH, 0, 100);

  let wd1 = new WeatherData(Date(2020, 1, 1), VEJLE, WIND, MPH, 34);
  expect(wp.matches(wd1)).toBe(true);
  wd1 = new WeatherData(Date(2020, 1, 1), VEJLE, WIND, MPH, 101);
  expect(wp.matches(wd1)).toBe(false);
  wd1 = new WeatherData(Date(2020, 1, 1), LONDON, WIND, MPH, 10);
  expect(wp.matches(wd1)).toBe(false);
  wd1 = new WeatherData(Date(2020, 1, 1), VEJLE, PRECIPITATION, MPH, 10);
  expect(wp.matches(wd1)).toBe(false);
  wd1 = new WeatherData(Date(2020, 1, 1), VEJLE, WIND, MS, 34);
  expect(wp.matches(wd1)).toBe(false);
});

test(TEMPERATURE + " creation", () => {
  let t = new Temperature(Date(2020, 2, 5), VEJLE, TEMPERATURE, CELSIUS, 23);
  expect(t.getPlace()).toBe(VEJLE);
  expect(t.getTime()).toEqual(Date(2020, 2, 5));
});

test(TEMPERATURE + " convertion 1", () => {
  let t = new Temperature(Date(2020, 2, 5), VEJLE, TEMPERATURE, CELSIUS, 23);
  let t1 = t.convertToC();
  expect(t1.getUnit()).toBe(CELSIUS);
  expect(t1.getValue()).toBe(23);
  // expect(t1).not.toBe(t);
});

test(TEMPERATURE + " convertion 2", () => {
  let t = new Temperature(Date(2020, 2, 5), VEJLE, TEMPERATURE, CELSIUS, 23);
  let t1 = t.convertToF();
  expect(t1.getUnit()).toBe("F");
  expect(t1.getValue()).toBe(73.4);
  expect(t1).not.toBe(t);
});

test(PRECIPITATION + " creation", () => {
  let p = new Precipitation(
    Date(2020, 3, 4),
    STILLING,
    PRECIPITATION,
    MM,
    55,
    RAIN
  );
  expect(p.getPrecipitationType()).toBe(RAIN);
  expect(p.getPlace()).toBe(STILLING);
  expect(p.getTime()).toBe(Date(2020, 3, 4));
  expect(p.getType()).toBe(PRECIPITATION);
});

test(PRECIPITATION + " conversion 1", () => {
  let p = new Precipitation(
    Date(2020, 3, 4),
    STILLING,
    PRECIPITATION,
    MM,
    55,
    RAIN
  );
  let p1 = p.convertToMM();
  expect(p1.getUnit()).toBe(MM);
  expect(p1.getValue()).toBe(55);
});

test(PRECIPITATION + " conversion 2", () => {
  let p = new Precipitation(
    Date(2020, 3, 4),
    STILLING,
    PRECIPITATION,
    MM,
    55,
    RAIN
  );
  let p1 = p.convertToInches();
  expect(p1.getUnit()).toBe(INCHES);
  expect(p1.getValue()).toBeCloseTo(2.16535);
});

test(WIND + " creation", () => {
  let w = new Wind(Date(2020, 3, 3), VEJLE, WIND, MPH, 10, EAST);
  expect(w.getDirection()).toEqual("E");
  expect(w.getPlace()).toEqual(VEJLE);
  expect(w.getType()).toEqual(WIND);
  expect(w.getUnit()).toEqual(MPH);
});

test(WIND + " convertion 1", () => {
  let w = new Wind(Date(2020, 3, 3), VEJLE, WIND, MPH, 10, EAST);
  w = w.convertToMPH();
  expect(w.getUnit()).toEqual(MPH);
  expect(w.getValue()).toEqual(10);
  let w1 = w.convertToMS();
  expect(w1).not.toBe(w);
});

test(WIND + " convertion 2", () => {
  let w = new Wind(Date(2020, 3, 3), VEJLE, WIND, MPH, 10, EAST);
  let w1 = w.convertToMS();
  expect(w1.getUnit()).toEqual(MS);
  expect(w1.getValue()).toBeCloseTo(4.4704);
});

test(WIND + " convertion 3", () => {
  let w = new Wind(Date(2020, 3, 3), VEJLE, WIND, "jsfh", 10, EAST);
  let w1 = w.convertToMS();
  expect(w1.getUnit()).toEqual("jsfh");
  expect(w1.getValue()).toEqual(10);
});

test(CLOUD_COVERAGE, () => {
  let cc = new CloudCoverage(Date(2020, 2, 3), ODENSE, CLOUD_COVERAGE, OKTA);
  expect(cc.getUnit()).toEqual(OKTA);
});

test("TemperaturePrediction test", () => {
  let tp = new TemperaturePrediction(
    Date(2020, 2, 3),
    LONDON,
    TEMPERATURE,
    CELSIUS,
    20,
    23
  );
  let tp1 = tp.convertToC();
  expect(tp1.getUnit()).toEqual(CELSIUS);
  expect(tp1.getMax()).toEqual(23);
  expect(tp1.getMin()).toEqual(20);

  let tp2 = tp1.convertToF();
  expect(tp2.getUnit()).toEqual(FAHRENHEIT);
  expect(tp2.getMax()).toEqual(73.4);
  expect(tp2.getMin()).toEqual(68);

  let tp3 = tp2.convertToC();
  expect(tp3.getUnit()).toEqual(CELSIUS);
  expect(tp3.getMax()).toEqual(23);
  expect(tp3.getMin()).toEqual(20);

  let data = new Temperature(
    Date(2020, 2, 3),
    LONDON,
    TEMPERATURE,
    FAHRENHEIT,
    70.6
  );
  expect(tp3.matches(data)).toEqual(false);
  let data1 = data.convertToC();
  expect(tp3.matches(data1)).toEqual(true);
});

test("PrecipitationPrediction test", () => {
  let pp = new PrecipitationPrediction(
    Date(2020, 5, 4),
    VEJLE,
    PRECIPITATION,
    MM,
    10,
    13,
    RAIN
  );

  pp = pp.convertToMM();
  expect(pp.getUnit()).toEqual(MM);
  expect(pp.getMax()).toEqual(13);
  expect(pp.getMin()).toEqual(10);

  pp = pp.convertToInches();
  expect(pp.getUnit()).toEqual(INCHES);
  expect(pp.getMax()).toBeCloseTo(0.511811);
  expect(pp.getMin()).toBeCloseTo(0.393701);

  let data = new Precipitation(
    Date(2020, 5, 4),
    VEJLE,
    PRECIPITATION,
    INCHES,
    0.4387,
    RAIN
  );
  expect(pp.matches(data)).toBe(true);
  data = data.convertToMM();
  expect(pp.matches(data)).toBe(false);
  expect(data.getUnit()).toBe(MM);

  data = new Precipitation(
    Date(2020, 5, 4),
    VEJLE,
    PRECIPITATION,
    INCHES,
    0.4387,
    SNOW
  );
  expect(pp.matches(data)).toEqual(false);
});

test("WindPrediction test", () => {
  let wp = new WindPrediction(
    Date(2020, 5, 4),
    LONDON,
    WIND,
    MS,
    10,
    13,
    EAST,
    SOUTH
  );
  wp = wp.convertToMPH();
  expect(wp.getUnit()).toEqual(MPH);
  expect(wp.getMax()).toBeCloseTo(29.0802);
  expect(wp.getMin()).toBeCloseTo(22.3694);

  wp = wp.convertToMS();
  expect(wp.getUnit()).toEqual(MS);
  expect(wp.getMax()).toBeCloseTo(13);
  expect(wp.getMin()).toBeCloseTo(10);

  let data = new Wind(Date(2020, 5, 4), LONDON, WIND, MS, 11.231, SOUTH);
  expect(wp.matches(data)).toEqual(true);

  data = new Wind(Date(2020, 5, 4), LONDON, WIND, MS, 11.231, NORTH);
  expect(wp.matches(data)).toEqual(false);
});

test("CloudCoveragePrediction test", () => {
  let cp = new CloudCoveragePrediction(
    Date(2020, 8, 10),
    VEJLE,
    CLOUD_COVERAGE,
    OKTA,
    3,
    4
  );
  let data = new CloudCoverage(
    Date(2020, 8, 10),
    VEJLE,
    CLOUD_COVERAGE,
    OKTA,
    3
  );
  expect(cp.matches(data)).toBe(true);
  let data1 = data.setValue(5);
  expect(cp.matches(data1)).toBe(false);
});
