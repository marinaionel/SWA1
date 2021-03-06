import TemperatureIcon from "./TemperatureIcon";
import CloudIcon from "./CloudIcon";
import WindIcon from "./WindIcon";
import DropIcon from "./DropIcon";

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

export default ForecastCard;
