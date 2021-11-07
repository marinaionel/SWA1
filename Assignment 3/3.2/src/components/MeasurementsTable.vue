<template>
  <section className="container mx-auto p-6 font-mono">
    <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
      <div className="w-full overflow-x-auto">
        <table id="latestMeasurements" className="w-full">
          <thead>
            <tr
              className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600"
            >
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Value</th>
              <th className="px-4 py-3">Unit</th>
            </tr>
          </thead>
          <MeasurementDataBody />
        </table>
      </div>
    </div>
  </section>
</template>

<script>
const MeasurementData = {
  props: {
    measurement: Object,
  },
  template: `<td key="type" className="px-4 py-3 border md:capitalize">
      {{ measurement.type }}
    </td>
    <td key="value" className="px-4 py-3 border">
      {{ measurement.value }}
    </td>
    <td key="unit" className="px-4 py-3 border">
      {{ measurement.unit }}
    </td>`,
};
const MeasurementRow = {
  props: {
    measurement: Object,
  },
  components: {
    MeasurementData,
  },
  template: `<tr className="text-gray-700"> <MeasurementData :measurement="measurement" /></tr>`,
};
const MeasurementDataBody = {
  template: `
    <tbody className="bg-white">
        <div v-for='m in latestMeasurements' :key='m.type'>
            <MeasurementRow :key="m.type" :measurement="m"} />
        </div>
    </tbody>`,
  components: {
    MeasurementRow,
  },
};

export default {
  name: "MeasurementsTable",
  components: { MeasurementDataBody },
};
</script>

<style></style>
