import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import WeatherCard from './components/WeatherCard';

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temperature, setTemperature] = useState();
  const [isCelsius, setIsCelsius] = useState(true);
  //Aqui obtenemos las coordenadas de la API del navegador y las montamos en un estado
  const success = (pos) => {
    const newCoords = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
    };
    setCoords(newCoords);
  };
  //console.log('me renderizo');
  const changeUnitTemperature = () => setIsCelsius(!isCelsius);
  //const changeUnitTemperature = () => setIsCelsius(false);
  console.log(`type of ${typeof changeUnitTemperature}`);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);
  // peticion de datos a las API del clima
  useEffect(() => {
    if (coords) {
      const API_KEY = '2a8372e84ccf66c3edc76619cddca135';
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`;
      axios
        .get(URL)
        .then((res) => {
          // console.log(res.data);
          const tempkelvin = res.data.main.temp;
          const tempCelsius = (tempkelvin - 273.15).toFixed(1);
          const tempFahrenheit = ((tempCelsius * 9) / 5 + 32).toFixed(1);
          const newTemperature = {
            celsius: tempCelsius,
            fahrenheit: tempFahrenheit,
          };
          setTemperature(newTemperature);
          setWeather(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [coords]);
  // console.log(weather);
  // console.log(temperature);
  return (
    <div className="App">
      {weather ? (
        <WeatherCard
          weather={weather}
          temperature={temperature}
          chahgeUnitTemperature={changeUnitTemperature}
          isCelsius={isCelsius}
        />
      ) : (
        <p>Loaging...</p>
      )}
    </div>
  );
}

export default App;
