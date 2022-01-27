import type {Field} from 'tic-tac-toe/domain/entities/field';
import makeBoard from 'tic-tac-toe/domain/entities/board';

export interface StartGameUseCase {
  startGame: () => void
}

export interface StartGamePort {
  startGame: (fields: Array<Array<Field>>) => void
}

const makeStartGame = (boardStateRepository: StartGamePort): StartGameUseCase => {
  return {
    startGame: () => {
      const board = makeBoard(undefined);
      boardStateRepository.startGame(board.getFields());
    }
  };
};

export default makeStartGame;
