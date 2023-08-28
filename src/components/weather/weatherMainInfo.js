// Importa estilos desde un módulo CSS
import styles from "./weatherMainInfo.module.css";

// Define el componente WeatherMainInfo
export default function WeatherMainInfo({ weather }) {
  // Renderiza la información principal del clima
  return (
    <div className={styles.mainInfo}>
      {/* Muestra el nombre de la ciudad */}
      <div className={styles.city}>{weather?.location?.name}</div>
      {/* Muestra el país */}
      <div className={styles.country}>{weather?.location?.country}</div>
      {/* Crea una fila para mostrar la condición climática */}
      <div className={styles.row}>
        {/* Muestra el ícono de la condición climática */}
        <div>
          <img
            src={`http:${weather?.current?.condition?.icon}`}
            width="128"
            alt={weather?.current.condition.textS} // Posible error tipográfico, debería ser "text"
          />
        </div>
        {/* Muestra información detallada sobre las condiciones climáticas */}
        <div className={styles.weatherConditions}>
          {/* Muestra la descripción de la condición climática */}
          <div className={styles.condition}>
            {weather?.current?.condition.text}
          </div>
          {/* Muestra la temperatura actual */}
          <div className={styles.current}>{weather?.current?.temp_c}º</div>
        </div>
      </div>
      {/* Inserta un mapa de Google en un iframe */}
      <iframe
        title="mapa"
        src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15057.534307180755!2d${weather.location.lon}5!3d${weather.location.lat}5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2smx!4v1651103744472!5m2!1sen!2smx`}
        width="100%"
        height="350"
        style={{ border: 0 }}
        allowFullScreen={true} // Configura la posibilidad de pantalla completa
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
