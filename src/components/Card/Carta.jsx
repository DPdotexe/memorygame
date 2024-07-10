import React from 'react';
import './Carta.css';

const Carta = ({ carta, onClick, isFlipped, isMatched }) => {
  return (
    <div className={`carta ${isFlipped || isMatched ? 'girata' : ''}`} onClick={onClick}>
      <div className="fronte-carta">
        {carta.contenuto}
      </div>
      <div className="retro-carta">
        ?
      </div>
    </div>
  );
};

export default Carta;
