import React from 'react';
import { ContainerSearchBar, Wrapper, ContainerProduct } from './styles';
import { Text } from '../../components/text';
import { SearchBar } from '../../components/searchBar';
import { Container } from '../../shared-styles';
import { useAuth } from '../../hook/useAuth';
import { useListProduct } from '../../hook/useListProduct';
import { HiShoppingCart } from 'react-icons/hi';
import { size } from '../../constants';
const imageNotFoundUrl =
  'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png';
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

  const { user } = useAuth();
  const handleSubmitSearch = (text: string) => {
    console.log('valor do input', text);
  };
  const { isLoading, data } = useListProduct();

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

          {isLoading ? (
            'carregando'
          ) : (
            <ContainerProduct>
              <ul>
                {data?.length == 0 && <li>Produtos não encontrados</li>}
                {data?.map((value) => (
                  <li key={value.id}>
                    <div className="card-product">
                      <img
                        src={value.image || imageNotFoundUrl}
                        className="card-product-image"
                      />
                      <span className="card-product-title">
                        <Text>{value.name}</Text>
                      </span>
                      <p className="card-product-description">
                        {value.description}
                      </p>
                      <div className="card-product-cart">
                        <span className="card-product-price">
                          <Text>R$ {value.price}</Text>
                        </span>
                        <span>
                          <button
                            className="card-product-add-cart-button"
                            onClick={() => handleAddToCart(value)}
                          >
                            <HiShoppingCart size={size.icon.medium} />
                          </button>
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </ContainerProduct>
          )}
        </main>
      </Wrapper>
    </Container>
  );
};
