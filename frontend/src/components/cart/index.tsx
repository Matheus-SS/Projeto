import React from 'react';
import { Text } from '../text';
import {
  ContainerCart,
  ContainerCartTitle,
  ContainerOrder,
  BillOrder,
} from './styles';
import { HiTrash } from 'react-icons/hi';
import { Container, Wrapper } from '../../shared-styles';
type CartType = {
  id: number;
  name: string;
  quantity: number;
  description: string;
  imageUrl: string;
  categoryId: number;
  price: number;
};

export const Cart: React.FC = () => {
  const [cartGlobal, setCartGlobal] = React.useState<CartType[]>([]);
  const handleIncrementCart = (id: number) => {
    setCartGlobal((prevState) => {
      return prevState.map((product) => {
        if (product.id === id) {
          return { ...product, quantity: product.quantity + 1 };
        } else return product;
      });
    });
  };

  const handleDecrementCart = (id: number) => {
    setCartGlobal((prevState) => {
      return prevState
        .map((product) => {
          if (product.id === id) {
            return { ...product, quantity: product.quantity - 1 };
          } else return product;
        })
        .filter((product) => {
          return product.quantity !== 0;
        });
    });
  };

  const CalculateTotalCart = () => {
    return cartGlobal.reduce((accumulator, product) => {
      accumulator += product.price * product.quantity;
      return accumulator;
    }, 0);
  };
  return (
    <Container>
      <section>
        <ContainerCart>
          <Wrapper>
            <ContainerCartTitle>
              <Text>Carrinho</Text>
            </ContainerCartTitle>

            <ContainerOrder>
              <ul>
                {cartGlobal.map((order) => (
                  <li key={order.id}>
                    <div className="card-order">
                      <img
                        src={order.imageUrl}
                        alt={order.name}
                        className="card-order-image"
                      />
                      <div className="card-order-body">
                        <p>{order.name}</p>
                        <p>{order.price}</p>
                        <div className="card-order-body-quantity">
                          <span>
                            <button
                              className="card-order-body-quantity-btn-minus"
                              onClick={() => handleDecrementCart(order.id)}
                            >
                              -
                            </button>
                            {order.quantity}
                            <button
                              className="card-order-body-quantity-btn-plus"
                              onClick={() => handleIncrementCart(order.id)}
                            >
                              +
                            </button>
                          </span>
                        </div>
                      </div>
                      <div className="card-order-option">
                        <button>
                          <HiTrash size={20} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </ContainerOrder>
            <BillOrder>
              <span>
                <p>Total</p>
                <p>R${CalculateTotalCart()}</p>
              </span>
              <button>IR PARA PAGAMENTO</button>
            </BillOrder>
          </Wrapper>
        </ContainerCart>
      </section>
    </Container>
  );
};
