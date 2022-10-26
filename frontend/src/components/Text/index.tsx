import React from 'react';
import { Container } from './styles';

type TextProps = {
  color?: string;
  size?: number;
  weight?: 'bold' | 'regular';
  children?: React.ReactNode;
};

export const Text: React.FC<TextProps> = ({
  color,
  size,
  weight = 'regular',
  children,
}) => {
  return (
    <Container color={color} size={size} weight={weight}>
      {children}
    </Container>
  );
};
