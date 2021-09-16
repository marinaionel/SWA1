// prettier-ignore
const { INCHES, MS, MPH, MM, CELSIUS, FAHRENHEIT, TEMPERATURE, WIND, PRECIPITATION } = require("../constants");

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
        if (this.getUnit() == CELSIUS) {
          this.setUnit(FAHRENHEIT);
          this.setValue(this.getValue() * 1.8 + 32);
        }
      },
      convertToC() {
        if (this.getUnit() == FAHRENHEIT) {
          this.setUnit(CELSIUS);
          this.setValue((this.getValue() - 32) / 1.8);
        }
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
    WeatherData(time, place, type, unit, value)
  );

const Precipitation = (time, place, type, unit, value, precipitationType) => {
  return Object.assign(
    {
      getPrecipitationType() {
        return precipitationType;
      },
      convertToInches() {
        if (this.getUnit() == MM) {
          this.setUnit(INCHES);
          this.setValue(this.getValue() / 25.4);
        }
      },
      convertToMM() {
        if (this.getUnit() == INCHES) {
          this.setUnit(MM);
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
        if (this.getUnit() == MS) {
          this.setUnit(MPH);
          this.setValue(this.getValue() * 2.237);
        }
      },
      convertToMS() {
        if (this.getUnit() == MPH) {
          this.setUnit(MS);
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
        if (this.getUnit() == FAHRENHEIT) {
          this.setUnit(CELSIUS);
          // round to 2 decimal places
          this.setMax(Math.round(((this.getMax() - 32) / 1.8) * 100) / 100);
          this.setMin(Math.round(((this.getMin() - 32) / 1.8) * 100) / 100);
        }
      },
      convertToF() {
        if (this.getUnit() == CELSIUS) {
          this.setUnit(FAHRENHEIT);
          this.setMax(Math.round((this.getMax() * 1.8 + 32) * 100) / 100);
          this.setMin(Math.round((this.getMin() * 1.8 + 32) * 100) / 100);
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
  ...expectedTypes
) =>
  Object.assign(
    {
      getExpectedTypes() {
        return expectedTypes;
      },
      convertToInches() {
        if (this.getUnit() == MM) {
          this.setUnit(INCHES);
          this.setMin(this.getMin() / 25.4);
          this.setMax(this.getMax() / 25.4);
        }
      },
      convertToMM() {
        if (this.getUnit() == INCHES) {
          this.setUnit(MM);
          this.setMax(this.getMax() * 25.4);
          this.setMin(this.getMin() * 25.4);
        }
      },
    },
    WeatherPrediction(time, place, type, unit, min, max),
    // 'matches' in a separate object sice the parent has 'matches' so it overrides it
    {
      matches(data) {
        if (data == undefined) return false;
        return (
          data.getTime() == this.getTime() &&
          data.getPlace() == this.getPlace() &&
          data.getType() == this.getType() &&
          data.getUnit() == this.getUnit() &&
          data.getValue() >= this.getMin() &&
          data.getValue() <= this.getMax() &&
          this.getExpectedTypes().includes(data.getPrecipitationType())
        );
      },
    }
  );

const WindPrediction = (
  time,
  place,
  type,
  unit,
  min,
  max,
  ...expectedDirections
) =>
  Object.assign(
    {
      getExpectedDirections() {
        return expectedDirections;
      },
      convertToMPH() {
        if (this.getUnit() == MS) {
          this.setUnit(MPH);
          this.setMin(this.getMin() * 2.237);
          this.setMax(this.getMax() * 2.237);
        }
      },
      convertToMS() {
        if (this.getUnit() == MPH) {
          this.setUnit(MS);
          this.setMin(this.getMin() / 2.237);
          this.setMax(this.getMax() / 2.237);
        }
      },
    },
    WeatherPrediction(time, place, type, unit, min, max),
    {
      matches(data) {
        if (data == undefined) return false;
        return (
          data.getTime() == this.getTime() &&
          data.getPlace() == this.getPlace() &&
          data.getType() == this.getType() &&
          data.getUnit() == this.getUnit() &&
          data.getValue() >= this.getMin() &&
          data.getValue() <= this.getMax() &&
          this.getExpectedDirections().includes(data.getDirection())
        );
      },
    }
  );

const CloudCoveragePrediction = (time, place, type, unit, min, max) =>
  Object.assign({}, WeatherPrediction(time, place, type, unit, min, max));

const DateInterval = (from, to) => ({
  getFrom() {
    return from;
  },
  getTo() {
    return to;
  },
  contains(d) {
    return d >= from && d <= to;
  },
});

const average = (list) =>
  list.reduce((prev, curr) => prev + curr) / list.length;
const checker = (arr, target) => target.every((v) => arr.includes(v));
const onlyUnique = (value, index, self) => self.indexOf(value) === index;

// this object is to remove redundancies in WeatherHistory and WeatherForecast
const WeatherCollection = (...data) => ({
  forPlace(place) {
    return data.filter(function (item) {
      return item.getPlace() == place;
    });
  },
  forType(type) {
    return data.filter(function (item) {
      return item.getType() == type;
    });
  },
  forPeriod(period) {
    return data.filter(function (item) {
      return period.contains(item.getTime());
    });
  },
  including(...data) {
    return checker(this.getData(), data);
  },
  getData() {
    return data;
  },
  convertToUsUnits() {
    data.forEach((d) => {
      switch (d.getType()) {
        case TEMPERATURE:
          d.convertToF();
          break;
        case WIND:
          d.convertToMPH();
          break;
        case PRECIPITATION:
          d.convertToInches();
          break;
      }
    });
  },
  convertToInternationalUnits() {
    data.forEach((d) => {
      switch (d.getType()) {
        case TEMPERATURE:
          d.convertToC();
          break;
        case WIND:
          d.convertToMS();
          break;
        case PRECIPITATION:
          d.convertToMM();
          break;
      }
    });
  },
});

// get predictions seems to be the same as get data, so instead of a redundant call as below
//  getPredictions() {
//    return this.getData();
//  },
// the method will not be included
const WeatherForecast = (...data) =>
  Object.assign(
    {
      getAverageMinValue() {
        average(data.map((d) => d.getMin()));
      },
      getAverageMaxValue() {
        average(data.map((d) => d.getMax()));
      },
    },
    WeatherCollection()
  );

const WeatherHistory = (...data) =>
  Object.assign(
    {
      lowestValue() {
        if (this.getData() == undefined || this.getData().length == 0)
          return undefined;
        if (
          this.getData()
            .map((d) => d.getType())
            .filter(onlyUnique).length > 1
        )
          return undefined;
        return Math.min(this.getData().map((d) => d.getValue()));
      },
    },
    WeatherCollection()
  );

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
  DateInterval,
  WeatherForecast,
  WeatherHistory,
  WeatherCollection,
};
