import React from 'react';
import {Field} from './field';
import './styles.css';

interface BoardProps {
  board: ViewBoard
  executeMovement: (number: any, board: any, activePlayer: any) => void
  activePlayer: number | undefined
  winner: number | undefined
}

type ViewBoard = Array<Array<string | undefined>>

export const Board: React.FC<BoardProps> = ({board, executeMovement, activePlayer, winner}) => {
  const handleOnClick = (number: number) => {
    if (!winner) {
      executeMovement(number, board, activePlayer);
    }
  };

  let counter = 0;

  const rows = board.map((row: Array<string | undefined>) => {
    const rowButtons = row.map((field: string | undefined) => {
      counter += 1;
      return <Field handleOnClick={handleOnClick} player={field} number={counter} key={counter} />;
    });
    return (
      <div className="board-row" key={counter}>
        { rowButtons }
      </div>
    );
  });

  return <div className="board">{rows}</div>;
};
