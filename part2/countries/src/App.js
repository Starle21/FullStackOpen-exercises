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
    country.name.toLowerCase().includes(searchString)
  );

  return (
    <div>
      find coutries:
      <input
        value={searchString}
        onChange={e => setSearchString(e.target.value)}
      />
      <Country countries={filteredCountries} />
    </div>
  );
}

const Country = ({ countries }) => {
  if (countries.length === 250) {
    return <div> Search a specific country by its name.</div>;
  }
  if (countries.length === 1) {
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
      </>
    );
  }
  if (countries.length < 10) {
    return (
      <div>
        {countries.map(country => {
          return <div key={country.alpha3Code}>{country.name}</div>;
        })}
      </div>
    );
  }
  return <div> Too many matches, put in a more concrete name.</div>;
};

export default App;
