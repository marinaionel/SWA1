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

export default MeasurementDataBody;
