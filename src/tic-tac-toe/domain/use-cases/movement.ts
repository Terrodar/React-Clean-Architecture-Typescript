import makeBoard, {movement} from 'tic-tac-toe/domain/entities/board';
import type {Field} from 'tic-tac-toe/domain/entities/field';

export interface MovementUseCase {
 executeMovement: (number: number, board: Array<Array<number | undefined>>) => void
}

export interface UpdateBoardPort {
  updateBoard: (fields: Array<Array<Field>>, activePlayer: number | undefined, winner: number | undefined) => void
}

const makeMovement = (boardStateRepository: UpdateBoardPort): MovementUseCase => {
  const executeMovement = (number: number, board: Array<Array<number | undefined>>) => {
    const newBoard = makeBoard(board);
    try {
      const {row, col} = numberToMatrix(number, board);
      newBoard.move(row as movement, col as movement);
      const winner = newBoard.checkWinner();
      boardStateRepository.updateBoard(newBoard.getFields(), newBoard.getActivePlayer(), winner);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return {
    executeMovement
  };
};

export default makeMovement;

const numberToMatrix = (number: number, board: Array<Array<number | undefined>>) => {
  let count = 0;
  let i;
  let j;
  for (i = 0; i < board.length; i++) {
    for (j = 0; j < board.length; j++) {
      count++;
      if (count === number) {
        break;
      };
    }
    if (count === number) {
      break;
    };
  }

  return {
    row: i,
    col: j
  };
};
