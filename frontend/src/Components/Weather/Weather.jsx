import React, { useState, useEffect } from 'react';
import { Avatar, Badge } from 'antd';
import axios from 'axios';

import Weatherclear from "@/Assets/Images/Weather/clear.png";
import Weatherclouds from "@/Assets/Images/Weather/clouds.png";
import Weatherrain from "@/Assets/Images/Weather/rain.png";
import Weatherthunderstorm from "@/Assets/Images/Weather/thunderstorm.png";
import Weatherdrizzle from "@/Assets/Images/Weather/drizzle.png";
import Weathersnow from "@/Assets/Images/Weather/snow.png";
import Weathermist from "@/Assets/Images/Weather/mist.png";
import Weatherfog from "@/Assets/Images/Weather/fog.png";
import Weathersmoke from "@/Assets/Images/Weather/smoke.png";
import Weatherhaze from "@/Assets/Images/Weather/haze.png";
import Weathernotfind from "@/Assets/Images/Weather/notfind.png";
/**
 * This code snippet defines a functional component called WeatherSwitch.
 * It uses React hooks (useState and useEffect) to fetch weather data from the OpenWeatherMap API and display it.
 * The component renders an Avatar component from the Ant Design library, which displays an image representing the current weather condition.
 * The weather condition is determined based on the response data from the API and mapped to the corresponding image source.
 * The temperature is also displayed as a badge count on the Avatar component.
 * If the weather data is not available yet, a loading message is displayed.
 * The latitude and longitude used for the API request are hardcoded in the code.
 */
const WeatherSwitch = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [weatherImage, setWeatherImage] = useState("");

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const apiKey = '5ece4bb839180b8d5cc80e1e99139872';
                const latitude = 43.3;
                const longitude = -0.3667;

                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${apiKey}`
                );

                setWeatherData(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données météorologiques', error);
            }
        };

        fetchWeatherData();
    }, []);

    useEffect(() => {
        if (weatherData) {
            const weatherCondition = weatherData.weather[0].main.toLowerCase();
            let imageSrc = "";

            if (weatherCondition === "clear") {
                imageSrc = Weatherclear;
            } else if (weatherCondition === "clouds") {
                imageSrc = Weatherclouds;
            } else if (weatherCondition === "rain") {
                imageSrc = Weatherrain;
            } else if (weatherCondition === "thunderstorm") {
                imageSrc = Weatherthunderstorm;
            } else if (weatherCondition === "drizzle") {
                imageSrc = Weatherdrizzle;
            } else if (weatherCondition === "snow") {
                imageSrc = Weathersnow;
            } else if (weatherCondition === "mist") {
                imageSrc = Weathermist;
            } else if (weatherCondition === "fog") {
                imageSrc = Weatherfog;
            } else if (weatherCondition === "smoke") {
                imageSrc = Weathersmoke;
            } else if (weatherCondition === "haze") {
                imageSrc = Weatherhaze;
            } else {
                imageSrc = Weathernotfind;
            }
            setWeatherImage(imageSrc);
        }
    }, [weatherData]);

    const temperature = weatherData?.main?.temp;
    return (
        <div className='weathercontainer'>
            {temperature !== undefined ? (
                <Badge count={temperature + "°"}>
                    <Avatar src={weatherImage} shape="square" size="medium" />
                </Badge>
            ) : (
                <p>Chargement...</p>
            )}
        </div>
    );
};

export default WeatherSwitch;
