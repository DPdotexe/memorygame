import React, { useState } from 'react';
import Carta from './Carta'; 
import './Tabellone.css';

const Tabellone = ({ carte, handleCardClick }) => {
  //  riceve due props: carte e handleCardClick
  return (
    <div className="tabellone">
      {carte.map((carta) => (
        <Carta
          key={carta.id}
          id={carta.id}
          colore={carta.colore}
          isFlipped={carta.isFlipped}
          onClick={() => handleCardClick(carta.id)}
        />
      ))}
    </div>
  );
};

export default Tabellone;
