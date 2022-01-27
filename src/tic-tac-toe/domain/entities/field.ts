export type Field = {
  getPlayer: () => number | undefined,
  setPlayer: (playerToAssign: number | undefined) => void
}

const makeField = (player: number | undefined = undefined): Field => {
  let playerAssigned: number | undefined;

  if (player) {
    playerAssigned = player;
  }

  const setPlayer = (playerToAssign: number | undefined) => {
    playerAssigned = playerToAssign;
  };

  return Object.freeze({
    getPlayer: () => playerAssigned,
    setPlayer
  });
};

export default makeField;
