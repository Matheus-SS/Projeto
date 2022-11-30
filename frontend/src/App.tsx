import React, { FormEvent } from 'react';
import {
  Container,
  Grid,
  IconList,
  IconListContainer,
  IconListItem,
  ProfileContainer,
  FormSearchBar,
  ContainerSearchBar,
  InputSearchBar,
  Wrapper,
  ContainerProduct,
  ContainerCart,
  ContainerCartTitle,
  ContainerOrder,
  BillOrder,
} from './styles';
import { color } from './constants';
import { Text } from './components/Text';
import {
  INITIAL_STATE,
  navBarReducer,
  NavItemsType,
  NavBarActionType,
} from './reducer/navbarReducer';

import { HiTrash } from 'react-icons/hi';
import axios from 'axios';
const arrayOfPizzas = [
  {
    id: 1,
    name: 'Pizza Doce',
    quantity: 20,
    description: 'Pizza feita com morango',
    imageUrl:
      'https://www.dicasdemulher.com.br/wp-content/uploads/2018/09/pizza-doce-0.jpg',
    categoryId: 1,
    price: 10.5,
  },
  {
    id: 2,
    name: 'Pizza Doce',
    quantity: 20,
    description: 'Pizza feita com morango',
    imageUrl:
      'https://www.dicasdemulher.com.br/wp-content/uploads/2018/09/pizza-doce-0.jpg',
    categoryId: 1,
    price: 20.5,
  },
  {
    id: 3,
    name: 'Pizza Doce',
    quantity: 20,
    description: 'Pizza feita com morango',
    imageUrl:
      'https://www.dicasdemulher.com.br/wp-content/uploads/2018/09/pizza-doce-0.jpg',
    categoryId: 1,
    price: 45.99,
  },
  {
    id: 4,
    name: 'Pizza Doce',
    quantity: 20,
    description: 'Pizza feita com morango',
    imageUrl:
      'https://www.dicasdemulher.com.br/wp-content/uploads/2018/09/pizza-doce-0.jpg',
    categoryId: 1,
    price: 99.99,
  },
  {
    id: 5,
    name: 'Pizza Doce',
    quantity: 20,
    description: 'Pizza feita com morango',
    imageUrl:
      'https://www.dicasdemulher.com.br/wp-content/uploads/2018/09/pizza-doce-0.jpg',
    categoryId: 1,
    price: 99.99,
  },
  {
    id: 6,
    name: 'Pizza Doce',
    quantity: 20,
    description: 'Pizza feita com morango',
    imageUrl:
      'https://www.dicasdemulher.com.br/wp-content/uploads/2018/09/pizza-doce-0.jpg',
    categoryId: 1,
    price: 99.99,
  },
  {
    id: 7,
    name: 'Pizza Doce',
    quantity: 20,
    description: 'Pizza feita com morango',
    imageUrl:
      'https://www.dicasdemulher.com.br/wp-content/uploads/2018/09/pizza-doce-0.jpg',
    categoryId: 1,
    price: 99.99,
  },
  {
    id: 8,
    name: 'Pizza Doce',
    quantity: 20,
    description: 'Pizza feita com morango',
    imageUrl:
      'https://www.dicasdemulher.com.br/wp-content/uploads/2018/09/pizza-doce-0.jpg',
    categoryId: 1,
    price: 99.99,
  },
  {
    id: 9,
    name: 'Pizza Doce',
    quantity: 20,
    description: 'Pizza feita com morango',
    imageUrl:
      'https://www.dicasdemulher.com.br/wp-content/uploads/2018/09/pizza-doce-0.jpg',
    categoryId: 1,
    price: 99.99,
  },
  {
    id: 10,
    name: 'Pizza Doce',
    quantity: 20,
    description: 'Pizza feita com morango',
    imageUrl:
      'https://www.dicasdemulher.com.br/wp-content/uploads/2018/09/pizza-doce-0.jpg',
    categoryId: 1,
    price: 99.99,
  },
];
type CartType = {
  id: number;
  name: string;
  quantity: number;
  description: string;
  imageUrl: string;
  categoryId: number;
  price: number;
};
const cart = [
  // {
  //   id: 15,
  //   name: 'Pizza Doce',
  //   quantity: 20,
  //   description: 'Pizza feita com morango',
  //   imageUrl:
  //     'https://www.dicasdemulher.com.br/wp-content/uploads/2018/09/pizza-doce-0.jpg',
  //   categoryId: 1,
  //   price: 99.99,
  // },
  // {
  //   id: 22,
  //   name: 'Pizza Doce',
  //   quantity: 20,
  //   description: 'Pizza feita com morango',
  //   imageUrl:
  //     'https://www.dicasdemulher.com.br/wp-content/uploads/2018/09/pizza-doce-0.jpg',
  //   categoryId: 1,
  //   price: 99.99,
  // },
  // {
  //   id: 28,
  //   name: 'Pizza Doce',
  //   quantity: 20,
  //   description: 'Pizza feita com morango',
  //   imageUrl:
  //     'https://www.dicasdemulher.com.br/wp-content/uploads/2018/09/pizza-doce-0.jpg',
  //   categoryId: 1,
  //   price: 99.99,
  // },
  // {
  //   id: 10,
  //   name: 'Pizza Doce',
  //   quantity: 20,
  //   description: 'Pizza feita com morango',
  //   imageUrl:
  //     'https://www.dicasdemulher.com.br/wp-content/uploads/2018/09/pizza-doce-0.jpg',
  //   categoryId: 1,
  //   price: 99.99,
  // },
  // {
  //   id: 5,
  //   name: 'Pizza Doce',
  //   quantity: 20,
  //   description: 'Pizza feita com morango',
  //   imageUrl:
  //     'https://www.dicasdemulher.com.br/wp-content/uploads/2018/09/pizza-doce-0.jpg',
  //   categoryId: 1,
  //   price: 99.99,
  // },
  // {
  //   id: 1,
  //   name: 'Pizza Doce',
  //   quantity: 20,
  //   description: 'Pizza feita com morango',
  //   imageUrl:
  //     'https://www.dicasdemulher.com.br/wp-content/uploads/2018/09/pizza-doce-0.jpg',
  //   categoryId: 1,
  //   price: 99.99,
  // },
  // {
  //   id: 9,
  //   name: 'Pizza Doce',
  //   quantity: 20,
  //   description: 'Pizza feita com morango',
  //   imageUrl:
  //     'https://www.dicasdemulher.com.br/wp-content/uploads/2018/09/pizza-doce-0.jpg',
  //   categoryId: 1,
  //   price: 99.99,
  // },
  // {
  //   id: 3,
  //   name: 'Pizza Doce',
  //   quantity: 20,
  //   description: 'Pizza feita com morango',
  //   imageUrl:
  //     'https://www.dicasdemulher.com.br/wp-content/uploads/2018/09/pizza-doce-0.jpg',
  //   categoryId: 1,
  //   price: 99.99,
  // },
];

type SearchBarProps = {
  onSubmit(text: string): void;
};
export const App: React.FC = () => {
  const [cartGlobal, setCartGlobal] = React.useState<CartType[]>([]);

  function sidebar() {
    const [state, dispatch] = React.useReducer(navBarReducer, INITIAL_STATE);

    const handleClickItemNavBar = (id: number) => {
      dispatch({
        type: NavBarActionType.HANDLE_CLICK_NAVBAR_ITEM,
        payload: id,
      });
    };
    return (
      <Container>
        <IconListContainer>
          <IconList>
            {state.map((navI: NavItemsType) => (
              <IconListItem key={navI.id}>
                <a
                  href={navI.path}
                  onClick={() => handleClickItemNavBar(navI.id)}
                >
                  {navI.icon(navI.active)}
                  <Text
                    color={
                      navI.active ? color.fonts.active : color.fonts.secondary
                    }
                  >
                    {navI.text}
                  </Text>
                </a>
              </IconListItem>
            ))}
          </IconList>
        </IconListContainer>

        <ProfileContainer>
          <img src="https://i.pravatar.cc/150?img=27" />
        </ProfileContainer>
      </Container>
    );
  }

  function SearchBar(props: SearchBarProps) {
    const [searchText, setSearchText] = React.useState<string>('');

    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      if (!searchText) return;
      props.onSubmit(searchText);
    };

    return (
      <FormSearchBar onSubmit={handleSubmit}>
        <div>
          <InputSearchBar
            type="search"
            placeholder="Procure por pizzas aqui"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </FormSearchBar>
    );
  }

  function main() {
    const handleSubmitSearch = (text: string) => {
      console.log('valor do input', text);
    };

    const handleAddToCart = (value: any) => {
      console.log('value', value);
      setCartGlobal((prevState) => [...prevState, value]);
    };
    return (
      <Container>
        <Wrapper>
          <ContainerSearchBar>
            <SearchBar onSubmit={handleSubmitSearch}></SearchBar>
          </ContainerSearchBar>
          <main>
            <h3>Escolha sua pizza</h3>
            <ContainerProduct>
              <ul>
                {arrayOfPizzas.map((value) => (
                  <li key={value.id} onClick={() => handleAddToCart(value)}>
                    <div className="card-product">
                      <img
                        src={value.imageUrl}
                        className="card-product-image"
                      />
                      <span className="card-product-title">
                        <Text>{value.name}</Text>
                      </span>
                      <p className="card-product-description">
                        {value.description}
                      </p>
                      <span className="card-product-price">
                        <Text>R$ {value.price}</Text>
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </ContainerProduct>
          </main>
        </Wrapper>
      </Container>
    );
  }

  function Cart() {
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
  }
  return (
    <Grid fullCart={!!cartGlobal.length}>
      {sidebar()}
      {main()}
      {Cart()}
    </Grid>
  );
};
