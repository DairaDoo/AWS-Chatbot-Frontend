import React from 'react';
import './Navbar.css'; // Importamos el archivo de estilos

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        {/* Aquí irá el logo */}
        <span className="logo-placeholder"><img src='./src/assets/aws-service-chatbot-logo.png'></img></span>
        <span className="app-name">AWS-Services-Chatbot</span>
      </div>
      {/* Aquí irán otros elementos de navegación si los agregamos después */}
    </nav>
  );
}

export default Navbar;