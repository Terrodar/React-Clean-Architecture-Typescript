import React from 'react';
import './styles.css';
import {Winner} from './winner';
import {Board} from './board';
import {StartButton} from './start-button';
import {Loading} from '../../../../user/views/components/loading';
import {LoginButton} from '../../../../user/views/components/login-button';
import {Welcome} from '../../../../user/views/components/welcome';

type TicTacToeViewParams = {
  login: () => void,
  startGame: () => void,
  executeMovement: (number: any, board: any, activePlayer: any) => void
  state: {
    user: {name: string, lastName: string} | undefined,
    isGameStarted: boolean
    winner: number | undefined
    isLoading: boolean
    board: Array<Array<string>> | undefined
    activePlayer: number | undefined
  },
}

const Index: React.FC<TicTacToeViewParams> = ({
  login,
  startGame,
  executeMovement,
  state: {user, isGameStarted, winner, isLoading, board, activePlayer}
}) => {
  return (
    <>
      <h1>
        Tic-Tac-Toe
      </h1>
      <Welcome user={user} />
      <Winner winner={winner} />
      {isLoading && <Loading/>}
      {!user && !isLoading && <LoginButton login={login} />}
      <StartButton isGameStarted={isGameStarted} startGame={startGame} user={user} />
      {board &&
      (
        <Board
          board={board}
          executeMovement={executeMovement}
          activePlayer={activePlayer}
          winner={winner}
        />
      )}
    </>
  );
};

export default Index;
