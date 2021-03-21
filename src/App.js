import React,{useState, useEffect} from 'react';
import './App.css';
import InfoBox from "./InfoBox.js";
import {FormControl, MenuItem, Select} from "@material-ui/core";
function App() {
  const [countries, setCountries]=useState([]);
  const [country, setCountry] = useState('worldwide');
  useEffect(() => {
    const getCountriesData = async () =>{
    await fetch("https://disease.sh/v3/covid-19/countries")
    .then((response) => response.json())
    .then((data) => {
      const countries = data.map((country) => (
        {
          name:country.country,
          value:country.countryInfo.iso2
        }));
        setCountries(countries);
      });
    };
    getCountriesData();
  },[]);
  return (
    <div className="app">
      <div className="app_header">
        <h1>Covid-19 Tracker</h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined"  value={country}>
          <MenuItem value="worldwide">WorldWide</MenuItem>
            {
              countries.map((country) => (
            <MenuItem value={country.value}>{country.name}</MenuItem>
            ))
            }

          </Select>
        </FormControl>
      </div>
      <div className="app-stats">
        <InfoBox title="CoronaVirus Cases" cases={123} total={2000}/>
        <InfoBox title="Recovered" cases={124} total={3000}/>
        <InfoBox title="Death" cases={1235} total={4000}/>
      </div>
    </div>
  );
}

export default App;
