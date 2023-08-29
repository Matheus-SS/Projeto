import React from 'react';
import { Text } from '../Text';
import {
  ContainerCart,
  ContainerCartTitle,
  ContainerOrder,
  BillOrder,
} from './styles';
import { HiTrash } from 'react-icons/hi';
import { Container, Wrapper } from '../../shared-styles';
import { CartResponse, incrementItemCart, useCart } from '../../hook/useCart';
import { Loader } from '../loader';
import { toastError } from '../../lib/toast';

const imageNotFoundUrl =
  'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png';

export const Cart: React.FC = () => {
  const { cart, setCart, getMyCartQuery } = useCart();
  console.log(cart);
  const onSuccess = () => {
    console.log('foi');
  };

  const onFailure = () => {
    console.log('nao foi');
  };

  const { mutate } = incrementItemCart<CartResponse>();
  const handleIncrementCart = (id: string) => {
    mutate(id, {
      onSuccess: () => {
        setCart((prevState) => {
          return prevState.map((product) => {
            if (product.id === id) {
              return { ...product, quantity: product.quantity + 1 };
            } else return product;
          });
        });
      },
      onError(error) {
        toastError(
          error.response?.data.message || 'Erro ao adicionar item ao carrinho'
        );
      },
    });
  };

  const handleDecrementCart = (id: string) => {
    setCart((prevState) => {
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
    return cart.reduce((accumulator, product) => {
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
              {getMyCartQuery.isLoading ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '50vh',
                    textAlign: 'center',
                  }}
                >
                  <Loader />
                  <Text style={{ marginTop: '15px' }} size={20}>
                    Carregando
                  </Text>
                </div>
              ) : (
                <ul>
                  {cart.length > 0 ? (
                    cart.map((order) => (
                      <li key={order.id}>
                        <div className="card-order">
                          <img
                            src={order.image || imageNotFoundUrl}
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
                    ))
                  ) : (
                    <div>vazio</div>
                  )}
                </ul>
              )}
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
