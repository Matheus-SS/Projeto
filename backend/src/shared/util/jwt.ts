import { SECRET_JWT, EXPIRES_IN_JWT } from '@src/constants';
import * as jwt from 'jsonwebtoken';
export const generateToken = (value: string) => {
  return jwt.sign({ id: value }, SECRET_JWT, { expiresIn: EXPIRES_IN_JWT });
};

export const verifyJWT = (token: string): { id: string } => {
  return jwt.verify(token, SECRET_JWT) as { id: string };
};
