import React, { useState, useEffect } from 'react';

const WeatherWidget = () => {
    const [temperature, setTemperature] = useState(null);
    const [desc, setDesc] = useState(null);
    const [minTemp, setMinTemp] = useState(null);
    const [maxTemp, setMaxTemp] = useState(null);
    const [icon, setIcon] = useState(undefined);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
                console.log(apiKey);
                navigator.geolocation.getCurrentPosition(async (posititon) => {
                    const { latitude, longitude } = posititon.coords;
                
                    const response = await fetch(
                        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=1`
                    );
                    const data = await response.json();
                    const temp = data && data.current && data.current.temp_c;
                    const minTemp = data && data.forecast && data.forecast.forecastday[0].day.mintemp_c;
                    const maxTemp = data && data.forecast && data.forecast.forecastday[0].day.maxtemp_c;
                    const desc = data && data.current && data.current.condition.text;
                    const icon = data && data.current && data.current.condition.icon;

                setTemperature(temp);
                setDesc(desc);
                setIcon(icon);
                setMinTemp(minTemp);
                setMaxTemp(maxTemp);
                });
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeatherData();
    }, []);

    return (
        <div className="weather-widget">
            {temperature && (
                <div>
                    <div><img src={icon} alt="Weather Icon" height="32" /></div>
                    <div>{temperature} &#8451; {desc}</div>
                    <div><small>Min: {minTemp} &#8451; | Max: {maxTemp} &#8451;</small></div>
                </div>
             )}
        </div>
    );
};

export default WeatherWidget;
