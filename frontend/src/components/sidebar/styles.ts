import styled from 'styled-components';
import { color } from '../../constants';

export const IconListContainer = styled.nav`
  display: flex;
  justify-content: center;
  flex: 1;
`;

export const IconList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const IconListItem = styled.li`
  margin-top: 20px;
  list-style: none;
  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
  }
  .button-cart {
    color: ${color.fonts.secondary};
    list-style: none;
    border: 0;
    background-color: transparent;
    cursor: pointer;
  }
`;

export const IconListButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;
