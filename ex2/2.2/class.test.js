const { test, expect } = require("@jest/globals");
const c = require("./class");

const PRECIPITATION = "precipitation";
const WIND = "wind";
const TEMPERATURE = "temperature";
const CLOUD_COVERAGE = "cloud coverage";
const RAIN = "rain";
const SNOW = "snow";

test("Event creation", () => {
  let e = new c.Event_(Date(2021, 1, 1), "London");
  expect(e.getPlace()).toBe("London");
  expect(e.getTime()).toBe(Date(2021, 1, 1));
});

test("DataType creation", () => {
  let d = new c.DataType("precipitations", "MM");
  expect(d.getType()).toBe("precipitations");
  expect(d.getUnit()).toBe("MM");
  d.setUnit("F");
  expect(d.getUnit()).toBe("F");
});

test("WeatherData creation", () => {
  let wd = new c.WeatherData(
    Date(2020, 3, 3),
    "Horsens",
    "precipitations",
    "MM",
    67
  );
  expect(wd.getPlace()).toBe("Horsens");
  expect(wd.getTime()).toBe(Date(2020, 3, 3));
  expect(wd.getType()).toBe("precipitations");
  expect(wd.getUnit()).toBe("MM");
  expect(wd.getValue()).toBe(67);
  wd.setUnit("Inches");
  expect(wd.getUnit()).toBe("Inches");
  wd.setValue(33);
  expect(wd.getValue()).toBe(33);
});

test("WeatherPrediction creation", () => {
  let wp = new c.WeatherPrediction(
    Date(2020, 1, 1),
    "Vejle",
    WIND,
    "MPH",
    0,
    100
  );
  expect(wp.getMax()).toBe(100);
  expect(wp.getMin()).toBe(0);
  expect(wp.getPlace()).toBe("Vejle");
  expect(wp.getTime()).toBe(Date(2020, 1, 1));
});

test("WeatherPrediction matches", () => {
  let wp = new c.WeatherPrediction(
    Date(2020, 1, 1),
    "Vejle",
    WIND,
    "MPH",
    0,
    100
  );

  let wd1 = new c.WeatherData(Date(2020, 1, 1), "Vejle", WIND, "MPH", 34);
  expect(wp.matches(wd1)).toBe(true);
  wd1 = new c.WeatherData(Date(2020, 1, 1), "Vejle", WIND, "MPH", 101);
  expect(wp.matches(wd1)).toBe(false);
  wd1 = new c.WeatherData(Date(2020, 1, 1), "London", WIND, "MPH", 10);
  expect(wp.matches(wd1)).toBe(false);
  wd1 = new c.WeatherData(Date(2020, 1, 1), "Vejle", PRECIPITATION, "MPH", 10);
  expect(wp.matches(wd1)).toBe(false);
  wd1 = new c.WeatherData(Date(2020, 1, 1), "Vejle", WIND, "MS", 34);
  expect(wp.matches(wd1)).toBe(false);
});

test("Temperature creation", () => {
  let t = new c.Temperature(Date(2020, 2, 5), "Vejle", TEMPERATURE, "C", 23);
  expect(t.getPlace()).toBe("Vejle");
  expect(t.getTime()).toBe(Date(2020, 2, 5));
});

test("Temperature convertion 1", () => {
  let t = new c.Temperature(Date(2020, 2, 5), "Vejle", TEMPERATURE, "C", 23);
  t.convertToC();
  expect(t.getUnit()).toBe("C");
  expect(t.getValue()).toBe(23);
});

test("Temperature convertion 2", () => {
  let t = new c.Temperature(Date(2020, 2, 5), "Vejle", TEMPERATURE, "C", 23);
  t.convertToF();
  expect(t.getUnit()).toBe("F");
  expect(t.getValue()).toBe(73.4);
});

test("Precipitation creation", () => {
  let p = new c.Precipitation(
    Date(2020, 3, 4),
    "Stilling",
    PRECIPITATION,
    "MM",
    55,
    RAIN
  );
  expect(p.getPrecipitationType()).toBe(RAIN);
  expect(p.getPlace()).toBe("Stilling");
  expect(p.getTime()).toBe(Date(2020, 3, 4));
  expect(p.getType()).toBe(PRECIPITATION);
});

test(PRECIPITATION + " conversion 1", () => {
  let p = new c.Precipitation(
    Date(2020, 3, 4),
    "Stilling",
    PRECIPITATION,
    "MM",
    55,
    RAIN
  );
  p.convertToMM();
  expect(p.getUnit()).toBe("MM");
  expect(p.getValue()).toBe(55);
});

test(PRECIPITATION + " conversion 2", () => {
  let p = new c.Precipitation(
    Date(2020, 3, 4),
    "Stilling",
    PRECIPITATION,
    "MM",
    55,
    RAIN
  );
  p.convertToInches();
  expect(p.getUnit()).toBe("Inches");
  expect(p.getValue()).toBeCloseTo(2.16535);
});

test(WIND + " creation", () => {
  let w = new c.Wind(Date(2020, 3, 3), "Vejle", WIND, "MPH", 10, "E");
  expect(w.getDirection()).toEqual("E");
  expect(w.getPlace()).toEqual("Vejle");
  expect(w.getType()).toEqual(WIND);
  expect(w.getUnit()).toEqual("MPH");
});

test(WIND + " convertion 1", () => {
  let w = new c.Wind(Date(2020, 3, 3), "Vejle", WIND, "MPH", 10, "E");
  w.convertToMPH();
  expect(w.getUnit()).toEqual("MPH");
  expect(w.getValue()).toEqual(10);
});

test(WIND + " convertion 2", () => {
  let w = new c.Wind(Date(2020, 3, 3), "Vejle", WIND, "MPH", 10, "E");
  w.convertToMS();
  expect(w.getUnit()).toEqual("MS");
  expect(w.getValue()).toBeCloseTo(4.4704);
});

test(WIND + " convertion 3", () => {
  let w = new c.Wind(Date(2020, 3, 3), "Vejle", WIND, "jsfh", 10, "E");
  w.convertToMS();
  expect(w.getUnit()).toEqual("jsfh");
  expect(w.getValue()).toBeCloseTo(10);
});
