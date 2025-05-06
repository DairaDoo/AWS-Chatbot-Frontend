import React, { useState } from 'react';
import { consultarChatbot } from '../services/apiService';
import './ChatPage.css';

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      const userMessage = { text: inputValue, sender: 'user' };
      setMessages([...messages, userMessage]);
      setInputValue('');
      setIsLoading(true);
      setError(null);

      try {
        const response = await consultarChatbot(inputValue);
        const chatbotMessage = { text: response, sender: 'chatbot' };
        setMessages([...messages, userMessage, chatbotMessage]);
      } catch (err) {
        setError(err.message || 'Ocurrió un error al obtener la respuesta.');
        const errorMessage = { text: 'Error: ' + (err.message || 'No se pudo obtener la respuesta.'), sender: 'chatbot', isError: true };
        setMessages([...messages, userMessage, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="chat-container">
      <div className="message-area">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.sender === 'user' ? 'user-message' : 'chatbot-message'}
          >
            {msg.text}
          </div>
        ))}
        {isLoading && <div className="loading-indicator">Cargando...</div>}
        {error && <p className="error-message">{error}</p>}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Escribe tu pregunta aquí..."
          className="text-input"
        />
        <button onClick={handleSendMessage} disabled={isLoading} className="send-button">
          Enviar
        </button>
      </div>
    </div>
  );
}

export default ChatPage;