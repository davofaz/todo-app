import React, { useState, useEffect } from 'react';

const WeatherWidget = () => {
    const [temperature, setTemperature] = useState<number | null>(null);
    const [desc, setDesc] = useState<number | null>(null);
    const [minTemp, setMinTemp] = useState<number | null>(null);
    const [maxTemp, setMaxTemp] = useState<number | null>(null);
    const [icon, setIcon] = useState(undefined);
    const [isCelsius, setIsCelsius] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;
                
                    const response = await fetch(
                       `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=1`
                    );

                    // Simulate an error by checking the response status
                    if (!response.ok) {
                        throw new Error('Failed to fetch weather data');
                    }

                    const data = await response.json();
                    const temp = isCelsius ? data.current.temp_c : data.current.temp_f;
                    const minTemp = isCelsius ? data.forecast.forecastday[0].day.mintemp_c : data.forecast.forecastday[0].day.mintemp_f;
                    const maxTemp = isCelsius ? data.forecast.forecastday[0].day.maxtemp_c : data.forecast.forecastday[0].day.maxtemp_f;
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
                setError(error as Error);
            }
        };

        fetchWeatherData();
    }, [isCelsius]);

    const toggleTempScale = () => {
        setIsCelsius((prevIsCelsius) => !prevIsCelsius);
    }

    const renderTemp = (value: number | null) => `${value} ${isCelsius ? '\u00B0C' : '\u00B0F'}`

    return (
        <div className="weather-widget" onClick={toggleTempScale}>
            {error ? (
                <div>Error: {error.message}</div>
            ) : (
                <>
                    {temperature && (
                        <div>
                            <div>
                                <img src={icon} alt="Weather Icon" height="32" />
                            </div>
                            <div>
                                {renderTemp(temperature)} {desc}
                            </div>
                            <div>
                                <small>
                                    Min: {renderTemp(minTemp)} | Max: {renderTemp(maxTemp)}
                                </small>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );

};

export default WeatherWidget;
