import React, { PropsWithChildren } from 'react';
import { AxiosError } from 'axios';
import { UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';
import { addCart, getMyCart } from '../services/cart';
import { IProduct } from './useListProduct';

type CartResponse = {
  id: string;
  product_id: string;
  name: string;
  quantity: number;
  image: string;
  price: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
};

type Cart = {
  id: string;
  name: string;
  quantity: number;
  image: string;
  price: number;
};

type ErrorType = {
  message: string;
};

type AddToCart = Omit<IProduct, 'description' | 'created_at' | 'updated_at'>;

interface ICartContext {
  cart: Cart[];
  setCart: React.Dispatch<React.SetStateAction<Cart[]>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getMyCartQuery: UseQueryResult<CartResponse[], AxiosError<ErrorType, any>>;
  addToCart(product: AddToCart): void;
}

const CartContext = React.createContext<ICartContext>({} as ICartContext);

export function CartProvider({ children }: PropsWithChildren) {
  const [cart, setCart] = React.useState<Cart[]>([]);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const getMyCartQuery = useQuery({
    queryKey: ['getMyCart'],
    queryFn: getMyCart,
    enabled: false,
    onSuccess: (data: CartResponse[]) => {
      const dataCart = data.map((d) => ({
        id: d.product_id,
        name: d.name,
        quantity: d.quantity,
        price: d.price,
        image: d.image,
      }));
      setCart(dataCart);
    },
    onError: (error: AxiosError<ErrorType>) => {
      console.log('error', error);
    },
  });

  function addToCart(product: AddToCart) {
    setCart((prevState) => {
      const itemCart = prevState.find((item) => item.id === product.id);
      if (!itemCart) {
        return [...prevState, { ...product, quantity: 1 }];
      }
      return prevState.map((itemCart) => {
        if (itemCart.id === product.id) {
          return {
            ...itemCart,
            quantity: itemCart.quantity + 1,
          };
        } else {
          return itemCart;
        }
      });
    });
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        isOpen,
        setIsOpen,
        getMyCartQuery: getMyCartQuery,
        addToCart,
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
