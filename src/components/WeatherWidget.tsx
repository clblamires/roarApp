import { useEffect, useState } from "react";
import { IonCard, IonCardContent, IonSpinner } from "@ionic/react";
import './WeatherWidget.css';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const CITY = "Pullman";
const URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=imperial&appid=${API_KEY}`;
console.log(URL);

interface WeatherData { 
    temp: number;
    weather: { description: string} [];
    icon: string;
    wind: { speed: number };
}

const WeatherWidget: React.FC = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect( ()=> {
        const fetchWeather = async () => {
            try {
                const response = await fetch(URL);
                const data = await response.json();
                setWeather({
                    temp: data.main.temp,
                    weather: data.weather,
                    icon: data.weather[0].icon,
                    wind: data.wind,
                });
            } catch (error ){
                console.error( 'Error fetching weather:', error );
            } finally {
                setLoading(false);
            }
        };
        fetchWeather();
    }, []);

    if( !API_KEY ){
        return <p>Error: Missing API Key :P</p>
    }

    return (
        <>
            { loading ? (
                <IonSpinner/>
            ) : (
                <IonCard>
                    <IonCardContent>
                        <h2>
                            <strong>Weather at WSU Today</strong>
                        </h2>
                        <p>
                            Temperature: { Math.round( weather?.temp! ) }&deg;F
                        </p>
                        <p>
                            Conditions: { weather?.weather[0].description }
                        </p>
                        <p>
                            Wind Speed: { weather?.wind.speed  } mph
                        </p>
                        <img
                            src={`https://openweathermap.org/img/wn/${weather?.icon}@2x.png`}
                            alt={weather?.weather[0].description}
                            className="weather-icon"
                        />
                    </IonCardContent>
                </IonCard>
            )}
        </>
    )
}

export default WeatherWidget;