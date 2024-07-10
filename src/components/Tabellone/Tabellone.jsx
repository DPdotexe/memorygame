import React from 'react';
import Carta from '../Card/Carta';
import './Tabellone.css';

const Tabellone = ({ carte, onCardClick }) => {
  return (
    <div className="tabellone">
      {carte.map((carta, index) => (
        <Carta 
          key={index} 
          carta={carta} 
          onClick={() => onCardClick(index)}
          isFlipped={carta.isFlipped}
          isMatched={carta.isMatched}
        />
      ))}
    </div>
  );
};

export default Tabellone;
