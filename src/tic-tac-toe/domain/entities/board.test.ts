import makeBoard, {movement} from './board';

describe('board', () => {
  it('should build a 3x3 board correctly', () => {
    const board = makeBoard();

    expect(board.getFields()).toStrictEqual(board3x3);
    expect(board.getFields()[0].every((field) => field.getPlayer() === undefined)).toBe(true);
    expect(board.getFields()[1].every((field) => field.getPlayer() === undefined)).toBe(true);
    expect(board.getFields()[2].every((field) => field.getPlayer() === undefined)).toBe(true);
  });
  it('should build a 3x3 board from an input correctly', () => {
    const inputBoard = [[1, 1, 2], [undefined, 1, 2], [undefined, undefined, undefined]];
    const board = makeBoard(inputBoard);

    expect(board.getFields()).toStrictEqual(board3x3);
    expect(board.getFields()[0][0].getPlayer()).toBe(1);
    expect(board.getFields()[1][1].getPlayer()).toBe(1);
    expect(board.getFields()[2][2].getPlayer()).toBe(undefined);
  });
  it('should return 1 when field 1 is taken by player 1', () => {
    const board = makeBoard();

    board.move(0, 0);

    expect(board.getFields()[0][0].getPlayer()).toBe(1);
  });
  it('should return 2 when field 5 is taken by player 2', () => {
    const board = makeBoard();

    board.move(0, 0);
    board.move(1, 1);

    expect(board.getFields()[1][1].getPlayer()).toBe(2);
  });
  it('should return 1 when field 4 is taken by player 1 on 3th movement', () => {
    const BOARD_WITH_ONE_MOVEMENT = [
      [1, undefined, 2],
      [undefined, undefined, undefined],
      [undefined, undefined, undefined]
    ];
    const board = makeBoard(BOARD_WITH_ONE_MOVEMENT);

    board.move(1, 0);

    expect(board.getFields()[1][0].getPlayer()).toBe(1);
  });
  it('should throw an exception when the given field is already taken', () => {
    const FIELD = {row: 0 as movement, col: 0 as movement};
    const board = makeBoard();

    board.move(FIELD.row, FIELD.row);

    expect(() => board.move(FIELD.row, FIELD.row)).toThrowError('Field taken');
  });
  it('should return player 1 as winner when the 2nd row is taken by him or her', () => {
    const BOARD_PLAYER_1_SECOND_ROW_WINNER = [
      [undefined, undefined, undefined],
      [1, 1, 1],
      [undefined, undefined, undefined]
    ];
    const board = makeBoard(BOARD_PLAYER_1_SECOND_ROW_WINNER);

    expect(board.checkWinner()).toBe(1);
  });
  it('should return player 2 as winner when the 3er column is taken by him or her', () => {
    const BOARD_PLAYER_2_THIRD_COLUMN_WINNER = [
      [undefined, undefined, 2],
      [undefined, undefined, 2],
      [undefined, undefined, 2]
    ];
    const board = makeBoard(BOARD_PLAYER_2_THIRD_COLUMN_WINNER);

    expect(board.checkWinner()).toBe(2);
  });
  it('should return player 1 as winner when the main diagonal is taken by him or her', () => {
    const BOARD_PLAYER_1_MAIN_DIAGONAL_WINNER = [
      [1, undefined, undefined],
      [undefined, 1, undefined],
      [undefined, undefined, 1]
    ];
    const board = makeBoard(BOARD_PLAYER_1_MAIN_DIAGONAL_WINNER);

    expect(board.checkWinner()).toBe(1);
  });
  it('should return draw when all the fields are taken and there is no winner', () => {
    const DRAW_BOARD = [
      [1, 2, 1],
      [1, 2, 2],
      [2, 1, 1]
    ];
    const board = makeBoard(DRAW_BOARD);

    expect(board.checkWinner()).toBe(-1);
  });
  it('should throw an error when try to move and the game is over', () => {
    const BOARD_PLAYER_1_MAIN_DIAGONAL_WINNER = [
      [1, undefined, undefined],
      [undefined, 1, undefined],
      [undefined, undefined, 1]
    ];
    const board = makeBoard(BOARD_PLAYER_1_MAIN_DIAGONAL_WINNER);

    expect(() => board.move(1, 0)).toThrowError('Game is over');
  });
  it('should return player 1 as active player', () => {
    const board = makeBoard();

    expect(board.getActivePlayer()).toBe(1);
  });
  it('should return player 2 as active player', () => {
    const BOARD_WITH_PLAYER_2_ACTIVE = [
      [1, undefined, undefined],
      [undefined, 2, undefined],
      [undefined, undefined, 1]
    ];
    const board = makeBoard(BOARD_WITH_PLAYER_2_ACTIVE);

    expect(board.getActivePlayer()).toBe(2);
  });
});

const board3x3 = [
  [
    {getPlayer: expect.any(Function), setPlayer: expect.any(Function)},
    {getPlayer: expect.any(Function), setPlayer: expect.any(Function)},
    {getPlayer: expect.any(Function), setPlayer: expect.any(Function)}
  ],
  [
    {getPlayer: expect.any(Function), setPlayer: expect.any(Function)},
    {getPlayer: expect.any(Function), setPlayer: expect.any(Function)},
    {getPlayer: expect.any(Function), setPlayer: expect.any(Function)}
  ],
  [
    {getPlayer: expect.any(Function), setPlayer: expect.any(Function)},
    {getPlayer: expect.any(Function), setPlayer: expect.any(Function)},
    {getPlayer: expect.any(Function), setPlayer: expect.any(Function)}]
];
