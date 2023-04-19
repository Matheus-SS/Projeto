import React from 'react';
import { ContainerSearchBar, Wrapper, ContainerProduct } from './styles';
import { Text } from '../../components/text';
import { SearchBar } from '../../components/searchBar';
import { Container } from '../../shared-styles';
import { useCookies } from 'react-cookie';
import Cookies from 'universal-cookie';
import { getProfile } from '../../services/user';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../hook/useAuth';
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

export const Home: React.FC = () => {
  const [cartGlobal, setCartGlobal] = React.useState<CartType[]>([]);

  const { isLoadingSession } = useAuth();
  const handleSubmitSearch = (text: string) => {
    console.log('valor do input', text);
  };
  const handleAddToCart = (value: any) => {
    console.log('value', value);
    setCartGlobal((prevState) => [...prevState, value]);
  };

  return (
    <Container>
      {isLoadingSession ? (
        'carregando'
      ) : (
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
      )}
    </Container>
  );
};
