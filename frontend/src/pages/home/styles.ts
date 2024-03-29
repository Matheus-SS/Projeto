import styled from 'styled-components';
import { color, size } from '../../constants';

// MAIN
export const ContainerSearchBar = styled.div`
  margin: 20px 0;
`;

export const Wrapper = styled.div`
  margin: 0 20px;
  flex-direction: column;
  display: flex;
  background-color: ${color.background.primary};
`;

// LISTA DE PRODUTOS

export const ContainerProduct = styled.div`
  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 10px;
  }
  ul,
  li {
    list-style: none;
  }

  .card-product {
    box-sizing: border-box;

    margin-right: 10px;
    margin-top: 10px;
    padding: 10px;
    width: 350px;
    border-radius: 4px;
    box-shadow: 2px 4px 19px -3px rgba(143, 143, 143, 1);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .card-product-image {
    width: 100%;
    border-radius: 4px;
  }

  .card-product-title {
    p {
      font-size: ${size.font.large}px;
      font-weight: bold;
      color: ${color.fonts.primary};
    }
  }
  .card-product-description {
    font-size: ${size.font.medium}px;
    color: ${color.fonts.primary};
  }
  .card-product-cart {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-top: 10px;
  }
  .card-product-price {
    p {
      font-size: ${size.font.medium}px;
      font-weight: bold;
      color: ${color.fonts.primary};
    }
  }
  .card-product-add-cart-button {
    border: 0;
    background: transparent;
    cursor: pointer;
  }
`;
