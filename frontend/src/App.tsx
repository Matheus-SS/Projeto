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
} from './styles';
import { color } from './constants';
import { Text } from './components/Text';
import {
  INITIAL_STATE,
  navBarReducer,
  NavItemsType,
  NavBarActionType,
} from './reducer/navbarReducer';

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
type SearchBarProps = {
  onSubmit(text: string): void;
};
export const App: React.FC = () => {
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

  function chat() {
    return <h1>Chat</h1>;
  }
  return (
    <Grid>
      {sidebar()}
      {main()}
    </Grid>
  );
};
