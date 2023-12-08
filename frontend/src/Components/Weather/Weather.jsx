import React, { useState, useEffect, useRef } from 'react';
import { Avatar, Modal } from 'antd';
import axios from 'axios';
import WeatherClick from "@/Assets/Images/WeatherClick.png";
import FondWeather from "@/Assets/Images/MoonWeather.png"
const WeatherSwitch = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const apiKey = '5ece4bb839180b8d5cc80e1e99139872';
                const latitude = 43.3;
                const longitude = -0.3667;

                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
                );

                setWeatherData(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données météorologiques', error);
            }
        };

        fetchWeatherData();
    }, []);

    console.log(weatherData)
    const handleAvatarClick = () => {
        setIsModalVisible(!isModalVisible);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const modalStyle = {
        backgroundImage: `url(${FondWeather})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    };

    return (
        <div>
            <Avatar src={WeatherClick} size={32} onClick={handleAvatarClick} />

            <Modal
                title="Weather Details"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                className='testsssssssssssssssssssssssss'
                style={modalStyle}
            >

                <div >

                    {/* Add more weather data as needed */}
                </div>

            </Modal>
        </div>
    );
};

export default WeatherSwitch;
