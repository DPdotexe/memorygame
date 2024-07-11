import React from 'react';
import './Carta.css';

const Carta = ({ colore, onClick, isFlipped }) => {
  // clickk carta non girata
  const handleClick = () => {
    if (!isFlipped) {
      onClick();
    }
  };

  return (
    <div
      className={`carta ${isFlipped ? 'flipped' : ''}`}
      style={{ backgroundColor: isFlipped ? colore : 'gray' }}
      onClick={handleClick}
    ></div>
  );
};

export default Carta;
