import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import ChatPage from './pages/ChatPage';

function App() {

  return (
    <>
      <div className="App">
        <Navbar />
        <header className="App-header">
        </header>
        <ChatPage />
      </div>
    </>
  );
}

export default App
