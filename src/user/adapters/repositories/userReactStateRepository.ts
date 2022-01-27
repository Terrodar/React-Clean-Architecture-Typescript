import {useState} from 'react';
import {UserStateRepository} from '../../domain/interfaces/userStateRepository';

const userReactStateRepository = (): UserStateRepository => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<{name: string, lastName: string}>();

  const stablishUser = (name: string, lastName: string) => {
    setUser({name, lastName});
  };

  const stablishIsLoading = (value: boolean) => {
    setIsLoading(value);
  };

  const getUser = () => {
    return user;
  };

  const getIsLoading = () => {
    return isLoading;
  };

  return {
    stablishUser,
    stablishIsLoading,
    getUser,
    getIsLoading
  };
};

export default userReactStateRepository;
