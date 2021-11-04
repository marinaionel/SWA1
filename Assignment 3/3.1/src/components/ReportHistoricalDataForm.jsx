import moment from "moment";

const TextFormField = ({ name, label, placeholder }) => {
  return (
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        for={name}
      >
        {label}
      </label>
      <input
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        name={name}
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};

const ReportHistoricalDataForm = ({ dispatcher }) => {
  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={(event) => {
        event.preventDefault();
        dispatcher()({
          type: "report_historical_data",
          data: {
            city: event.target.city.value,
            type: event.target.type.value,
            value: event.target.value.value,
            unit: event.target.unit.value,
            date: event.target.date.value,
            extra: event.target.extra.value,
          },
        });
      }}
    >
      <div className="flex flex-wrap -mx-3 mb-6">
        <TextFormField label={"City"} name={"city"} placeholder={"Aarhus"} />
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="type"
          >
            Type
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name="type"
            >
              <option>Cloud Coverage</option>
              <option>Temperature</option>
              <option>Wind Speed</option>
              <option>Precipitation</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <TextFormField label={"Value"} name={"value"} placeholder={""} />
        <TextFormField label={"Unit"} name={"unit"} placeholder={"C"} />
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="type"
          >
            Date
          </label>
          <input
            type="datetime-local"
            name="date"
            max={moment().format("YYYY-MM-DDThh:mm")}
          />
        </div>
        <TextFormField
          label={"Wind Direction / Precipitation Type"}
          name={"extra"}
          placeholder={""}
        />
      </div>

      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <input
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
            value="Submit"
          />
        </div>
      </div>
    </form>
  );
};

export default ReportHistoricalDataForm;
