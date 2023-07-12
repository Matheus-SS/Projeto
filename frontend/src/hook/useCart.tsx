import React, { PropsWithChildren } from 'react';
import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { addCart } from '../services/cart';
type CartType = {
  id: number;
  name: string;
  quantity: number;
  image: string;
  price: number;
};

type ErrorType = {
  message: string;
};

interface ICartContext {
  cart: CartType[];
  setCart: React.Dispatch<React.SetStateAction<CartType[]>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartContext = React.createContext<ICartContext>({} as ICartContext);

export function CartProvider({ children }: PropsWithChildren) {
  const [cart, setCart] = React.useState<CartType[]>([{} as CartType]);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = React.useContext(CartContext);

  if (!context) {
    throw new Error('useCart deve ser usado dentro do CartProvider');
  }
  return context;
}

export function useAddCart<Request, Response>() {
  return useMutation<Response, AxiosError<ErrorType>, Request>({
    mutationKey: ['addCart'],
    mutationFn: (data: Request) => {
      return addCart<Request, Response>(data);
    },
  });
}
