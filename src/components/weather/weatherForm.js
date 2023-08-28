// Importa el módulo de estado de React
import { useState } from "react";

// Importa estilos desde un módulo CSS
import styles from "./weatherForm.module.css";

// Define el componente WeatherForm
export default function WeatherForm({ onChangeCity }) {
  // Estado para almacenar el valor de la ciudad y el mensaje de error
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  // Función para manejar el cambio en el campo de entrada
  function handleChange(e) {
    setCity(e.target.value);
    setError(""); // Limpia el mensaje de error al cambiar el valor
  }

  // Función para manejar el envío del formulario
  async function handleSubmit(e) {
    e.preventDefault();
    if (city.trim() === "") {
      setError("Por favor ingresa el nombre de una ciudad"); // Establece el mensaje de error si la cadena está vacía
    } else {
      const cityExists = await checkCityExists(city); // Llama a la función para verificar si la ciudad existe
      if (cityExists) {
        onChangeCity(city); // Llama a la función para cambiar la ciudad en el componente principal
        setError(""); // Limpia el mensaje de error
      } else {
        setError("Ciudad no encontrada"); // Establece el mensaje de error si la ciudad no existe
      }
    }
  }

  // Función asincrónica para verificar si la ciudad existe
  async function checkCityExists(city) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}&key=${process.env.REACT_APP_KEY}&q=${city}`
      );
      const data = await response.json();
      return data.location !== undefined; // Verifica si existe la ubicación en la respuesta
    } catch (error) {
      console.error(error);
      return false; // En caso de error, asumimos que la ciudad no existe
    }
  }

  // Renderiza el componente WeatherForm
  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      {/* Campo de entrada para la ciudad */}
      <input
        className={styles.input}
        type="text"
        value={city}
        onChange={handleChange}
        autoFocus={true} // Establece el foco automáticamente en el campo
      />
      {/* Muestra el mensaje de error si existe */}
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}
