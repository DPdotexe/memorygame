import React, { useState, useEffect } from 'react';
import Tabellone from '../../components/Tabellone/Tabellone';
import './Gioco.css';

const generaCarte = () => {
  const simboli = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍓', '🍋', '🍑'];
  const carte = [...simboli, ...simboli]
    .map(simbolo => ({
      contenuto: simbolo,
      isFlipped: false,
      isMatched: false
    }))
    .sort(() => Math.random() - 0.5);
  return carte;
};

const Gioco = () => {
  const [carte, setCarte] = useState(generaCarte());
  const [indiciGirate, setIndiciGirate] = useState([]);
  const [tentativi, setTentativi] = useState(0);

  useEffect(() => {
    if (indiciGirate.length === 2) {
      const [primoIndice, secondoIndice] = indiciGirate;
      if (carte[primoIndice].contenuto === carte[secondoIndice].contenuto) {
        setCarte(prevCarte => prevCarte.map((carta, index) => {
          if (index === primoIndice || secondoIndice) {
            return { ...carta, isMatched: true };
          }
          return carta;
        }));
      }
      setTimeout(() => setIndiciGirate([]), 1000);
      setTentativi(prevTentativi => prevTentativi + 1);
    }
  }, [indiciGirate, carte]);

  const handleCardClick = (index) => {
    if (indiciGirate.length < 2 && !carte[index].isFlipped && !carte[index].isMatched) {
      setCarte(prevCarte => prevCarte.map((carta, i) => {
        if (i === index) {
          return { ...carta, isFlipped: true };
        }
        return carta;
      }));
      setIndiciGirate([...indiciGirate, index]);
    }
  };

  const haVinto = carte.every(carta => carta.isMatched);

  return (
    <div className="gioco">
      <h1>Gioco di Memory</h1>
      <Tabellone carte={carte} onCardClick={handleCardClick} />
      <div className="informazioni">
        <p>Tentativi: {tentativi}</p>
        {haVinto && <p>Congratulazioni! Hai vinto!</p>}
      </div>
    </div>
  );
};

export default Gioco;
