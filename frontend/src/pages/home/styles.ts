import styled from 'styled-components';
import { color, size } from '../../constants';

type GridProps = {
  fullCart?: boolean;
};
export const Container = styled.div`
  flex-direction: column;
  display: flex;
  background-color: ${color.background.primary};
  overflow-x: auto;
`;

export const Grid = styled.div<GridProps>`
  background-color: ${color.background.secondary};
  color: ${color.fonts.primary};
  height: 100vh;
  display: grid;
  grid-template-columns: 100px auto ${(props) => (props.fullCart ? 20 : 0)}%;
  gap: 10px;

  transition: 0.5s;
`;

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
  }
  ul,
  li {
    list-style: none;
  }

  .card-product {
    box-sizing: border-box;
    cursor: pointer;
    margin-right: 10px;
    margin-top: 10px;
    padding: 10px;
    width: 350px;
    border-radius: 4px;
    box-shadow: 2px 4px 19px -3px rgba(143, 143, 143, 1);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .card-product:hover {
    box-shadow: 2px 4px 35px -3px rgba(143, 143, 143, 1);
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
  .card-product-price {
    p {
      font-size: ${size.font.medium}px;
      font-weight: bold;
      color: ${color.fonts.primary};
    }
  }
`;
