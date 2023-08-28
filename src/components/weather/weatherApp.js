// Importa los módulos y componentes necesarios
import { useState, useEffect } from "react";
import Loading from "./loading";
import WeatherForm from "./weatherForm";
import WeatherMainInfo from "./weatherMainInfo";

// Importa estilos desde un módulo CSS
import styles from "./weatherApp.module.css";

// Define el componente principal
export default function WeatherApp() {
  // Estado para almacenar los datos del clima, inicialmente configurado como nulo
  const [weather, setWeather] = useState(null);

  // Hook de efecto: Carga la información del clima cuando el componente se monta
  useEffect(() => {
    loadInfo();
  }, []);

  // Hook de efecto: Actualiza el título del documento cuando cambian los datos del clima
  useEffect(() => {
    document.title = "Clima | " + weather?.location?.name ?? "";
  }, [weather]);

  // Función para cargar de forma asíncrona la información del clima
  async function loadInfo(city = "Buenos Aires") {
    // Registra la URL de la API con la ciudad proporcionada
    console.log(
      `${process.env.REACT_APP_URL}&key=${process.env.REACT_APP_KEY}&q=${city}`
    );
    try {
      // Realiza una solicitud a la API para obtener los datos del clima
      const request = await fetch(
        `${process.env.REACT_APP_URL}&key=${process.env.REACT_APP_KEY}&q=${city}`
      );
      // Analiza la respuesta como JSON
      const json = await request.json();
      console.log(json);

      // Establece los datos del clima en el estado después de una espera de 2 segundos
      setTimeout(() => {
        setWeather({ ...json });
      }, 2000);
    } catch (e) {
      // Maneja los errores registrándolos
      console.error(e);
    }
  }

  // Función para manejar el cambio de ciudad
  function handleOnChangeCity(city) {
    // Restablece el estado del clima y carga la información del clima para la nueva ciudad
    setWeather(null);
    loadInfo(city);
  }

  // Renderiza el componente principal
  return (
    <div className={styles.weatherContainer}>
      {/* Renderiza el componente WeatherForm con la función handleOnChangeCity */}
      <WeatherForm onChangeCity={handleOnChangeCity} />
      {/* Renderiza el componente WeatherMainInfo si existen datos del clima, de lo contrario, renderiza el componente Loading */}
      {weather ? <WeatherMainInfo weather={weather} /> : <Loading />}
    </div>
  );
}
