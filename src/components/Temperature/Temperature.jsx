import thermometerImg from "../../assets/thermometer.svg";

export const Temperature = ({ event }) => {
  return (
    <div className="temperature">
      <img src={thermometerImg} alt="Temperature" />
      {event?.temperature ? (
        <>
          <p>{Math.round(event.temperature)}°C</p>
          <img
            src={`https://openweathermap.org/img/wn/${event.weatherImgId}.png`}
            alt="Weather"
          />
        </>
      ) : (
        <p>Temperature Unavailable</p>
      )}
    </div>
  );
};
