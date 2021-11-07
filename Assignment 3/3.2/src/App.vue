<template>
  <div className="px-4 sm:px-6 md:px-8 mb-14 sm:mb-20 xl:mb-8">
    <div className="px-4 sm:px-6 md:px-8 mb-10 sm:mb-16 md:mb-20">
      <h2
        className="sm:text-lg sm:leading-snug font-semibold tracking-wide uppercase text-purple-600 mb-3"
      >
        Weather
      </h2>
      <p
        className="text-3xl sm:text-5xl lg:text-6xl leading-none font-extrabold text-gray-900 tracking-tight mb-8"
      >
        {{ city }}
      </p>
      <p
        className="max-w-4xl text-lg sm:text-2xl font-medium sm:leading-10 space-y-6 mb-6"
      >
        See the latest weather measurements in {{ city }} below.
      </p>
      <h1
        className="inline-block text-3xl font-extrabold text-gray-900 tracking-tight md:capitalize"
      >
        Average wind speed:
      </h1>
      <p className="mt-1 text-lg text-gray-500">{{ averageWindSpeed }} m/s</p>
      <h1
        className="inline-block text-3xl font-extrabold text-gray-900 tracking-tight md:capitalize"
      >
        Total precipitations:
      </h1>
      <p className="mt-1 text-lg text-gray-500">{{ totalPrecipitations }} mm</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        v-on:click="update"
      >
        Update data
      </button>
      <section id="selectCity">
        <div
          className="w-full flex-none text-sm font-medium text-gray-500 mt-2"
        >
          Select a city
        </div>
        <vSelect :options="[[cities]]" />
      </section>
    </div>

    <WeatherCard
      :latestMeasurementsprop="model.getLatestMeasurements()"
      :minimumTemperatureprop="model.minimumTemperature()"
      :maximumTemperatureprop="model.maximumTemperature()"
      :cityprop="model.getCity()"
    />

    <div className="flex flex-col bg-white m-auto p-auto">
      <div>
        <p
          className="max-w-4xl text-lg sm:text-2xl font-medium sm:leading-10 space-y-6 mb-6"
        >
          Weather Forecast
        </p>
        <div className="w-full max-w-lg flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              From
            </label>
            <DatePicker
              placeholderText="from..."
              className="appearance-none
            block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3
            px-4 leading-tight focus:outline-none focus:bg-white
            focus:border-gray-500"
              v-model="fromForecast"
              dateFormat="dd/MM/yyyy
            HH:mm"
              showTimeSelect
              timeIntervals="{60}"
              minDate="{{moment().toDate()}}"
              maxDate="{{moment().add(1, 'd').toDate()}}"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              To
            </label>
            <DatePicker
              placeholderText="to..."
              className="appearance-none block
            bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4
            leading-tight focus:outline-none focus:bg-white
            focus:border-gray-500"
              v-model="toForecast"
              dateFormat="dd/MM/yyyy
            HH:mm"
              showTimeSelect
              timeIntervals="{60}"
              minDate="{{fromForecast}}"
              maxDate="{{ moment().add(1, 'd').toDate() }}"
            />
          </div>
        </div>
      </div>
      <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
        <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10 ">
          <div v-for="element in forecast" :key="element">
            <ForecastCard
              :hour="new Date(element.time).getHours()"
              :type="element.type"
              :min="element.from"
              :max="element.to"
              :unit="element.unit"
            />
          </div>
        </div>
      </div>
    </div>

    <div className="flex flex-col bg-white m-auto p-auto">
      <div>
        <p
          className="max-w-4xl text-lg sm:text-2xl font-medium sm:leading-10 space-y-6 mb-6"
        >
          Weather Historical Values
        </p>
        <div className="w-full max-w-lg flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              From
            </label>
            <!-- <DatePicker className="appearance-none block bg-gray-200
            text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight
            focus:outline-none focus:bg-white focus:border-gray-500"
            selected={model.getHistoricalInterval()[0]} onChange={(date) => {
            dispatcher()({ from: date, type: "set_from_historical", }); }}
            dateFormat="dd/MM/yyyy HH:mm" showTimeSelect timeIntervals={60}
            maxDate={moment().toDate()} /> -->
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              To
            </label>
            <!-- <DatePicker placeholderText="to..." className="appearance-none block
            bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4
            leading-tight focus:outline-none focus:bg-white
            focus:border-gray-500" selected={model.getHistoricalInterval()[1]}
            onChange={(date) => { dispatcher()({ to: date, type:
            "set_to_historical", }); }} dateFormat="dd/MM/yyyy HH:mm"
            showTimeSelect timeIntervals={60}
            minDate={model.getHistoricalInterval()[0]}
            maxDate={moment().toDate()} /> -->
          </div>
        </div>
      </div>
      <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
        <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10 ">
          <div v-for="element in historical" :key="element">
            <HistoricalCard
              :hour="new Date(element.time).getHours()"
              :type="element.type"
              :value="element.value"
              :unit="element.unit"
            />
          </div>
        </div>
      </div>
    </div>

    <div>
      <p
        class="
          max-w-4xl
          text-lg
          sm:text-2xl
          font-medium
          sm:leading-10
          space-y-6
          mb-6
        "
      >
        Report historical weather data
      </p>
      <div
        className="rounded-t-lg border-t border-l border-r border-gray-400 px-3 py-10 bg-gray-200 flex justify-center"
      >
        <ReportHistoricalDataForm />
      </div>
    </div>

    <MeasurementsTable />
  </div>
</template>

<script>
import ReportHistoricalDataForm from "./components/ReportHistoricalDataForm.vue";
import WeatherCard from "./components/WeatherCard.vue";
import MeasurementsTable from "./components/MeasurementsTable.vue";
import ForecastCard from "./components/ForecastCard.vue";
import HistoricalCard from "./components/HistoricalCard.vue";
import * as moment from "moment";

export default {
  name: "App",
  data: function (instance) {
    return {
      moment,
      model: instance.modelprop,
      cities: instance.modelprop.getCities(),
      historicalData: instance.modelprop.historical(),
      forecast: instance.modelprop.forecast(),
      averageWindSpeed: instance.modelprop.averageWindSpeed()?.toFixed(2),
      totalPrecipitations: instance.modelprop.totalPrecipitation()?.toFixed(2),
      latestMeasurements: instance.modelprop.getLatestMeasurements(),
      maximumTemperature: instance.modelprop.maximumTemperature(),
      minimumTemperature: instance.modelprop.minimumTemperature(),
    };
  },

  computed: {
    city: {
      get() {
        return this.model.getCity();
      },
      set(v) {
        this.model.setCity(v);
      },
    },
    fromForecast: {
      get() {
        return this.model.getForecastInterval()[0];
      },
      set(v) {
        this.model = this.model.setForecastInterval(
          v,
          this.model.getForecastInterval()[1]
        );
      },
    },
    toForecast: {
      get() {
        return this.model.getForecastInterval()[1];
      },
      set(v) {
        this.model = this.model.setForecastInterval(
          this.model.getForecastInterval()[0],
          v
        );
      },
    },
    fromHistorical: {
      get() {
        return this.model.getHistoricalInterval()[0];
      },
      set(v) {
        this.model = this.model.setHistoricalInterval(
          v,
          this.model.getHistoricalInterval()[1]
        );
      },
    },
    toHistorical: {
      get() {
        return this.model.getHistoricalInterval()[1];
      },
      set(v) {
        this.model.setHistoricalInterval(
          this.model.getHistoricalInterval()[0],
          v
        );
      },
    },
  },

  props: ["modelprop"],
  components: {
    ReportHistoricalDataForm,
    WeatherCard,
    MeasurementsTable,
    ForecastCard,
    HistoricalCard,
  },
};
</script>

<style></style>
