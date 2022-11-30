import styled from 'styled-components';
import { color, size } from './constants';

type GridProps = {
  fullCart?: boolean;
};
export const Grid = styled.div<GridProps>`
  background-color: ${color.background.secondary};
  color: ${color.fonts.primary};
  height: 100vh;
  display: grid;
  grid-template-columns: 100px auto ${(props) => (props.fullCart ? 20 : 0)}%;
  gap: 10px;

  transition: 0.5s;
`;

export const Container = styled.div`
  flex-direction: column;
  display: flex;
  background-color: ${color.background.primary};
  overflow-x: auto;
`;

export const IconListContainer = styled.nav`
  display: flex;
  justify-content: center;
  flex: 1;
`;

export const IconList = styled.ul`
  list-style: none;
`;

export const IconListItem = styled.li`
  margin-top: 20px;
  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
  }
`;

export const IconListButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;

export const ProfileContainer = styled.div`
  margin: 0 10px 20px;
  padding: 4px;
  border: 2px solid ${color.background.secondary};
  border-radius: 50%;
  img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }
`;

// SEARCH BAR
export const FormSearchBar = styled.form`
  div {
    width: 200px;
  }
`;

export const InputSearchBar = styled.input`
  padding: 10px;
  border: 1px solid ${color.background.secondary};
  border-radius: 4px;
  width: 100%;
  outline-color: ${color.fonts.active};
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

// CARRINHO
export const ContainerCart = styled.div`
  margin-top: 20px;
`;

export const ContainerCartTitle = styled.div`
  p {
    font-size: ${size.font.medium}px;
    font-weight: bold;
    color: ${color.fonts.primary};
  }
`;

export const ContainerOrder = styled.div`
  height: 75vh;
  overflow: auto;
  ul,
  li {
    list-style: none;
  }
  li:nth-child(n + 2) {
    border-top: 1px solid ${color.background.secondary};
  }
  .card-order {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    height: 100px;
    margin-top: 10px;
  }
  .card-order-image {
    width: 50px;
    height: 50px;
    border-radius: 4px;
  }
  .card-order-body {
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-left: 8px;
    p:nth-child(1) {
      font-size: ${size.font.medium}px;
      font-weight: bold;
      color: ${color.fonts.primary};
    }
    p:nth-child(2) {
      font-size: ${size.font.small}px;
      font-weight: bold;
      color: ${color.fonts.primary};
    }

    .card-order-body-quantity {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      margin-bottom: 10px;

      span {
        button {
          background: transparent;
          border: none;
          background-color: ${color.background.secondary};
          height: 20px;
          width: 20px;
          border-radius: 50%;
          cursor: pointer;
        }
        .card-order-body-quantity-btn-minus {
          margin-right: 5px;
        }

        .card-order-body-quantity-btn-plus {
          margin-left: 5px;
        }
      }
    }
  }
  .card-order-option {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-bottom: 6px;

    button {
      background: transparent;
      border: none;
      cursor: pointer;
    }
  }
`;

// PAGAR CONTA

export const BillOrder = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 20px;
  span {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    p:nth-child(1) {
      color: ${color.fonts.secondary};
    }

    p:nth-child(2) {
      font-weight: bold;
    }
  }
  button {
    margin-top: 20px;
    background-color: ${color.background.button.primary};
    border: none;
    padding: 5px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    color: ${color.fonts.primary};
  }
`;
