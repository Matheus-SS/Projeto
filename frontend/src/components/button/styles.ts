import styled from 'styled-components';
import { color, size } from '../../constants';

export const Container = styled.div`
  button {
    cursor: pointer;
    width: 100%;
    outline: none;
    padding: 8px;
    border-radius: 4px;
    border: none;
    background-color: ${color.background.button.primary};
    font-weight: bold;
    font-size: ${size.font.medium}px;
  }
`;
