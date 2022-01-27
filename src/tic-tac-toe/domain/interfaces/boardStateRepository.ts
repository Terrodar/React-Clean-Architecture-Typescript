import {UpdateBoardPort} from 'tic-tac-toe/domain/use-cases/movement';
import {StartGamePort} from 'tic-tac-toe/domain/use-cases/startGame';

export interface BoardStateRepository extends UpdateBoardPort, StartGamePort {
  finishGame: () => void
  getIsGameStarted: () => boolean;
  getBoard: () => Array<Array<string>> | undefined;
  getActivePlayer: () => number | undefined;
  getWinner: () => number | undefined;
}
