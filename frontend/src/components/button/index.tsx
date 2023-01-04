import React, { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  containerStyles?: Record<string, any>;
}
export const Button: React.FC<ButtonProps> = ({
  containerStyles = {},
  children,
  ...rest
}) => {
  return (
    <Container style={containerStyles}>
      <button {...rest}>{children}</button>
    </Container>
  );
};
