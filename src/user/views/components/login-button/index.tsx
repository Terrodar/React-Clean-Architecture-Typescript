import React from 'react';

interface LoginButtonProps {
  login: () => void
}

export const LoginButton: React.FC<LoginButtonProps> = ({login}) => {
  return <button onClick={login}>Login</button>;
};
