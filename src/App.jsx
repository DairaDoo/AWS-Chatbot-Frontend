import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'

function App() {

  return (
    <>
      <div className="App">
        <Navbar />
        <header className="App-header">
          <p>Bienvenido a AWS Services Chatbot</p>
        </header>
      </div>
    </>
  );
}

export default App
