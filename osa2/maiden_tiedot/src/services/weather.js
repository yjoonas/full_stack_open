import axios from "axios";

const api_key = import.meta.env.VITE_WEATHER_API_KEY
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${api_key}`

const getWeather = (lat, lon) => {
    const request = axios.get(`${weatherUrl}&lat=${lat}&lon=${lon}`)
    return request.then(res => res.data)
}

export default {
    getWeather
}
