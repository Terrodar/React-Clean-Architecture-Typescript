import {LoginUseCase} from 'user/domain/use-cases/login';

const makeLoginController = (loginUseCase: LoginUseCase) => () => {
  loginUseCase.login();
};

export default makeLoginController;
