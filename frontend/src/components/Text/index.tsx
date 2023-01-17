import React from 'react';
import { Container } from './styles';

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  color?: string;
  size?: number;
  weight?: 'bold' | 'regular';
  children?: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
  color,
  size,
  weight = 'regular',
  children,
  ...rest
}) => {
  return (
    <Container color={color} size={size} weight={weight} {...rest}>
      {children}
    </Container>
  );
};
