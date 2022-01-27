import React from 'react';

interface StartButtonProps {
  isGameStarted: boolean
  startGame: () => void
  user: any
}

export const StartButton: React.FC<StartButtonProps> = ({isGameStarted, startGame, user}) => {
  if (isGameStarted) {
    return (
      <button onClick={startGame}>
        Restart Game!
      </button>
    );
  }
  if (user) {
    return (
      <button onClick={startGame}>
        Start Game!
      </button>
    );
  }
  return null;
};
