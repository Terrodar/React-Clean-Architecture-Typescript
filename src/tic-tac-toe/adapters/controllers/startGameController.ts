import {StartGameUseCase} from 'tic-tac-toe/domain/use-cases/startGame';

const makeStartGameController = (startGameUseCase: StartGameUseCase) => () => {
  startGameUseCase.startGame();
};

export default makeStartGameController;
