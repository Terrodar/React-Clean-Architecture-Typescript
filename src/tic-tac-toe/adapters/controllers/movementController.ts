import {MovementUseCase} from 'tic-tac-toe/domain/use-cases/movement';

const makeMovementController = (movementUseCase : MovementUseCase) => (
  fieldNumber: number, board: Array<Array<string>>
) => {
  movementUseCase.executeMovement(fieldNumber, buildBoard(board));
};

const buildBoard = (board: any) => {
  const useCaseBoard = [];
  for (let i = 0; i < board.length; i += 1) {
    const row = [];
    for (let j = 0; j < board.length; j += 1) {
      if (board[i][j] === 'X') {
        row.push(1);
      } else if (board[i][j] === 'O') {
        row.push(2);
      } else {
        row.push(undefined);
      }
    }
    useCaseBoard.push(row);
  }
  return useCaseBoard;
};

export default makeMovementController;
