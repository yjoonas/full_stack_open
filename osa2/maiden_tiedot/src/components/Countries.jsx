import {Country} from "./Country.jsx";

export const Countries = ({countries, showCountryHandler, weather, setWeather}) => {
    if (!countries.length) return null
    if (countries?.length > 10) {
        return (
            <p>
                Too many matches, specify another filter
            </p>
        )
    }
    if (countries?.length <= 10 && countries.length > 1) {
        return (
            <>
                {
                    countries.map(country => {
                        const name = country.name.common
                        return <p key={name}>{name} <button onClick={() => showCountryHandler(name)}>show</button></p>
                    })
                }
            </>
        )
    }
    return(
        <div>
            <Country country={countries[0]} weather={weather} setWeather={setWeather}></Country>
        </div>
    )
}