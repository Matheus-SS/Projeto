import styled from 'styled-components';
import { color } from '../../constants';
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
