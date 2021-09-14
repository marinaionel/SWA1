// this implementation uses private class features instead of closures since there was no specification about it
// setters added to keep encapsulation
// note: it is impossible to access private fields of the base class and JS does not have "protected"

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
  }
}

class DataType {
  #type;
  #unit;
  constructor(type, unit) {
    this.#type = type;
    this.#unit = unit;
  }
  getType() {
    return this.#type;
  }
  getUnit() {
    return this.#unit;
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
    this.#unit = unit;
  }
}

class WeatherData extends EventDataType {
  #value;
  constructor(time, place, type, unit, value) {
    super(time, place, type, unit);
    this.#value = value;
  }
  getValue() {
    return this.#value;
  }
  setValue(value) {
    this.#value = value;
  }
}

class Temperature extends WeatherData {
  constructor(time, place, type, unit, value) {
    super(time, place, type, unit, value);
  }
  convertToF() {
    if (this.getUnit() == "C") {
      this.setUnit("F");
      this.setValue(this.getValue() * 1.8 + 32);
    }
  }
  convertToC() {
    if (this.getUnit() == "F") {
      this.setUnit("C");
      this.setValue(1.8 * (this.getValue() - 32));
    }
  }
}

class Precipitation extends WeatherData {
  #precipitationType;
  constructor(time, place, type, unit, value, precipitationType) {
    super(time, place, type, unit, value);
    this.#precipitationType = precipitationType;
  }
  getPrecipitationType() {
    return this.#precipitationType;
  }
  convertToInches() {
    if (this.getUnit() == "MM") {
      this.setUnit("Inches");
      this.setValue(this.getValue() / 25.4);
    }
  }
  convertToMM() {
    if (this.getUnit() == "Inches") {
      this.setUnit("MM");
      this.setValue(this.getValue() * 25.4);
    }
  }
}

class Wind extends WeatherData {
  #direction;
  constructor(time, place, type, unit, value, direction) {
    super(time, place, type, unit, value);
    this.#direction = direction;
  }
  getDirection() {
    return this.#direction;
  }
  convertToMPH() {
    if (this.getUnit() == "MS") {
      this.setUnit("MPH");
      this.setValue(this.getValue() * 2.237);
    }
  }
  convertToMS() {
    if (this.getUnit() == "MPH") {
      this.setUnit("MS");
      this.setValue(this.getValue() / 2.237);
    }
  }
}

class CloudCoverage extends WeatherData {
  constructor(time, place, type, unit, value) {
    super(time, place, type, unit, value);
  }
}

class WeatherPrediction extends EventDataType {
  #min;
  #max;
  constructor(time, place, type, unit, min, max) {
    super(time, place, type, unit);
    this.#min = min;
    this.#max = max;
  }
  getMin() {
    return this.#min;
  }
  setMin(min) {
    this.#min = min;
  }
  getMax() {
    return this.#max;
  }
  setMax(max) {
    this.#max = max;
  }
}

class TemperaturePrediction extends WeatherPrediction {
  constructor(time, place, type, unit, min, max) {
    super(time, place, type, unit, min, max);
  }
  convertToC() {
    if (this.getUnit() == "F") {
      this.setUnit("C");
      this.setMax(1.8 * (this.getMax() - 32));
      this.setMin(1.8 * (this.getMin() - 32));
    }
  }
  convertToF() {
    if (this.getUnit() == "C") {
      this.setUnit("F");
      this.setMax(this.getMax() * 1.8 + 32);
      this.setMin(this.getMin() * 1.8 + 32);
    }
  }
}

class PrecipitationPrediction extends WeatherPrediction {
  #expectedTypes;
  constructor(time, place, type, unit, min, max, expectedTypes) {
    super(time, place, type, unit, min, max);
    this.#expectedTypes = expectedTypes;
  }
  getExpectedTypes() {
    return this.#expectedTypes;
  }
  convertToInches() {
    if (this.getUnit() == "MM") {
      this.setUnit("Inches");
      this.setMin(this.getMin() / 25.4);
      this.setMax(this.getMax() / 25.4);
    }
  }
  convertToMM() {
    if (this.getUnit() == "Inches") {
      this.setUnit("MM");
      this.setMax(this.getMax() * 25.4);
      this.setMin(this.getMin() * 25.4);
    }
  }
  matches(data) {
    if (data == undefined) return false;
    if (data.getUnit() == "MM") this.convertToMM();
    else if (data.getUnit() == "Inches") this.convertToInches();
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

class WindPrediction extends WeatherPrediction {
  #expectedDirections;
  constructor(time, place, type, unit, min, max, expectedDirections) {
    super(time, place, type, unit, min, max);
    this.#expectedDirections = expectedDirections;
  }
  getExpectedDirections() {
    return this.#expectedDirections;
  }
  convertToMPH() {
    if (this.getUnit() == "MS") {
      this.setUnit("MPH");
      this.setMin(this.getMin() * 2.237);
      this.setMax(this.getMax() * 2.237);
    }
  }
  convertToMS() {
    if (this.getUnit() == "MPH") {
      this.setUnit("MS");
      this.setMin(this.getMin() / 2.237);
      this.setMax(this.getMax() / 2.237);
    }
  }
  matches(data) {
    if (data == undefined) return false;
    if (data.getUnit() == "MS") this.convertToMS();
    else if (data.getUnit() == "MPH") this.convertToMPH();
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

class CloudCoveragePrediction extends WeatherPrediction {
  constructor(time, place, type, unit, min, max) {
    super(time, place, type, unit, min, max);
  }
}
