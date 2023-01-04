import styled from 'styled-components';
import { color, size } from '../../constants';

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
