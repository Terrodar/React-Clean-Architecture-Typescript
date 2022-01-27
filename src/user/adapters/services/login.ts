import axios from 'axios';
import {LoginService} from 'user/domain/interfaces/loginService';

const makeLoginService = (): LoginService => {
  const login = async () => {
    const url = 'https://randomuser.me/api/';

    try {
      const resp = await axios.get(url);
      const {first, last} = resp.data.results[0].name as {first: string, last: string};

      return {
        name: first,
        lastName: last
      };
    } catch (error: any) {
      console.log('error making the request to login!');
      console.log(error.message);
      throw new Error('Error making the request to login!');
    }
  };
  return {login}
  ;
};

export default makeLoginService;
