import {useEffect, useState} from "react";
import {Search} from "./components/Search.jsx";
import {Countries} from "./components/Countries.jsx";
import countryService from './services/countries.js';

function App() {
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState('');
    const [weather, setWeather] = useState(null);


    useEffect(() => {
        countryService.getCountries()
            .then(allCountries => setCountries(allCountries))
    }, [])

    const searchHandler = (event) => {
        event.preventDefault()
        setSearch(event.target.value)
    }

    const showCountryHandler = (name) => {
        setSearch(name)
    }

    const filteredCountries = search ? countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase())) : countries;

  return (
    <>
      <div>
          <Search search={search} searchHandler={searchHandler}></Search>
          <Countries countries={filteredCountries} showCountryHandler={showCountryHandler} weather={weather} setWeather={setWeather}></Countries>
      </div>
    </>
  )
}

export default App
