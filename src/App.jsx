import React from 'react';
import Gioco from './components/Gioco/Gioco'; 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Memory Game</h1>
      </header>
      <main>
        <Gioco />
      </main>
    </div>
  );
}

export default App;
