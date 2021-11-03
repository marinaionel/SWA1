import Select from "react-select";
import DatePicker from "react-datepicker";
import * as moment from "moment";

/* eslint-disable import/no-anonymous-default-export */
const MeasurementData = ({ measurement }) => {
  return [
    <td key="type" className="px-4 py-3 border md:capitalize">
      {measurement.type}
    </td>,
    <td key="value" className="px-4 py-3 border">
      {measurement.value}
    </td>,
    <td key="unit" className="px-4 py-3 border">
      {measurement.unit}
    </td>,
  ];
};

const MeasurementRow = ({ measurement }) => (
  <tr className="text-gray-700">
    <MeasurementData measurement={measurement} />
  </tr>
);

const MeasurementDataBody = ({ model }) => {
  return (
    <tbody className="bg-white">
      {model.getLatestMeasurements().map((m) => (
        <MeasurementRow key={m.type} measurement={m} />
      ))}
    </tbody>
  );
};

const WeatherCard = ({ model }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col bg-white rounded p-4 w-full max-w-xs">
        <div className="font-bold text-xl">{model.getCity()}</div>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleString("en", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
          <svg
            className="w-32 h-32"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
            ></path>
          </svg>
        </div>
        <div className="flex flex-row items-center justify-center mt-6">
          <div className="font-medium text-6xl">
            {
              model
                .getLatestMeasurements()
                .filter((d) => d.type === "temperature")[0].value
            }
            {"°"}
            {
              model
                .getLatestMeasurements()
                .filter((d) => d.type === "temperature")[0].unit
            }
          </div>
          <div className="flex flex-col items-center ml-6">
            <div>Cloudy</div>
            <div className="mt-1">
              <span className="text-sm">
                <i className="far fa-long-arrow-up"></i>
              </span>
              <span
                className="text-sm font-light text-gray-500"
                alt="Maximum temperature for the last 5 days"
              >
                {model.maximumTemperatureForTheLast5Days()}°C
              </span>
            </div>
            <div>
              <span className="text-sm">
                <i className="far fa-long-arrow-down"></i>
              </span>
              <span
                className="text-sm font-light text-gray-500"
                alt="Minimum temperature for the last 5 days"
              >
                {model.minimumTemperatureForTheLast5Days()}°C
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between mt-6">
          <div className="flex flex-col items-center">
            <div className="font-medium text-sm">Wind</div>
            <div className="text-sm text-gray-500">
              {
                model
                  .getLatestMeasurements()
                  .filter((d) => d.type === "wind speed")[0].value
              }{" "}
              {
                model
                  .getLatestMeasurements()
                  .filter((d) => d.type === "wind speed")[0].unit
              }
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="font-medium text-sm">Humidity</div>
            <div className="text-sm text-gray-500">
              {
                model
                  .getLatestMeasurements()
                  .filter((d) => d.type === "precipitation")[0].value
              }{" "}
              {
                model
                  .getLatestMeasurements()
                  .filter((d) => d.type === "precipitation")[0].unit
              }
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="font-medium text-sm">Cloud Coverage</div>
            <div className="text-sm text-gray-500">
              {
                model
                  .getLatestMeasurements()
                  .filter((d) => d.type === "cloud coverage")[0].value
              }
              {
                model
                  .getLatestMeasurements()
                  .filter((d) => d.type === "cloud coverage")[0].unit
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CloudIcon = () => (
  <div className="text-center pt-2 mb-2 fill-current text-white">
    <svg
      className="w-10 mx-auto"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 453.421 453.421"
      enable-background="new 0 0 453.421 453.421"
    >
      <g>
        <path
          d="M348.533,187.944c-2.287,0-4.596,0.084-6.926,0.241c-5.621-73.995-67.623-132.488-143.048-132.488
		c-79.095,0-143.45,64.348-143.45,143.454c0,0.47,0.004,0.935,0.018,1.406C21.396,218.757,0,254.172,0,292.832
		c0,57.833,47.046,104.893,104.885,104.893h243.648c57.828,0,104.888-47.055,104.888-104.893
		C453.421,234.997,406.361,187.944,348.533,187.944z M348.533,375.305H104.885c-45.472,0-82.471-37.002-82.471-82.473
		c0-32.46,19.193-62.005,48.889-75.279l7.095-3.171l-0.604-9.688c-0.122-1.839-0.265-3.672-0.265-5.543
		c0-66.74,54.298-121.041,121.038-121.041c66.749,0,121.055,54.296,121.036,121.114c-0.032,0.523-0.065,1.032-0.07,1.546
		l-0.132,13.691l13.444-2.578c5.313-1.021,10.594-1.531,15.701-1.531c45.479,0,82.472,36.995,82.472,82.479
		C431.018,338.303,394.011,375.305,348.533,375.305z"
        />
      </g>
    </svg>
  </div>
);

const DropIcon = () => (
  <div className="text-center pt-2 mb-2">
    <svg
      className="w-10 mx-auto fill-current text-white"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 512 512"
      enable-background="new 0 0 512 512"
    >
      <g>
        <path
          d="M264.06,3.68C262.034,1.343,259.094,0,256,0c-3.094,0-6.034,1.343-8.06,3.68C240.43,12.344,64,217.057,64,320
			c0,105.87,86.13,192,192,192c105.87,0,192-86.13,192-192C448,217.057,271.57,12.344,264.06,3.68z M256,490.667
			c-94.105,0-170.667-76.561-170.667-170.667c0-83.262,135.827-251.135,170.672-292.825c14.978,17.9,48.599,59.077,81.921,106.717
			C395.981,216.895,426.667,281.25,426.667,320C426.667,414.106,350.106,490.667,256,490.667z"
        />
      </g>
      <g>
        <path
          d="M256,437.333c-64.698,0-117.333-52.635-117.333-117.333c0-5.89-4.776-10.667-10.667-10.667
			c-5.89,0-10.667,4.776-10.667,10.667c0,76.461,62.206,138.667,138.667,138.667c5.891,0,10.667-4.776,10.667-10.667
			C266.667,442.11,261.891,437.333,256,437.333z"
        />
      </g>
    </svg>
  </div>
);

const WindIcon = () => (
  <div className="text-center pt-2 mb-2">
    <svg
      className="w-10 mx-auto fill-current text-white"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      enableBackground="new 0 0 512 512"
    >
      <g>
        <g>
          <path
            d="M287.64,94.921c-31.721,0-57.528,25.807-57.528,57.528h34.517c0-12.688,10.323-23.011,23.011-23.011
   c12.688,0,23.011,10.323,23.011,23.011c0,12.688-10.323,23.011-23.011,23.011H46.022v34.517H287.64
   c31.721,0,57.528-25.807,57.528-57.528C345.169,120.728,319.361,94.921,287.64,94.921z"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            d="M431.461,106.427c-34.893,0-63.281,28.388-63.281,63.281c0,25.377,20.646,46.022,46.022,46.022
   c25.377,0,46.022-20.646,46.022-46.022h-34.517c0,6.344-5.161,11.506-11.506,11.506c-6.344,0-11.506-5.161-11.506-11.506
   c0-15.861,12.904-28.764,28.764-28.764c25.377,0,46.022,20.646,46.022,46.022c0,25.377-20.646,46.022-46.022,46.022H0v34.517
   h431.461c44.409,0,80.539-36.13,80.539-80.539C512,142.557,475.87,106.427,431.461,106.427z"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            d="M345.169,290.517H46.022v34.517h299.146c15.861,0,28.764,12.904,28.764,28.764c0,15.861-12.904,28.764-28.764,28.764
   c-15.86,0-28.764-12.904-28.764-28.764h-34.517c0,34.893,28.388,63.281,63.281,63.281c34.893,0,63.281-28.388,63.281-63.281
   C408.449,318.905,380.062,290.517,345.169,290.517z"
          />
        </g>
      </g>
    </svg>
  </div>
);

const TemperatureIcon = () => (
  <div className="text-center pt-2 mb-2">
    <svg
      width="24px"
      height="24px"
      viewBox="-7 -2 24 24"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMinYMin"
      className="jam jam-temperature w-10 mx-auto fill-current text-white"
    >
      <path d="M10 15a5 5 0 1 1-8-4V3a3 3 0 1 1 6 0v8c1.214.912 2 2.364 2 4zm-3.201-2.401l-.799-.6V3a1 1 0 1 0-2 0v8.999l-.799.6a3 3 0 1 0 3.598 0zM5 17a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
    </svg>
  </div>
);

const ForecastCard = ({ hour, type, min, max, unit }) => {
  return (
    <div className="inline-block px-3 ">
      <div className="bg-blue-700 w-40 h-60 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
        {[type].map(
          (t) =>
            ({
              temperature: <TemperatureIcon />,
              "cloud coverage": <CloudIcon />,
              "wind speed": <WindIcon />,
              precipitation: <DropIcon />,
            }[t])
        )}
        <div className="font-bold text-xl mb-2 text-center text-white">
          {hour}:00
        </div>
        <p className="text-base text-center text-white">
          {min} to {max} {unit}
        </p>
      </div>
    </div>
  );
};

export default (dispatcher) => (model) => {
  const options = [
    { value: "Horsens", label: "Horsens" },
    { value: "Aarhus", label: "Aarhus" },
    { value: "Copenhagen", label: "Copenhagen" },
  ];
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
              selected={model.getFromTime()}
              onChange={(date) =>
                dispatcher()({
                  from: date,
                  type: "set_from_prediction",
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
              selected={model.getToTime()}
              onChange={(date) => {
                dispatcher()({
                  to: date,
                  type: "set_to_prediction",
                });
              }}
              timeFormat="HH:mm"
              dateFormat="dd/MM/yyyy HH:mm"
              showTimeSelect
              timeIntervals={60}
              minDate={model.getFromTime()}
              maxDate={moment().add(1, "d").toDate()}
              // minTime={model.getFromTime()}
              // maxTime={moment().add(1, "d").toDate()}
            />
          </div>
        </div>
        <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
          <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10 ">
            {model.hourlyPredictions().map((element) => (
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
