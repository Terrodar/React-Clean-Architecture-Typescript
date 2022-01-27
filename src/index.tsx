import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

import useBoardStateRepository from 'tic-tac-toe/adapters/repositories/boardReactStateRepository';
import useUserStateRepository from 'user/adapters/repositories/userReactStateRepository';

import makeMovementUseCase from 'tic-tac-toe/domain/use-cases/movement';
import makeStartGameUseCase from 'tic-tac-toe/domain/use-cases/startGame';
import makeLoginUseCase from 'user/domain/use-cases/login';

import makeStartGameController from 'tic-tac-toe/adapters/controllers/startGameController';
import makeMovementController from 'tic-tac-toe/adapters/controllers/movementController';
import makeLoginController from 'user/adapters/controllers/loginController';

import TicTactToeView from 'tic-tac-toe/views/components/tic-tac-toe-view';
import makeLoginService from 'user/adapters/services/login';

type MainControllers = {
  startGameController: () => void,
  movementController: (number: number, board: Array<Array<string>>, activePlayer: number) => void,
  loginController: () => void
}

const Main: React.FC = () => {
  const stateBoardRepository = useBoardStateRepository();
  const stateUserRepository = useUserStateRepository();
  const [controllers, setControllers] = useState<MainControllers>();

  useEffect(() => {
    const loginService = makeLoginService();

    const startGameUseCase = makeStartGameUseCase(stateBoardRepository);
    const movementUseCase = makeMovementUseCase(stateBoardRepository);
    const loginUseCase = makeLoginUseCase(loginService, stateUserRepository);

    const startGameController = makeStartGameController(startGameUseCase);
    const movementController = makeMovementController(movementUseCase);
    const loginController = makeLoginController(loginUseCase);

    setControllers({
      startGameController,
      movementController,
      loginController
    });
  }, []);

  const currentState = {
    user: stateUserRepository.getUser(),
    isLoading: stateUserRepository.getIsLoading(),
    isGameStarted: stateBoardRepository.getIsGameStarted(),
    winner: stateBoardRepository.getWinner(),
    board: stateBoardRepository.getBoard(),
    activePlayer: stateBoardRepository.getActivePlayer()
  };

  if (controllers) {
    return <TicTactToeView
      login={controllers.loginController}
      startGame={controllers.startGameController}
      executeMovement={controllers.movementController}
      state={currentState}
    />;
  }
  return null;
};

ReactDOM.render(
  <React.StrictMode>
    <Main/>
  </React.StrictMode>,
  document.getElementById('root')
);
