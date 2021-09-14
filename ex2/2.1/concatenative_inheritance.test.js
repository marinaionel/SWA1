const { test, expect } = require("@jest/globals");

const c = require("./concatenative_inheritance");
test("Event creation", () => {
  let e = c.Event_(Date(2021, 1, 1), "London");
  expect(e.getPlace()).toBe("London");
  expect(e.getTime()).toBe(Date(2021, 1, 1));
});

test("DataType creation", () => {
  let d = c.DataType("precipitations", "MM");
  expect(d.getType()).toBe("precipitations");
  expect(d.getUnit()).toBe("MM");
  d.setUnit("F");
  expect(d.getUnit()).toBe("F");
});

test("WeatherData creation", () => {
  let wd = c.WeatherData(
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
  let wp = c.WeatherPrediction(
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
  let wp = c.WeatherPrediction(
    Date(2020, 1, 1),
    "Vejle",
    "wind",
    "MPH",
    0,
    100
  );

  let wd1 = c.WeatherData(Date(2020, 1, 1), "Vejle", "wind", "MPH", 34);
  expect(wp.matches(wd1)).toBe(true);
  wd1 = c.WeatherData(Date(2020, 1, 1), "Vejle", "wind", "MPH", 101);
  expect(wp.matches(wd1)).toBe(false);
  wd1 = c.WeatherData(Date(2020, 1, 1), "London", "wind", "MPH", 10);
  expect(wp.matches(wd1)).toBe(false);
  wd1 = c.WeatherData(Date(2020, 1, 1), "Vejle", "precipitation", "MPH", 10);
  expect(wp.matches(wd1)).toBe(false);
  wd1 = c.WeatherData(Date(2020, 1, 1), "Vejle", "wind", "MS", 34);
  expect(wp.matches(wd1)).toBe(false);
});
