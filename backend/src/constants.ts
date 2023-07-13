export const DATABASE_TYPEORM = 'DATABASE_TYPEORM';

export const SALT_ROUNDS = 10;
export const PASSWORD_HASH_PROVIDER = 'PASSWORD_HASH_PROVIDER';

export const SECRET_JWT = 'secret';
export const EXPIRES_IN_COOKIE = 1000 * 60 * 60 * 24 * 1; // mesmo valor da expiracao do jwt
export const EXPIRES_IN_JWT = '1d';

export const USER_ROUTE = 'user';
export const USER_REPOSITORY_PROVIDER = 'USER_REPOSITORY_PROVIDER';
export const CREATE_USER_USE_CASE_PROVIDER = 'CREATE_USER_USE_CASE_PROVIDER';
export const LOGIN_USER_USE_CASE_PROVIDER = 'LOGIN_USER_USE_CASE_PROVIDER';

export const SESSION_REPOSITORY_PROVIDER = 'SESSION_REPOSITORY_PROVIDER';

export const SESSION_ROUTE = 'session';
export const FIND_SESSION_QUERY_PROVIDER = 'FIND_SESSION_QUERY_PROVIDER';

export const DELETE_SESSION_USE_CASE_PROVIDER =
  'DELETE_SESSION_USE_CASE_PROVIDER';

export const PRODUCT_ROUTE = 'product';
export const PRODUCT_REPOSITORY_PROVIDER = 'PRODUCT_REPOSITORY_PROVIDER';

export const CREATE_PRODUCT_USE_CASE_PROVIDER =
  'CREATE_PRODUCT_USE_CASE_PROVIDER';

export const LIST_PRODUCT_QUERY_PROVIDER = 'LIST_PRODUCT_QUERY_PROVIDER';

export const CART_ROUTE = 'cart';
export const CART_REPOSITORY_PROVIDER = 'CART_REPOSITORY_PROVIDER';
export const ADD_CART_USE_CASE_PROVIDER = 'ADD_CART_USE_CASE_PROVIDER';
export const LIST_MY_CART_QUERY_PROVIDER = 'LIST_MY_CART_QUERY_PROVIDER';

export const LOG_REPOSITORY_PROVIDER = 'LOG_REPOSITORY_PROVIDER';
