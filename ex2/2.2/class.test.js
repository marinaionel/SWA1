const { test, expect } = require("@jest/globals");
const c = require("./class");

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
    "wind",
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
    "wind",
    "MPH",
    0,
    100
  );

  let wd1 = new c.WeatherData(Date(2020, 1, 1), "Vejle", "wind", "MPH", 34);
  expect(wp.matches(wd1)).toBe(true);
  wd1 = new c.WeatherData(Date(2020, 1, 1), "Vejle", "wind", "MPH", 101);
  expect(wp.matches(wd1)).toBe(false);
  wd1 = new c.WeatherData(Date(2020, 1, 1), "London", "wind", "MPH", 10);
  expect(wp.matches(wd1)).toBe(false);
  wd1 = new c.WeatherData(
    Date(2020, 1, 1),
    "Vejle",
    "precipitation",
    "MPH",
    10
  );
  expect(wp.matches(wd1)).toBe(false);
  wd1 = new c.WeatherData(Date(2020, 1, 1), "Vejle", "wind", "MS", 34);
  expect(wp.matches(wd1)).toBe(false);
});

test("Temperature creation", () => {
  let t = new c.Temperature(Date(2020, 2, 5), "Vejle", "temperature", "C", 23);
  expect(t.getPlace()).toBe("Vejle");
  expect(t.getTime()).toBe(Date(2020, 2, 5));
});

test("Temperature convertion 1", () => {
  let t = new c.Temperature(Date(2020, 2, 5), "Vejle", "temperature", "C", 23);
  t.convertToC();
  expect(t.getUnit()).toBe("C");
  expect(t.getValue()).toBe(23);
});

test("Temperature convertion 2", () => {
  let t = new c.Temperature(Date(2020, 2, 5), "Vejle", "temperature", "C", 23);
  t.convertToF();
  expect(t.getUnit()).toBe("F");
  expect(t.getValue()).toBe(73.4);
});
