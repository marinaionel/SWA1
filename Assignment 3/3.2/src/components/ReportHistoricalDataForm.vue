<template>
  <form
    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    v-on:submit="submitFunc($event)"
  >
    <div className="flex flex-wrap -mx-3 mb-6">
      <text-form-field :label="'City'" :name="'city'" :placeholder="'Aarhus'" />
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
          <div
            className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
          >
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div className="flex flex-wrap -mx-3 mb-6">
      <text-form-field :label="'Value'" :name="'value'" />
      <text-form-field :label="'Unit'" :name="'unit'" :placeholder="'C'" />
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
          max='moment().format("YYYY-MM-DDThh:mm")'
        />
      </div>
      <text-form-field
        :label="'Wind Direction / Precipitation Type'"
        :name="'extra'"
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
</template>

<script>
import TextFormField from "./TextFormField.vue";
export default {
  name: "ReportHistoricalDataForm",
  components: {
    "text-form-field": TextFormField,
  },
  props: {
    submitFunc: Function,
  },
};
</script>

<style></style>
