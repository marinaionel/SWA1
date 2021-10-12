// prettier-ignore
const { INCHES, MS, MPH, MM, CELSIUS, FAHRENHEIT, TEMPERATURE, WIND, PRECIPITATION } = require("../../constants");

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
});

const WeatherData = (time, place, type, unit, value) =>
  Object.assign(
    {
      getValue() {
        return value;
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
      getMax() {
        return max;
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
          return Temperature(
            this.getTime(),
            this.getPlace(),
            this.getType(),
            FAHRENHEIT,
            this.getValue() * 1.8 + 32
          );
        } else return this;
      },
      convertToC() {
        if (this.getUnit() == FAHRENHEIT) {
          return Temperature(
            this.getTime(),
            this.getPlace(),
            this.getType(),
            CELSIUS,
            (this.getValue() - 32) / 1.8
          );
        } else return this;
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
          return Precipitation(
            this.getTime(),
            this.getPlace(),
            this.getType(),
            INCHES,
            this.getValue() / 25.4,
            this.getPrecipitationType()
          );
        } else return this;
      },
      convertToMM() {
        if (this.getUnit() == INCHES) {
          return Precipitation(
            this.getTime(),
            this.getPlace(),
            this.getType(),
            MM,
            this.getValue() * 25.4,
            this.getPrecipitationType()
          );
        } else return this;
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
          return Wind(
            this.getTime(),
            this.getPlace(),
            this.getType(),
            MPH,
            this.getValue() * 2.237,
            this.getDirection()
          );
        } else return this;
      },
      convertToMS() {
        if (this.getUnit() == MPH) {
          return Wind(
            this.getTime(),
            this.getPlace(),
            this.getType(),
            MS,
            this.getValue() / 2.237,
            this.getDirection()
          );
        } else return this;
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
          return TemperaturePrediction(
            this.getTime(),
            this.getPlace(),
            this.getType(),
            CELSIUS,
            Math.round(((this.getMin() - 32) / 1.8) * 100) / 100,
            Math.round(((this.getMax() - 32) / 1.8) * 100) / 100
          );
        } else return this;
      },
      convertToF() {
        if (this.getUnit() == CELSIUS) {
          return TemperaturePrediction(
            this.getTime(),
            this.getPlace(),
            this.getType(),
            FAHRENHEIT,
            Math.round((this.getMin() * 1.8 + 32) * 100) / 100,
            Math.round((this.getMax() * 1.8 + 32) * 100) / 100
          );
        } else return this;
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
        if (this.getUnit() == MM) {
          return PrecipitationPrediction(
            this.getTime(),
            this.getPlace(),
            this.getType(),
            INCHES,
            this.getMin() / 25.4,
            this.getMax() / 25.4,
            this.getExpectedTypes()
          );
        } else return this;
      },
      convertToMM() {
        if (this.getUnit() == INCHES) {
          return PrecipitationPrediction(
            this.getTime(),
            this.getPlace(),
            this.getType(),
            MM,
            this.getMin() * 25.4,
            this.getMax() * 25.4,
            this.getExpectedTypes()
          );
        } else return this;
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
  expectedDirections
) =>
  Object.assign(
    {
      getExpectedDirections() {
        return expectedDirections;
      },
      convertToMPH() {
        if (this.getUnit() == MS) {
          return WindPrediction(
            this.getTime(),
            this.getPlace(),
            this.getType(),
            MPH,
            this.getMin() * 2.237,
            this.getMax() * 2.237,
            this.getExpectedDirections()
          );
        } else return this;
      },
      convertToMS() {
        if (this.getUnit() == MPH) {
          return WindPrediction(
            this.getTime(),
            this.getPlace(),
            this.getType(),
            MS,
            this.getMin() / 2.237,
            this.getMax() / 2.237,
            this.getExpectedDirections()
          );
        } else return this;
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

const WeatherForecast = (data) => {
  const average = (list) =>
    list.reduce((prev, curr) => prev + curr) / list.length;
  return {
    forPlace(place) {
      return WeatherForecast(
        this.getPredictions().filter((d) => d.getPlace() == place)
      );
    },
    forType(type) {
      return WeatherForecast(
        this.getPredictions().filter((d) => d.getType() == type)
      );
    },
    forPeriod(period) {
      return WeatherForecast(
        this.getPredictions().filter((d) => period.contains(d.getTime()))
      );
    },
    getAverageMinValue() {
      return average(this.getPredictions().map((d) => d.getMin()));
    },
    getAverageMaxValue() {
      return average(this.getPredictions().map((d) => d.getMax()));
    },
    including(_data) {
      return WeatherForecast(_data.concat(this.getPredictions()));
    },
    getPredictions() {
      return data;
    },
    convertToUsUnits() {
      return WeatherForecast(
        this.getPredictions().map((d) => {
          switch (d.getType()) {
            case TEMPERATURE:
              return d.convertToF();
            case PRECIPITATION:
              return d.convertToInches();
            case WIND:
              return d.convertToMPH();
            default:
              return d;
          }
        })
      );
    },
    convertToInternationalUnits() {
      return WeatherForecast(
        this.getPredictions().map((d) => {
          switch (d.getType()) {
            case TEMPERATURE:
              return d.convertToC();
            case WIND:
              return d.convertToMS();
            case PRECIPITATION:
              return d.convertToMM();
            default:
              return d;
          }
        })
      );
    },
  };
};

const WeatherHistory = (data) => ({
  getData() {
    return data;
  },
  forPlace(place) {
    return WeatherHistory(this.getData().filter((d) => d.getPlace() == place));
  },
  forType(type) {
    return WeatherHistory(this.getData().filter((d) => d.getType() == type));
  },
  forPeriod(period) {
    return WeatherHistory(
      this.getData().filter((d) => period.contains(d.getTime()))
    );
  },
  including(_data) {
    return WeatherHistory(_data.concat(this.getData()));
  },
  lowestValue() {
    if (this.getData() == undefined || this.getData().length == 0)
      return undefined;
    if (
      this.getData()
        .map((d) => d.getType())
        .filter((value, index, self) => self.indexOf(value) === index).length >
      1
    )
      return undefined;
    let min = Math.min(
      ...this.getData()
        .map((d) => d.getValue())
        .map(Number)
    );
    return min == NaN ? undefined : min;
  },
  convertToUsUnits() {
    return WeatherHistory(
      this.getData().map((d) => {
        switch (d.getType()) {
          case TEMPERATURE:
            return d.convertToF();
          case PRECIPITATION:
            return d.convertToInches();
          case WIND:
            return d.convertToMPH();
          default:
            return d;
        }
      })
    );
  },
  convertToInternationalUnits() {
    return WeatherHistory(
      this.getData().map((d) => {
        switch (d.getType()) {
          case TEMPERATURE:
            return d.convertToC();
          case WIND:
            return d.convertToMS();
          case PRECIPITATION:
            return d.convertToMM();
          default:
            return d;
        }
      })
    );
  },
});

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
};
