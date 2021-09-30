const {
  INCHES,
  MS,
  MPH,
  MM,
  CELSIUS,
  FAHRENHEIT,
  LONDON,
  WIND,
  SOUTH,
  EAST,
} = require("../../constants");

class Event_ {
  #time;
  #place;
  getTime() {
    return this.#time;
  }
  getPlace() {
    return this.#place;
  }
  constructor(time, place) {
    this.#time = time;
    this.#place = place;
    Object.freeze(this);
  }
}

class DataType {
  #type;
  #unit;
  constructor(type, unit) {
    this.#type = type;
    this.#unit = unit;
    Object.freeze(this);
  }
  getType() {
    return this.#type;
  }
  getUnit() {
    return this.#unit;
  }
  setUnit(unit) {
    return new DataType(this.getType(), unit);
  }
}

//** this is necessary because in JavaScript a class cannot extend from multiple classes */
class EventDataType {
  #time;
  #place;
  #type;
  #unit;
  constructor(time, place, type, unit) {
    this.#time = time;
    this.#place = place;
    this.#type = type;
    this.#unit = unit;
    Object.freeze(this);
  }
  getTime() {
    return this.#time;
  }
  getPlace() {
    return this.#place;
  }
  getType() {
    return this.#type;
  }
  getUnit() {
    return this.#unit;
  }
  setUnit(unit) {
    return new EventDataType(this.#time, this.#place, this.#type, unit);
  }
}

class WeatherData extends EventDataType {
  #value;
  constructor(time, place, type, unit, value) {
    super(time, place, type, unit);
    this.#value = value;
    Object.freeze(this);
  }
  getValue() {
    return this.#value;
  }
  setValue(value) {
    return new WeatherData(
      this.getTime(),
      this.getPlace(),
      this.getType(),
      this.getUnit(),
      value
    );
  }
}

class Temperature extends WeatherData {
  constructor(time, place, type, unit, value) {
    super(time, place, type, unit, value);
    Object.freeze(this);
  }
  convertToF() {
    if (this.getUnit() == CELSIUS) {
      return new Temperature(
        this.getTime(),
        this.getPlace(),
        this.getType(),
        FAHRENHEIT,
        this.getValue() * 1.8 + 32
      );
    } else return this;
  }
  convertToC() {
    if (this.getUnit() == FAHRENHEIT) {
      return new Temperature(
        this.getTime(),
        this.getPlace(),
        this.getType(),
        CELSIUS,
        (this.getValue() - 32) / 1.8
      );
    } else return this;
  }
}

class Precipitation extends WeatherData {
  #precipitationType;
  constructor(time, place, type, unit, value, precipitationType) {
    super(time, place, type, unit, value);
    this.#precipitationType = precipitationType;
    Object.freeze(this);
  }
  getPrecipitationType() {
    return this.#precipitationType;
  }
  convertToInches() {
    if (this.getUnit() == MM) {
      return new Precipitation(
        this.getTime(),
        this.getPlace(),
        this.getType(),
        INCHES,
        this.getValue() / 25.4,
        this.getPrecipitationType()
      );
    } else return this;
  }
  convertToMM() {
    if (this.getUnit() == INCHES) {
      return new Precipitation(
        this.getTime(),
        this.getPlace(),
        this.getType(),
        MM,
        this.getValue() * 25.4,
        this.getPrecipitationType()
      );
    } else return this;
  }
}

class Wind extends WeatherData {
  #direction;
  constructor(time, place, type, unit, value, direction) {
    super(time, place, type, unit, value);
    this.#direction = direction;
    Object.freeze(this);
  }
  getDirection() {
    return this.#direction;
  }
  convertToMPH() {
    if (this.getUnit() == MS) {
      return new Wind(
        this.getTime(),
        this.getPlace(),
        this.getType(),
        MPH,
        this.getValue() * 2.237,
        this.getDirection()
      );
    } else return this;
  }
  convertToMS() {
    if (this.getUnit() == MPH) {
      return new Wind(
        this.getTime(),
        this.getPlace(),
        this.getType(),
        MS,
        this.getValue() / 2.237,
        this.getDirection()
      );
    } else return this;
  }
}

class CloudCoverage extends WeatherData {
  constructor(time, place, type, unit, value) {
    super(time, place, type, unit, value);
    Object.freeze(this);
  }
}

class WeatherPrediction extends EventDataType {
  #min;
  #max;
  constructor(time, place, type, unit, min, max) {
    super(time, place, type, unit);
    this.#min = min;
    this.#max = max;
    Object.freeze(this);
  }
  getMin() {
    return this.#min;
  }
  setMin(min) {
    return new WeatherPrediction(
      this.getTime(),
      this.getPlace(),
      this.getType(),
      this.getUnit(),
      min,
      this.getMax()
    );
  }
  getMax() {
    return this.#max;
  }
  setMax(max) {
    return new WeatherPrediction(
      this.getTime(),
      this.getPlace(),
      this.getType(),
      this.getUnit(),
      this.getMin(),
      max
    );
  }
  matches(data) {
    if (data == undefined) return false;
    return (
      data.getTime() == this.getTime() &&
      data.getPlace() == this.getPlace() &&
      data.getType() == this.getType() &&
      data.getUnit() == this.getUnit() &&
      data.getValue() >= this.getMin() &&
      data.getValue() <= this.getMax()
    );
  }
}

class TemperaturePrediction extends WeatherPrediction {
  constructor(time, place, type, unit, min, max) {
    super(time, place, type, unit, min, max);
    Object.freeze(this);
  }
  convertToC() {
    if (this.getUnit() == FAHRENHEIT) {
      return new TemperaturePrediction(
        this.getTime(),
        this.getPlace(),
        this.getType(),
        CELSIUS,
        Math.round(((this.getMin() - 32) / 1.8) * 100) / 100,
        Math.round(((this.getMax() - 32) / 1.8) * 100) / 100
      );
    } else return this;
  }
  convertToF() {
    if (this.getUnit() == CELSIUS) {
      return new TemperaturePrediction(
        this.getTime(),
        this.getPlace(),
        this.getType(),
        FAHRENHEIT,
        Math.round((this.getMin() * 1.8 + 32) * 100) / 100,
        Math.round((this.getMax() * 1.8 + 32) * 100) / 100
      );
    } else return this;
  }
}

class PrecipitationPrediction extends WeatherPrediction {
  #expectedTypes;
  constructor(time, place, type, unit, min, max, ...expectedTypes) {
    super(time, place, type, unit, min, max);
    this.#expectedTypes = expectedTypes;
    Object.freeze(this);
  }
  getExpectedTypes() {
    return [...this.#expectedTypes];
  }
  convertToInches() {
    if (this.getUnit() == MM) {
      return new PrecipitationPrediction(
        this.getTime(),
        this.getPlace(),
        this.getType(),
        INCHES,
        this.getMin() / 25.4,
        this.getMax() / 25.4,
        ...this.getExpectedTypes()
      );
    } else return this;
  }
  convertToMM() {
    if (this.getUnit() == INCHES) {
      return new PrecipitationPrediction(
        this.getTime(),
        this.getPlace(),
        this.getType(),
        MM,
        this.getMin() * 25.4,
        this.getMax() * 25.4,
        ...this.getExpectedTypes()
      );
    } else return this;
  }
  matches(data) {
    return (
      super.matches(data) &&
      this.getExpectedTypes().includes(data.getPrecipitationType())
    );
  }
}

class WindPrediction extends WeatherPrediction {
  #expectedDirections;
  constructor(time, place, type, unit, min, max, ...expectedDirections) {
    super(time, place, type, unit, min, max);
    this.#expectedDirections = expectedDirections;
    Object.freeze(this);
  }
  getExpectedDirections() {
    return [...this.#expectedDirections];
  }
  convertToMPH() {
    if (this.getUnit() == MS) {
      return new WindPrediction(
        this.getTime(),
        this.getPlace(),
        this.getType(),
        MPH,
        this.getMin() * 2.237,
        this.getMax() * 2.237,
        ...this.getExpectedDirections()
      );
    } else return this;
  }
  convertToMS() {
    if (this.getUnit() == MPH) {
      return new WindPrediction(
        this.getTime(),
        this.getPlace(),
        this.getType(),
        MS,
        this.getMin() / 2.237,
        this.getMax() / 2.237,
        ...this.getExpectedDirections()
      );
    } else return this;
  }
  matches(data) {
    return (
      super.matches(data) &&
      this.getExpectedDirections().includes(data.getDirection())
    );
  }
}

class CloudCoveragePrediction extends WeatherPrediction {
  constructor(time, place, type, unit, min, max) {
    super(time, place, type, unit, min, max);
    Object.freeze(this);
  }
}

module.exports = {
  Event_,
  DataType,
  WeatherData,
  WeatherPrediction,
  Temperature,
  Wind,
  Precipitation,
  CloudCoverage,
  TemperaturePrediction,
  PrecipitationPrediction,
  WindPrediction,
  CloudCoveragePrediction,
};
