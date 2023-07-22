import React from 'react';
import { ContainerSearchBar, Wrapper, ContainerProduct } from './styles';
import { Text } from '../../components/Text';
import { SearchBar } from '../../components/searchBar';
import { Container } from '../../shared-styles';
import { useAuth } from '../../hook/useAuth';
import { IProduct, useListProduct } from '../../hook/useListProduct';
import { HiShoppingCart } from 'react-icons/hi';
import { size } from '../../constants';
import { useAddCart, useCart } from '../../hook/useCart';
import { useNavigate } from 'react-router-dom';
import { toastError, toastSuccess } from '../../lib/toast';
import { Toaster } from 'react-hot-toast';
import { Loader } from '../../components/loader';

const imageNotFoundUrl =
  'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png';

interface AddCart {
  product_id: string;
  quantity: number;
}

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const handleSubmitSearch = (text: string) => {
    console.log('valor do input', text);
  };
  const { isLoading, data } = useListProduct();
  const { mutate } = useAddCart<AddCart, string>();

  const { addToCart } = useCart();

  const handleAddToCart = (value: IProduct) => {
    if (!user.email) {
      navigate('/login');
      return;
    }
    mutate(
      {
        product_id: value.id,
        quantity: 1,
      },
      {
        onSuccess: () => {
          addToCart({
            id: value.id,
            name: value.name,
            image: value.image,
            price: value.price,
            quantity: 1,
          });
          toastSuccess('Item adicionado ao carrinho');
        },
        onError(error) {
          toastError(
            error.response?.data.message || 'Erro ao adicionar item ao carrinho'
          );
        },
      }
    );
  };
  return (
    <Container>
      <Toaster position="top-right" reverseOrder={false} />
      <Wrapper>
        <ContainerSearchBar>
          <SearchBar onSubmit={handleSubmitSearch}></SearchBar>
        </ContainerSearchBar>
        <main>
          <h3>Escolha sua pizza</h3>

          {isLoading ? (
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
              <Text style={{ marginTop: '15px' }} size={25}>
                Carregando
              </Text>
            </div>
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
