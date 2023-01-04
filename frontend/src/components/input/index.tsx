import React, { InputHTMLAttributes } from 'react';
import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  containerStyle?: Record<string, any>;
}
export const Input: React.FC<InputProps> = ({
  containerStyle = {},
  ...rest
}) => {
  return (
    <Container style={containerStyle}>
      <input {...rest} />
    </Container>
  );
};
