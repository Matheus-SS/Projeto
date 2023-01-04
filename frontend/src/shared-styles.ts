import styled from 'styled-components';
import { color } from './constants';

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

export const Wrapper = styled.div`
  margin: 0 20px;
  flex-direction: column;
  display: flex;
  background-color: ${color.background.primary};
`;
