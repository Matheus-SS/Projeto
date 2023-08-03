type ReturnTypeError<E> = { success: false; error: E };
type ReturnTypeSuccess<T> = { success: true; data: T };
export type ReturnType<E, T> = ReturnTypeError<E> | ReturnTypeSuccess<T>;
