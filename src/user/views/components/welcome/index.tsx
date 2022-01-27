import React from 'react';

interface WelcomeProps {
  user: {
    name: string
    lastName: string
  } | undefined
}

export const Welcome: React.FC<WelcomeProps> = ({user}) => {
  if (user) {
    return <h3>Welcome {user.name} {user.lastName}</h3>;
  }
  return null;
};
