import React from 'react';
import { Container } from './styles';

type TextProps = {
  color?: string;
  size?: string;
  children?: React.ReactNode;
};

export const Text: React.FC<TextProps> = ({ color, size, children }) => {
  return (
    <Container color={color} size={size}>
      {children}
    </Container>
  );
};
