import {useState} from "rect";
import getWeather from "@/lib/getWeather";


export default function useWeather(){
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchWeather = async(city) => {
        if(!city) { return; }
            setLoading(true);
            setError(null);
            setWeather(null);
        }

    try {
        const data = getWeather(city);
        setWeather(data);
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
    return {weather, loading, error, fetchWeather};
}