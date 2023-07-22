import React from 'react';
import { Container } from './styles';

type Props = {
  width?: number;
  height?: number;
} & React.HTMLAttributes<HTMLDivElement>;

export const Loader: React.FC<Props> = ({ height = 50, width = 50 }) => {
  return <Container width={width} height={height} />;
};
