import React from 'react';

const WeatherCard = ({
  weather,
  temperature,
  isCelsious,
  changeUnitTemperature,
}) => {
  console.log(weather);
  return (
    <article>
      <h1>Weather App</h1>
      <h3>{`${weather.name}, ${weather.sys.country}`}</h3>
      <section>
        <div>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0]?.icon}@4x.png`}
            alt=""
          />
        </div>
        <ul>
          <li>Weather: {weather.weather[0].description}</li>
          <li>Wind speed: {weather.wind.speed} m/s</li>
          <li>Clouds: {weather.clouds.all} %</li>
          <li>Pressure:{weather.main.pressure}</li>
        </ul>
      </section>

      <p>
        {isCelsious
          ? `${temperature?.celsius} °C`
          : `${temperature?.fahrenheit} °F`}
      </p>
      <p>??{typeof changeUnitTemperature}</p>
      <button onClick={changeUnitTemperature}>Degrees °F/°C</button>
    </article>
  );
};

export default WeatherCard;
/*1:30*/
/*1:45*/
