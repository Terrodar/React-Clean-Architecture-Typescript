import makeField, {Field} from './field';
export type movement = 0 | 1 | 2;
type Board = {
  getFields: () => Array<Array<Field>>,
  move: (row: movement, col: movement) => void,
  checkWinner: () => number | undefined,
  getActivePlayer: () => number
};

const SIZE = 3;

const makeBoard = (inputBoard : Array<Array<number | undefined>> | undefined = undefined) : Board => {
  const initFields = () => {
    const fields = makeFields();

    return fields;
  };

  const makeFields = () => {
    const fields = Array.from(new Array(SIZE), () => Array.from(new Array(SIZE), () => makeField()));
    if (inputBoard) {
      for (let i = 0; i < fields.length; i += 1) {
        for (let j = 0; j < fields[i].length; j += 1) {
          fields[i][j].setPlayer(inputBoard[i][j]);
        }
      }
    }
    return fields;
  };

  const changePlayer = () => {
    if (activePlayer === 1) {
      activePlayer = 2;
    } else {
      activePlayer = 1;
    }
  };

  const validateMovement = (row: number, col: number) => {
    if (checkWinner()) {
      throw new Error('Game is over');
    }
    const field = fields[row][col];
    if (field.getPlayer()) {
      throw new Error('Field taken');
    }
  };

  const checkRows = () => {
    for (let i = 0; i < fields.length; i++) {
      if (fields[i][0].getPlayer() && fields[i].every((field) => field.getPlayer() === fields[i][0].getPlayer())) {
        return fields[i][0].getPlayer();
      }
    }
    return undefined;
  };

  const checkColumns = () => {
    let column : Array<Field>;

    for (let i = 0; i < fields.length; i++) {
      column = fields.map((row) => row[i]);
      if (column[0].getPlayer() && column.every((field) => field.getPlayer() === column[0].getPlayer())) {
        return column[0].getPlayer();
      }
    }

    return undefined;
  };

  const getDiagonals = () => {
    const firstDiagonal = [];
    const secondDiagonal = [];

    for (let i = 0; i < fields.length; i++) {
      firstDiagonal.push(fields[i][i]);
      secondDiagonal.push(fields[i][fields.length - (i + 1)]);
    }

    return [firstDiagonal, secondDiagonal];
  };

  const checkDiagonals = () => {
    const [firstDiagonal, secondDiagonal] = getDiagonals();

    if (firstDiagonal[0].getPlayer() && firstDiagonal.every(
      (field) => field.getPlayer() === firstDiagonal[0].getPlayer())) {
      return firstDiagonal[0].getPlayer();
    }
    if (secondDiagonal[0].getPlayer() && secondDiagonal.every(
      (field) => field.getPlayer() === secondDiagonal[0].getPlayer())) {
      return secondDiagonal[0].getPlayer();
    }

    return undefined;
  };

  const areAllFieldsTaken = () => {
    let isAllFieldsTaken = true;

    for (let i = 0; i < fields.length; i++) {
      for (let j = 0; j < fields.length; j++) {
        if (!fields[i][j].getPlayer()) {
          isAllFieldsTaken = false;
          break;
        }
      }
    }

    return isAllFieldsTaken;
  };

  const initActivePlayer = () => {
    let count = 0;

    const isEven = (number: number) => {
      return number % 2 === 0;
    };

    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        if (inputBoard && inputBoard[i][j] !== undefined) {
          count++;
        }
      }
    }

    return isEven(count) ? 1 : 2;
  };

  const fields : Array<Array<Field>> = initFields();
  let activePlayer : number = initActivePlayer();

  const getFields = () => {
    return fields;
  };

  const getActivePlayer = () => {
    return activePlayer;
  };

  const move = (row: movement, col: movement) => {
    validateMovement(row, col);
    fields[row][col].setPlayer(activePlayer);
    changePlayer();
  };

  const checkWinner = () => {
    let winner;
    const DRAW = -1;

    winner = checkRows();
    if (winner) return winner;
    winner = checkColumns();
    if (winner) return winner;
    winner = checkDiagonals();
    if (winner) return winner;
    if (areAllFieldsTaken()) {
      return DRAW;
    }

    return undefined;
  };

  return Object.freeze({
    getFields,
    move,
    checkWinner,
    getActivePlayer
  });
};

export default makeBoard;
