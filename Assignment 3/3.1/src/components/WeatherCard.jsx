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
                  .filter((d) => d.type === "wind speed")[0]?.value
              }{" "}
              {
                model
                  .getLatestMeasurements()
                  .filter((d) => d.type === "wind speed")[0]?.unit
              }
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="font-medium text-sm">Humidity</div>
            <div className="text-sm text-gray-500">
              {
                model
                  .getLatestMeasurements()
                  .filter((d) => d.type === "precipitation")[0]?.value
              }{" "}
              {
                model
                  .getLatestMeasurements()
                  .filter((d) => d.type === "precipitation")[0]?.unit
              }
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="font-medium text-sm">Cloud Coverage</div>
            <div className="text-sm text-gray-500">
              {
                model
                  .getLatestMeasurements()
                  .filter((d) => d.type === "cloud coverage")[0]?.value
              }
              {
                model
                  .getLatestMeasurements()
                  .filter((d) => d.type === "cloud coverage")[0]?.unit
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
