import {useEffect} from "react";
import weatherService from "../services/weather.js"

const Weather = ({weather, capital}) => {
    const imgSource = weather ? ` https://openweathermap.org/img/wn/${weather.weather[0].icon}.png` : ""
    return (
        <>
            <h2>
                Weather in {capital}
            </h2>
            <p>
                temperature {weather.main.temp} celsius
            </p>
            <img width={100} height={100} src={imgSource} alt={'Icon representing current weather'} />
            <p>
                wind {weather.wind.speed} m/s
            </p>
        </>
    )
}

export const Country = ({country, setWeather, weather}) => {
    useEffect(() => {
        if (Object.keys(country).length > 0) {
            weatherService.getWeather(country.latlng[0], country.latlng[1])
                .then(weather => setWeather(weather))
        }
    }, [country])
    const capital = country.capital
    return (
        <div>
            <h2>
                {country.name.common}
            </h2>
            <p>
                Capital {capital}
                Area {country.area}
            </p>
            <h3>
                languages
            </h3>
            <ul>
                {
                    Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)
                }
            </ul>
            <img width={150} height={150} src={country.flags.svg} alt={country.flags.alt}/>
            {
                weather ? <Weather weather={weather} capital={capital}></Weather> : <></>
            }
        </div>
    )
}