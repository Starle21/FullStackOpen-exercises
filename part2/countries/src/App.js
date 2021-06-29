import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [searchString, setSearchString] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data);
    });
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchString.toLowerCase())
  );

  return (
    <div>
      find coutries:
      <input
        value={searchString}
        onChange={e => setSearchString(e.target.value)}
      />
      <Country
        countries={filteredCountries}
        setSearchString={setSearchString}
      />
    </div>
  );
}

const ShowCountry = ({ countries }) => {
  return (
    <>
      <h1>{countries[0].name}</h1>
      <div>Capital: {countries[0].capital}</div>
      <div>Population: {countries[0].population}</div>
      <div>
        <h3>languages</h3>
        <ul>
          {countries[0].languages.map(lang => {
            return <li key={lang.name}>{lang.name}</li>;
          })}
        </ul>
      </div>
      <div>
        <img src={countries[0].flag} alt="" />
      </div>
      <ShowWeather capital={countries[0].capital} />
    </>
  );
};

const ShowWeather = ({ capital }) => {
  const [weather, setWeather] = useState([]);
  const apiKey = process.env.REACT_APP_API_KEY;
  console.log(capital);

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${apiKey}&query=${capital}`
      )
      .then(response => {
        setWeather(response.data);
      })
      .catch(() => console.log('error somwhere'));
  }, [apiKey, capital]);
  console.log(weather);

  if (weather.length !== 0) {
    return (
      <div>
        <h3>Current weather in {capital}</h3>
        <p>temperature: {weather.current.temperature} Celsius</p>
        <img src={weather.current.weather_icons[0]} alt="" />
        <p>
          wind: {weather.current.wind_speed} mph direction{' '}
          {weather.current.wind_dir}
        </p>
      </div>
    );
  } else return <div></div>;
};

const Country = ({ countries, setSearchString }) => {
  if (countries.length === 250) {
    return <div> Search a specific country by its name.</div>;
  }
  if (countries.length === 1) {
    return <ShowCountry countries={countries} />;
  }
  if (countries.length < 10) {
    return (
      <div>
        {countries.map(country => {
          return (
            <div key={country.alpha3Code}>
              {country.name}
              <button onClick={() => setSearchString(country.name)}>
                show
              </button>
            </div>
          );
        })}
      </div>
    );
  }
  return <div> Too many matches, put in a more concrete name.</div>;
};

export default App;
