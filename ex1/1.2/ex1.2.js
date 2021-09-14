const Temperature = function (unit, value) {
  const temperature = {};
  temperature.unit = unit;
  temperature.value = value;
  temperature.convertToF = function () {
    if (unit == "C") {
      this.unit = "F";
      this.value = value * 1.8 + 32;
    }
  };
  temperature.convertToC = function () {
    if (unit == "F") {
      this.unit = "C";
      this.value = 1.8 * (value - 32);
    }
  };
  temperature.getUnit = function () {
    return this.unit;
  };
  temperature.getValue = function () {
    return this.value;
  };
  return temperature;
};

const Precipitation = function (unit, value, precipitationType) {
  const precipitation = {};
  precipitation.unit = unit;
  precipitation.value = value;
  precipitation.precipitationType = precipitationType;
  precipitation.getUnit = function () {
    return this.unit;
  };
  precipitation.getValue = function () {
    return this.value;
  };
  precipitation.getPrecipitationType = function () {
    return this.precipitationType;
  };
  precipitation.convertToInches = function () {
    if (unit == "MM") {
      this.unit = "Inches";
      this.value = value / 25.4;
    }
  };
  precipitation.convertToMM = function () {
    if (unit == "Inches") {
      this.unit = "MM";
      this.value = value * 25.4;
    }
  };
  return precipitation;
};

const TemperaturePrediction = function (unit, minValue, maxValue) {
  const temperaturePrediction = {};
  temperaturePrediction.unit = unit;
  temperaturePrediction.minValue = minValue;
  temperaturePrediction.maxValue = maxValue;
  temperaturePrediction.getUnit = function () {
    return this.unit;
  };
  temperaturePrediction.getMinValue = function () {
    return this.minValue;
  };
  temperaturePrediction.getMaxValue = function () {
    return this.maxValue;
  };
  temperaturePrediction.matches = function (temp) {
    if (temp.getUnit() == "C") this.convertToC();
    else if (temp.getUnit() == "F") this.convertToF();
    return (
      temp.getValue() <= this.getMaxValue() &&
      temp.getValue() >= this.getMinValue()
    );
  };
  temperaturePrediction.convertToC = function () {
    if (unit == "F") {
      this.unit = "C";
      this.maxValue = 1.8 * (maxValue - 32);
      this.minValue = 1.8 * (minValue - 32);
    }
  };
  temperaturePrediction.convertToF = function () {
    if (unit == "C") {
      this.unit = "F";
      this.maxValue = maxValue * 1.8 + 32;
      this.minValue = minValue * 1.8 + 32;
    }
  };
  return temperaturePrediction;
};

const Wind = function (unit, value, direction) {
  const wind = {};
  wind.unit = unit;
  wind.value = value;
  wind.direction = direction;
  wind.getUnit = function () {
    return this.unit;
  };
  wind.getValue = function () {
    return this.value;
  };
  wind.getDirection = function () {
    return this.direction;
  };
  wind.convertToMPH = function () {
    if (unit == "MS") {
      this.unit = "MPH";
      this.value = value * 2.237;
    }
  };
  wind.convertToMS = function () {
    if (unit == "MPH") {
      this.unit = "MS";
      this.value = value / 2.237;
    }
  };
  return wind;
};

const PrecipitationPrediction = function (
  unit,
  minValue,
  maxValue,
  expectedTypes
) {
  const precipitationPrediction = {};
  precipitationPrediction.unit = unit;
  precipitationPrediction.minValue = minValue;
  precipitationPrediction.maxValue = maxValue;
  precipitationPrediction.expectedTypes = expectedTypes;
  precipitationPrediction.getMinValue = function () {
    return this.minValue;
  };
  precipitationPrediction.getMaxValue = function () {
    return this.maxValue;
  };
  precipitationPrediction.getUnit = function () {
    return this.unit;
  };
  precipitationPrediction.getExpectedTypes = function () {
    return this.getExpectedTypes;
  };
  precipitationPrediction.matches = function (data) {
    if (data.getUnit() == "MM") this.convertToMM();
    else if (data.getUnit() == "Inches") this.convertToInches();

    return (
      data.getValue() <= this.getMaxValue() &&
      data.getValue() >= this.getMinValue()
    );
  };
  precipitationPrediction.convertToInches = function () {
    if (unit == "MM") {
      this.unit = "Inches";
      this.minValue = minValue / 25.4;
      this.maxValue = maxValue / 25.4;
    }
  };
  precipitationPrediction.convertToMM = function () {
    if (unit == "Inches") {
      this.unit = "MM";
      this.maxValue = maxValue * 25.4;
      this.minValue = minValue * 25.4;
    }
  };
  return precipitationPrediction;
};

const WindPrediction = function (unit, minValue, maxValue, expectedDirections) {
  const windPrediction = {};
  windPrediction.unit = unit;
  windPrediction.minValue = minValue;
  windPrediction.maxValue = maxValue;
  windPrediction.expectedDirections = expectedDirections;
  windPrediction.getMinValue = function () {
    return this.minValue;
  };
  windPrediction.getMaxValue = function () {
    return this.maxValue;
  };
  windPrediction.getUnit = function () {
    return this.unit;
  };
  windPrediction.getExpectedDirections = function () {
    return this.expectedDirections;
  };
  windPrediction.matches = function (data) {
    if (data.getUnit() == "MS") this.convertToMS();
    else if (data.getUnit() == "MPH") this.convertToMPH();
    return (
      data.getValue() <= this.getMaxValue() &&
      data.getValue() >= this.getMinValue()
    );
  };
  windPrediction.convertToMPH = function () {
    if (unit == "MS") {
      this.unit = "MPH";
      this.minValue = minValue * 2.237;
      this.maxValue = maxValue * 2.237;
    }
  };
  windPrediction.convertToMS = function () {
    if (unit == "MPH") {
      this.unit = "MS";
      this.minValue = minValue / 2.237;
      this.maxValue = maxValue / 2.237;
    }
  };
  return windPrediction;
};
