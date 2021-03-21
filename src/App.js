import React,{ useState , useEffect} from "react";
import{MenuItem,FormControl,Select} from '@material-ui/core';
import CardContent from '@material-ui/core/Card';
import Card from '@material-ui/core/Card';
import './App.css';
import {sortData} from './util.js';
import InfoBox from './InfoBox';
import Map from './map';
import Table from './table';
import "./App.css";
import "./form.css";
function App() {
  const[countries,setCountries]= useState([]);
  const[country,setCountry]= useState("worldwide");
  const[countryInfo,setCountryInfo]=useState({});
  const[tableData,setTableData]=useState([]);
  useEffect(() => {
      fetch('https://disease.sh/v3/covid-19/all')
      .then((response) => response.json())
      .then((data) =>{
        setCountryInfo(data);
      });
  }, []);
  useEffect(()=>{
    const getCountriesData =async()=>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response)=>response.json())
      .then((data)=>  {
      const countries= data.map((country)=>({
        name:country.country,
        value:country.countryInfo.iso2
      }));
      const sortedData = sortData(data);
      setTableData(sortedData);
      setCountries(countries);
    });
  };
  getCountriesData();
  },[]);
const onCountryChange = async (event)=>{
  const countryCode = event.target.value;
  setCountry(countryCode);
  const url = countryCode==='worldwide'?'https://disease.sh/v3/covid-19/all'
  :'https://disease.sh/v3/covid-19/countries/'+countryCode;
  await fetch(url).then(response=> response.json()).then(data=>{
    setCountry(countryCode);
    setCountryInfo(data);
  })
};

  return (
    <div className="app">
    <div className="app__left">
    <div class="app__header">
    <h1>COVID-19 TRACKER</h1>
    <FormControl className="app__dropdown">
        <Select variant="outlined" onChange ={onCountryChange} value ={country}>
        <MenuItem value="worldwide">WorldWide</MenuItem>
          {
            countries.map((country)=>(
            <MenuItem value={country.value}>{country.name}</MenuItem>
          ))}

        </Select>
    </FormControl>
    </div>
    <div class="app__stats">
      <InfoBox className="card" title="Coronavirus cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
      <InfoBox className="card" title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
      <InfoBox className="card" title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
    </div>
    <Map></Map>
    </div>
    <Card class="app__right">
      <CardContent>
        <h3>Live cases by country</h3>
        <Table countries={tableData}/>
        <h3>Worldwide new cases</h3>
      </CardContent>
    </Card>

    </div>
  );
}

export default App;

