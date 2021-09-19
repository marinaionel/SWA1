const { INCHES, MS, MPH, MM, CELSIUS, FAHRENHEIT } = require("../constants");

function Event_(time, place) {
  this.time = time;
  this.place = place;
}
Event_.prototype.getTime = function () {
  return this.time;
};
Event_.prototype.getPlace = function () {
  return this.place;
};

function DataType(type, unit) {
  this.type = type;
  this.unit = unit;
}
DataType.prototype.getType = function () {
  return this.type;
};
DataType.prototype.getUnit = function () {
  return this.unit;
};
DataType.prototype.setUnit = function (unit) {
  return (this.unit = unit);
};

function EventDataType(time, place, type, unit) {
  this.time = time;
  this.place = place;
  this.type = type;
  this.unit = unit;
}
EventDataType.prototype.getType = function () {
  return this.type;
};
EventDataType.prototype.getUnit = function () {
  return this.unit;
};
EventDataType.prototype.setUnit = function (unit) {
  this.unit = unit;
};
EventDataType.prototype.getTime = function () {
  return this.time;
};
EventDataType.prototype.getPlace = function () {
  return this.place;
};

function WeatherData(time, place, type, unit, value) {
  EventDataType.call(this, time, place, type, unit);
  this.value = value;
}
Object.setPrototypeOf(WeatherData.prototype, EventDataType.prototype);
WeatherData.prototype.getValue = function () {
  return this.value;
};
WeatherData.prototype.setValue = function (value) {
  this.value = value;
};

function Temperature(time, place, type, unit, value) {
  WeatherData.call(this, time, place, type, unit, value);
}
Object.setPrototypeOf(Temperature.prototype, WeatherData.prototype);
Temperature.prototype.convertToF = function () {
  if (this.getUnit() == CELSIUS) {
    this.setUnit(FAHRENHEIT);
    this.setValue(this.getValue() * 1.8 + 32);
  }
};
Temperature.prototype.convertToC = function () {
  if (this.getUnit() == FAHRENHEIT) {
    this.setUnit(CELSIUS);
    this.setValue((this.getValue() - 32) / 1.8);
  }
};

function Precipitation(time, place, type, unit, value, precipitationType) {
  WeatherData.call(this, time, place, type, unit, value);
  this.precipitationType = precipitationType;
}
Object.setPrototypeOf(Precipitation.prototype, WeatherData.prototype);
Precipitation.prototype.getPrecipitationType = function () {
  return this.precipitationType;
};
Precipitation.prototype.convertToInches = function () {
  if (this.getUnit() == MM) {
    this.setUnit(INCHES);
    this.setValue(this.getValue() / 25.4);
  }
};
Precipitation.prototype.convertToMM = function () {
  if (this.getUnit() == INCHES) {
    this.setUnit(MM);
    this.setValue(this.getValue() * 25.4);
  }
};

function Wind(time, place, type, unit, value, direction) {
  WeatherData.call(this, time, place, type, unit, value);
  this.direction = direction;
}
Object.setPrototypeOf(Wind.prototype, WeatherData.prototype);
Wind.prototype.getDirection = function () {
  return this.direction;
};
Wind.prototype.convertToMPH = function () {
  if (this.getUnit() == MS) {
    this.setUnit(MPH);
    this.setValue(this.getValue() * 2.237);
  }
};
Wind.prototype.convertToMS = function () {
  if (this.getUnit() == MPH) {
    this.setUnit(MS);
    this.setValue(this.getValue() / 2.237);
  }
};

function CloudCoverage(time, place, type, unit, value) {
  WeatherData.call(this, time, place, type, unit, value);
}
Object.setPrototypeOf(CloudCoverage.prototype, WeatherData.prototype);

function WeatherPrediction(time, place, type, unit, min, max) {
  EventDataType.call(this, time, place, type, unit);
  this.min = min;
  this.max = max;
}
Object.setPrototypeOf(WeatherPrediction.prototype, EventDataType.prototype);
WeatherPrediction.prototype.getMin = function () {
  return this.min;
};
WeatherPrediction.prototype.setMin = function (min) {
  this.min = min;
};
WeatherPrediction.prototype.getMax = function () {
  return this.max;
};
WeatherPrediction.prototype.setMax = function (max) {
  this.max = max;
};
WeatherPrediction.prototype.matches = function (data) {
  if (data == undefined) return false;
  return (
    data.getTime() == this.getTime() &&
    data.getPlace() == this.getPlace() &&
    data.getType() == this.getType() &&
    data.getUnit() == this.getUnit() &&
    data.getValue() >= this.getMin() &&
    data.getValue() <= this.getMax()
  );
};

function TemperaturePrediction(time, place, type, unit, min, max) {
  WeatherPrediction.call(this, time, place, type, unit, min, max);
}
Object.setPrototypeOf(
  TemperaturePrediction.prototype,
  WeatherPrediction.prototype
);
TemperaturePrediction.prototype.convertToC = function () {
  if (this.getUnit() == FAHRENHEIT) {
    this.setUnit(CELSIUS);
    this.setMax(Math.round(((this.getMax() - 32) / 1.8) * 100) / 100);
    this.setMin(Math.round(((this.getMin() - 32) / 1.8) * 100) / 100);
  }
};
TemperaturePrediction.prototype.convertToF = function () {
  if (this.getUnit() == CELSIUS) {
    this.setUnit(FAHRENHEIT);
    this.setMax(Math.round((this.getMax() * 1.8 + 32) * 100) / 100);
    this.setMin(Math.round((this.getMin() * 1.8 + 32) * 100) / 100);
  }
};

function PrecipitationPrediction(
  time,
  place,
  type,
  unit,
  min,
  max,
  ...expectedTypes
) {
  WeatherPrediction.call(this, time, place, type, unit, min, max);
  this.expectedTypes = expectedTypes;
}
Object.setPrototypeOf(
  PrecipitationPrediction.prototype,
  WeatherPrediction.prototype
);
PrecipitationPrediction.prototype.getExpectedTypes = function () {
  return this.expectedTypes;
};
PrecipitationPrediction.prototype.convertToInches = function () {
  if (this.getUnit() == MM) {
    this.setUnit(INCHES);
    this.setMin(this.getMin() / 25.4);
    this.setMax(this.getMax() / 25.4);
  }
};
PrecipitationPrediction.prototype.convertToMM = function () {
  if (this.getUnit() == INCHES) {
    this.setUnit(MM);
    this.setMax(this.getMax() * 25.4);
    this.setMin(this.getMin() * 25.4);
  }
};
PrecipitationPrediction.prototype.matches = function (data) {
  console.log(WeatherPrediction.prototype);
  return (
    WeatherPrediction.prototype.matches.call(this, data) &&
    this.getExpectedTypes().includes(data.getPrecipitationType())
  );
};

function WindPrediction(
  time,
  place,
  type,
  unit,
  min,
  max,
  ...expectedDirections
) {
  WeatherPrediction.call(this, time, place, type, unit, min, max);
  this.expectedDirections = expectedDirections;
}
Object.setPrototypeOf(WindPrediction.prototype, WeatherPrediction.prototype);
WindPrediction.prototype.getExpectedDirections = function () {
  return this.expectedDirections;
};
WindPrediction.prototype.convertToMPH = function () {
  if (this.getUnit() == MS) {
    this.setUnit(MPH);
    this.setMin(this.getMin() * 2.237);
    this.setMax(this.getMax() * 2.237);
  }
};
WindPrediction.prototype.convertToMS = function () {
  if (this.getUnit() == MPH) {
    this.setUnit(MS);
    this.setMin(this.getMin() / 2.237);
    this.setMax(this.getMax() / 2.237);
  }
};
WindPrediction.prototype.matches = function (data) {
  return (
    WeatherPrediction.prototype.matches.call(this, data) &&
    this.getExpectedDirections().includes(data.getDirection())
  );
};

function CloudCoveragePrediction(time, place, type, unit, min, max) {
  WeatherPrediction.call(this, time, place, type, unit, min, max);
}
Object.setPrototypeOf(
  CloudCoveragePrediction.prototype,
  WeatherPrediction.prototype
);

function DateInterval(from, to) {
  this.from = from;
  this.to = to;
}
DateInterval.prototype.getFrom = function () {
  return this.from;
};
DateInterval.prototype.getTo = function () {
  return this.to;
};
DataType.prototype.contains = function (d) {
  return d >= this.from && d <= this.to;
};

function WeatherCollection(data) {
  this.data = data;
}
WeatherCollection.prototype.forPlace = function (place) {
  return this.data.filter(function (item) {
    return item.getPlace() == place;
  });
};
WeatherCollection.prototype.forType = function (type) {
  return this.data.filter(function (item) {
    return item.getType() == type;
  });
};
WeatherCollection.prototype.forPeriod = function (period) {
  return this.data.filter(function (item) {
    return period.contains(item.getTime());
  });
};
WeatherCollection.prototype.including = function (data) {
  const checker = (arr, target) => target.every((v) => arr.includes(v));
  return checker(this.data, data);
};
WeatherCollection.prototype.getData = function () {
  return this.data;
};
WeatherCollection.prototype.convertToUsUnits = function () {
  this.data.forEach((d) => {
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
};
WeatherCollection.prototype.convertToInternationalUnits = function () {
  this.data.forEach((d) => {
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
};

function WeatherForecast(data) {
  WeatherCollection.call(this, data);
}
Object.setPrototypeOf(WeatherForecast.prototype, WeatherCollection.prototype);
const average = (list) =>
  list.reduce((prev, curr) => prev + curr) / list.length;
WeatherForecast.prototype.getAverageMaxValue = function () {
  return average(this.getData().map((d) => d.getMax()));
};
WeatherForecast.prototype.getAverageMinValue = function () {
  return average(this.getData().map((d) => d.getMin()));
};

function WeatherHistory(data) {
  WeatherCollection.call(this, data);
}
Object.setPrototypeOf(WeatherHistory.prototype, WeatherCollection.prototype);
WeatherHistory.prototype.lowestValue = function () {
  if (this.getData() == undefined || this.getData().length == 0)
    return undefined;
  if (
    this.getData()
      .map((d) => d.getType())
      .filter((value, index, self) => self.indexOf(value) === index).length > 1
  )
    return undefined;
  let min = Math.min(
    ...this.getData()
      .map((d) => d.getValue())
      .map(Number)
  );
  return min == NaN ? undefined : min;
};

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
