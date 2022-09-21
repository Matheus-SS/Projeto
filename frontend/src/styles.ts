import styled from 'styled-components';
import { color } from './constants';

export const Grid = styled.div`
  background-color: ${color.background.secondary};
  color: ${color.fonts.primary};
  height: 100%;

  display: grid;
  grid-template-columns: 100px 500px auto;
  gap: 10px;
`;

export const Container = styled.div`
  flex-direction: column;
  display: flex;
  background-color: ${color.background.primary};
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
