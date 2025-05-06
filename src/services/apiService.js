const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function consultarChatbot(pregunta) {
  try {
    const response = await fetch(`${API_BASE_URL}/consultar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pregunta }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Error en la petición: ${response.status}`
      );
    }

    const data = await response.json();
    return data.respuesta;
  } catch (error) {
    console.error("Error al consultar el chatbot:", error);
    throw error; // Re-lanzar el error para que pueda ser manejado por el componente
  }
}
export { consultarChatbot };
