import React from 'react';
import { ZodIssue } from 'zod';
import { Text } from '../text/index';

type TextErrorProps = {
  formField: string;
  errors: ZodIssue[];
};
export const FormError: React.FC<TextErrorProps> = ({ formField, errors }) => {
  const error = errors.find((error) => error.path[0] === formField);
  console.log(error);
  return error ? (
    <strong>Nome de usuário pelo menos 4 caracteres</strong>
  ) : null;
};
