<template>
  <div className="inline-block px-3 ">
    <div
      className="bg-blue-700 w-40 h-60 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
    >
      <div v-if="type === 'temperature'"><temperature-icon /></div>
      <div v-else-if="type === 'cloud coverage'"><cloud-icon /></div>
      <div v-else-if="type === 'wind speed'"><wind-icon /></div>
      <div v-else-if="type === 'precipitation'"><drop-icon /></div>

      <div className="font-bold text-xl mb-2 text-center text-white">
        {{ hour }}:00
      </div>
      <p className="text-base text-center text-white">{{ value }} {{ unit }}</p>
    </div>
  </div>
</template>

<script>
import CloudIcon from "./CloudIcon.vue";
import DropIcon from "./DropIcon.vue";
import TemperatureIcon from "./TemperatureIcon.vue";
import WindIcon from "./WindIcon.vue";

export default {
  name: "HistoricalCard",
  components: {
    "wind-icon": WindIcon,
    "cloud-icon": CloudIcon,
    "temperature-icon": TemperatureIcon,
    "drop-icon": DropIcon,
  },
  props: {
    type: String,
    hour: Number,
    value: Number,
    unit: String,
  },
};
</script>

<style></style>
