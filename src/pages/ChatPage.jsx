import React, { useState, useEffect, useRef } from 'react';
import { consultarChatbot } from '../services/apiService';
import { FaUser, FaRobot, FaSpinner } from 'react-icons/fa';
import './ChatPage.css';

function ChatPage() {
  const [messages, setMessages] = useState([
    {
      text: '¡Hola! Soy un chatbot sobre servicios de AWS. ¡Haz tus preguntas!',
      sender: 'chatbot',
      isWelcome: true, // Marca este mensaje como de bienvenida para estilos específicos si quieres
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messageAreaRef = useRef(null);

  useEffect(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [messages]);

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
        const thinkingMessage = { text: 'Pensando...', sender: 'chatbot', isThinking: true };
        setMessages((prevMessages) => [...prevMessages, thinkingMessage]);
        const response = await consultarChatbot(inputValue);
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          const thinkingMessageIndex = updatedMessages.findIndex(msg => msg.isThinking);
          if (thinkingMessageIndex !== -1) {
            updatedMessages[thinkingMessageIndex] = { text: response, sender: 'chatbot' };
          } else {
            updatedMessages.push({ text: response, sender: 'chatbot' });
          }
          return updatedMessages;
        });
      } catch (err) {
        setError(err.message || 'Ocurrió un error al obtener la respuesta.');
        const errorMessage = { text: 'Error: ' + (err.message || 'No se pudo obtener la respuesta.'), sender: 'chatbot', isError: true };
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          const thinkingMessageIndex = updatedMessages.findIndex(msg => msg.isThinking);
          if (thinkingMessageIndex !== -1) {
            updatedMessages[thinkingMessageIndex] = errorMessage;
          } else {
            updatedMessages.push(errorMessage);
          }
          return updatedMessages;
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="chat-container">
      <div className="message-area" ref={messageAreaRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.sender === 'user' ? 'user-message' : 'chatbot-message'}
          >
            <span className="message-icon-container">
              {msg.sender === 'user' ? <FaUser className="message-icon" /> : <FaRobot className="message-icon chatbot-icon-left" />}
            </span>
            {msg.text}
            {msg.isThinking && <FaSpinner className="thinking-icon" />}
          </div>
        ))}
        {isLoading && !messages.some(msg => msg.isThinking) && (
          <div className="loading-indicator">
            <FaSpinner className="loading-spinner" /> Pensando...
          </div>
        )}
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