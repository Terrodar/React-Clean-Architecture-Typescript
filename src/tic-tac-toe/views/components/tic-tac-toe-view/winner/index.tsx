import React from 'react';

type WinnerProps = {
  winner: number | undefined
}

export const Winner: React.FC<WinnerProps> = ({winner}) => {
  if (winner === -1) {
    return <h1>Empate!</h1>;
  }
  if (winner) {
    return (
      <h1>
        El ganador es el jugador {winner}!
      </h1>
    );
  }
  return null;
};
