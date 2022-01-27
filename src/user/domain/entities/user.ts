export type User = {
  getName: () => string
  getLastName: () => string
};

export const newUser = (name: string, lastName: string): User => {
  return {
    getName: () => name,
    getLastName: () => lastName
  };
};
