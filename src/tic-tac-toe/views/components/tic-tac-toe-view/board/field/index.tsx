import React from 'react';
import './styles.css';

interface FieldProps {
  player: any
  number: number
  handleOnClick: (number: number) => void
}

export const Field: React.FC<FieldProps> = ({player, number, handleOnClick}) => {
  return <button id={number.toString()} onClick={() => handleOnClick(number)} className="square">{ player }</button>;
};
