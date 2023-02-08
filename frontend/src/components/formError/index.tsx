import React from 'react';
import { ZodIssue } from 'zod';

type TextErrorProps = {
  formField: string;
  errors: ZodIssue[];
  containerStyles?: Record<string, any>;
};
export const FormError: React.FC<TextErrorProps> = ({
  formField,
  errors,
  containerStyles = {},
}) => {
  const error = errors.find((error) => error.path[0] === formField);
  return error ? (
    <span style={containerStyles}>
      <strong style={{ color: 'red' }}>{error?.message}</strong>
    </span>
  ) : null;
};
