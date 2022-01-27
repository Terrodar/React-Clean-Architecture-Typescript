import {useState} from 'react';
import {Field} from 'tic-tac-toe/domain/entities/field';
import {BoardStateRepository} from 'tic-tac-toe/domain/interfaces/boardStateRepository';

type StateBoard = Array<Array<string>>;

const useBoardReactStateRepository = (): BoardStateRepository => {
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [board, setBoard] = useState<StateBoard>();
  const [activePlayer, setActivePlayer] = useState<number | undefined>();
  const [winningPlayer, setWinningPlayer] = useState<number | undefined>();

  const startGame = (fields: Array<Array<Field>>) => {
    setIsStarted(true);
    setBoard(mapDomainBoardToState(fields));
    setActivePlayer(1);
    setWinningPlayer(undefined);
  };

  const updateBoard = (
    fields: Array<Array<Field>>,
    activePlayer: number | undefined, winner: number | undefined
  ): void => {
    setBoard(mapDomainBoardToState(fields));
    setActivePlayer(activePlayer);
    if (winner) {
      setWinningPlayer(winner);
    }
  };

  const finishGame = () => {
    setIsStarted(false);
  };

  const getIsGameStarted = () => isStarted;

  const getBoard = () => board;

  const getActivePlayer = () => activePlayer;

  const getWinner = () => winningPlayer;

  return {
    getIsGameStarted,
    startGame,
    finishGame,
    getBoard,
    updateBoard,
    getActivePlayer,
    getWinner
  };
};

export default useBoardReactStateRepository;

const mapDomainBoardToState = (fields: Array<Array<Field>>) : StateBoard => {
  const PLAYER_1 = 'X';
  const PLAYER_2 = 'O';

  const stateBoard = fields.map((row) => {
    const stateRow = row.map((field) => {
      if (field.getPlayer() === 1) {
        return PLAYER_1;
      } else if (field.getPlayer() === 2) {
        return PLAYER_2;
      } else {
        return '';
      }
    });
    return stateRow;
  });

  return stateBoard;
};
