import Select from "react-select";
import DatePicker from "react-datepicker";
import * as moment from "moment";
import ReportHistoricalDataForm from "./components/ReportHistoricalDataForm";
import ForecastCard from "./components/ForecastCard";
import MeasurementDataBody from "./components/MeasurementDataBody";
import WeatherCard from "./components/WeatherCard";

/* eslint-disable import/no-anonymous-default-export */
export default (dispatcher) => (model) => {
  const options = model
    .getCities()
    .map((item) => ({ value: item, label: item }));
  const handleChange = (selectedOption) =>
    dispatcher()({ type: "choose_city", city: selectedOption.value });
  return (
    <div id="base" className="px-4 sm:px-6 md:px-8 mb-14 sm:mb-20 xl:mb-8">
      <div className="px-4 sm:px-6 md:px-8 mb-10 sm:mb-16 md:mb-20">
        <h2 className="sm:text-lg sm:leading-snug font-semibold tracking-wide uppercase text-purple-600 mb-3">
          Weather
        </h2>
        <p className="text-3xl sm:text-5xl lg:text-6xl leading-none font-extrabold text-gray-900 tracking-tight mb-8">
          {model.getCity()}
        </p>
        <p className="max-w-4xl text-lg sm:text-2xl font-medium sm:leading-10 space-y-6 mb-6">
          See the latest weather measurements in {model.getCity()} below.
        </p>
        <h1 className="inline-block text-3xl font-extrabold text-gray-900 tracking-tight md:capitalize">
          Average wind speed for the last 5 days:{" "}
        </h1>
        <p className="mt-1 text-lg text-gray-500">
          {model.averageWindSpeedForTheLast5Days().toFixed(2)} m/s
        </p>
        <h1 className="inline-block text-3xl font-extrabold text-gray-900 tracking-tight md:capitalize">
          Total precipitations for the last 5 days:
        </h1>
        <p className="mt-1 text-lg text-gray-500">
          {model.totalPrecipitationForTheLast5Days().toFixed(2)} mm
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() =>
            dispatcher()({ type: "update", city: model.getCity() })
          }
        >
          Update data
        </button>
        <section id="selectCity">
          <div className="w-full flex-none text-sm font-medium text-gray-500 mt-2">
            Select a city
          </div>
          <Select
            value={{ value: model.getCity(), label: model.getCity() }}
            onChange={handleChange}
            options={options}
          />
        </section>
      </div>

      <WeatherCard model={model} />

      <div className="flex flex-col bg-white m-auto p-auto">
        <div>
          <p className="max-w-4xl text-lg sm:text-2xl font-medium sm:leading-10 space-y-6 mb-6">
            Weather Forecast for the next 24 hours
          </p>
          <div>
            <p className="inline">From</p>
            <DatePicker
              placeholderText="from..."
              className="inline"
              selected={model.getForecastInterval()[0]}
              onChange={(date) =>
                dispatcher()({
                  from: date,
                  type: "set_from_forecast",
                })
              }
              timeFormat="HH:mm"
              dateFormat="dd/MM/yyyy HH:mm"
              showTimeSelect
              timeIntervals={60}
              minDate={moment().toDate()}
              maxDate={moment().add(1, "d").toDate()}
              // minTime={moment().toDate()}
              // maxTime={moment().add(1, "d").toDate()}
            />
            <p className="inline">to</p>
            <DatePicker
              placeholderText="to..."
              className="inline"
              selected={model.getForecastInterval()[1]}
              onChange={(date) => {
                dispatcher()({
                  to: date,
                  type: "set_to_forecast",
                });
              }}
              timeFormat="HH:mm"
              dateFormat="dd/MM/yyyy HH:mm"
              showTimeSelect
              timeIntervals={60}
              minDate={model.getForecastInterval()[0]}
              maxDate={moment().add(1, "d").toDate()}
              // minTime={model.getFromTime()}
              // maxTime={moment().add(1, "d").toDate()}
            />
          </div>
        </div>
        <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
          <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10 ">
            {model.forecast().map((element) => (
              <ForecastCard
                hour={new Date(element.time).getHours()}
                type={element.type}
                min={element.from}
                max={element.to}
                unit={element.unit}
              />
            ))}
          </div>
        </div>
      </div>

      <div>
        <p class="max-w-4xl text-lg sm:text-2xl font-medium sm:leading-10 space-y-6 mb-6">
          Report historical weather data
        </p>
        <ReportHistoricalDataForm dispatcher={dispatcher} />
      </div>

      <section className="container mx-auto p-6 font-mono">
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">
            <table id="latestMeasurements" className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Value</th>
                  <th className="px-4 py-3">Unit</th>
                </tr>
              </thead>
              <MeasurementDataBody model={model} />
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
