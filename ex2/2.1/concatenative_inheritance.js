// Concatenative inheritance (also called mixins or cloning) is the process of copying the properties from one object to another,
// without retaining a reference between the two objects. It relies on JavaScript’s dynamic object extension feature.

// added setters to keep the encapsulation
const Event_ = (time, place) => ({
  getTime() {
    return time;
  },
  getPlace() {
    return place;
  },
});

const DataType = (type, unit) => ({
  getType() {
    return type;
  },
  getUnit() {
    return unit;
  },
  setUnit(_unit) {
    unit = _unit;
  },
});

const WeatherData = (time, place, type, unit, value) =>
  Object.assign(
    {
      getValue() {
        return value;
      },
      setValue(_value) {
        value = _value;
      },
    },
    Event_(time, place),
    DataType(type, unit)
  );

const WeatherPrediction = (time, place, type, unit, min, max) => {
  return Object.assign(
    {
      getMin() {
        return min;
      },
      setMin(_min) {
        min = _min;
      },
      getMax() {
        return max;
      },
      setMax(_max) {
        max = _max;
      },
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
      },
    },
    Event_(time, place),
    DataType(type, unit)
  );
};

const Temperature = (time, place, type, unit, value) =>
  Object.assign(
    {
      convertToF() {
        if (this.getUnit() == "C") {
          this.setUnit("F");
          this.setValue(this.getValue() * 1.8 + 32);
        }
      },
      convertToC() {
        if (this.getUnit() == "F") {
          this.setUnit("C");
          this.setValue(1.8 * (this.getValue() - 32));
        }
      },
    },
    WeatherData(time, place, type, unit, value)
  );

const Precipitation = (time, place, type, unit, value, precipitationType) => {
  return Object.assign(
    {
      getPrecipitationType() {
        return precipitationType;
      },
      convertToInches() {
        if (this.getUnit() == "MM") {
          this.setUnit("Inches");
          this.setValue(this.getValue() / 25.4);
        }
      },
      convertToMM() {
        if (this.getUnit() == "Inches") {
          this.setUnit("MM");
          this.setValue(this.getValue() * 25.4);
        }
      },
    },
    WeatherData(time, place, type, unit, value)
  );
};

const Wind = (time, place, type, unit, value, direction) => {
  return Object.assign(
    {
      getDirection() {
        return direction;
      },
      convertToMPH() {
        if (this.getUnit() == "MS") {
          this.setUnit("MPH");
          this.setValue(this.getValue() * 2.237);
        }
      },
      convertToMS() {
        if (this.getUnit() == "MPH") {
          this.setUnit("MS");
          this.setValue(this.getValue() / 2.237);
        }
      },
    },
    WeatherData(time, place, type, unit, value)
  );
};

const CloudCoverage = (time, place, type, unit, value) =>
  Object.assign({}, WeatherData(time, place, type, unit, value));

const TemperaturePrediction = (time, place, type, unit, min, max) =>
  Object.assign(
    {
      convertToC() {
        if (this.getUnit() == "F") {
          this.setUnit("C");
          this.setMax(1.8 * (this.getMax() - 32));
          this.setMin(1.8 * (this.getMin() - 32));
        }
      },
      convertToF() {
        if (this.getUnit() == "C") {
          this.setUnit("F");
          this.setMax(this.getMax() * 1.8 + 32);
          this.setMin(this.getMin() * 1.8 + 32);
        }
      },
    },
    WeatherPrediction(time, place, type, unit, min, max)
  );

const PrecipitationPrediction = (
  time,
  place,
  type,
  unit,
  min,
  max,
  expectedTypes
) =>
  Object.assign(
    {
      getExpectedTypes() {
        return expectedTypes;
      },
      convertToInches() {
        if (this.getUnit() == "MM") {
          this.setUnit("Inches");
          this.setMin(this.getMin() / 25.4);
          this.setMax(this.getMax() / 25.4);
        }
      },
      convertToMM() {
        if (this.getUnit() == "Inches") {
          this.setUnit("MM");
          this.setMax(this.getMax() * 25.4);
          this.setMin(this.getMin() * 25.4);
        }
      },
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
      },
    },
    WeatherPrediction(time, place, type, unit, min, max)
  );

const WindPrediction = (
  time,
  place,
  type,
  unit,
  min,
  max,
  expectedDirections
) =>
  Object.assign(
    {
      getExpectedDirections() {
        return expectedDirections;
      },
      convertToMPH() {
        if (this.getUnit() == "MS") {
          this.setUnit("MPH");
          this.setMin(this.getMin() * 2.237);
          this.setMax(this.getMax() * 2.237);
        }
      },
      convertToMS() {
        if (this.getUnit() == "MPH") {
          this.setUnit("MS");
          this.setMin(this.getMin() / 2.237);
          this.setMax(this.getMax() / 2.237);
        }
      },
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
      },
    },
    WeatherPrediction(time, place, type, unit, min, max)
  );

const CloudCoveragePrediction = (time, place, type, unit, min, max) =>
  Object.assign({}, WeatherPrediction(time, place, type, unit, min, max));

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
