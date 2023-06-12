import React, { useState, useEffect } from 'react';

const WeatherWidget = () => {
    const [temperature, setTemperature] = useState(null);
    const [desc, setDesc] = useState(null);
    const [icon, setIcon] = useState(undefined);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const apiKey = process.env.REACT_APP_WEATHER_API_KEY; 
                const response = await fetch(
                    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=location`
                );
                const data = await response.json();
                const temp = data && data.current && data.current.temp_c;
                const desc = data && data.current && data.current.condition.text;
                const icon = data && data.current && data.current.condition.icon;

                setTemperature(temp);
                setDesc(desc);
                setIcon(icon);
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
                    <div>{temperature} &#8451;</div>
                    <div>{desc}</div>
                    <div><img src={icon} alt="Weather Icon" /></div>
                </div>
             )}
        </div>
    );
};

export default WeatherWidget;
