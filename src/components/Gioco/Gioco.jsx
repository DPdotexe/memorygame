import React, { useState, useEffect } from 'react';
import { AiOutlineReload } from 'react-icons/ai'; // refresh react icon
import './Gioco.css';

// array immagini carte
const immagini = [
  'images/banana.png', 
  'images/grape.png', 
  'images/watermelon.png', 
  'images/strawberry.png', 
  'images/lemon.png', 
  'images/apple.png'
];

// funzione array immagini
const shuffleImages = () => {
  let shuffledImages = [...immagini, ...immagini];
  shuffledImages.sort(() => Math.random() - 0.5);
  return shuffledImages;
};

const Gioco = () => {
  const [carte, setCarte] = useState([]);
  const [indiciGirate, setIndiciGirate] = useState([]);
  const [tentativi, setTentativi] = useState(0);
  const [messaggio, setMessaggio] = useState('');

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledImages = shuffleImages();
    const initialCards = shuffledImages.map((immagine, index) => ({
      id: index,
      immagine: immagine,
      isFlipped: false,
      isMatched: false
    }));
    setCarte(initialCards);
    setIndiciGirate([]);
    setTentativi(0);
    setMessaggio('');
  };

  const handleCardClick = (id) => {
    if (indiciGirate.length < 2) {
      const cartaCliccataIndex = carte.findIndex(carta => carta.id === id);

      if (!carte[cartaCliccataIndex].isFlipped && !carte[cartaCliccataIndex].isMatched) {
        const newCarte = [...carte];
        newCarte[cartaCliccataIndex].isFlipped = true;
        setCarte(newCarte);
        setIndiciGirate([...indiciGirate, cartaCliccataIndex]);
      }
    }
  };

  useEffect(() => {
    if (indiciGirate.length === 2) {
      const [primoIndice, secondoIndice] = indiciGirate;

      if (carte[primoIndice].immagine === carte[secondoIndice].immagine) {
        setTimeout(() => {
          const newCarte = [...carte];
          newCarte[primoIndice].isMatched = true;
          newCarte[secondoIndice].isMatched = true;
          setCarte(newCarte);
          setIndiciGirate([]);
        }, 500);
      } else {
        setTentativi(prevTentativi => prevTentativi + 1);
        setMessaggio('Errore! Riprova.');
        setTimeout(() => {
          setMessaggio('');
          const newCarte = [...carte];
          newCarte[primoIndice].isFlipped = false;
          newCarte[secondoIndice].isFlipped = false;
          setCarte(newCarte);
          setIndiciGirate([]);
        }, 1000);
      }
    }
  }, [indiciGirate, carte]);

  const haVinto = carte.every(carta => carta.isMatched);

  const handleRefresh = () => {
    initializeGame(); // reinizializza il gioco 
  };

  return (
    <div className="gioco">
      <h1>Memory Game</h1>
      <div className="tabellone">
        {carte.map(carta => (
          <div
            key={carta.id}
            className={`carta ${carta.isFlipped || carta.isMatched ? 'flipped' : ''} ${messaggio && indiciGirate.includes(carta.id) ? 'error' : ''} ${carta.isMatched ? 'matched' : ''}`}
            onClick={() => handleCardClick(carta.id)}
          >
            <div className="inner">
              <div className={`front ${carta.isFlipped || carta.isMatched ? 'hidden' : ''}`}></div>
              <div className={`back ${!carta.isFlipped || carta.isMatched ? 'hidden' : ''}`}>
                <img src={carta.immagine} alt="Card" className="card-image" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="informazioni">
        <p>Tentativi: {tentativi}</p>
        {messaggio && <p>{messaggio}</p>}
        {haVinto && <p>Congratulazioni! Hai vinto!</p>}
        <button className="refresh-button" onClick={handleRefresh}>
          <AiOutlineReload className="icona-refresh" />
          Refresh
        </button>
      </div>
    </div>
  );
};

export default Gioco;
