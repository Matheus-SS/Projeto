type ReturnTypeError<E> = { success: false; error: E };
type ReturnTypeSuccess<T> = { success: true; data: T };
export type ReturnType<E, T> = ReturnTypeError<E> | ReturnTypeSuccess<T>;

type ValidationTypeError<U> = { success: false; error: U };
type ValidationTypeSuccess<T> = { success: true; data: T };
export type ValidationReturnType<U, T> =
  | ValidationTypeError<U>
  | ValidationTypeSuccess<T>;
