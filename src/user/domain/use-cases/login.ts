export interface LoginUseCase {
  login: () => void
}

export interface LoginServicePort {
  login: () => (Promise<{name: string, lastName: string} | null>)
}

export interface UserStatePort {
  stablishUser: (name: string, lastName: string) => void
  stablishIsLoading: (value: boolean) => void
}

export const makeLogin = (loginAdapter: LoginServicePort, userStateRepository: UserStatePort): LoginUseCase => {
  return {
    login: async () => {
      userStateRepository.stablishIsLoading(true);

      await new Promise((r) => setTimeout(r, 2000));

      let loggedUser;
      try {
        loggedUser = await loginAdapter.login();
      } catch (error) {
        userStateRepository.stablishUser('Juanito', 'Perez');
        userStateRepository.stablishIsLoading(false);
      }

      if (loggedUser) {
        userStateRepository.stablishUser(loggedUser.name, loggedUser.lastName);
        userStateRepository.stablishIsLoading(false);
      }
    }
  };
};

export default makeLogin;
